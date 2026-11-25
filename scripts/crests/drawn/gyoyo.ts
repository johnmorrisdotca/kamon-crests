// The embracing apricot leaves with a flower, 抱き花杏葉, struck and ruled in their own frame: the centre at (0, 0), x to the right, y up, the
// layout circle at 100. Their proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 41, はなぎやうよう).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the slit between the leaves, and the line between two lobes. */
const LINE = 2;
/** The back of the leaf's lobes is the layout circle itself; the stalk's back is a smaller circle, so that the wide lobe's corner stands out over it. */
const BACK = 100;
const STALK_BACK: Circle = { c: [0, -8], r: 92 };
/** The compass width of every long line between two lobes. */
const LONG = 96;
/** The curled tip: a circle that touches the slit, and the circle from above whose arc is the white line under the curl. */
const TIP: Circle = { c: [19, 82], r: 18 };
const CURL: Circle = { c: [12, 96], r: 18 };
/** The two round lobes down the back, under the tip. */
const SECOND: Circle = { c: [40, 62], r: 30 };
const THIRD: Circle = { c: [63, 45], r: 22 };
/** The inner lobe, beside the slit: its body, the circle its top lies on, and the circle that parts it from the third lobe. */
const INNER: Circle = { c: [20, 50], r: 30 };
const INNER_TOP: Circle = { c: [24, 80], r: 30 };
const INNER_SIDE: Circle = { c: [62, 27], r: 26 };
/** The line between the tip and the second lobe, and the fold in the tip, which runs down from the curl's line: arcs about these points. */
const TIP_SIDE: V = [-62, 87];
const FOLD: V = [-62, 28];
/** The lines from the inner lobe's corner: down to the left between the second lobe and the inner one, and up to the right between the second and the third. */
const UNDER_SECOND: V = [-22, -33];
const OVER_THIRD: V = [-8, 123];
/** The wide lobe that holds the flower: its top is two arcs that meet over the flower, its foot two arcs that meet under it. */
const WIDE_TOP: [V, V] = [[37, 110], [22, 106]];
const WIDE_FOOT: [V, V] = [[100, -106], [-21, -97]];
/** The flower: a small disc in a white ring where the wide lobe's foot dips, and white stamens ruled from its middle, each but the middle one to a white dot. */
const FLOWER: Circle = { c: [50, -20], r: 9 };
const STAMENS: V[] = [[27, 6], [38, 9], [61, 11], [71, 4], [82, -3]];
const MIDDLE_STAMEN: V = [48, 14];
const STAMEN = 1.5;
const DOT = 2.5;
/** The stalk: the line that parts its two strips, the white drop between the two leaves, and the round foot. */
const STALK: V = [-48, -22];
const DROP: Circle = { c: [-50, -50], r: 73 };
const FOOT_WIDTH = 9;
const FOOT: Circle = { c: [LINE / 2 + FOOT_WIDTH, STALK_BACK.c[1] - Math.sqrt((STALK_BACK.r - FOOT_WIDTH) ** 2 - (LINE / 2 + FOOT_WIDTH) ** 2)], r: FOOT_WIDTH };
/** The two white wedges between the leaves, each from a point on the slit down to a grid point. */
const WEDGES: [V, V][] = [[[1, 82], [6, 60]], [[1, 57], [8, 22]]];

const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
/** Whether a point lies on the white line whose middle is the circle of the long width about `at`. */
const onLong = (at: V, p: V): boolean => Math.abs(vdist(at, p) - LONG) < LINE / 2;
/** Whether a point lies on the white line whose inner edge is the circle given. */
const onEdge = (circ: Circle, p: V): boolean => vdist(circ.c, p) > circ.r && vdist(circ.c, p) < circ.r + LINE;
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 40, a[1] - (b[1] - a[1]) * 40], [a[0] + (b[0] - a[0]) * 40, a[1] + (b[1] - a[1]) * 40]);
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};
const long = (at: V): Piece[] => [...disc(at, LONG - LINE / 2), ...disc(at, LONG + LINE / 2)];
const edge = (circ: Circle): Piece[] => [...disc(circ.c, circ.r), ...disc(circ.c, circ.r + LINE)];

