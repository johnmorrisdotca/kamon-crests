// The quince with crossed vines measured from frame 44 of the 1892 book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import { fourLobedMokko } from "./mokko.ts";


export const tsuruMokkoBuild = (c: Builder): void => {
  c.precision(3);
  fourLobedMokko(c, R);
  const reach = 78;
  const stalk = thickSeg([0, 9.2], [0, reach], 3.8);
  const curls = [
    thickArc([-5.6, reach], 5.6, 3.8, -22 * DEG, 219 * DEG),
    thickArc([5.6, reach + 2.5], 5.6, 3.8, -41 * DEG, 206 * DEG),
  ];
  const tips = carve([stalk, ...curls], []);
  for (const turn of [51, 129, 231, 309]) c.fill("quince-lobes", toPath(tips, { k: 1, turn }));
};
