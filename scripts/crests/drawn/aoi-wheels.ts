import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { AOI_LEAF } from "./aoi.ts";

const arc = (from: V, to: V, radius: number, near: V): Piece => shortArc(circleThrough(from, to, radius, near), from, to);

function curvedBand(from: V, to: V, radius: number, centre: V, width: number): Region {
  const curve = arc(from, to, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(curve.c, curve.r, width, Math.min(curve.a0, curve.a1), Math.max(curve.a0, curve.a1));
}

const aoiLocation = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function aoiLeafAt(c: Builder, placing: Placing): void {
  const right = toPath([AOI_LEAF.axis, ...AOI_LEAF.cells], placing);
  const left = toPath(AOI_LEAF.cells, { ...placing, mirror: true });

  c.fill("hollyhock", right.join(left));
}

export function aoiGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const size = 0.63;
  const at = 43.5 - AOI_LEAF.tip[1] * size;
  const vine = carve([
    curvedBand([6, 12.3], [15.4, 49], 52, [53, 26], 7),
    curvedBand([15.4, 49], [33.7, 71.5], 37, [-1, 80], 7),
    curvedBand([33.7, 71.5], [14, 78.1], 20, [23, 68], 7),
    disc([15.4, 49], 3.45),
    disc([33.7, 71.5], 3.45),
  ], []);
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const placing = { k: size, at: aoiLocation(turn, at), turn };
    c.group(() => {
      c.fill("hollyhock", toPath(vine, { k: 1, turn }), "evenodd");
      aoiLeafAt(c, placing);
    });
  }
  c.fill("hollyhock", toPath([disc([0, 0], 15.8)], { k: 1 }));
}
