import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const part = "well-frame";
const quarters = [0, 90, 180, 270];
const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const box = (x0: number, x1: number, y0: number, y1: number): V[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

const foldedCurb = (c: Builder, side: V[], opening: Region, crease: Region[]): void => {
  const border = polygon(quarters.flatMap((turn) => side.map(([x, y]): V => {
    const angle = turn * DEG;
    return [x * Math.cos(angle) + y * Math.sin(angle), y * Math.cos(angle) - x * Math.sin(angle)];
  })));
  const cuts = quarters.flatMap((turn) => crease.map((region) => region.map((edge) => rotated(edge, -turn * DEG))));
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill(part, toPath(carve([border], [opening, ...cuts]), { k: 1 }), "evenodd");
};

export const orikumiIBuild = (c: Builder): void => {
  const side: V[] = [[-33, 90], [33, 90], [56, 70], [56, 54], [70, 54]];
  const opening = polygon(box(-36, 36, -36, 36));
  const crease = [
    thickSeg([-34, 93], [-34, 53], 2.6), thickSeg([34, 93], [34, 53], 2.6),
    thickSeg([-34, 74], [34, 74], 2.6), thickSeg([0, 55], [0, 34], 2.6),
  ];
  foldedCurb(c, side, opening, crease);
};

export const orikomiIzutsuBuild = (c: Builder): void => {
  const side: V[] = [[-49, 82], [-11, 82], [0, 71], [11, 82], [49, 82]];
  const opening = polygon([[0, 27], [27, 0], [0, -27], [-27, 0]]);
  const crease = [
    thickSeg([49, 82], [23, 56], 2.5), thickSeg([23, 56], [56, 23], 2.5),
    thickSeg([30, 63], [63, 30], 2.5), thickSeg([56, 23], [82, 49], 2.5),
    thickSeg([12, 12], [39.5, 39.5], 3.1),
  ];
  foldedCurb(c, side, opening, crease);
};

export const oriIgetaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const skewed = (u0: number, u1: number, v0: number, v1: number): Region =>
    polygon(box(u0, u1, v0, v1).map(([u, v]): V => [-0.8 * (u + v), 0.6 * (u - v)]));
  const high = skewed(-75, 75, -41, -12);
  const low = skewed(-75, 75, 12, 41);
  const left = skewed(-41, -12, -75, 75);
  const right = skewed(12, 41, -75, 75);
  const bands = [
    ...carve([high], [skewed(10.2, 42.8, -80, 80)]),
    ...carve([low], [skewed(-42.8, -10.2, -80, 80)]),
    ...carve([left], [skewed(-80, 80, -42.8, -10.2)]),
    ...carve([right], [skewed(-80, 80, 10.2, 42.8)]),
  ];
  const tabs = [
    skewed(-61, -40, -53, -42.6), skewed(40, 61, 42.6, 53),
    skewed(-53, -42.6, 40, 61), skewed(42.6, 53, -61, -40),
  ];
  c.fill(part, toPath([...bands, ...tabs], { k: 1 }), "evenodd");
};
