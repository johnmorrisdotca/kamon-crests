import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

export function itowaNiItsutsuUraAoiBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-thread");
  const reach = (room - 0.8) / 91;
  c.guideSpokes(5, 0, room);
  const half = [
    arc([0, 91], [28, 65], 71, [-21, 30]),
    arc([28, 65], [33, 50], 22, [13, 50]),
    arc([33, 50], [20, 34], 21, [13, 52]),
    arc([20, 34], [0, 42], 15, [14, 47]),
  ];
  const leaf = [...half, ...reversedRun(half.map(mirrored))];
  const curl = [
    thickArc([13.7, 44.4], 7.7, 2.55, -33 * DEG, 228 * DEG),
    thickArc([14.6, 43.1], 4.2, 2.35, 162 * DEG, 320 * DEG),
  ];
  const stems = [thickSeg([8.5, 41], [4.1, 14.2], 2.65), thickSeg([-8.5, 41], [-4.1, 14.2], 2.65)];
  const ink = carve([leaf, ...stems], [...curl, ...curl.map((band) => band.map(mirrored))]);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("hollyhock", toPath(ink, { k: reach, turn }), "evenodd");
  c.fill("hollyhock", toPath([disc([0, 0], 16)], { k: reach }));
}
