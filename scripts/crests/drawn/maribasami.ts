import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, rotated, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const points = [0, 60, 120, 180, 240, 300];
const holder = (reach: number): Region => points.map((turn) => {
  const a: V = [0, reach];
  const b: V = [reach * Math.sqrt(3) / 2, reach / 2];
  const circle = circleThrough(a, b, reach * 0.72, [reach, reach]);
  return rotated(shortArc(circle, a, b), -turn * DEG);
});

export const maribasamiNiMariBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  const holderBody = carve([holder(96)], [disc([0, 0], 52)]);
  const ball = disc([0, 0], 47);
  const a: V = [-42, 18];
  const b: V = [43, 21];
  const seamCircle = circleThrough(a, b, 55, [0, 70]);
  const seam = shortArc(seamCircle, a, b) as Extract<Piece, { t: "A" }>;
  const across = thickArc(seam.c, seam.r, 3.4, seam.a0, seam.a1);
  const cuts = carve([ball], [across, thickSeg(a, [-50, a[1]], 3.4), thickSeg(b, [50, b[1]], 3.4)]);
  c.fill("ball-holder", toPath(holderBody, { k: 1 }), "evenodd");
  c.fill("ball-holder", toPath(cuts, { k: 1 }), "evenodd");
};
