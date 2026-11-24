// The swallowtail seen from the side, 揚羽蝶, struck and ruled. Its parts and their order were read from the crest book of 1892
// (伊呂波分新撰紋帳, frame 34, 上羽てふ and 丸に上羽てふ) and its proportions measured from pictures of the crest as it is drawn
// today; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, in the page's own units when the crest has no ring: the
// butterfly reaches 96 from the centre. Every centre but two is a grid point and every compass width a whole number; a white
// line is 2 wide, the gap between a circle of r and one of r + 2.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

/** How far the butterfly reaches from the centre, in the frame's units. */
const REACH = 96;
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
/** An arc inked 2 wide, between the circles of r - 1 and r + 1. */
const band = (circle: Circle, a0: number, a1: number): Region => thickArc(circle.c, circle.r, 2, a0 * DEG, a1 * DEG);

/** The head: every vein of the wings is ruled from its centre. */
const HEAD: Circle = { c: [-19, -67], r: 10 };
const H = HEAD.c;
/** The near forewing's front edge, from its tip down to the head: one long arc. */
const TIP: V = [-25, 92];
const EDGE: Circle = circleThrough(TIP, [-20, -53], 375, [350, 20]);

/** The near forewing's eyed band: a crown, three lobes down its back edge with an eye in each, and two scallops along its foot. */
const CROWN: Circle = { c: [-9, 64], r: 29 };
const LOBES: Circle[] = [{ c: [1, 70], r: 20 }, { c: [18, 46], r: 20 }, { c: [36, 18], r: 20 }];
const SCALLOPS: Circle[] = [{ c: [-12, 40], r: 20 }, { c: [9, 26], r: 20 }];
const NEAR = [CROWN, ...LOBES, ...SCALLOPS];
const EYES: V[] = [[4, 73], [20, 48], [39, 20]];

/** The far forewing, behind the near one: two lobes, an eye in each, and its point, the lens between two arcs of 30. */
const FAR_LOBES: Circle[] = [{ c: [-62, 6], r: 20 }, { c: [-42, 12], r: 20 }];
const FAR_POINT: [V, V] = [[-60, 10], [-88, 18]];
const FAR_EYES: V[] = [[-63, 8], [-43, 14]];

/** The hindwing: a round fan behind the forewing, four lobes at its rim and the two pointed tails above them, each the lens between two arcs of 20. */
const FAN: Circle = { c: [42, -14], r: 47 };
const RIM: Circle[] = [{ c: [67, 35], r: 15 }, { c: [75, 5], r: 15 }, { c: [72, -22], r: 14 }, { c: [66, -42], r: 13 }];
const TAILS: [V, V][] = [[[54, 42], [50, 78]], [[58, 34], [66, 64]]];
/** The lens between two arcs of radius `r` struck through two points. */
const lens = ([p, q]: [V, V], r: number): Region[] => {
  const mid: V = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const off: V = [(q[1] - p[1]) * 9, (p[0] - q[0]) * 9];

  return within([round(circleThrough(p, q, r, [mid[0] + off[0], mid[1] + off[1]]))], [round(circleThrough(p, q, r, [mid[0] - off[0], mid[1] - off[1]]))]);
};

/** The curled feeler: an arc of 16, then one of half that, to a round end. */
const CURL: Circle = { c: [-41, 53], r: 16 };
const CURL_IN: Circle = { c: [-49, 53], r: 8 };
/** The other feeler runs along the foot of the far wing from the head to a small hook. */
const HOOK: Circle = { c: [-83, 2], r: 6 };
const hookFoot = onCircle(HOOK.c, HOOK.r, 230 * DEG);
const FEELER_END: V = [-32, -62];
const FEELER: Circle = circleThrough(hookFoot, FEELER_END, 129, [45, 70]);
const angle = (c: V, p: V): number => Math.atan2(p[1] - c[1], p[0] - c[0]) / DEG;

