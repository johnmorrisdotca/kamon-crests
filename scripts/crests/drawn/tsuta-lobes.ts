// The large split ivy, 大割蔦, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at
// 100. Its proportions were measured from the crest book of 1892 (伊呂波分新撰紋帳, frame 22, 大割蔦).
import type { Builder } from "../../construct/builder.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line between two lobes. */
const LINE = 2;
/** The small ring where the lobes meet: a disc in a white ring, on the axis. */
const RING: V = [0, 22];
const RING_WHITE = 10;
const RING_DISC = 8;

/** The upper right lobe's edge, from the axis out: four scallops, round bodies that also fill the lobe. */
const TOP_EDGE: Circle[] = [{ c: [20, 39], r: 34 }, { c: [44, 51], r: 29 }, { c: [41, 56], r: 25 }, { c: [53, 42], r: 26 }];
/** The right lobe: a round body that fills it, and the scallops of its end, from the upper edge down. */
const SIDE_EDGE: Circle[] = [{ c: [30, 5], r: 32 }, { c: [60, 18], r: 22 }, { c: [75, 13], r: 17 }, { c: [82, -5], r: 14 }, { c: [59, -6], r: 35 }];
/** The lobe that points down: the part common to two round bodies, one each side of the axis, and its small foot. */
const DOWN_BODY: [Circle, Circle] = [{ c: [-13, -28], r: 54 }, { c: [13, -28], r: 54 }];
const DOWN_FOOT: Circle = { c: [0, -69], r: 15 };
/** The white line between the upper right lobe and the right one: the inside of this circle is the right lobe. */
const TOP_SIDE: Circle = { c: [47, -52], r: 87 };
/** The white line between the right lobe and the lower one: the right one lies outside this circle, and the lower one inside it and inside its mirror image. */
const SIDE_DOWN: Circle = { c: [-46, -58], r: 87.5 };

const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
const within = (circles: Circle[], p: V): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r);

/**
 * The large split ivy, 大割蔦: five round-edged lobes about a small ring, a white line between neighbours. The two upper lobes
 * are parted by an upright line, and each lies over a lobe at its side; the lobe that points down lies between the side ones.
 * The right half is built in full, the lower lobe, and then the left half where it stands.
 */
