// The single pine, 一つ松, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100.
// Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 30, 一ツまつ).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: a needle, the white each side of the branch, a mark on the bark, and the white round a lobe that lies over the branch. */
const LINE = 2;
/** The crown's scallops: one at the top, and on the right one beside it and the round lobe at the end, which lies over the branch's end. */
const TOP: Circle = { c: [0, 23], r: 40 };
const MID: Circle = { c: [40, 8], r: 39 };
const END: Circle = { c: [73, -9], r: 26 };
/** The needles end this far inside the crown's edge, and they fill the round middle of the crown as well. */
const RIM = 9;
const CORE: Circle = { c: [0, -30], r: 73 };
/** The branch arches under the crown: circles about one point on the axis, for the crown's lower edge, the branch and the trunk's top. */
const ARCH: V = [0, -103];
const [CROWN, BRANCH_TOP, BRANCH_FOOT, TRUNK] = [98, 96, 92, 90];
/** The needles of the right side: each a white line from a grid point on the midrib or the branch towards another. */
const NEEDLES: [V, V][] = [
  [[0, 41], [11, 52]],
  [[0, 33], [17, 47]],
  [[0, 24], [24, 39]],
  [[0, 14], [33, 33]],
  [[0, 4], [42, 28]],
  [[2, -5], [51, 28]],
  [[19, -7], [61, 20]],
  [[33, -11], [68, 8]],
  [[42, -14], [77, 4]],
  [[52, -20], [85, -5]],
];
/** The trunk: a round shoulder under the branch, a root that spreads below it, and the round middle between them, down to a flat foot. */
const SHOULDER: Circle = { c: [42, -32], r: 14 };
const ROOT: Circle = { c: [7, -83], r: 54 };
const NECK: Circle = { c: [0, -40], r: 42 };
const FOOT = -79;
/** The arch cut into the foot each side, and the two marks on the bark over it: white lines about its centre, inside a circle of their own. */
const NOTCH: Circle = { c: [24, -84], r: 14 };
const LOW_MARKS = { r: [22, 29], within: { c: [24, -54], r: 12 } as Circle };
/** The two marks under the branch each side: white lines about the branch's centre, inside a circle of their own. */
const HIGH_MARKS = { r: [83, 77], within: { c: [24, -25], r: 11 } as Circle };

const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
const both = (circ: Circle): Circle[] => [circ, flip(circ)];
const within = (circles: Circle[], p: V, grow = 0): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r + grow);
const rounds = (circles: Circle[], grow = 0): Piece[] => circles.flatMap((circ) => disc(circ.c, circ.r + grow));
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 40, a[1] - (b[1] - a[1]) * 40], [a[0] + (b[0] - a[0]) * 40, a[1] + (b[1] - a[1]) * 40]);
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};
/** Whether a point lies on the white line whose inner edge is the circle of radius `r` about `at`. */
const onLine = (at: V, r: number, p: V): boolean => vdist(at, p) > r && vdist(at, p) < r + LINE;

export function matsuInk(): [Region[], Region[], Region[]] {
  const scallops = [TOP, ...both(MID), ...both(END)];
  const inner = [...scallops.map((circ) => ({ c: circ.c, r: circ.r - RIM })), CORE];
  const needles = NEEDLES.flatMap(([a, b]): [V, V][] => [[a, b], [[-a[0], a[1]], [-b[0], b[1]]]]);
  const up = (p: V): number => vdist(ARCH, p);
  const needle = (p: V): boolean => Math.abs(p[0]) < LINE / 2 || needles.some((line) => Math.abs(leftOf(line, p)) < LINE / 2 && p[0] * line[1][0] > Math.abs(line[1][0]) * (LINE / 2));
  const crown = carveWhere(
    [...rounds(scallops), ...rounds(inner), ...disc(ARCH, CROWN), ruled([LINE / 2, 0], [LINE / 2, 10]), ruled([-LINE / 2, 0], [-LINE / 2, 10]), ...needles.flatMap((line) => [beside(line, LINE / 2), beside(line, -LINE / 2)])],
    (p) => (within(both(END), p) || (up(p) > CROWN && within(scallops, p))) && !(up(p) > CROWN && within(inner, p) && needle(p)),
  );
  const over = rounds(both(END), LINE);
  // The branch ends under the round lobes: past the line from its centre through a lobe's, it is not drawn again.
  const branch = carveWhere([...disc(ARCH, BRANCH_TOP), ...disc(ARCH, BRANCH_FOOT), ...over], (p) => up(p) < BRANCH_TOP && up(p) > BRANCH_FOOT && leftOf([ARCH, END.c], [Math.abs(p[0]), p[1]]) > 0 && !within(both(END), p, LINE));
  const body = [...both(SHOULDER), ...both(ROOT), NECK];
  const marks = (p: V): boolean => {
    const at: V = [Math.abs(p[0]), p[1]];

    return (within([LOW_MARKS.within], at) && LOW_MARKS.r.some((r) => onLine(NOTCH.c, r, at))) || (within([HIGH_MARKS.within], at) && HIGH_MARKS.r.some((r) => onLine(ARCH, r, at)));
  };
  const trunk = carveWhere(
    [
      ...rounds(body),
      ...rounds(both(NOTCH)),
      ...over,
      ...disc(ARCH, TRUNK),
      ruled([0, FOOT], [10, FOOT]),
      ...rounds(both(LOW_MARKS.within)),
      ...rounds(both(HIGH_MARKS.within)),
      ...both(NOTCH).flatMap((circ) => LOW_MARKS.r.flatMap((r) => [...disc(circ.c, r), ...disc(circ.c, r + LINE)])),
      ...HIGH_MARKS.r.flatMap((r) => [...disc(ARCH, r), ...disc(ARCH, r + LINE)]),
    ],
    (p) => up(p) < TRUNK && p[1] > FOOT && within(body, p) && !within(both(NOTCH), p) && !within(both(END), p, LINE) && !marks(p),
  );

  return [longLast(crown), longLast(branch), longLast(trunk)];
}

/**
 * The single pine, 一つ松: a crown like a cloud, five scallops along its top, over a branch that arches under it, and a short trunk
 * that spreads to a flat foot with an arch cut into it each side. White needles fan up the crown from a white midrib and from the
 * branch, and end short of its edge; white marks lie on the bark. The crown, the branch and the trunk are one shape each.
 */
export const matsuBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [crown, branch, trunk] = matsuInk();

  c.guideCircle(C0, reach);
  c.fill(part, toPath(crown, placing));
  c.fill(part, toPath(branch, placing));
  c.fill(part, toPath(trunk, placing));
};
