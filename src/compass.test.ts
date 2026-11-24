// The rule every crest is drawn by: a curve is an arc of a compass circle struck first, a straight edge is a ruled line, and a
// white line is the gap left between black fills. So a finished crest is fills only, each outlined in moves, lines and arcs: no
// Bézier curve, no stroke, and no run of short ruled segments standing in for a curve. The crests not yet rebuilt this way are named here with what they still use, and the list may only shrink.
//
// And the layout comes first: a guide is a whole circle or a ruled line, never a bare arc, and every arc of a finished shape lies
// on a circle the guides strike in full, every straight edge on a line they rule. A unit that is repeated is laid out once; the
// shapes that are that unit turned are held against the guides turned the same way.
import { describe, expect, it } from "vitest";

import { clockOf, piecesOf, unanchored, unstruck } from "../scripts/test-helpers";
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
  "hokake-bune": "Bézier hull",
};

/**
 * Crests with ruled lines that stand on nothing: how many line ends are neither at the centre nor on a circle or a line struck
 * before. Each such line was written as the edge of a shape and ruled where the shape needed it, not built from the layout. A
 * crest is taken off as its blocks are bound by struck circles and lines (as the plum's are); a number here may only fall.
 */
const LOOSE: Record<string, number> = {
  "ichimonji-mitsuboshi": 5,
  igeta: 12,
  kagome: 3,
  "maru-ni-igeta": 12,
  "maru-ni-juji": 8,
  "maru-ni-mitsu-uroko": 8,
  "mitsu-uroko": 6,
  "ni-hikiryo": 10,
  "roku-mon-sen": 8,
  "takeda-bishi": 9,
  kikyo: 2,
  "maru-ni-kikyo": 2,
  "maru-ni-yamazakura": 6,
  yamazakura: 6,
  "maru-ni-mitsu-gashiwa": 2,
  "maru-ni-mitsu-icho": 4,
  "maru-ni-mitsuba-aoi": 11,
  "maru-ni-omodaka": 19,
  "mitsu-gashiwa": 2,
  "mitsu-icho": 4,
  "mitsuba-aoi": 11,
  momiji: 14,
  omodaka: 19,
  "asa-no-ha": 12,
  "chigai-takanoha": 12,
  "genji-guruma": 4,
  "hinomaru-ogi": 15,
  kikko: 12,
  "kikko-ni-katabami": 18,
  "maru-ni-chigai-takanoha": 12,
  "oda-mokko": 10,
  ogi: 15,
  shippo: 3,
  "yotsume-yui": 6,
  tonbo: 2,
  usagi: 55,
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

  for (const [id, construction] of constructions) {
    it(`${id} rules every line from a point already on the page to another${id in LOOSE ? `, but for ${LOOSE[id]} ends still to be bound` : ""}`, () => {
      // A crest that gets better fails here until its number is brought down, or it is taken off the list.
      expect(unanchored(construction), id).toBe(LOOSE[id] ?? 0);
    });

    it(`${id} strikes every circle clockwise from its top, a part's circles by compass width with the smallest first and clockwise by their centres, and then rules its lines from the centre outwards`, () => {
      const seen = new Map<string, { line: boolean; r: number; at: number }>();
      for (const guide of construction.guides) {
        const pieces = piecesOf(guide.d);
        const last = seen.get(guide.part ?? "");
        if (guide.type === "line") {
          seen.set(guide.part ?? "", { line: true, r: 0, at: 0 });
          const away = (p: [number, number]): number => Math.hypot(p[0] - 100, p[1] - 100);
          if (pieces.length === 1) expect(away(pieces[0].a), guide.d).toBeLessThanOrEqual(away(pieces[0].b) + 0.02);
          continue;
        }
        const [down, up] = pieces as { a: [number, number]; b: [number, number]; mid: [number, number]; r: number }[];
        // From the top down the right side, then up the left: clockwise.
        const written = /^M-?[\d.]+ ?-?[\d.]+a([\d.]+) \1 0 1 1 0 [\d.]+ \1 \1 0 1 1 0-[\d.]+z$/.exec(guide.d);
        expect(written, guide.d).not.toBeNull();
        const r = Number(written![1]);
        expect(down.a[0]).toBeCloseTo(down.b[0], 5);
        expect(down.a[1]).toBeLessThan(down.b[1]);
        expect(down.mid[0]).toBeGreaterThan(down.a[0]);
        expect(up.mid[0]).toBeLessThan(down.a[0]);
        const centre: [number, number] = [down.a[0], (down.a[1] + down.b[1]) / 2];
        const at = Math.hypot(centre[0] - 100, centre[1] - 100) < 0.02 ? -1 : clockOf(centre);
        if (last !== undefined) {
          expect(last.line, `${guide.d}: a circle after a ruled line of its part`).toBe(false);
          expect(r, guide.d).toBeGreaterThanOrEqual(last.r);
          if (r === last.r) expect(at, guide.d).toBeGreaterThanOrEqual(last.at - 0.5);
        }
        seen.set(guide.part ?? "", { line: false, r, at });
      }
    });
  }

  it("counts a ruled line whose ends stand on nothing struck before it", () => {
    const circle = { type: "circle", d: "M100 60a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" };
    expect(unanchored({ guides: [circle, { type: "line", d: "M100 100v-40" }] })).toBe(0);
    expect(unanchored({ guides: [{ type: "line", d: "M100 100v-40" }, circle] })).toBe(1);
    expect(unanchored({ guides: [circle, { type: "line", d: "M100 60h40" }, { type: "line", d: "M120 60v-9" }] })).toBe(2);
  });

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

  it("lists as loose only crests that exist", () => {
    for (const id of Object.keys(LOOSE)) expect(CREST_IDS as readonly string[]).toContain(id);
  });

  it("names only crests that exist, and the records mark the same crests as being redrawn", () => {
    for (const id of Object.keys(PENDING)) expect(CREST_IDS as readonly string[]).toContain(id);
    expect(MANIFEST.filter((record) => record.redrawing === true).map((record) => record.id).sort()).toEqual(Object.keys(PENDING).sort());
  });
});
