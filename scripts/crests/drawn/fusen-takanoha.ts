import type { Builder } from "../../construct/builder.ts";
import { angleOf, arcA, carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const top: V = [0, R];
const bottom: V = [0, -R];
const leftJoin: V = [-29, -32];
const heel: V = [-27, -80];

const sideVane = (): Region => [
  arcA([0, 0], R, Math.PI / 2, 3 * Math.PI / 2),
  seg(bottom, heel),
  shortArc(circleThrough(heel, leftJoin, 65, [36, -57]), heel, leftJoin),
  shortArc(circleThrough(leftJoin, top, 107, [68, 44]), leftJoin, top),
];

/** Three pairs of barred cuts and the two white seams of the bowed shaft. */
const sideVeins = (): Region[] => {
  const foot: V = [-32, -82];
  const shaft = circleThrough(top, foot, 115, [61, 12]);
  const a = angleOf(shaft.c, top);
  const b = angleOf(shaft.c, foot) + 2 * Math.PI;
  const seams = [-3, 3].map((offset) => thickArc(shaft.c, shaft.r + offset, 1.9, a, b));
  const bars = [[50, 0.25], [-12, 0.71], [-64, 0.12]].flatMap(([y, slope]) =>
    [-2.4, 2.4].map((shift) => thickSeg([-103, y + shift - 37 * slope], [-23, y + shift + 43 * slope], 1.85)));
  return [...seams, ...bars];
};

const inwardCurl = (): Region[] => {
  const p: V = [-28, -22];
  const q: V = [-11, 61];
  const circle = circleThrough(p, q, 57, [24, 21]);
  const bearing = angleOf(circle.c, p);
  const a = bearing < 0 ? bearing + 2 * Math.PI : bearing;
  return [thickArc(circle.c, circle.r, 5.9, a, angleOf(circle.c, q)), disc(q, 4.75)];
};

const frontVane = (grow = 0): Region => {
  const r = 28.5 + grow;
  return [arcA([0, -21], r, 0, Math.PI), seg([-r, -21], [-r, -67.5]),
    arcA([0, -67.5], r, Math.PI, 2 * Math.PI), seg([r, -67.5], [r, -21])];
};

const frontVeins = (): Region[] => {
  const shaft = [-3.3, 3.3].map((x) => thickSeg([x, 10], [x, -98], 1.85));
  const bars = [-30, -66].flatMap((y) => [-3.1, 3.1].flatMap((step) =>
    [-1, 1].map((side) => thickSeg([side * 4.2, y + step], [side * 32, y + step - 18], 1.8))));
  return [...shaft, ...bars];
};

export const fusenTakanohaBuild = (c: Builder): void => {
  c.precision(3);
  const front = frontVane();
  const edges = carve([sideVane(), ...inwardCurl()], [...sideVeins(), frontVane(1.4)]);
  c.fill("hawk-feather", toPath(edges, { k: 1 }), "evenodd");
  c.fill("hawk-feather", toPath(edges, { k: 1, mirror: true }), "evenodd");
  c.fill("hawk-feather", toPath(carve([front], frontVeins()), { k: 1 }), "evenodd");
};
