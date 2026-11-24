// The paulownia 桐, struck with a compass and a ruler: three leaves below (the middle one hanging, the two beside it spread
// almost level and passing under it) and three upright spikes of florets above. Its proportions were measured from the crest
// book 伊呂波分新撰紋帳 (1892) and held beside a page of paulownia crests; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the layout circle at 100. A grid point is a point of whole
// numbers. A leaf is written hanging from its own base, tip down; a floret standing on its base, top up. The left half is
// constructed and the right half is its mirror image.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, arcA, carveWhere, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const at = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });
const whole = (circ: Circle): Piece => arcA(circ.c, circ.r, 0, TAU);
const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
const flip = (circ: Circle): Circle => at(-circ.c[0], circ.c[1], circ.r);
const grown = (circ: Circle, by: number): Circle => at(circ.c[0], circ.c[1], circ.r + by);

/** Where a frame stands on the crest: its origin, and how far it is turned clockwise (its up toward the right). */
interface Frame {
  o: V;
  turn: number;
}
/** A point of a frame, on the crest. */
const out = (f: Frame, q: V): V => [f.o[0] + q[0] * Math.cos(f.turn) + q[1] * Math.sin(f.turn), f.o[1] - q[0] * Math.sin(f.turn) + q[1] * Math.cos(f.turn)];
/** A point of the crest, in a frame. */
const into = (f: Frame, p: V): V => {
  const x = p[0] - f.o[0];
  const y = p[1] - f.o[1];

  return [x * Math.cos(f.turn) - y * Math.sin(f.turn), x * Math.sin(f.turn) + y * Math.cos(f.turn)];
};
const placed = (f: Frame, circ: Circle): Circle => ({ c: out(f, circ.c), r: circ.r });

/** The joint the leaves hang from and the middle spike stands on: a grid point on the axis. */
const J: V = [0, 5];
/** The joint's own disc, and the white round it. */
const KNOT = at(J[0], J[1], 6);
const KNOT_GAP = at(J[0], J[1], 8);
/** Half the white of a midrib, and the white where one leaf lies over another. */
const RIB = 1;
const OVER = 2;

// A leaf, in its own frame: its base at (0, 0), its tip straight down. A rounded heart: the two upper edges are one circle and
// its mirror, the body a circle, and round the body five lobes, each the pointed lens of two circles of one width.
interface Leaf {
  /** The right upper edge; the left is its mirror. */
  edge: Circle;
  body: Circle;
  /** The lobes of the right side, from the shoulder down, and the tip's: each the two circles whose lens it is. */
  lobes: [Circle, Circle][];
  /** The veins stop on this circle, short of the edge. */
  field: Circle;
  /** The veins of the right half: the centres of their circles and the two widths the white lies between. They leave the midrib at about 60 degrees. */
  veins: V[];
  veinIn: number;
  veinOut: number;
}
const lens = (a: [number, number], b: [number, number], r: number): [Circle, Circle] => [at(a[0], a[1], r), at(b[0], b[1], r)];

/** The middle leaf: 86 long and 83 wide. Every centre is a grid point. */
const BIG: Leaf = {
  edge: at(-10, -44, 46),
  body: at(0, -44, 34),
  lobes: [lens([28, -40], [28, -48], 14), lens([23, -61], [17, -67], 14), lens([-4, -72], [4, -72], 14)],
  field: at(0, -42, 31),
  veins: [[-60, -118], [-60, -131], [-60, -144], [-60, -157]],
  veinIn: 119,
  veinOut: 121,
};
/** A side leaf: the same plan at four fifths. */
const SMALL: Leaf = {
  edge: at(-8, -35, 37),
  body: at(0, -35, 27),
  lobes: [lens([22, -32], [22, -38], 11), lens([18, -48], [13, -53], 11), lens([-3, -57], [3, -57], 11)],
  field: at(0, -34, 25),
  veins: [[-48, -94], [-48, -104], [-48, -114], [-48, -124]],
  veinIn: 95,
  veinOut: 97,
};