export const owariBuild = (c: Builder, part: string, reach: number, at: V = [0, 0]): void => {
  const placing: Placing = { k: reach / 100, at };
  const half = LINE / 2;
  const ring = (p: V): boolean => vdist(RING, p) < RING_WHITE;
  const mirror = flip(SIDE_DOWN);
  const topLobe = (p: V): boolean => p[0] > half && vdist(TOP_SIDE.c, p) > TOP_SIDE.r + half && within(TOP_EDGE, p);
  const sideLobe = (p: V): boolean => p[0] > half && vdist(TOP_SIDE.c, p) < TOP_SIDE.r - half && vdist(SIDE_DOWN.c, p) > SIDE_DOWN.r + half && within(SIDE_EDGE, p);
  const downLobe = (p: V): boolean => vdist(SIDE_DOWN.c, p) < SIDE_DOWN.r - half && vdist(mirror.c, p) < mirror.r - half && (DOWN_BODY.every((circ) => vdist(circ.c, p) < circ.r) || vdist(DOWN_FOOT.c, p) < DOWN_FOOT.r);
  const bounds: Piece[] = [
    ...[...TOP_EDGE, ...SIDE_EDGE, ...DOWN_BODY, DOWN_FOOT].flatMap((circ) => disc(circ.c, circ.r)),
    ...[TOP_SIDE, SIDE_DOWN].flatMap((circ) => [...disc(circ.c, circ.r - half), ...disc(circ.c, circ.r + half)]),
    ...[mirror].flatMap((circ) => [...disc(circ.c, circ.r - half), ...disc(circ.c, circ.r + half)]),
    ...disc(RING, RING_WHITE),
    seg([half, -110], [half, 110]),
  ];
  const right = carveWhere(bounds, (p) => !ring(p) && (topLobe(p) || sideLobe(p)));
  const down = carveWhere(bounds, (p) => !ring(p) && downLobe(p));
  for (const loops of [right, down, right.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(longLast(loops), placing));
  c.fill(part, toPath([disc(RING, RING_DISC)], placing));
};

// ---- the stylised ivy, 崩し蔦: five lobes with wider white gaps and no ring, their points meeting at one place ----

/** The upper right lobe: round bodies along its top and fill. */
const KUZUSHI_TOP: Circle[] = [{ c: [22, 59], r: 25 }, { c: [41, 60], r: 22 }, { c: [55, 52], r: 15 }, { c: [47, 48], r: 19 }];
/** The right lobe: three round bodies. */
const KUZUSHI_SIDE: Circle[] = [{ c: [28, 12], r: 28 }, { c: [57, 8], r: 30 }, { c: [70, -5], r: 25 }, { c: [52, -2], r: 27 }];
/** The lobe that points down: one round body, and three small scallops at its foot. */
const KUZUSHI_DOWN: Circle[] = [{ c: [0, -26], r: 38 }, { c: [0, 20], r: 40 }, { c: [0, -57], r: 9 }, { c: [-13, -51], r: 9 }, { c: [13, -51], r: 9 }];
/** The white gap between the upper right lobe and the right one: the right lobe's top edge is this circle, and the upper lobe stands outside the same circle grown by the gap. */
const KUZUSHI_TOP_SIDE: Circle = { c: [43, -59], r: 97 };
/** The gap between the right lobe and the lower one: the lower lobe is inside this circle, the right one outside it grown by the gap, and the lower one inside its mirror image too. */
const KUZUSHI_SIDE_DOWN: Circle = { c: [-47, -39], r: 86 };
/** The lens between the two upper lobes: the right lobe lies outside this circle, and the left one outside its mirror image. */
const KUZUSHI_LENS: Circle = { c: [-33, 56], r: 37.5 };
/** How wide the white gaps are: between the upper and the side lobes, and between the side and the lower ones. */
const KUZUSHI_GAP = { top: 3.5, down: 3.5 };

/**
 * The stylised ivy, 崩し蔦: five lobes with a white gap between neighbours and no ring: the two upper lobes lean together and leave a
 * white lens between them, the side lobes lie under them and the lower lobe between the side ones. The right half is built in full,
 * the lower lobe, and then the left half where it stands.
 */
export const kuzushiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const mirror = flip(KUZUSHI_SIDE_DOWN);
  const topLobe = (p: V): boolean => vdist(KUZUSHI_LENS.c, p) > KUZUSHI_LENS.r && vdist(KUZUSHI_TOP_SIDE.c, p) > KUZUSHI_TOP_SIDE.r + KUZUSHI_GAP.top && within(KUZUSHI_TOP, p);
  const sideLobe = (p: V): boolean =>
    p[0] > 0 && vdist(KUZUSHI_TOP_SIDE.c, p) < KUZUSHI_TOP_SIDE.r && vdist(KUZUSHI_SIDE_DOWN.c, p) > KUZUSHI_SIDE_DOWN.r + KUZUSHI_GAP.down && within(KUZUSHI_SIDE, p);
  const downLobe = (p: V): boolean => vdist(KUZUSHI_SIDE_DOWN.c, p) < KUZUSHI_SIDE_DOWN.r && vdist(mirror.c, p) < mirror.r && within(KUZUSHI_DOWN, p);
  const bounds: Piece[] = [
    ...[...KUZUSHI_TOP, ...KUZUSHI_SIDE, ...KUZUSHI_DOWN].flatMap((circ) => disc(circ.c, circ.r)),
    ...disc(KUZUSHI_TOP_SIDE.c, KUZUSHI_TOP_SIDE.r),
    ...disc(KUZUSHI_TOP_SIDE.c, KUZUSHI_TOP_SIDE.r + KUZUSHI_GAP.top),
    ...disc(KUZUSHI_SIDE_DOWN.c, KUZUSHI_SIDE_DOWN.r),
    ...disc(KUZUSHI_SIDE_DOWN.c, KUZUSHI_SIDE_DOWN.r + KUZUSHI_GAP.down),
    ...disc(mirror.c, mirror.r),
    ...disc(KUZUSHI_LENS.c, KUZUSHI_LENS.r),
  ];
  const right = carveWhere(bounds, (p) => topLobe(p) || sideLobe(p));
  const down = carveWhere(bounds, downLobe);
  for (const loops of [right, down, right.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(longLast(loops), placing));
};
