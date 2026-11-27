// Crests of plain compass-and-ruler shapes, each set out in its own frame: the centre at (0, 0), x to the right, y up, and the
// layout circle at 100. Their proportions were checked against the crest book of 1892 (伊呂波分新撰紋帳) and pictures of the crests.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcA, carve, carveWhere, circleCircle, circleThrough, disc, inside, lineCircle, mirrored, nearest, onPage, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const polar = (r: number, deg: number): V => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)];
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

/** The exposed edge of one petal uses tangent shoulders and flanks. A larger opening keeps a line of paper beside a petal above it. */
const bellflowerUnit = (toki: boolean, gap = 0): { petal: Region; shoulder: Circle; flat: Circle; notch: V } => {
  const centre: V = toki ? [18, 58] : [16, 58];
  const shoulderWidth = toki ? 24 : 22;
  const flankWidth = toki ? 72 : 60;
  const shoulderDistance = flankWidth - shoulderWidth;
  const flatCentre = nearest(circleCircle(centre, shoulderDistance, [0, 100], flankWidth), [-30, 50]);
  const shoulder = { c: centre, r: shoulderWidth + gap };
  const flat = { c: flatCentre, r: flankWidth + gap };
  const foot: V = [0, -gap / Math.cos(54 * DEG)];
  const spoke = polar(100, 54);
  const notch = toki ? nearest(lineCircle(foot, [spoke[0], spoke[1] + foot[1]], shoulder.c, shoulder.r), polar(62, 54)) : polar(62, 54);
  const tip: V = gap === 0 ? [0, 100] : nearest(circleCircle(flatCentre, flat.r, [-flatCentre[0], flatCentre[1]], flat.r), [0, 100]);
  const touchAt: V = [flatCentre[0] + ((centre[0] - flatCentre[0]) * flat.r) / shoulderDistance, flatCentre[1] + ((centre[1] - flatCentre[1]) * flat.r) / shoulderDistance];
  const right: Piece[] = [shortArc(shoulder, notch, touchAt), shortArc(flat, touchAt, tip)];
  const left = right.map(mirrored).map(reversed).reverse();

  return { petal: [seg(foot, notch), ...right, ...left, seg([-notch[0], notch[1]], foot)], shoulder, flat, notch };
};

/**
 * The bellflower, 桔梗. A petal's outline is four arcs and two ruled lines: on each side a round shoulder, the arc of a circle of
 * 22 from the notch between petals (62 out), and touching it a flatter arc of 60 that runs up to the tip (100), where the two
 * sides meet in a small sharp point; below the notches its sides are ruled to the centre. Between neighbours a white gap; up
 * the middle of each petal a short white ray; and in the centre a plain round disc, a white line round it.
 */
export const kikyoBuild = (c: Builder, part: string, reach: number, toki = false): void => {
  const placing: Placing = { k: reach / 100 };
  const { petal, shoulder, flat, notch } = bellflowerUnit(toki);
  const middle = toki ? 15 : 11;
  const middleGap = 4;
  const rayReach = toki ? 36 : 37;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, (toki ? Math.hypot(...notch) : 62) * placing.k);
  c.guideSpokes(10, 0, reach);
  for (const circ of [shoulder, flat]) for (const side of [1, -1]) c.guideCircle(onPage([side * circ.c[0], circ.c[1]], placing), circ.r * placing.k);
  c.guideCircle(C0, (middle + middleGap) * placing.k);
  c.guideCircle(C0, middle * placing.k);
  for (let i = 0; i < 5; i += 1) {
    const turn = (72 * i * Math.PI) / 180;
    const white: Region[] = [disc([0, 0], middle + middleGap), thickSeg([0, 0], polar(rayReach, 90 + 72 * i), 2.4)];
    for (const side of [-1, 1]) white.push(thickSeg([0, 0], polar(70, 90 + 72 * i + side * 36), 2.6));
    c.fill(part, toPath(carve([petal.map((p) => rotated(p, turn))], white), placing));
  }
  c.fill(part, toPath([disc([0, 0], middle)], placing));
};

