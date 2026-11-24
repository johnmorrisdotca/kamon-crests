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
// its mirror, the body a circle, and round the body five scallops of one width, their centres inside the leaf.
interface Leaf {
  /** The right upper edge; the left is its mirror. */
  edge: Circle;
  body: Circle;
  /** The scallops of the right side, from the shoulder down, and the tip's last. */
  lobes: Circle[];
  /** The veins stop on this circle, short of the edge. */
  field: Circle;
  /** The veins of the right half: the centres of their circles and the two widths the white lies between. Each leaves the midrib at about 45 degrees and bows toward the tip. */
  veins: V[];
  veinIn: number;
  veinOut: number;
}

/** The middle leaf: 86 long and 84 wide. Every centre is a grid point; a vein is the white between the edge's width and the width two wider. */
const BIG: Leaf = {
  edge: at(-10, -44, 46),
  body: at(0, -44, 34),
  lobes: [at(28, -44, 14), at(20, -64, 14), at(0, -72, 14)],
  field: at(0, -42, 27),
  veins: [[33, 20], [33, 7], [33, -6], [33, -19]],
  veinIn: 46,
  veinOut: 48,
};
/** A side leaf: the same plan at four fifths. */
const SMALL: Leaf = {
  edge: at(-8, -35, 37),
  body: at(0, -35, 27),
  lobes: [at(22, -35, 11), at(16, -51, 11), at(0, -57, 11)],
  field: at(0, -34, 25),
  veins: [[27, 16], [27, 6], [27, -4], [27, -14]],
  veinIn: 37,
  veinOut: 39,
};

const lobesOf = (leaf: Leaf): Circle[] => [...leaf.lobes, ...leaf.lobes.slice(0, -1).map(flip)];
/** Whether a point of the leaf's frame is within its outline, grown by `grow`. */
const leafOutline = (leaf: Leaf, q: V, grow = 0): boolean =>
  (q[1] > leaf.body.c[1] && within(leaf.edge, q, grow) && within(flip(leaf.edge), q, grow)) || within(leaf.body, q, grow) || lobesOf(leaf).some((one) => within(one, q, grow));
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
const outlineCircles = (leaf: Leaf): Circle[] => [leaf.edge, flip(leaf.edge), leaf.body, ...lobesOf(leaf)];
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

// A floret, in its own frame: its base at (0, 0), its top straight up. A pointed bell of three petals fanned from the base:
// each petal the pointed lens of two circles of one width, on a 6-8-10 triangle, 16 long and 8 wide.
const PETAL = at(-6, 8, 10);
/** How far the two outer petals are fanned from the middle one. */
const FAN = 35 * DEG;
/** A floret's three petals on the crest, each the two circles whose lens it is. */
const floretOf = (o: V, turn: number): [Circle, Circle][] => [-FAN, 0, FAN].map((fan) => [placed({ o, turn: turn + fan }, PETAL), placed({ o, turn: turn + fan }, flip(PETAL))] as [Circle, Circle]);
const floretInk = (petals: [Circle, Circle][], p: V): boolean => petals.some(([a, b]) => within(a, p) && within(b, p));

/** Half a stalk, and how far from its line the base of a floret beside it stands: its point touches the stalk. */
const STALK = 1.5;
const BESIDE = 2;

/** A spike on the upright line x: the florets beside its stalk, in pairs leaning out, and the one on its top. No floret touches another. */
interface Spike {
  x: number;
  florets: [Circle, Circle][][];
  /** Where the stalk ends, inside the top floret. */
  head: number;
}
const spikeOf = (x: number, lean: number, pairs: number[], top: number): Spike => ({
  x,
  florets: [...pairs.flatMap((y) => [floretOf([x - BESIDE, y], -lean), floretOf([x + BESIDE, y], lean)]), floretOf([x, top], 0)],
  head: top + 4,
});
const spikeInk = (spike: Spike, p: V, foot: (p: V) => boolean): boolean => spike.florets.some((one) => floretInk(one, p)) || (Math.abs(p[0] - spike.x) < STALK && p[1] < spike.head && foot(p));
const spikeOutlines = (spike: Spike): Piece[] => [...spike.florets.flat(2).map(whole), ...[-STALK, STALK].map((off) => seg([spike.x + off, 99], [spike.x + off, -99]))];

export interface KiriCounts {
  /** How high the pairs of florets stand on the middle spike and on each side spike: one pair for three florets, two for five, three for seven. */
  middle: number[];
  side: number[];
  /** Where the top floret stands on each. */
  middleTop: number;
  sideTop: number;
}

/** Where a side spike stands: an upright grid line. */
const SIDE_AT = -56;
/** How far the florets beside the middle stalk lean out from upright, and those beside a side stalk. */
const LEAN = 60 * DEG;
const SIDE_LEAN = 40 * DEG;
/** 五三桐: five florets on the middle spike, three on each side spike. */
export const GOSAN: KiriCounts = { middle: [14, 34], side: [18], middleTop: 54, sideTop: 38 };
/** 五七桐: seven on the middle spike, five on each side spike. */
export const GOSHICHI: KiriCounts = { middle: [14, 34, 54], side: [18, 38], middleTop: 74, sideTop: 58 };

/** Draws the paulownia. The builder's zoom sets it inside a ring. */
export const kiriBuild = (c: Builder, counts: KiriCounts): void => {
  const k = R / 100;
  const here: Placing = { k };
  const there: Placing = { k, mirror: true };
  const middle = spikeOf(0, LEAN, counts.middle, counts.middleTop);
  const side = spikeOf(SIDE_AT, SIDE_LEAN, counts.side, counts.sideTop);
  const underLeaf = (p: V): boolean => leafOutline(SMALL, into(LEFT, p));
  const middleSpike = carveWhere([...spikeOutlines(middle), whole(KNOT)], (p) => !within(KNOT, p) && spikeInk(middle, p, (q) => q[1] > J[1]));
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
