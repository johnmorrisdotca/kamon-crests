import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

function roundedRun(points: V[], middle: V, bend = 1.45): Piece[] {
  return points.slice(1).map((point, i) => {
    const from = points[i];
    return shortArc(circleThrough(from, point, Math.max(12, vdist(from, point) * bend), middle), from, point);
  });
}

export function mukoTeaFruitBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const centre: V = [0, 0];
  const tip: V = [0, 94.8];
  const leafFoot: V = [0, 40];
  const edge = roundedRun([tip, [22, 79], [33, 62], [32, 48], leafFoot], [0, 64]);
  const leaf: Region = [...edge, ...reversedRun(edge.map(mirrored))];
  const leafInk = carve([leaf], [disc(centre, 60.2), thickSeg([0, 52], [0, 92], 2.45)]);
  for (let i = 0; i < 3; i++) c.fill("tea-fruit", toPath(leafInk, { k: 1, turn: i * 120 }), "evenodd");

  const veins = Array.from({ length: 6 }, (_, i) => {
    const direction = i * 60 * DEG;
    const ray = (radius: number): V => [radius * Math.sin(direction), radius * Math.cos(direction)];
    return thickSeg(ray(12.6), ray(36), 2.6);
  });
  const fruit = carve([disc(centre, 57)], [disc(centre, 15), ...veins]);
  c.fill("tea-fruit", toPath(fruit, { k: 1 }), "evenodd");
  c.fill("tea-fruit", toPath([disc(centre, 12)], { k: 1 }));
}
