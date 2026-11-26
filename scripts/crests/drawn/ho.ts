import type { Builder } from "../../construct/builder.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import { carve, circleThrough, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

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
