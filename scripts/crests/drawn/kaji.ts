// The paper-mulberry leaf, 梶の葉, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle
// at 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 17, 梶の葉).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, lineCircle, mirrored, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: a vein, the line between two lobes, and the white round the stem where it lies over the leaf. */
const LINE = 2;
/** The five round lobes: the one at the top, and on the right the one at the side and the one below. */
const TOP: Circle = { c: [0, 58], r: 40 };
const SIDE: Circle = { c: [63, 6], r: 34 };
const LOW: Circle = { c: [40, -60], r: 30 };
/** The round middle the lobes stand on: the bays between the lobes reach in to it. */
const HUB: Circle = { c: [0, -12], r: 52 };
/** The veins of a lobe end this far inside its edge. */
const RIM = 10;
/** Where the veins meet, on the axis. */
const FOOT: V = [0, -50];
/** The white lines between the lobes run from the foot through these grid points: top and side, then side and low. */
const BETWEEN: V[] = [[5, -38], [9, -46]];
/** The top lobe's veins on the right: each from a grid point on the midrib, rising seven in four. */
const TOP_VEINS: [V, V][] = [10, 30, 50, 64].map((y): [V, V] => [[0, y], [4, y + 7]]);
/** The side lobe's veins: each a line through two grid points, from the line between the lobes out into the lobe. */
const SIDE_VEINS: [V, V][] = [
  [[20, -6], [66, -12]],
  [[22, 0], [72, -2]],
  [[24, 6], [80, 8]],
  [[26, 12], [68, 26]],
];
/** The low lobe's rib is level with the foot, and its veins hang from the rib, falling three in two. */
const LOW_VEINS: [V, V][] = [14, 22, 30].map((x): [V, V] => [[x, FOOT[1]], [x + 2, FOOT[1] - 3]]);
/** The stem: between two upright lines, from a level line in the leaf's middle down to another near the layout circle. */
const STEM = { half: 6, top: -62, foot: -98 };

const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => {
  const k = 400 / vdist(a, b);

  return seg([a[0] - (b[0] - a[0]) * k, a[1] - (b[1] - a[1]) * k], [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]);
};
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** How far along the line from `a` to `b` a point stands, from `a`. */
const along = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[0] - a[0]) + (b[1] - a[1]) * (p[1] - a[1])) / vdist(a, b);
/** The two lines `LINE` apart that a white line lies between. */
const edges = ([a, b]: [V, V]): Piece[] =>
  [LINE / 2, -LINE / 2].map((off) => {
    const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

    return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
  });
/** Whether a point is on a vein: on its line, and no further along it than the circle the lobe's veins end on. */
const onVein = (line: [V, V], end: Circle, p: V): boolean => {
  const chord = lineCircle(line[0], line[1], end.c, end.r);
  const middle = (along(line, chord[0]) + along(line, chord[1])) / 2;

  return Math.abs(leftOf(line, p)) < LINE / 2 && (along(line, p) < middle || within(end, p));
};
const inner = (circ: Circle): Circle => ({ c: circ.c, r: circ.r - RIM });
const rounds = (circles: Circle[]): Piece[] => circles.flatMap((circ) => disc(circ.c, circ.r));

/**
 * The paper-mulberry leaf, 梶の葉: a leaf of five round lobes on a short stem, one lobe at the top, one to each side and two
 * below. The lobes stand on a round middle, and a white line runs between any two from the point on the axis where the veins
 * meet. A white midrib runs up the top lobe with four white veins each side; four veins fan into each side lobe, and each low
 * lobe has a level rib with three veins hanging from it. The veins end short of the edge. The top lobe is built in full, then
 * the right side, the stem, and the left side where it stands.
 */
export const kajiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const [topSide, sideLow]: [V, V][] = BETWEEN.map((to): [V, V] => [FOOT, to]);
  const rib: [V, V] = [FOOT, [FOOT[0] + 10, FOOT[1]]];
  const right = (p: V): V => [Math.abs(p[0]), p[1]];
  const both = (pieces: Piece[]): Piece[] => [...pieces, ...pieces.map(mirrored)];
  const stemRoom = (p: V): boolean => Math.abs(p[0]) < STEM.half + LINE && p[1] < STEM.top + LINE;

  const top = carveWhere(
    [...rounds([TOP, HUB, inner(TOP)]), ...edges([[0, 0], [0, 10]]), ...both([edges(topSide)[0], ...TOP_VEINS.flatMap(edges)])],
    (at) => {
      const p = right(at);
      if (!(within(TOP, p) || within(HUB, p)) || leftOf(topSide, p) < LINE / 2) return false;
      if (p[0] < LINE / 2 && (p[1] < TOP.c[1] || within(inner(TOP), p))) return false;

      return !TOP_VEINS.some((line) => p[0] > LINE / 2 && onVein(line, inner(TOP), p));
    },
  );
  const side = carveWhere(
    [
      ...rounds([SIDE, LOW, HUB, inner(SIDE), inner(LOW)]),
      edges(topSide)[1],
      ...edges(sideLow),
      ...edges(rib),
      ...edges([[0, 0], [0, 10]]),
      ...[...SIDE_VEINS, ...LOW_VEINS].flatMap(edges),
      ruled([STEM.half + LINE, 0], [STEM.half + LINE, 10]),
      ruled([0, STEM.top + LINE], [10, STEM.top + LINE]),
    ],
    (p) => {
      if (!(within(SIDE, p) || within(LOW, p) || within(HUB, p)) || leftOf(topSide, p) > -LINE / 2 || p[0] < LINE / 2 || stemRoom(p)) return false;
      if (within(HUB, p) && Math.abs(leftOf(sideLow, p)) < LINE / 2) return false;
      if (Math.abs(leftOf(rib, p)) < LINE / 2 && (p[0] < LOW.c[0] || within(inner(LOW), p))) return false;
      if (leftOf(sideLow, p) > 0 && SIDE_VEINS.some((line) => onVein(line, inner(SIDE), p))) return false;

      return !(leftOf(rib, p) < 0 && LOW_VEINS.some((line) => onVein(line, inner(LOW), p)));
    },
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, STEM.foot].map((y) => ruled([0, y], [10, y]))],
    (p) => Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > STEM.foot,
  );

  c.guideCircle(C0, reach);
  c.guideCircle(onPage(HUB.c, placing), HUB.r * placing.k);
  c.fill(part, toPath(longLast(top), placing));
  c.fill(part, toPath(longLast(side), placing));
  c.fill(part, toPath(stem, placing));
  c.fill(part, toPath(longLast(side.map((loop) => loop.map(mirrored))), placing));
};
