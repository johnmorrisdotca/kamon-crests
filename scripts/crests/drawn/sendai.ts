// The Sendai bamboo, 仙台笹 (竹に雀): a ring of bamboo with leaves outside it and two sparrows face to face inside, struck
// and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its proportions were measured
// from the 1892 crest book (伊呂波分新撰紋帳, frame 38, 仙臺さゝ).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** The white lines: a joint of the bamboo, between two feathers, and down the middle of a leaf. */
const [JOINT, FEATHER, MIDRIB] = [2, 1.5, 1.5];
/** The ring of bamboo: the band between two circles about a grid point on the axis, a little under the centre. */
const RING: V = [0, -3];
const [RING_OUT, RING_IN] = [66, 54];
/** A joint crosses the ring on each of two lines ruled from the ring's centre through grid points. */
const JOINT_AT: V = [9, 4];
/** The grain of the bamboo by each joint: two white lines along the ring, each between two circles about its centre, from a line ruled through one grid point to the line through another. */
const GRAIN = [57, 62];
const GRAIN_ENDS: [V, V] = [[1, 1], [5, 1]];
/** The crossed ends of the two stalks at the top: two white lines ruled across the ring through grid points, crossing on the axis. */
const CROSS: [V, V] = [[-9, 67], [9, 47]];
/** Under the ring the two stalks cross: each short end lies along a line ruled through two grid points, down to a level line, the left one over the right. */
const END: [V, V] = [[-12, -68], [8, -88]];
const [END_WIDTH, END_FOOT, END_TOP] = [8, -89, -60];
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
/** The stem that joins a pair to the ring: the band between two circles about the centre, from one leaf's foot to the other's. */
const [STEM_OUT, STEM_IN, STEM_BACK] = [66, 62, 23];
const SMALL_LEAF: [V, V] = [[16, 53], [12, 29]];

/** The right sparrow, its body on a slant: the head by the axis at the middle, the body a circle down and out from it, each with a white line round it. */
const HEAD: V = [14, -4];
const [HEAD_R, HEAD_LINE] = [10, 12];
const BODY: V = [27, -17];
const [BODY_R, BODY_LINE] = [17, 19];
/** The scales: white dots in rows about the head's centre, on the body. */
const SCALE = 2;
const SCALE_ROWS: { r: number; step: number }[] = [
  { r: 17, step: 19 },
  { r: 22, step: 15 },
  { r: 27, step: 12 },
  { r: 32, step: 10 },
];
/** The wing, raised behind the head: a fan of five feathers about a grid point, a twenty-fourth of a turn each, every feather ending in a round tip of one width. */
const WING: V = [15, -1];
const [WING_R, TIP] = [31, 3];
const WING_LINES = [-15, 0, 15, 30, 45, 60];
/** The tail, down from the body: a fan about the body's centre with two white stripes along it. */
const TAIL_R = 29;
const TAIL_LINES = [176, 186, 196, 206];
/** The eye: a white disc with a dot. The beak: ruled from its point by the axis to two grid points in the head. */
const EYE: V = [12, -2];
const [EYE_WHITE, EYE_DOT] = [3, 1];
const BEAK: V[] = [[1, -5], [7, 1], [7, -11]];

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
  const ends: [V, V][] = [END, [[-END[0][0], END[0][1]], [-END[1][0], END[1][1]]]];
  const level = (y: number): Piece => ruled([0, y], [10, y]);

  return carveWhere(
    [
      ...about(RING, [RING_OUT, RING_IN, ...GRAIN.flatMap((r) => [r, r + 1])]),
      ...[...joints, ...cross].flatMap((line) => edges(line, JOINT)),
      ...GRAIN_ENDS.flatMap(([x, y]) => [ruled(RING, plus(RING, [x, y])), ruled(RING, plus(RING, [-x, y]))]),
      ...ends.flatMap((line) => edges(line, END_WIDTH)),
      ...edges(ends[0], END_WIDTH + 2 * JOINT),
      level(END_FOOT),
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
      if (r < RING_OUT || p[1] > END_TOP || p[1] < END_FOOT) return false;
      const over = Math.abs(leftOf(ends[0], p));

      return over < END_WIDTH / 2 || (Math.abs(leftOf(ends[1], p)) < END_WIDTH / 2 && over > END_WIDTH / 2 + JOINT);
    },
  );
};

