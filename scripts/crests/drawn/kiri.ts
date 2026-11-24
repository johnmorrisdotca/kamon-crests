// The paulownia 桐, struck with a compass and a ruler: three leaves below (the middle one hanging, the two beside it spread
// almost level and passing under it) and three upright spikes of florets above, each a packed, jagged cone. Its proportions
// were measured from the crest book 伊呂波分新撰紋帳 (1892) and held beside a page of paulownia crests; the drawing is this
// construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the layout circle at 100. A grid point is a point of whole
// numbers. A leaf is written hanging from its own base, tip down; a spike about its own upright axis. The left half is
// constructed and the right half is its mirror image.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
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

// A spike of florets, about its own upright axis: a packed, jagged cone with no stalk showing. A floret is a disc beside the
// stem, its outer edge bitten twice into three teeth. Over its top and down its inner side runs a white hook three wide, the
// white between the floret's own circle and one three wider, which then runs straight down beside the stem and stops on a
// circle struck on the axis (its node), so that the floret hangs from the stem by its foot alone. Each floret lies over the
// one above it: the floret above is cut by the hook's outer circle. On the top of the stem is the crown, a disc bitten into points.
/** Half the stem, and the white of a hook. */
const STEM = 2;
const HOOK = 3;
interface Tier {
  /** The floret left of the stem: its centre and its width. The right one is its mirror. */
  at: V;
  r: number;
  /** The circle on the axis its hook stops on. */
  node: Circle;
  /** The centres of its two bites, from its own centre, and their width. */
  bites: V[];
  bite: number;
}
export interface Spike {
  /** The upright grid line it stands on, and where its stem starts, out of sight. */
  x: number;
  foot: number;
  /** The florets beside the stem, from the lowest up. */
  tiers: Tier[];
  /** The crown, and the centres of the bites of its left half from its own centre (the right half is its mirror). */
  crown: Circle;
  bites: V[];
  bite: number;
  /** How far from the axis the ink between one floret and the next reaches, from below the lowest floret to the crown: a number for each gap, never an edge of the drawing. */
  webs: number[];
}
/** Whether a point is ink, with the point brought to the left of the spike's axis. */
const spikeInk = (spike: Spike, p: V): boolean => {
  const q: V = [-Math.abs(p[0] - spike.x), p[1]];
  for (const tier of spike.tiers) {
    const rel: V = [q[0] - tier.at[0], q[1] - tier.at[1]];
    const d = Math.hypot(rel[0], rel[1]);
    const open = !within(tier.node, q);
    if (open && rel[0] > tier.r && rel[0] < tier.r + HOOK && rel[1] < 0 && q[1] > tier.node.c[1]) return false;
    if (d >= tier.r + HOOK) continue;
    if (d < tier.r) return !tier.bites.some((bite) => vdist(rel, bite) < tier.bite);
    if (rel[0] <= 0 || (rel[1] >= 0 && open)) return false;
  }
  if (within(spike.crown, q)) return !spike.bites.some((bite) => vdist(q, [bite[0], spike.crown.c[1] + bite[1]]) < spike.bite);
  if (spike.tiers.some((tier) => within(tier.node, q))) return true;
  if (q[1] >= spike.crown.c[1] || q[1] < spike.foot) return false;
  if (q[0] > -STEM) return true;
  const floor = [spike.foot, ...spike.tiers.map((tier) => tier.at[1])];

  return spike.webs.some((reach, i) => q[0] > -reach && q[1] >= floor[i] && q[1] < (floor[i + 1] ?? spike.crown.c[1]));
};
/** Every circle and line a spike is cut from. */
const spikeOutlines = (spike: Spike): Piece[] => [
  ...[-1, 1].flatMap((side) => {
    const put = (c: V, r: number): Piece => whole(at(spike.x + side * c[0], c[1], r));

    return [
      ...spike.tiers.flatMap((tier) => [put(tier.at, tier.r), put(tier.at, tier.r + HOOK), ...tier.bites.map((bite) => put([tier.at[0] + bite[0], tier.at[1] + bite[1]], tier.bite))]),
      ...spike.bites.map((bite) => put([bite[0], spike.crown.c[1] + bite[1]], spike.bite)),
      ...[STEM, STEM + HOOK].map((off) => seg([spike.x + side * off, 99], [spike.x + side * off, -99])),
    ];
  }),
  ...spike.tiers.map((tier) => whole(at(spike.x, tier.node.c[1], tier.node.r))),
  whole(at(spike.x, spike.crown.c[1], spike.crown.r)),
];

