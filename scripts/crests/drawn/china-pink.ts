import type { Builder } from "../../construct/builder.ts";
import {
  DEG, arcTo, carve, carveWhere, circleThrough, disc, inside, mirrored, reversedRun,
  seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const ray = (angle: number, radius: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];
const rule = (points: V[]): Region => points.slice(1).map((point, i) => seg(points[i], point));
const outline = (points: V[]): Region => [...rule(points), seg(points[points.length - 1], points[0])];

function incision(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const edge = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1));
}

const rightCrown = [
  [0, 95.3], [3.6, 90], [6.8, 94.7], [9.6, 90.2], [13.5, 94], [16.5, 88.9],
  [20.8, 91.7], [23.7, 86.3], [27, 89.1], [29, 84], [32.8, 85], [36, 77.2],
].map(([angle, radius]) => ray(angle, radius));

function drawFace(c: Builder, k: number): void {
  const root: V = [0, 0];
  const rim = rightCrown[rightCrown.length - 1];
  const leftRim: V = [-rim[0], rim[1]];
  const teeth = rightCrown.slice(1).map((point, i) => {
    const from = rightCrown[i];
    return shortArc(circleThrough(from, point, Math.max(16, vdist(from, point) * 2), [0, 58]), from, point);
  });
  const petal: Region = [...teeth, seg(rim, root), seg(root, leftRim), ...reversedRun(teeth.map(mirrored))];
  const rightVeins = [
    incision([5, 11], [25, 63], 92, [91, 22], 2.15),
    incision([9, 9], [21, 28], 29, [31, 8], 1.75),
  ];
  const separation = thickSeg(root, ray(36, 93), 2.8);
  const cuts = [
    disc(root, 15.9), thickSeg([0, 13], [0, 77], 2.15),
    ...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored)), separation, separation.map(mirrored),
  ];
  const ink = carve([petal], cuts);
  for (let i = 0; i < 5; i++) c.fill("china-pink", toPath(ink, { k, turn: i * 72 }), "evenodd");
  c.fill("china-pink", toPath([disc(root, 13.1)], { k }));
}

export function sekichikuBuild(c: Builder): void {
  c.guideCircle(C0, R);
  drawFace(c, 1);
}

export function maruSekichikuBuild(c: Builder): void {
  const inner = c.ring("ring-medium");
  drawFace(c, (inner - 2.5) / 95.3);
}

function inCircle(ink: Region, cuts: Region[], radius: number): Region[] {
  const clip = disc([0, 0], radius);
  return carveWhere([ink, clip, ...cuts].flat(), (point) =>
    inside(ink, point) && inside(clip, point) && !cuts.some((cut) => inside(cut, point)),
  );
}

export function nozokiSekichikuBuild(c: Builder): void {
  const inner = c.ring("ring-thin") - 1.3;
  const crownRight: V[] = [
    [0, -7], [9, -9], [13, -15], [20, -12], [23, -19], [30, -16], [32, -24], [38, -21],
    [36, -35], [44, -30], [49, -33], [53, -31], [55, -36], [61, -35], [61, -40],
    [69, -39], [69, -51], [61, -68], [53, -84], [29, -98], [0, -102],
  ];
  const silhouette = outline([...crownRight, ...crownRight.slice(1, -1).reverse().map(([x, y]): V => [-x, y])]);
  const heart: V = [0, -88];
  const rightVeins = [
    incision([10, -84], [37, -35], 94, [98, -100], 2.6),
    incision([7, -85], [25, -34], 94, [93, -89], 2),
    incision([13, -86], [50, -46], 126, [109, -104], 2),
    incision([15, -86], [59, -50], 111, [102, -116], 1.8),
  ];
  const veins = [...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored)), thickSeg([0, -81], [0, -17], 2)];
  const ink = inCircle(silhouette, [disc(heart, 18), ...veins], inner);
  c.fill("china-pink", toPath(ink, { k: 1 }), "evenodd");
  c.fill("china-pink", toPath(inCircle(disc(heart, 14.5), [], inner), { k: 1 }), "evenodd");
}

