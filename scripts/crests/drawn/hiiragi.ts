// The holly leaf, 柊, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from one leaf of the 1892 crest book's pair (伊呂波分新撰紋帳, frame 44, 丸にならび柊).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { arcTo, carveWhere, circleCircle, disc, inside, lineCircle, mirrored, nearest, pieceEnd, pieceStart, reversedRun, seg, toPath, vdist } from "../../construct/compass.ts";
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

/** The embracing pair, 抱き柊, in its own frame: the right leaf, whose midrib is a white line along a circle about a grid point left of the axis. */
const RIB: Circle = { c: [-59, 3], r: 109 };
/**
 * The right leaf's outer edge, round from the tip on the axis: five shallow bays, each an arc of a large circle whose centre
 * stands outside the leaf, and after each a spine like a flame, made as the upright leaf's: a small circle hooks the edge up to
 * the point and another is the flame's round back. Then the round foot.
 */
const HUG_BAYS: { bay: Circle; hook: Circle; back: Circle; turn: V; spine: V; drop: V }[] = [
  { bay: { c: [45, 139], r: 62 }, hook: { c: [43, 82], r: 6 }, back: { c: [47, 81], r: 7 }, turn: [39, 78], spine: [45, 88], drop: [51, 75] },
  { bay: { c: [74, 76], r: 23 }, hook: { c: [68, 59], r: 6 }, back: { c: [71, 56], r: 7 }, turn: [63, 56], spine: [72, 63], drop: [75, 50] },
  { bay: { c: [97, 43], r: 23 }, hook: { c: [86, 30], r: 6 }, back: { c: [89, 26], r: 7 }, turn: [80, 29], spine: [92, 32], drop: [85, 20] },
  { bay: { c: [118, 0], r: 39 }, hook: { c: [87, -12], r: 6 }, back: { c: [88, -17], r: 7 }, turn: [81, -12], spine: [93, -12], drop: [84, -23] },
  { bay: { c: [111, -58], r: 44 }, hook: { c: [73, -55], r: 6 }, back: { c: [71, -59], r: 7 }, turn: [67, -54], spine: [78, -58], drop: [68, -65] },
];
const HUG_FOOT: Circle = { c: [30, -28], r: 58 };
/** The veins: white lines ruled from grid points by the midrib, out toward the spines and in toward the axis, each as long as the space between two circles about the midrib's centre. */
const HUG_VEINS: { out: [V, V]; in: [V, V] }[] = [
  { out: [[43, 42], [63, 48]], in: [[43, 42], [23, 50]] },
  { out: [[49, 19], [69, 25]], in: [[49, 19], [29, 27]] },
  { out: [[50, -6], [70, 0]], in: [[50, -6], [30, 2]] },
  { out: [[44, -33], [64, -27]], in: [[44, -33], [24, -25]] },
  { out: [[30, -60], [50, -54]], in: [[30, -60], [10, -52]] },
];
const VEIN_REACH = 20;
/**
 * The inner edge, down the axis: the white between the two leaves is a column of four hearts. Each heart's side is a line ruled
 * from its point on the axis to the far side of a small circle, its lobe, whose centre stands this far from the axis at these
 * heights; the lobe's arc runs under to the axis, where the two leaves' spines meet and the next heart begins.
 */
const HEARTS = [67, 32, -3, -38];
const HEART = { x: 6, r: 7 };
/** The stems cross under the leaves: each lies along a line ruled through two grid points, the left leaf's over the right's, cut at an upright line. */
const HUG_STEM: [V, V] = [[10, -84], [-33, -97]];
const [HUG_STEM_WIDTH, HUG_STEM_END] = [5, 22];

