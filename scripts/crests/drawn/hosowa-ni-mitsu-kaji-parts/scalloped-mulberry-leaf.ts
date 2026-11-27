import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";
// The paper-mulberry leaf, 梶の葉, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle
// at 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 17, 梶の葉).
import { carveWhere, disc, lineCircle, mirrored, seg, vdist } from "../../../construct/compass.ts";
import type { Circle, Piece, V } from "../../../construct/compass.ts";

/** The five round lobes: the one at the top, and on the right the one at the side and the one below. */
const TOP: Circle = { c: [0, 58], r: 40 };
const SIDE: Circle = { c: [63, 6], r: 34 };
const LOW: Circle = { c: [40, -60], r: 30 };
/** A lobe's edge is nine scallops: circles two fifths of the lobe wide, on the grid points nearest a ring three fifths of it out, the first on the lobe's rib. */
const SCALLOPS = 9;
/** The round middle the lobes stand on: the bays between the lobes reach in to it. */
const HUB: Circle = { c: [0, -14], r: 44 };
/** The veins of a lobe end this far inside its edge, on a circle that is the lobe's middle too. */
const RIM = 10;
/** Where the ribs meet, on the axis. */
const FOOT: V = [0, -50];
/** The top lobe's veins on the right: each from a grid point on the midrib, rising seven in four. */
const TOP_VEINS: [V, V][] = [10, 30, 50, 64].map((y): [V, V] => [[0, y], [4, y + 7]]);
/** The side lobe's veins, above its rib and below it, and the low lobe's: each a line through two grid points, from the rib out into the lobe. */
const SIDE_VEINS: { up: [V, V][]; down: [V, V][] } = {
  up: [[[36, -18], [44, 2]], [[45, -10], [53, 10]], [[54, -2], [62, 18]]],
  down: [[[36, -18], [58, -14]], [[45, -10], [67, -6]], [[54, -2], [76, 2]]],
};
const LOW_VEINS: { up: [V, V][]; down: [V, V][] } = {
  up: [[[20, -55], [36, -45]], [[32, -58], [48, -48]], [[44, -61], [60, -51]]],
  down: [[[20, -55], [30, -71]], [[32, -58], [42, -74]], [[44, -61], [54, -77]]],
};
/** The stem: between two upright lines, from a level line in the leaf's middle down to another near the layout circle. */
const STEM = { half: 6, top: -58, foot: -98 };

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
const edges = ([a, b]: [V, V], line: number): Piece[] =>
  [line / 2, -line / 2].map((off) => {
    const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

    return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
  });
/** Whether a point is on a vein: on its line, and no further along it than the circle the lobe's veins end on. */
const onVein = (line: [V, V], end: Circle, p: V, width: number): boolean => {
  const chord = lineCircle(line[0], line[1], end.c, end.r);
  const middle = (along(line, chord[0]) + along(line, chord[1])) / 2;

  return Math.abs(leftOf(line, p)) < width / 2 && (along(line, p) < middle || within(end, p));
};
const inner = (circ: Circle): Circle => ({ c: circ.c, r: circ.r - RIM });
const rounds = (circles: Circle[]): Piece[] => circles.flatMap((circ) => disc(circ.c, circ.r));
/** A lobe's scallops that show: those not wholly inside the round middle. */
const scallops = (lobe: Circle): Circle[] => {
  const turn = Math.atan2(lobe.c[1] - FOOT[1], lobe.c[0] - FOOT[0]);
  const all = Array.from({ length: SCALLOPS }, (_, i): Circle => {
    const a = turn + (i * 2 * Math.PI) / SCALLOPS;

    return { c: [Math.round(lobe.c[0] + 0.6 * lobe.r * Math.cos(a)), Math.round(lobe.c[1] + 0.6 * lobe.r * Math.sin(a))], r: Math.round(0.4 * lobe.r) };
  });

  return all.filter((circ) => vdist(circ.c, HUB.c) + circ.r > HUB.r + 1);
};

