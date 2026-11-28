// Crossed hawk feathers, 違い鷹の羽, ruled and struck. Their proportions were measured from a picture of the ringed crest and
// checked against the crest book of 1892 (伊呂波分新撰紋帳, frame 21); the drawing is this construction.
//
// A feather is set out lying along the x axis, its tip to the right, in units of a hundredth of its reach: the crossing at
// (0, 0), the tip at 100 and the end of the quill at -100. Both feathers are that one feather turned an eighth of a turn each way.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, arcA, carve, disc, moved, onPage, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { centred } from "./arms.ts";

/** Half the feather's width: its two sides are ruled 43 from the shaft. */
const HALF = 43;
/** The round tip: a half circle of the feather's own width on the grid point (57, 0), so that it reaches 100. */
const TIP: V = [57, 0];
/** The round quill end: the same half circle on (-43, 0). */
const QUILL: V = [-43, 0];
/** The down at the quill end: three arcs about the quill end's centre, 1.5 wide and 3 apart, 50 degrees each side of the shaft. */
const DOWN = [45.25, 48.25, 51.25];
/** The shaft: a black core 4 wide the whole length, with a white line 2 wide along each side of it. */
const CORE = 4;
const SHAFT_LINE = 2;
/** The two bars across the feather, each three white chevrons 1.7 wide and 7.5 apart, their points on the shaft, their arms at half a right angle to it, towards the tip. */
const BARS = [22, -46];
const BAR_LINE = 1.7;
const BAR_PITCH = 7.5;
/** The white left between the feather in front and the one behind. */
const PARTING = 1.5;

/** A feather's outline: two ruled sides and the two half circles, `grow` wider all round. */
const vane = (grow = 0, half = HALF, tip = TIP, quill = QUILL): Region => {
  const r = half + grow;

  return [arcA(tip, r, -90 * DEG, 90 * DEG), seg([tip[0], r], [quill[0], r]), arcA(quill, r, 90 * DEG, 270 * DEG), seg([quill[0], -r], [tip[0], -r])];
};

const black: Region[] = [vane(), thickSeg([-100, 0], [0, 0], CORE), ...DOWN.map((r) => thickArc(QUILL, r, 1.5, 130 * DEG, 230 * DEG))];
/** The white lines: beside the shaft out to `ends`, and the chevrons `step` apart along it, their arms rising `slope` along the shaft for each unit out. */
const featherWhite = (bars: number[], step = BAR_PITCH * Math.SQRT2, slope = 1, ends = 101): Region[] => {
  const white: Region[] = [];
  for (const side of [-1, 1]) white.push(thickSeg([-ends, (side * (CORE + SHAFT_LINE)) / 2], [ends, (side * (CORE + SHAFT_LINE)) / 2], SHAFT_LINE));
  for (const bar of bars) {
    for (const j of [-1, 0, 1]) {
      const point = bar + j * step;
      for (const side of [-1, 1]) white.push(thickSeg([point + slope * (CORE / 2 + 1), side * (CORE / 2 + 1)], [point + slope * 70, side * 70], BAR_LINE));
    }
  }
  return white;
};
const white = featherWhite(BARS);

const turnAll = (regions: Region[], deg: number): Region[] => regions.map((region) => region.map((p) => rotated(p, deg * DEG)));

/** The feather in front: its tip to the upper right. */
const front = carve(turnAll(black, 45), turnAll(white, 45));
/** The feather behind, its tip to the upper left, cut away where the one in front lies over it, a white parting clear of it. */
const behind = carve(turnAll(black, 135), [...turnAll(white, 135), ...turnAll([vane(PARTING)], 45)]);

/** Draws the crossed feathers to reach `reach` from the page's centre. */
export const takanohaBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  c.guideCircle(C0, reach);
  for (const deg of [45, 135]) {
    // The shaft, the two sides ruled beside it, and the circles of the two round ends.
    const along = (s: number, t: number): V => [s * Math.cos(deg * DEG) - t * Math.sin(deg * DEG), s * Math.sin(deg * DEG) + t * Math.cos(deg * DEG)];
    c.guideLine(onPage(along(-100, 0), placing), onPage(along(100, 0), placing));
    for (const side of [-1, 1]) c.guideLine(onPage(along(QUILL[0], side * HALF), placing), onPage(along(TIP[0], side * HALF), placing));
    for (const end of [TIP, QUILL]) c.guideCircle(onPage(along(end[0], 0), placing), HALF * placing.k);
    c.guideCircle(onPage(along(QUILL[0], 0), placing), DOWN[2] * placing.k);
  }
  c.group(() => c.fill("hawk-feather", toPath(behind, placing)));
  c.group(() => c.fill("hawk-feather", toPath(front, placing)));
};

/** A feather standing upright, its tip up: the feather turned a quarter, and moved `dx` across and `dy` up in the construction's units. */
const upright = (regions: Region[], dx: number, dy: number): Region[] => turnAll(regions, 90).map((region) => region.map((p) => moved(p, [dx, dy])));

/**
 * Draws upright hawk feathers, tips up, each `across` from the middle of the crest, at `scale` of the crossed feathers' size inside
 * `reach`. A feather's middle stands 7 above the crossing, so it is moved down by that much.
 */
