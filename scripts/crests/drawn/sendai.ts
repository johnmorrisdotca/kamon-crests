// The Sendai bamboo, 仙台笹 (竹に雀): a ring of bamboo with leaves outside it and two sparrows face to face inside, struck
// and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its proportions were measured
// from the 1892 crest book (伊呂波分新撰紋帳, frame 38, 仙臺さゝ).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** The white lines: a joint of the bamboo, between two feathers, and down the middle of a leaf. */
const [JOINT, FEATHER, MIDRIB] = [2, 1.5, 1];
/** The ring of bamboo, between two circles about the centre, and the thin stem the leaves grow from, just outside it. */
const [RING_OUT, RING_IN] = [75, 56];
const [STEM_OUT, STEM_IN] = [81, 79];
/** The ring is open at the top between two lines ruled from the centre through grid points, and a joint crosses it on each of two more. */
const OPEN: V = [4, 15];
const JOINT_AT: V = [9, 4];
/** The grain of the bamboo by each joint: two white lines along the ring, each between two circles about the centre, from a line ruled through one grid point to the line through another. */
const GRAIN = [62, 68];
const GRAIN_ENDS: [V, V] = [[3, 2], [4, 1]];
/** The knot in the opening: a star of four points, the room left between four circles of one width. */
const KNOT: V = [0, 65];
const KNOT_CIRCLE: Circle = { c: [15, 17], r: 17 };
/** The cut ends of the two stalks under the ring: between upright lines, down to a level line, with a joint across each. */
const [END_IN, END_OUT, END_FOOT, END_JOINT] = [6, 17, -92, -84];
/** A pair of leaves where it stands at three o'clock: each leaf is the lens between two circles of one width on grid points. */
const LEAF = 17;
const LEAVES: [V, V][] = [
  [[82, 17], [97, -3]],
  [[70, 31], [94, 24]],
];
/** The pairs: five a side, a twelfth of a turn apart, the first 27 degrees from the top; a sixth place, by the stalks' ends, has the second leaf only. */
const SPRAYS = [0, 1, 2, 3, 4, 5];
const FIRST = 27;

/** The right sparrow. Its back is a circle on the axis and its front a wider circle from the other side; a white line parts the two birds on the axis. */
const BACK: Circle = { c: [0, -2], r: 44 };
const FRONT: Circle = { c: [-24, -9], r: 47 };
/** The head, the band of scales round it, and a white line; the feathers of the wing and the tail lie beyond. */
const HEAD: V = [18, -2];
const [HEAD_R, SCALES, PLUMES] = [11, 22, 24];
/** The wing's edge toward the other bird: ruled through two grid points, from the head up to the back. */
const WING: [V, V] = [[10, 6], [3, 30]];
/** The scales: white dots on grid points, 17 from the head's centre. */
const SCALE_AT: V[] = [[7, 16], [13, 12], [17, 5], [17, -2], [16, -8], [11, -14]];
const SCALE = 2;
/** The white lines between the feathers are ruled from the head's centre to points three apart on the level line 11 above it; they part the tail's feathers beyond the head. */
const FEATHER_TO = [-7, -4, -1, 2, 5, 8];
const FEATHER_UP = 11;
/** The eye: a white disc with a dot. The beak: ruled from its point by the axis to two grid points in the head. */
const EYE: V = [16, 0];
const [EYE_WHITE, EYE_DOT] = [3, 1];
const BEAK: V[] = [[1, -3], [11, 4], [11, -8]];

/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => {
  const k = 400 / vdist(a, b);

  return seg([a[0] - (b[0] - a[0]) * k, a[1] - (b[1] - a[1]) * k], [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
};
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The two edges of a white line `w` wide along the line from `a` to `b`. */
const edges = ([a, b]: [V, V], w: number): Piece[] =>
  [w / 2, -w / 2].map((off) => {
    const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

    return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
  });
const about = (c: V, radii: number[]): Piece[] => radii.flatMap((r) => disc(c, r));
const plus = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1]];

/** The ring, its knot, the stalks' ends and the stem: one piece of ink, the same on both sides of the axis. */
const wreath = (): Piece[][] => {
  const knots: V[] = [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([x, y]) => plus(KNOT, [x * KNOT_CIRCLE.c[0], y * KNOT_CIRCLE.c[1]]));
  const joints: [V, V][] = [[[0, 0], JOINT_AT], [[0, 0], [-JOINT_AT[0], JOINT_AT[1]]]];
  const level = (y: number): Piece => ruled([0, y], [10, y]);
  const upright = (x: number): Piece => ruled([x, 0], [x, 10]);

  return carveWhere(
    [
      ...about([0, 0], [STEM_OUT, STEM_IN, RING_OUT, RING_IN]),
      ...knots.flatMap((c) => disc(c, KNOT_CIRCLE.r)),
      ruled([0, 0], OPEN),
      ruled([0, 0], [-OPEN[0], OPEN[1]]),
      ...joints.flatMap((line) => edges(line, JOINT)),
      ...about([0, 0], GRAIN.flatMap((r) => [r, r + 1])),
      ...GRAIN_ENDS.flatMap(([x, y]) => [ruled([0, 0], [x, y]), ruled([0, 0], [-x, y])]),
      ...[-END_OUT, -END_IN, END_IN, END_OUT].map(upright),
      ...[END_FOOT, END_JOINT - JOINT / 2, END_JOINT + JOINT / 2].map(level),
    ],
    (p) => {
      const r = vdist([0, 0], p);
      const x = Math.abs(p[0]);
      const open = p[1] > 0 && x * OPEN[1] < OPEN[0] * p[1];
      if (open) return x < KNOT_CIRCLE.c[0] && Math.abs(p[1] - KNOT[1]) < KNOT_CIRCLE.c[1] && knots.every((c) => vdist(c, p) > KNOT_CIRCLE.r);
      if (r < STEM_OUT && r > STEM_IN) return true;
      if (r < RING_OUT && r > RING_IN) {
        const y = Math.abs(p[1]);
        const grained = GRAIN.some((at) => r > at && r < at + 1) && x * GRAIN_ENDS[0][1] > y * GRAIN_ENDS[0][0] && x * GRAIN_ENDS[1][1] < y * GRAIN_ENDS[1][0];

        return !grained && !joints.some((line) => Math.abs(leftOf(line, p)) < JOINT / 2);
      }

      return r > RING_OUT && p[1] < 0 && p[1] > END_FOOT && x > END_IN && x < END_OUT && Math.abs(p[1] - END_JOINT) > JOINT / 2;
    },
  );
};

