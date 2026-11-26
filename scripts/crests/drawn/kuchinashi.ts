// Gardenia forms measured from frame 27 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, rotated, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const gardeniaArc = (from: V, to: V, radius: number, hint: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, hint), from, to);

/** Three curved diamonds and three rim scallops divide the dark roundel. */
export const mitsuwariKuchinashiBuild = (c: Builder): void => {
  c.precision(3);
  const near: V = [0, 5];
  const bend: V = [20, 49];
  const tip: V = [0, 76];
  const side = [gardeniaArc(near, bend, 55, [50, 10]), gardeniaArc(bend, tip, 39, [34, 75])];
  const aperture = [...side, ...reversedRun(side.map(mirrored))];
  const cuts = [60, 180, 300].map((turn) => aperture.map((piece) => rotated(piece, turn * DEG)));
  for (const turn of [0, 120, 240]) cuts.push(disc([0, 97], 13).map((piece) => rotated(piece, turn * DEG)));
  c.guideCircle(C0, 96);
  c.guideSpokes(6, 0, 96);
  c.fill("gardenia", toPath(carve([disc([0, 0], 96)], cuts), { k: 1 }));
};

/** Three gardenia cups alternate with flared points inside their own enclosing ring. */
export const maruNiMitsuKuchinashiBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const heel: V = [0, 24];
  const near: V = [15, 33];
  const shoulder: V = [25, 65];
  const banner: V = [12, 68];
  const tip: V = [0, 78];
  const cupSide = [gardeniaArc(heel, near, 23, [0, 47]), gardeniaArc(near, shoulder, 67, [78, 34]),
    gardeniaArc(shoulder, banner, 30, [20, 38]), gardeniaArc(banner, tip, 23, [17, 85])];
  const cup = [...cupSide, ...reversedRun(cupSide.map(mirrored))];
  const point: V = [0, 79];
  const tipSide: V = [22, 59];
  const neck: V = [3, 15];
  const armHalf = [gardeniaArc(point, tipSide, 57, [44, 102]), gardeniaArc(tipSide, neck, 79, [78, 17])];
  const pointArm = [...armHalf, gardeniaArc(neck, [-3, 15], 20, [0, -5]), ...reversedRun(armHalf.map(mirrored))];
  const insert = carve([cup], [thickSeg([0, 47], [0, 72], 2.15), thickSeg([-5, 48], [-16, 63], 1.8), thickSeg([5, 48], [16, 63], 1.8)]);
  const stem = thickSeg([0, 10], [0, 24], 4.5);
  const centre = carve([disc([0, 0], 11)], [disc([0, 0], 3.1)]);
  const k = reach / 85;
  c.guideSpokes(6, 0, reach);
  c.fill("gardenia", toPath(centre, { k }));
  for (const turn of [0, 120, 240]) {
    c.fill("gardenia", toPath([stem, ...insert], { k, turn }));
    c.fill("gardenia", toPath([pointArm], { k, turn: turn + 60 }));
  }
};
