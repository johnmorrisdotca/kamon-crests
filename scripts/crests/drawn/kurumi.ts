// Walnut hulls and leaves measured from frame 27 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, reversedRun, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const arc = (from: V, through: V, to: V): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

const ribbon = (from: V, through: V, to: V, width: number): Region => {
  const { c, r, a0, a1 } = arc(from, through, to);
  return thickArc(c, r, width, a0, a1);
};

export const mitsuKurumiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  const nut = symmetric([
    arc([0, 95], [-12, 86], [-17, 76]),
    arc([-17, 76], [-29, 72], [-31, 61]),
    arc([-31, 61], [-27, 50], [-26, 38]),
    arc([-26, 38], [-21, 26], [-12, 27]),
    arc([-12, 27], [-7, 32], [-5, 40]),
    arc([-5, 40], [-4, 45], [0, 48]),
  ]);
  const lobedSeam = [
    ribbon([0, 83], [-8, 77], [-12, 68], 2.7),
    ribbon([-12, 68], [-20, 65], [-21, 57], 2.7),
    ribbon([-21, 57], [-17, 46], [-16, 37], 2.7),
    ribbon([-16, 37], [-12, 35], [-11, 47], 2.7),
    ribbon([-11, 47], [-8, 58], [0, 60], 2.7),
  ];
  const innerSeams = [...lobedSeam, ...lobedSeam.map((shape) => shape.map(mirrored))];
  const fruit = carve([nut], innerSeams);
  const leaf = symmetric([arc([0, 13], [-12.6, 49], [0, 91])]);
  const veinedLeaf = carve([leaf], [thickSeg([0, 19], [0, 84], 2)]);
  const stalk = [thickSeg([0, 8], [0, 47], 6)];
  for (const turn of [0, 120, 240]) {
    c.fill("walnut", toPath(stalk, { k: 1, turn }));
    c.fill("walnut", toPath(fruit, { k: 1, turn }));
    c.fill("walnut", toPath(veinedLeaf, { k: 1, turn: turn + 60 }));
  }
  c.fill("walnut", toPath([disc([0, 0], 10.6)], { k: 1 }));
};