export interface KiriCounts {
  middle: Spike;
  side: Spike;
}

/** Where a side spike stands: an upright grid line. */
const SIDE_AT = -56;
/** The two bites of a floret, by its width: each a grid point just outside its edge, the two a little over a bite's width apart. A wide floret is bitten wider. */
const BITES: Record<number, V[]> = { 7: [[-4, 7], [-8, 2]], 8: [[-5, 7], [-9, 2]], 9: [[-6, 8], [-10, 3]], 10: [[-6, 9], [-11, 2]], 11: [[-7, 9], [-12, 2]] };
const tier = (y: number, r: number, node: Circle): Tier => ({ at: [-(STEM + HOOK + r), y], r, node, bites: BITES[r], bite: r < 10 ? 3 : 4 });
/** The lowest florets of the middle spike: their hooks stop on a circle about the joint. */
const LOW = tier(17, 11, at(0, J[1], 12));
/** 五三桐: five florets on the middle spike, three on each side spike. */
export const GOSAN: KiriCounts = {
  middle: { x: 0, foot: J[1], tiers: [LOW, tier(40, 10, at(0, 26, 6))], crown: at(0, 62, 14), bites: [[-5, 14], [-12, 8]], bite: 4, webs: [7, 14, 8] },
  side: { x: SIDE_AT, foot: 0, tiers: [tier(19, 10, at(0, 13, 6))], crown: at(0, 39, 13), bites: [[-5, 13], [-12, 6]], bite: 4, webs: [8, 8] },
};
/** 五七桐: seven on the middle spike, five on each side spike. */
export const GOSHICHI: KiriCounts = {
  middle: { x: 0, foot: J[1], tiers: [LOW, tier(36, 9, at(0, 26, 6)), tier(53, 8, at(0, 44, 6))], crown: at(0, 66, 10), bites: [[-4, 10]], bite: 3, webs: [7, 12, 12, 6] },
  side: { x: SIDE_AT, foot: 0, tiers: [tier(18, 8, at(0, 13, 6)), tier(34, 8, at(0, 26, 6))], crown: at(0, 44, 8), bites: [[-4, 8]], bite: 3, webs: [8, 10, 6] },
};

/** Draws the paulownia. The builder's zoom sets it inside a ring. */
export const kiriBuild = (c: Builder, counts: KiriCounts): void => {
  const k = R / 100;
  const here: Placing = { k };
  const there: Placing = { k, mirror: true };
  const { middle, side } = counts;
  const underLeaf = (p: V): boolean => leafOutline(SMALL, into(LEFT, p), OVER);
  const sideLeafEdge = outlineCircles(SMALL).map((circ) => whole(placed(LEFT, grown(circ, OVER))));
  const bigLeafEdge = (p: V): boolean => leafOutline(BIG, into(MIDDLE, p), OVER);
  const middleSpike = carveWhere(
    [...spikeOutlines(middle), whole(KNOT_GAP), ...outlineCircles(BIG).map((circ) => whole(placed(MIDDLE, grown(circ, OVER))))],
    (p) => !within(KNOT_GAP, p) && !bigLeafEdge(p) && spikeInk(middle, p),
  );
  const sideSpike = carveWhere([...spikeOutlines(side), ...sideLeafEdge], (p) => !underLeaf(p) && spikeInk(side, p));

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
