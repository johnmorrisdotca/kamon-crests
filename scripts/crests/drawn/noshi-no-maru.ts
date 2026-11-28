// 熨斗の丸, as the 1892 crest book draws のし丸 (frame 26, right page, second row, fourth column from the right): five strips of
// noshi paper bent into nested loops, each folded over at the top in a small triangle, gathered at the foot by a tie, with the ends of
// the innermost strips fanning up inside. The numbers are the book's pixels from the middle of the crest, y up.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carve, disc, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/**
 * The six lines of the loops, outermost first: circles on the upright, each through its top and its width 4 below the middle, so
 * that their centres fall as they shrink and the strips between them narrow towards the tie.
 */
const LOOPS: [number, number][] = [[-2.9, 148.9], [-11.4, 133.4], [-18.1, 116.1], [-32, 96], [-36.1, 79.6], [-36.7, 59.2]];
const LINE = 3;
/** The tie: 56 across, from 98 to 148 below the middle, with two white lines at its thirds. */
const TIE = { half: 28, top: -98, bottom: -148 };
/** Each fold: a triangle from the top of its strip's outer line to 17 either side on its inner line. */
const FOLD = 17;
const PARTING = 2.5;

const box = (x0: number, y0: number, x1: number, y1: number): Region => [seg([x0, y0], [x1, y0]), seg([x1, y0], [x1, y1]), seg([x1, y1], [x0, y1]), seg([x0, y1], [x0, y0])];
const quad = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));
const ring = (c: V, r: number): Region[] => [thickArc(c, r, LINE, 0, 180 * DEG), thickArc(c, r, LINE, 180 * DEG, 360 * DEG)];

export const noshiNoMaruBuild = (c: Builder): void => {
  const [outer] = LOOPS;
  const inner = LOOPS[LOOPS.length - 1];
  const reach = Math.max(outer[1] + LINE / 2 + Math.abs(outer[0]), Math.hypot(TIE.half, TIE.bottom));
  const placing = { k: R / reach };
  const tie = box(-TIE.half, TIE.top, TIE.half, TIE.bottom);
  const tieScreen = box(-TIE.half - PARTING, TIE.top + PARTING, TIE.half + PARTING, -400);
  const lines = LOOPS.slice(1, -1).flatMap(([y, r]) => ring([0, y], r));
  const folds = LOOPS.slice(0, -1).flatMap(([y, r], i) => {
    const [y2, r2] = LOOPS[i + 1];
    const apex: V = [0, y + r];
    const foot = y2 + Math.sqrt(r2 ** 2 - FOLD ** 2);
    return [thickSeg(apex, [-FOLD, foot], LINE), thickSeg(apex, [FOLD, foot], LINE)];
  });
  c.guideCircle(C0, R);
  for (const [y, r] of LOOPS) c.guideCircle([C0[0], C0[1] - y * placing.k], r * placing.k);
  c.fill("noshi", toPath(carve([disc([0, outer[0]], outer[1] + LINE / 2)], [disc([0, inner[0]], inner[1] - LINE / 2), ...lines, ...folds, tieScreen]), placing));
  // The ends of the innermost strips fan up out of the tie, two on each side.
  for (const side of [-1, 1]) {
    for (const [base, top] of [[[33.5, 22], [40, 28]], [[20, 4], [25, 14]]] as [V, V][]) {
      c.fill("noshi", toPath([quad([[side * base[0], TIE.top + PARTING], [side * base[1], TIE.top + PARTING], [side * top[1], -46], [side * top[0], -46]])], placing));
    }
  }
  const third = (2 * TIE.half) / 3;
  c.fill("noshi", toPath(carve([tie], [-third / 2, third / 2].map((x) => thickSeg([x, TIE.top + 10], [x, TIE.bottom - 10], LINE))), placing));
};
