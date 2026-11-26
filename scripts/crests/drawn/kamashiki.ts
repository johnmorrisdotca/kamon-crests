import type { Builder } from "../../construct/builder.ts";
import { carve, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const tatamiKamashikiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 30, R);
  const origin: V = [0, 0];
  const left: V = [-47, 47 * Math.sqrt(3)];
  const right: V = [47, left[1]];
  const fold: Region = [seg(origin, right), seg(right, left), seg(left, origin)];
  const base = 78;
  const slope = 1 / Math.sqrt(3);
  const insetSide = 41 / 71;
  const lines = [-33, -24, -15, -6, 3, 12, 21, 30, 39].map((x) => {
    const y = (base * slope + 7 * insetSide - x) / (slope + insetSide);
    const end: V = [x + (y - base) * slope, y];
    return thickSeg([x, base], end, 2.7);
  });
  const weave = carve([fold], lines);
  for (const turn of [0, 60, 120, 180, 240, 300]) c.fill("pot-stand", toPath(weave, { k: 1, turn }), "evenodd");
};