/** Five rear petals show between the outer tips, cut short by circles struck beside the petals in front. */
export const yaeKikyoBuild = (c: Builder, reach: number): void => {
  const front = bellflowerUnit(true, 2.5).petal;
  const neighbours = [-36, 36].map((angle) => front.map((piece) => rotated(piece, angle * DEG)));
  const back = polygon([[-18, 64], [-20, 84], [0, 96], [20, 84], [18, 64]]);
  const petal = carve([back], neighbours);
  for (let i = 0; i < 5; i += 1) c.fill("bellflower", toPath(petal, { k: reach / 100, turn: 36 + 72 * i }));
  kikyoBuild(c, "bellflower", reach, true);
};

/** A petal has a shallow shoulder-to-tip arc and a long curved flank from its shoulder toward the heart. */
const swordKikyoPetal = (gap: number): Region => {
  const foot: V = [5 + gap, 4];
  const shoulder: V = [36 + gap, 70];
  const tip: V = [0, 100 + gap];
  const flank = circleThrough(foot, shoulder, 155, [145, 4]);
  const tipEdge = circleThrough(shoulder, tip, 96, [-38, 12]);
  const right = [shortArc(flank, foot, shoulder), shortArc(tipEdge, shoulder, tip)];

  return [...right, ...right.map(mirrored).map(reversed).reverse(), seg([-foot[0], foot[1]], foot)];
};

/** The sword balloon flower has five blades between its five broad petals, each ruled to a point. */
export const kenKikyoBuild = (c: Builder, reach: number): void => {
  const front = swordKikyoPetal(0);
  const beside = swordKikyoPetal(2.5);
  const heart = disc([0, 0], 16);
  const petal = carve([front], [heart, thickSeg([0, 0], [0, 38], 3)]);
  const neighbours = [-36, 36].map((angle) => beside.map((piece) => rotated(piece, angle * DEG)));
  const blade = polygon([[-10, 9], [-24, 88], [0, 98], [24, 88], [10, 9]]);
  const visible = carve([blade], [...neighbours, heart]);
  const placing: Placing = { k: reach / 100 };

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  for (let i = 0; i < 5; i += 1) c.fill("bellflower", toPath(petal, { ...placing, turn: 72 * i }));
  c.fill("bellflower", toPath([disc([0, 0], 13)], placing));
  for (let i = 0; i < 5; i += 1) c.fill("sword", toPath(visible, { ...placing, turn: 36 + 72 * i }));
};

/** A thin bellflower is five pointed lenses, with one short oval cut into each near the heart. */
export const yaseKikyoBuild = (c: Builder, reach: number): void => {
  const foot: V = [0, 9];
  const tip: V = [0, 100];
  const edge = circleThrough(foot, tip, 105, [95, 50]);
  const blade = [shortArc(edge, foot, tip), mirrored(reversed(shortArc(edge, foot, tip)))];
  const rayFoot: V = [0, 17];
  const rayTip: V = [0, 38];
  const raySide = circleThrough(rayFoot, rayTip, 20, [20, 26]);
  const ray = [shortArc(raySide, rayFoot, rayTip), mirrored(reversed(shortArc(raySide, rayFoot, rayTip)))];
  const petal = carve([blade], [disc([0, 0], 15), ray]);
  c.guideCircle(C0, reach);
  for (let i = 0; i < 5; i += 1) c.fill("bellflower", toPath(petal, { k: reach / 100, turn: 72 * i }));
  c.fill("bellflower", toPath([disc([0, 0], 13)], { k: reach / 100 }));
};

/**
 * The seven treasures, 七宝: a circle, and four arcs of a wider circle struck from outside it on the diagonals. Each cuts a lens
 * from it, and the four lenses meet point to point at the top, the bottom and the two sides, where a small disc stands; the
 * middle is left as a four-pointed star with hollow sides.
 */
