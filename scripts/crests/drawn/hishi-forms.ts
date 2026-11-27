import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { circleThrough, onPage, shortArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";

export function maruNiSoriBishiBuild(c: Builder): void {
  const reach = c.ring("ring-medium") - RING_GAP;
  const height = reach * .77;
  const corners: V[] = [[0, height], [reach, 0], [0, -height], [-reach, 0]];
  const placing = { k: 1 };
  const arcs = corners.map((corner, i) => {
    const after = corners[(i + 1) % corners.length];
    const hint: V = [1.8 * (corner[0] + after[0]), 1.8 * (corner[1] + after[1])];
    const circle = circleThrough(corner, after, 129, hint);
    c.guideCircle(onPage(circle.c, placing), circle.r);
    return shortArc(circle, corner, after);
  });
  c.guideCircle(C0, reach);
  c.guideCircle(C0, height);
  c.guideSpokes(4, 0, reach);
  c.fill("diamond", toPath([arcs], placing));
}
