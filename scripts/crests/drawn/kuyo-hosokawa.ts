import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const hosokawaKuyoBuild = (c: Builder): void => {
  const k = R / 139.2;
  const apart = 110 * k;
  const small = 29.2 * k;
  c.guideCircle(C0, R);
  c.guideCircle(C0, apart);
  c.guideSpokes(8);
  c.fill("star", toPath([disc([0, 0], 60.2 * k)], { k: 1 }), "evenodd");
  for (let i = 0; i < 8; i += 1) {
    const centre: V = [apart * Math.sin(i * 45 * DEG), apart * Math.cos(i * 45 * DEG)];
    c.fill("star", toPath([disc(centre, small)], { k: 1 }), "evenodd");
  }
};
