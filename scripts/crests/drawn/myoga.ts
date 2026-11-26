// The embracing ginger, 抱き茗荷, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle
// at 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 42, だきめうが).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carve, carveWhere, circleThrough, disc, mirrored, reversed, seg, shortArc, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the slit between the buds, the line between two scales, and the outline of a scale's mark. */
const LINE = 2;
/** The bud's back is the layout circle itself. */
const BACK = 100;
/** The tops of the three inner scales, from the flower down: circles on the axis, so that the two buds' scales meet there. Each is the inner edge of a white line. */
const INNER: Circle[] = [{ c: [0, 9], r: 58 }, { c: [0, -62], r: 94 }, { c: [0, -100], r: 94 }];
/** The tops of the outer scales along the back, from the second down: each the inner edge of a white line. */
const OUTER: Circle[] = [{ c: [92, 14], r: 47 }, { c: [116, -35], r: 66 }, { c: [98, -82], r: 66 }];
/** The line between the lowest inner scale and the lowest outer one, down to the foot. */
const SEAM: Circle = { c: [-72, 10], r: 133 };
/** The white drop between the buds: the right bud's side of it. */
const DROP: Circle = { c: [-45, -52], r: 65 };
/** The round foot the bud ends in: a circle of this width that touches the back from inside and the slit, and rises into the drop. */
const FOOT_WIDTH = 9;
const FOOT: Circle = { c: [LINE / 2 + FOOT_WIDTH, -Math.sqrt((BACK - FOOT_WIDTH) ** 2 - (LINE / 2 + FOOT_WIDTH) ** 2)], r: FOOT_WIDTH };
/** The two white wedges between the buds, over the second and the third inner scale: each from a point on the slit to a grid point. */
const WEDGES: [V, V][] = [[[1, 67], [8, 33]], [[1, 32], [8, -2]]];
/** The line between the flower and the first outer scale. */
const FLOWER_SIDE: [V, V] = [[44, 90], [40, 54]];
/** The flower's petals, round ends on grid points, and the short white lines under the gaps between them: they fan from one point, between two circles about the first inner scale's centre. */
const PETALS: Circle[] = [{ c: [7, 93], r: 6 }, { c: [18, 92], r: 6 }, { c: [29, 89], r: 6 }, { c: [39, 85], r: 6 }];
const FAN: V = [24, 62];
const FAN_TO: V[] = [[23, 65], [24, 65], [26, 67]];
const FAN_SPAN = [70, 82];
/** The mark on each scale: the white outline of a lens, the space between two circles of one width. Its middle radius and the two centres. */
const MARKS: [number, V, V][] = [
  [22, [72, 68], [36, 63]],
  [34, [94, 20], [43, 47]],
  [34, [101, -17], [56, 20]],
  [105, [148, -111], [-8, 13]],
  [25, [39, 64], [12, 31]],
  [46, [58, 41], [3, -19]],
  [64, [88, -22], [-29, -51]],
];

/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 40, a[1] - (b[1] - a[1]) * 40], [a[0] + (b[0] - a[0]) * 40, a[1] + (b[1] - a[1]) * 40]);
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};
const both = (circ: Circle): Piece[] => [...disc(circ.c, circ.r), ...disc(circ.c, circ.r + LINE)];

/**
 * The embracing ginger, 抱き茗荷: two buds that stand face to face, their backs one circle, a white slit between them that opens
 * into a drop below the middle, and a round foot each at the bottom. A bud is three inner scales, one over the next, and four
 * outer ones along its back, with a white line between any two and the white outline of a lens on each; a flower of four round
 * petals stands on top. The right bud is built in full and the left one where it stands.
 */