export function mitsuWariSekichikuBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const radius = 95.6;
  const outerRight = ray(58.5, radius);
  const outerLeft: V = [-outerRight[0], outerRight[1]];
  const teethRight: V[] = [
    [0, 4], [6, 13], [11, 10], [16, 19], [22, 16], [27, 25], [33, 23],
    [36, 31], [44, 29], [49, 37], [54, 35], [58, 43], [64, 40], [72, 50], outerRight,
  ];
  const right = rule(teethRight);
  const fan: Region = [
    arcTo({ c: [0, 0], r: radius }, outerRight, outerLeft, true),
    ...reversedRun(right.map(mirrored)), ...right,
  ];
  const heart: V = [0, 97];
  const rightVeins = [
    incision([7, 83], [23, 44], 80, [77, 77], 2),
    incision([11, 86], [40, 43], 120, [108, 125], 2.6),
    incision([14, 88], [58, 54], 110, [97, 147], 1.85),
  ];
  const cuts = [
    disc(heart, 17.4), thickSeg([0, 83], [0, 28], 2),
    ...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored)),
  ];
  const ink = carve([fan], cuts);
  const rimHeart = inCircle(disc(heart, 13.5), [], radius);
  for (let i = 0; i < 3; i++) {
    const placing = { k: 1, turn: i * 120 };
    c.fill("china-pink", toPath(ink, placing), "evenodd");
    c.fill("china-pink", toPath(rimHeart, placing));
  }
}

export function fusenSekichikuBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const heart: V = [0, -38];
  const upperRim: V[] = [
    [0, 95], [23, 86], [40, 73], [45, 78], [54, 65], [63, 52], [69, 59],
    [76, 43], [81, 24], [87, 30], [89, 10], [88, -3], [94, 0], [87, -16],
    [78, -28], [67, -34], [74, -35], [56, -41], [36, -44], [20, -45], [8, -43],
  ];
  const wingEdges = upperRim.slice(1).map((point, i) => {
    const from = upperRim[i];
    return shortArc(circleThrough(from, point, Math.max(17, vdist(from, point) * 1.5), [27, 17]), from, point);
  });
  const insideWing = [
    incision([12, -33], [28, 38], 61, [-28, 27], 2.3),
    incision([17, -34], [45, 64], 85, [-42, 49], 2.4),
    incision([20, -35], [68, 40], 96, [-25, 58], 2.2),
    incision([24, -39], [79, 6], 97, [-32, 58], 2.2),
  ];
  const innerEdge = [
    shortArc(circleThrough([8, -43], [25, 22], 62, [-36, 15]), [8, -43], [25, 22]),
    shortArc(circleThrough([25, 22], [0, 95], 69, [-44, 45]), [25, 22], [0, 95]),
  ];
  const heartClear = disc(heart, 15);
  const wing = [...wingEdges, ...innerEdge];
  const rightWing = carve([wing], [...insideWing, heartClear]);
  c.fill("china-pink", toPath(rightWing, { k: 1 }), "evenodd");
  c.fill("china-pink", toPath(rightWing, { k: 1, mirror: true }), "evenodd");

  const rightCurl = [
    incision([11, -28], [15, 62], 144, [-124, 10], 3.6),
    thickArc([11, 64], 5.5, 3.5, -.67, 3.6),
  ];
  for (const curl of rightCurl) {
    c.fill("china-pink", toPath([curl], { k: 1 }), "evenodd");
    c.fill("china-pink", toPath([curl], { k: 1, mirror: true }), "evenodd");
  }

  const front = outline([
    [-9, -41], [-20, -6], [-26, 11], [-21, 10], [-18, 20], [-10, 17], [-5, 23], [0, 27],
    [5, 23], [10, 17], [18, 20], [21, 10], [26, 11], [20, -6], [9, -41],
  ]);
  const rightHeadVein = incision([5, -29], [17, -3], 48, [56, -31], 1.9);
  c.fill("china-pink", toPath(carve([front], [
    heartClear, rightHeadVein, rightHeadVein.map(mirrored), thickSeg([0, -33], [0, 17], 2),
  ]), { k: 1 }), "evenodd");

  const lowerPetal = outline([
    [1, -51], [17, -45], [46, -48], [74, -44], [65, -53], [73, -54], [58, -65],
    [61, -67], [44, -74], [49, -77], [32, -82], [31, -88], [17, -89], [16, -94],
    [7, -93], [2, -82], [0, -69],
  ]);
  const lowerCuts = [
    heartClear,
    incision([5, -50], [13, -84], 47, [48, -58], 1.9),
    incision([9, -48], [42, -72], 74, [44, -14], 2.15),
    incision([14, -46], [56, -59], 67, [53, -1], 1.8),
  ];
  const lower = carve([lowerPetal], lowerCuts);
  c.fill("china-pink", toPath(lower, { k: 1 }), "evenodd");
  c.fill("china-pink", toPath(lower, { k: 1, mirror: true }), "evenodd");
  c.fill("china-pink", toPath([disc(heart, 12.3)], { k: 1 }));
}
