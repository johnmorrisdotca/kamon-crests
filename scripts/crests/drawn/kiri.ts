// The paulownia 桐, struck with a compass and a ruler: three leaves below (the middle one hanging, the two beside it turned 55
// degrees out and tucked behind it) and three upright spikes of florets above. Its proportions were measured from the
// crest book 伊呂波分新撰紋帳 (1892) and held beside a page of paulownia crests; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the layout circle at 100. A grid point is a point of whole
// numbers. A leaf is written hanging from the joint J; the left half is constructed and the right half is its mirror image.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, arcA, carveWhere, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const at = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });
const whole = (circ: Circle): Piece => arcA(circ.c, circ.r, 0, TAU);
const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
const flip = (circ: Circle): Circle => at(-circ.c[0], circ.c[1], circ.r);

/** The joint the three leaves hang from and the middle spike stands on: a grid point on the axis. */
const J: V = [0, 0];
/** The joint's own disc, and the white round it. */
const KNOT = at(J[0], J[1], 6);
const KNOT_GAP = 2;

// One leaf, hanging from the joint, in the joint's frame (the joint at (0, 0), the tip straight down).
/** The leaf's right edge: width 56, a grid point. Its left edge is the same circle mirrored. */
const EDGE = at(-12, -52, 56);
/** The body the scallops stand round. */
const BODY = at(0, -41, 40);
/** The scallops of the lower edge, width 14, on grid points: the tip's, and two up each side. */
const SCALLOPS: Circle[] = [at(0, -75, 14), at(20, -68, 14), at(32, -52, 14)];
/** The veins of the right half: each the white of 2 between widths 69 and 71, their centres stepping 8 along the level line 70 below the joint. */
const VEINS: V[] = [[-34, -70], [-42, -70], [-50, -70], [-58, -70]];
const VEIN_IN = 69;
const VEIN_OUT = 71;
/** Half the white of the midrib. */
const RIB = 1;
/** The white between a leaf and the one that lies over it. */
const OVER = 2;

/** How far the side leaves are turned out from hanging, about the joint: 55 degrees. */
const SIDE = 55 * DEG;

const scallops = [...SCALLOPS, ...SCALLOPS.slice(1).map(flip)];
/** Whether a point of the leaf's frame is within the leaf's outline, grown by `grow`. */
const leafOutline = (q: V, grow = 0): boolean => within(EDGE, q, grow) && within(flip(EDGE), q, grow) && (within(BODY, q, grow) || scallops.some((one) => within(one, q, grow)));
/** Whether it is ink: the outline, less the midrib, the veins and the white round the joint. */
const leafInk = (q: V): boolean => {
  if (!leafOutline(q) || Math.abs(q[0]) < RIB || Math.hypot(q[0], q[1]) < KNOT.r + KNOT_GAP) return false;
  const side = q[0] > 0 ? 1 : -1;

  return !VEINS.some((c) => {
    const d = vdist([c[0] * side, c[1]], q);

    return d > VEIN_IN && d < VEIN_OUT;
  });
};

/** A point of the crest in the frame of a leaf turned `a` clockwise-from-down toward the left about the joint. */
const inLeaf = (p: V, a: number): V => {
  const x = p[0] - J[0];
  const y = p[1] - J[1];

  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
};
/** A circle of the leaf's frame, on the crest, for a leaf turned `a`. */
const ofLeaf = (circ: Circle, a: number): Circle => {
  const [x, y] = circ.c;

  return at(J[0] + x * Math.cos(a) + y * Math.sin(a), J[1] - x * Math.sin(a) + y * Math.cos(a), circ.r);
};
const lineOfLeaf = (x: number, a: number): Piece => {
  const p = ofLeaf(at(x, 20, 0), a).c;
  const q = ofLeaf(at(x, -120, 0), a).c;

  return seg(p, q);
};

/** Every circle and line a whole leaf is cut from, for a leaf turned `a`. */
const leafOutlines = (a: number, halves: (1 | -1)[]): Piece[] => [
  ...[EDGE, flip(EDGE), BODY, ...scallops].map((circ) => whole(ofLeaf(circ, a))),
  whole(at(J[0], J[1], KNOT.r + KNOT_GAP)),
  ...halves.flatMap((side) => [
    lineOfLeaf(side * RIB, a),
    ...VEINS.flatMap((c) => [whole(ofLeaf(at(c[0] * side, c[1], VEIN_IN), a)), whole(ofLeaf(at(c[0] * side, c[1], VEIN_OUT), a))]),
  ]),
];
/** The circles that bound the white round the middle leaf where a side leaf passes under it. */
const overOutlines = (): Piece[] => [EDGE, flip(EDGE), BODY, ...scallops].map((circ) => whole(ofLeaf(at(circ.c[0], circ.c[1], circ.r + OVER), 0)));

