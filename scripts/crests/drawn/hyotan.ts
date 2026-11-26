// Bottle-gourd arrangements from frame 44 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { circleThrough, mirrored, reversedRun, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const gourdArc = (from: V, to: V, radius: number, hint: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, hint), from, to);

const radiantGourd = (width: number, waist: number, neck: number): Region => {
  const tip: V = [0, 96];
  const shoulder: V = [width, 70];
  const bend: V = [waist, 51];
  const smallBulb: V = [width * 0.58, 37];
  const stemStart: V = [neck, 23];
  const stemEnd: V = [neck * 0.78, 11];
  const side = [
    gourdArc(tip, shoulder, 29, [0, 69]),
    gourdArc(shoulder, bend, 24, [1, 67]),
    gourdArc(bend, smallBulb, 18, [28, 49]),
    gourdArc(smallBulb, stemStart, 15, [0, 35]),
    gourdArc(stemStart, stemEnd, 16, [21, 16]),
  ];
  return [...side, seg(stemEnd, [-stemEnd[0], stemEnd[1]]), ...reversedRun(side.map(mirrored))];
};

/** Five bottle gourds point their stems toward a small open centre. */
export const itsutsuHyotanBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, 96);
  for (const turn of [0, 72, 144, 216, 288]) {
    c.fill("bottle-gourd", toPath([radiantGourd(26, 17, 7)], { k: 1, turn }));
  }
};

/** The single upright bottle gourd nearly meets the inner edge of the circle. */
export const maruNiHyotanBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const stem: V = [5, 91];
  const neck: V = [7.8, 78];
  const upperSide: V = [27, 50];
  const waist: V = [22, 15];
  const bottomSide: V = [37, -39];
  const foot: V = [0, -86];
  const side = [
    gourdArc(stem, neck, 31, [31, 88]),
    gourdArc(neck, upperSide, 32, [-3, 49]),
    gourdArc(upperSide, waist, 44, [-13, 38]),
    gourdArc(waist, bottomSide, 65, [-25, -29]),
    gourdArc(bottomSide, foot, 45, [-6, -36]),
  ];
  const outline = [seg([-stem[0], stem[1]], stem), ...side, ...reversedRun(side.map(mirrored))];
  c.guideLine([100, 11], [100, 189]);
  c.fill("bottle-gourd", toPath([outline], { k: reach / 100 }));
};
