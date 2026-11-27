import { RING_GAP } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, carve, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const quarters = [0, 90, 180, 270];
const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const archedBand = (gap: number): Region => {
  const centreOfArc = (halfSpan: number, sagitta: number, level: number): Circle => {
    const r = (halfSpan * halfSpan + sagitta * sagitta) / (2 * sagitta);
    return { c: [0, level + sagitta - r], r };
  };
  const level = 1.8 - gap;
  const outer = R - 1.7 + gap;
  const inner = R * 0.735 - gap;
  const outerCircle = centreOfArc(outer, 43 + 2 * gap, level);
  const innerCircle = centreOfArc(inner, 25 - 2 * gap, level);
  const outerLeft: V = [-outer, level];
  const outerRight: V = [outer, level];
  const innerLeft: V = [-inner, level];
  const innerRight: V = [inner, level];
  return [shortArc(outerCircle, outerLeft, outerRight), seg(outerRight, innerRight),
    shortArc(innerCircle, innerRight, innerLeft), seg(innerLeft, outerLeft)];
};

/** Four compass bands, each covered at the left crossing by the next band. */
export const wachigaiIBuild = (c: Builder): void => {
  c.precision(3);
  const cover = archedBand(1.25).map((piece) => rotated(piece, 90 * DEG));
  const top = carve([archedBand(0)], [cover]);
  for (const angle of quarters) {
    const bands = top.map((loop) => loop.map((piece) => rotated(piece, angle * DEG)));
    c.fill("well-frame", toPath(bands, { k: 1 }), "evenodd");
  }
};

/** Four rounded quarters share a solid centre. A radial slot reaches each small outer eye. */
export const chuwaNiMusubiIBuild = (c: Builder): void => {
  c.precision(3);
  const reach = c.ring("ring-medium") - RING_GAP;
  const halfGap = 3.1;
  const radiusFromCentre = (reach + halfGap) / (Math.SQRT2 + 1);
  const r = radiusFromCentre - halfGap;
  const o = radiusFromCentre;
  const depth = reach * 0.30;
  const topLeft: Region = [
    seg([-halfGap, depth], [-halfGap, o]),
    arcA([-o, o], r, 0, 270 * DEG),
    seg([-o, halfGap], [-depth, halfGap]),
    seg([-depth, halfGap], [-depth, -halfGap]),
  ];
  const outlines = quarters.flatMap((angle) => topLeft.map((piece) => rotated(piece, angle * DEG)));
  const eye = reach * 0.59;
  const keyhole = (offset: number, width: number): V => {
    const along = eye + offset;
    return [(-along + width) / Math.SQRT2, (along + width) / Math.SQRT2];
  };
  const stem = 1.55;
  const notch = polygon([
    keyhole(reach - eye + 2, -stem), keyhole(7, -stem), keyhole(3, -7), keyhole(-4, -7),
    keyhole(-10, 0), keyhole(-4, 7), keyhole(3, 7), keyhole(7, stem), keyhole(reach - eye + 2, stem),
  ]);
  const outerEyes = quarters.map((angle) => notch.map((piece) => rotated(piece, angle * DEG)));
  const centre = polygon([[-3.15, -3.15], [3.15, -3.15], [3.15, 3.15], [-3.15, 3.15]]);
  c.fill("well-frame", toPath(carve([outlines], [centre, ...outerEyes]), { k: 1 }), "evenodd");
};