/** The body: the lens between two arcs of 53, banded about the head. */
const BODY_ENDS: [V, V] = [[-9, -70], [44, -84]];
const BODY: Circle[] = [circleThrough(...BODY_ENDS, 53, [0, -140]), circleThrough(...BODY_ENDS, 53, [35, 0])];
/** The legs: three arcs about one grid point. */
const LEGS: V = [-94, -118];
const PROBOSCIS: Circle = { c: [-27, -81], r: 5 };
const EYE: V = [-22, -70];
const PALP: V = [-33, -71];

const brows = (at: V, a0: number, a1: number, radii: number[]): Region[] => radii.map((r) => band({ c: at, r }, a0, a1));
const nearOnTop = [disc(EDGE.c, EDGE.r + W)];

const nearBand = within(NEAR.map((c) => round(c)), [round(EDGE)], EYES.flatMap((at) => [disc(at, 5), ...brows(at, 165, 285, [9, 13])]));
const nearFan = within([sector(H, 14, 96, 49, 101)], [round(EDGE)], [...NEAR.map((c) => round(c, W)), ...[57, 65, 73, 81, 89, 95.5].map((a) => ray(H, 28, 96, a))]);
const hindCore = within([sector(H, 16, 152, 8, 47.5)], [round(FAN), ...RIM.map((c) => round(c))]);
const hindReach = [80, 89, 98, 101, 101, 98, 94];
const hind = carve(
  [...hindCore, round(RIM[0]), ...TAILS.flatMap((ends) => lens(ends, 20))],
  [...LOBES.map((c) => round(c, W)), ...[13, 18, 23, 28, 33, 38, 43].map((a, i) => ray(H, 35, hindReach[i], a, 0.6))],
);
const farBand = carve([...FAR_LOBES.map((c) => round(c)), ...lens(FAR_POINT, 30)], [...nearOnTop, ...FAR_EYES.flatMap((at) => [disc(at, 4), ...brows(at, 205, 335, [8, 12])])]);
const farFan = carve(
  [sector(H, 16, 82, 101, 150)],
  [...nearOnTop, ...FAR_LOBES.map((c) => round(c, W)), outside([disc(FEELER.c, FEELER.r - 1 - W)]), ...[108, 116, 124, 132].map((a) => ray(H, 30, 82, a, 0.9))],
);
const curl = carve([thickArc(CURL.c, CURL.r, 4, -40 * DEG, 180 * DEG), thickArc(CURL_IN.c, CURL_IN.r, 4, 180 * DEG, 360 * DEG), disc(CURL.c, 3)], nearOnTop);
const feeler = carve([band(FEELER, angle(FEELER.c, hookFoot), angle(FEELER.c, FEELER_END)), band(HOOK, 230, 10), disc(hookFoot, 1.5)], [round(HEAD, W)]);
const head = carve([round(HEAD), band(PROBOSCIS, 60, 330)], [band({ c: H, r: 7 }, 30, 190), disc(EYE, 3)]);
const palp = carve([disc(PALP, 4)], [disc(PALP, 2)]);
const body = within([round(BODY[0])], [round(BODY[1])], [round(HEAD, W), ...[26, 35, 44, 54].map((r) => band({ c: H, r }, -45, 5))]);
const legs = [66, 70, 74].map((r) => band({ c: LEGS, r }, 52, 70));

/** Draws the swallowtail to reach `reach` from the centre. Each wing is laid out and inked in turn, the far ones first. */
export const agehaBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / REACH };
  const ink = (...loops: Region[]): void => c.fill("butterfly", toPath(loops, placing));
  ink(...farBand, ...FAR_EYES.map((at) => disc(at, 2)));
  ink(...farFan);
  ink(...hind);
  ink(...nearBand, ...EYES.map((at) => disc(at, 2)));
  ink(...nearFan);
  ink(...curl);
  ink(...feeler);
  ink(...body);
  ink(...legs);
  ink(...head, disc(EYE, 1), ...palp);
};
