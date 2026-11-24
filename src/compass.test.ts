// The rule every crest is drawn by: a curve is an arc of a compass circle struck first, a straight edge is a ruled line, and a
// white line is the gap left between black fills. So a finished crest is fills only, each outlined in moves, lines and arcs: no
// Bézier curve, no stroke, and no run of short ruled segments standing in for a curve. The crests not yet rebuilt this way are named here with what they still use, and the list may only shrink.
import { describe, expect, it } from "vitest";

import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";

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
  for (const guide of construction.guides) if (/[^MmLlHhVvAaZz\d\s.,-]/.test(guide.d)) found.add("a guide that is not a circle, an arc or a line");

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
  }

  it("names only crests that exist", () => {
    for (const id of Object.keys(PENDING)) expect(CREST_IDS as readonly string[]).toContain(id);
  });
});
