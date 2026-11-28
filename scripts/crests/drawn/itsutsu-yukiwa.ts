// A ring of twelve round bumps with five round holes in it, from frame 15 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuYukiwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const polar = (distance: number, clock: number): V => [distance * Math.sin((clock * Math.PI) / 180), distance * Math.cos((clock * Math.PI) / 180)];
  const bumps = Array.from({ length: 12 }, (_, i) => disc(polar(52, 30 * i), 40));
  const holes = Array.from({ length: 5 }, (_, i) => disc(polar(79, 72 * i), 6.8));
  c.fill("snow-ring", toPath(carve(bumps, [disc([0, 0], 69), ...holes]), { k: 1 }), "evenodd");
};
