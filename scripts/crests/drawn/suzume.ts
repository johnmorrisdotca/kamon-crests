// The puffed sparrow, ふくら雀, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at
// 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 45, ふくらすゞめ).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, mirrored, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: between two feathers, round the head, and along a wing. */
const LINE = 2;
/** The bird's middle, a grid point on the axis: the belly, the back and the fan of the tail and wings are circles about it. */
const MIDDLE: V = [0, -10];
/** The fan's outer edge; where the wings' white lines end; where the tail feathers begin; the back's edge; the belly. */
const [FAN, WING_END, TAIL, BACK, BELLY] = [94, 88, 58, 56, 48];
/** The feathers are a thirtieth of a turn each: five tail feathers a side, then the wing, which is five feathers wide with four white lines along it. */
const STEP = 12;
const TAIL_LINES = [0, 1, 2, 3, 4];
/** The white line between the tail and the right wing: ruled through two grid points, from the back's edge to the fan's. */
const TAIL_END: [V, V] = [[52, 11], [81, 37]];
const WING_LINES = [6, 7, 8, 9];
const WING_FOOT = 10;
/** The head: a white line round its top, between two circles about the crest's centre, down to the level line through it. */
const HEAD: V = [0, 0];
const [HEAD_OUT, HEAD_IN] = [26, 24];
/** The right eye: a white disc with a dot in it. */
const EYE: V = [16, -8];
const [EYE_WHITE, EYE_DOT] = [6, 3];
/** The beak: a white triangle, its top level and its point on the axis. */
const BEAK: V[] = [[-9, -13], [9, -13], [0, -24]];
/** The white line where the right wing comes out from behind the back: ruled through two grid points, from the head to the back's edge. */
const WING_TOP: [V, V] = [[24, 2], [48, 10]];

/** The point at clock angle `deg` (0 straight up, 90 to the right) and distance `r` from the bird's middle. */
const at = (deg: number, r: number): V => [MIDDLE[0] + r * Math.sin(deg * DEG), MIDDLE[1] + r * Math.cos(deg * DEG)];
/** The clock angle of a point about the bird's middle, from -180 to 180. */
const clock = (p: V): number => Math.atan2(p[0] - MIDDLE[0], p[1] - MIDDLE[1]) / DEG;
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => {
  const k = 400 / vdist(a, b);

  return seg([a[0] - (b[0] - a[0]) * k, a[1] - (b[1] - a[1]) * k], [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
};
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};
const edges = (line: [V, V]): Piece[] => [beside(line, LINE / 2), beside(line, -LINE / 2)];
/** The line from the bird's middle out along the `n`th feather's edge. */
const spoke = (n: number): [V, V] => [MIDDLE, at(n * STEP, FAN)];
/** Whether a point lies on the white line along a spoke. */
const onSpoke = (n: number, p: V): boolean => Math.abs(leftOf(spoke(n), p)) < LINE / 2 && Math.abs(clock(p) - n * STEP) < 45;
const about = (c: V, radii: number[]): Piece[] => radii.flatMap((r) => disc(c, r));

/**
 * The puffed sparrow, ふくら雀: a plump sparrow seen from the front with its wings and tail spread into a fan, a wish for plenty.
 * The belly, the back and the fan are circles about one point. The tail is ten feathers, a white line between any two; each
 * wing is as wide as five, with four white lines along it, and its lower edge is ruled from the same point. A white line runs
 * round the top of the head and along the top of each wing; the eyes are white discs with a dot, and the beak a white
 * triangle. The right half of the tail is built in full, then the body with both wings, then the left half where it stands.
 */
export const suzumeBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const right = (p: V): V => [Math.abs(p[0]), p[1]];
  const both = (pieces: Piece[]): Piece[] => [...pieces, ...pieces.map(mirrored)];
  const far = (p: V): number => vdist(MIDDLE, p);

  const tail = carveWhere([...about(MIDDLE, [FAN, TAIL]), ...TAIL_LINES.flatMap((n) => edges(spoke(n))), beside(TAIL_END, LINE / 2)], (p) => {
    const a = clock(p);

    return far(p) < FAN && far(p) > TAIL && p[0] > LINE / 2 && a > 0 && leftOf(TAIL_END, p) > LINE / 2 && !TAIL_LINES.some((n) => onSpoke(n, p));
  });
  const level = ruled(HEAD, [HEAD[0] + 10, HEAD[1]]);
  const beak = [ruled(BEAK[0], BEAK[1]), ruled(BEAK[1], BEAK[2]), ruled(BEAK[2], BEAK[0])];
  const inBeak = (p: V): boolean => p[1] < BEAK[0][1] && leftOf([BEAK[1], BEAK[2]], p) < 0 && leftOf([BEAK[2], BEAK[0]], p) < 0;
  const body = carveWhere(
    [
      ...about(MIDDLE, [FAN, WING_END, TAIL, BACK, BELLY]),
      ...about(HEAD, [HEAD_OUT, HEAD_IN]),
      ...both([...about(EYE, [EYE_WHITE, EYE_DOT]), beside(TAIL_END, -LINE / 2), ruled(...spoke(WING_FOOT)), ...WING_LINES.flatMap((n) => edges(spoke(n))), ...edges(WING_TOP)]),
      level,
      ...beak,
    ],
    (q) => {
      const p = right(q);
      const a = clock(p);
      const wing = far(p) < FAN && leftOf(TAIL_END, p) < -LINE / 2 && a < WING_FOOT * STEP && a > 0;
      if (!(far(p) < BELLY || wing || (far(p) < BACK && a < WING_FOOT * STEP))) return false;
      if (wing && far(p) > TAIL && far(p) < WING_END && WING_LINES.some((n) => onSpoke(n, p))) return false;
      if (p[1] > HEAD[1] && vdist(HEAD, p) > HEAD_IN && vdist(HEAD, p) < HEAD_OUT) return false;
      if (Math.abs(leftOf(WING_TOP, p)) < LINE / 2 && far(p) < BACK && vdist(HEAD, p) > HEAD_IN && p[0] > 0) return false;
      if (vdist(EYE, p) < EYE_WHITE && vdist(EYE, p) > EYE_DOT) return false;

      return !inBeak(q);
    },
  );

  c.guideCircle(C0, reach);
  for (const r of [FAN, TAIL]) c.guideCircle(onPage(MIDDLE, placing), r * placing.k);
  c.fill(part, toPath(longLast(tail), placing));
  c.fill(part, toPath(longLast(body), placing));
  c.fill(part, toPath(longLast(tail.map((loop) => loop.map(mirrored))), placing));
};
