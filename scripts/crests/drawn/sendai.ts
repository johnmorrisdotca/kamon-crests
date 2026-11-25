// The Sendai bamboo, 仙台笹 (竹に雀): a ring of bamboo with leaves outside it and two sparrows face to face inside, struck
// and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its proportions were measured
// from the 1892 crest book (伊呂波分新撰紋帳, frame 38, 仙臺さゝ).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** The white lines: a joint of the bamboo, between two feathers, and down the middle of a leaf. */
const [JOINT, FEATHER, MIDRIB] = [2, 1.5, 1.5];
/** The ring of bamboo: the band between two circles about a grid point on the axis, a little under the centre. */
const RING: V = [0, -3];
const [RING_OUT, RING_IN] = [67, 53];
/** A joint crosses the ring on each of two lines ruled from the ring's centre through grid points. */
const JOINT_AT: V = [9, 4];
/** The grain of the bamboo by each joint: two white lines along the ring, each between two circles about its centre, from a line ruled through one grid point to the line through another. */
const GRAIN = [57, 62];
const GRAIN_ENDS: [V, V] = [[1, 1], [5, 1]];
/** The crossed ends of the two stalks at the top: two white lines ruled across the ring through grid points, crossing on the axis. */
const CROSS: [V, V] = [[-9, 67], [9, 47]];
/** The cut ends of the two stalks under the ring: between upright lines, down to a level line, two joints across each, and a notch between them ruled from a point on the axis. */
const [END_IN, END_OUT, END_FOOT] = [8, 20, -93];
const END_JOINTS = [-81, -88];
const NOTCH: V = [0, -78];
/** A pair of leaves where it stands at three o'clock, its foot on the ring: each leaf is the lens between two circles of one width on grid points. */
const LEAF = 45;
const LEAVES: [V, V][] = [
  [[52, 43], [109, -14]],
  [[55, 19], [101, -46]],
];
/** The pairs: four a side, an eighth of a turn apart, the first 25 degrees from the top; the last, by the stalks' ends, is one leaf. */
const PLACES = 4;
const FIRST = 25;
/** A small leaf inside the ring over each sparrow: the lens between two circles of one width on grid points. */
const SMALL = 15;
const SMALL_LEAF: [V, V] = [[16, 49], [12, 25]];

/** The right sparrow. Its back is a circle on the axis and its front a wider circle from the other side; a white line parts the two birds on the axis. */
const BACK: Circle = { c: [0, -3], r: 45 };
const FRONT: Circle = { c: [-24, -9], r: 47 };
/** The head, the band of scales round it, and a white line; the feathers of the wing and the tail lie beyond. */
const HEAD: V = [13, -7];
const [HEAD_R, SCALES, PLUMES] = [10, 23, 25];
/** The scales: white dots in two rows about the head's centre, the outer row between the dots of the inner. */
const SCALE = 2;
const SCALE_ROWS: { r: number; from: number; step: number; n: number }[] = [
  { r: 14, from: 12, step: 26, n: 5 },
  { r: 19, from: 25, step: 19, n: 6 },
];
/** The white lines between the wing's feathers are ruled from the head's centre to points three apart on the level line 11 above it; each feather ends in a round tip, a circle of one width. */
const FEATHER_TO = [-4, -1, 2, 5, 8, 11];
const FEATHER_UP = 11;
const [WING, TIP] = [31, 4];
/** The tail's stripes: white lines along it, each between two circles about the back's centre. */
const STRIPES = [34, 39];
const STRIPE = 1.5;
const TAIL_TOP = -30;
/** The eye: a white disc with a dot. The beak: ruled from its point by the axis to two grid points in the head. */
const EYE: V = [11, -5];
const [EYE_WHITE, EYE_DOT] = [3, 1];
const BEAK: V[] = [[1, -8], [7, -1], [7, -13]];

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

