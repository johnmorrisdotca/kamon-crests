import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
const FRUIT: V[] = [[-51, 22], [-41, 33], [-26, 36], [-12, 31], [0, 35], [12, 32], [26, 36], [42, 32], [51, 21], [53, 4], [43, -20], [27, -38], [0, -43], [-27, -38], [-43, -20], [-53, 4]];

function round(points: V[], hint: V, factor = 1.4): Region {
  return points.map((a, i) => {
    const b = points[(i+1) % points.length];
    return shortArc(circleThrough(a, b, Math.max(12, vdist(a, b) * factor), hint), a, b);
  });
}

function arch(a: V, b: V, r: number, towards: V, w: number): Region {
  const circle = circleThrough(a, b, r, towards);
  const arc = shortArc(circle, a, b) as Arc;
  return thickArc(circle.c, circle.r, w, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

function blade(from: V, to: V, r: number): Region {
  const mid: V = [(from[0]+to[0])/2, (from[1]+to[1])/2];
  const across: V = [from[1]-to[1], to[0]-from[0]];
  const left = circleThrough(from, to, r, [mid[0]+across[0], mid[1]+across[1]]);
  const right = circleThrough(from, to, r, [mid[0]-across[0], mid[1]-across[1]]);
  return [shortArc(left, from, to), shortArc(right, to, from)];
}

function leaf(from: V, to: V, radius: number, weight: number, clips: Region[] = []): Region[] {
  const end: V = [from[0]+(to[0]-from[0])*.95, from[1]+(to[1]-from[1])*.95];
  return carve([blade(from, to, radius)], [thickSeg(from, end, weight), ...clips]);
}

function ink(c: Builder, parts: Region[], placing: Placing = { k: 1 }): void {
  c.fill("tachibana", toPath(parts, placing), "evenodd");
}

const fruitOutline = round(FRUIT, [0, -3]);
const orangeClearance = round(FRUIT.map(([x, y]): V => [x*1.045, y*1.045]), [0, -3]);
const fold = [
  arch([-35, -14], [-14, 23], 29, [-15, -6], 2.6),
  arch([-14, 23], [-1, -20], 34, [-37, -7], 2.5),
];
const calyx = [disc([0, -32], 3.2), disc([-10, -35], 2.5), disc([10, -35], 2.5)];
const orange = carve([fruitOutline], [...fold, ...fold.map((region) => region.map(mirrored)), ...calyx]);

function stemWide(tail: number): Region {
  const points: V[] = [[-4.7, -43], [-5.1, tail+10], [-10.5, tail+2], [-7.5, tail], [7.5, tail], [10.5, tail+2], [5.1, tail+10], [4.7, -43]];
  return round(points, [0, (tail-43)/2], 1.8);
}

export function tachibanaKuzushiBuild(c: Builder): void {
  const top: V = [0, 91];
  const outerPoint: V = [-91, 3];
  const innerPoint: V = [-70, 8];
  const foot: V = [-13,-72];
  const inside: V = [-10,-61];
  const outerTop = circleThrough(top, outerPoint, 94, [0, 2]);
  const outerBottom = circleThrough(outerPoint, foot, 89, [-1, 11]);
  const innerBottom = circleThrough(inside, innerPoint, 77, [3, 11]);
  const innerTop = circleThrough(innerPoint, top, 89, [16, 9]);
  const bough = [
    shortArc(outerTop, top, outerPoint),
    shortArc(outerBottom, outerPoint, foot),
    seg(foot, inside),
    shortArc(innerBottom, inside, innerPoint),
    shortArc(innerTop, innerPoint, top),
  ];
  const seam = arch([-69, -28], [-17, -66], 78, [0, -1], 2.0);
  const split = carve([bough], [seam]);
  const crown = leaf([0, 28], [0, 75], 25.2, 2.0, [orangeClearance]);
  const wing = leaf([-17, 0], [-66, 30], 29.5, 2.0, [orangeClearance]);

  c.guideCircle(C0, R);
  for (const part of [split, wing]) {
    ink(c, part);
    ink(c, part, { k: 1, mirror: true });
  }
  ink(c, crown);
  ink(c, [stemWide(-82)]);
  ink(c, orange);
}

export function itowaTachibanaBuild(c: Builder): void {
  const crown = leaf([0, 25], [0, 90.2], 34.4, 2.1, [orangeClearance]);
  const upper = leaf([-22, 2], [-79, 37], 35, 2.05, [orangeClearance]);
  const lower = leaf([-12, -66], [-84, -33], 42.5, 2.0);
  const stem = stemWide(-89);
  const twig = thickSeg([0, -64], [-26, -56], 7.1);

  c.ring("ring-thread");
  ink(c, crown);
  for (const part of [upper, lower]) {
    ink(c, part);
    ink(c, part, { k: 1, mirror: true });
  }
  ink(c, carve([stem, twig, twig.map(mirrored)], []));
  ink(c, orange);
}

export function korinTachibanaBuild(c: Builder): void {
  const body = round([[-49, 4], [-50, 19], [-44, 31], [-31, 39], [-17, 40], [0, 32], [14, 38],
    [28, 39], [40, 31], [45, 17], [44, 1], [37, -15], [23, -27], [8, -32], [-8, -30], [-29, -23], [-44, -13]], [0, 6]);
  const fruitClear = round([[-52, 3], [-51, 23], [-43, 35], [-31, 42], [-17, 43], [0, 35], [14, 41],
    [28, 42], [43, 33], [48, 17], [47, 1], [40, -17], [24, -30], [8, -35], [-8, -33], [-30, -26], [-47, -15]], [0, 6]);
  const topLeaves = [
    leaf([-2, 29], [1, 91], 34.5, 2.3, [fruitClear]),
    leaf([-41, 3], [-80, 45], 34.5, 2.2, [fruitClear]),
    leaf([42, -3], [82, 47], 38.5, 2.2, [fruitClear]),
  ];
  const leftPoints: V[] = [[-75, -64], [-70, -45], [-61, -28], [-49, -16], [-36, -12], [-22, -17],
    [-12, -25], [-10, -37], [-20, -46], [-36, -52], [-53, -56]];
  const rightPoints: V[] = [[84, -20], [68, -40], [53, -53], [38, -57], [24, -52], [14, -42],
    [15, -32], [27, -23], [48, -14], [68, -13]];
  const leftCrown: V = [-39, -37];
  const rightCrown: V = [48, -35];
  const leftLeaf = round(leftPoints, leftCrown, 1.35);
  const rightLeaf = round(rightPoints, rightCrown, 1.35);
  const opening = [
    round(leftPoints.map(([x, y]): V => [leftCrown[0] + (x - leftCrown[0]) * 1.065, leftCrown[1] + (y - leftCrown[1]) * 1.065]), leftCrown, 1.35),
    round(rightPoints.map(([x, y]): V => [rightCrown[0] + (x - rightCrown[0]) * 1.065, rightCrown[1] + (y - rightCrown[1]) * 1.065]), rightCrown, 1.35),
  ];
  const centralFold = [
    arch([-16, -12], [-14, 21], 46, [25, 5], 2.6),
    arch([-14, 21], [5, 25], 12.7, [-2, 18], 2.6),
    arch([5, 25], [3, -11], 38, [-31, 10], 2.6),
  ];
  const fruitCalyx = [disc([-2, -26], 4.0), disc([-10, -29], 2.8), disc([9, -29], 3.3)];
  const stalk: V[] = [[-10, -31], [-3, -31], [3, -36], [3, -44], [10, -48], [22, -43],
    [25, -53], [15, -58], [23, -69], [42, -75], [14, -87], [-3, -66], [-15, -58], [-25, -50], [-14, -44]];
  const branch = stalk.map((point, i) => seg(point, stalk[(i + 1) % stalk.length]));
  const leftVein = arch([-65, -53], [-19, -27], 76, [-27, -73], 2.2);
  const rightVein = arch([27, -44], [80, -22], 130, [104, -101], 2.2);

  c.guideCircle(C0, R);
  c.group(() => { for (const twig of topLeaves) ink(c, twig); });
  ink(c, carve([branch], opening));
  ink(c, carve([body], [...opening, ...centralFold, ...fruitCalyx]));
  c.group(() => {
    ink(c, carve([leftLeaf], [leftVein]));
    ink(c, carve([rightLeaf], [rightVein]));
  });
}

export function kokumochiTachibanaBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, 96);
  const place = (region: Region): Region => region.map((edge) => {
    const scale = 1.01;
    const move = ([x, y]: V): V => [x * scale, y * scale + 12.5];

    return edge.t === "A"
      ? { ...edge, c: move(edge.c), r: edge.r * scale }
      : { ...edge, a: move(edge.a), b: move(edge.b) };
  });
  const inset = place(orangeClearance);
  const top: V = [0, 89];
  const shoulderL: V = [-35, 55];
  const shoulderR: V = [35, 55];
  const lobe: Region = [
    shortArc(circleThrough(shoulderL, top, 68, [24, 44]), shoulderL, top),
    shortArc(circleThrough(top, shoulderR, 68, [-24, 44]), top, shoulderR),
    shortArc(circleThrough(shoulderR, shoulderL, 105, [0, 154]), shoulderR, shoulderL),
  ];
  const topLeaf = carve([lobe], [thickSeg([0, 55], [0, 90], 2.25), inset]);

  const outer: V = [78, 49];
  const root: V = [43, 40];
  const point: V = [55, -12];
  const side: Region = [
    shortArc(circleThrough(root, outer, 53, [61, 104]), root, outer),
    shortArc(circleThrough(outer, point, 80, [5, 49]), outer, point),
    seg(point, root),
  ];
  const sideLeaf = carve([side], [arch([46, 26], [75, 48], 46, [62, -9], 2.35), inset]);
  const lowerTip: V = [78, -36];
  const lowerRoot: V = [19, -67];
  const lowerVein = arch([23, -63], [76, -37], 58, [29, -16], 2.6);
  const bottomLeaf = carve([blade(lowerRoot, lowerTip, 43)], [lowerVein]);
  const foot = round([
    [-4, -35], [4, -35], [7.5, -40], [6.5, -51], [8, -62], [18, -67],
    [10, -71], [7, -78], [9, -88], [-9, -88], [-7, -78], [-10, -71],
    [-18, -67], [-8, -62], [-6.5, -51], [-7.5, -40],
  ], [0, -64], 1.6);
  const innerFold = [
    arch([-25, -19], [-23, 9], 24, [-8, -4], 2.4),
    arch([-23, 9], [-8, 11], 12, [-17, 0], 2.4),
    arch([-8, 11], [-5, -18], 44, [-46, -5], 2.4),
  ];
  const cuts = [...fold, ...innerFold];
  const fruit = carve([fruitOutline], [...cuts, ...cuts.map((part) => part.map(mirrored)), ...calyx]);

  const first = [...topLeaf, ...sideLeaf, ...sideLeaf.map((region) => region.map(mirrored))];
  const lower = [...bottomLeaf, ...bottomLeaf.map((region) => region.map(mirrored)), foot];
  const holes = [...fruit.map(place), ...first, ...lower];
  c.fill("tachibana", circle(C0, R).join(toPath(holes, { k: 1 })), "evenodd");
}
