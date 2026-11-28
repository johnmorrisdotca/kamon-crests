// Three offset rounded bars joined into one haze, with a crescent cut out of it, from frame 23 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, disc, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** A rectangle with round corners of radius `r`, from its left and bottom edges to its right and top edges. */
const bar = (left: number, bottom: number, right: number, top: number, r: number): Region => [
  seg([left + r, bottom], [right - r, bottom]),
  arcA([right - r, bottom + r], r, -Math.PI / 2, 0),
  seg([right, bottom + r], [right, top - r]),
  arcA([right - r, top - r], r, 0, Math.PI / 2),
  seg([right - r, top], [left + r, top]),
  arcA([left + r, top - r], r, Math.PI / 2, Math.PI),
  seg([left, top - r], [left, bottom + r]),
  arcA([left + r, bottom + r], r, Math.PI, (3 * Math.PI) / 2),
];

export const kasumiZukiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const top = bar(-50.4, 27.7, 51.2, 62.2, 12);
  const middle = bar(-73.1, -21.8, 73.1, 19.3, 20);
  const bottom = bar(-54.6, -62.2, 50.4, -27.7, 14);
  const upperJoin = bar(-21, 18.8, 51.2, 28.2, 0.4);
  const lowerJoin = bar(-29, -28.2, 24, -21.3, 0.4);
  const upperSlit = disc([-21, 23.5], 4.2);
  const lowerLeftSlit = disc([-29, -24.75], 2.95);
  const lowerRightSlit = disc([24, -24.75], 2.95);
  const centreA: V = [-11.1, 26.4];
  const centreB: V = [-14.2, 31.5];
  const moon = carve([disc(centreA, 48.8)], [disc(centreB, 49.1)]);
  const haze = carve([top, middle, bottom, upperJoin, lowerJoin], [upperSlit, lowerLeftSlit, lowerRightSlit]);
  c.fill("cloud", toPath(carve(haze, moon), { k: 1 }), "evenodd");
};
