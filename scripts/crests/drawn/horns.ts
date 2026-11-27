// Horns and antlers from frame 23 of the 1892 crest book.
import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, disc, lineLine, mirrored, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

const ringedAntlers: ThreePoints[] = [
  [[0, 86], [28, 61], [38, 36]], [[38, 36], [46, 24], [53, 40]],
  [[53, 40], [57, 53], [58, 65]], [[58, 65], [67, 49], [68, 26]],
  [[68, 26], [64, 11], [59, -1]], [[59, -1], [65, -12], [74, 0]],
  [[74, 0], [80, 8], [82, 17]], [[82, 17], [79, -16], [67, -39]],
  [[67, -39], [47, -58], [24, -80]], [[24, -80], [16, -83], [8, -82]],
  [[8, -82], [7, -79], [10, -73]], [[10, -73], [10, -54], [4, -37]],
  [[4, -37], [1, -28], [0, -16]], [[0, -16], [8, -20], [17, -18]],
  [[17, -18], [19, -1], [11, 11]], [[11, 11], [2, 27], [0, 40]],
  [[0, 40], [8, 32], [20, 35]], [[20, 35], [20, 44], [12, 54]],
  [[12, 54], [4, 66], [0, 86]],
];

const rightSpots: V[] = [
  [28, 28], [40, 25], [24, 19], [50, 17], [46, 7], [33, 10], [55, 9], [29, 1],
  [40, -3], [48, -7], [35, -13], [54, -18], [43, -23], [61, -24], [51, -30], [32, -34],
  [22, -29], [25, -21], [62, -35], [43, -39], [34, -44],
];

// The three witnesses locate the compass circle in the book cell. Round its
// width to a whole unit and keep the two joins on the circle.
const antlerArc = (points: ThreePoints): Piece => {
  const [from, , to] = points;
  const guide = curve(points);
  const radius = Math.max(Math.ceil(dist(from, to)) / 2, Math.round(guide.r * 2) / 2);
  return arcTo(circleThrough(from, to, radius, guide.c), from, to, guide.a1 > guide.a0);
};

export const maruNiDakiTsunoBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  const face = ringedAntlers.map(antlerArc);
  const veins: [V, V][] = [[[12, -77], [16, -42]], [[17, -77], [23, -50]], [[22, -77], [31, -52]]];
  const baseSeam = curve([[10, -80], [16, -75], [23, -78]]);
  const cuts = [
    ...rightSpots.map((point) => disc(point, 1.5)),
    ...veins.map(([from, to]) => thickSeg(from, to, WEIGHT.hair)),
    stroke(baseSeam, WEIGHT.hair),
  ];
  const right = carve([face], cuts);
  c.fill("horn", toPath(right, { k: 1 }), "evenodd");
  c.fill("horn", toPath(mirror(right), { k: 1 }), "evenodd");
};
