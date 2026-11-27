import type { Builder } from "../../construct/builder.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import { DEG, arcTo, carve, circleThrough, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";

const arc = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const seam = (from: V, to: V, radius: number, hint: V): Region => {
  const edge = arc(from, to, radius, hint) as Extract<Piece, { t: "A" }>;

  return thickArc(edge.c, edge.r, WEIGHT.hair + 0.5, edge.a0, edge.a1);
};

export const maruNiHoBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const left: V = [-48, 34];
  const right: V = [31, 34];
  const foot: V = [60, -48];
  const corner: V = [-18, -54];
  const cloth = [seg(left, right), arc(right, foot, 67, [90, 18]), arc(foot, corner, 91, [20, 30]), arc(corner, left, 94, [42, -2])];
  const veins = [
    seam([-18, 39], [21, -52], 76, [62, 10]),
    seam([6, 39], [42, -52], 77, [86, 9]),
  ];
  const yard = [
    thickSeg([-58, 35], [58, 35], 6),
    thickSeg([-32, 40], [0, 59], 3),
    thickSeg([32, 40], [0, 59], 3),
    thickSeg([0, 40], [0, 63], 3.6),
    thickSeg([-13, 62], [13, 62], 3.4),
  ];
  c.fill("sail", toPath(carve([cloth], veins), { k: reach / R }), "evenodd");
  c.fill("sail", toPath(carve(yard, []), { k: reach / R }), "evenodd");
};

const turningSail = (): Region[] => {
  const left: V = [-24, 71];
  const right: V = [25, 71];
  const tip: V = [0, 3];
  const canvas = [seg(left, right), arc(right, tip, 64, [59, 20]), arc(tip, left, 66, [32, 60])];
  const yard = [
    thickSeg([left[0] - 5, 72], [right[0] + 5, 72], 3),
    thickSeg([0, 74], [0, 87], 3),
    thickSeg([-11, 87], [11, 87], 3),
  ];

  return carve([canvas, ...yard], []);
};

export const itsutsuYoseHoBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const sail = turningSail();
  for (const turn of [0, 72, 144, 216, 288]) c.fill("sail", toPath(sail, { k: 1, turn }), "evenodd");
};

export const futatsuHoTomoeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const rim = { c: [0, 0] as V, r: R };
  const onRim = (y: number): V => [Math.sqrt(R ** 2 - y ** 2), y];
  const across = 11;
  const right = onRim(across);
  const left: V = [-right[0], -right[1]];
  const innerLeft: V = [-12, -11];
  const innerRight: V = [77, 11];
  const cloth: Region = [
    arcTo(rim, right, left, true), seg(left, innerLeft),
    ...outline(["-12,-11 77,11 32,44"]), seg(innerRight, right),
  ];
  const seams = [
    thickArc([5, -8], 77.2, 2.7, 10 * DEG, 186 * DEG),
    thickArc([16, -8], 62, 2.7, 12 * DEG, 186 * DEG),
  ];
  const canvas = carve([cloth], seams);
  const yardTop = onRim(13);
  const yardBottom = onRim(6.6);
  const yardLeftTop: V = [-12, 13];
  const yardLeftBottom: V = [-12, 6.6];
  const yard: Region = [
    seg(yardLeftTop, yardTop), shortArc(rim, yardTop, yardBottom),
    seg(yardBottom, yardLeftBottom), seg(yardLeftBottom, yardLeftTop),
  ];
  const rigging = carve([yard,
    thickSeg([18, 34], [55, 34], 5.1),
    thickSeg([37, 12], [37, 35], 3.4),
    thickSeg([14, 12], [37, 31], 2.5),
    thickSeg([60, 12], [37, 31], 2.5),
  ], []);

  for (const turn of [0, 180]) {
    c.group(() => {
      c.fill("sail", toPath(canvas, { k: 1, turn }), "evenodd");
      c.fill("sail", toPath(rigging, { k: 1, turn }), "evenodd");
    });
  }
};
