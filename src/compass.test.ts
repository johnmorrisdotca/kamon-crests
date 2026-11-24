// The rule every crest is drawn by: a curve is an arc of a compass circle struck first, a straight edge is a ruled line, and a
// white line is the gap left between black fills. So a finished crest is fills only, each outlined in moves, lines and arcs: no
// Bézier curve, no stroke, and no run of short ruled segments standing in for a curve. The crests not yet rebuilt this way are named here with what they still use, and the list may only shrink.
//
// And the layout comes first: a guide is a whole circle or a ruled line, never a bare arc, and every arc of a finished shape lies
// on a circle the guides strike in full, every straight edge on a line they rule. A unit that is repeated is laid out once; the
// shapes that are that unit turned are held against the guides turned the same way.
import { describe, expect, it } from "vitest";

import { unstruck } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";

/** Crests still to be rebuilt from arcs and lines, and what each uses instead. */
const PENDING: Record<string, string> = {
  "gosan-no-kiri": "Bézier outline vectorised from the 1892 crest book",
  "goshichi-no-kiri": "Bézier outline vectorised from the 1892 crest book",
  "maru-ni-gosan-no-kiri": "Bézier outline vectorised from the 1892 crest book",
  "sagari-fuji": "Bézier outline vectorised from the 1892 crest book",
  "maru-ni-sagari-fuji": "Bézier outline vectorised from the 1892 crest book",
  "fuji-no-maru": "Bézier curves through points, and slits",
  tachibana: "Bézier outline vectorised from the 1892 crest book",
  "maru-ni-tachibana": "Bézier outline vectorised from the 1892 crest book",
  "sasa-rindo": "Bézier outline vectorised from the 1892 crest book",
  agehacho: "Bézier wings, and strokes for the feelers and legs",
  "maru-ni-agehacho": "Bézier wings, and strokes for the feelers and legs",
  "hokake-bune": "Bézier hull",
};

/** The longest run of consecutive ruled segments, each shorter than 2 units, in some path data: a long run is a traced curve. */
const longestShortRun = (d: string): number => {
  const tokens = d.match(/[MmLlHhVvAaZz]|-?\d*\.?\d+/g) ?? [];
  const sizes: Record<string, number> = { m: 2, l: 2, h: 1, v: 1, a: 7, z: 0 };
  let best = 0;
  let run = 0;
  let command = "";
  for (let i = 0; i < tokens.length; ) {
    if (/[A-Za-z]/.test(tokens[i])) {
      command = tokens[i];
      i += 1;
      if (command.toLowerCase() === "z") run = 0;
      continue;
    }
    const lower = command.toLowerCase();
    const n = tokens.slice(i, i + sizes[lower]).map(Number);
    i += sizes[lower];
    // Lines are written relative (l, h, v); a move, an arc or an absolute command ends a run.
    const length = command === "l" ? Math.hypot(n[0], n[1]) : command === "h" || command === "v" ? Math.abs(n[0]) : -1;
    run = length >= 0 && length < 2 ? run + 1 : 0;
    best = Math.max(best, run);
    if (command === "m") command = "l";
    if (command === "M") command = "L";
  }

  return best;
};

const constructions = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const));
const faults = (construction: (typeof constructions)[number][1]): string[] => {
  const found = new Set<string>();
  for (const shape of construction.shapes) {
    if (shape.kind !== "fill") found.add("a stroke");
    if (/[^MmLlHhVvAaZz\d\s.,-]/.test(shape.d)) found.add("a curve that is not an arc");
    if (longestShortRun(shape.d) > 6) found.add("a run of more than six short ruled segments (a traced curve)");
  }
  for (const guide of construction.guides) if (/[^MmLlHhVvAaZz\d\s.,-]/.test(guide.d)) found.add("a guide that is not a circle or a line");

  return [...found];
};

describe("compass and ruler", () => {
  for (const [id, construction] of constructions) {
    if (id in PENDING) {
      it(`${id} is still to be rebuilt (${PENDING[id]})`, () => {
        // When it is rebuilt, take it off the list: a crest on the list that passes fails here.
        expect(faults(construction).length, `${id} now passes: remove it from PENDING`).toBeGreaterThan(0);
      });
      continue;
    }
    it(`${id} is fills outlined in arcs and ruled lines only`, () => {
      expect(faults(construction), id).toEqual([]);
    });
    it(`${id} takes every arc from a circle struck in full, and every straight edge from a ruled line`, () => {
      expect(unstruck(construction), id).toMatchObject({ arcs: 0, lines: 0, bare: 0 });
    });
  }

  it("counts an arc whose circle was never struck, a bare arc for a guide, and a unit turned without its circles", () => {
    const circle = { type: "circle", d: "M70 40a20 20 0 1 1-40 0 20 20 0 1 1 40 0z" };
    const cap = "M30 40a20 20 0 0 1 40 0z";
    expect(unstruck({ guides: [circle], shapes: [{ d: cap }] })).toMatchObject({ arcs: 0, ofArcs: 1, lines: 1, ofLines: 1 });
    expect(unstruck({ guides: [circle, { type: "line", d: "M20 40h60" }], shapes: [{ d: cap }] })).toMatchObject({ arcs: 0, lines: 0, bare: 0 });
    expect(unstruck({ guides: [{ type: "circle", d: "M30 40a20 20 0 0 1 40 0" }], shapes: [{ d: cap }] })).toMatchObject({ arcs: 1, bare: 1 });
    expect(unstruck({ guides: [{ type: "circle", d: "M70.2 40a20 20 0 1 1-40 0 20 20 0 1 1 40 0z" }], shapes: [{ d: cap }] }).arcs).toBe(1);
    // The same cap a half turn round: struck only when the shape says it is the unit turned.
    const turned = "M170 160a20 20 0 0 1-40 0z";
    expect(unstruck({ guides: [circle], shapes: [{ d: turned }] }).arcs).toBe(1);
    expect(unstruck({ guides: [circle], shapes: [{ d: turned, turn: 180 }] }).arcs).toBe(0);
    expect(unstruck({ guides: [circle], shapes: [{ d: "M170 40a20 20 0 0 0-40 0z", flip: true, turn: 0 }] }).arcs).toBe(0);
  });

  it("names only crests that exist, and the records mark the same crests as being redrawn", () => {
    for (const id of Object.keys(PENDING)) expect(CREST_IDS as readonly string[]).toContain(id);
    expect(MANIFEST.filter((record) => record.redrawing === true).map((record) => record.id).sort()).toEqual(Object.keys(PENDING).sort());
  });
});
