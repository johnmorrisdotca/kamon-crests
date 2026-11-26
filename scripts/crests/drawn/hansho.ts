// The hanging fire bell measured from frame 8 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

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

const band = (from: V, via: V, to: V, width: number): Region => {
  const { c, r, a0, a1 } = arc(from, via, to);
  return thickArc(c, r, width, a0, a1);
};

const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

export const hanshoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideLine([100, 4], [100, 196]);

  const handle = symmetric([
    arc([0, 94], [-12, 89], [-17, 71]),
    seg([-17, 71], [-11, 71]),
    arc([-11, 71], [-8, 83], [0, 86]),
  ]);
  const body = symmetric([
    arc([0, 73], [-25, 69], [-40, 53]),
    arc([-40, 53], [-50, 34], [-54, 10]),
    arc([-54, 10], [-59, -20], [-67, -47]),
    arc([-67, -47], [-74, -63], [-86, -72]),
    arc([-86, -72], [-43, -87], [0, -92]),
  ]);
  const collars = [
    band([-22, 68], [0, 65], [22, 68], 2.15),
    band([-33, 59], [0, 54], [33, 59], 2.15),
    band([-43, 46], [0, 38], [43, 46], 2.45),
    band([-50, 31], [0, 23], [50, 31], 2.35),
    band([-68, -50], [0, -61], [68, -50], 2.4),
    band([-70, -56], [0, -67], [70, -56], 1.9),
  ];
  const crownCuts = [
    thickSeg([0, 54], [0, 38], 2.15),
    ...[-1, 1].flatMap((side) => [
      band([side * 10, 54], [side * 10.7, 47], [side * 14, 39.5], 2.15),
      band([side * 20, 55], [side * 22, 49], [side * 26, 42], 2.15),
      band([side * 31, 56], [side * 32, 51], [side * 37, 45], 2.15),
    ]),
  ];
  const ribs = [
    band([11, 23], [17, -13], [17.3, -59], 2.35),
    band([15, 23], [21, -13], [21.8, -59], 1.8),
    band([27, 26], [32, -12], [39, -57], 2.35),
    band([31, 27], [36.4, -12], [43, -56], 1.8),
  ];
  const shoulderBeads: V[] = [[-39, 39], [-28, 35.5], [-15, 31.9], [0, 31], [15, 31.9], [28, 35.5], [39, 39]];
  const bodyBeads: V[] = [
    ...[10, -7, -24, -43].map((y): V => [0, y]),
    ...[-1, 1].flatMap((side) => [
      [side * 22, 17], [side * 25, -1], [side * 27, -20], [side * 30, -43],
      [side * 43, 15], [side * 46, -4], [side * 50, -22], [side * 54, -43],
    ] as V[]),
  ];
  const holes = [
    ...collars, ...crownCuts, ...ribs, ...ribs.map((rib) => rib.map(mirrored)),
    ...shoulderBeads.map((centre) => disc(centre, 2.6)),
    ...bodyBeads.map((centre) => disc(centre, 3.65)),
  ];
  c.fill("fire-bell", toPath([handle], { k: 0.85 }));
  c.fill("fire-bell", toPath(carve([body], holes), { k: 0.85 }), "evenodd");
};
