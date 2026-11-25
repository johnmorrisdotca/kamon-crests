// The ivy leaf, 蔦, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 22, つた).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line, and the white round a lobe that lies over another. */
const LINE = 2;
/** Where the veins meet: the middle of the small ring, a grid point on the axis. */
const RING: V = [0, 22];
/** The ring's white, and the disc in it. */
const RING_WHITE = 10;
const RING_DISC = 8;

/** The lobe that points down: a round body, and beyond it a scallop at the tip and two up each side. Its veins end on the body's circle. */
const DOWN_BODY: Circle = { c: [0, -33], r: 44 };
const DOWN_TIP: Circle = { c: [0, -55], r: 32 };
const DOWN_SIDE: Circle[] = [{ c: [38, -46], r: 12 }, { c: [29, -58], r: 14 }];
/** Its side veins on the right are arcs about one point, each a white line wide: the inner radius of each. */
const DOWN_VEINS: { c: V; r: number[] } = { c: [-60, -70], r: [106, 91, 77] };

/** The right lobe: a round body and four scallops round its end, from the upper edge down. */
const SIDE_BODY: Circle = { c: [48, 2], r: 41 };
const SIDE_EDGE: Circle[] = [{ c: [74, 22], r: 20 }, { c: [84, 0], r: 16 }, { c: [75, -23], r: 17 }, { c: [58, -27], r: 15 }];
/** Its midrib runs from the ring through this grid point. */
const SIDE_RIB: V = [90, -8];
/** Its veins above the midrib, and those below: arcs about one point each. */
const SIDE_UPPER: { c: V; r: number[] } = { c: [46, -48], r: [79, 70, 60] };
const SIDE_LOWER: { c: V; r: number[] } = { c: [-40, -50], r: [105, 119] };

/** The upper right lobe: a round body and three scallops, from the axis out. */
const TOP_BODY: Circle = { c: [25, 48], r: 28 };
const TOP_EDGE: Circle[] = [{ c: [14, 52], r: 28 }, { c: [42, 66], r: 21 }, { c: [58, 52], r: 19 }];
/** Its veins fan from the ring: arcs of one width about three points. */
const TOP_VEINS: { c: V[]; r: number } = { c: [[87, -3], [77, -24], [63, -43]], r: 89 };

const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
const within = (circles: Circle[], p: V, grow = 0): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r + grow);
/** Whether a point lies on the white line whose inner edge is the circle of radius `r` about `at`. */
const onLine = (at: V, r: number, p: V): boolean => vdist(at, p) > r && vdist(at, p) < r + LINE;
const rounds = (circles: Circle[], grow = 0): Piece[] => circles.flatMap((circ) => disc(circ.c, circ.r + grow));
const lines = (at: V, radii: number[]): Piece[] => radii.flatMap((r) => [...disc(at, r), ...disc(at, r + LINE)]);
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 9, a[1] - (b[1] - a[1]) * 9], [a[0] + (b[0] - a[0]) * 9, a[1] + (b[1] - a[1]) * 9]);

/**
 * The ivy leaf, 蔦: five round lobes with scalloped edges about a small ring, the largest pointing down, one to each side and two
 * above with a white line between them. The lobe that points down lies over the side lobes, and they over the upper two, a white
 * line round each. A white midrib runs down the lower lobe and out along each side lobe, with white veins beside it, and three
 * white veins fan up each upper lobe. The right half is built in full and the left half where it stands.
 */
export const tsutaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const ring = (p: V): boolean => vdist(RING, p) < RING_WHITE;
  const down = [DOWN_BODY, DOWN_TIP, ...DOWN_SIDE, ...DOWN_SIDE.map(flip)];
  const side = [SIDE_BODY, ...SIDE_EDGE];
  const top = [TOP_BODY, ...TOP_EDGE];
  const axis = [ruled([1, 0], [1, 10]), ruled([-1, 0], [-1, 10])];
  // How far a point stands above the right lobe's midrib.
  const slope = Math.hypot(SIDE_RIB[0] - RING[0], SIDE_RIB[1] - RING[1]);
  const above = (p: V): number => ((SIDE_RIB[0] - RING[0]) * (p[1] - RING[1]) - (SIDE_RIB[1] - RING[1]) * (p[0] - RING[0])) / slope;
  const beside = (off: number): Piece => {
    const n: V = [(-(SIDE_RIB[1] - RING[1]) * off) / slope, ((SIDE_RIB[0] - RING[0]) * off) / slope];

    return ruled([RING[0] + n[0], RING[1] + n[1]], [SIDE_RIB[0] + n[0], SIDE_RIB[1] + n[1]]);
  };
  const rib = [beside(LINE / 2), beside(-LINE / 2)];

  const downVein = (p: V): boolean => within([DOWN_BODY], p) && (Math.abs(p[0]) < LINE / 2 || DOWN_VEINS.r.some((r) => onLine([Math.sign(p[0]) * DOWN_VEINS.c[0], DOWN_VEINS.c[1]], r, p)));
  const downLobe = carveWhere(
    [...rounds(down), ...disc(RING, RING_WHITE), ...axis, ...lines(DOWN_VEINS.c, DOWN_VEINS.r), ...lines([-DOWN_VEINS.c[0], DOWN_VEINS.c[1]], DOWN_VEINS.r)],
    (p) => within(down, p) && !ring(p) && !downVein(p),
  );
  const sideVein = (p: V): boolean =>
    within([SIDE_BODY], p) && (Math.abs(above(p)) < LINE / 2 || (above(p) > 0 && SIDE_UPPER.r.some((r) => onLine(SIDE_UPPER.c, r, p))) || (above(p) < 0 && SIDE_LOWER.r.some((r) => onLine(SIDE_LOWER.c, r, p))));
  const sideLobe = carveWhere(
    [...rounds(side), ...rounds([DOWN_BODY, DOWN_SIDE[0]], LINE), ...disc(RING, RING_WHITE), ...rib, ...lines(SIDE_UPPER.c, SIDE_UPPER.r), ...lines(SIDE_LOWER.c, SIDE_LOWER.r)],
    (p) => within(side, p) && !within(down, p, LINE) && !ring(p) && !sideVein(p),
  );
  const topLobe = carveWhere(
    [...rounds(top), ...rounds([SIDE_BODY, SIDE_EDGE[0]], LINE), ...disc(RING, RING_WHITE), axis[0], ...TOP_VEINS.c.flatMap((at) => lines(at, [TOP_VEINS.r]))],
    (p) => within(top, p) && p[0] > LINE / 2 && !within(side, p, LINE) && !ring(p) && !(within([TOP_BODY], p) && TOP_VEINS.c.some((at) => onLine(at, TOP_VEINS.r, p))),
  );

  c.guideCircle(C0, reach);
  for (const r of [RING_WHITE, RING_DISC]) c.guideCircle(onPage(RING, placing), r * placing.k);
  const right = [...topLobe, ...sideLobe];
  c.fill(part, toPath(longLast(right), placing));
  c.group(() => {
    c.fill(part, toPath(longLast(downLobe), placing));
    c.fill(part, toPath([disc(RING, RING_DISC)], placing));
  });
  c.fill(part, toPath(longLast(right.map((loop: Region) => loop.map(mirrored))), placing));
};
