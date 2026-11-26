// The holly leaf, 柊, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from one leaf of the 1892 crest book's pair (伊呂波分新撰紋帳, frame 44, 丸にならび柊).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { arcTo, carveWhere, circleCircle, disc, inside, mirrored, nearest, pieceEnd, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the midrib, a vein, and the white between the leaf and its stem. */
const LINE = 2;
/** The right edge of the leaf's point: a circle that crosses its mirror image on the midrib, at the tip. */
const POINT: Circle = { c: [-24, 56], r: 40 };
const TIP: V = [0, 88];
/**
 * The right side's four lobes, from the top down. Each is a round bay cut into the leaf and, under it, the lobe's round edge: the
 * spine stands where the two circles cross, on the bay's far side, and points up. `join` is near where the bay meets the edge
 * above it, and `tip` near the spine.
 */
const LOBES: { bay: Circle; edge: Circle; join: V; tip: V }[] = [
  { bay: { c: [21, 68], r: 10 }, edge: { c: [14, 55], r: 24 }, join: [13, 72], tip: [30, 73] },
  { bay: { c: [32, 35], r: 12 }, edge: { c: [24, 27], r: 23 }, join: [20, 32], tip: [42, 41] },
  { bay: { c: [35, 9], r: 11 }, edge: { c: [28, 0], r: 22 }, join: [25, 4], tip: [44, 14] },
  { bay: { c: [35, -24], r: 11 }, edge: { c: [14, -36], r: 35 }, join: [24, -22], tip: [44, -18] },
];
/** The side veins leave the midrib at these heights, each rising one in three to an upright line; a branch leaves each a little way out, rising four in three to another. */
const VEINS = [36, 14, -9, -33, -55];
const VEIN_END = 20;
const BRANCH_FROM = 6;
const BRANCH_END = 15;
/** The stem: a short stub under the leaf, between two upright lines, from a level line down to the room's edge. */
const STEM = { half: 11, top: -71, foot: -97 };

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

/** The right side's edge from the tip down to the foot on the midrib: the point's arc, then for each lobe its bay, round to the spine, and its edge, down to the next bay. */
const side = (): Piece[] => {
  const run: Piece[] = [];
  let at = TIP;
  let above = POINT;
  for (const lobe of LOBES) {
    const join = nearest(circleCircle(above.c, above.r, lobe.bay.c, lobe.bay.r), lobe.join);
    const spine = nearest(circleCircle(lobe.bay.c, lobe.bay.r, lobe.edge.c, lobe.edge.r), lobe.tip);
    run.push(arcTo(above, at, join, false), arcTo(lobe.bay, join, spine, true));
    at = spine;
    above = lobe.edge;
  }
  run.push(arcTo(above, at, [0, above.c[1] - Math.sqrt(above.r ** 2 - above.c[0] ** 2)], false));

  return run;
};

/** The holly leaf's right half and its stem in the leaf's own frame, kept inside the circle `room` when one is given. */
const leaf = (room?: Circle): { half: Piece[][]; stem: Piece[][] } => {
  const inRoom = (p: V): boolean => room === undefined || within(room, p);
  const walls = room === undefined ? [] : disc(room.c, room.r);
  const mains: [V, V][] = VEINS.map((y): [V, V] => [[0, y], [3, y + 1]]);
  const branches: [V, V][] = VEINS.map((y): [V, V] => [[BRANCH_FROM, y + BRANCH_FROM / 3], [BRANCH_FROM + 3, y + BRANCH_FROM / 3 + 4]]);
  const vein = (p: V): boolean =>
    mains.some((line) => Math.abs(leftOf(line, p)) < LINE / 2 && p[0] < VEIN_END) || branches.some((line, i) => Math.abs(leftOf(line, p)) < LINE / 2 && p[0] < BRANCH_END && leftOf(mains[i], p) > 0);
  const edge = side();
  const whole = [...edge, seg(pieceEnd(edge[edge.length - 1]), TIP)];
  const half = carveWhere(
    [...edge, ...[LINE / 2, BRANCH_END, VEIN_END].map((x) => ruled([x, 0], [x, 10])), ...[...mains, ...branches].flatMap((line) => [beside(line, LINE / 2), beside(line, -LINE / 2)]), ...walls],
    (p) => inRoom(p) && p[0] > LINE / 2 && inside(whole, p) && !vein(p),
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, STEM.foot].map((y) => ruled([0, y], [10, y])), ...walls],
    (p) => inRoom(p) && Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > STEM.foot,
  );

  return { half: longLast(half), stem };
};

/** The pair's leaves are nine tenths of the room's hundredths, each 47 from the axis. */
const PAIR = { k: 0.9, x: 47, y: 0 };

/**
 * Two holly leaves side by side, 並び柊, in the room inside a ring: each stands upright on its stem, their inner spines all but
 * meeting on the axis, and the ring's room cuts the feet of their stems. The right leaf is built in full: the half toward the
 * axis, the stem, then the outer half; then the left leaf where it stands.
 */
export const narabiHiiragiBuild = (c: Builder, part: string, room: number): void => {
  const k = (room / 100) * PAIR.k;
  const at: V = [(PAIR.x * room) / 100, (PAIR.y * room) / 100];
  // The room's circle as each half of the leaf sees it: the outer half as it is, the inner half mirrored in the leaf's own axis.
  const wall = (side: 1 | -1): Circle => ({ c: [(-side * at[0]) / k, -at[1] / k], r: room / k });
  const outer = leaf(wall(1));
  const inner = leaf(wall(-1));
  const flip = (loops: Piece[][]): Piece[][] => loops.map((loop) => loop.map(mirrored));

  c.guideCircle(C0, room);
  for (const mirror of [false, true]) {
    const placing: Placing = { k, at: [mirror ? -at[0] : at[0], at[1]], mirror };
    c.fill(part, toPath(flip(inner.half), placing));
    c.fill(part, toPath(outer.stem, placing));
    c.fill(part, toPath(outer.half, placing));
  }
};
