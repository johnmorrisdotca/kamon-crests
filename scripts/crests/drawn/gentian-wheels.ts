import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, mirrored, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const GENTIAN = "gentian";
const centre: V = [0, 0];
const original = { k: 1 };

function polygon(points: V[]): Region {
  return points.map((point, index) => seg(point, points[(index + 1) % points.length]));
}

function opposite(seams: Region[]): Region[] {
  return [...seams, ...seams.map((seam) => seam.map(mirrored))];
}

function wheel(c: Builder, rim: number, field: number, seams: Region[]): void {
  const hub = 11.8;
  const hubGap = 2.4;
  const cuts = Array.from({ length: 8 }, (_, i) => seams.map((seam) => seam.map((edge) => rotated(edge, i * 45 * DEG)))).flat();
  const face = carve([disc(centre, field)], [disc(centre, hub + hubGap), ...cuts]);

  c.guideCircle(C0, R);
  c.guideSpokes(8, 0, R);
  c.fill(GENTIAN, toPath([disc(centre, rim), disc(centre, field + WEIGHT.thread)], original), "evenodd");
  c.fill(GENTIAN, toPath(face, original), "evenodd");
  c.fill(GENTIAN, toPath([disc(centre, hub)], original));
}

export function asagaoRindoBuild(c: Builder): void {
  const r = 78;
  const field = 64.2;
  const crown = polygon([[0, 96], [13, 86], [7, r + 1], [-7, r + 1], [-13, 86]]);
  const diamond: V[] = [[0, 65], [11.5, 47], [0, 39], [-11.5, 47]];
  const facets = diamond.map((point, i) => thickSeg(point, diamond[(i + 1) % diamond.length], WEIGHT.thread));
  const cuts = opposite([
    thickSeg([-3, 13], [-6.8, 43], WEIGHT.thread),
    thickSeg([-11.6, 47], [-21.8, 60], WEIGHT.thread),
    thickSeg([-10.9, 46.8], [0, 48.5], WEIGHT.thread),
  ]);

  wheel(c, r, field, [...facets, ...cuts]);
  for (let i = 0; i < 8; i += 1) c.fill(GENTIAN, toPath([crown], { k: 1, turn: i * 45 }));
}
