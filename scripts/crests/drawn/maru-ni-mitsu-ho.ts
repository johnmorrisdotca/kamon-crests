// 丸に三つ帆, as the 1892 crest book draws 丸に三ッ帆 (frame 10, left page, fourth row, second column from the right): three sails
// in a ring, each hanging from a yard near the ring with its cloth narrowing to the centre, where the three meet; their sides all
// bow the same way, so they turn. The numbers are the cell's pixels from the ring's centre, y up, for the upright sail.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

/** The ring from 126 to 151 out. */
const RING = { outer: 151, inner: 126 };
const CENTRE: V = [0, 0];
/** The cloth hangs from the yard between 48 left and 41 right; its left side bows out through 31 left at 31 up, its right side in through 17 right at 56 up. */
const CLOTH = { left: [-48, 85] as V, leftBow: [-31, 31] as V, right: [41, 85] as V, rightBow: [17, 56] as V };
/** Two seams down the cloth to the centre, white lines 2.5 wide. */
const SEAMS: [V, V][] = [[[-25, 88], [-14, 30]], [[2, 88], [-4, 45]]];
/** The yard 9 deep about 89.5 up, from 67 left to 69 right; over it a post 10 wide and a crossbar 13 deep from 31 left to 33 right. */
const YARD: [V, V, number] = [[-67, 89.5], [69, 89.5], 9];
const POST: [V, V, number] = [[0, 89.5], [0, 112.5], 10];
const BAR: [V, V, number] = [[-31, 112.5], [33, 112.5], 13];

export const maruNiMitsuHoBuild = (c: Builder): void => {
  const k = R / RING.outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, RING.inner * k);
  c.fill("frame", circle(C0, R).join(circle(C0, RING.inner * k)), "evenodd");
  const cloth: Region = [arcVia(CLOTH.left, CLOTH.leftBow, CENTRE), arcVia(CENTRE, CLOTH.rightBow, CLOTH.right), seg(CLOTH.right, CLOTH.left)];
  const seams = SEAMS.map(([a, m]) => lineVia(a, m, CENTRE, 2.5));
  const sail = carve([cloth], seams);
  const rig = [thickSeg(...YARD), thickSeg(...POST), thickSeg(...BAR)];
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("sail", toPath(sail, { k, turn }));
      for (const part of rig) c.fill("sail", toPath([part], { k, turn }));
    });
  }
};
