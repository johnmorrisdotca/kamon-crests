// The rule every crest is drawn by: a curve is an arc of a compass circle struck first, a straight edge is a ruled line, and a
// white line is the gap left between black fills. So a finished crest is fills only, each outlined in moves, lines and arcs: no
// Bézier curve, no stroke, and no run of short ruled segments standing in for a curve. The crests not yet rebuilt this way are named here with what they still use, and the list may only shrink.
//
// And the layout comes first: a guide is a whole circle or a ruled line, never a bare arc, and every arc of a finished shape lies
// on a circle the guides strike in full, every straight edge on a line they rule. A unit that is repeated is laid out once; the
// shapes that are that unit turned are held against the guides turned the same way.
import { describe, expect, it } from "vitest";

import { Path } from "../scripts/construct/geo";
import { clockOf, notFullLength, offGuides, piecesOf, unanchored, unstruck } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";

/** Crests still to be rebuilt from arcs and lines, and what each uses instead. */
const PENDING: Record<string, string> = {
  "fuji-no-maru": "Bézier curves through points, and slits",
  tachibana: "Bézier outline vectorised from the 1892 crest book",
  "maru-ni-tachibana": "Bézier outline vectorised from the 1892 crest book",
  "sasa-rindo": "Bézier outline vectorised from the 1892 crest book",
  "hokake-bune": "Bézier hull",
};

/**
 * Crests with a line ruled from side to side of the square the layout circle stands in, and how many: a line an inked edge follows
 * past the circle (a feather's end in a crest with no ring, a bar's end under a ring). Every other line of every crest runs from
 * edge to edge of the circle. A number here may only fall.
 */
const SQUARE: Record<string, number> = { "chigai-takanoha": 6 };

/** The ends of those lines stand on the square, which is not struck: so many line ends stand on nothing. A number here may only fall. */
const LOOSE: Record<string, number> = { "chigai-takanoha": 12 };

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

/** Consecutive relative segments of the same kind share a command letter. */
const hasZeroLengthSegment = (path: string): boolean => {
  const sizes: Record<string, number> = { h: 1, v: 1, l: 2, a: 7, c: 6 };
  for (const [run] of path.matchAll(/[hlvac][\d. -]+/g)) {
    const length = sizes[run[0]];
    const values = (run.slice(1).match(/-?\d*\.?\d+/g) ?? []).map(Number);
    for (let i = 0; i < values.length; i += length) {
      const motion = values.slice(i + (run[0] === "a" ? 5 : 0), i + length);
      if (motion.every((value) => value === 0)) return true;
    }
  }
  return false;
};

