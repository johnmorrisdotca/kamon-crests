// Horns and antlers from frame 23 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, lineLine, mirrored, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type ThreePoints = [V, V, V];

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints): Arc => {
  const centre = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c: centre, r: dist(centre, from) }, from, to, turn) as Arc;
};

const stroke = ({ c, r, a0, a1 }: Arc, width: number): Region => thickArc(c, r, width, a0, a1);
const mirror = (regions: Region[]): Region[] => regions.map((region) => region.map(mirrored));

const antlerEdging = (arcs: ThreePoints[], width: number): Region[] => arcs.map((points) => stroke(curve(points), width));

const embracingAntlers: ThreePoints[] = [
  [[0, 92], [36, 70], [47, 29]], [[47, 29], [54, 10], [60, 29]],
  [[60, 29], [64, 49], [63, 69]], [[63, 69], [72, 44], [68, 14]],
  [[68, 14], [62, -5], [56, -25]], [[56, -25], [72, -25], [88, -3]],
  [[88, -3], [82, -38], [59, -56]], [[59, -56], [32, -69], [12, -91]],
  [[12, -91], [5, -94], [1, -88]], [[1, -88], [10, -61], [8, -42]],
  [[8, -42], [3, -21], [0, 0]], [[0, 0], [10, -13], [20, -14]],
  [[20, -14], [26, -10], [23, 1]], [[23, 1], [9, 20], [0, 43]],
  [[0, 43], [16, 31], [25, 32]], [[25, 32], [27, 45], [17, 64]],
  [[17, 64], [5, 78], [0, 92]], [[1, -88], [7, -82], [12, -91]],
];

export const hosoDakiTsunoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const right = antlerEdging(embracingAntlers, 2.35);
  c.fill("horn", toPath(right, { k: 1 }));
  c.fill("horn", toPath(mirror(right), { k: 1 }));
};