export const uprightTakanohaBuild = (c: Builder, reach: number, scale: number, across: number[]): void => {
  const placing: Placing = { k: (reach * scale) / 100 };
  c.guideCircle(C0, reach);
  for (const at of across) {
    const dx = at / placing.k;
    const dy = -7;
    const point = (x: number, y: number): V => onPage([x + dx, y + dy], placing);
    // The shaft, the two sides ruled beside it, and the circles of the two round ends.
    c.guideLine(point(0, -100), point(0, 100));
    for (const side of [-1, 1]) c.guideLine(point(side * HALF, QUILL[0]), point(side * HALF, TIP[0]));
    for (const end of [TIP, QUILL]) c.guideCircle(point(0, end[0]), HALF * placing.k);
    c.guideCircle(point(0, QUILL[0]), DOWN[2] * placing.k);
    c.group(() => c.fill("hawk-feather", toPath(carve(upright(black, dx, dy), upright(white, dx, dy)), placing)));
  }
};

/**
 * 三本並び鷹 (frame 21, right r3c3): three upright feathers of the book's own proportions, their width the crossed pair's. From the
 * tip to the end of the quill 236, the outer arc of down 230 below the tip; the chevrons' middles 59 and 150 below the tip, 12 apart, their
 * arms rising 0.62 along the shaft for each unit out; the feathers 97.8 apart.
 */
const ROW_TIP: V = [75, 0];
const ROW_QUILL: V = [-60, 0];
const ROW_END = 118;
const ROW_APART = 97.8;

export const narabiTakanohaRowBuild = (c: Builder, reach: number): void => {
  const across = [-ROW_APART, 0, ROW_APART];
  const ink = [vane(0, HALF, ROW_TIP, ROW_QUILL), thickSeg([-ROW_END, 0], [0, 0], CORE), ...DOWN.map((r) => thickArc(ROW_QUILL, r, 1.5, 130 * DEG, 230 * DEG))];
  const cut = featherWhite([59, -32], 12, 0.62, ROW_END + 1);
  const { sets, placing, up } = centred(across.flatMap((dx) => [upright(ink, dx, 0), upright(cut, dx, 0)]), reach);
  c.guideCircle(C0, reach);
  for (const dx of across) {
    const point = (x: number, y: number): V => onPage([x + dx, y - up], placing);
    c.guideLine(point(0, -ROW_END), point(0, ROW_END));
    for (const side of [-1, 1]) c.guideLine(point(side * HALF, ROW_QUILL[0]), point(side * HALF, ROW_TIP[0]));
    for (const end of [ROW_TIP, ROW_QUILL]) c.guideCircle(point(0, end[0]), HALF * placing.k);
  }
  for (let i = 0; i < sets.length; i += 2) c.group(() => c.fill("hawk-feather", toPath(carve(sets[i], sets[i + 1]), placing)));
};

/** The rounded, straight-sided vane of the published feather, with the widths of the neighbouring book impressions. */
const shortFeather = (half: number, grow = 0): Region => vane(grow, half, [100 - half, 0], [-86 + half, 0]);
const featherInk = (half: number): Region[] => [shortFeather(half), thickSeg([-91, 0], [0, 0], CORE)];
const bookWhite = featherWhite([51, -12, -68]);
const translated = (regions: Region[], at: V): Region[] => regions.map((region) => region.map((piece) => moved(piece, at)));

/** Three or eight feathers grow from the hub in the wheel impressions at frame 21, right r1c3 and r2c3. */
export const radialHawkFeathersBuild = (c: Builder, reach: number, count: 3 | 8): void => {
  const base = count === 8 ? 28 : 27;
  const hub = count === 8 ? 30 : 25;
  const offset: V = [86 + base, 0];
  const locating = { k: reach / (100 + offset[0]) };
  const boundary = 400 * Math.tan(Math.PI / count) - 1.85;
  const outside = count === 8 ? [-1, 1].map((side): Region => {
    const points: V[] = [[0, -1.85 * side], [400, boundary * side], [400, 400 * side], [0, 400 * side]];
    return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  }) : [];
  const ink = carve(translated(featherInk(41), offset), [...translated(bookWhite, offset), disc([0, 0], hub + 2.1), ...outside]);
  for (let i = 0; i < count; i += 1) c.group(() => c.fill("hawk-feather", toPath(turnAll(ink, 90 - i * 360 / count), locating)));
  const hubCut = count === 3 ? [disc([0, 0], 4.5)] : [];
  c.fill("hawk-feather", toPath(carve([disc([0, 0], hub)], hubCut), locating));
};

/** At frame 21, right r1c4, the vertical feather crosses in front of two equally inclined feathers. */
export const threeCrossedHawkFeathersBuild = (c: Builder, reach: number): void => {
  const half = 36;
  const angles = [24, 156, 90];
  const feather = featherInk(half);
  const screen = shortFeather(half, PARTING);
  const outlines = angles.map((angle, i): [Region[], Region[]] => [
    turnAll(feather, angle),
    [...turnAll(bookWhite, angle), ...angles.slice(i + 1).flatMap((front) => turnAll([screen], front))],
  ]);
  const { sets, placing } = centred(outlines.flat(), reach, true);
  for (let i = 0; i < sets.length; i += 2) c.group(() => c.fill("hawk-feather", toPath(carve(sets[i], sets[i + 1]), placing)));
};

export const kokumochiChigaiTakanohaBuild = (c: Builder): void => {
  c.precision(3);
  const k = 84 / 100;
  const ground = disc([0, 0], R / k);
  c.guideCircle(C0, R);
  c.fill("hawk-feather", toPath([ground, ...behind, ...front], { k }), "evenodd");
};
