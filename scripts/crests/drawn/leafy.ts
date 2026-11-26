// Three crests of leaves and lobes, struck and ruled, each in its own frame: the centre at (0, 0), x to the right, y up, the layout
// circle at 100. Their proportions were measured from pictures of the crests and checked against the crest book of 1892
// (伊呂波分新撰紋帳: frame 17 for the oak, frame 14 for the water plantain, frame 28 for the quince).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, carveWhere, circleCircle, circleThrough, disc, lineCircle, mirrored, nearest, onPage, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath, touch, vadd, vdist, vsub, vunit } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { curledBand } from "./quince-band.ts";

const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
const turned = (regions: Region[], deg: number): Region[] => regions.map((region) => region.map((p) => rotated(p, deg * DEG)));
const both = (regions: Region[]): Region[] => [...regions, ...regions.map((region) => region.map(mirrored))];

/** An arc of the circle of radius `r` through two points, its centre towards `hint`, inked `w` wide. */
const vein = (from: V, to: V, r: number, hint: V, w: number): Region => {
  const circ = circleThrough(from, to, r, hint);
  const piece = shortArc(circ, from, to);

  return piece.t === "A" ? thickArc(circ.c, circ.r, w, piece.a0, piece.a1) : thickSeg(from, to, w);
};

/** The circles of an oak leaf that stands upright from the centre: its top, and the shoulder and the foot of its right side. */
const OAK_TOP: Circle = { c: [0, 70], r: 30 };
const OAK_SIDE: Circle = { c: [16, 52], r: 28 };
const OAK_FOOT: Circle = { c: [12, 30], r: 20 };
/** The veins of the right side: where each leaves the midrib, where it ends near the leaf's top, and the radius of its arc, which bows out beside the edge. */
const OAK_VEINS: [V, V, number][] = [[[0, 22], [20, 88], 38], [[0, 36], [13, 90], 33], [[0, 50], [7, 91], 29]];

/**
 * Three oak leaves, 三つ柏. A leaf's smooth edge is five circles: one at the top, a shoulder each side and a foot each side,
 * with a ruled point at the stalk. A white midrib runs up it; three white veins each side leave the midrib low, bow out
 * beside the edge and run up towards the top. A small disc sits in a white ring where the leaves meet.
 */
export const kashiwaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const black: Region[] = [disc(OAK_TOP.c, OAK_TOP.r), ...both([disc(OAK_SIDE.c, OAK_SIDE.r), disc(OAK_FOOT.c, OAK_FOOT.r)]), polygon([[0, 8], [14, 24], [0, 60], [-14, 24]])];
  const white: Region[] = [thickSeg([0, 12], [0, 94], 2.2)];
  for (const [from, to, r] of OAK_VEINS) white.push(...both([vein(from, to, r, [-60, 56], 1.8)]));
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 0, reach);
  for (const circ of [OAK_TOP, OAK_SIDE, OAK_FOOT, ...OAK_VEINS.map(([from, to, r]) => circleThrough(from, to, r, [-60, 56]))]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  for (const turn of [0, 120, 240]) c.group(() => c.fill(part, toPath(carve(turned(black, turn), [...turned(white, turn), disc([0, 0], 13)]), placing)));
  c.fill(part, toPath([disc([0, 0], 9)], placing));
};

/** A pointed blade: the lens between two arcs of radius `r` from `from` to `to`. */
const blade = (from: V, to: V, r: number): Region => {
  const mid: V = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
  const across: V = [-(to[1] - from[1]), to[0] - from[0]];
  const a = circleThrough(from, to, r, [mid[0] + across[0], mid[1] + across[1]]);
  const b = circleThrough(from, to, r, [mid[0] - across[0], mid[1] - across[1]]);

  return [shortArc(a, from, to), shortArc(b, to, from)];
};

/** The right edge of the water plantain's upright lobe: a circle of 87 on a grid point, through the tip at (0, 100) and the foot at (0, -26). */
const LOBE: Circle = { c: [-60, 37], r: 87 };
/** The lower lobes are the upright one, turned this far to each side: they point down and out, 45 degrees from straight down. */
const LOBE_TURN = 135;
/** A white line, and the white round a piece that passes under a lobe. */
const LOBE_LINE = 2;
/** The clusters of a flower spray: where each sits, and whether its odd petal points up or out. Every petal is a circle of 6 on a grid point, 5 from there. */
const FLORETS: [V, "up" | "out"][] = [[[41, 19], "up"], [[58, 33], "up"], [[81, 32], "out"], [[79, 10], "out"], [[62, -5], "out"]];
/** The spray's stalk and its four branches: from, to and width. The stalk runs on under the lobe; the branches leave it at (46, 2) and (60, 14). */
const TWIGS: [V, V, number][] = [[[32, -10], [81, 32], 3], [[46, 2], [41, 19], 2], [[46, 2], [62, -5], 2], [[60, 14], [58, 33], 2], [[60, 14], [79, 10], 2]];
/** The outer stems bow out from upright: the band between two circles about this point. */
const STEM: V = [92, -96];
/** The level line the three stems are cut on. */
const STEM_END = -98;

