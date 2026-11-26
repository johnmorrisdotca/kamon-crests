// Oak-leaf crests set out with the compass and the ruler, each in its own frame: the centre at (0, 0), x to the right, y up, the
// layout circle at 100. The embracing oak's proportions were measured from the crest book of 1892 (伊呂波分新撰紋帳, frame 17, 抱かしは).
import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, disc, mirrored, seg, shortArc, thickArc, thickSeg, toPath, vadd, vdist, vsub } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

/** A white line of the leaf: the midrib, a vein, and the gap between two leaves. */
export const LINE = 2;

/** The white vein from `from` to `to`, an arc of the circle of radius `r` through them whose centre lies towards `hint`, inked `LINE` wide. */
export const vein = (from: V, to: V, r: number, hint: V): Region => {
  const circ = circleThrough(from, to, r, hint);
  const piece = shortArc(circ, from, to);

  return piece.t === "A" ? thickArc(circ.c, circ.r, LINE, piece.a0, piece.a1) : thickSeg(from, to, LINE);
};

/** The reversed copy of regions, mirrored left to right. */
export const flipped = (regions: Region[]): Region[] => regions.map((region) => region.map(mirrored));

// ---- the embracing oak, 抱き柏: two leaves face to face, their tips together at the top ----

/** The right leaf's outside is four scallops, each an arc of a circle, and an arc of one wide circle across the top that runs nearly along the layout circle. */
const EMBRACE_SCALLOPS: Circle[] = [{ c: [51, -52], r: 20 }, { c: [58, -22], r: 32 }, { c: [65, 8], r: 29 }, { c: [57, 34], r: 30 }];
const EMBRACE_TOP: Circle = { c: [-8, -9], r: 105 };
/** The level line the leaf's foot is cut on, and the line the two leaves are parted by: half a white line from the axis. */
const EMBRACE_FLOOR = -72;
/** The foot is cut on a slant from the axis to the floor, so that the two leaves part in a V where their stalks cross. */
const EMBRACE_SLANT: [V, V] = [[LINE / 2, -62], [30, -72]];
/** The midrib: a white arc of this circle, from the foot to near the tip. */
const EMBRACE_RIB: Circle = { c: [-110, 15], r: 156 };
const EMBRACE_RIB_FROM: V = [24, -62];
const EMBRACE_RIB_TO: V = [30, 84];
/** The veins, each from where it leaves the midrib to where it ends, with the radius of its arc: those outside the midrib first, then those between it and the axis. */
const EMBRACE_VEINS: [V, V, number][] = [
  [[38, -40], [77, 25], 92],
  [[25, -62], [81, -6], 95],
  [[43, -23], [71, 42], 97],
  [[47, -2], [61, 47], 113],
  [[46, 24], [52, 65], 103],
  [[40, 37], [15, 67], 58],
  [[42, 14], [15, 53], 65],
  [[39, -13], [16, 36], 119],
  [[37, -32], [15, 13], 85],
  [[31, -43], [15, -9], 82],
  [[21, -57], [9, -15], 149],
];
/** The stalk that carries on from the foot of the midrib, as long as this and as wide as this. */
const STALK = { length: 44, width: 4.5, to: [-14, -80] as V };

/** The right leaf of the embracing oak, with its midrib and veins cut out of it, and its stalk. */
export const embraceLeaf = (): Region[] => {
  const circles = [...EMBRACE_SCALLOPS, EMBRACE_TOP];
  const inDisc = (circ: Circle, p: V): boolean => vdist(circ.c, p) < circ.r;
  const core: V[] = [EMBRACE_SLANT[0], EMBRACE_SLANT[1], [51, EMBRACE_FLOOR], [51, -52], [58, -22], [65, 8], [57, 34], [LINE / 2, 90]];
  const inCore = (p: V): boolean => {
    let hit = false;
    for (let i = 0, j = core.length - 1; i < core.length; j = i, i += 1) {
      const [a, b] = [core[i], core[j]];
      if (a[1] > p[1] !== b[1] > p[1] && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) hit = !hit;
    }

    return hit;
  };
  const leaf = carveWhere(
    [...circles.flatMap((circ) => disc(circ.c, circ.r)), seg([LINE / 2, -110], [LINE / 2, 110]), seg([30, EMBRACE_FLOOR], [110, EMBRACE_FLOOR]), seg(EMBRACE_SLANT[0], EMBRACE_SLANT[1])],
    (p) => p[0] > LINE / 2 && p[1] > EMBRACE_FLOOR && aboveSlant(p) && (EMBRACE_SCALLOPS.some((circ) => inDisc(circ, p)) || inCore(p) || (inDisc(EMBRACE_TOP, p) && p[1] > 40)),
  );
  const rib = thickArc(EMBRACE_RIB.c, EMBRACE_RIB.r, LINE, angleFrom(EMBRACE_RIB.c, EMBRACE_RIB_FROM), angleFrom(EMBRACE_RIB.c, EMBRACE_RIB_TO));
  // The outer veins bow out from a centre on the axis side of them, the inner ones the other way.
  const white: Region[] = [rib, ...EMBRACE_VEINS.map(([from, to, r], i) => vein(from, to, r, [i < 5 ? -400 : 400, from[1]]))];

  return carve(leaf, white);
};

/** Whether a point is above the slanted cut of the foot, which is ruled on to where it meets the floor and the axis. */
const aboveSlant = (p: V): boolean => {
  const [a, b] = EMBRACE_SLANT;

  return p[0] >= b[0] || (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]) > 0;
};

const angleFrom = (c: V, p: V): number => Math.atan2(p[1] - c[1], p[0] - c[0]);

/** A bar of the given width from `from` along the line towards `towards` for `length`, its ends cut square. */
export const bar = (from: V, towards: V, length: number, width: number): Region => {
  const d = vsub(towards, from);
  const k = length / Math.hypot(d[0], d[1]);

  return thickSeg(from, vadd(from, [d[0] * k, d[1] * k]), width);
};

/** The embracing oak, 抱き柏: the right leaf in full, then the left one where it stands, mirrored; each with its stalk. */
export const embraceBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const from = EMBRACE_RIB_FROM;
  const leaf = embraceLeaf();
  const stalk = [bar(from, STALK.to, STALK.length, STALK.width)];
  for (const loops of [leaf, flipped(leaf)]) c.fill(part, toPath(loops, placing));
  for (const loops of [stalk, flipped(stalk)]) c.fill(part, toPath(loops, placing));
};
