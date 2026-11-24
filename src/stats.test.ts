// A crest's counts are its construction's: each is counted again here from the steps, and none is typed by hand.
import { describe, expect, it } from "vitest";

import { complexityOf, statsOf } from "../scripts/construct/stats";
import { piecesOf, tagsOf } from "../scripts/test-helpers";
import { animatedSvg } from "./animate";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST, manifest } from "./manifest";
import { stepsOf } from "./render";
import type { Shape } from "./render";
import { GRADES, topCrests } from "./search";

// A crest still being redrawn has no steps; its counts are of the traced drawing and the card does not show them.
const constructions = (await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const))).filter(([, construction]) => construction.redrawing !== true);

describe("every crest's counts", () => {
  for (const [id, construction] of constructions) {
    it(`${id}'s counts match its steps`, () => {
      const stats = manifest(id)!.stats;
      expect(stats).toEqual(statsOf(construction));
      const struck = construction.steps.flatMap((step) => (step.op === "guide" ? [construction.guides[step.guide]] : []));
      const circles = struck.filter((guide) => guide.type === "circle");
      // At least the unit's own, and no more than those at every place a shape stands.
      expect(stats.circles).toBeGreaterThanOrEqual(circles.length);
      expect(stats.circles).toBeLessThanOrEqual(circles.length * construction.shapes.length);
      expect(stats).toMatchObject(complexityOf(stats));
      expect(stats.lines).toBeGreaterThanOrEqual(struck.length - circles.length);
      expect(stats.widths).toBe(new Set(circles.map((guide) => /a([\d.]+) /.exec(guide.d)?.[1])).size);
      expect(stats.steps).toBe(construction.steps.length);
      expect(stats.steps).toBe(manifest(id)!.steps);
      const drawn = construction.steps.flatMap((step) => (step.op === "draw" || step.op === "turn" ? step.shapes.map((i) => construction.shapes[i]) : []));
      expect(stats.fills).toBe(drawn.filter((shape) => shape.kind === "fill").length);
      // Between one for each outline that has a curve and one for each curved edge that could be written (six numbers at least).
      const outlines = drawn.flatMap((shape) => shape.d.split(/(?=M)/)).filter((d) => /[ac]/.test(d));
      expect(stats.arcs).toBeGreaterThanOrEqual(outlines.length);
      expect(stats.arcs).toBeLessThanOrEqual(drawn.reduce((sum, shape) => sum + (shape.d.match(/-?\d*\.?\d+/g)?.length ?? 0), 0) / 6);
      expect([0, 1, ...Array.from({ length: 31 }, (_, i) => i + 2)]).toContain(stats.symmetry.turns);
    });
  }
});

