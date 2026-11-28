// The arabesque flower seen from the side in the 1892 book. Coordinates are the page's, from its middle, as measured in the cell.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { bowedArc, carve, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const FLOWER = "karahana";
const lens = (a: V, b: V, bow: number): Region => [bowedArc(a, b, bow), bowedArc(b, a, bow)];

// Each part is one outline with an arc for every edge between two of the corners and notches the cell shows.

/** The upright petal: a tall tip between a low left shoulder and a round right one. */
const uprightPetal = (): Region[] => {
  const foot: V = [-27, -10];
  const shoulder: V = [-33, 57];
  const step: V = [-18, 62];
  const tip: V = [-4, 81];
  const notch: V = [8, 52];
  const side: V = [25, 45];
  const hip: V = [24, 14];
  const outline: Region = [
    bowedArc(foot, shoulder, 10), bowedArc(shoulder, step, 2), bowedArc(step, tip, 3), bowedArc(tip, notch, 2.5),
    bowedArc(notch, side, 6.5), bowedArc(side, hip, 1.5), seg(hip, [8, -12]), seg([8, -12], foot),
  ];

  return carve([outline], [lens([-5.2, 14.3], [-4.4, 36.6], 2.6)]);
};

/** The left petal lies behind: a long belly up to its outer point, then two bumps along the top. */
const leftPetal = (): Region[] => {
  const root: V = [-30, -12];
  const point: V = [-91, 39];
  const notch: V = [-62, 33];
  const inner: V = [-41, 37];
  const outline: Region = [bowedArc(root, point, 18), bowedArc(point, notch, 7), bowedArc(notch, inner, 7), seg(inner, root)];

  return carve([outline], [lens([-50, 9], [-31, -8], 1.8)]);
};

/** The right petal lies in front: its belly rises to an outer point, and its top dips once before it meets the upright petal. */
const rightPetal = (): Region[] => {
  const root: V = [11, -10];
  const point: V = [83, 46];
  const notch: V = [63, 41];
  const inner: V = [27, 25];
  const outline: Region = [bowedArc(root, point, -19), bowedArc(point, notch, -3), bowedArc(notch, inner, -8), seg(inner, root)];

  return carve([outline], [lens([21, -4], [47, 15], 1.8)]);
};

/** The calyx and stalk: one pointed sepal, then a stalk that narrows, bends to the right in round curves and ends in a heel and a toe. */
const stem = (): Region => {
  const left: V = [-33, -13];
  const right: V = [33, -8];
  const knee: V = [0, -40];
  const heel: V = [24, -73];
  const toe: V = [45, -66];
  const instep: V = [22, -50];

  return [
    seg(left, [-11, -9]), seg([-11, -9], [-2, 11]), seg([-2, 11], [8, -11]), seg([8, -11], right),
    bowedArc(right, instep, -8.5), seg(instep, [37, -64]), seg([37, -64], toe), seg(toe, heel), bowedArc(heel, knee, 2), bowedArc(knee, left, 4),
  ];
};

export function yokomiKarahanaBuild(c: Builder): void {
  c.precision(3);
  const plain = { k: 1 };

  c.guideCircle(C0, R);
  layerParts(c, () => {
    fillPart(c, FLOWER, leftPetal(), plain);
    fillPart(c, FLOWER, uprightPetal(), plain, PAPER);
    fillPart(c, FLOWER, rightPetal(), plain, PAPER);
    fillPart(c, FLOWER, [stem()], plain, PAPER);
  });
}