/** The ring with its crossed ends at the top and the stalks' cut ends under it: one piece of ink, the same on both sides of the axis. */
const wreath = (): Piece[][] => {
  const joints: [V, V][] = [[RING, plus(RING, JOINT_AT)], [RING, plus(RING, [-JOINT_AT[0], JOINT_AT[1]])]];
  const cross: [V, V][] = [CROSS, [[-CROSS[0][0], CROSS[0][1]], [-CROSS[1][0], CROSS[1][1]]]];
  const notch: [V, V][] = [[NOTCH, plus(NOTCH, [1, 1])], [NOTCH, plus(NOTCH, [-1, 1])]];
  const level = (y: number): Piece => ruled([0, y], [10, y]);
  const upright = (x: number): Piece => ruled([x, 0], [x, 10]);

  return carveWhere(
    [
      ...about(RING, [RING_OUT, RING_IN, ...GRAIN.flatMap((r) => [r, r + 1])]),
      ...[...joints, ...cross].flatMap((line) => edges(line, JOINT)),
      ...GRAIN_ENDS.flatMap(([x, y]) => [ruled(RING, plus(RING, [x, y])), ruled(RING, plus(RING, [-x, y]))]),
      ...[-END_OUT, -END_IN, END_IN, END_OUT].map(upright),
      ...[END_FOOT, ...END_JOINTS.flatMap((y) => [y - JOINT / 2, y + JOINT / 2])].map(level),
      ...notch.map(([a, b]) => ruled(a, b)),
    ],
    (p) => {
      const r = vdist(RING, p);
      const x = Math.abs(p[0]);
      const y = Math.abs(p[1] - RING[1]);
      if (r < RING_OUT && r > RING_IN) {
        if (p[1] > 0 && cross.some((line) => Math.abs(leftOf(line, p)) < JOINT / 2)) return false;
        const grained = GRAIN.some((at) => r > at && r < at + 1) && x * GRAIN_ENDS[0][1] > y * GRAIN_ENDS[0][0] && x * GRAIN_ENDS[1][1] < y * GRAIN_ENDS[1][0];

        return !grained && !joints.some((line) => Math.abs(leftOf(line, p)) < JOINT / 2);
      }
      if (r < RING_OUT || p[1] > 0) return false;
      if (x < END_IN) return p[1] > NOTCH[1] + x;

      return x < END_OUT && p[1] > END_FOOT && END_JOINTS.every((at) => Math.abs(p[1] - at) > JOINT / 2);
    },
  );
};

/** Leaves, each the lens between two circles of the width `r`, a white line down the middle of each. */
const spray = (leaves: [V, V][], r: number): Piece[][] => {
  const ribs = leaves.map(([a, b]): [V, V] => {
    const m: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    return [m, [m[0] - (b[1] - a[1]), m[1] + (b[0] - a[0])]];
  });

  return carveWhere([...leaves.flatMap((pair) => pair.flatMap((c) => disc(c, r))), ...ribs.flatMap((rib) => edges(rib, MIDRIB))], (p) =>
    leaves.some(([a, b], i) => vdist(a, p) < r && vdist(b, p) < r && Math.abs(leftOf(ribs[i], p)) > MIDRIB / 2),
  );
};

