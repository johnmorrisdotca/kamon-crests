import type { Builder } from "../../construct/builder.ts";
import { circleThrough, DEG, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, vadd, vsub, vmul } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R, turn } from "../../construct/geo.ts";

const arc = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);

const seam = (a: V, b: V, radius: number, hint: V, weight: number): Region => {
  const edge = arc(a, b, radius, hint) as Extract<Piece, { t: "A" }>;
  return thickArc(edge.c, edge.r, weight, edge.a0, edge.a1);
};

const reflectedSide = (side: Region): Region => reversedRun(side.map(mirrored));

const bag = (c: Builder, placement: Placing): void => {
  const crownLeft: Region = [
    arc([-64, 9], [-84, 22], 23, [-58, 33]), arc([-84, 22], [-76, 47], 38, [-42, 20]),
    arc([-76, 47], [-62, 64], 26, [-47, 40]), arc([-62, 64], [-42, 75], 24, [-48, 52]),
    arc([-42, 75], [-20, 82], 22, [-28, 59]), arc([-20, 82], [0, 85], 24, [0, 64]),
  ];
  const crown = [...crownLeft, ...reflectedSide(crownLeft), arc([64, 9], [-64, 9], 460, [0, 470])];
  const bodyLeft: Region = [
    arc([-61, 4], [-83, -25], 57, [-38, -37]), arc([-83, -25], [-79, -49], 32, [-56, -29]),
    arc([-79, -49], [-57, -60], 24, [-61, -37]), arc([-57, -60], [-43, -53], 21, [-57, -41]),
    arc([-43, -53], [-28, -76], 39, [-10, -45]), arc([-28, -76], [0, -85], 46, [-3, -48]),
  ];
  const body = [...bodyLeft, ...reflectedSide(bodyLeft), arc([61, 4], [-61, 4], 442, [0, 452])];
  const crownFold = seam([-32, 57], [-18, 15], 77, [-71, 18], 2.5);
  const bodyFold = seam([-22, -3], [-27, -42], 67, [-83, -17], 2.2);
  const crownCuts = [crownFold, crownFold.map(mirrored), thickSeg([0, 70], [0, 16], 2.2)];
  const bodyCuts = [bodyFold, bodyFold.map(mirrored), thickSeg([0, -5], [0, -54], 2)];
  const leftLoop = seam([-65, 16], [-74, -20], 22, [-61, -2], 5.5);
  c.fill("bag", toPath([leftLoop, leftLoop.map(mirrored)], placement));
  c.fill("bag", toPath([crown, ...crownCuts], placement), "evenodd");
  c.fill("bag", toPath([body, ...bodyCuts], placement), "evenodd");
  const band = seam([-67, 8], [67, 8], 428, [0, 440], 6.2);
  const bandOpening = seam([-62, 7.25], [62, 7.25], 428, [0, 440], 1.4);
  c.fill("bag", toPath([band, bandOpening], placement), "evenodd");
};

export const fukuroBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  bag(c, { k: 1 });
};

const angularPouch = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

const bowLens = (a: V, b: V, radius: number): Region => {
  const [x, y] = vmul(vadd(a, b), 0.5);

  return [arc(a, b, radius, [x, y - 90]), arc(b, a, radius, [x, y + 90])];
};

const bowLoop = (a: V, b: V, radius: number): Region[] => {
  const inset = vmul(vsub(b, a), 0.12);

  return [bowLens(a, b, radius), bowLens(vadd(a, inset), vsub(b, inset), 0.79 * radius)];
};

const stitchedMarks = (at: V, angle: number): Region[] => {
  const from = (point: V): V => vadd(at, turn(point, angle / DEG, [0, 0]));
  const stitch = (a: V, b: V, w: number): Region => thickSeg(from(a), from(b), w);

  return [
    stitch([-4, -2], [4.8, 1], 1.65),
    stitch([-0.5, 0.2], [-2.3, 5.7], 1.6),
    stitch([1.7, 0.6], [3.1, -4.9], 1.6),
  ];
};

export const itowaNiKakuFukuroBuild = (c: Builder): void => {
  c.ring("ring-thread");
  const bagOutline = angularPouch([[-78, 24], [-57, 42], [-12, 61], [6, 61], [74, 35], [77, -38], [12, -66], [-14, -67], [-75, -46]]);
  const bow = [
    ...bowLoop([-5, 15], [-49, 25], 38),
    ...bowLoop([-6, 14], [-47, 2], 38),
    ...bowLoop([6, 16], [50, 31], 41),
    ...bowLoop([8, 14], [45, 10], 32),
    seam([-9, 11], [9, 23], 18, [5, 5], 2.9),
    seam([-8, 20], [10, 10], 18, [0, 27], 3),
    seam([-5, 26], [-13, 53], 57, [-60, 37], 3.0),
  ];
  const marks: { at: V; angle: number }[] = [
    { at: [-36, 46], angle: -0.36 }, { at: [-67, 18], angle: 0.22 },
    { at: [-65, -19], angle: -0.41 }, { at: [-63, -40], angle: 0.52 },
    { at: [-43, -39], angle: -0.17 }, { at: [-27, -8], angle: 0.42 },
    { at: [-14, -51], angle: -0.37 }, { at: [9, -51], angle: 0.67 },
    { at: [11, -24], angle: 0.26 }, { at: [36, -18], angle: -0.13 },
    { at: [44, -2], angle: 0.58 }, { at: [62, 14], angle: 0.24 },
    { at: [62, -35], angle: 0.31 }, { at: [17, 43], angle: -0.04 },
    { at: [31, 44], angle: 0.49 },
  ];
  const stitches = marks.flatMap(({ at, angle }) => stitchedMarks(at, angle));

  c.fill("bag", toPath([bagOutline, ...bow, ...stitches], { k: 0.97 }), "evenodd");
};
