// Jewel figures measured from frame 21 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, disc, onCircle, thickArc, toPath } from "../../construct/compass.ts";

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
