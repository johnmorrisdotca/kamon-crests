import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { AOI_LEAF } from "./aoi.ts";

const arc = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

const aoiPosition = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function outwardAoi(c: Builder, turn: number, size: number, tip: number): void {
  const at = aoiPosition(turn, tip + AOI_LEAF.tip[1] * size);
  const placing = { k: size, at, turn: turn + 180 };
  c.group(() => {
    c.fill("hollyhock", toPath([AOI_LEAF.axis], placing));
    c.fill("hollyhock", toPath(AOI_LEAF.cells, placing));
    c.fill("hollyhock", toPath(AOI_LEAF.cells, { ...placing, mirror: true }));
  });
}

export function kenMitsuAoiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  const half = [
    arc([3.25, 12], [23, 76], 86, [87, 25]),
    arc([23, 76], [0, 94], 54, [32, 120]),
  ];
  const blade = [...half, ...reversedRun(half.map(mirrored)), seg([-3.25, 12], [3.25, 12])];
  for (const turn of [0, 120, 240]) {
    outwardAoi(c, turn, 0.96, 94.5);
    c.fill("hollyhock", toPath([thickSeg([0, 11.8], [0, 44], 4.25)], { k: 1, turn }));
    c.fill("sword", toPath([blade], { k: 1, turn: turn + 60 }));
  }
  c.fill("hollyhock", toPath([disc([0, 0], 12.6)], { k: 1 }));
}
