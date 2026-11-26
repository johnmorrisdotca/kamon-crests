// The paulownia 桐, struck with a compass and a ruler: three leaves below (the middle one hanging, the two beside it spread
// almost level and passing under it) and three upright spikes above, each a thin stalk with a bud on its top and pairs of
// buds below it. Its proportions, its veins and its spikes were measured from the crest book 伊呂波分新撰紋帳 (1892, frame 38);
// the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the layout circle at 100. A grid point is a point of whole
// numbers. A leaf is written hanging from its own base, tip down; a spike about its own upright axis. The left half is
// constructed and the right half is its mirror image.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, onPage, seg, toPath, vdist, vlen } from "../../construct/compass.ts";
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
/** Half the white of a midrib or of a vein, and the white where one leaf lies over another. */
const RIB = 1;
const OVER = 2;

// A leaf, in its own frame: its base at (0, 0), its tip straight down. The two upper edges are one circle and its mirror, the
// body a circle, and round the body scallops of one width, their centres inside the leaf.
interface Leaf {
  /** The right upper edge; the left is its mirror. */
  edge: Circle;
  body: Circle;
  /** The scallops of the right side, from the shoulder down, and the tip's last. */
  lobes: Circle[];
  /**
   * The veins of the right half, from the top down: each the white between the circle one narrower and the circle one wider.
   * A vein leaves the midrib (the first, the white round the joint), sweeps out and down beside the leaf's edge, inside the vein
   * above it, and stops short of the leaf's edge, on a circle about the base. None reaches the tip.
   */
  veins: Circle[];
  /** How far from the base each vein runs. */
  stops: number[];
}

/** The middle leaf: 86 long and 84 wide, a rounded heart. Every centre is a grid point. */
const BIG: Leaf = {
  edge: at(-10, -44, 46),
  body: at(0, -44, 34),
  lobes: [at(28, -44, 14), at(20, -64, 14), at(0, -72, 14)],
  veins: [at(-24, -57, 56), at(-23, -69, 51), at(-27, -78, 49), at(-18, -76, 31)],
  stops: [61, 69, 75, 76],
};
/** A side leaf: longer and narrower, 93 long and 62 wide. */
const SMALL: Leaf = {
  edge: at(-46, -60, 76),
  body: at(0, -62, 24),
  lobes: [at(20, -58, 11), at(16, -74, 11), at(0, -82, 11)],
  veins: [at(-21, -42, 41), at(-23, -58, 47), at(-28, -68, 48), at(-33, -72, 46)],
  stops: [45, 61, 73, 80],
};

const lobesOf = (leaf: Leaf): Circle[] => [...leaf.lobes, ...leaf.lobes.slice(0, -1).map(flip)];
/** Whether a point of the leaf's frame is within its outline, grown by `grow`. */
const leafOutline = (leaf: Leaf, q: V, grow = 0): boolean =>
  (q[1] > leaf.body.c[1] && within(leaf.edge, q, grow) && within(flip(leaf.edge), q, grow)) || within(leaf.body, q, grow) || lobesOf(leaf).some((one) => within(one, q, grow));
/** Whether it is ink: the outline, less the midrib and the veins. */
const leafInk = (leaf: Leaf, q: V): boolean => {
  if (!leafOutline(leaf, q) || Math.abs(q[0]) < RIB) return false;
  const side = q[0] > 0 ? 1 : -1;

  return !leaf.veins.some((vein, i) => vlen(q) < leaf.stops[i] && Math.abs(vdist([vein.c[0] * side, vein.c[1]], q) - vein.r) < RIB);
};
/** The circles of a leaf's outline. */
const outlineCircles = (leaf: Leaf): Circle[] => [leaf.edge, flip(leaf.edge), leaf.body, ...lobesOf(leaf)];
/** Every circle and line a leaf is cut from: its outline, and for each half named its midrib's line and its veins. */
const leafOutlines = (leaf: Leaf, f: Frame, halves: (1 | -1)[]): Piece[] => [
  ...outlineCircles(leaf).map((circ) => whole(placed(f, circ))),
  ...(halves.length > 0 ? leaf.stops.map((r) => whole(placed(f, at(0, 0, r)))) : []),
  ...halves.flatMap((side) => [
    seg(out(f, [side * RIB, 30]), out(f, [side * RIB, -130])),
    ...leaf.veins.flatMap((vein) => [whole(placed(f, at(vein.c[0] * side, vein.c[1], vein.r - RIB))), whole(placed(f, at(vein.c[0] * side, vein.c[1], vein.r + RIB)))]),
  ]),
];

/** The middle leaf hangs from the joint. */
const MIDDLE: Frame = { o: J, turn: 0 };
/**
 * The left leaf hangs from the joint too, turned out until its midrib falls one for every two it runs (about 63 degrees from
 * hanging), and passes under the middle leaf.
 */
const LEFT: Frame = { o: J, turn: Math.atan2(2, 1) };

