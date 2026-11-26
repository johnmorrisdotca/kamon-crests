// The helmet horns, 鍬形, as the 1892 crest book draws 三ッ違ひくはがた (frame 28, right page, second row, the rightmost cell):
// three horns a third of a turn apart, each a cup with two horns that curl out at its rim and a circle sitting in it, and three
// bars, one under each horn, that cross at the middle. The book draws them in thin lines; ours is solid, like the other crests:
// the horns, the circles and the bars are ink, and the book's lines are white gaps 3 wide. The horn is built from compass circles
// of whole widths on grid points, measured from the book's three horns laid on one another and made the same on both sides.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, rotated, seg, toPath, vdist, DEG } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const PLACING: Placing = { k: 1 };
const TAU = Math.PI * 2;
/** The white line between two pieces of ink. */
const GAP = 3;
/** The horn standing at the top, its axis upright: the cup's round foot, the flare out to each horn's point, the horn's upper edge, and the lobe over the circle. The other side is the same mirrored. */
const BOWL: Circle = { c: [0, 54], r: 31 };
const FLARE: Circle = { c: [-63, 38], r: 34 };
const WING: Circle = { c: [-41, 54], r: 22 };
const LOBE: Circle = { c: [-12, 60], r: 19 };
/** The circle in the cup, and the white line round it. */
const BOSS: Circle = { c: [0, 56], r: 18 };
/** Each bar is 8 wide, and runs from its free end 50 from the middle to under its horn's foot. */
const HALF = 4;
const FREE = 50;
const HIDDEN = 40;

const flip = (c: Circle): Circle => ({ c: [-c.c[0], c.c[1]], r: c.r });
const within = (c: Circle, p: V, more = 0): boolean => vdist(c.c, p) < c.r + more;
const whole = (c: Circle, more = 0): Piece => arcA(c.c, c.r + more, 0, TAU);
/** The endless line through `p` along `d`, as a long ruled piece. */
const along = (p: V, d: V): Piece => seg([p[0] - d[0] * 300, p[1] - d[1] * 300], [p[0] + d[0] * 300, p[1] + d[1] * 300]);
const turnBack = (p: V, deg: number): V => {
  const a = deg * DEG;

  return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
};

const inHorn = (p: V): boolean => {
  const q: V = [-Math.abs(p[0]), p[1]];
  // The bowl meets the flare where they touch, on the line through their centres: above that line the horn's wall is the flare.
  const above = (FLARE.c[0] - BOWL.c[0]) * (q[1] - BOWL.c[1]) - (FLARE.c[1] - BOWL.c[1]) * (q[0] - BOWL.c[0]) < 0;
  const body = (within(BOWL, q) && q[1] <= BOWL.c[1]) || (above && (within(WING, q) || within(LOBE, q) || within(flip(LOBE), q)));

  return body && !within(FLARE, q);
};
const inkedHorn = (p: V): boolean => inHorn(p) && (!within(BOSS, p, GAP) || within(BOSS, p));

const hornOutlines = (): Piece[] => [
  ...[BOWL, FLARE, WING, LOBE].flatMap((c) => [whole(c), whole(flip(c))]),
  whole(BOSS),
  whole(BOSS, GAP),
  along(BOWL.c, [1, 0]),
  ...[FLARE, flip(FLARE)].map((f): Piece => {
    const d = vdist(BOWL.c, f.c);

    return along(BOWL.c, [(f.c[0] - BOWL.c[0]) / d, (f.c[1] - BOWL.c[1]) / d]);
  }),
];

/** A bar along the axis at `deg` clockwise from upright: its across and along, for a point. */
const axis = (deg: number): V => [Math.sin(deg * DEG), Math.cos(deg * DEG)];
const across = (deg: number, p: V): number => {
  const u = axis(deg);

  return u[0] * p[1] - u[1] * p[0];
};
const lengthwise = (deg: number, p: V): number => {
  const u = axis(deg);

  return u[0] * p[0] + u[1] * p[1];
};
const inBar = (deg: number, p: V, more = 0): boolean => Math.abs(across(deg, p)) <= HALF + more && lengthwise(deg, p) >= -FREE - more && lengthwise(deg, p) <= HIDDEN;

/**
 * The bars as the book has them: the upright bar on top of the other two, and of those two, each one's piece running down to its
 * horn on top of the other's piece running up to its free end. Every horn's foot is on top of its own bar.
 */
const inkedBars = (p: V): boolean => {
  if ([0, 120, 240].some((deg) => within(BOWL, turnBack(p, deg), GAP))) return false;
  if (inBar(0, p)) return true;
  if (inBar(0, p, GAP)) return false;
  const [right, left] = [120, 240];
  if (inBar(right, p)) return !(p[0] < 0 && inBar(left, p, GAP));
  if (inBar(left, p)) return !(p[0] > 0 && inBar(right, p, GAP));

  return false;
};

const barOutlines = (): Piece[] =>
  [0, 120, 240].flatMap((deg) => {
    const u = axis(deg);
    const n: V = [-u[1], u[0]];
    const lines = [HALF, -HALF, HALF + GAP, -HALF - GAP].map((w) => along([n[0] * w, n[1] * w], u));
    const ends = [-FREE, HIDDEN].map((t) => along([u[0] * t, u[1] * t], n));

    return [...lines, ...ends, whole({ c: turnBack(BOWL.c, -deg), r: BOWL.r }, GAP)];
  });

/** The horn and its circle, standing at the top. */
export const kuwagataHorn = (): Region[] => carveWhere(hornOutlines(), inkedHorn);
/** The three bars. */
export const kuwagataBars = (): Region[] => carveWhere(barOutlines(), inkedBars);

/** 三つ違い鍬形: the horn built at the top and where it stands a third and two thirds of a turn round, clockwise, then the bars under them. */
export const mitsuChigaiKuwagataBuild = (c: Builder, part: string): void => {
  c.guideCircle(C0, R);
  const unit = kuwagataHorn();
  for (const turn of [0, 120, 240]) c.fill(part, toPath(unit.map((loop) => loop.map((p) => rotated(p, -turn * DEG))), PLACING), "evenodd");
  c.fill(part, toPath(kuwagataBars(), PLACING), "evenodd");
};
