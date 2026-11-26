import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

function band(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const arc = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

const A: V = [-44, 62];
const B: V = [44, 62];
const SHOULDER_RIGHT: V = [44, 34];
const CUFF_RIGHT: V = [34, 27];
const SHOULDER_LEFT: V = [-44, 34];
const CUFF_LEFT: V = [-34, 27];
const sides: Region = [
  seg(A, B), seg(B, SHOULDER_RIGHT),
  shortArc(circleThrough(SHOULDER_RIGHT, CUFF_RIGHT, 10, [34, 39]), SHOULDER_RIGHT, CUFF_RIGHT),
  seg(CUFF_RIGHT, [17, 27]), seg([17, 27], [25, 11]), seg([25, 11], [-25, 11]),
  seg([-25, 11], [-17, 27]), seg([-17, 27], CUFF_LEFT),
  shortArc(circleThrough(CUFF_LEFT, SHOULDER_LEFT, 10, [-34, 39]), CUFF_LEFT, SHOULDER_LEFT),
  seg(SHOULDER_LEFT, A),
];
const fold = band([14, 43], [17, 25], 32, [43, 40], 2.6);
const cape = carve([sides], [fold, fold.map(mirrored)]);
const hat = polygon([[0, 87], [22, 72], [-22, 72]]);
const neck = polygon([[-7.2, 62], [7.2, 62], [7.2, 70], [-7.2, 70]]);
const weight = disc([28, 79], 4.9);
const arm = [
  band([44, 53], [29, 79], 37, [22, 65], 3.65),
  band([46, 45], [56, 65], 29, [36, 68], 3.3),
  weight,
];
const leftArm = arm.map((piece) => piece.map(mirrored));

export function mitsuMamezoBuild(c: Builder): void {
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    const placing = { k: 1, turn };
    for (const piece of [...arm, ...leftArm]) c.fill("mamezo-doll", toPath([piece], placing), "evenodd");
    c.fill("mamezo-doll", toPath([thickSeg([0, 2], [0, 13], 3.5), neck, hat], placing));
    c.fill("mamezo-doll", toPath(cape, placing), "evenodd");
  }
}
