// Stylised butterflies measured from frame 34 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, mirrored, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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
