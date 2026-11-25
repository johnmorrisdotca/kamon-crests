// Three crests of leaves and lobes, struck and ruled, each in its own frame: the centre at (0, 0), x to the right, y up, the layout
// circle at 100. Their proportions were measured from pictures of the crests and checked against the crest book of 1892
// (伊呂波分新撰紋帳: frame 17 for the oak, frame 14 for the water plantain, frame 28 for the quince).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcTo, carve, circleThrough, disc, mirrored, onPage, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const polar = (r: number, deg: number): V => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)];
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
/** The lower lobes are the upright one, turned this far to each side: they point down and out, 40 degrees from upright. */
const LOBE_TURN = 140;
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
  // Written so that its last arc is a long one.
  const side = carve([[seg(narrow.at, wide.at), arcTo(wide, wide.at, wide.top, false), seg(wide.top, narrow.top), arcTo(narrow, narrow.top, narrow.at, true)]], [disc(inner.c, inner.r)]).map((loop) => {
    const long = (piece: Piece): number => (piece.t === "A" ? piece.r * Math.abs(piece.a1 - piece.a0) : 0);
    const last = loop.reduce((best, piece, i) => (long(piece) > long(loop[best]) ? i : best), 0);

    return [...loop.slice(last + 1), ...loop.slice(0, last + 1)];
  });
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

/**
 * The Oda quince, 織田木瓜 (五つ木瓜に唐花): five lobes round a ring, each the part of a circle of 40 that lies outside the circle
 * of 62, a narrow white gap between neighbours; a thin ring inside them; and in the middle a flower of five round petals with
 * a white line between neighbours, a stamen on each, about a small disc.
 */
export const mokkoBuild = (c: Builder, frame: string, flower: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  c.guideCircle(C0, reach);
  c.guideCircle(C0, 62 * placing.k);
  c.guideSpokes(5, 0, reach);
  for (let i = 0; i < 5; i += 1) {
    c.guideCircle(onPage(polar(58, 90 + 72 * i), placing), 40 * placing.k);
    const gaps = [54 + 72 * i, 126 + 72 * i].map((deg) => thickSeg(polar(50, deg), polar(110, deg), 6));
    c.fill(frame, toPath(carve([disc(polar(58, 90 + 72 * i), 40)], [disc([0, 0], 62), ...gaps]), placing));
  }
  c.fill(frame, toPath(carve([disc([0, 0], 57)], [disc([0, 0], 53)]), placing));
  const petals: Region[] = [disc([0, 0], 7)];
  const white: Region[] = [thickArc([0, 0], 9, 2.4, 0, TAU / 2), thickArc([0, 0], 9, 2.4, TAU / 2, TAU)];
  for (let i = 0; i < 5; i += 1) {
    petals.push(disc(polar(30, 90 + 72 * i), 16));
    white.push(thickSeg(polar(10, 54 + 72 * i), polar(52, 54 + 72 * i), 2.2), thickSeg(polar(14, 90 + 72 * i), polar(28, 90 + 72 * i), 1.6));
  }
  c.group(() => c.fill(flower, toPath(carve(petals, white), placing)));
};

/** The maple's seven lobes: how far each leans from upright, how long it is from the leaf's foot, and the radius of its two arcs. */
const MAPLE: [number, number, number][] = [[0, 135, 88], [42, 118, 78], [-42, 118, 78], [82, 96, 62], [-82, 96, 62], [128, 60, 38], [-128, 60, 38]];

/**
 * The maple leaf, 紅葉: seven pointed lobes from one point at the leaf's foot, each the lens between two equal arcs, the middle
 * one the longest; a white rib up each of the five upper lobes from a white arc that crosses the foot; and a stalk that flares
 * to a flat cut end, each side an arc.
 */
export const momijiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const foot: V = [0, -38];
  const tip = (lean: number, long: number): V => [foot[0] + long * Math.sin(lean * DEG), foot[1] + long * Math.cos(lean * DEG)];
  const lobes = MAPLE.map(([lean, long, r]) => blade(foot, tip(lean, long), r));
  const across: V = [0, -100];
  const white: Region[] = [thickArc(across, 66, 2.2, 50 * DEG, 130 * DEG)];
  for (const [lean, long] of MAPLE.slice(0, 5)) {
    const end = tip(lean, long * 0.82);
    const along = tip(lean, 1);
    const d: V = [along[0] - foot[0], along[1] - foot[1]];
    // The rib leaves the arc across the foot: from where its line meets that arc.
    const from = lean === 0 ? ([0, -34] as V) : ([foot[0] + d[0] * 12, foot[1] + d[1] * 12] as V);
    white.push(thickSeg(from, end, 2));
  }
  const stalk: Region = [
    shortArc(circleThrough([-9, -56], [-17, -97], 62, [-80, -70]), [-9, -56], [-17, -97]),
    seg([-17, -97], [17, -97]),
    shortArc(circleThrough([17, -97], [9, -56], 62, [80, -70]), [17, -97], [9, -56]),
    seg([9, -56], [-9, -56]),
  ];
  c.guideCircle(C0, reach);
  c.guideLine(onPage([0, 100], placing), onPage([0, -100], placing));
  for (const [lean, long] of MAPLE) c.guideLine(onPage(foot, placing), onPage(tip(lean, long), placing));
  c.guideCircle(onPage(across, placing), 66 * placing.k);
  c.group(() => c.fill(part, toPath(carve(lobes, white), placing)));
  c.group(() => c.fill(part, toPath([stalk], placing)));
};
