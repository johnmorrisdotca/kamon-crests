// Jewel figures measured from frame 21 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, onCircle, reversedRun, shortArc, thickArc, toPath, type Region, type V } from "../../construct/compass.ts";

/** Five broad jewel faces turn around the same point. */
export const itsutsuTamaBuild = (c: Builder): void => {
  c.precision(3);
  const next = onCircle([0, 0], 44, 18 * DEG);
  const face = [disc([0, 44], 52)];
  const bands = [
    disc(next, 52.7),
    thickArc([0, 39], 34.5, 2.45, 74 * DEG, 214 * DEG),
    thickArc([0, 29], 23.25, 2.45, 78 * DEG, 225 * DEG),
    thickArc([0, 17], 13.5, 2.3, 88 * DEG, 236 * DEG),
  ];
  const bead = carve(face, bands);
  c.guideCircle(C0, 96);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("sacred-jewel", toPath(bead, { k: .983, turn }));
};

const jewelBow = (start: V, end: V, r: number, hint: V): Region[number] =>
  shortArc(circleThrough(start, end, r, hint), start, end);

const layeredJewel = (): Region[] => {
  const tip: V = [0, 94];
  const upper: V = [28, 62];
  const shoulder: V = [58, 32];
  const waist: V = [66, -3];
  const foot: V = [0, -78];
  const half = [
    jewelBow(tip, upper, 80, [-48, 94]),
    jewelBow(upper, shoulder, 88, [-27, 20]),
    jewelBow(shoulder, waist, 75, [-3, 1]),
    jewelBow(waist, foot, 71, [-1, -6]),
  ];
  const shell = [...half, ...reversedRun(half.map(mirrored))];
  return carve([shell], [
    thickArc([0, 69], 18, 2.6, 182 * DEG, 358 * DEG),
    thickArc([0, 51], 34, 2.7, 182 * DEG, 358 * DEG),
    thickArc([0, 30], 54, 2.75, 195 * DEG, 345 * DEG),
  ]);
};

/** Three jewels turn their pointed ends toward the enclosing circle. */
export const chuwaNiMitsuTamaBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const bead = layeredJewel();
  c.guideSpokes(6, 0, reach);
  for (const turn of [0, 120, 240]) {
    const at = onCircle([0, 0], reach * .46, (90 - turn) * DEG);
    c.fill("sacred-jewel", toPath(bead, { k: reach * .0049, at, turn }));
  }
};
