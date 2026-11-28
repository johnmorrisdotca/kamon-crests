// 琴柱に爪, as the 1892 crest book draws ことぢにつめ (frame 33, right page, fourth row, fourth column from the right): a lens-shaped
// frame ending at each side in a pair of rolled volutes, two bowed bands crossing above and below it and passing behind it, and
// three plectra a third of a turn apart inside it. The numbers are the book's pixels from the frame's middle, y up. Every curve is a
// compass arc, struck through three measured points or about a measured centre; the straight edges are ruled.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, disc, lineLine, moved, onPage, rotated, seg, thickArc, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
/** The arc from `a` through `b` to `c`. */
const arc3 = (a: V, b: V, c: V): Piece => {
  const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  return arcTo(through(a, b, c), a, c, cross > 0);
};
/** Where the line from `p` touches the circle, on the side `up` (1 above, -1 below). */
const tangent = (p: V, circle: Circle, up: 1 | -1): V => {
  const d = Math.hypot(p[0] - circle.c[0], p[1] - circle.c[1]);
  const base = Math.atan2(p[1] - circle.c[1], p[0] - circle.c[0]);
  const spread = Math.acos(circle.r / d);
  const [a, b] = [base + spread, base - spread].map((t): V => [circle.c[0] + circle.r * Math.cos(t), circle.c[1] + circle.r * Math.sin(t)]);
  return (a[1] - b[1]) * up > 0 ? a : b;
};

/** The volutes at each end: circles of 26 whose centres stand 132.5 out, 24.6 above and 26 below the middle. */
const VOLUTE = 26;
const VOLUTE_OUT = 132.5;
const VOLUTE_UP = 24.6;
const VOLUTE_DOWN = -26;
/** The frame's outer corners and the middles of its outer and inner edges; the hole's tips. */
const TOP: V = [90, 51.25];
const BOTTOM: V = [90, -34];
const HOLE_TIP: V = [108, 2];
const HOLE_TOP: V = [75, 37.25];
const HOLE_BOTTOM: V = [75, -26];

const frameOutline = (): Region => {
  const volutes = (side: 1 | -1): [Circle, Circle] => [
    { c: [side * VOLUTE_OUT, VOLUTE_UP], r: VOLUTE },
    { c: [side * VOLUTE_OUT, VOLUTE_DOWN], r: VOLUTE },
  ];
  const dip = (side: 1 | -1): V => {
    const [upper, lower] = volutes(side);
    const half = (upper.c[1] - lower.c[1]) / 2;
    return [side * (VOLUTE_OUT + Math.sqrt(VOLUTE ** 2 - half ** 2)), (upper.c[1] + lower.c[1]) / 2];
  };
  const end = (side: 1 | -1): Piece[] => {
    const [upper, lower] = volutes(side);
    const top: V = [side * TOP[0], TOP[1]];
    const bottom: V = [side * BOTTOM[0], BOTTOM[1]];
    const t1 = tangent(top, upper, 1);
    const t2 = tangent(bottom, lower, -1);
    // Clockwise round the whole frame: down the right end, up the left one.
    return side === 1
      ? [seg(top, t1), arcTo(upper, t1, dip(1), false), arcTo(lower, dip(1), t2, false), seg(t2, bottom)]
      : [seg(bottom, t2), arcTo(lower, t2, dip(-1), false), arcTo(upper, dip(-1), t1, false), seg(t1, top)];
  };
  return [
    arc3([-TOP[0], TOP[1]], [0, 58], TOP),
    ...end(1),
    arc3(BOTTOM, [0, -56], [-BOTTOM[0], BOTTOM[1]]),
    ...end(-1),
  ];
};
const holeOutline = (): Region => [
  seg([-HOLE_TIP[0], HOLE_TIP[1]], [-HOLE_TOP[0], HOLE_TOP[1]]),
  arc3([-HOLE_TOP[0], HOLE_TOP[1]], [0, 43], HOLE_TOP),
  seg(HOLE_TOP, HOLE_TIP),
  seg(HOLE_TIP, HOLE_BOTTOM),
  arc3(HOLE_BOTTOM, [0, -37], [-HOLE_BOTTOM[0], HOLE_BOTTOM[1]]),
  seg([-HOLE_BOTTOM[0], HOLE_BOTTOM[1]], [-HOLE_TIP[0], HOLE_TIP[1]]),
];
/**
 * The white curl in each volute: an arc of 0.55 of its radius, 3 wide, open for 100 degrees towards the hole's tip, round an eye of
 * 2.5.
 */
