import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import { AOI_LEAF } from "./aoi.ts";

const aoiLocation = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function aoiLeafAt(c: Builder, placing: Placing): void {
  const right = toPath([AOI_LEAF.axis, ...AOI_LEAF.cells], placing);
  const left = toPath(AOI_LEAF.cells, { ...placing, mirror: true });

  c.fill("hollyhock", right.join(left));
}

export function mutsuAoiGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const size = 0.72;
  const reach = 94.4 + AOI_LEAF.tip[1] * size;
  const spokes = [thickSeg([-6.7, 13.9], [-11.5, 51], 2.45), thickSeg([6.7, 13.9], [11.5, 51], 2.45)];
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const placing = { k: size, at: aoiLocation(turn, reach), turn: turn + 180 };
    c.group(() => {
      c.fill("hollyhock", toPath(spokes, { k: 1, turn }));
      aoiLeafAt(c, placing);
    });
  }
  c.fill("hollyhock", toPath([disc([0, 0], 16)], { k: 1 }));
}
