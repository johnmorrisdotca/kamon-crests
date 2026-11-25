// The holly leaf, 柊, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from one leaf of the 1892 crest book's pair (伊呂波分新撰紋帳, frame 44, 丸にならび柊).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, circleCircle, disc, mirrored, nearest, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the midrib, a vein, and the white between the leaf and its stem. */
const LINE = 2;
/** The right edge of the leaf's point: a circle that crosses its mirror image on the axis, at the tip. */
const POINT: Circle = { c: [-28, 72], r: 38 };
/** The right side's four lobes, from the top down: the round outer edge of each, the bay cut over it, and near where the two cross, which is the spine's tip. */
const LOBES: { edge: Circle; bay: Circle; tip: V }[] = [
  { edge: { c: [13, 59], r: 24 }, bay: { c: [17, 75], r: 13 }, tip: [30, 76] },
  { edge: { c: [3, 41], r: 43 }, bay: { c: [27, 47], r: 19 }, tip: [46, 45] },
  { edge: { c: [18, 4], r: 31 }, bay: { c: [35, 12], r: 16 }, tip: [49, 4] },
  { edge: { c: [2, -30], r: 48 }, bay: { c: [37, -25], r: 13 }, tip: [50, -27] },
];
/** The bays reach in to this line, ruled through two grid points: the leaf is whole on the midrib's side of it. */
const CORE: [V, V] = [[10, 70], [30, -40]];
/** The side veins leave the midrib at these heights, each rising one in three to an upright line; a branch leaves each a little way out, rising four in three to another. */
const VEINS = [40, 18, -9, -32, -59];
const VEIN_END = 21;
const BRANCH_FROM = 6;
const BRANCH_END = 16;
/** The stem: a short stub under the leaf, between two upright lines and two level ones. */
const STEM = { half: 9, top: -80, foot: -97 };

const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 40, a[1] - (b[1] - a[1]) * 40], [a[0] + (b[0] - a[0]) * 40, a[1] + (b[1] - a[1]) * 40]);
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};
/** A spine's tip: where a lobe's edge and its bay cross. */
const spine = (lobe: { edge: Circle; bay: Circle; tip: V }): V => nearest(circleCircle(lobe.edge.c, lobe.edge.r, lobe.bay.c, lobe.bay.r), lobe.tip);

/**
 * The holly leaf, 柊 (the holly osmanthus, whose spiny leaves keep evil out): a leaf that stands upright on a short stem, a
 * sharp point at the top and four spines down each side with a round bay over each. A white midrib runs its whole length, and
 * five white veins leave it on each side, each with a branch. The right half is built in full, then the stem, and the left
 * half where it stands.
 */
export const hiiragiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const mains: [V, V][] = VEINS.map((y): [V, V] => [[0, y], [3, y + 1]]);
  const branches: [V, V][] = VEINS.map((y): [V, V] => [[BRANCH_FROM, y + BRANCH_FROM / 3], [BRANCH_FROM + 3, y + BRANCH_FROM / 3 + 4]]);
  const vein = (p: V): boolean =>
    mains.some((line) => Math.abs(leftOf(line, p)) < LINE / 2 && p[0] < VEIN_END) || branches.some((line, i) => Math.abs(leftOf(line, p)) < LINE / 2 && p[0] < BRANCH_END && leftOf(mains[i], p) > 0);
  const lobes = LOBES.map((lobe) => ({ ...lobe, top: spine(lobe)[1] }));
  const half = carveWhere(
    [
      ...disc(POINT.c, POINT.r),
      ...LOBES.flatMap((lobe) => [...disc(lobe.edge.c, lobe.edge.r), ...disc(lobe.bay.c, lobe.bay.r)]),
      ruled(CORE[0], CORE[1]),
      ...[LINE / 2, BRANCH_END, VEIN_END].map((x) => ruled([x, 0], [x, 10])),
      ...[...mains, ...branches].flatMap((line) => [beside(line, LINE / 2), beside(line, -LINE / 2)]),
    ],
    (p) => p[0] > LINE / 2 && (within(POINT, p) || lobes.some((lobe) => within(lobe.edge, p) && (leftOf(CORE, p) < 0 || (p[1] < lobe.top && !within(lobe.bay, p))))) && !vein(p),
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, STEM.foot].map((y) => ruled([0, y], [10, y]))],
    (p) => Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > STEM.foot,
  );

  c.guideCircle(C0, reach);
  c.fill(part, toPath(longLast(half), placing));
  c.fill(part, toPath(stem, placing));
  c.fill(part, toPath(longLast(half.map((loop) => loop.map(mirrored))), placing));
};
