import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, mirrored, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

function horizontalCap(y: number): Region {
  const halfSpan = 56;
  const radius = 11.6;
  return [
    seg([-halfSpan, y + radius], [halfSpan, y + radius]),
    arcA([halfSpan, y], radius, Math.PI / 2, -Math.PI / 2),
    seg([halfSpan, y - radius], [-halfSpan, y - radius]),
    arcA([-halfSpan, y], radius, -Math.PI / 2, -3 * Math.PI / 2),
  ];
}

export function goNoJiRingoBuild(c: Builder): void {
  const corners: V[] = [[-46, 54], [-26, 54], [-26, 32], [46, -26], [46, -54], [26, -54], [26, -32], [-46, 26]];
  const band = corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));
  const silhouette = carve([horizontalCap(63), horizontalCap(-63), band, band.map(mirrored)], []);

  c.guideCircle(C0, R);
  c.fill("go-no-ji", toPath(silhouette, { k: 1 }));
}
