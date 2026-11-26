// Three goose silhouettes measured from frame 18 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";

type Arc = Extract<Piece, { t: "A" }>;

const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to) as Arc;
const thickCurve = (arc: Arc, width: number) => thickArc(arc.c, arc.r, width, arc.a0, arc.a1);
const eye = (centre: V, outer: number, pupil: number) => carve([disc(centre, outer)], [disc(centre, pupil)]).flat();

export const maruNiKariganeBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");

  const left: V = [-73, 0];
  const right: V = [73, 0];
  const shoulder: V = [-32, 16];
  const chin: V = [-29, 25];
  const beak: V = [-48, 30];
  const forehead: V = [-31, 37];
  const brow: V = [9, 52];
  const nape: V = [35, 16];
  const tail: V = [0, -74];
  const outline = [
    curve(left, shoulder, 62, [-34, -40]),
    seg(shoulder, chin),
    seg(chin, beak),
    seg(beak, forehead),
    curve(forehead, brow, 58, [0, -3]),
    curve(brow, nape, 36, [2, 14]),
    curve(nape, right, 62, [34, -40]),
    curve(right, tail, 72, [78, -77]),
    curve(tail, left, 72, [-78, -77]),
  ];

  const collar: V = [0, 4];
  const face = curve([8, 49], [-8, 19], 20, [-11, 38]);
  const leftCollar = curve(shoulder, collar, 53, [-30, -37]);
  const rightCollar = curve(collar, [28, 16], 51, [31, -35]);
  const openings = [
    eye([0, 35], 6.3, 2.2),
    thickSeg([-44, 29.8], [-30, 31], 1.7),
    thickCurve(face, 2),
    thickCurve(leftCollar, 2.1),
    thickCurve(rightCollar, 2.1),
  ];
  c.fill("goose", toPath(carve([outline], openings), { k: 1 }));
};
