import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, onCircle, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const PART = "well-frame";
const turn = (regions: Region[], degrees: number): Region[] => regions.map((region) => region.map((piece) => rotated(piece, degrees * DEG)));

/** Frame 6, right r3c4. Three stepped regions fill a thread ring and meet around a small hexagonal opening. */
export const itowaMitsuwariIgetaBuild = (c: Builder, reach: number): void => {
  const rim: Circle = { c: [0, 0], r: reach };
  const edge = onCircle(rim.c, reach, 30 * DEG);
  const innerRadius = Math.round(0.208 * reach * 2) / 2;
  c.stepRound(innerRadius);
  const at = (x: number, y: number): V => [x * reach, y * reach];
  const notch: V[] = [edge, at(0.56, 0.323), at(0.68, 0.2), at(0.46, 0.07), at(0.46, 0.214), at(0.25, 0.145), onCircle(rim.c, innerRadius, 30 * DEG)];
  const oppose = notch.map(([x, y]): V => [-x / 2 - y * Math.sqrt(3) / 2, x * Math.sqrt(3) / 2 - y / 2]);
  const lines = (points: V[]): Region => points.slice(0, -1).map((point, i) => seg(point, points[i + 1]));
  const inner: V[] = [oppose[oppose.length - 1], [0, innerRadius], notch[notch.length - 1]];
  const cap = [arcTo(rim, edge, oppose[0], true), ...lines(oppose), ...lines(inner), ...lines(notch.slice().reverse())];
  const clearance = [notch, oppose].flatMap((points) => points.slice(0, -1).map((point, i) => thickSeg(point, points[i + 1], 2)));
  const bend: V = [0, 0.64 * reach];
  const outerNotch = [67, 113].map((angle) => thickSeg(bend, onCircle(rim.c, 1.04 * reach, angle * DEG), 1.8));
  const unit = carve([cap], [...clearance, ...outerNotch]);
  for (const angle of [0, 120, 240]) c.fill(PART, toPath(turn(unit, -angle), { k: 1 }), "evenodd");
};
