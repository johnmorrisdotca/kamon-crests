// The swallowtail seen from the side, 揚羽蝶, struck and ruled. Its parts and their order were read from the crest book of 1892
// (伊呂波分新撰紋帳, frame 34, 上羽てふ and 丸に上羽てふ) and its proportions measured from pictures of the crest as it is drawn
// today; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up; the butterfly is laid out to 104 from the centre. A white line is 2 wide,
// the gap between a circle of r and one of r + 2.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

/** How far the butterfly reaches from the centre, in the frame's units. */
const REACH = 104;
/** A white line: the gap left between two fills. */
const W = 2;

/** A circle far outside the page, for what lies outside some outlines: it crosses nothing, so no edge is ever taken from it. */
const FAR = disc([0, 0], 4000);
const outside = (regions: Region[]): Region => [...carve(regions, []).flat(), ...FAR];
/** The part of `plus` inside the outlines `bound`, less the outlines `minus`. */
const within = (plus: Region[], bound: Region[], minus: Region[] = []): Region[] => carve(plus, [outside(bound), ...minus]);
const round = (circle: Circle, grow = 0): Region => disc(circle.c, circle.r + grow);
/** The part of a ring about `c` between two radii and two angles: its sides are ruled on the radius. */
const sector = (c: V, r0: number, r1: number, a0: number, a1: number): Region => thickArc(c, (r0 + r1) / 2, r1 - r0, a0 * DEG, a1 * DEG);
/** A white line on the radius from `c`, at angle `a`: a thin wedge between two radii. */
const ray = (c: V, r0: number, r1: number, a: number, half = 0.8): Region => sector(c, r0, r1, a - half, a + half);
/** An arc inked `w` wide, between the circles of r - w / 2 and r + w / 2. */
const band = (circle: Circle, a0: number, a1: number, w = W): Region => thickArc(circle.c, circle.r, w, a0 * DEG, a1 * DEG);
const angle = (c: V, p: V): number => Math.atan2(p[1] - c[1], p[0] - c[0]) / DEG;
/** The leaf between two arcs of radius `r` struck through two points: its two circles. */
const leaf = (p: V, q: V, r: number): [Circle, Circle] => {
  const off: V = [(q[1] - p[1]) * 9, (p[0] - q[0]) * 9];
  const mid: V = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];

  return [circleThrough(p, q, r, [mid[0] + off[0], mid[1] + off[1]]), circleThrough(p, q, r, [mid[0] - off[0], mid[1] - off[1]])];
};
const leafOf = ([a, b]: [Circle, Circle], grow = 0): Region[] => within([round(a, grow)], [round(b, grow)]);

/** The head: every vein of the forewings is ruled from its centre. */
const H: V = [-17, -70];
/** The near forewing's front edge, from its tip down to the head: a ruled line. */
const TIP: V = [-33, 96];
const FOOT: V = [-19, -45];
const EDGE_N: V = [141 / Math.hypot(141, 14), 14 / Math.hypot(141, 14)];
const edgeAt = (y: number, shift: number): V => [TIP[0] + ((FOOT[0] - TIP[0]) * (y - TIP[1])) / (FOOT[1] - TIP[1]) + shift * EDGE_N[0], y + shift * EDGE_N[1]];
/** What lies behind the front edge moved `shift` to the right: the near wing's side of it. */
const nearSide = (shift: number): Region => {
  const a = edgeAt(400, shift);
  const b = edgeAt(-400, shift);

  return [seg(a, b), seg(b, [b[0] + 900, b[1]]), seg([b[0] + 900, b[1]], [a[0] + 900, a[1]]), seg([a[0] + 900, a[1]], a)];
};
/** Its back edge, from the head out to the lowest lobe: the hindwing lies behind it. */
const TRAIL: Circle = { c: [80, -65], r: 72 };

/** The near forewing's eyed band: a crown, a shoulder and two lobes down its back edge, an eye in each of three. */
const LOBES: Circle[] = [{ c: [-20, 65], r: 32 }, { c: [-4, 62], r: 22 }, { c: [18, 49], r: 21 }, { c: [36, 17], r: 19 }];
const HULL: Circle = { c: [2, 18], r: 52 };
const EYES: V[] = [[0, 72.5], [16.5, 45.5], [36, 17.5]];
/** The band's foot: three scallops, each a pair of white lines. */
const SCALLOPS: { on: Circle; from: number; to: number }[] = [
  { on: { c: [0, 50], r: 36 }, from: 222, to: 256 },
  { on: { c: [14, 20], r: 23 }, from: 193, to: 271 },
  { on: { c: [37, -2], r: 23 }, from: 184, to: 250 },
];

