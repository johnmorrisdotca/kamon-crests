// Koto bridges with rolled heads, as the 1892 crest book draws them on frame 33 (left page, third row, first column from the right,
// 三ッたてことぢ): a head of two volutes, a waisted neck, a shoulder ruled out to each side and two legs ruled down to cut feet. The
// numbers are the book's pixels, y up from the middle bridge's feet. Every curve is a compass arc struck through three measured
// points, the legs and shoulders are ruled.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, lineLine, mirrored, moved, onCircle, onPage, reversedRun, rotated, seg, thickSeg, toPath, vadd, vmul } from "../../construct/compass.ts";
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
  /**
   * Each leg's corner at the shoulder, if it stands out past the neck; its foot, the outer and the inner point; and the top of the
   * arch's side, if the arch is gabled above a straight side.
   */
  left: Leg;
  right: Leg;
}
interface Leg {
  corner?: V;
  foot: [V, V];
  side?: V;
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
    const [outer, inner] = spec.foot;
    const arch = spec.side ? [seg(inner, spec.side), seg(spec.side, apex)] : [seg(inner, apex)];
    const run = [...(spec.corner ? [seg(start, corner)] : []), seg(corner, outer), seg(outer, inner), ...arch];
    return side === 1 ? run : reversedRun(run);
  };
  return [...right, ...leg(1, b.right), ...leg(-1, b.left), ...left];
};

/** The middle bridge, its legs ruled from the shoulders to feet 77.5 and 53 out. */
const MIDDLE: Bridge = { x: 0, volutes: 183, scale: 1, apex: 143, left: { foot: [[-77.5, 0], [-53, 0]] }, right: { foot: [[77.5, 0], [53, 0]] } };
/**
 * The left bridge behind it, its head 0.7 of the middle one's, 93.4 to the left: the outer leg ruled down to a foot from 50.4 to 25.5
 * out at 26 below the middle feet, the inner one from a corner 41.4 out to a foot 57.2 to 86.7 in at 14 below them.
 */
const SIDE: Bridge = {
  x: -93.4, volutes: 114.5, scale: 0.7, apex: 95.6,
  left: { foot: [[-93.4 - 50.4, -26], [-93.4 - 25.5, -26]] },
  right: { corner: [-93.4 + 41.4, 65.5], foot: [[-93.4 + 86.7, -14], [-93.4 + 57.2, -14]] },
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
  const [[wide, bottom]] = SIDE.left.foot;
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

/**
 * 三つ組み琴柱 (frame 33, left page, fourth row, first column from the right): three bridges about one centre, a third of a turn
 * apart, their heads out. In the book's pixels from the centre, the top bridge's head is 0.87 of the standing middle one's, its
 * volutes' centres 132 up; its shoulders' corners stand 45 out and 86 up, and its arch is a gable from 105 up down to straight sides
 * 24 out at 81 up. Both edges of each leg lean out 0.1 for each unit down, and each leg is cut off along the next bridge's upright,
 * where it meets that bridge's other neighbour's leg in a mitre.
 */
const KUMI_LEAN = 0.1;
/** The mitre in each arch is ruled parallel to the bridge's upright, 7 to its left, so the left legs run on past the upright. */
const KUMI_MITRE = 7;
const kumiFoot = (from: V, axisDeg: number): V => {
  const axis: V = [Math.cos(axisDeg * DEG), Math.sin(axisDeg * DEG)];
  const off: V = [Math.cos((axisDeg + 90) * DEG) * KUMI_MITRE, Math.sin((axisDeg + 90) * DEG) * KUMI_MITRE];
  return lineLine(from, [from[0] + Math.sign(from[0]) * KUMI_LEAN, from[1] - 1], off, vadd(off, axis));
};
const kumiLeg = (side: 1 | -1): Required<Leg> => {
  const corner: V = [side * 45, 86];
  const top: V = [side * 24, 81];
  const axisDeg = side === 1 ? -30 : 210;
  return { corner, foot: [kumiFoot(corner, axisDeg), kumiFoot(top, axisDeg)], side: top };
};
const KUMI_LEFT = kumiLeg(-1);
const KUMI: Bridge = { x: 0, volutes: 132, scale: 0.87, apex: 105, left: KUMI_LEFT, right: kumiLeg(1) };
/** The reach of the crest: the volutes' outer edges. */
const KUMI_REACH = Math.hypot(APART * KUMI.scale, KUMI.volutes) + VOLUTE * KUMI.scale;

const turned = (region: Region, deg: number): Region => region.map((p) => rotated(p, deg * DEG));
const screened = (region: Region): Region[] => [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => region.map((p) => moved(p, [PARTING * Math.cos(deg * DEG), PARTING * Math.sin(deg * DEG)])));

/** 三つ組み琴柱: each bridge's left leg lies over the right leg of the bridge a third of a turn anticlockwise from it. */
export const mitsuKumiKotojiBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / KUMI_REACH };
  const outline = bridgeOutline(KUMI);
  const { corner, foot, side } = KUMI_LEFT;
  const leftLeg: Region = [seg(corner, foot[0]), seg(foot[0], foot[1]), seg(foot[1], side), seg(side, corner)];
  // The white line along each upright, where the two legs inside its arch meet.
  const mitre = thickSeg([-KUMI_MITRE, 25], [-KUMI_MITRE, 90], PARTING);
  c.guideCircle(C0, reach);
  for (const deg of [0, 120, 240]) {
    const along: V = [Math.cos((90 + deg) * DEG), Math.sin((90 + deg) * DEG)];
    c.guideLine(onPage([0, 0], placing), onPage(vmul(along, KUMI_REACH), placing));
    for (const side of [-1, 1]) {
      const [x, y] = [side * APART * KUMI.scale, KUMI.volutes];
      const centre: V = [x * Math.cos(deg * DEG) - y * Math.sin(deg * DEG), x * Math.sin(deg * DEG) + y * Math.cos(deg * DEG)];
      c.guideCircle(onPage(centre, placing), VOLUTE * KUMI.scale * placing.k);
    }
  }
  for (const deg of [0, 120, 240]) {
    const over = screened(turned(leftLeg, deg - 120));
    const cuts = [...over, ...[deg + 120, deg + 240].map((d) => turned(mitre, d))];
    c.group(() => c.fill("koto-bridge", toPath(carve([turned(outline, deg)], cuts), placing)));
  }
};