/** The right leaf of the embracing pair. */
const hugLeaf = (): Piece[][] => {
  const run: Piece[] = [];
  const top = onRib(HUG_BAYS[0].bay, false);
  let at = top;
  HUG_BAYS.forEach(({ bay, hook, back, turn, spine, drop }, i) => {
    const next = HUG_BAYS[i + 1]?.bay ?? HUG_FOOT;
    const low = nearest(circleCircle(bay.c, bay.r, hook.c, hook.r), turn);
    const point = nearest(circleCircle(hook.c, hook.r, back.c, back.r), spine);
    const down = nearest(circleCircle(back.c, back.r, next.c, next.r), drop);
    run.push(arcTo(bay, at, low, true), arcTo(hook, low, point, true), arcTo(back, point, down, false));
    at = down;
  });
  const foot = nearest(lineCircle([LINE / 2, 0], [LINE / 2, 10], HUG_FOOT.c, HUG_FOOT.r), [0, -90]);
  run.push(arcTo(HUG_FOOT, at, foot, false));
  const inner: Piece[] = [];
  const sides: [V, V][] = [];
  at = top;
  HEARTS.forEach((y, i) => {
    const lobe: Circle = { c: [HEART.x, y], r: HEART.r };
    const side: [V, V] = [at, [HEART.x + HEART.r, y]];
    const on = nearest(lineCircle(side[0], side[1], lobe.c, lobe.r), at);
    const last = i === HEARTS.length - 1;
    const end: V = last ? nearest(lineCircle([LINE / 2, 0], [LINE / 2, 10], lobe.c, lobe.r), [0, y - HEART.r]) : [0, y - Math.sqrt(HEART.r ** 2 - HEART.x ** 2)];
    inner.push(seg(at, on), arcTo(lobe, on, end, false));
    sides.push(side);
    at = end;
  });
  const whole = [...run, seg(foot, at), ...reversedRun(inner)];
  const far = (p: V): number => vdist(RIB.c, p);
  const veins = HUG_VEINS.flatMap((vein) => [vein.out, vein.in]);
  const veined = (p: V): boolean =>
    HUG_VEINS.some(
      (vein) =>
        (Math.abs(leftOf(vein.out, p)) < FORK / 2 && far(p) > RIB.r && far(p) < RIB.r + LINE / 2 + VEIN_REACH && p[0] > 0) ||
        (Math.abs(leftOf(vein.in, p)) < FORK / 2 && far(p) < RIB.r && far(p) > RIB.r - LINE / 2 - VEIN_REACH && p[0] > 0),
    );

  return carveWhere(
    [
      ...run,
      ruled([LINE / 2, 0], [LINE / 2, 10]),
      ...sides.map(([a, b]) => ruled(a, b)),
      ...HEARTS.flatMap((y) => disc([HEART.x, y], HEART.r)),
      ...[RIB.r - LINE / 2 - VEIN_REACH, RIB.r - LINE / 2, RIB.r + LINE / 2, RIB.r + LINE / 2 + VEIN_REACH].flatMap((r) => disc(RIB.c, r)),
      ...veins.flatMap((line) => [beside(line, FORK / 2), beside(line, -FORK / 2)]),
    ],
    (p) => inside(whole, p) && Math.abs(far(p) - RIB.r) > LINE / 2 && !veined(p),
  );
};

/** The two stems' ends under the leaves, crossed, the left leaf's over the right's: each starts inside its own leaf's foot, at the end of the midrib, with a white line between it and the other leaf. */
const hugStems = (): Piece[][] => {
  const over: [V, V] = [[-HUG_STEM[0][0], HUG_STEM[0][1]], [-HUG_STEM[1][0], HUG_STEM[1][1]]];
  const right = HUG_FOOT;
  const left: Circle = { c: [-HUG_FOOT.c[0], HUG_FOOT.c[1]], r: HUG_FOOT.r };
  const half = HUG_STEM_WIDTH / 2;

  return carveWhere(
    [
      ...[over, HUG_STEM].flatMap((line) => [beside(line, half), beside(line, -half)]),
      beside(over, half + LINE),
      beside(over, -half - LINE),
      ...[-HUG_STEM_END, HUG_STEM_END].map((x) => ruled([x, 0], [x, 10])),
      ...[left, right].flatMap((circ) => disc(circ.c, circ.r + LINE)),
    ],
    (p) => {
      if (Math.abs(p[0]) > HUG_STEM_END || p[1] > -60) return false;
      const on = Math.abs(leftOf(over, p));
      if (on < half) return !within(right, p, LINE);

      return Math.abs(leftOf(HUG_STEM, p)) < half && on > half + LINE && !within(left, p, LINE);
    },
  );
};

/**
 * Two holly leaves that embrace, 抱き柊: each leaf curves from the tip on the axis round to the foot, its spines on the outside,
 * the white between them a column of four hearts, and the two stems crossed under them. The right leaf is built first, then
 * the left where it stands, then the stems.
 */
export const dakiHiiragiBuild = (c: Builder, part: string, reach: number): void => {
  const k = reach / 100;
  const one = longLast(hugLeaf());
  const flip = (loops: Piece[][]): Piece[][] => loops.map((loop) => loop.map(mirrored));

  c.guideCircle(C0, reach);
  c.fill(part, toPath(one, { k }));
  c.fill(part, toPath(flip(one), { k }));
  c.fill(part, toPath(hugStems(), { k }));
};