/** The far forewing, behind the near one: three lobes, an eye in each of two. */
const FAR_LOBES: Circle[] = [{ c: [-82, 12], r: 14 }, { c: [-56, 10], r: 21 }, { c: [-38, 11], r: 20 }];
const FAR_HULL: Circle = { c: [-55, -5], r: 30 };
const FAR_TIP: V = [-93, 21];
const FAR_EDGE: Circle = circleThrough(FAR_TIP, [-37, -58], 190, [100, 100]);
const FAR_EYES: V[] = [[-68, 9], [-48, 14]];
const FAR_SCALLOPS: { on: Circle; from: number; to: number }[] = [
  { on: { c: [-67, -1], r: 25 }, from: 236, to: 325 },
  { on: { c: [-31, 4], r: 25 }, from: 234, to: 292 },
];

/** The curled feeler: an arc of 20, then one of 11 inside it, to a round end; its stem runs down the near wing's front edge. */
const CURL: Circle = { c: [-51, 55], r: 21 };
const CURL_IN: Circle = { c: onCircle(CURL.c, 10, 302 * DEG), r: 11 };
/** The other feeler runs along the foot of the far wing from the head to a small hook. */
const HOOK: Circle = { c: [-93, -7], r: 6 };

/** The hindwing: a round body, two lobes at its rim, the tails above, and the pocket between the tails and the near wing. */
const HIND: Circle[] = [{ c: [58, -30], r: 37 }, { c: [83, 0], r: 16 }, { c: [86, -32], r: 13 }];
const POCKET: Circle = { c: [46, 30], r: 24 };
/** Its veins: arcs of one width, their centres stepped along a ruled line. */
const VEINS: Circle[] = [0, 1, 2, 3, 4].map((j) => ({ c: [75 + 7.5 * j, -60 - 5 * j], r: 56 }));
const BEAN: Circle = { c: [58, -66], r: 10 };

/** The floor of the hindwing: below it lie the leaves of its inner edge. */
const FLOOR: Circle = { c: [33, -91], r: 42 };
const LEAVES = [leaf([6, -66], [25, -50], 14), leaf([24, -63], [43, -51], 14), leaf([41, -66], [54, -56], 10)];
/** The body's barbs: two blades up from its line and three bars down from it. */
const BLADES = [leaf([2, -76], [18, -58], 30), leaf([13, -76], [42, -56], 42)];

const EYE: V = [-17, -74.5];
const PALP: V = [-33, -73];

const brows = (at: V, a0: number, a1: number, radii: number[]): Region[] => radii.map((r) => band({ c: at, r }, a0, a1));
const scallop = (one: { on: Circle; from: number; to: number }): Region[] => [0, 4.5].map((d) => band({ c: one.on.c, r: one.on.r + d }, one.from, one.to));
const nearOnTop = [nearSide(-W)];
/** A box whose lower side is the level line at `y`. */
const above = (y: number): Region => [seg([-200, y], [200, y]), seg([200, y], [200, 300]), seg([200, 300], [-200, 300]), seg([-200, 300], [-200, y])];

// The near forewing: the fan of veins from the head and the eyed band, as one black, cut by its white lines.
const nearHome = [round(HULL), ...LOBES.map((c) => round(c)), disc(H, 60)];
const nearWhites = [
  ...EYES.flatMap((at) => [disc(at, 5), ...brows(at, 165, 272, [9.5, 14.5])]),
  ...SCALLOPS.flatMap(scallop),
  ray(H, 21, 78, 85.5, 1),
  ray(H, 21, 67, 64.5, 1),
  ...[[92, 77], [76.5, 62], [56, 52]].map(([a, r]) => ray(H, 21, r, a, 1)),
];
const near = within([sector(H, 21, 150, 30, 100), ...LOBES.map((c) => round(c))], [nearSide(0)], [outside(nearHome), round(TRAIL), ...nearWhites]);
/** The near wing and the white round it: what the hindwing lies behind. */
const nearGrown = carve([round(HULL, W), ...LOBES.map((c) => round(c, W)), disc(H, 62)], [round(TRAIL, -W)]);

// The far forewing.
const farHome = [round(FAR_HULL), ...FAR_LOBES.map((c) => round(c)), disc(H, 55)];
const farWhites = [
  ...FAR_EYES.flatMap((at) => [disc(at, 4.5), ...brows(at, 215, 325, [9, 13.5])]),
  ...FAR_SCALLOPS.flatMap(scallop),
  ray(H, 21, 59.5, 119.5, 1),
  ...[[108, 44], [131, 50]].map(([a, r]) => ray(H, 21, r, a, 1)),
];
const far = within([sector(H, 21, 150, 96, 170), ...FAR_LOBES.map((c) => round(c))], [round(FAR_EDGE)], [outside(farHome), ...nearOnTop, ...farWhites]);

