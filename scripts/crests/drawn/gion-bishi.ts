import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const diamond = (width: number, height: number): Region => {
  const corners: V[] = [[0, height], [width, 0], [0, -height], [-width, 0]];

  return corners.map((p, i) => seg(p, corners[(i + 1) % corners.length]));
};

const turnBands = (bands: Region[], deg: number): Region[] => bands.map((band) => band.map((edge) => rotated(edge, -deg * DEG)));
export const scroll = (radius: number, half = 41): Region[] => [
  thickSeg([0, -half], [0, half], 2 * radius), disc([0, half], radius), disc([0, -half], radius),
];

export const gionMamoriBishiBuild = (c: Builder): void => {
  const angle = 54;
  const frontMask = turnBands(scroll(10.3), angle);
  const backMask = turnBands(scroll(10.3), -angle);
  const roll = thickArc([0, 41], 6.3, 1.85, 0, Math.PI);
  const fold = thickSeg([-4.7, -34], [-4.7, -12], 1.5);
  const tieCentres: V[] = [[-8, -6], [-12, -9], [-16, -12]];
  const tieRadius = 14.5;
  const tieGap = 2;
  const knots = tieCentres.map((at) => thickArc(at, tieRadius, tieGap, -2 * DEG, 74 * DEG));
  const back = carve(turnBands(scroll(8.8), -angle), [...frontMask, ...turnBands([roll, fold], -angle)]);
  const front = carve(turnBands(scroll(8.8), angle), [...turnBands([roll, fold], angle), ...knots]);
  const bar = carve([thickSeg([-94, 0], [94, 0], 7)], [thickSeg([-95, 0], [95, 0], 1.2), ...frontMask, ...backMask]);
  const tips: V[] = [[0, 69.5], [-10.2, 64.2], [10.2, 64.2], [0, -69.5], [-10.2, -64.2], [10.2, -64.2]];
  const opening = carve([diamond(88, 69.6)], tips.map((at) => disc(at, 4.3)));
  const border = carve([diamond(96, 76)], opening);
  const crestPart = "gion-amulet";

  c.precision(3);
  c.guideCircle(C0, R);
  // The tie's circle centres lie on one diagonal. Mark them exactly before taking their arcs.
  for (const [x, y] of tieCentres) {
    c.guideCircle([C0[0] + x, C0[1] - y], tieRadius - tieGap / 2);
    c.guideCircle([C0[0] + x, C0[1] - y], tieRadius + tieGap / 2);
  }
  c.fill(crestPart, toPath([...border, ...tips.map((at) => disc(at, 1.85))], { k: 1 }), "evenodd");
  c.fill(crestPart, toPath(bar, { k: 1 }));
  c.fill(crestPart, toPath(back, { k: 1 }));
  c.fill(crestPart, toPath(front, { k: 1 }));
};
