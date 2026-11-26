// The holly leaf, 柊, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from one leaf of the 1892 crest book's pair (伊呂波分新撰紋帳, frame 44, 丸にならび柊).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { arcTo, carveWhere, circleCircle, disc, inside, mirrored, nearest, pieceEnd, pieceStart, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** The white lines: the midrib and the white between the leaf and its stalk, and a side vein. */
const [LINE, VEIN] = [2, 1.5];
/**
 * The right side's edge, from the tip down: four hollow bays, each an arc of a circle whose centre stands outside the leaf, and
 * then the round foot. Two neighbours cross in a sharp spine, the outermost point of the leaf there; `spine` is near where each
 * ends, and the first begins at the tip, on the midrib.
 */
const BAYS: { bay: Circle; spine: V }[] = [
  { bay: { c: [33, 100], r: 35 }, spine: [27, 66] },
  { bay: { c: [44, 54], r: 20 }, spine: [41, 35] },
  { bay: { c: [55, 20], r: 20 }, spine: [44, 3] },
  { bay: { c: [55, -14], r: 19 }, spine: [44, -28] },
];
const FOOT: Circle = { c: [10, -35], r: 35 };
/** The side veins leave the midrib at these heights, each rising one in two to an upright line. */
const VEINS = [40, 12, -16, -44];
const VEIN_END = 20;
/** The stalk: thin, under the leaf, between two upright lines, from a level line down to the room's edge. */
const STEM = { half: 4, top: -71, foot: -97 };

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

/** Where a circle about a point right of the midrib crosses it, on the upper or the lower side. */
const onRib = (circ: Circle, up: boolean): V => [0, circ.c[1] + (up ? 1 : -1) * Math.sqrt(circ.r ** 2 - circ.c[0] ** 2)];

/** The right side's edge from the tip down to the foot on the midrib: the bays, spine to spine, then the foot's round. */
const side = (): Piece[] => {
  const run: Piece[] = [];
  let at = onRib(BAYS[0].bay, false);
  BAYS.forEach(({ bay, spine }, i) => {
    const next = BAYS[i + 1]?.bay ?? FOOT;
    const to = nearest(circleCircle(bay.c, bay.r, next.c, next.r), spine);
    run.push(arcTo(bay, at, to, true));
    at = to;
  });
  run.push(arcTo(FOOT, at, onRib(FOOT, false), false));

  return run;
};

/** The holly leaf's right half and its stalk in the leaf's own frame, kept inside the circle `room` when one is given. */
const leaf = (room?: Circle): { half: Piece[][]; stem: Piece[][] } => {
  const inRoom = (p: V): boolean => room === undefined || within(room, p);
  const walls = room === undefined ? [] : disc(room.c, room.r);
  const veins: [V, V][] = VEINS.map((y): [V, V] => [[0, y], [2, y + 1]]);
  const vein = (p: V): boolean => veins.some((line) => Math.abs(leftOf(line, p)) < VEIN / 2 && p[0] < VEIN_END);
  const edge = side();
  const whole = [...edge, seg(pieceEnd(edge[edge.length - 1]), pieceStart(edge[0]))];
  const half = carveWhere(
    [...edge, ...[LINE / 2, VEIN_END].map((x) => ruled([x, 0], [x, 10])), ...veins.flatMap((line) => [beside(line, VEIN / 2), beside(line, -VEIN / 2)]), ...walls],
    (p) => inRoom(p) && p[0] > LINE / 2 && inside(whole, p) && !vein(p),
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, STEM.foot].map((y) => ruled([0, y], [10, y])), ...walls],
    (p) => inRoom(p) && Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > STEM.foot,
  );

  return { half: longLast(half), stem };
};

/** The pair's leaves are drawn in the room's hundredths, each 46 from the axis. */
const PAIR = { k: 1, x: 46, y: 0 };

/**
 * Two holly leaves side by side, 並び柊, in the room inside a ring: each stands upright on its stalk, their inner spines all but
 * meeting on the axis, and the ring's room cuts the feet of their stalks. The right leaf is built in full: the half toward the
 * axis, the stalk, then the outer half; then the left leaf where it stands.
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