const lobesOf = (leaf: Leaf): [Circle, Circle][] => [...leaf.lobes, ...leaf.lobes.slice(0, -1).map(([a, b]) => [flip(a), flip(b)] as [Circle, Circle])];
/** Whether a point of the leaf's frame is within its outline, grown by `grow`. */
const leafOutline = (leaf: Leaf, q: V, grow = 0): boolean =>
  (q[1] > leaf.body.c[1] && within(leaf.edge, q, grow) && within(flip(leaf.edge), q, grow)) ||
  within(leaf.body, q, grow) ||
  lobesOf(leaf).some(([a, b]) => within(a, q, grow) && within(b, q, grow));
/** Whether it is ink: the outline, less the midrib and the veins. */
const leafInk = (leaf: Leaf, q: V): boolean => {
  if (!leafOutline(leaf, q) || Math.abs(q[0]) < RIB) return false;
  if (!within(leaf.field, q)) return true;
  const side = q[0] > 0 ? 1 : -1;

  return !leaf.veins.some((c) => {
    const d = vdist([c[0] * side, c[1]], q);

    return d > leaf.veinIn && d < leaf.veinOut;
  });
};
/** The circles of a leaf's outline. */
const outlineCircles = (leaf: Leaf): Circle[] => [leaf.edge, flip(leaf.edge), leaf.body, ...lobesOf(leaf).flat()];
/** Every circle and line a leaf is cut from: its outline, and for each half named its midrib's line and its veins. */
const leafOutlines = (leaf: Leaf, f: Frame, halves: (1 | -1)[]): Piece[] => [
  ...outlineCircles(leaf).map((circ) => whole(placed(f, circ))),
  ...(halves.length > 0 ? [whole(placed(f, leaf.field))] : []),
  ...halves.flatMap((side) => [
    seg(out(f, [side * RIB, 30]), out(f, [side * RIB, -130])),
    ...leaf.veins.flatMap((c) => [whole(placed(f, at(c[0] * side, c[1], leaf.veinIn))), whole(placed(f, at(c[0] * side, c[1], leaf.veinOut)))]),
  ]),
];

/** The middle leaf hangs from the joint. */
const MIDDLE: Frame = { o: J, turn: 0 };
/**
 * The left leaf: turned out by the angle of a 5-12-13 triangle (about 67 degrees from hanging), its base two steps of that
 * triangle out from the joint (24 left, 10 down: a grid point), under the middle leaf.
 */
const LEFT: Frame = { o: [J[0] - 24, J[1] - 10], turn: Math.atan2(12, 5) };

/** The left half of the middle leaf. */
const middleLeaf: Region[] = carveWhere([...leafOutlines(BIG, MIDDLE, [-1]), whole(KNOT_GAP)], (p) => p[0] < 0 && !within(KNOT_GAP, p) && leafInk(BIG, into(MIDDLE, p)));
/** The left leaf, cut by circles two wider than the middle leaf's where it passes under it. */
const sideLeaf: Region[] = carveWhere(
  [...leafOutlines(SMALL, LEFT, [1, -1]), ...outlineCircles(BIG).map((circ) => whole(placed(MIDDLE, grown(circ, OVER))))],
  (p) => leafInk(SMALL, into(LEFT, p)) && !leafOutline(BIG, into(MIDDLE, p), OVER),
);