export const myogaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [top, mid, low] = INNER;
  const [second, third, fourth] = OUTER;
  const fan = FAN_TO.map((to): [V, V] => [FAN, to]);
  // Whether a point lies on the white line whose inner edge is the circle given.
  const on = (circ: Circle, p: V): boolean => vdist(circ.c, p) > circ.r && vdist(circ.c, p) < circ.r + LINE;
  const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
  const mark = ([r, a, b]: [number, V, V], p: V): boolean => vdist(a, p) < r + LINE / 2 && vdist(b, p) < r + LINE / 2 && !(vdist(a, p) < r - LINE / 2 && vdist(b, p) < r - LINE / 2);
  const inked = (p: V): boolean => {
    if (within(FOOT, p)) return true;
    // Past the line from the centre through the foot's own centre, where the foot touches the back, the bud is the foot alone.
    if (p[0] < LINE / 2 || (p[1] < -50 && leftOf([[0, 0], FOOT.c], p) < 0)) return false;
    const side = leftOf(FLOWER_SIDE, p);
    if (side < -LINE / 2 && !within(top, p, LINE) && p[1] > top.c[1]) {
      // The flower: its petals' round ends, and the white lines between them.
      if (!PETALS.some((petal) => within(petal, p)) && vdist([0, 0], p) > 94) return false;

      return !(vdist(top.c, p) > FAN_SPAN[0] && vdist(top.c, p) < FAN_SPAN[1] && fan.some((line) => Math.abs(leftOf(line, p)) < LINE / 2));
    }
    if (vdist([0, 0], p) > BACK || (within(DROP, p) && p[1] > FOOT.c[1])) return false;
    if (Math.abs(side) < LINE / 2 && !within(top, p) && p[1] > top.c[1]) return false;
    // The wedges between the buds.
    if (within(top, p, LINE) && !within(mid, p) && leftOf(WEDGES[0], p) < 0) return false;
    if (within(mid, p) && !within(low, p) && leftOf(WEDGES[1], p) < 0) return false;
    // The lines between the scales, each as far as the line it runs into.
    if (on(top, p) && !within(second, p, LINE) && p[1] > 30) return false;
    if (on(mid, p) && !within(third, p, LINE) && p[1] > -20) return false;
    if (on(low, p) && within(SEAM, p, LINE)) return false;
    if (on(second, p) && !within(mid, p, LINE) && p[1] > 0) return false;
    if (on(third, p) && !within(low, p, LINE)) return false;
    if (on(fourth, p) && !within(SEAM, p, LINE) && p[1] > -50) return false;
    if (on(SEAM, p) && within(low, p, LINE) && p[1] < 0 && p[1] > FOOT.c[1]) return false;

    return !MARKS.some((one) => mark(one, p));
  };
  const outlines: Piece[] = [
    ...disc([0, 0], BACK),
    ...disc([0, 0], 94),
    ...[...INNER, ...OUTER, SEAM].flatMap(both),
    ...disc(DROP.c, DROP.r),
    ...disc(FOOT.c, FOOT.r),
    ...PETALS.flatMap((petal) => disc(petal.c, petal.r)),
    ...FAN_SPAN.flatMap((r) => disc(top.c, r)),
    ...MARKS.flatMap(([r, a, b]) => [a, b].flatMap((at) => [...disc(at, r - LINE / 2), ...disc(at, r + LINE / 2)])),
    ruled([LINE / 2, 0], [LINE / 2, 10]),
    ...WEDGES.map(([a, b]) => ruled(a, b)),
    ...[FLOWER_SIDE, ...fan].flatMap((line) => [beside(line, LINE / 2), beside(line, -LINE / 2)]),
  ];
  const bud = longLast(carveWhere(outlines, inked));

  c.guideCircle(C0, reach);
  for (const one of [bud, bud.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(one, placing));
};

const blossomOnGinger = ([x, y]: V, reach: number): Region[] => {
  const petals = [disc([x, y], reach * 0.49)];
  for (let at = 0; at < 6; at += 1) {
    const angle = at * Math.PI / 3;
    petals.push(disc([x + Math.cos(angle) * reach * 0.56, y + Math.sin(angle) * reach * 0.56], reach * 0.35));
  }
  return carve(petals, [disc([x, y], reach * 0.18)]);
};

/** A pair of wide open shoots, each with a large six-lobed flower. */
export const hanadakiMyogaBuild = (c: Builder): void => {
  c.precision(3);
  const heel: V = [11, -86];
  const tip: V = [12, 88];
  const side = shortArc(circleThrough(heel, tip, 89.4, [7, 1]), heel, tip);
  const inner = shortArc(circleThrough(tip, heel, 122, [-97, 5]), tip, heel);
  const back = [side, inner];
  const curl = disc([14, 83], 6.5);
  const leaves = [] as Region[];
  for (const [x, y] of [[29, 81], [48, 68], [59, 52], [71, 33], [76, 13]]) {
    leaves.push(disc([x, y], 8.8), disc([x + 9, y - 6], 6.0));
  }
  const ribs = [thickSeg([25, -65], [56, -23], 2.5), thickSeg([15, -56], [47, -11], 2.2)];
  for (const [x, y] of [[35, 69], [50, 58], [61, 38], [72, 21]]) ribs.push(thickSeg([x - 9, y - 5], [x + 5, y + 2], 1.85));
  const gap = disc([52, -8], 20.2);
  const shape = [...carve([back, ...leaves, curl, disc(heel, 9.2)], [...ribs, gap]), ...blossomOnGinger([52, -8], 20)];
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  c.fill("ginger", toPath(shape, { k: 0.985 }));
  c.fill("ginger", toPath(shape.map((loop) => loop.map(mirrored).reverse().map(reversed)), { k: 0.985 }));
};
