// A crest's counts are its construction's: each is counted again here from the steps, and none is typed by hand.
import { describe, expect, it } from "vitest";

import { statsOf } from "../scripts/construct/stats";
import { piecesOf } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { manifest } from "./manifest";
import { stepsOf } from "./render";
import type { Shape } from "./render";

const constructions = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const));

describe("every crest's counts", () => {
  for (const [id, construction] of constructions) {
    it(`${id}'s counts match its steps`, () => {
      const stats = manifest(id)!.stats;
      expect(stats).toEqual(statsOf(construction));
      const struck = construction.steps.flatMap((step) => (step.op === "guide" ? [construction.guides[step.guide]] : []));
      const circles = struck.filter((guide) => guide.type === "circle");
      expect(stats.circles).toBe(circles.length);
      expect(stats.score).toBe(stats.circles + stats.lines + stats.arcs);
      expect(stats.lines).toBe(struck.filter((guide) => guide.type === "line").reduce((sum, guide) => sum + piecesOf(guide.d).length, 0));
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

describe("statsOf", () => {
  const fill = (d: string, more: Partial<Shape> = {}): Shape => ({ part: "bar", kind: "fill", d, group: 1, ...more });
  const count = (guides: { type: "circle" | "line"; d: string }[], shapes: Shape[]): ReturnType<typeof statsOf> => statsOf({ guides, shapes, steps: stepsOf(guides, shapes) });
  const ring = "M196 100a96 96 0 1 1-192 0 96 96 0 1 1 192 0z";

  it("counts a whole circle as one arc, one circle and one width, turned any way and mirrored", () => {
    expect(count([{ type: "circle", d: ring }], [fill(ring)])).toEqual({ score: 2, circles: 1, lines: 0, arcs: 1, steps: 3, widths: 1, fills: 1, symmetry: { turns: 0, mirror: true } });
  });

  it("counts each edge of a ruled square, and finds its four turns and its mirror", () => {
    const square = "M60 60h80v80h-80z";
    expect(count([{ type: "line", d: square }], [fill(square)])).toEqual({ score: 4, circles: 0, lines: 4, arcs: 0, steps: 3, widths: 0, fills: 1, symmetry: { turns: 4, mirror: true } });
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
    expect(manifest("janome")!.stats).toEqual({ score: 4, circles: 2, lines: 0, arcs: 2, steps: 4, widths: 2, fills: 1, symmetry: { turns: 0, mirror: true } });
    expect(manifest("mitsuba-aoi")!.stats.symmetry).toEqual({ turns: 3, mirror: true });
    expect(manifest("hidari-mitsu-tomoe")!.stats.symmetry).toEqual({ turns: 3, mirror: false });
    expect(manifest("kikyo")!.stats.symmetry).toEqual({ turns: 5, mirror: true });
    expect(manifest("juroku-yae-giku")!.stats.symmetry).toEqual({ turns: 16, mirror: true });
  });
});
