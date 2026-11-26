// Three hood constructions measured from frame 23 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, mirrored, reversedRun, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const arc = (from: V, via: V, to: V): Arc => {
  const c = lineLine(...bisector(from, via), ...bisector(via, to));
  const turn = (via[0] - from[0]) * (to[1] - from[1]) > (via[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

const band = (from: V, via: V, to: V, width: number): Region => {
  const { c, r, a0, a1 } = arc(from, via, to);
  return thickArc(c, r, width, a0, a1);
};

export const mitsuJinZukinBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle([100, 100], R);
  c.guideSpokes(3, 0, R);
  const hood = symmetric([
    arc([0, 94], [-16, 85], [-35, 68]),
    arc([-35, 68], [-46, 50], [-42, 35]),
    arc([-42, 35], [-36, 27], [-29, 28]),
    arc([-29, 28], [-15, 38], [0, 38]),
  ]);
  const crownSeam = thickSeg([0, 89], [0, 68], 2.15);
  const strap = band([-35, 24], [0, 32], [35, 24], 5.7);
  const knot: Region = [
    arc([29, 22], [33, 32], [45, 37]),
    arc([45, 37], [51, 34], [47, 25]),
    arc([47, 25], [42, 15], [32, 16]),
    arc([32, 16], [28, 17], [29, 22]),
  ];
  const knotFold = band([31, 20], [39, 24], [47, 30], 2.2);
  for (const turn of [0, 120, 240]) {
    c.fill("hood", toPath(carve([hood], [crownSeam]), { k: 1, turn }));
    c.fill("hood", toPath([strap], { k: 1, turn }));
    c.fill("hood", toPath(carve([knot], [knotFold]), { k: 1, turn }));
  }
};