export const shippoBuild = (c: Builder, part: string, reach: number): void => {
  const r = 92;
  const placing: Placing = { k: reach / 100 };
  c.guideCircle(C0, r * placing.k);
  c.guideSpokes(4, 0, reach);
  const lenses: Region[] = [];
  for (let i = 0; i < 4; i += 1) {
    const from = polar(r, 90 * i);
    const to = polar(r, 90 + 90 * i);
    const inner = circleThrough(from, to, r * 1.35, polar(r * 3, 45 + 90 * i));
    c.guideCircle(onPage(inner.c, placing), inner.r * placing.k);
    lenses.push([arcA([0, 0], r, 90 * i * DEG, (90 + 90 * i) * DEG), shortArc(inner, to, from)]);
  }
  c.group(() => c.fill(part, toPath(lenses, placing)));
  c.group(() => {
    for (let i = 0; i < 4; i += 1) c.fill(part, toPath([disc(polar(r, 90 * i), 8)], placing));
  });
};

/**
 * The Genji cart wheel, 源氏車: a rim in eight parts, a ring of eight felloes inside it, eight spokes that widen outwards, and a hub.
 */
export const wheelBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  c.guideCircle(C0, reach);
  c.guideCircle(C0, 82 * placing.k);
  c.guideCircle(C0, 62 * placing.k);
  c.guideCircle(C0, 13 * placing.k);
  c.guideSpokes(16, 0, reach);
  // The rim, parted on the spokes' lines; the ring of felloes inside it, parted between them; eight spokes that widen outwards; the hub.
  const cutsAt = (offset: number, from: number, to: number): Region[] => Array.from({ length: 8 }, (_, i) => thickSeg(polar(from, offset + 45 * i), polar(to, offset + 45 * i), 3.5));
  c.fill(part, toPath(carve([disc([0, 0], 100)], [disc([0, 0], 82), ...cutsAt(0, 78, 104)]), placing));
  c.fill(part, toPath(carve([disc([0, 0], 77)], [disc([0, 0], 62), ...cutsAt(22.5, 58, 80)]), placing));
  c.group(() => {
    for (let i = 0; i < 8; i += 1) {
      const out = polar(1, 45 * i);
      const side: V = [-out[1], out[0]];
      const at = (d: number, w: number): V => [out[0] * d + side[0] * w, out[1] * d + side[1] * w];
      c.fill(part, toPath([polygon([at(18, 2.2), at(56, 10), at(56, -10), at(18, -2.2)])], placing));
    }
  });
  c.fill(part, toPath([disc([0, 0], 13)], placing));
};

/** The four eyes, 四つ目結: four squares stood on their corners in a square, a narrow white cross between them, a small square eye in each. */
export const yotsumeBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const half = 46.5;
  c.guideCircle(C0, reach);
  c.guideSpokes(4, 0, reach);
  c.guidePath(toPath([polygon([polar(100, 0), polar(100, 90), polar(100, 180), polar(100, 270)])], placing));
  for (let i = 0; i < 4; i += 1) {
    const [x, y] = polar(50, 90 - 90 * i);
    const square = (h: number): Region => polygon([[x + h, y], [x, y + h], [x - h, y], [x, y - h]]);
    c.fill(part, toPath(carve([square(half)], [square(8)]), placing));
  }
};

/** The Takeda lozenges, 武田菱: a lozenge three wide to two high cut into four like lozenges by a narrow white cross along its sides' directions. */
export const takedaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const a = 100;
  const b = 66;
  const shrink = 1 - 6 / ((a * b) / 2 / Math.hypot(a / 2, b / 2)) / 2;
  // The lozenge's corners: where the level line meets the layout circle, and where the upright one meets a circle of 66.
  c.guideCircle(C0, reach);
  c.guideCircle(C0, b * placing.k);
  c.guideLine(onPage([-a, 0], placing), onPage([a, 0], placing));
  c.guideLine(onPage([0, -b], placing), onPage([0, b], placing));
  c.guidePath(toPath([polygon([[a, 0], [0, b], [-a, 0], [0, -b]])], placing));
  for (const [x, y] of [[0, b / 2], [a / 2, 0], [0, -b / 2], [-a / 2, 0]] as V[]) {
    const ha = (a / 2) * shrink;
    const hb = (b / 2) * shrink;
    c.fill(part, toPath([polygon([[x + ha, y], [x, y + hb], [x - ha, y], [x, y - hb]])], placing));
  }
};

