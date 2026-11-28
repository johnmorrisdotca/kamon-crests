import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { DEG, carve, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const musubiKuyoBuild = (c: Builder): void => {
  const radius = R / 2;
  const half = WEIGHT.thread / 2;
  const centres: V[] = [[0, 0], ...[0, 1, 2, 3, 4, 5].map((i): V => [radius * Math.sin(i * 60 * DEG), radius * Math.cos(i * 60 * DEG)])];
  c.guideCircle(C0, R);
  for (const centre of centres) c.fill("star", toPath(carve([disc(centre, radius + half)], [disc(centre, radius - half)]), { k: 1 }), "evenodd");
};
