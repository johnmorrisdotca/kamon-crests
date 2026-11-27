import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, mirrored, reversedRun, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { spatterdockLeaf } from "./spatterdock.ts";

const plant = "spatterdock";

const arc = (a: V, b: V, radius: number, near: V) => shortArc(circleThrough(a, b, radius, near), a, b);

function band(a: V, b: V, radius: number, near: V, width: number): Region {
  const piece = arc(a, b, radius, near) as Extract<Piece, { t: "A" }>;

  return thickArc(piece.c, piece.r, width, Math.min(piece.a0, piece.a1), Math.max(piece.a0, piece.a1));
}

export function kohoneBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);

  const half: Region = [
    arc([0, 19], [12, 5], 19.6, [3, 2]),
    arc([12, 5], [31, 1], 23.5, [16, -14]),
    arc([31, 1], [10, -6], 29, [14, 16]),
    arc([10, -6], [13, -18], 17, [27, -9]),
    arc([13, -18], [0, -11], 23, [-4, -32]),
  ];
  const blossom = [...half, ...reversedRun(half.map(mirrored))];
  const flower = carve([blossom], [band([-9, -3], [10, -3], 29, [0, 24], 2.35)]);
  const stem = [
    band([0, 34], [36, 0], 50, [50, 49], 2.65),
    band([0, 28], [29, 0], 42, [44, 41], 2.1),
  ];
  for (const turn of [0, 90, 180, 270]) c.fill(plant, toPath(stem, { k: 1, turn }));
  for (const turn of [0, 180]) {
    c.fill(plant, toPath(flower, { k: 1, at: [0, turn === 0 ? 47 : -47], turn }), "evenodd");
  }
  c.fill(plant, toPath(spatterdockLeaf, { k: 0.92, at: [8, 0], turn: 90 }), "evenodd");
  c.fill(plant, toPath(spatterdockLeaf, { k: 0.92, at: [-8, 0], turn: 270 }), "evenodd");
}