/** The right sparrow, in profile, its beak at the axis. */
const sparrow = (): Piece[][] => {
  const feathers = FEATHER_TO.map((x): [V, V] => [HEAD, plus(HEAD, [x, FEATHER_UP])]);
  const tips = FEATHER_TO.slice(1).map((x): V => {
    const to: V = [x - 1.5, FEATHER_UP];

    return plus(HEAD, [(to[0] * WING) / vdist([0, 0], to), (to[1] * WING) / vdist([0, 0], to)]);
  });
  const body = (p: V): boolean => vdist(BACK.c, p) < BACK.r && vdist(FRONT.c, p) > FRONT.r && p[0] > JOINT / 2;
  const scales = SCALE_ROWS.flatMap((row) => Array.from({ length: row.n }, (_, i): V => plus(HEAD, [row.r * Math.sin((row.from + row.step * i) * DEG), row.r * Math.cos((row.from + row.step * i) * DEG)]))).filter(
    (at) => vdist(FRONT.c, at) > FRONT.r + SCALE + 1 || (at[1] > HEAD[1] && leftOf(feathers[0], at) < -SCALE - 1),
  );
  const beak: [V, V][] = [[BEAK[0], BEAK[1]], [BEAK[2], BEAK[0]]];
  const first = feathers[0];
  const last = feathers[feathers.length - 1];

  return carveWhere(
    [
      ...about(BACK.c, [BACK.r, ...STRIPES.flatMap((r) => [r, r + STRIPE])]),
      ...about(FRONT.c, [FRONT.r]),
      ...about(HEAD, [HEAD_R, SCALES, PLUMES, WING]),
      ...about(EYE, [EYE_WHITE, EYE_DOT]),
      ...scales.flatMap((c) => disc(c, SCALE)),
      ...tips.flatMap((c) => disc(c, TIP)),
      ...feathers.slice(1).flatMap((line) => edges(line, FEATHER)),
      ruled(...first),
      ruled([0, TAIL_TOP], [10, TAIL_TOP]),
      ...beak.map(([a, b]) => ruled(a, b)),
      ruled([JOINT / 2, 0], [JOINT / 2, 10]),
      ruled(HEAD, plus(HEAD, [10, 0])),
    ],
    (p) => {
      const far = vdist(HEAD, p);
      if (vdist(EYE, p) < EYE_WHITE) return vdist(EYE, p) < EYE_DOT;
      if (far < HEAD_R) return true;
      if (p[0] < BEAK[1][0] && beak.every((line) => leftOf(line, p) < 0)) return true;
      const fan = p[1] > HEAD[1] && leftOf(first, p) < 0 && leftOf(last, p) > FEATHER / 2;
      if (far < SCALES) return (body(p) || fan) && !scales.some((c) => vdist(c, p) < SCALE);
      if (far < PLUMES) return false;
      if (fan) return (far < WING || tips.some((c) => vdist(c, p) < TIP)) && !feathers.slice(1, -1).some((line) => Math.abs(leftOf(line, p)) < FEATHER / 2);
      if (!body(p) || p[1] > HEAD[1]) return body(p) && leftOf(last, p) < -FEATHER / 2;

      return !STRIPES.some((r) => vdist(BACK.c, p) > r && vdist(BACK.c, p) < r + STRIPE && p[1] < TAIL_TOP);
    },
  );
};

/**
 * The Sendai bamboo, 仙台笹: the 竹に雀 of the Date of Sendai. A jointed ring of bamboo whose two stalks cross at the top, their
 * cut ends standing under it; seven long leaves a side outside the ring and a small leaf inside it over each bird; and two
 * sparrows in profile, beak to beak, each a head, a band of scales, a raised wing of round-tipped feathers and a striped tail.
 * The ring is built first, then the leaves where they stand, clockwise, then the right sparrow and the left.
 */
export const sendaiZasaBuild = (c: Builder, bamboo: string, bird: string, reach: number): void => {
  const k = reach / 100;
  const places = Array.from({ length: PLACES }, (_, i) => longLast(spray(i < PLACES - 1 ? LEAVES : [LEAVES[0]], LEAF)));
  const small = longLast(spray([SMALL_LEAF], SMALL));
  const one = longLast(sparrow());
  const flip = (loops: Piece[][]): Piece[][] => loops.map((loop) => loop.map(mirrored));

  c.guideCircle(C0, reach);
  c.fill(bamboo, toPath(longLast(wreath()), { k }));
  places.forEach((place, i) => c.fill(bamboo, toPath(place, { k, turn: FIRST + 45 * i - 90 } satisfies Placing)));
  [...places].reverse().forEach((place, i) => c.fill(bamboo, toPath(place, { k, turn: 90 - FIRST - 45 * (PLACES - 1 - i), mirror: true } satisfies Placing)));
  c.fill(bamboo, toPath(small, { k }));
  c.fill(bamboo, toPath(flip(small), { k }));
  c.fill(bird, toPath(one, { k }));
  c.fill(bird, toPath(flip(one), { k }));
};