// The counts are what the animation does: each is counted here from the drawing it plays, by another reading of its paths.
describe("every crest's counts are the animation's", () => {
  type XY = [number, number];
  const near = (p: XY, q: XY): boolean => Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.05;
  for (const [id, construction] of constructions) {
    it(`${id} counts the distinct circles struck, lines ruled and arcs inked in its animation, over every place a turn builds`, () => {
      const circles: { c: XY; r: number }[] = [];
      const lines: [XY, XY][] = [];
      const inked = new Set<string>();
      let stand = (p: XY): XY => p;
      for (const tag of tagsOf(animatedSvg(construction, { id: "t" }))) {
        if (tag.name === "g" && tag.attributes.transform !== undefined) {
          // A place's guides stand in a group that flips them over first, where it does, and then turns them about the centre.
          const [, turn, flip] = /^rotate\((-?[\d.]+) 100 100\)( matrix\(-1 0 0 1 200 0\))?$/.exec(tag.attributes.transform)!;
          const a = (Number(turn) * Math.PI) / 180;
          stand = ([x, y]) => [100 + ((flip ? 200 - x : x) - 100) * Math.cos(a) - (y - 100) * Math.sin(a), 100 + ((flip ? 200 - x : x) - 100) * Math.sin(a) + (y - 100) * Math.cos(a)];
        }
        const name = tag.attributes.class ?? "";
        if (tag.name !== "path") continue;
        if (/^t-s\d+ /.test(name)) inked.add(tag.attributes.d);
        if (!/ t-g$/.test(name)) continue;
        const at = /^t-p\d+ /.test(name) ? stand : (p: XY): XY => p;
        const pieces = piecesOf(tag.attributes.d);
        if (pieces[0].t === "A") {
          // A circle is two half turns, from its top to its foot and back.
          const [c, r] = [at([(pieces[0].a[0] + pieces[0].b[0]) / 2, (pieces[0].a[1] + pieces[0].b[1]) / 2]), pieces[0].r];
          if (!circles.some((one) => near(one.c, c) && Math.abs(one.r - r) < 0.05)) circles.push({ c, r });
          continue;
        }
        for (const piece of pieces) {
          const [a, b] = [at(piece.a), at(piece.b)];
          if (!lines.some(([p, q]) => (near(p, a) && near(q, b)) || (near(p, b) && near(q, a)))) lines.push([a, b]);
        }
      }
      // An arc is a run of curved pieces taken from one struck circle: the one each piece's ends and middle stand on, the nearest where two would do.
      const takenFrom = (piece: ReturnType<typeof piecesOf>[number]): number | null => {
        if (piece.t !== "A") return null;
        const offs = circles.map((one) => (Math.abs(one.r - piece.r) > 0.15 ? Infinity : Math.max(...[piece.a, piece.mid, piece.b].map((p) => Math.abs(Math.hypot(p[0] - one.c[0], p[1] - one.c[1]) - one.r)))));
        const least = Math.min(...offs);
        // Every arc of a crest drawn by compass is on a circle its animation strikes.
        expect(least).toBeLessThan(0.05);

        return offs.indexOf(least);
      };
      let arcs = 0;
      for (const d of inked) {
        // Each closed outline of a shape by itself: a new one begins where a piece does not start at the end of the one before.
        const outlines: ReturnType<typeof piecesOf>[] = [];
        for (const piece of piecesOf(d)) {
          const last = outlines[outlines.length - 1]?.at(-1);
          if (last !== undefined && near(last.b, piece.a)) outlines[outlines.length - 1].push(piece);
          else outlines.push([piece]);
        }
        for (const outline of outlines) {
          const pieces = outline.map(takenFrom);
          if (pieces.some((from) => from !== null)) arcs += Math.max(1, pieces.filter((from, i) => from !== null && from !== pieces[(i + pieces.length - 1) % pieces.length]).length);
        }
      }
      const stats = manifest(id)!.stats;
      expect({ circles: stats.circles, lines: stats.lines, arcs: stats.arcs }).toEqual({ circles: circles.length, lines: lines.length, arcs });
    });
  }
});

describe("complexityOf", () => {
  const of = (circles: number, lines: number, arcs: number, widths: number): ReturnType<typeof complexityOf> => complexityOf({ circles, lines, arcs, widths });

  it("scores three for an arc, two for a circle, one for a line and five for each compass width after the first", () => {
    expect(of(0, 0, 1, 1).score).toBe(3);
    expect(of(1, 0, 0, 1).score).toBe(2);
    expect(of(0, 1, 0, 0).score).toBe(1);
    expect(of(0, 0, 0, 3).score).toBe(10);
    expect(of(26, 30, 33, 8).score).toBe(3 * 33 + 2 * 26 + 30 + 5 * 7);
    expect(of(0, 0, 0, 0)).toEqual({ score: 0, meter: 0, grade: 1 });
  });

  it("puts the score on a fixed meter: 25 for each tenfold, from 0 to 100", () => {
    expect([1, 10, 100, 1000, 10000, 1e9].map((score) => of(0, score, 0, 1).meter)).toEqual([0, 25, 50, 75, 100, 100]);
    expect(of(0, 216, 0, 1).meter).toBe(58);
  });

  it("grades the score in bands at round numbers: under 25, from 25, from 100, from 300, and from 1000", () => {
    expect([0, 24, 25, 99, 100, 299, 300, 999, 1000, 1e6].map((score) => of(0, score, 0, 1).grade)).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
    expect(GRADES.map((one) => one.from)).toEqual([0, 25, 100, 300, 1000]);
    for (const record of MANIFEST) expect([...GRADES].reverse().find((one) => record.stats.score >= one.from)!.grade, record.id).toBe(record.stats.grade);
    // Every grade is in use among the crests drawn by compass.
    expect(new Set(MANIFEST.filter((record) => record.redrawing !== true).map((record) => record.stats.grade)).size).toBe(5);
  });

  it("ranks the five most complex crests", () => {
    expect(topCrests(5).map((record) => `${record.id} ${record.stats.meter} ${GRADES[record.stats.grade - 1].en}`)).toEqual(["maru-ni-mitsuba-aoi 77 Master", "mitsuba-aoi 77 Master", "goshichi-no-kiri 76 Master", "maru-ni-gosan-no-kiri 74 Hard", "gosan-no-kiri 74 Hard"]);
    expect(topCrests(500).some((record) => record.redrawing === true)).toBe(false);
    expect(topCrests(0)).toEqual([]);
    expect(topCrests()).toHaveLength(10);
  });
});

