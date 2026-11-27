import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { circleThrough, onPage, seg, shortArc, toPath, vadd, vdist, vmul, vsub } from "../../construct/compass.ts";
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

export function daiHishiBuild(c: Builder): void {
  c.precision(3);
  const height = 72;
  const innerWidth = 54;
  const innerHeight = 40;
  const outer: V[] = [[0, height], [R, 0], [0, -height], [-R, 0]];
  const inner: V[] = [[0, innerHeight], [innerWidth, 0], [0, -innerHeight], [-innerWidth, 0]];
  const halfNotch = 3;
  const depth = 5;
  const notched = outer.flatMap((point, i) => {
    const next = outer[(i + 1) % outer.length];
    const side = vdist(point, next);
    const direction = vmul(vsub(next, point), 1 / side);
    const inward: V = [direction[1] * depth, -direction[0] * depth];
    const notch = (fraction: number): V[] => {
      const before = vadd(point, vmul(direction, side * fraction - halfNotch));
      const after = vadd(point, vmul(direction, side * fraction + halfNotch));
      return [before, vadd(before, inward), vadd(after, inward), after];
    };
    return [point, ...notch(0.25), ...notch(0.5), ...notch(0.75)];
  });
  const ruled = (points: V[]) => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

  for (const radius of [R, height, innerWidth, innerHeight]) c.guideCircle(C0, radius);
  c.guideSpokes(4, 0, R);
  c.fill("diamond", toPath([ruled(notched), ruled(inner)], { k: 1 }), "evenodd");
}