/** The well frame, 井桁: four bars laid as a square on its corner, two leaning each way half a right angle, their ends standing out past the crossings. */
export const igetaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const w = 21;
  const off = 42;
  const long = 72;
  c.guideCircle(C0, reach);
  for (const lean of [45, -45]) {
    const along = polar(1, lean);
    const across = polar(1, lean + 90);
    for (const side of [-1, 1]) {
      const mid: V = [across[0] * off * side, across[1] * off * side];
      const from: V = [mid[0] - along[0] * long, mid[1] - along[1] * long];
      const to: V = [mid[0] + along[0] * long, mid[1] + along[1] * long];
      c.fill(part, toPath([thickSeg(from, to, w)], placing));
    }
  }
};

/** The crescent, 三日月: the disc of the layout circle with a circle of 88 cut from it, struck 18 up and to the left of the centre, so the horns nearly close. */
export const mikazukiBuild = (
  c: Builder,
  part: string,
  reach: number,
  { cutAngle = 135, cutOffset = 18, cutRadius = 88 }: { cutAngle?: number; cutOffset?: number; cutRadius?: number } = {},
): void => {
  const placing: Placing = { k: reach / 100 };
  const cut = polar(cutOffset, cutAngle);
  c.guideCircle(C0, reach);
  c.guideCircle(onPage(cut, placing), cutRadius * placing.k);
  c.fill(part, toPath(carve([disc([0, 0], 100)], [disc(cut, cutRadius)]), placing));
};

/** The hemp leaf, 麻の葉: a six-pointed star, a thin white line from the centre to each point and to each notch, so it is twelve kites. */
export const asanohaBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const corners: V[] = [];
  const white: Region[] = [];
  for (let i = 0; i < 6; i += 1) {
    corners.push(polar(100, 90 + 60 * i), polar(100 / Math.sqrt(3), 120 + 60 * i));
    white.push(thickSeg([0, 0], polar(100, 90 + 60 * i), 2.2), thickSeg([0, 0], polar(100 / Math.sqrt(3), 120 + 60 * i), 2.2));
  }
  c.stepRound(reach);
  c.guideCircle(C0, reach / Math.sqrt(3));
  c.guideSpokes(12, 0, reach);
  c.fill(part, toPath(carve([polygon(corners)], white), placing));
};

/** How far the wood sorrel reaches from the centre, in its own frame: to the far side of a leaf's lobes. */
const KATABAMI = Math.hypot(24, 52) + 29;

/**
 * The wood sorrel, 片喰, as the crest book of 1892 draws it (frame 15): three heart leaves, their points at the centre. A leaf is
 * two circles of 29 about (±24, 52) and the two ruled lines from the centre that touch them. Below where its two circles cross,
 * a small white sepal runs down to the centre between two ruled lines through (0, 8) and (±10, 40), and the centre is a plain disc
 * of 14 in a white ring 2 wide. Drawn at its own size, every compass width is a whole number and every centre a grid point.
 */
const katabamiLeaf = (sworded = false): Region[] => {
  const height = sworded ? 56 : 52;
  const width = sworded ? 34 : 29;
  const sepalTip: V = sworded ? [6, 27] : [10, 40];
  const lobes = [disc([-24, height], width), disc([24, height], width)];
  const d = Math.hypot(24, height);
  const lean = (Math.atan2(24, height) + Math.asin(width / d)) / DEG;
  const touch = (side: number): V => polar(Math.sqrt(d * d - width * width), 90 - side * lean);
  const neck = polygon([[0, 0], touch(-1), [-24, height], [24, height], touch(1)]);
  const sepal = polygon([[0, 8], [-sepalTip[0], sepalTip[1]], sepalTip]);
  const ring = disc([0, 0], 16);
  const inLobe = (p: V): boolean => lobes.some((lobe) => inside(lobe, p));
  return carveWhere(
    [...lobes.flat(), seg([0, 0], touch(-1)), seg([0, 0], touch(1)), ...ring, ...sepal],
    (p) => (inLobe(p) || inside(neck, p)) && !inside(ring, p) && !(inside(sepal, p) && !inLobe(p)),
  );
};

