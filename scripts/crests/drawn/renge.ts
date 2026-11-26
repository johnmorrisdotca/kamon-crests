// Lotus seed heads measured from frame 21 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, reversedRun, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

const pod = (): { shell: Region[]; face: Region[] } => {
  const body = symmetric([
    arc([0, 69], [-15, 68], [-25, 72]),
    arc([-25, 72], [-21, 52], [-12, 39]),
    arc([-12, 39], [-7, 32], [0, 31]),
  ]);
  const ridges = [
    band([-1, 34], [-8, 46], [-11, 61], 1.7),
    band([-4, 35], [-12, 43], [-17, 58], 1.7),
    thickSeg([-1, 37], [-2, 53], 1.55),
  ];
  const fruit = symmetric([
    arc([0, 86], [-7, 87], [-11, 84]),
    arc([-11, 84], [-18, 86], [-21, 82]),
    arc([-21, 82], [-25, 82], [-27, 78]),
    arc([-27, 78], [-30, 76], [-28, 73]),
    arc([-28, 73], [-15, 70], [0, 72]),
  ]);
  const seeds: V[] = [
    [-23, 76], [-19, 79], [-15, 74.5], [-12, 81.5], [-8, 76],
    [-3.5, 81.5], [0.8, 76.5], [5.5, 82.3], [9.5, 75.4],
    [13.5, 81.1], [17.6, 76.8], [21.2, 79.7], [24.3, 75.8],
  ];
  return {
    shell: carve([body], [...ridges, ...ridges.map((ridge) => ridge.map(mirrored))]),
    face: carve([fruit], seeds.map((centre) => disc(centre, 1.75))),
  };
};

export const itsutsuRengeBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  c.guideSpokes(5, 0, R);
  const { shell, face } = pod();
  const stem = [thickSeg([0, 9], [0, 31], 6)];
  for (const turn of [0, 72, 144, 216, 288]) {
    c.fill("lotus", toPath(stem, { k: 1, turn }));
    c.fill("lotus", toPath(shell, { k: 1, turn }));
    c.fill("lotus", toPath(face, { k: 1, turn }));
  }
  c.fill("lotus", toPath([disc([0, 0], 9.8)], { k: 1 }));
};