/** A pair of leaves at three o'clock, a white line down the middle of each. */
const spray = (leaves = LEAVES): Piece[][] => {
  const ribs = leaves.map(([a, b]): [V, V] => {
    const m: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    return [m, [m[0] - (b[1] - a[1]), m[1] + (b[0] - a[0])]];
  });

  return carveWhere([...leaves.flatMap((pair) => pair.flatMap((c) => disc(c, LEAF))), ...ribs.flatMap((rib) => edges(rib, MIDRIB))], (p) =>
    leaves.some(([a, b], i) => vdist(a, p) < LEAF && vdist(b, p) < LEAF && Math.abs(leftOf(ribs[i], p)) > MIDRIB / 2),
  );
};

/** The right sparrow, in profile, its beak at the axis. */
const sparrow = (): Piece[][] => {
  const feathers = FEATHER_TO.map((x): [V, V] => [HEAD, plus(HEAD, [x, FEATHER_UP])]);
  const scales = SCALE_AT.map((at) => plus(HEAD, at));
  const beak: [V, V][] = [[BEAK[0], BEAK[1]], [BEAK[2], BEAK[0]]];

  return carveWhere(
    [
      ...about(BACK.c, [BACK.r]),
      ...about(FRONT.c, [FRONT.r]),
      ...about(HEAD, [HEAD_R, SCALES, PLUMES]),
      ...about(EYE, [EYE_WHITE, EYE_DOT]),
      ...scales.flatMap((c) => disc(c, SCALE)),
      ...feathers.flatMap((line) => edges(line, FEATHER)),
      ...beak.map(([a, b]) => ruled(a, b)),
      ruled([JOINT / 2, 0], [JOINT / 2, 10]),
      ruled(...WING),
      ruled(HEAD, plus(HEAD, [10, 0])),
    ],
    (p) => {
      const far = vdist(HEAD, p);
      if (vdist(EYE, p) < EYE_WHITE) return vdist(EYE, p) < EYE_DOT;
      if (far < HEAD_R) return true;
      if (p[0] < BEAK[1][0] && beak.every((line) => leftOf(line, p) < 0)) return p[0] > BEAK[0][0];
      const wing = p[1] > HEAD[1] && leftOf(WING, p) < 0;
      if (!(vdist(BACK.c, p) < BACK.r && (vdist(FRONT.c, p) > FRONT.r || wing) && p[0] > JOINT / 2)) return false;
      if (far > SCALES && far < PLUMES) return false;
      if (far < SCALES) return !scales.some((c) => vdist(c, p) < SCALE);

      return !feathers.some((line) => Math.abs(leftOf(line, p)) < FEATHER / 2);
    },
  );
};

/**
 * The Sendai bamboo, 仙台笹: the 竹に雀 of the Date of Sendai. A ring of bamboo, open at the top round a knot, its two stalks' cut
 * ends standing under it; a thin stem outside the ring with pairs of leaves, five a side, and one more leaf by each end; and inside, two sparrows
 * in profile, beak to beak, each a head, a band of scales and a fan of feathers between two circles. The ring is built first,
 * then each pair where it stands, clockwise, then the right sparrow and the left.
 */
export const sendaiZasaBuild = (c: Builder, bamboo: string, bird: string, reach: number): void => {
  const k = reach / 100;
  const pair = longLast(spray());
  const last = longLast(spray([LEAVES[1]]));
  const leaves = (i: number): Piece[][] => (i === SPRAYS.length - 1 ? last : pair);
  const one = longLast(sparrow());

  c.guideCircle(C0, reach);
  c.fill(bamboo, toPath(longLast(wreath()), { k }));
  for (const i of SPRAYS) c.fill(bamboo, toPath(leaves(i), { k, turn: FIRST + 30 * i - 90 } satisfies Placing));
  for (const i of [...SPRAYS].reverse()) c.fill(bamboo, toPath(leaves(i), { k, turn: 90 - FIRST - 30 * i, mirror: true } satisfies Placing));
  c.fill(bird, toPath(one, { k }));
  c.fill(bird, toPath(one.map((loop) => loop.map(mirrored)), { k }));
};
