import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

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
