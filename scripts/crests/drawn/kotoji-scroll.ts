// Koto bridges with rolled heads, as the 1892 crest book draws them on frame 33 (left page, third row, first column from the right,
// 三ッたてことぢ): a head of two volutes, a waisted neck, a shoulder ruled out to each side and two legs ruled down to cut feet. The
// numbers are the book's pixels, y up from the middle bridge's feet. Every curve is a compass arc struck through three measured
// points, the legs and shoulders are ruled.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, lineLine, mirrored, moved, onCircle, onPage, reversedRun, seg, toPath, vadd, vmul } from "../../construct/compass.ts";
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
  const circle = through(a, b, c);
  const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  return arcTo(circle, a, c, cross > 0);
};

/**
 * The right half of a head and neck, about its own volute centre at (0, 0): the volute's outer circle of 26.5, whose centre stands
 * 25 from the bridge's upright so that the two circles cross 8.8 above their centres; the curl under it, two arcs ending in the
 * hook; the neck's edge, two arcs from the hook to the waist; and the ruled line out to the shoulder at (17, -53).
 */
const VOLUTE = 26.5;
const APART = 25;
const headHalf = (): Piece[] => {
  const dip: V = [-APART, Math.sqrt(VOLUTE ** 2 - APART ** 2)];
  const outer: Circle = { c: [0, 0], r: VOLUTE };
  // The curl leaves the outer circle 22.6 degrees below level, and turns under through two measured points.
  const meet = onCircle([0, 0], VOLUTE, -22.6 * DEG);
  const under: V = [4, -14];
  const curl = through(meet, [14, -17], under);
  const hook: V = [-1, 4];
  const waist: V = [-13, -8];
  const low: V = [-3, -36];
  const shoulder: V = [17, -53];
  return [
    arcTo(outer, dip, meet, false),
    arcTo(curl, meet, under, false),
    arc3(under, [-0.3, -5.6], hook),
    arc3(hook, [-10, 0], waist),
    arc3(waist, [-11, -20], low),
    seg(low, shoulder),
  ];
};
const HEAD_DOWN: V = [17, -53];

interface Bridge {
  /** Where the bridge's upright stands across, and the height of its volutes' centres. */
  x: number;
  volutes: number;
  /** The head's size, the middle bridge's being 1. */
  scale: number;
  /** The top of the arch between the legs. */
  apex: number;
  /** Each leg's corner at the shoulder, if it stands out past the neck, and its foot: the outer and the inner point and their height. */
  left: { corner?: V; foot: [number, number, number] };
  right: { corner?: V; foot: [number, number, number] };
}

/** One bridge's outline, clockwise from the dip of its head. */
const bridgeOutline = (b: Bridge): Region => {
  const place = (p: Piece, side: 1 | -1): Piece => {
    const scaled: Piece = p.t === "L" ? seg(vmul(p.a, b.scale), vmul(p.b, b.scale)) : { ...p, c: vmul(p.c, b.scale), r: p.r * b.scale };
    const sided = side === 1 ? moved(scaled, [APART * b.scale, 0]) : mirrored(moved(scaled, [APART * b.scale, 0]));
    return moved(sided, [b.x, b.volutes]);
  };
  const right = headHalf().map((p) => place(p, 1));
  const left = reversedRun(headHalf().map((p) => place(p, -1)));
  const neck = (side: 1 | -1): V => [b.x + side * (APART + HEAD_DOWN[0]) * b.scale, b.volutes + HEAD_DOWN[1] * b.scale];
  const apex: V = [b.x, b.apex];
  const leg = (side: 1 | -1, spec: Bridge["left"]): Piece[] => {
    const start = neck(side);
    const corner = spec.corner ?? start;
    const [outer, inner, y] = spec.foot;
    const run = [...(spec.corner ? [seg(start, corner)] : []), seg(corner, [outer, y]), seg([outer, y], [inner, y]), seg([inner, y], apex)];
    return side === 1 ? run : reversedRun(run);
  };
  return [...right, ...leg(1, b.right), ...leg(-1, b.left), ...left];
};

/** The middle bridge, its legs ruled from the shoulders to feet 77.5 and 53 out. */
const MIDDLE: Bridge = { x: 0, volutes: 183, scale: 1, apex: 143, left: { foot: [-77.5, -53, 0] }, right: { foot: [77.5, 53, 0] } };
/**
 * The left bridge behind it, its head 0.7 of the middle one's, 93.4 to the left: the outer leg ruled down to a foot from 50.4 to 25.5
 * out at 26 below the middle feet, the inner one from a corner 41.4 out to a foot 57.2 to 86.7 in at 14 below them.
 */
const SIDE: Bridge = {
  x: -93.4, volutes: 114.5, scale: 0.7, apex: 95.6,
  left: { foot: [-93.4 - 50.4, -93.4 - 25.5, -26] },
  right: { corner: [-93.4 + 41.4, 65.5], foot: [-93.4 + 86.7, -93.4 + 57.2, -14] },
};
/** The white between the middle bridge and the two behind it. */
const PARTING = 2.5;

const mirroredRegion = (region: Region): Region => reversedRun(region.map(mirrored));

/** 三つ立て琴柱: the middle bridge in front, a smaller one behind it on each side. */
export const mitsuTateKotojiBuild = (c: Builder, reach: number): void => {
  const middle = bridgeOutline(MIDDLE);
  const left = bridgeOutline(SIDE);
  const right = mirroredRegion(left);
  const screen = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => middle.map((p) => moved(p, [PARTING * Math.cos((deg * Math.PI) / 180), PARTING * Math.sin((deg * Math.PI) / 180)])));
  // The group's box stands on the page's middle, the outer feet's corners on the layout circle.
  const top = MIDDLE.volutes + VOLUTE;
  const [wide, , bottom] = SIDE.left.foot;
  const up = (top + bottom) / 2;
  const placing: Placing = { k: reach / Math.hypot(wide, up - bottom) };
  const sets = [[left, right], [middle, ...screen], [middle]].map((regions) => regions.map((region) => region.map((p) => moved(p, [0, -up]))));
  c.guideCircle(C0, reach);
  c.guideLine(onPage([0, -100], placing), onPage([0, 100], placing));
  for (const b of [MIDDLE, SIDE, { ...SIDE, x: -SIDE.x }]) {
    for (const side of [-1, 1]) c.guideCircle(onPage([b.x + side * APART * b.scale, b.volutes - up], placing), VOLUTE * b.scale * placing.k);
  }
  c.group(() => c.fill("koto-bridge", toPath(carve([sets[0][0]], sets[1]), placing)));
  c.group(() => c.fill("koto-bridge", toPath(carve([sets[0][1]], sets[1]), placing)));
  c.group(() => c.fill("koto-bridge", toPath(sets[2], placing)));
};