/**
 * The standing water plantain, 立ち沢瀉: a leaf of three lobes of one size, one upright and one down to each side, each the lens
 * between two arcs of one width, with a white vein from a small ring at the centre towards its tip. The upright lobe is built
 * in full and the other two where they stand. A spray of five three-petalled flowers stands each side, and three stems
 * hang under the leaf, the middle one straight and the outer two bowed, each cut a white line short of the lobe over it and all
 * three on one level line.
 */
export const omodakaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const lens = blade([0, -26], [0, 100], LOBE.r);
  const veinTop = Math.sqrt(95 * 95 - 1);
  const vein: Region = [seg([-1, 0], [1, 0]), seg([1, 0], [1, veinTop]), arcTo({ c: [0, 0], r: 95 }, [1, veinTop], [-1, veinTop], true), seg([-1, veinTop], [-1, 0])];
  // A lobe stops where it would run over a neighbour's vein: 80 degrees to each side of its own, half a white line short.
  const far = (side: number): V => [side * 300 * Math.sin(80 * DEG), 1 / Math.sin(80 * DEG) + 300 * Math.cos(80 * DEG)];
  const under = polygon([[0, 1 / Math.sin(80 * DEG)], far(1), [300, -300], [-300, -300], far(-1)]);
  const lobe = (turn: number): Region[] => turned(carve([lens], [vein, disc([0, 0], 6), under]), -turn);
  const stand = (p: V): V => [p[0] * Math.cos(LOBE_TURN * DEG) + p[1] * Math.sin(LOBE_TURN * DEG), -p[0] * Math.sin(LOBE_TURN * DEG) + p[1] * Math.cos(LOBE_TURN * DEG)];
  // The right lobe's two edges, and the white beside each for what passes under it.
  const outer: Circle = { c: stand([-LOBE.c[0], LOBE.c[1]]), r: LOBE.r + LOBE_LINE };
  const inner: Circle = { c: stand(LOBE.c), r: LOBE.r + LOBE_LINE };
  const petals = FLORETS.flatMap(([[x, y], way]): V[] => (way === "up" ? [[x, y + 5], [x - 4, y - 3], [x + 4, y - 3]] : [[x + 5, y], [x - 3, y + 4], [x - 3, y - 4]]));
  const spray = carve([...TWIGS.map(([from, to, w]) => thickSeg(from, to, w)), ...petals.map((at) => disc(at, 6))], [disc(outer.c, outer.r)]);
  const middle = carve([polygon([[-3, STEM_END], [-3, -30], [3, -30], [3, STEM_END]])], [disc(inner.c, inner.r), disc([-inner.c[0], inner.c[1]], inner.r)]);
  const [wide, narrow] = [80, 76].map((r) => ({ c: STEM, r, at: [STEM[0] - Math.sqrt(r * r - (STEM_END - STEM[1]) ** 2), STEM_END] as V, top: [STEM[0] + r * Math.cos(150 * DEG), STEM[1] + r * Math.sin(150 * DEG)] as V }));
  const side = longLast(carve([[seg(narrow.at, wide.at), arcTo(wide, wide.at, wide.top, false), seg(wide.top, narrow.top), arcTo(narrow, narrow.top, narrow.at, true)]], [disc(inner.c, inner.r)]));
  for (const r of [100, 95, 6, 4]) c.guideCircle(C0, r * placing.k);
  for (const x of [-60, 60]) c.guideCircle(onPage([x, LOBE.c[1]], placing), LOBE.r * placing.k);
  for (const at of petals) c.guideCircle(onPage(at, placing), 6 * placing.k);
  for (const r of [76, 80]) c.guideCircle(onPage(STEM, placing), r * placing.k);
  for (const gap of [outer, inner, { c: [-inner.c[0], inner.c[1]] as V, r: inner.r }]) c.gapCircle(onPage(gap.c, placing), gap.r * placing.k);
  for (const turn of [0, LOBE_TURN, -LOBE_TURN]) c.fill(part, toPath(lobe(turn), placing));
  c.fill(part, toPath([disc([0, 0], 4)], placing));
  for (const loops of [spray, spray.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(loops, placing));
  c.guideLine(onPage([-10, STEM_END], placing), onPage([10, STEM_END], placing));
  c.group(() => {
    c.fill(part, toPath(middle, placing));
    c.fill(part, toPath(side, placing));
  });
  c.fill(part, toPath(side.map((loop) => loop.map(mirrored)), placing));
};

