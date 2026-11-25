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

/** The right sparrow. The two birds fill a round with a white almond between them: each bird lies inside a circle about a grid point, and outside a circle about a grid point on the far side of the axis. */
const ROUND: V = [5, -12];
const ROUND_R = 41;
const ALMOND: V = [-33, -12];
const ALMOND_R = 54;
/** The head, by the axis under the middle, and the body, out from it: a circle each, with a white line round it. */
const HEAD: V = [13, -9];
const [HEAD_R, HEAD_LINE] = [8, 10];
const BODY: V = [26, -12];
const [BODY_R, BODY_LINE] = [13, 15];
/** The scales: three rows of cells on the body. The rows are parted by white bands between circles about the head's centre, and the cells of a row by white lines ruled through it: a twelfth of a turn apart in the first row, a twenty-fourth in the others, each row's lines half a step from the next row's. */
const SCALE_BANDS = [14, 20];
const SCALE_BAND = 2;
const SCALE_STEP = 7.5;
const SCALE_ROWS: [number, number][] = [[1, 4], [0, 2], [1, 2]];
/** The wing, up from the body, and the tail, down from it: each a fan of feathers about the body's centre, a twenty-fourth of a turn each, from the almond's edge to a line ruled from the body's centre. The angles are clockwise from straight up. */
const WING_LINES = [-15, 0, 15, 30, 45, 60, 75];
const TAIL_LINES = [135, 150, 165, 180, 195];
/** The eye: a white almond, the lens between two circles of one width on grid points. The beak: ruled from its point on the axis to two grid points on the head. */
const EYE: [V, V] = [[11, -5], [12, -9]];
const EYE_R = 4;
const BEAK: V[] = [[0, -10], [9, -3], [10, -16]];

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

/** The right sparrow, in profile, its beak on the axis: the wing up, the scaled body, the tail down. */
const sparrow = (): Piece[][] => {
  const spoke = (c: V, deg: number): [V, V] => [c, plus(c, [10 * Math.sin(deg * DEG), 10 * Math.cos(deg * DEG)])];
  const wing = WING_LINES.map((deg) => spoke(BODY, deg));
  const tail = TAIL_LINES.map((deg) => spoke(BODY, deg));
  const cells = Array.from({ length: 180 / SCALE_STEP }, (_, i) => spoke(HEAD, SCALE_STEP * i));
  const beak: [V, V][] = [[BEAK[0], BEAK[1]], [BEAK[2], BEAK[0]]];
  const lined = (lines: [V, V][], p: V): boolean => lines.some((line) => Math.abs(leftOf(line, p)) < FEATHER / 2);
  const scaled = (p: V): boolean => {
    const r = vdist(HEAD, p);
    const [first, step] = SCALE_ROWS[SCALE_BANDS.filter((at) => r > at).length];
    if (SCALE_BANDS.some((at) => r > at && r < at + SCALE_BAND)) return false;

    return !lined(cells.filter((_, i) => i % step === first), p);
  };

  return carveWhere(
    [
      ...about(HEAD, [HEAD_R, HEAD_LINE, ...SCALE_BANDS.flatMap((r) => [r, r + SCALE_BAND])]),
      ...about(BODY, [BODY_R, BODY_LINE]),
      ...disc(ROUND, ROUND_R),
      ...disc(ALMOND, ALMOND_R),
      ...EYE.flatMap((c) => disc(c, EYE_R)),
      ...[wing.slice(0, -1), tail.slice(1), cells].flatMap((lines) => lines.flatMap((line) => edges(line, FEATHER))),
      ruled(...wing[wing.length - 1]),
      ruled(...tail[0]),
      ...beak.map(([a, b]) => ruled(a, b)),
    ],
    (p) => {
      if (EYE.every((c) => vdist(c, p) < EYE_R)) return false;
      if (vdist(HEAD, p) < HEAD_R) return true;
      if (p[0] < BEAK[1][0] && beak.every((line) => leftOf(line, p) < 0)) return true;
      if (vdist(HEAD, p) < HEAD_LINE) return false;
      if (vdist(ROUND, p) > ROUND_R || vdist(ALMOND, p) < ALMOND_R) return false;
      if (vdist(BODY, p) < BODY_R) return scaled(p);
      if (vdist(BODY, p) < BODY_LINE) return false;
      if (p[1] > BODY[1]) return leftOf(wing[wing.length - 1], p) > 0 && !lined(wing.slice(0, -1), p);

      return leftOf(tail[0], p) < 0 && !lined(tail.slice(1), p);
    },
  );
};

/**
 * The Sendai bamboo, 仙台笹: the 竹に雀 of the Date of Sendai. A jointed ring of bamboo whose two stalks cross at the top, their
 * short ends crossing again under it; seven long leaves a side outside the ring and a small leaf inside it over each bird; and two
 * sparrows in profile, beak to beak on the axis. The two birds fill a round with a white almond between them: each is a crescent,
 * its wing a fan of feathers up from a body of scale cells in rows, its tail a fan down from it, its head set into the body's front.
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