describe("the compact path writer", () => {
  it("omits rounded zero-length segments and collapsed contours", () => {
    const path = new Path()
      .M([2, 3]).L([2.0004, 3.0004]).A(4, 0, 1, [2.0003, 3]).C([2, 3], [2, 3], [2, 3]).Z()
      .M([11, 12]).L([11.0004, 12]).L([14, 12])
      .M([30, 35]).L([30.0004, 35]).Z()
      .M([18, 15]).L([18, 15.006]).Z();

    expect(path.d(3)).toBe("M11 12h3m4 3v0.006z");
  });

  it("keeps the relative geometry after removing a line that would write h0", () => {
    const path = new Path().M([2, 3]).L([2, 3.003]).L([4, 5]).Z();

    expect(path.d(3)).toBe("M2 3l2 1.997z");
  });

  it("keeps the two arcs of a full circle and a cubic that returns to its start", () => {
    const path = new Path().M([0, 0]).A(5, 0, 1, [10, 0]).A(5, 0, 1, [0, 0])
      .C([3, 7], [6, 7], [0, 0]).Z();

    expect(path.d()).toBe("M0 0a5 5 0 0 1 10 0 5 5 0 0 1-10 0c3 7 6 7 0 0z");
  });

  it("writes no zero-length segments in the generated crest paths", () => {
    const affected = constructions.filter(([, { guides, shapes }]) =>
      [...guides, ...shapes].some(({ d }) => hasZeroLengthSegment(d))).map(([id]) => id);

    expect(affected).toEqual([]);
  });
});

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
    it(`${id} rules every line from a point already on the page to another${id in LOOSE ? `, but for ${LOOSE[id]} ends on the square` : ""}`, () => {
      expect(unanchored(construction), id).toBe(LOOSE[id] ?? 0);
    });

    if (construction.redrawing !== true) {
      it(`${id} inks only along what is struck before its own ink: every arc on a circle, every straight edge on a ruled line, between two crossings`, () => {
        expect(offGuides(construction), id).toEqual({ arcs: 0, edges: 0, ends: 0, curves: 0 });
      });

      it(`${id} rules every line full length, from edge to edge of the outer guide circle${id in SQUARE ? `, but for ${SQUARE[id]} that cross the square it stands in` : ""}`, () => {
        // A crest that gets better fails here until its number is brought down, or it is taken off the list.
        expect(notFullLength(construction), id).toMatchObject({ short: 0, square: SQUARE[id] ?? 0 });
      });
    }

    it(`${id} strikes every circle clockwise from its top, a part's circles about the centre first from the outside in, then its others by compass width with the smallest first and clockwise by their centres, and then rules its lines, each parallel set together and from the top down`, () => {
      const seen = new Map<string, { line: boolean; r: number; at: number; centred?: boolean; lean?: number; top?: number }>();
      for (const guide of construction.guides) {
        const pieces = piecesOf(guide.d);
        const last = seen.get(guide.part ?? "");
        if (guide.type === "line") {
          // One line, written from its upper end down (a level one from the left); a part's lines by their lean, clockwise from
          // upright, and those of one lean from the top down.
          expect(pieces, guide.d).toHaveLength(1);
          const [{ a, b }] = pieces;
          expect(a[1] < b[1] - 0.005 || (Math.abs(a[1] - b[1]) <= 0.005 && a[0] < b[0]), guide.d).toBe(true);
          const lean = (Math.round(clockOf([100 + b[0] - a[0], 100 + b[1] - a[1]]) * 50) / 50) % 180;
          // How far across its set a line lies: down the page for a level set, to the right for an upright one.
          const top = ((a[0] + b[0]) / 2 - 100) * Math.cos((lean * Math.PI) / 180) + ((a[1] + b[1]) / 2 - 100) * Math.sin((lean * Math.PI) / 180);
          if (last?.line === true) {
            expect(lean, guide.d).toBeGreaterThanOrEqual(last.lean! - 0.05);
            if (Math.abs(lean - last.lean!) < 0.02) expect(top, guide.d).toBeGreaterThanOrEqual(last.top! - 0.02);
          }
          seen.set(guide.part ?? "", { line: true, r: 0, at: 0, lean, top });
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
        const centred = Math.hypot(centre[0] - 100, centre[1] - 100) < 0.02;
        const at = centred ? -1 : clockOf(centre);
        if (last !== undefined) {
          expect(last.line, `${guide.d}: a circle after a ruled line of its part`).toBe(false);
          // The field first: the circles about the centre, the outermost first; nothing inside it is struck before it.
          if (centred) expect(last.centred, `${guide.d}: a circle about the centre after one that is not`).toBe(true);
          if (centred) expect(r, guide.d).toBeLessThanOrEqual(last.r);
          else if (last.centred !== true) {
            expect(r, guide.d).toBeGreaterThanOrEqual(last.r);
            if (r === last.r) expect(at, guide.d).toBeGreaterThanOrEqual(last.at - 0.5);
          }
        }
        seen.set(guide.part ?? "", { line: false, r, at, centred });
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

  it("lists as ruled across the square only crests that exist", () => {
    for (const id of [...Object.keys(SQUARE), ...Object.keys(LOOSE)]) expect(CREST_IDS as readonly string[]).toContain(id);
  });

  it("counts ink with nothing struck under it in an earlier step, and a line that stops short", () => {
    const circle = { type: "circle", d: "M100 4a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" };
    const level = { type: "line", d: "M4 100h192" };
    const upright = { type: "line", d: "M100 4v192" };
    const half = { d: "M4 100a96 96 0 0 1 192 0z" };
    const steps = (order: string[]): { op: string; guide?: number; shapes?: number[] }[] => order.map((op) => (op === "trace" ? { op, shapes: [0] } : { op: "guide", guide: Number(op) }));
    expect(offGuides({ guides: [circle, level], shapes: [half], steps: steps(["0", "1", "trace"]) })).toEqual({ arcs: 0, edges: 0, ends: 0, curves: 0 });
    // The line ruled after the trace, or never; the circle struck after it.
    expect(offGuides({ guides: [circle, level], shapes: [half], steps: steps(["0", "trace", "1"]) })).toMatchObject({ arcs: 0, edges: 1 });
    expect(offGuides({ guides: [circle, level], shapes: [half], steps: steps(["1", "trace", "0"]) })).toMatchObject({ arcs: 1, edges: 0, ends: 2 });
    // An edge that ends where nothing crosses its line, and one on a line too short for it.
    const quarter = { d: "M100 100v-96a96 96 0 0 1 96 96z" };
    expect(offGuides({ guides: [circle, level, upright], shapes: [quarter], steps: steps(["0", "1", "2", "trace"]) })).toEqual({ arcs: 0, edges: 0, ends: 0, curves: 0 });
    expect(offGuides({ guides: [circle, upright, { type: "line", d: "M150 100h46" }], shapes: [quarter], steps: steps(["0", "1", "2", "trace"]) })).toMatchObject({ edges: 1 });
    expect(offGuides({ guides: [circle, level], shapes: [{ d: "M30 100h40v9z" }], steps: steps(["0", "1", "trace"]) })).toMatchObject({ edges: 2, ends: 2 });
    expect(offGuides({ guides: [], shapes: [{ d: "M0 0c1 1 2 2 3 3z" }], steps: [] }).curves).toBe(1);
    expect(notFullLength({ guides: [circle, level, upright] })).toEqual({ short: 0, square: 0, lines: 2 });
    expect(notFullLength({ guides: [circle, { type: "line", d: "M4 100h150" }, { type: "line", d: "M4 20h192" }] })).toEqual({ short: 1, square: 1, lines: 2 });
  });

  it("names only crests that exist, and the records mark the same crests as being redrawn", () => {
    for (const id of Object.keys(PENDING)) expect(CREST_IDS as readonly string[]).toContain(id);
    expect(MANIFEST.filter((record) => record.redrawing === true).map((record) => record.id).sort()).toEqual(Object.keys(PENDING).sort());
  });
});
