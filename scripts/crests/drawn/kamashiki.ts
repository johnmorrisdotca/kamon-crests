import type { Builder } from "../../construct/builder.ts";
import { DEG, angleOf, carve, circleCircle, disc, mirrored, onCircle, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const tatamiKamashikiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 30, R);
  const origin: V = [0, 0];
  const left: V = [-47, 47 * Math.sqrt(3)];
  const right: V = [47, left[1]];
  const fold: Region = [seg(origin, right), seg(right, left), seg(left, origin)];
  const base = 78;
  const slope = 1 / Math.sqrt(3);
  const insetSide = 41 / 71;
  const lines = [-33, -24, -15, -6, 3, 12, 21, 30, 39].map((x) => {
    const y = (base * slope + 7 * insetSide - x) / (slope + insetSide);
    const end: V = [x + (y - base) * slope, y];
    return thickSeg([x, base], end, 2.7);
  });
  const weave = carve([fold], lines);
  for (const turn of [0, 60, 120, 180, 240, 300]) c.fill("pot-stand", toPath(weave, { k: 1, turn }), "evenodd");
};

const origin: V = [0, 0];
const cross = (a: Circle, b: Circle): V[] => circleCircle(a.c, a.r, b.c, b.r);
const radialOrder = (points: V[]): V[] => points.sort((a, b) => Math.hypot(...a) - Math.hypot(...b));
const gap = (circle: Circle, at: V, width: number): Region => {
  const angle = angleOf(circle.c, at);
  return thickArc(circle.c, circle.r, width + 2.6, angle - 0.26, angle + 0.26);
};
const band = (circle: Circle, width: number, cuts: Region[]): Region[] =>
  carve([disc(circle.c, circle.r + width / 2)], [disc(circle.c, circle.r - width / 2), ...cuts]);

export const yatsuKamashikiBuild = (c: Builder): void => {
  const offset = 62;
  const radius = 31.4;
  const width = 4.8;
  const step = 45;
  const top: Circle = { c: [0, offset], r: radius };
  const next: Circle = { c: onCircle(origin, offset, 45 * DEG), r: radius };
  const last: Circle = { c: onCircle(origin, offset, 135 * DEG), r: radius };
  const middle: Circle = { c: origin, r: 59 };
  const [near] = radialOrder(cross(top, next));
  const [, far] = radialOrder(cross(top, last));
  const [left, right] = cross(top, middle).sort((a, b) => a[0] - b[0]);
  const lobe = band(top, width, [gap(next, near, width), gap(last, far, width), gap(middle, left, width)]);
  const turns = Array.from({ length: 8 }, (_, i) => i * step);
  const middleGaps = turns.map((turn) => gap(top, right, width).map((edge) => rotated(edge, -turn * DEG)));

  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("pot-stand", toPath(band(middle, width, middleGaps), { k: 1 }), "evenodd");
  for (const turn of turns) c.fill("pot-stand", toPath(lobe, { k: 1, turn }), "evenodd");
};

export const mutsuMusubiKamashikiBuild = (c: Builder): void => {
  const offset = 56.2;
  const radius = 37.2;
  const width = 4.35;
  const top: Circle = { c: [0, offset], r: radius };
  const last: Circle = { c: onCircle(origin, offset, 150 * DEG), r: radius };
  const middle: Circle = { c: origin, r: 57.5 };
  const start = -44 * DEG;
  const tailRadius = 7.6;
  const tailCentre = onCircle(top.c, radius - tailRadius, start);
  const tail = thickArc(tailCentre, tailRadius, width, start, -280 * DEG);
  const outer = thickArc(top.c, radius, width, start, Math.PI - start);
  const [left, right] = cross(top, middle).sort((a, b) => a[0] - b[0]);
  const [, far] = radialOrder(cross(top, last));
  const lobe = carve([outer, tail, tail.map(mirrored)], [gap(middle, left, width), gap(last, far, width)]);
  const turns = [0, 60, 120, 180, 240, 300];
  const middleGaps = turns.map((turn) => gap(top, right, width).map((edge) => rotated(edge, -turn * DEG)));

  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("pot-stand", toPath([disc(origin, 27.4), disc(origin, 22.7)], { k: 1 }), "evenodd");
  c.fill("pot-stand", toPath(band(middle, width, middleGaps), { k: 1 }), "evenodd");
  for (const turn of turns) c.fill("pot-stand", toPath(lobe, { k: 1, turn }), "evenodd");
};
