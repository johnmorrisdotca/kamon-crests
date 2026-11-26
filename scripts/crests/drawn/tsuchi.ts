import type { Builder } from "../../construct/builder.ts";
import { circleThrough, disc, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const seam = (a: V, b: V, radius: number, hint: V, width: number): Region => {
  const run = shortArc(circleThrough(a, b, radius, hint), a, b) as Extract<Piece, { t: "A" }>;

  return thickArc(run.c, run.r, width, run.a0, run.a1);
};

const breaks = (points: V[]): Region[] => points.slice(1).map((point, index) => thickSeg(points[index], point, 1.95));

export const itowaNiTsuchiBuild = (c: Builder): void => {
  c.ring("ring-thread");
  const cover = disc([0, 0], 88.5);
  const front = [
    seam([-58, 61], [-43, -62], 78.5, [-98, 3], 2.5),
    seam([-76, 27], [-17, 24], 32, [-50, 44], 2.2),
    seam([-69, 46], [-34, 40], 24, [-53, 62], 2.2),
    seam([-47, 73], [43, 72], 156, [0, -76], 1.9),
    seam([-45, -71], [45, -70], 159, [0, 80], 1.9),
  ];
  const crown = disc([-48, 58], 10.9);
  const crownInner = disc([-48, 58], 8.7);
  const growth = [
    [[-38, 61], [-7, 65], [32, 51], [-16, 27]],
    [[-31, 52], [-9, 58], [19, 49], [-18, 33]],
    [[-26, 40], [-12, 47], [-2, 45]],
    [[-16, 17], [18, 35], [52, 48]],
    [[-12, 9], [31, 29], [65, 41]],
    [[-3, 4], [35, 18], [79, 25]],
    [[-8, -4], [38, 7], [82, -1]],
    [[-9, -11], [34, -3], [80, -16]],
    [[-16, -18], [12, -17], [72, -35]],
    [[-21, -29], [9, -30], [47, -51]],
    [[-25, -37], [7, -41], [39, -63]],
    [[-37, -59], [-8, -61], [22, -66]],
  ] as V[][];
  const marks = growth.flatMap(breaks);

  c.fill("mallet", toPath([cover, crown, crownInner, ...front, ...marks], { k: 1 }), "evenodd");
};
