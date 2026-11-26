import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const mitsuChigiriBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const edges: V[] = [
    [0, 61], [39, 24], [25, 11], [33, 3], [49, 15],
    [88, -22], [46, -61], [8, -25], [25, -8], [17, -2],
    [0, -18], [-17, -2], [-25, -8], [-8, -25], [-46, -61],
    [-88, -22], [-49, 15], [-33, 3], [-25, 11], [-39, 24],
  ];
  const joined = edges.map((p, i) => seg(p, edges[(i + 1) % edges.length]));
  c.fill("weaving-beam", toPath([joined], { k: 1 }));
};