const curls = (): Region[] =>
  [-1, 1].flatMap((side) => [VOLUTE_UP, VOLUTE_DOWN].flatMap((y): Region[] => {
    const centre: V = [side * VOLUTE_OUT, y];
    const open = Math.atan2(HOLE_TIP[1] - y, side * HOLE_TIP[0] - centre[0]);
    const start = Math.atan2(Math.sin(open + 50 * DEG), Math.cos(open + 50 * DEG));
    return [thickArc(centre, VOLUTE * 0.55, 3, start, start + 130 * DEG), thickArc(centre, VOLUTE * 0.55, 3, start + 130 * DEG, start + 260 * DEG), disc(centre, 2.5)];
  }));

/**
 * The bands: arcs of 153.4 about centres 135 to either side of the middle and 3.55 below it, 17 wide, so that they cross on the
 * upright 69.3 above and 76.4 below the middle; their ends are cut level at 119 above and 122 below. Each is drawn in two pieces,
 * above and below the frame, which hides its middle.
 */
const BAND_R = Math.hypot(135, 72.85);
const BAND_W = 17;
const bandPieces = (side: 1 | -1): [Region, Region] => {
  const c: V = [side * -135, -3.55];
  const at = (y: number): number => {
    const a = Math.asin((y - c[1]) / BAND_R);
    return side === 1 ? a : Math.PI - a;
  };
  const upper = side === 1 ? thickArc(c, BAND_R, BAND_W, at(20), at(135)) : thickArc(c, BAND_R, BAND_W, at(135), at(20));
  const lower = side === 1 ? thickArc(c, BAND_R, BAND_W, at(-140), at(-20)) : thickArc(c, BAND_R, BAND_W, at(-20), at(-140));
  return [upper, lower];
};
const level = (y: number, up: 1 | -1): Region => {
  const far = 400;
  const [a, b] = up === 1 ? [y, y + far] : [y - far, y];
  return [seg([-far, a], [far, a]), seg([far, a], [far, b]), seg([far, b], [-far, b]), seg([-far, b], [-far, a])];
};

/** A plectrum, its bar's middle at the origin and its knob up: a bar 31.7 by 10 with round ends, and a knob 13 wide rising 14 above it, a white of 1.5 between. */
const plectrum = (): Region[] => {
  const bar: Region = [seg([-10.85, 5], [10.85, 5]), arcTo({ c: [10.85, 0], r: 5 }, [10.85, 5], [10.85, -5], false), seg([10.85, -5], [-10.85, -5]), arcTo({ c: [-10.85, 0], r: 5 }, [-10.85, -5], [-10.85, 5], false)];
  const knob: Region = [seg([-6.5, 6.5], [-6.5, 14]), arcTo({ c: [0, 14], r: 6.5 }, [-6.5, 14], [6.5, 14], false), seg([6.5, 14], [6.5, 6.5]), seg([6.5, 6.5], [-6.5, 6.5])];
  return [bar, knob];
};
/** The plectra turn about a point 3.5 above the frame's middle, their bars' middles 16.8 from it. */
const PLECTRA: V = [0, 3.5];
const PLECTRUM_OUT = 16.8;

const PARTING = 2.5;
const screened = (region: Region): Region[] => [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => region.map((p) => moved(p, [PARTING * Math.cos(deg * DEG), PARTING * Math.sin(deg * DEG)])));
const REACH = Math.hypot(VOLUTE_OUT, VOLUTE_UP) + VOLUTE;

export const kotojiNiTsumeBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / REACH };
  const outer = frameOutline();
  const [pUp, pDown] = bandPieces(1);
  const [qUp, qDown] = bandPieces(-1);
  const behind = [...screened(outer), level(119, 1), level(-122, -1)];
  c.guideCircle(C0, reach);
  c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
  for (const side of [-1, 1]) {
    for (const y of [VOLUTE_UP, VOLUTE_DOWN]) c.guideCircle(onPage([side * VOLUTE_OUT, y], placing), VOLUTE * placing.k);
    c.guideCircle(onPage([side * -135, -3.55], placing), BAND_R * placing.k);
  }
  // The band from the upper left lies over the other above the frame; below it, the other lies over it.
  c.group(() => c.fill("koto-bridge", toPath(carve([pUp, pDown], [...behind, ...screened(qDown)]), placing)));
  c.group(() => c.fill("koto-bridge", toPath(carve([qUp, qDown], [...behind, ...screened(pUp)]), placing)));
  c.group(() => c.fill("koto-bridge", toPath(carve([outer], [holeOutline(), ...curls()]), placing)));
  for (const turn of [0, 120, 240]) {
    const pieces = plectrum().map((region) => region.map((p) => moved(rotated(moved(p, [0, PLECTRUM_OUT]), -turn * DEG), PLECTRA)));
    c.group(() => c.fill("koto-plectrum", toPath(pieces, placing)));
  }
};
