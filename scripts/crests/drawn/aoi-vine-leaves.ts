import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
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

const vineBand = (from: V, to: V, radius: number, near: V, width: number) => {
  const line = arc(from, to, radius, near) as Extract<Piece, { t: "A" }>;
  return thickArc(line.c, line.r, width, Math.min(line.a0, line.a1), Math.max(line.a0, line.a1));
};

export function mitsuTsuruAoiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const curl = onCircle([-7, 77], 13, 10 * DEG);
  const curlEnd = onCircle([-7, 77], 13, 310 * DEG);
  const vine = carve([
    vineBand([0, 8], [-7, 48], 68, [57, 38], 5.4),
    vineBand([-7, 48], curl, 40, [-35, 74], 4.55),
    thickArc([-7, 77], 13, 4.1, 10 * DEG, 310 * DEG),
    vineBand(curlEnd, [-8.3, 72.8], 8.2, [-8, 66.3], 3.7),
  ], []);
  for (const turn of [0, 120, 240]) {
    outwardAoi(c, turn, 0.96, 92.1);
    c.fill("hollyhock", toPath([thickSeg([0, 9], [0, 51], 4.0)], { k: 1, turn }));
    c.fill("hollyhock", toPath(vine, { k: 1, turn: turn + 60 }), "evenodd");
  }
  c.fill("hollyhock", toPath([disc([0, 0], 13.2)], { k: 1 }));
}