/**
 * The embracing apricot leaves with a flower, 抱き花杏葉: two leaves that stand face to face, their backs one circle, a white slit between them
 * that opens into a drop below the middle, and a round foot each at the bottom of a stalk that is set in from the circle. A leaf is a curled tip, two round lobes down
 * its back and one beside the slit, a wide lobe below them that holds a small flower with six white stamens, and a stalk in
 * two strips; a white line runs between any two. The right leaf is built in full and the left one where it stands.
 */
export const gyoyoBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  // Above the wide lobe's top: inside both of its arcs' circles. Below its foot: inside either of the foot's.
  const above = (p: V, grow: number): boolean => WIDE_TOP.every((at) => vdist(at, p) < LONG + grow);
  const below = (p: V, grow: number): boolean => WIDE_FOOT.some((at) => vdist(at, p) < LONG + grow);
  const stamens: [V, V][] = [...STAMENS, MIDDLE_STAMEN].map((to): [V, V] => [FLOWER.c, to]);
  const inked = (p: V): boolean => {
    if (p[0] < LINE / 2) return false;
    if (within(FLOWER, p, LINE)) return within(FLOWER, p);
    if (!above(p, -LINE / 2)) {
      // The wide lobe and the stalk, as far as the back.
      if (vdist([0, 0], p) > BACK || above(p, LINE / 2) || (below(p, LINE / 2) && !below(p, -LINE / 2))) return false;
      if (!below(p, 0)) {
        if (STAMENS.some((to) => vdist(to, p) < DOT)) return false;

        return !stamens.some((line) => Math.abs(leftOf(line, p)) < STAMEN / 2 && vdist(FLOWER.c, p) < vdist(line[0], line[1]) && (p[0] - FLOWER.c[0]) * (line[1][0] - FLOWER.c[0]) + (p[1] - FLOWER.c[1]) * (line[1][1] - FLOWER.c[1]) > 0);
      }
      if (within(FOOT, p)) return true;

      return within(STALK_BACK, p) && !within(DROP, p) && !onLong(STALK, p);
    }
    const tip = within(TIP, p);
    if (!tip && ![SECOND, THIRD, INNER, INNER_SIDE].some((circ) => within(circ, p))) return false;
    if (leftOf(WEDGES[0], p) < 0 && within(INNER_TOP, p) && !tip) return false;
    if (leftOf(WEDGES[1], p) < 0 && !within(INNER_TOP, p, LINE)) return false;
    const inTip = vdist(TIP_SIDE, p) < LONG + LINE / 2;
    if (tip && onEdge(CURL, p) && vdist(FOLD, p) < LONG + LINE / 2) return false;
    if (onEdge(INNER_TOP, p) && inTip) return false;
    if (onLong(TIP_SIDE, p) && within(INNER_TOP, p, LINE)) return false;
    if (onLong(FOLD, p) && !within(CURL, p) && inTip && within(INNER_TOP, p, LINE)) return false;
    if (onLong(UNDER_SECOND, p) && !within(INNER_TOP, p) && !within(INNER_SIDE, p)) return false;
    if (onLong(OVER_THIRD, p) && vdist(UNDER_SECOND, p) > LONG) return false;

    return !(onEdge(INNER_SIDE, p) && vdist(UNDER_SECOND, p) < LONG);
  };
  const outlines: Piece[] = [
    ...disc([0, 0], BACK),
    ruled([LINE / 2, 0], [LINE / 2, 10]),
    ...[TIP, SECOND, THIRD, INNER, DROP, FOOT, STALK_BACK].flatMap((circ) => disc(circ.c, circ.r)),
    ...[CURL, INNER_TOP, INNER_SIDE, FLOWER].flatMap(edge),
    ...[TIP_SIDE, FOLD, UNDER_SECOND, OVER_THIRD, STALK, ...WIDE_TOP, ...WIDE_FOOT].flatMap(long),
    ...[UNDER_SECOND, ...WIDE_TOP, ...WIDE_FOOT].flatMap((at) => disc(at, LONG)),
    ...STAMENS.flatMap((to) => disc(to, DOT)),
    ...stamens.flatMap((line) => [beside(line, STAMEN / 2), beside(line, -STAMEN / 2)]),
    ...WEDGES.map(([a, b]) => ruled(a, b)),
  ];
  const leaf = longLast(carveWhere(outlines, inked));

  c.guideCircle(C0, reach);
  for (const one of [leaf, leaf.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(one, placing));
};
