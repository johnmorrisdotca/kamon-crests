import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";

const bend = (start: V, end: V, radius: number, centre: V) =>
  shortArc(circleThrough(start, end, radius, centre), start, end);

function almond(start: V, end: V, radius: number): Region {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const middle: V = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

  return [
    bend(start, end, radius, [middle[0] + dy, middle[1] - dx]),
    bend(end, start, radius, [middle[0] - dy, middle[1] + dx]),
  ];
}

const motif = "bamboo-grass";

export function musubiSasaBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  c.zoom(R / 98);
  const half: Region = [
    bend([0, 1.2], [34.8, 62], 63, [-25, 56]),
    bend([34.8, 62], [0, 97.5], 36, [0, 60]),
  ];
  const blade = [...half, ...reversedRun(half.map(mirrored))];
  const broad = carve([blade], [thickSeg([0, 1], [0, 99], 2.1)]);
  const side = carve([almond([23, 65], [97.5, 0], 100)], [blade, thickSeg([23, 65], [97.5, 0], 1.55)]);
  c.fill(motif, toPath([disc([0, 0], 98), disc([0, 0], 95.25)], { k: 1 }), "evenodd");
  for (const turn of [0, 180]) {
    c.fill(motif, toPath(side, { k: 1, turn }), "evenodd");
    c.fill(motif, toPath(side, { k: 1, turn, mirror: true }), "evenodd");
    c.fill(motif, toPath(broad, { k: 1, turn }), "evenodd");
  }
}