/** Leaves, each the lens between two circles of the width `r`, a white line down the middle of each; with `stem`, the stem that joins a pair to the ring. */
const spray = (leaves: [V, V][], r: number, stem = false): Piece[][] => {
  const ribs = leaves.map(([a, b]): [V, V] => {
    const m: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    return [m, [m[0] - (b[1] - a[1]), m[1] + (b[0] - a[0])]];
  });
  const back: [V, V] = [[0, 0], [Math.cos(STEM_BACK * DEG), -Math.sin(STEM_BACK * DEG)]];
  const stemmed = (p: V): boolean => stem && p[0] > 0 && p[1] < 0 && leftOf(back, p) > 0 && vdist([0, 0], p) < STEM_OUT && vdist([0, 0], p) > STEM_IN;

  return carveWhere(
    [...leaves.flatMap((pair) => pair.flatMap((c) => disc(c, r))), ...ribs.flatMap((rib) => edges(rib, MIDRIB)), ...(stem ? [...about([0, 0], [STEM_OUT, STEM_IN]), ruled([0, 0], [10, 0]), ruled(...back)] : [])],
    (p) => stemmed(p) || leaves.some(([a, b], i) => vdist(a, p) < r && vdist(b, p) < r && Math.abs(leftOf(ribs[i], p)) > MIDRIB / 2),
  );
};

/** The right sparrow, in profile, its beak at the axis. */
const sparrow = (): Piece[][] => {
  const from = (c: V, deg: number, far: number): V => plus(c, [far * Math.sin(deg * DEG), far * Math.cos(deg * DEG)]);
  const spokes = (c: V, at: number[]): [V, V][] => at.map((deg): [V, V] => [c, from(c, deg, 10)]);
  const wing = spokes(WING, WING_LINES);
  const tail = spokes(BODY, TAIL_LINES);
  const tips = WING_LINES.slice(1).map((deg, i) => from(WING, (deg + WING_LINES[i]) / 2, WING_R));
  const scales = SCALE_ROWS.flatMap((row) => Array.from({ length: 12 }, (_, i) => from(HEAD, 80 + row.step * i, row.r))).filter((at) => vdist(BODY, at) < BODY_R - SCALE - 1 && vdist(HEAD, at) > HEAD_LINE + SCALE + 1);
  const beak: [V, V][] = [[BEAK[0], BEAK[1]], [BEAK[2], BEAK[0]]];
  const between = (lines: [V, V][], p: V): boolean => leftOf(lines[0], p) < 0 && leftOf(lines[lines.length - 1], p) > 0;
  const lined = (lines: [V, V][], p: V): boolean => lines.slice(1, -1).some((line) => Math.abs(leftOf(line, p)) < FEATHER / 2);

  return carveWhere(
    [
      ...about(HEAD, [HEAD_R, HEAD_LINE]),
      ...about(BODY, [BODY_R, BODY_LINE, TAIL_R]),
      ...about(WING, [WING_R]),
      ...about(EYE, [EYE_WHITE, EYE_DOT]),
      ...[...scales.map((c) => disc(c, SCALE)), ...tips.map((c) => disc(c, TIP))].flat(),
      ...[wing, tail].flatMap((lines) => [ruled(...lines[0]), ruled(...lines[lines.length - 1]), ...lines.slice(1, -1).flatMap((line) => edges(line, FEATHER))]),
      ...beak.map(([a, b]) => ruled(a, b)),
    ],
    (p) => {
      if (vdist(EYE, p) < EYE_WHITE) return vdist(EYE, p) < EYE_DOT;
      if (vdist(HEAD, p) < HEAD_R) return true;
      if (p[0] < BEAK[1][0] && beak.every((line) => leftOf(line, p) < 0)) return true;
      if (vdist(HEAD, p) < HEAD_LINE) return false;
      if (vdist(BODY, p) < BODY_R) return !scales.some((c) => vdist(c, p) < SCALE);
      if (vdist(BODY, p) < BODY_LINE) return false;
      if (p[1] > WING[1] && between(wing, p) && (vdist(WING, p) < WING_R || tips.some((c) => vdist(c, p) < TIP))) return !lined(wing, p);

      return p[1] < BODY[1] && between(tail, p) && vdist(BODY, p) < TAIL_R && !lined(tail, p);
    },
  );
};

/**
 * The Sendai bamboo, 仙台笹: the 竹に雀 of the Date of Sendai. A jointed ring of bamboo whose two stalks cross at the top, their
 * short ends crossing again under it; seven long leaves a side outside the ring and a small leaf inside it over each bird; and two
 * sparrows in profile, beak to beak, each a head, a body of scales, a raised wing of round-tipped feathers and a striped tail.
 * The ring is built first, then the leaves where they stand, clockwise, then the right sparrow and the left.
 */
export const sendaiZasaBuild = (c: Builder, bamboo: string, bird: string, reach: number): void => {
  const k = reach / 100;
  const places = Array.from({ length: PLACES }, (_, i) => longLast(spray(i < PLACES - 1 ? LEAVES : [LEAVES[0]], LEAF, i < PLACES - 1)));
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