// A floret, in its own frame: its base at (0, 0), its top straight up. A bell: two side arcs of one width from the pointed
// base, widening to a top of three scallops.
export interface Floret {
  /** The right side arc's circle; the left is its mirror. The bell is the lens between them. */
  side: Circle;
  /** The three scallops of the top. */
  scallops: Circle[];
  /** How far from the stalk's line the base of a floret beside it stands: its point lies in the stalk, the rest clear of it. */
  out: number;
}
/** The floret of 五三桐: 21 long, 24 wide. */
const BELL: Floret = { side: at(-4, 7, 11), scallops: [at(-7, 11, 5), at(0, 13, 5), at(7, 11, 5)], out: 3.5 };
/** The floret of 五七桐, where more must fit: 18 long, 20 wide. */
const BELL_SMALL: Floret = { side: at(-3, 6, 9), scallops: [at(-6, 9, 4), at(0, 11, 4), at(6, 9, 4)], out: 3 };
const floretCircles = (floret: Floret, f: Frame): Circle[] => [floret.side, flip(floret.side), ...floret.scallops].map((circ) => placed(f, circ));
const floretInk = (circles: Circle[], p: V): boolean => (within(circles[0], p) && within(circles[1], p)) || circles.slice(2).some((one) => within(one, p));

/** Half a stalk. */
const STALK = 1.5;
/** How far the florets beside a stalk lean out from upright. */
const LEAN = 55 * DEG;

/** A spike on the upright line x: the florets beside its stalk, in pairs, and the one on its top. */
interface Spike {
  x: number;
  pairs: Circle[][];
  top: Circle[];
  /** Where the stalk ends, inside the top floret. */
  head: number;
}
const spikeOf = (x: number, floret: Floret, pairs: number[], top: number): Spike => ({
  x,
  pairs: pairs.flatMap((y) => [floretCircles(floret, { o: [x - floret.out, y], turn: -LEAN }), floretCircles(floret, { o: [x + floret.out, y], turn: LEAN })]),
  top: floretCircles(floret, { o: [x, top], turn: 0 }),
  head: top + 4,
});
const spikeInk = (spike: Spike, p: V, foot: (p: V) => boolean): boolean => {
  const off = Math.abs(p[0] - spike.x);

  return floretInk(spike.top, p) || (off < STALK && p[1] < spike.head && foot(p)) || spike.pairs.some((one) => floretInk(one, p));
};
const upright = (x: number): Piece => seg([x, 99], [x, -99]);
const spikeOutlines = (spike: Spike): Piece[] => [
  ...[...spike.pairs.flat(), ...spike.top].map(whole),
  ...[-STALK, STALK].map((off) => upright(spike.x + off)),
];

export interface KiriCounts {
  /** The floret the spikes carry. */
  floret: Floret;
  /** How high the pairs of florets stand on the middle spike and on each side spike: one pair for three florets, two for five, three for seven. */
  middle: number[];
  side: number[];
  /** Where the top floret stands on each. */
  middleTop: number;
  sideTop: number;
  /** Where a side spike stands: an upright grid line. */
  sideAt: number;
}

/** 五三桐: five florets on the middle spike, three on each side spike. */
export const GOSAN: KiriCounts = { floret: BELL, middle: [14, 38], side: [20], middleTop: 60, sideTop: 43, sideAt: -58 };
/** 五七桐: seven on the middle spike, five on each side spike. */
export const GOSHICHI: KiriCounts = { floret: BELL_SMALL, middle: [13, 33, 53], side: [19, 39], middleTop: 73, sideTop: 58, sideAt: -56 };

/** Draws the paulownia. The builder's zoom sets it inside a ring. */
export const kiriBuild = (c: Builder, counts: KiriCounts): void => {
  const k = R / 100;
  const here: Placing = { k };
  const there: Placing = { k, mirror: true };
  const middle = spikeOf(0, counts.floret, counts.middle, counts.middleTop);
  const side = spikeOf(counts.sideAt, counts.floret, counts.side, counts.sideTop);
  const underLeaf = (p: V): boolean => leafOutline(SMALL, into(LEFT, p));
  const middleSpike = carveWhere([...spikeOutlines(middle), whole(KNOT)], (p) => spikeInk(middle, p, (q) => q[1] > J[1] && !within(KNOT, q)));
  const sideSpike = carveWhere([...spikeOutlines(side), ...leafOutlines(SMALL, LEFT, [])], (p) => !underLeaf(p) && spikeInk(side, p, (q) => q[1] > -30));

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
