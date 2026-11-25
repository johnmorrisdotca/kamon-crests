// Crossed hawk feathers, 違い鷹の羽, ruled and struck. Their proportions were measured from a picture of the ringed crest and
// checked against the crest book of 1892 (伊呂波分新撰紋帳, frame 21); the drawing is this construction.
//
// A feather is set out lying along the x axis, its tip to the right, in units of a hundredth of its reach: the crossing at
// (0, 0), the tip at 100 and the end of the quill at -100. Both feathers are that one feather turned an eighth of a turn each way.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, arcA, carve, moved, onPage, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

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
const vane = (grow = 0): Region => {
  const r = HALF + grow;

  return [arcA(TIP, r, -90 * DEG, 90 * DEG), seg([TIP[0], r], [QUILL[0], r]), arcA(QUILL, r, 90 * DEG, 270 * DEG), seg([QUILL[0], -r], [TIP[0], -r])];
};

const black: Region[] = [vane(), thickSeg([-100, 0], [0, 0], CORE), ...DOWN.map((r) => thickArc(QUILL, r, 1.5, 130 * DEG, 230 * DEG))];
const white: Region[] = [];
for (const side of [-1, 1]) white.push(thickSeg([-101, (side * (CORE + SHAFT_LINE)) / 2], [101, (side * (CORE + SHAFT_LINE)) / 2], SHAFT_LINE));
for (const bar of BARS) {
  for (const j of [-1, 0, 1]) {
    const point = bar + j * BAR_PITCH * Math.SQRT2;
    for (const side of [-1, 1]) white.push(thickSeg([point + CORE / 2 + 1, side * (CORE / 2 + 1)], [point + 70, side * 70], BAR_LINE));
  }
}

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