/** The left half of the middle leaf. */
const middleLeaf: Region[] = carveWhere([...leafOutlines(BIG, MIDDLE, [-1]), whole(KNOT_GAP)], (p) => p[0] < 0 && !within(KNOT_GAP, p) && leafInk(BIG, into(MIDDLE, p)));
/** The left leaf, cut by circles two wider than the middle leaf's where it passes under it. */
const sideLeaf: Region[] = carveWhere(
  [...leafOutlines(SMALL, LEFT, [1, -1]), whole(KNOT_GAP), ...outlineCircles(BIG).map((circ) => whole(placed(MIDDLE, grown(circ, OVER))))],
  (p) => !within(KNOT_GAP, p) && leafInk(SMALL, into(LEFT, p)) && !leafOutline(BIG, into(MIDDLE, p), OVER),
);

// A spike of florets, about its own upright axis: a thin upright stalk that rises from behind the leaves, a bud on its top and
// pairs of buds below it, each on a short side stem and clear of its neighbours. A bud is three discs, a round head and two
// round shoulders. A side stem is the band between two circles of one centre, two apart: it leaves the stalk outwards and
// turns up into the bud, between the bud's shoulders.
/** Half the stalk, and half a side stem. */
const STEM = 1.5;
const TWIG = 1;
interface Floret {
  /** The bud left of the stalk, from the spike's own axis: its head and its two shoulders. The right one is its mirror. */
  bud: Circle[];
  /** The circle its side stem is an arc of, the height at which that leaves the stalk, and how far from there it runs (it ends inside the bud). */
  stem: Circle;
  from: number;
  reach: number;
}
export interface Spike {
  /** The upright grid line it stands on, and where its stalk starts, out of sight. */
  x: number;
  foot: number;
  /** The bud on its top: its head, on the axis, and its left shoulder (the right is its mirror). */
  top: Circle[];
  /** The buds beside the stalk, from the lowest up. */
  florets: Floret[];
}
/** A pair's left bud, by the size of its stem's circle, leaving the stalk at the height y. Every centre is a grid point. */
const floret = (y: number, size: 16 | 20 | 24): Floret =>
  size === 16
    ? { bud: [at(-14, y + 16, 5), at(-8, y + 13, 4), at(-15, y + 9, 4)], stem: at(4, y + 15, 16), from: y, reach: 17 }
    : size === 20
      ? { bud: [at(-17, y + 20, 6), at(-10, y + 16, 5), at(-19, y + 12, 5)], stem: at(5, y + 19, 20), from: y, reach: 21 }
      : { bud: [at(-19, y + 22, 6), at(-12, y + 18, 5), at(-21, y + 14, 5)], stem: at(6, y + 23, 24), from: y, reach: 25 };
/** Whether a point is ink, with the point brought to the left of the spike's axis. */
const spikeInk = (spike: Spike, p: V): boolean => {
  const q: V = [-Math.abs(p[0] - spike.x), p[1]];
  if (spike.top.some((disc) => within(disc, q))) return true;
  if (q[0] > -STEM && q[1] >= spike.foot && q[1] <= spike.top[0].c[1]) return true;

  return spike.florets.some((one) => one.bud.some((disc) => within(disc, q)) || (vdist([0, one.from], q) < one.reach && Math.abs(vdist(one.stem.c, q) - one.stem.r) < TWIG));
};
/** Every circle and line a spike is cut from. */
const spikeOutlines = (spike: Spike): Piece[] =>
  [-1, 1].flatMap((side) => {
    const put = (circ: Circle, grow = 0): Piece => whole(at(spike.x + side * circ.c[0], circ.c[1], circ.r + grow));

    return [
      ...(side === -1 ? spike.top : spike.top.slice(1)).map((disc) => put(disc)),
      ...spike.florets.flatMap((one) => [...one.bud.map((disc) => put(disc)), put(one.stem, -TWIG), put(one.stem, TWIG)]),
      seg([spike.x + side * STEM, 99], [spike.x + side * STEM, -99]),
    ];
  });

export interface KiriCounts {
  middle: Spike;
  side: Spike;
}

/** Where a side spike stands: an upright grid line. */
const SIDE_AT = -56;
/** 五三桐: five buds on the middle spike, three on each side spike. */
export const GOSAN: KiriCounts = {
  middle: { x: 0, foot: J[1], top: [at(0, 72, 8), at(-6, 65, 7)], florets: [floret(13, 24), floret(36, 20)] },
  side: { x: SIDE_AT, foot: 0, top: [at(0, 50, 7), at(-5, 44, 6)], florets: [floret(15, 20)] },
};
/** 五七桐: seven on the middle spike, five on each side spike. */
export const GOSHICHI: KiriCounts = {
  middle: { x: 0, foot: J[1], top: [at(0, 77, 6), at(-5, 71, 5)], florets: [floret(13, 16), floret(30, 16), floret(47, 16)] },
  side: { x: SIDE_AT, foot: 0, top: [at(0, 57, 6), at(-5, 51, 5)], florets: [floret(10, 16), floret(27, 16)] },
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
