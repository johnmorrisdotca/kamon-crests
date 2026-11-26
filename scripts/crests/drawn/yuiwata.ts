import type { Builder } from "../../construct/builder.ts";
import { carve, lineLine, mirrored, onCircle, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type ArcDraft = [start: V, middle: V, end: V];

const bisector = ([ax, ay]: V, [bx, by]: V): [V, V] => {
  const mid: V = [(ax + bx) / 2, (ay + by) / 2];
  return [mid, [mid[0] + ay - by, mid[1] + bx - ax]];
};

const draftArc = ([from, middle, to]: ArcDraft) => {
  const c = lineLine(...bisector(from, middle), ...bisector(middle, to));
  return shortArc({ c, r: vdist(c, from) }, from, to);
};

const upper: ArcDraft[] = [
  [[0, 104], [10, 105], [21, 101]], [[21, 101], [33, 101.5], [44, 94]],
  [[44, 94], [57, 94], [68, 84]], [[68, 84], [77, 80], [80, 71]],
  [[80, 71], [85, 63], [83, 52]], [[83, 52], [89, 44], [88, 33]],
  [[88, 33], [92.5, 19], [88, 6]], [[88, 6], [82, -3], [72, 1]],
  [[72, 1], [57, 14], [41, 20]], [[41, 20], [29, 18], [23, 8]],
];

const lower: ArcDraft[] = [
  [[0, -67], [10, -66], [16, -60]], [[16, -60], [32, -63], [48, -57]],
  [[48, -57], [52, -50], [48, -44]], [[48, -44], [65, -41], [73, -31]],
  [[73, -31], [66, -20], [52, -17]], [[52, -17], [37, -17.5], [23, -8]],
];

const folds: ArcDraft[] = [
  [[6, 8], [14, 58], [46, 98]], [[16, 8], [42, 46], [83, 52]],
  [[6, -7], [11, -35], [17, -63]], [[16, -7], [26, -31], [52, -45]],
];

const cottonBundle = (wide: number, high: number): Region[] => {
  const scale = ([x, y]: V): V => [x * wide, y * high];
  const sizedArc = ([a, b, c]: ArcDraft) => draftArc([scale(a), scale(b), scale(c)]);
  const half = (draft: ArcDraft[], tie: V): Region => {
    const right = draft.map(sizedArc);
    return [...right, seg(scale(tie), scale([-tie[0], tie[1]])), ...reversedRun(right.map(mirrored))];
  };
  const fan = half(upper, [23, 8]);
  const fringe = half(lower, [23, -8]);
  const grooves = folds.map((fold): Region => {
    const edge = sizedArc(fold);
    if (edge.t !== "A") throw new Error("Cotton folds use compass arcs");
    return thickArc(edge.c, edge.r, 2.3, edge.a0, edge.a1);
  });
  const openFolds = [...grooves, ...grooves.map((line) => line.map(mirrored))];
  const binding = [-5, 0, 5].map((y) => thickSeg(scale([-23.5, y]), scale([23.5, y]), 3.1 * high));

  return [...carve([fan, fringe], openFolds), ...binding];
};

const layCotton = (c: Builder, wide: number, high: number, places: Placing[]): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const bundle = cottonBundle(wide, high);
  for (const place of places) c.fill("cotton-bundle", toPath(bundle, place), "evenodd");
};

export const yuiwataBuild = (c: Builder): void => {
  layCotton(c, 1, 1, [{ k: 1, at: [0, -20] }]);
};

export const mitsuYuiwataBuild = (c: Builder): void => {
  layCotton(c, 0.73, 0.43, [0, 120, 240].map((turn) => ({
    k: 1, turn, at: onCircle([0, 0], 44, (90 - turn) * Math.PI / 180),
  })));
};
