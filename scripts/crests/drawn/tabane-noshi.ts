// 束ね熨斗, as the 1892 crest book draws たば糸のし (frame 26, right page, third row, third column from the right): strips of noshi
// paper gathered at the middle by a tie and spread out above and below it into a round, the outermost strips at each side curling
// round an open loop. The book's four quarters differ by up to 13; each point here is the average of the upper and the lower
// quarter on the right, and the crest is the same left and right and above and below. Every curve is a compass arc struck through
// three measured points; the numbers are the book's pixels from the middle of the tie, y up.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, mirrored, reversedRun, rotated, seg, thickArc, thickSeg, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
const ccw = (a: V, b: V, c: V): boolean => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
/** The arc from `a` through `b` to `c`. */
const arc3 = (a: V, b: V, c: V): Piece => arcTo(through(a, b, c), a, c, ccw(a, b, c));
/** A white line `w` wide along the arc from `a` through `b` to `c`. */
const line3 = (a: V, b: V, c: V, w: number): Region => {
  const circle = through(a, b, c);
  const angle = (p: V): number => Math.atan2(p[1] - circle.c[1], p[0] - circle.c[0]);
  const a0 = angle(a);
  let a1 = angle(c);
  if (ccw(a, b, c)) while (a1 < a0) a1 += 2 * Math.PI;
  else while (a1 > a0) a1 -= 2 * Math.PI;
  return thickArc(circle.c, circle.r, w, Math.min(a0, a1), Math.max(a0, a1));
};

const flipX = (region: Region): Region => reversedRun(region.map(mirrored));
const flipY = (region: Region): Region => reversedRun(region.map((p) => rotated(mirrored(p), Math.PI)));
const quarters = (region: Region): Region[] => [region, flipX(region), flipY(region), flipX(flipY(region))];

/** The rim's points, from the top round to the side, and a point on each arc between them. */
const RIM: V[] = [[0, 150.5], [46, 138.6], [96, 120], [124.6, 80.8], [147.5, 0]];
const RIM_MID: V[] = [[71.8, 133.5], [113.2, 102.1], [141, 50]];
/** The lines between the strips: from the tie's top to the rim, each through a measured point. */
const LINES: [V, V][] = [[[6.8, 24], [18.2, 82.9]], [[21, 24], [46.8, 87.2]], [[28.2, 24], [72.5, 77.2]]];
/** The loop's inner edge, from the tie's corner to the side of the rim. */
const LOOP: [V, V, V] = [[35, 24], [95.4, 52.2], [147.5, 0]];
const TIE = { half: 35, high: 24, stripes: [13.8, 4.6, -4.6, -13.8] };
const LINE = 3;
const PARTING = 2.5;

export const tabaneNoshiBuild = (c: Builder): void => {
  const [top, pa] = [RIM[0], RIM[1]];
  const side: Piece[] = RIM_MID.map((m, i) => arc3(RIM[i + 1], m, RIM[i + 2]));
  const outline: Region = [
    arc3([-pa[0], pa[1]], top, pa),
    ...side,
    ...flipY(side),
    arc3([pa[0], -pa[1]], [0, -top[1]], [-pa[0], -pa[1]]),
    ...flipX(flipY(side)),
    ...flipX(side),
  ];
  const hole: Region = [arc3(...LOOP), arc3(LOOP[2], [LOOP[1][0], -LOOP[1][1]], [LOOP[0][0], -LOOP[0][1]]), seg([LOOP[0][0], -LOOP[0][1]], LOOP[0])];
  const lines = LINES.flatMap(([start, mid], i) => quarters(line3(start, mid, RIM[i + 1], LINE)));
  const tie: Region = [seg([-TIE.half, TIE.high], [TIE.half, TIE.high]), seg([TIE.half, TIE.high], [TIE.half, -TIE.high]), seg([TIE.half, -TIE.high], [-TIE.half, -TIE.high]), seg([-TIE.half, -TIE.high], [-TIE.half, TIE.high])];
  const tieScreen: Region = [seg([-TIE.half - PARTING, TIE.high + PARTING], [TIE.half + PARTING, TIE.high + PARTING]), seg([TIE.half + PARTING, TIE.high + PARTING], [TIE.half + PARTING, -TIE.high - PARTING]), seg([TIE.half + PARTING, -TIE.high - PARTING], [-TIE.half - PARTING, -TIE.high - PARTING]), seg([-TIE.half - PARTING, -TIE.high - PARTING], [-TIE.half - PARTING, TIE.high + PARTING])];
  const reach = Math.max(...RIM.map(([x, y]) => Math.hypot(x, y)), ...RIM_MID.map(([x, y]) => Math.hypot(x, y)));
  const placing = { k: R / reach };
  c.guideCircle(C0, R);
  c.fill("noshi", toPath(carve([outline], [hole, flipX(hole), ...lines, tieScreen]), placing));
  c.fill("noshi", toPath(carve([tie], TIE.stripes.map((y) => thickSeg([-TIE.half - 5, y], [TIE.half + 5, y], LINE))), placing));
};
