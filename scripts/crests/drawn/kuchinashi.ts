// Gardenia forms measured from frame 27 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, rotated, shortArc, toPath } from "../../construct/compass.ts";
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