export const katabamiBuild = (c: Builder, part: string, reach = KATABAMI): void => {
  const placing: Placing = { k: reach / KATABAMI };
  const leaf = katabamiLeaf();
  c.guideCircle(C0, reach);
  c.guideSpokes(6, 0, reach);
  for (const axis of [90, 330, 210]) {
    const turn = (axis - 90) * DEG;
    for (const lobe of [-24, 24]) c.guideCircle(onPage([lobe, 52], { ...placing, turn: 90 - axis }), 29 * placing.k);
    c.fill(part, toPath(leaf.map((loop) => loop.map((p) => rotated(p, turn))), placing));
  }
  c.fill(part, toPath([disc([0, 0], 14)], placing));
};

/** One blade has a ruled point and curved sides. Its clearance is struck from the same two centres. */
const sorrelSword = (gap: number): Region => {
  const foot: V = [0, 10];
  const shoulder: V = [27, 86];
  const edge = circleThrough(foot, shoulder, 130, [126, 17]);
  const side = { ...edge, r: edge.r - gap };
  const other = { c: [-edge.c[0], edge.c[1]] as V, r: side.r };
  const a = nearest(lineCircle([0, 8], [1, 8], side.c, side.r), foot);
  const b = nearest(lineCircle([0, 86], [1, 86], side.c, side.r), shoulder);
  const tip: V = [0, 100];
  const mirror = ([x, y]: V): V => [-x, y];

  return [shortArc(side, a, b), seg(b, tip), seg(tip, mirror(b)), shortArc(other, mirror(b), mirror(a)), seg(mirror(a), a)];
};

export const kenKatabamiBuild = (c: Builder, reach: number): void => {
  const turn = (loops: Region[], angle: number): Region[] => loops.map((loop) => loop.map((piece) => rotated(piece, -angle * DEG)));
  const placing: Placing = { k: reach / 100 };
  const blades = [0, 120, 240];
  const openings = blades.flatMap((angle) => turn([sorrelSword(2)], angle));
  const leaf = katabamiLeaf(true);
  const sword = carve([sorrelSword(0)], [disc([0, 0], 16)]);
  c.guideCircle(C0, reach);
  for (const angle of [60, 180, 300]) c.fill("wood-sorrel", toPath(carve(turn(leaf, angle), openings), placing));
  c.fill("wood-sorrel", toPath([disc([0, 0], 14)], placing));
  for (const angle of blades) c.fill("sword", toPath(turn(sword, angle), placing));
};

/**
 * The folding fan, 扇, open: the paper is the band between two arcs about the pivot, 56 degrees each side of upright; a guard
 * runs up each edge and five ribs fan between them. With `sun`, a disc stands on the paper's upper edge, a white line round it.
 */
export const fanBuild = (c: Builder, part: string, sun: string | null, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const pivot: V = [0, sun === null ? -56 : -70];
  const from = (r: number, deg: number): V => [pivot[0] + r * Math.cos(deg * DEG), pivot[1] + r * Math.sin(deg * DEG)];
  const paper: Region = [arcA(pivot, 118, 34 * DEG, 146 * DEG), seg(from(118, 146), from(54, 146)), arcA(pivot, 54, 146 * DEG, 34 * DEG), seg(from(54, 34), from(118, 34))];
  const white: Region[] = [];
  const ribs = [90 - 37.3, 90 - 18.7, 90, 90 + 18.7, 90 + 37.3];
  if (sun === null) for (const deg of ribs) white.push(thickSeg(from(54, deg), from(119, deg), 1.6));
  else white.push(disc(from(114, 90), 28));
  c.guideCircle(onPage(pivot, placing), 118 * placing.k);
  c.guideCircle(onPage(pivot, placing), 54 * placing.k);
  for (const deg of [34, ...ribs, 146]) c.guideLine(onPage(pivot, placing), onPage(from(118, deg), placing));
  c.fill(part, toPath(carve([paper], white), placing));
  c.group(() => {
    for (const deg of ribs) c.fill(part, toPath([thickSeg(from(5, deg), from(56, deg), 2.6)], placing));
    for (const deg of [34, 146]) c.fill(part, toPath([thickSeg(pivot, from(118, deg), 5)], placing));
    c.fill(part, toPath([disc(pivot, 5)], placing));
  });
  if (sun !== null) c.fill(sun, toPath([disc(from(114, 90), 24)], placing));
};