// The feelers.
const curl = carve(
  [thickArc(CURL.c, CURL.r, 5.5, -8 * DEG, 302 * DEG), thickArc(CURL_IN.c, CURL_IN.r, 5.5, 302 * DEG, 480 * DEG), disc(onCircle(CURL_IN.c, CURL_IN.r, 480 * DEG), 3.6), thickSeg(edgeAt(33, -W - 2.75), edgeAt(58, -W - 2.75), 5.5)],
  nearOnTop,
);
const feelerFrom = angle(FAR_EDGE.c, [-38, -60]);
const feelerTo = angle(FAR_EDGE.c, [-89, 0]);
const feeler = carve([thickArc(FAR_EDGE.c, FAR_EDGE.r + W + 2, 4, feelerFrom * DEG, feelerTo * DEG), band(HOOK, 20, 215, 4.4), disc(onCircle(HOOK.c, HOOK.r, 215 * DEG), 2.8)], [disc(H, 21)]);

// The legs: three arcs of one width, their centres stepped along a line, their ends ruled on the radius.
const legs = [0, 1, 2].map((i) => thickArc([-80 + 5.5 * i, -44 - 7.5 * i], 15, 3.6, -95 * DEG, -24 * DEG));

// The head, its eye, the palp and the proboscis.
const head = within(
  [disc(H, 13), thickArc(H, 17.25, 3.5, -22 * DEG, 196 * DEG), disc(PALP, 5), band({ c: [-29.5, -83], r: 3.5 }, 170, 340, 2.6), disc(onCircle([-29.5, -83], 3.5, 340 * DEG), 1.6)],
  [above(-78), disc(PALP, 5), disc([-29.5, -83], 6)],
  [band({ c: EYE, r: 6.75 }, -40, 220, 1.5), disc(EYE, 3.5), disc(PALP, 3)],
);

// The body: two blades and three bars from one level line, and the leaves between the blades and the hindwing.
const blades = BLADES.flatMap((one) => leafOf(one));
const bladesGrown = BLADES.flatMap((one) => leafOf(one, W));
const below = (y: number): Region => [seg([-200, y], [200, y]), seg([200, y], [200, -300]), seg([200, -300], [-200, -300]), seg([-200, -300], [-200, y])];
const bars = within([0, 1, 2].map((i) => thickSeg([-1 + 9.5 * i, -73], [22.5 + 8 * i, -95.5 + 3 * i], 4.6)), [below(-77.5)]);
const leaves = within(LEAVES.flatMap((one) => leafOf(one)), [round(FLOOR, -W)], [...bladesGrown, disc(H, 21)]);
const bean = within([round(BEAN)], [disc([0, 0], 97)]);

// The hindwing.
const hindWhites = [
  ...VEINS.map((circle, j) => band(circle, 86 + 3.75 * j, 166 - 4.6 * j, 2.4)),
  band({ c: POCKET.c, r: POCKET.r + 1 }, -75, 40),
  band({ c: TRAIL.c, r: TRAIL.r - 1 }, 100, 116),
];
const tails: Region[] = [
  disc([51.5, 75], 6.8), thickSeg([44.5, 46], [51.5, 75], 13), disc([63, 65], 6), thickSeg([53, 48], [63, 65], 11.5),
  disc([77, 42], 6), thickSeg([77, 5], [77, 42], 11.5), disc([89, 35], 5.5), thickSeg([78, 18], [89, 35], 10.5),
];
const pocketWhites = ([[[46, 47], [44, 37]], [[57, 37], [53, 26]]] as [V, V][]).map(([p, q]) => thickSeg(p, q, W));
const hind = within(
  [...HIND.map((c) => round(c)), round(POCKET, 3), ...tails, sector(H, 23, 62, 0, 47)],
  [disc([0, 0], 97), ...tails],
  [...nearGrown, round(FLOOR), round(BEAN, W), ...hindWhites, ...pocketWhites, disc(H, 23)],
);

/** Draws the swallowtail to reach `reach` from the centre. Each wing is laid out and inked in turn, the far ones first. */
export const agehaBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / REACH };
  // A shape's last piece is its longest arc: the compass arm rests at the end of each shape, on a centre that arc gives exactly.
  const ink = (...loops: Region[]): void => {
    const last = loops[loops.length - 1];
    const span = (i: number): number => { const p = last[i]; return p.t === "A" ? p.r * Math.min(Math.abs(p.a1 - p.a0), 2.6) : 0; };
    const at = last.reduce((best, _, i) => (span(i) > span(best) ? i : best), 0);
    c.fill("butterfly", toPath([...loops.slice(0, -1), [...last.slice(at + 1), ...last.slice(0, at + 1)]], placing));
  };
  ink(...far, ...FAR_EYES.map((at) => disc(at, 2)));
  ink(...hind);
  ink(...near, ...EYES.map((at) => disc(at, 2.2)));
  ink(...curl);
  ink(...feeler);
  ink(...legs);
  ink(...leaves);
  ink(...bean);
  ink(...blades);
  ink(...bars);
  ink(...head, disc(EYE, 1.5), disc(PALP, 1.3));
};