interface MelonForm {
  count: number;
  shoulder: Circle;
  innerEdge: number;
  lobeGap: number;
  curl: Circle;
  bandOuter: number;
  bandInner: number;
  tip: Circle;
  side: Circle;
  petalBody: number;
  heart: number;
  petalFoot: number;
  stamenLength: number;
  stamenFoot: number;
}

/** The circle widths and grid points of the Oda quince and the plain melon. */
const MELON_FORMS = {
  oda: {
    count: 5,
    shoulder: { c: [30, 72], r: 22 }, innerEdge: 76, lobeGap: 2,
    curl: { c: [33, 59], r: 5.3 }, bandOuter: 72, bandInner: 68,
    tip: { c: [0, 51], r: 10 }, side: { c: [14, 38], r: 11 }, petalBody: 42,
    heart: 8, petalFoot: 14, stamenLength: 30, stamenFoot: 0,
  },
  uri: {
    count: 5,
    shoulder: { c: [28, 75], r: 20 }, innerEdge: 79, lobeGap: 1,
    curl: { c: [37, 62], r: 5.5 }, bandOuter: 76, bandInner: 71,
    tip: { c: [0, 49], r: 11 }, side: { c: [16, 42], r: 12 }, petalBody: 45,
    heart: 8, petalFoot: 11, stamenLength: 28, stamenFoot: 14,
  },
  three: {
    count: 3,
    shoulder: { c: [48, 55], r: 27 }, innerEdge: 57, lobeGap: 1,
    curl: { c: [41, 29], r: 4.9 }, bandOuter: 55, bandInner: 50,
    tip: { c: [0, 32], r: 11 }, side: { c: [12, 22], r: 14 }, petalBody: 30,
    heart: 5, petalFoot: 8, stamenLength: 21, stamenFoot: 9,
  },
} satisfies Record<string, MelonForm>;

/** The broad top lobe of the three melons. Its shoulders touch a flatter crown and meet the inner circle. */
const broadMelonLobe = (): Region => {
  const crown: Circle = { c: [0, -20], r: 120 };
  const shoulder: Circle = { c: [51, -20 + Math.sqrt(92 ** 2 - 51 ** 2)], r: 28 };
  const inside: Circle = { c: [0, 0], r: 57 };
  const upper = touch(crown, shoulder);
  const lower = nearest(circleCircle(shoulder.c, shoulder.r, inside.c, inside.r), [46, 34]);
  const crownArc = shortArc(crown, [-upper[0], upper[1]], upper);
  const sideArc = shortArc(shoulder, upper, lower);
  const bottomArc = shortArc(inside, lower, [-lower[0], lower[1]]);

  return [crownArc, sideArc, bottomArc, reversed(mirrored(sideArc))];
};

/**
 * The Oda quince and melon crests: lobes round a band round a flower. A lobe is the outer circle itself between two
 * round shoulders, cut straight down a white line each side to a circle about the centre, so that two lobes meet in a point;
 * inside it lies its piece of the band, with a curl at each end. A petal of the flower has three round ends and a white stamen up
 * its middle, and a white line parts it from the next. The lobe on top and the petal on top are built in full, and the rest of each where they stand, clockwise.
 */
