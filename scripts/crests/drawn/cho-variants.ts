// Stylised butterflies measured from frame 34 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

type Arc = Extract<Piece, { t: "A" }>;
const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to) as Arc;
const stroke = ({ c, r, a0, a1 }: Arc, width: number) => thickArc(c, r, width, a0, a1);
const mirror = (regions: Region[]): Region[] => regions.map((region) => region.map(mirrored));

export const musubichoBuild = (c: Builder): void => {
  c.precision(3);
  const crossing: V = [0, 4];
  const lowerCrossing: V = [0, -26];
  const foot: V = [0, -52];
  const width = 2.65;
  const ink = [
    stroke(curve(lowerCrossing, [52, 11], 360, [-145, 274]), width),
    stroke(curve([52, 11], [79, 19], 42, [71, -22]), width),
    stroke(curve([79, 19], [91, 4], 16.5, [75, 5]), width),
    stroke(curve([91, 4], [79, -25], 52, [45, 8]), width),
    stroke(curve([79, -25], [49, -40], 38, [51, -2]), width),
    stroke(curve([49, -40], lowerCrossing, 127, [52, 85]), width),
    stroke(curve(crossing, [32, -21], 123, [-29, -106]), width),
    stroke(curve([32, -21], [46, -54], 42, [7, -54]), width),
    stroke(curve([46, -54], [33, -66], 15, [33, -52]), width),
    stroke(curve([33, -66], foot, 39, [35, -27]), width),
    stroke(curve(crossing, [52, 29], 119, [-9, 121]), width),
    stroke(curve([52, 29], [65, 49], 24, [42, 50]), width),
    thickArc([56, 49], 9, width, 0, 1.67 * Math.PI),
    stroke(curve([0, 29], [11, 42], 21, [16, 27]), width),
    thickArc([19, 38], Math.hypot(8, 4), width, Math.atan2(4, -8), 2.85 * Math.PI),
  ];
  const stem = thickSeg(foot, [0, 29], width);
  c.fill("butterfly", toPath(carve([...ink, ...mirror(ink), stem], []), { k: 1 }));
};

export const kochoBuild = (c: Builder): void => {
  c.precision(3);
  const lobeRoot: V = [12, 1];
  const highTip: V = [76, 25];
  const outside: V = [92, 8];
  const bend: V = [80, -28];
  const lowerRoot: V = [15, -35];
  const forewing = [
    curve(lobeRoot, highTip, 118, [68, -91]),
    curve(highTip, outside, 18, [76, 8]),
    curve(outside, bend, 42, [50, 1]),
    curve(bend, lowerRoot, 104, [39, 62]),
    curve(lowerRoot, lobeRoot, 65, [77, -12]),
  ];
  const trails = [
    stroke(curve([17, -4], [52, 5], 70, [32, -66]), 3.7),
    stroke(curve([17, -11], [56, -5], 99, [36, -106]), 4.5),
    stroke(curve([17, -19], [58, -15], 140, [34, -145]), 4.6),
    stroke(curve([16, -28], [49, -26], 110, [30, -139]), 4.3),
  ];
  const high = carve([forewing], trails);

  const root: V = [15, -39];
  const shoulder: V = [48, -40];
  const foot: V = [49, -73];
  const tip: V = [23, -70];
  const hindwing = [
    curve(root, shoulder, 95, [38, 51]),
    curve(shoulder, foot, 27, [32, -57]),
    curve(foot, tip, 27, [37, -48]),
    curve(tip, root, 51, [65, -42]),
  ];
  const low = carve([hindwing], [
    stroke(curve([18, -44], [46, -55], 58, [14, -101]), 2.6),
    stroke(curve([29, -48], [37, -63], 24, [52, -47]), 2.5),
  ]);
  const antenna = [
    stroke(curve([12, 12], [57, 31], 113, [-7, 119]), 3.5),
    thickArc([56, 40], Math.hypot(1, 9), 3.5, Math.atan2(-9, 1), 1.47 * Math.PI),
  ];

  const thorax = [seg([-13, -1], [13, -1]), curve([13, -1], [0, -42], 63, [-49, -4]), curve([0, -42], [-13, -1], 63, [49, -4])];
  const abdomen = [curve([9, -37], [0, -74], 51, [-40, -47]), curve([0, -74], [-9, -37], 51, [40, -47]), seg([-9, -37], [9, -37])];
  const face = [disc([0, 8], 11), disc([13, 7], 5.2), disc([-13, 7], 5.2)];

  c.fill("butterfly", toPath([...high, ...mirror(high), ...low, ...mirror(low)], { k: 1 }));
  c.fill("butterfly", toPath(carve([...face, ...antenna, ...mirror(antenna)], [disc([13, 7], 2), disc([-13, 7], 2)]), { k: 1 }));
  c.fill("butterfly", toPath(carve([thorax, abdomen], [thickSeg([-8, -33], [9, -35], 2.3)]), { k: 1 }));
};
