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

export const tobiGanBuild = (c: Builder): void => {
  c.precision(3);
  const left: V = [-94, 19];
  const back: V = [-11, 35];
  const tail: V = [14, 62];
  const tailRoot: V = [26, 32];
  const right: V = [94, 10];
  const wingRoot: V = [35, 5];
  const breast: V = [4, -16];
  const lowNeck: V = [-23, -44];
  const throat: V = [-55, -52];
  const beak: V = [-77, -64];
  const brow: V = [-65, -49];
  const highNeck: V = [-49, -43];
  const bend: V = [-18, -31];
  const shoulder: V = [-11, 8];
  const outline = [
    curve(left, back, 200, [-13, -159]),
    curve(back, tail, 38, [25, 28]),
    curve(tail, tailRoot, 30, [-3, 34]),
    curve(tailRoot, right, 107, [44, -67]),
    curve(right, wingRoot, 108, [66, -96]),
    curve(wingRoot, breast, 62, [44, -54]),
    curve(breast, lowNeck, 95, [58, -94]),
    curve(lowNeck, throat, 71, [-52, 25]),
    curve(throat, beak, 61, [-42, -107]),
    curve(beak, brow, 28, [-47, -68]),
    curve(brow, highNeck, 31, [-53, -75]),
    curve(highNeck, bend, 74, [-52, 32]),
    curve(bend, shoulder, 37, [-46, -12]),
    curve(shoulder, left, 90, [-66, -47]),
  ];

  const seams = [
    thickCurve(curve(shoulder, back, 62, [50, 21]), 2.1),
    thickCurve(curve([6, 31], [29, 33], 115, [28, -80]), 1.8),
    thickSeg([-73, -59], [-62, -54], 1.5),
    eye([-57, -49], 2.7, 1.1),
  ];
  c.fill("goose", toPath(carve([outline], seams), { k: 1 }));
};

export const sanbaKariganeBuild = (c: Builder): void => {
  c.precision(3);
  const left: V = [-97, -47];
  const beak: V = [-63, 1];
  const breast: V = [-48, -2];
  const brow: V = [-43, 16];
  const crown: V = [1, 45];
  const nape: V = [28, 17];
  const right: V = [97, 20];
  const tail: V = [10, -46];
  const outline = [
    curve(left, breast, 92, [-17, -62]),
    seg(breast, beak),
    seg(beak, brow),
    curve(brow, crown, 29, [-14, 17]),
    curve(crown, nape, 33, [-1, 12]),
    curve(nape, right, 97, [60, -69]),
    curve(right, tail, 116, [107, -118]),
    curve(tail, left, 80, [-47, -99]),
  ];

  const collar = curve(breast, [2, 2], 117, [-29, -115]);
  const shoulder = curve([2, 2], nape, 66, [43, -36]);
  const cutouts = [
    eye([-17, 23], 8.2, 3.1),
    thickSeg([-56, 0], [-42, 6], 2),
    thickCurve(collar, 2.7),
    thickCurve(shoulder, 2.7),
  ];
  const bird = carve([outline], cutouts);
  // The two lower geese lift their leading wing by a slightly steeper angle.
  const places = [
    { at: [-23, 52] as V, turn: 0 },
    { at: [-3, 1] as V, turn: -10 },
    { at: [20, -50] as V, turn: -13 },
  ];
  for (const placing of places) c.fill("goose", toPath(bird, { k: 0.58, ...placing }));
};