export const mokkoBuild = (c: Builder, frame: string, flower: string, reach: number, form: keyof typeof MELON_FORMS = "oda", broadTop = false): void => {
  const { count, shoulder, innerEdge, lobeGap, curl, bandOuter, bandInner, tip, side, petalBody, heart, petalFoot, stamenLength, stamenFoot } = MELON_FORMS[form];
  const halfTurn = Math.PI / count;
  const placing: Placing = { k: reach / 100 };
  const mirror = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
  const within = (circ: Circle, p: V): boolean => Math.hypot(p[0] - circ.c[0], p[1] - circ.c[1]) < circ.r;
  // How far a point stands inside the line between this lobe and the next, on the side given (1 the right, -1 the left).
  const inside = (p: V, side: number): number => -side * p[0] * Math.cos(halfTurn) + p[1] * Math.sin(halfTurn);
  // The line `off` inside the line between two lobes, from near the centre out past the outer circle.
  const beside = (side: number, off: number): Piece => {
    const at = (along: number): V => [side * (along * Math.sin(halfTurn) - off * Math.cos(halfTurn)), along * Math.cos(halfTurn) + off * Math.sin(halfTurn)];

    return seg(at(2), at(110));
  };
  const about = (r: number): Piece[] => disc([0, 0], r);
  const pair = (circ: Circle): Piece[] => [...disc(circ.c, circ.r), ...disc(mirror(circ).c, circ.r)];
  const far = (p: V): number => Math.hypot(p[0], p[1]);

  // Whether a point lies past a circle's centre, going round from the lobe's own line, and outside that circle: what a round end leaves off.
  const past = (circ: Circle, p: V): boolean => Math.abs(p[0]) * circ.c[1] > p[1] * circ.c[0] && !within(circ, [Math.abs(p[0]), p[1]]);
  // The outside arc and its round shoulders come down to the small white line beside each neighbour.
  const lobe = (rounding: Circle): Region[] => carveWhere([...about(100), ...about(innerEdge), ...pair(rounding), beside(1, lobeGap), beside(-1, lobeGap)], (p) => far(p) < 100 && far(p) > innerEdge && inside(p, 1) > lobeGap && inside(p, -1) > lobeGap && !past(rounding, p));
  const band = curledBand({ c: [0, 0], r: bandOuter }, { c: [0, 0], r: bandInner }, curl, 5.5, 2.5);
  const standard = [...lobe(shoulder), ...band];
  const seamHeight = lobeGap / Math.sin(halfTurn);
  const belowSeam = polygon([[0, seamHeight], [140 * Math.sin(halfTurn), 140 * Math.cos(halfTurn) + seamHeight], [140, -100], [0, -100]]);
  const first = broadTop ? [...carve([broadMelonLobe()], both([belowSeam])), ...band] : standard;
  const stamenEnds: V[] = stamenFoot > 0 ? [[0, stamenFoot + 2], [0, stamenLength - 2]] : [];
  const stamen = (p: V): boolean => {
    if (stamenFoot === 0) return Math.abs(p[0]) < 2 && p[1] > 0 && far(p) < stamenLength;

    return (Math.abs(p[0]) < 2 && p[1] >= stamenFoot + 2 && p[1] <= stamenLength - 2) || stamenEnds.some((at) => vdist(at, p) < 2);
  };
  const petal = carveWhere(
    [...about(petalFoot), ...about(stamenLength), ...stamenEnds.flatMap((at) => disc(at, 2)), ...disc(tip.c, tip.r), ...pair(side), beside(1, 1), beside(-1, 1), seg([2, 2], [2, 40]), seg([-2, 2], [-2, 40])],
    (p) => far(p) > petalFoot && inside(p, 1) > 1 && inside(p, -1) > 1 && (far(p) < petalBody || within(tip, p) || within(side, [Math.abs(p[0]), p[1]])) && !stamen(p),
  );

  for (const r of [100, innerEdge, bandOuter, bandInner]) c.guideCircle(C0, r * placing.k);
  for (const circ of [shoulder, mirror(shoulder), curl, mirror(curl)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  for (let i = 0; i < count; i += 1) c.fill(frame, toPath(turned(i === 0 ? first : standard, (-360 * i) / count), placing));
  for (const r of [stamenLength, petalFoot, heart]) c.guideCircle(C0, r * placing.k);
  for (const circ of [tip, side, mirror(side)]) c.guideCircle(onPage(circ.c, placing), circ.r * placing.k);
  for (let i = 0; i < count; i += 1) c.fill(flower, toPath(turned(petal, (-360 * i) / count), placing));
  c.fill(flower, toPath([disc([0, 0], heart)], placing));
};

/** Loops written so that the last arc of all is a long one: the compass arm rests on a centre the arc gives exactly. */
export const longLast = (loops: Region[]): Region[] => {
  const long = (piece: Piece): number => (piece.t === "A" ? piece.r * Math.abs(piece.a1 - piece.a0) : 0);
  const turned = loops.map((loop) => {
    const last = loop.reduce((best, piece, i) => (long(piece) > long(loop[best]) ? i : best), 0);

    return [...loop.slice(last + 1), ...loop.slice(0, last + 1)];
  });

  return turned.sort((a, b) => long(a[a.length - 1]) - long(b[b.length - 1]));
};

/** Where the maple's veins meet: the middle of its small ring, a grid point on the axis. */
const MAPLE_FOOT: V = [0, -42];
/** Every lobe is the lens between two circles of this width on grid points. */
const MAPLE_LOBE = 87;
/** The top lobe's two circles: they cross at its tip, (0, 96), and above the ring. */
const MAPLE_TOP: [V, V] = [[-63, 36], [63, 36]];
/**
 * The right side's lobes, from the top down. Each lens starts across the axis, so that it leans up from its vein to its tip; the
 * lowest two run on under the leaf and meet below the ring.
 */
const MAPLE: [V, V][] = [[[81, -51], [4, 60]], [[17, -102], [49, 33]], [[-40, -76], [57, 3]]];
/** The veins end on this circle about the crest's centre, a little short of every tip. */
const MAPLE_VEINS = 92;
/** The stem's flat end, and half its width there. */
const MAPLE_STEM: V = [4, -97];

/**
 * The maple leaf, 紅葉: seven pointed lobes about a small ring low on the leaf, each the lens between two arcs of one width, the
 * top one the longest and each pair shorter down to the lowest; a straight white vein from the ring towards every tip; and a short
 * stem under the ring, wider at its flat end, cut a white line short of the lowest lobes.
 */
export const momijiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const flip = (p: V): V => [-p[0], p[1]];
  const [top, ...lobes] = [MAPLE_TOP, ...MAPLE].map(([a, b]) => {
    const [one, other] = circleCircle(a, MAPLE_LOBE, b, MAPLE_LOBE);
    const [foot, tip] = vdist(one, MAPLE_FOOT) < vdist(other, MAPLE_FOOT) ? [one, other] : [other, one];

    return { tip, lens: [shortArc({ c: a, r: MAPLE_LOBE }, foot, tip), shortArc({ c: b, r: MAPLE_LOBE }, tip, foot)] as Region };
  });
  const tips: V[] = [top.tip, ...lobes.flatMap((lobe) => [lobe.tip, flip(lobe.tip)])];
  // A vein: the white between two lines a line's width apart, from the ring to the circle the veins end on.
  const sides = (tip: V): [V, V][] => {
    const d = vunit(vsub(tip, MAPLE_FOOT));

    return [1, -1].map((k): [V, V] => {
      const from: V = [MAPLE_FOOT[0] - k * d[1], MAPLE_FOOT[1] + k * d[0]];

      return [from, nearest(lineCircle(from, vadd(from, d), [0, 0], MAPLE_VEINS), tip)];
    });
  };
  const veins = tips.map((tip): Region => {
    const [[a, b], [e, f]] = sides(tip);

    return [seg(a, b), shortArc({ c: [0, 0], r: MAPLE_VEINS }, b, f), seg(f, e), seg(e, a)];
  });
  const white = [...veins, disc(MAPLE_FOOT, 7)];
  const right = carve(lobes.map((lobe) => lobe.lens), white);
  const under: Circle = { c: MAPLE[2][1], r: MAPLE_LOBE + 2 };
  const stem = carve([polygon([flip(MAPLE_STEM), vadd(MAPLE_FOOT, [0, -8]), MAPLE_STEM])], [disc(under.c, under.r), disc(flip(under.c), under.r)]);
  for (const r of [100, MAPLE_VEINS]) c.guideCircle(C0, r * placing.k);
  for (const r of [7, 5]) c.guideCircle(onPage(MAPLE_FOOT, placing), r * placing.k);
  for (const at of [MAPLE_TOP, ...MAPLE].flat()) c.guideCircle(onPage(at, placing), MAPLE_LOBE * placing.k);
  for (const at of [under.c, flip(under.c)]) c.gapCircle(onPage(at, placing), under.r * placing.k);
  for (const tip of tips) for (const [from, to] of sides(tip)) c.guideLine(onPage(from, placing), onPage(to, placing));
  for (const end of [MAPLE_STEM, flip(MAPLE_STEM)]) c.guideLine(onPage(MAPLE_FOOT, placing), onPage(end, placing));
  c.guideLine(onPage(flip(MAPLE_STEM), placing), onPage(MAPLE_STEM, placing));
  c.fill(part, toPath(longLast(carve([top.lens], white)), placing));
  for (const loops of [right, right.map((loop) => loop.map(mirrored))]) c.fill(part, toPath(longLast(loops), placing));
  c.group(() => {
    c.fill(part, toPath(stem, placing));
    c.fill(part, toPath([disc(MAPLE_FOOT, 5)], placing));
  });
};
