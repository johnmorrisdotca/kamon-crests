// Leaves and berry clusters from frame 23 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, reversedRun, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type ThreePoints = [V, V, V];
type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const pointedLeaf = (foot: V, shoulder: V, tip: V, vein: [V, V]): Region[] => {
  const half = [curve([foot, shoulder, tip])];
  const blade = [...half, ...reversedRun(half.map(mirrored))];
  return carve([blade], [thickSeg(...vein, 2.1)]);
};

const lowerBunch: V[] = [
  [-5, 33], [5, 33], [-11, 44], [0, 44], [11, 44], [-11, 55], [0, 55], [11, 55],
  [-10, 66], [0, 66], [10, 66], [-5, 77], [5, 77],
];

export const mitsuNantenBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  const leaves = pointedLeaf([0, 9], [-12.8, 53], [0, 94], [[0, 17], [0, 88]]);
  const branch = [thickSeg([0, 8], [0, 38], 3.85), ...lowerBunch.map((point) => disc(point, 5.04))];
  for (const turn of [0, 120, 240]) {
    c.fill("nanten", toPath(leaves, { k: 1, turn }));
    c.fill("nanten", toPath(branch, { k: 1, turn: turn + 60 }));
  }
  c.fill("nanten", toPath([disc([0, 0], 11.65)], { k: 1 }));
};
