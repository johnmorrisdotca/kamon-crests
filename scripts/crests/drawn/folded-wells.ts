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
