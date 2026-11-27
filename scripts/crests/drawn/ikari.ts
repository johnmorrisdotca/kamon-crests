import type { Builder } from "../../construct/builder.ts";
import { carve, circleCircle, disc, lineCircle, mirrored, nearest, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const nearShank = (circle: Circle, x: number): V =>
  nearest(lineCircle([x, 0], [x, 1], circle.c, circle.r), [x, 40]);

const fluke = (outer: Circle, inner: Circle, root: number, point: V): Region => {
  const tip = nearest(circleCircle(outer.c, outer.r, inner.c, inner.r), point);
  const top = nearShank(outer, root);
  const bottom = nearShank(inner, 6);

  return [shortArc(outer, top, tip), shortArc(inner, tip, bottom), seg(bottom, top)];
};

export const chuwaNiHitotsuIkariBuild = (c: Builder): void => {
  const upper = fluke({ c: [37, 2], r: 45 }, { c: [53, -10], r: 47.5 }, 0, [68, 35]);
  const lower = fluke({ c: [38, -22], r: 39 }, { c: [44, -47], r: 51 }, 6, [73, -5]);
  const eye: V = [0, -55];
  const shaft = thickSeg([0, 28], eye, 14);
  const anchor = carve(
    [upper, lower, upper.map(mirrored), lower.map(mirrored), shaft, disc(eye, 17.5)],
    [disc(eye, 9.5)],
  );

  c.ring("ring-thin");
  c.fill("anchor", toPath(anchor, { k: 1 }), "evenodd");
};
