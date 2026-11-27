import type { Builder } from "../../construct/builder.ts";
import { carve, circleCircle, circleThrough, disc, nearest, mirrored, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const curve = (from: V, to: V, radius: number, centreSide: V): Arc => shortArc(circleThrough(from, to, radius, centreSide), from, to) as Arc;
const seam = ({ c, r, a0, a1 }: Arc, width: number): Region => thickArc(c, r, width, a0, a1);
const reflect = (regions: Region[]): Region[] => regions.map((region) => region.map(mirrored));

type Cut = [centre: V, radius: number, near: V];
// The compass arcs follow the scalloped edge and the turn into the upper wing.
const profile: Cut[] = [
  [[-41, -23], 52, [-71, -66]],
  [[-43, -8], 55, [-92, -32]],
  [[-15, -4], 82, [-97, 2]],
  [[-40, 33], 45, [-84, 39]],
  [[-36, 27], 52, [-74, 63]],
  [[-17, 30], 58, [-52, 76]],
  [[-11, 138], 53, [-26, 87]],
  [[1, 65], 23, [-10, 85]],
  [[-4, 58], 31, [5, 87]],
  [[-42, 32], 77, [22, 74]],
  [[13, 47], 20, [32, 51]],
  [[30, 40], 12, [23, 30]],
  [[13, 37], 6, [18, 40]],
  [[-6, 47], 21, [14, 43]],
  [[-5, 39], 27, [8, 62]],
  [[-12, 71], 8, [-6, 66]],
  [[-73, 197], 144, [-17, 65]],
  [[-2, -18], 83, [-35, 58]],
  [[-22, -9], 62, [-66, 34]],
  [[-24, -15], 61, [-83, -2]],
  [[74, 3], 160, [-81, -37]],
];

const outline = (cuts: Cut[]): Region => {
  const circles = cuts.map(([c, r]): Circle => ({ c, r }));
  const joins = circles.map((circle, i) => {
    const prior = circles[(i + circles.length - 1) % circles.length];
    return nearest(circleCircle(prior.c, prior.r, circle.c, circle.r), cuts[i][2]);
  });
  return circles.map((circle, i) => shortArc(circle, joins[i], joins[(i + 1) % joins.length]));
};

const band = outline(profile);

const dots: V[] = [[-4, 79], [-36, 75], [-61, 61], [-77, 40], [-88, 15], [-92, -10], [20, 67], [29, 48]];
const ribbon = carve([band], dots.map((point) => disc(point, 2.4)));

const forewing: Region = [
  curve([5, 24], [18, 42], 32, [-6, 46]),
  curve([18, 42], [25, 48], 14, [29, 35]),
  curve([25, 48], [34, 36], 19, [17, 33]),
  curve([34, 36], [27, 26], 18, [17, 40]),
  curve([27, 26], [5, 24], 24, [15, 43]),
];
const hindwing: Region = [
  curve([5, 21], [24, 22], 32, [17, -9]),
  curve([24, 22], [28, 17], 10, [20, 14]),
  curve([28, 17], [17, 10], 15, [16, 24]),
  curve([17, 10], [5, 11], 25, [11, 35]),
  curve([5, 11], [5, 21], 17, [22, 16]),
];
const wingVeins = [
  seam(curve([6, 24], [21, 42], 30, [0, 48]), 1.8),
  seam(curve([6, 23], [28, 34], 33, [9, 55]), 1.7),
  seam(curve([6, 17], [24, 19], 40, [20, -20]), 1.7),
  seam(curve([6, 15], [20, 12], 31, [7, -16]), 1.6),
];
// Broad painted forewings fold around the antennae, inside the trailing band.
const folded: Region = [
  curve([6, 35], [18, 51], 13, [6, 47]),
  curve([18, 51], [22, 63], 15, [9, 61]),
  curve([22, 63], [32, 58], 12, [23, 49]),
  curve([32, 58], [39, 42], 23, [19, 44]),
  curve([39, 42], [33, 25], 21, [18, 40]),
  curve([33, 25], [18, 22], 21, [23, 41]),
  curve([18, 22], [6, 35], 19, [22, 37]),
];
const wingInk = carve([forewing, hindwing, folded], [...wingVeins,
  seam(curve([6, 29], [25, 51], 39, [-10, 62]), 2.2),
  seam(curve([9, 27], [33, 39], 28, [10, 54]), 2.1),
  disc([31, 43], 2.4),
  disc([29, 52], 2.3),
  disc([36, 34], 2.3),
]);

const antenna = [
  seam(curve([3, 36], [16, 44], 16, [3, 52]), 2.6),
  seam(curve([16, 44], [15, 59], 12, [7, 51]), 2.6),
  seam(curve([15, 59], [8, 61], 9, [10, 54]), 2.6),
];
const abdomen: Region = [
  curve([4, 27], [0, 10], 22, [-17, 23]),
  curve([0, 10], [-4, 27], 22, [17, 23]),
  curve([-4, 27], [4, 27], 8, [0, 20]),
];
const body = carve([disc([0, 34], 4.5), abdomen, ...antenna, ...reflect(antenna)], []);

export const choTomoeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    const place = { k: 1, turn };
    c.fill("butterfly", toPath(ribbon, place));
    c.fill("butterfly", toPath([...wingInk, ...reflect(wingInk)], place));
    c.fill("butterfly", toPath(body, { ...place, k: 1.05 }));
  }
};