describe("statsOf", () => {
  const fill = (d: string, more: Partial<Shape> = {}): Shape => ({ part: "bar", kind: "fill", d, group: 1, ...more });
  const count = (guides: { type: "circle" | "line"; d: string }[], shapes: Shape[]): ReturnType<typeof statsOf> => statsOf({ guides, shapes, steps: stepsOf(guides, shapes) });
  const ring = "M196 100a96 96 0 1 1-192 0 96 96 0 1 1 192 0z";

  it("counts a whole circle as one arc, one circle and one width, turned any way and mirrored", () => {
    expect(count([{ type: "circle", d: ring }], [fill(ring)])).toEqual({ score: 5, meter: 17, grade: 1, circles: 1, lines: 0, arcs: 1, steps: 5, widths: 1, fills: 1, symmetry: { turns: 0, mirror: true } });
  });

  it("counts each edge of a ruled square, and finds its four turns and its mirror", () => {
    const square = "M60 60h80v80h-80z";
    expect(count([{ type: "line", d: square }], [fill(square)])).toEqual({ score: 4, meter: 15, grade: 1, circles: 0, lines: 4, arcs: 0, steps: 5, widths: 0, fills: 1, symmetry: { turns: 4, mirror: true } });
  });

  it("counts a cap as one arc and one line, with a mirror and no turn, and two caps of two widths apart", () => {
    const cap = "M80 60a20 20 0 0 1 40 0z";
    const guides = [{ type: "circle" as const, d: "M120 60a20 20 0 1 1-40 0 20 20 0 1 1 40 0z" }, { type: "line" as const, d: "M70 60h60" }];
    expect(count(guides, [fill(cap)])).toMatchObject({ circles: 1, lines: 1, arcs: 1, widths: 1, symmetry: { turns: 1, mirror: true } });
    const small = "M90 140a10 10 0 0 0 20 0z";
    expect(count([...guides, { type: "circle", d: "M110 140a10 10 0 1 1-20 0 10 10 0 1 1 20 0z" }], [fill(cap), fill(small)])).toMatchObject({ circles: 2, arcs: 2, widths: 2, fills: 2, symmetry: { turns: 1, mirror: true } });
  });

  it("finds a pinwheel's turns without a mirror", () => {
    const blade = "M100 100v-60a30 30 0 0 1 30 30z";
    const shapes = [0, 90, 180, 270].map((deg) => {
      const a = (deg * Math.PI) / 180;
      const at = (x: number, y: number): string => `${(100 + x * Math.cos(a) - y * Math.sin(a)).toFixed(2)} ${(100 + x * Math.sin(a) + y * Math.cos(a)).toFixed(2)}`;

      return fill(deg === 0 ? blade : `M100 100L${at(0, -60)}A30 30 0 0 1 ${at(30, -30)}z`);
    });
    expect(count([], shapes).symmetry).toEqual({ turns: 4, mirror: false });
  });

  it("gives the crests their known symmetry", () => {
    expect(manifest("janome")!.stats).toEqual({ score: 15, meter: 29, grade: 1, circles: 2, lines: 0, arcs: 2, steps: 8, widths: 2, fills: 1, symmetry: { turns: 0, mirror: true } });
    expect(manifest("mitsuba-aoi")!.stats.symmetry).toEqual({ turns: 3, mirror: true });
    expect(manifest("hidari-mitsu-tomoe")!.stats.symmetry).toEqual({ turns: 3, mirror: false });
    expect(manifest("kikyo")!.stats.symmetry).toEqual({ turns: 5, mirror: true });
    expect(manifest("juroku-yae-giku")!.stats.symmetry).toEqual({ turns: 16, mirror: true });
  });
});
