import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, mirrored, reversedRun, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const paddle = (margin = 0): Region[] => {
  const tip: V = [0, 98 + margin];
  const neck: V = [4 + margin, -13 - margin];
  const edge = shortArc(circleThrough(tip, neck, 92 - margin * 1.5, [-77, 42]), tip, neck);
  const blade = [edge, seg(neck, [-neck[0], neck[1]]), ...reversedRun([mirrored(edge)])];
  const shaft = thickSeg([0, -10], [0, -89 - margin], 7 + margin * 2);
  const grip = thickSeg([-22 - margin, -88], [22 + margin, -88], 7 + margin * 2);
  return carve([blade, shaft, grip], []);
};

const turn = (regions: Region[], degrees: number): Region[] => regions.map((region) => region.map((p) => rotated(p, degrees * DEG)));

export const itowaNiChigaiKaiBuild = (c: Builder): void => {
  const inner = c.ring("ring-thread") - RING_GAP;
  const lower = turn(paddle(), 46);
  const upper = turn(paddle(), -46);
  const separation = turn(paddle(2.2), -46);
  c.fill("paddle", toPath(carve(lower, separation), { k: inner / R }), "evenodd");
  c.fill("paddle", toPath(upper, { k: inner / R }), "evenodd");
};
