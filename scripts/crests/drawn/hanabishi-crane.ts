// The flower-lozenge crane in the 1892 book: three pointed petals as the wings and tail of a flying crane. Coordinates are measured from the
// cell with the body near the middle, x to the right and y up, in a reach of about 108.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { bowedArc, carve, disc, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const FLOWER = "flower-lozenge";
const lens = (a: V, b: V, bow: number): Region => [bowedArc(a, b, bow), bowedArc(b, a, bow)];

// Each petal is one outline: an arc for every edge, and a ruled notch between its two or three points.
const leftWing = (): Region[] => {
  const tip: V = [-103, -21];
  const point: V = [-87, 18];
  const notch: V = [-72, 10];
  const rootUpper: V = [-30, 4];
  const rootLower: V = [-26, -22];
  const outline: Region = [bowedArc(rootUpper, point, -8), seg(point, notch), bowedArc(notch, tip, -2), bowedArc(tip, rootLower, 14), seg(rootLower, rootUpper)];

  return carve([outline], [lens([-62, 4], [-34, -5], 1.4)]);
};

const rightWing = (): Region[] => {
  const tip: V = [95, -23];
  const point: V = [74, 21];
  const notch: V = [65, 8];
  const rootUpper: V = [14, 10];
  const rootLower: V = [-4, -26];
  const outline: Region = [bowedArc(rootUpper, point, 4.5), seg(point, notch), bowedArc(notch, tip, 2), bowedArc(tip, rootLower, -15), seg(rootLower, rootUpper)];

  return carve([outline], [lens([6, -12], [32, -2], 1.6)]);
};

const tail = (): Region[] => {
  const rootLeft: V = [-35, 0];
  const left: V = [-28, 48];
  const leftNotch: V = [-20, 38];
  const top: V = [10, 69];
  const rightNotch: V = [3, 40];
  const right: V = [38, 49];
  const rootRight: V = [24, 14];
  // The petal runs on behind the breast, whose points stand before it.
  const foot: V = [4, -16];
  const under: V = [-20, -14];
  const outline: Region = [
    bowedArc(rootLeft, left, 5.5), seg(left, leftNotch), bowedArc(leftNotch, top, 3), bowedArc(top, rightNotch, -2),
    seg(rightNotch, right), bowedArc(right, rootRight, -3), seg(rootRight, foot), seg(foot, under), seg(under, rootLeft),
  ];

  return carve([outline], [lens([-3, 37], [-15, 2], 1.6)]);
};

// The breast, neck and head. The breast's upper edge is ruled in three points, like a calyx. The neck drops, turns to the left and ends in the beak.
const neck = (): Region[] => {
  const shoulder: V = [-30, -6];
  const bend: V = [-28, -40];
  const crown: V = [-55, -52];
  const brow: V = [-66, -58];
  const beak: V = [-85, -72];
  const chin: V = [-55, -62];
  const throat: V = [-35, -61];
  const breast: V = [2, -25];
  const outline: Region = [
    bowedArc(shoulder, bend, 3), bowedArc(bend, crown, 3.5), seg(crown, brow), seg(brow, beak), seg(beak, chin), seg(chin, throat), bowedArc(throat, breast, -2.5),
    seg(breast, [8, -9]), seg([8, -9], [-3, -13]), seg([-3, -13], [-10, 4]), seg([-10, 4], [-20, -8]), seg([-20, -8], [-35, 0]), seg([-35, 0], shoulder),
  ];

  return carve([outline], [disc([-57, -57], 1.4)]);
};

export function hanabishiZuruBuild(c: Builder): void {
  c.precision(3);
  const k = R / 108;
  const at: V = [4 * k, 3 * k];

  c.guideCircle(C0, R);
  layerParts(c, () => {
    fillPart(c, FLOWER, leftWing(), { k, at });
    fillPart(c, FLOWER, rightWing(), { k, at });
    fillPart(c, FLOWER, tail(), { k, at }, PAPER);
    fillPart(c, "crane", neck(), { k, at }, PAPER);
  });
}