/**
 * The paper-mulberry leaf, 梶の葉: a leaf of five round lobes on a short stem, one lobe at the top, one to each side and two
 * below, each with a scalloped edge. The lobes stand on a round middle. A white rib runs from the point on the axis where the
 * ribs meet out along each lobe, with white veins leaving it on both sides: four a side in the top lobe, three a side in the
 * others. The veins end short of the edge. The stem lies over the leaf. The right half is built in full, then the stem, and
 * the left half where it stands.
 */
const mulberryRegions = (width: number, scale: number, foot = -98) => {
  const line = width / scale;
  const lobes = [TOP, SIDE, LOW].map((lobe) => ({ lobe, rib: [FOOT, lobe.c] as [V, V], edge: [...scallops(lobe), inner(lobe)] }));
  const veins: { line: [V, V]; of: number; side: 1 | -1 }[] = [
    ...TOP_VEINS.map((line) => ({ line, of: 0, side: -1 as const })),
    ...[SIDE_VEINS, LOW_VEINS].flatMap((set, i) => [...set.up.map((line) => ({ line, of: i + 1, side: 1 as const })), ...set.down.map((line) => ({ line, of: i + 1, side: -1 as const }))]),
  ];
  const stemRoom = (p: V): boolean => Math.abs(p[0]) < STEM.half + line && p[1] < STEM.top + line;
  const white = (p: V): boolean =>
    lobes.some(({ lobe, rib }) => onVein(rib, inner(lobe), p, line)) || veins.some((vein) => leftOf(lobes[vein.of].rib, p) * vein.side > 0 && onVein(vein.line, inner(lobes[vein.of].lobe), p, line));

  const half = carveWhere(
    [
      ...rounds([HUB, ...lobes.flatMap((one) => one.edge)]),
      ...lobes.flatMap((one) => edges(one.rib, line)),
      ...veins.flatMap((vein) => edges(vein.line, line)),
      ruled([STEM.half + line, 0], [STEM.half + line, 10]),
      ruled([0, STEM.top + line], [10, STEM.top + line]),
    ],
    (p) => p[0] > line / 2 && (within(HUB, p) || lobes.some((one) => one.edge.some((circ) => within(circ, p)))) && !stemRoom(p) && !white(p),
  );
  const stem = carveWhere(
    [...[-STEM.half, STEM.half].map((x) => ruled([x, 0], [x, 10])), ...[STEM.top, foot].map((y) => ruled([0, y], [10, y]))],
    (p) => Math.abs(p[0]) < STEM.half && p[1] < STEM.top && p[1] > foot,
  );

  return { leaf: [...half, ...half.map(loop => loop.map(mirrored))], stem };
};

interface MulberryOptions extends PartOptions {
  paper: number;
  stalkFoot?: number;
  mirror?: boolean;
}

/** Size 100 places the leaf on the original single-leaf layout circle. */
export const scallopedMulberryLeaf = definePart<MulberryOptions>({
  id: "scalloped-mulberry-leaf",
  name: { en: "Scalloped paper-mulberry leaf", ja: "丸い切れ込みの梶の葉" },
  description: {
    en: "Five scalloped lobes meet at one point, with white veins and a short stalk.",
    ja: "丸い切れ込みのある五つの葉の先を一か所に集め、白い葉脈と短い柄を添えます。",
  },
  families: ["kaji"],
  sources: [{ frame: 17, page: "L", row: 2, col: 2, label: "梶の葉" }],
  sampleSize: 100,
  sampleOptions: { motif: "paper-mulberry", paper: 1.15 },
  build(c, centre, turn, size, { motif, paper, keyline, stalkFoot, mirror }) {
    const k = size / 100;
    const part = mulberryRegions(paper, k, stalkFoot);
    fillPart(c, motif, [...part.leaf, ...part.stem], { k, at: centre, turn, mirror }, keyline);
  },
});
