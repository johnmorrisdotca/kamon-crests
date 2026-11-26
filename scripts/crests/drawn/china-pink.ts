import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, reversedRun,
  seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const ray = (angle: number, radius: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];

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
