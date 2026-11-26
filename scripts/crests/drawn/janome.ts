import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, onCircle, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const eye = (centre: V, reach: number): Region[] => [disc(centre, reach), disc(centre, reach * 0.42)];

export const nanatsuJanomeBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  c.fill("snake-eye", toPath(eye([0, 0], 32), { k: 1 }), "evenodd");
  const outer = eye([0, 61], 29);
  for (const turn of [0, 60, 120, 180, 240, 300]) c.fill("snake-eye", toPath(outer, { k: 1, turn }), "evenodd");
};

/** Five pierced eyes overlap their neighbours in a clockwise turn. */
export const itsutsuNejiJanomeBuild = (c: Builder): void => {
  c.precision(3);
  const centre: V = [0, 48];
  const reach = 48;
  const [outer, hole] = eye(centre, reach);
  const next = onCircle([0, 0], centre[1], 18 * DEG);
  const overlap = disc(next, reach + .9);
  const layer = carve([outer], [hole, overlap]);
  c.guideCircle(C0, R);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("snake-eye", toPath(layer, { k: 1, turn }));
};
