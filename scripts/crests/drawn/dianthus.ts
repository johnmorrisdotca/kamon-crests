import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc,
  thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type Profile = ReadonlyArray<readonly [angle: number, radius: number]>;
const ROUND: Profile = [[0, 91], [4, 95], [7, 94], [9, 90], [12, 94], [15, 93], [17, 89], [21, 92], [23, 88], [24, 84], [28, 86], [30, 81], [32, 83], [36, 74]];

const ray = (angle: number, radius: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];

function curvedVein(from: V, to: V, radius: number, hint: V, width: number): Region {
  const circle = circleThrough(from, to, radius, hint);
  const arc = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

function roundedEdge(from: V, to: V): Piece {
  const d = vdist(from, to);
  return shortArc(circleThrough(from, to, Math.max(12, d * 1.8), [0, 0]), from, to);
}

function flower(c: Builder, profile: Profile, edge: (from: V, to: V) => Piece, heart: number, outerVein: V): void {
  const right = profile.map(([angle, radius]) => ray(angle, radius));
  const teeth = right.slice(1).map((point, i) => edge(right[i], point));
  const rightFoot = right[right.length - 1];
  const leftFoot: V = [-rightFoot[0], rightFoot[1]];
  const petal: Region = [
    ...teeth,
    seg(rightFoot, [0, 0]),
    seg([0, 0], leftFoot),
    ...reversedRun(teeth.map(mirrored)),
  ];
  const oblique = [
    curvedVein([3, heart], outerVein, 105, [104, 26], 2.05),
    curvedVein([7, heart - 1], [20, 37], 48, [56, 16], 1.65),
  ];
  const edgeSlit = thickSeg([0, 0], ray(36, 94), 2.0);
  const cutouts = [
    disc([0, 0], heart + 2.2),
    thickSeg([0, 0], [0, 79], 1.8),
    edgeSlit,
    edgeSlit.map(mirrored),
    ...oblique,
    ...oblique.map((line) => line.map(mirrored)),
  ];
  const ink = carve([petal], cutouts);

  c.guideCircle(C0, R);
  c.guideSpokes(10, 0, R);
  for (let i = 0; i < 5; i++) c.fill("dianthus", toPath(ink, { k: 1, turn: i * 72 }), "evenodd");
  c.fill("dianthus", toPath([disc([0, 0], heart)], { k: 1 }));
}

export function nadeshikoBuild(c: Builder): void {
  flower(c, ROUND, roundedEdge, 10.2, [27, 67]);
}
