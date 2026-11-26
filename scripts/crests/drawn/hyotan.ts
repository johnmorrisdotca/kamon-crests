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