/** The left half of the middle leaf. */
const middleLeaf: Region[] = carveWhere(leafOutlines(0, [-1]), (p) => p[0] < 0 && leafInk(inLeaf(p, 0)));
/** The left leaf: turned out, and cut where the middle leaf lies over it. */
const sideLeaf: Region[] = carveWhere([...leafOutlines(SIDE, [1, -1]), ...overOutlines()], (p) => leafInk(inLeaf(p, SIDE)) && !leafOutline(inLeaf(p, 0), OVER));

// The spikes. A floret is three discs of one width; a stalk is the black between two upright lines.
const STALK = 1.5;
/** A floret of buds of width 7, or of width 5 where a spike carries more of them. */
const floret = (x: number, y: number, bud: number): Circle[] => (bud === 7 ? [at(x, y + 5, 7), at(x - 6, y - 4, 7), at(x + 6, y - 4, 7)] : [at(x, y + 4, 5), at(x - 4, y - 3, 5), at(x + 4, y - 3, 5)]);

/** A spike on the upright line x: its florets, the top one last, and how far down its stalk runs. */
interface Spike {
  x: number;
  florets: Circle[];
  top: number;
}
const spikeInk = (spike: Spike, p: V, foot: (p: V) => boolean): boolean => spike.florets.some((one) => within(one, p)) || (Math.abs(p[0] - spike.x) < STALK && p[1] < spike.top && foot(p));
const spikeOutlines = (spike: Spike): Piece[] => [...spike.florets.map(whole), seg([spike.x - STALK, 99], [spike.x - STALK, -99]), seg([spike.x + STALK, 99], [spike.x + STALK, -99])];

/** The pairs of florets up a spike, and its top one: `pairs` are [distance out, height]. */
const spikeOf = (x: number, pairs: [number, number][], top: number, bud: number): Spike => ({
  x,
  florets: [...pairs.flatMap(([out, y]) => [...floret(x - out, y, bud), ...floret(x + out, y, bud)]), ...floret(x, top, bud)],
  top,
});

export interface KiriCounts {
  /** The pairs of florets up the middle spike and up each side spike: one pair for three florets, two for five, three for seven. */
  middle: [number, number][];
  side: [number, number][];
  middleTop: number;
  sideTop: number;
  /** The width of a bud. */
  bud: number;
  /** Where a side spike stands: an upright grid line. */
  sideAt: number;
}

/** 五三桐: five florets on the middle spike, three on each side spike. */
export const GOSAN: KiriCounts = { middle: [[16, 28], [16, 53]], side: [[15, 31]], middleTop: 76, sideTop: 52, bud: 7, sideAt: -60 };
/** 五七桐: seven on the middle spike, five on each side spike. */
export const GOSHICHI: KiriCounts = { middle: [[13, 25], [12, 42], [12, 59]], side: [[12, 27], [12, 44]], middleTop: 76, sideTop: 60, bud: 5, sideAt: -56 };

/** Draws the paulownia. The builder's zoom sets it inside a ring. */
export const kiriBuild = (c: Builder, counts: KiriCounts): void => {
  const k = R / 100;
  const here: Placing = { k };
  const there: Placing = { k, mirror: true };
  const middle = spikeOf(0, counts.middle, counts.middleTop, counts.bud);
  const side = spikeOf(counts.sideAt, counts.side, counts.sideTop, counts.bud);
  const middleSpike = carveWhere([...spikeOutlines(middle), whole(KNOT)], (p) => spikeInk(middle, p, (q) => q[1] > J[1] && !within(KNOT, q)));
  const sideSpike = carveWhere([...spikeOutlines(side), ...leafOutlines(SIDE, [])], (p) => spikeInk(side, p, (q) => q[1] > -20 && !leafOutline(inLeaf(q, SIDE))));

  c.guideCircle(C0, R);
  c.guideLine(onPage([0, 100], here), onPage([0, -100], here));
  c.guideCircle(onPage(J, here), KNOT.r * k);

  // The middle spike and the joint, on the axis; then the left side, from the top down; then the right side, struck in place as its mirror.
  c.group(() => {
    c.fill("paulownia", toPath(middleSpike, here));
    c.fill("paulownia", toPath([[whole(KNOT)]], here));
  });
  for (const place of [here, there]) {
    c.group(() => c.fill("paulownia", toPath(sideSpike, place)));
    c.group(() => c.fill("paulownia", toPath(sideLeaf, place)));
    c.group(() => c.fill("paulownia", toPath(middleLeaf, place)));
  }
};
