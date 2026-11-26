// The holly leaf, 柊, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from one leaf of the 1892 crest book's pair (伊呂波分新撰紋帳, frame 44, 丸にならび柊).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { arcTo, carveWhere, circleCircle, disc, inside, mirrored, nearest, pieceEnd, pieceStart, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** The white lines: the midrib and the white between the leaf and its stalk, and a vein's fork. */
const [LINE, FORK] = [2, 1.5];
/**
 * The right side's edge, from the tip down: four shallow bays, each an arc of a circle whose centre stands outside the leaf.
 * At its lower end each runs into a small circle, the hook, which turns the edge up into a spine like a small flame; the flame's
 * round back is another small circle, which crosses the hook at the spine's point and runs down into the next bay, or under
 * the last flame into the foot's round. `turn` is near where the bay meets its hook, `spine` near the point and `drop` near
 * where the back meets what comes next.
 */
const BAYS: { bay: Circle; hook: Circle; back: Circle; turn: V; spine: V; drop: V }[] = [
  { bay: { c: [34, 95], r: 35 }, hook: { c: [21, 67], r: 5 }, back: { c: [25, 63], r: 5 }, turn: [19, 63], spine: [26, 68], drop: [25, 58] },
  { bay: { c: [60, 57], r: 35 }, hook: { c: [35, 43], r: 9 }, back: { c: [38, 37], r: 8 }, turn: [30, 36], spine: [43, 44], drop: [38, 29] },
  { bay: { c: [78, 22], r: 40 }, hook: { c: [38, 17], r: 8 }, back: { c: [40, 10], r: 6 }, turn: [32, 12], spine: [45, 13], drop: [38, 4] },
  { bay: { c: [76, -13], r: 41 }, hook: { c: [38, -22], r: 8 }, back: { c: [40, -29], r: 6 }, turn: [32, -27], spine: [45, -26], drop: [43, -34] },
];
const FOOT: Circle = { c: [10, -38], r: 33 };
/** The side veins: each a white line along a circle of one width through the midrib at these heights, its centre this far from that point, so that it leaves the midrib rising and curves up, as far as an upright line. A short fork leaves each, ruled through two points this far from the same point. */
const VEINS = [40, 12, -16, -44];
const VEIN = { c: [-25, 54] as V, r: 60, end: 22, fork: [[10, 5], [22, 9]] as [V, V] };
/** The stalk: thin, under the leaf, between two upright lines, from a level line down to the room's edge. */
const STEM = { half: 4, top: -72, foot: -97 };

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

/** The right side's edge from the tip down to the foot on the midrib: each bay, its hook up to the spine, and at last the foot's round. */
const side = (): Piece[] => {
  const run: Piece[] = [];
  let at = onRib(BAYS[0].bay, false);
  for (const [i, { bay, hook, back, turn, spine, drop }] of BAYS.entries()) {
    const low = nearest(circleCircle(bay.c, bay.r, hook.c, hook.r), turn);
    const point = nearest(circleCircle(hook.c, hook.r, back.c, back.r), spine);
    const next = BAYS[i + 1]?.bay ?? FOOT;
    const down = nearest(circleCircle(back.c, back.r, next.c, next.r), drop);
    run.push(arcTo(bay, at, low, true), arcTo(hook, low, point, true), arcTo(back, point, down, false));
    at = down;
  }
  run.push(arcTo(FOOT, at, onRib(FOOT, false), false));

  return run;
};

/** The holly leaf's right half and its stalk in the leaf's own frame, kept inside the circle `room` when one is given. */
const leaf = (room?: Circle): { half: Piece[][]; stem: Piece[][] } => {
  const inRoom = (p: V): boolean => room === undefined || within(room, p);
  const walls = room === undefined ? [] : disc(room.c, room.r);
  const veins = VEINS.map((y) => ({ c: [VEIN.c[0], y + VEIN.c[1]] as V, fork: VEIN.fork.map(([dx, dy]): V => [dx, y + dy]) as [V, V] }));
  const veined = (p: V): boolean =>
    p[0] < VEIN.end &&
    veins.some(({ c, fork }) => p[1] < c[1] && ((vdist(c, p) > VEIN.r && vdist(c, p) < VEIN.r + LINE) || (vdist(c, p) > VEIN.r + LINE && Math.abs(leftOf(fork, p)) < FORK / 2)));
  const edge = side();
  const whole = [...edge, seg(pieceEnd(edge[edge.length - 1]), pieceStart(edge[0]))];
  const half = carveWhere(
    [
      ...edge,
      ...[LINE / 2, VEIN.end].map((x) => ruled([x, 0], [x, 10])),
      ...veins.flatMap(({ c, fork }) => [...disc(c, VEIN.r), ...disc(c, VEIN.r + LINE), beside(fork, FORK / 2), beside(fork, -FORK / 2)]),
      ...walls,
    ],
    (p) => inRoom(p) && p[0] > LINE / 2 && inside(whole, p) && !veined(p),
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, STEM.foot].map((y) => ruled([0, y], [10, y])), ...walls],
    (p) => inRoom(p) && Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > STEM.foot,
  );

  return { half: longLast(half), stem };
};

/** The pair's leaves are drawn in the room's hundredths, each 47 from the axis and 2 under the centre. */
const PAIR = { k: 1, x: 47, y: -2 };

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