/** The basket eye, 籠目: two equal triangles, one point up and one point down, each a band between two triangles about the centre. */
export const kagomeBuild = (c: Builder, part: string, reach: number, inner = 78): void => {
  const placing: Placing = { k: reach / 100 };
  const triangle = (r: number, up: number): Region => polygon([polar(r, up), polar(r, up + 120), polar(r, up + 240)]);
  c.stepRound(reach);
  // Twelve lines, each ruled full length: the six sides through the stepped marks, and a parallel inside each for the band's inner edge.
  for (const r of [100, inner]) for (const up of [90, 270]) c.guidePath(toPath([triangle(r, up)], placing));
  for (const up of [90, 270]) c.fill(part, toPath(carve([triangle(100, up)], [triangle(inner, up)]), placing));
};

/**
 * The linked rings, 輪違い: two equal rings, each the black between two circles, their centres 58 apart; where they cross, the
 * left ring passes over at the top and under at the bottom, a white line each side of the ring on top.
 */
export const wachigaiBuild = (c: Builder, part: string, reach: number, o: { half: number; outer: number; inner: number } = { half: 29, outer: 68, inner: 54 }): void => {
  const placing: Placing = { k: reach / 100 };
  const centres: V[] = [[-o.half, 0], [o.half, 0]];
  const { outer, inner } = o;
  const gap = 2.5;
  c.guideCircle(C0, reach);
  c.guideLine(onPage([-100, 0], placing), onPage([100, 0], placing));
  for (const centre of centres) for (const r of [outer, inner]) c.guideCircle(onPage(centre, placing), r * placing.k);
  // The gap circles: about each ring's centre, the white line outside its outer edge and inside its inner one.
  for (const centre of centres) for (const r of [outer + gap, inner - gap]) c.gapCircle(onPage(centre, placing), r * placing.k);
  // The band of one ring, widened by the white line, over half its round: what is cut from the other ring where it passes under.
  const over = (centre: V, upper: boolean): Region => thickArc(centre, (outer + inner) / 2, outer - inner + 2 * gap, upper ? 0 : Math.PI, upper ? Math.PI : TAU);
  c.fill(part, toPath(carve([disc(centres[0], outer)], [disc(centres[0], inner), over(centres[1], false)]), placing));
  c.fill(part, toPath(carve([disc(centres[1], outer)], [disc(centres[1], inner), over(centres[0], true)]), placing));
};

/**
 * The mountain cherry, 山桜: five petals round a small disc, each two circles of 19 side by side and the two ruled lines from
 * the centre that touch them, so its tip is notched; on each petal three thin white stamens, each ending in a dot.
 */
export const sakuraBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  c.guideCircle(C0, reach);
  c.guideSpokes(5, 0, reach);
  for (let i = 0; i < 5; i += 1) {
    const axis = 90 + 72 * i;
    const lobes = [polar(79, axis - 14), polar(79, axis + 14)];
    const far = Math.sqrt(79 * 79 - 20 * 20);
    const lean = 14 + Math.asin(20 / 79) / DEG;
    for (const lobe of lobes) c.guideCircle(onPage(lobe, placing), 20 * placing.k);
    const white: Region[] = [];
    for (const [off, to] of [[0, 56], [-13, 46], [13, 46]]) white.push(thickSeg(polar(20, axis + off), polar(to, axis + off), 1.6), disc(polar(to + 2, axis + off), 2.8));
    c.fill(part, toPath(carve([disc(lobes[0], 20), disc(lobes[1], 20), polygon([[0, 0], polar(far, axis - lean), lobes[0], lobes[1], polar(far, axis + lean)])], white), placing));
  }
  c.fill(part, toPath([disc([0, 0], 7)], placing));
};
