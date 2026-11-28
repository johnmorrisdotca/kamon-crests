// 六つ糸巻, as the 1892 crest book draws 六ッ糸巻 (frame 7, left page, first row, second column from the right): six spool plates
// turning like a pinwheel about a flower of six lens petals on a round boss. Each plate runs out from the tip of one petal to the
// tip of the next, its outer edge drawn in between two horns, the far horn farther out. The numbers are the book's pixels from the
// boss's centre; angles are clock angles from the top.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, circleCircle, disc, lineLine, seg, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
const ccw = (a: V, b: V, c: V): boolean => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
/** The arc from `a` through `b` to `c`. */
const arc3 = (a: V, b: V, c: V): Piece => arcTo(through(a, b, c), a, c, ccw(a, b, c));
/** The point `r` from the centre at clock angle `deg`. */
const at = (r: number, deg: number): V => [r * Math.sin((deg * Math.PI) / 180), r * Math.cos((deg * Math.PI) / 180)];

const BOSS = 25;
/** A petal: a lens from inside the boss to its tip 105.7 out, 22 across at 65 out. */
const PETAL = { tip: 105.7, wide: 11, mid: 65 };
/** A plate: its near horn 132.2 out, 4.6 degrees anticlockwise of its petal; its far horn 169 out, 29.8 degrees clockwise; the outer edge through 132.8 out at 15.8 degrees and the far side through 142.2 out at 38.6. */
const PLATE = { near: [132.2, -4.6], edge: [132.8, 15.8], far: [169, 29.8], side: [142.2, 38.6] } as const;
const PARTING = 2.5;

/** A petal, `grow` wider all round: the lens between the two circles through its ends and a side point each, each grown by `grow`. */
const petal = (deg: number, grow = 0): Region => {
  const base = at(BOSS * 0.4, deg);
  const tip = at(PETAL.tip, deg);
  const side = (s: 1 | -1): V => vadd(at(PETAL.mid, deg), at(s * PETAL.wide, deg + 90));
  const [left, right] = [through(base, side(1), tip), through(base, side(-1), tip)];
  const ends = circleCircle(left.c, left.r + grow, right.c, right.r + grow);
  const [far, near] = Math.hypot(...ends[0]) > Math.hypot(...ends[1]) ? ends : [ends[1], ends[0]];
  const a = (circle: Circle): Circle => ({ c: circle.c, r: circle.r + grow });
  return [arcTo(a(left), near, far, ccw(base, side(1), tip)), arcTo(a(right), far, near, ccw(tip, side(-1), base))];
};
const plate = (deg: number): Region => {
  const pt = ([r, d]: readonly [number, number]): V => at(r, deg + d);
  const [t0, t1] = [at(PETAL.tip, deg), at(PETAL.tip, deg + 60)];
  return [seg(t0, pt(PLATE.near)), arc3(pt(PLATE.near), pt(PLATE.edge), pt(PLATE.far)), arc3(pt(PLATE.far), pt(PLATE.side), t1), seg(t1, [0, 0]), seg([0, 0], t0)];
};

export const mutsuItomakiBuild = (c: Builder): void => {
  const turns = [0, 60, 120, 180, 240, 300];
  const grown = [disc([0, 0], BOSS + PARTING), ...turns.map((deg) => petal(deg, PARTING))];
  const placing = { k: R / PLATE.far[0] };
  c.guideCircle(C0, R);
  for (const deg of turns) c.fill("thread-spool", toPath(carve([plate(deg)], grown), placing));
  c.fill("thread-spool", toPath([disc([0, 0], BOSS)], placing));
  for (const deg of turns) c.fill("thread-spool", toPath(carve([petal(deg)], [disc([0, 0], BOSS + PARTING)]), placing));
};
