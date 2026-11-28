// 三つ笠の丸, as the 1892 crest book draws 三ッかさの丸 (frame 16, left page, second row, first column from the right): three hats
// seen from below, their brims meeting tip to tip on one circle so that their tops make a round, a small crown standing out from
// each. Under each brim's front edge the hollow of the hat shows, with two cords hanging in it. Every curve is a compass arc; the
// numbers are the cell's pixels from the circle's centre, y up, for the top hat.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, disc, lineLine, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};
const lineVia = (a: V, m: V, b: V, w: number): Region => {
  const arc = arcVia(a, m, b);
  if (arc.t !== "A") return [];
  return thickArc(arc.c, arc.r, w, arc.a0, arc.a1);
};
/** The point `r` out at clock angle `deg`. */
const at = (r: number, deg: number): V => [r * Math.sin((deg * Math.PI) / 180), r * Math.cos((deg * Math.PI) / 180)];

/** The round's outside 153 out; the brims' tips on it, 60 degrees either side of each hat's middle. */
const OUTSIDE = 153;
/** The brim's front edge bows down to 100 out; the hollow's lower edge, a line 4 wide, to 44.5. */
const [BRIM, HOLLOW] = [100, 44.5];
/** The crown: a disc of 23 standing on the round, 148 out. */
const CROWN = { at: 148, r: 23 };
/** The two cords, each a line 5 wide struck through three points, their ends tucked under the brim. */
const CORDS: [V, V, V][] = [
  [[-95, 92], [-30, 60], [27, 103]],
  [[-45, 103], [15, 51], [80, 95]],
];

export const mitsuKasaNoMaruBuild = (c: Builder): void => {
  const [left, right] = [at(OUTSIDE, -60), at(OUTSIDE, 60)];
  const top: Region = [arcTo({ c: [0, 0], r: OUTSIDE }, right, left, true), arcVia(left, [0, BRIM], right)];
  const hollow = lineVia(at(OUTSIDE - 2, -60), [0, HOLLOW], at(OUTSIDE - 2, 60), 4);
  const cords = CORDS.map(([a, m, b]) => lineVia(a, m, b, 5));
  const k = R / (CROWN.at + CROWN.r);
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      for (const part of [top, disc([0, CROWN.at], CROWN.r), hollow, ...cords]) c.fill("conical-hat", toPath([part], { k, turn }));
    });
  }
};
