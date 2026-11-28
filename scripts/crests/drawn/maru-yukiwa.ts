// A disc of twelve shallow round bumps with six round eyes against its edge, from frame 41 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const maruYukiwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const polar = (distance: number, clock: number): V => [distance * Math.sin((clock * Math.PI) / 180), distance * Math.cos((clock * Math.PI) / 180)];
  const bumps = Array.from({ length: 12 }, (_, i) => disc(polar(58, 15 + 30 * i), 33));
  const eyes = Array.from({ length: 6 }, (_, i) => disc(polar(78, 60 * i), 6.5));
  c.fill("snow-ring", toPath(carve([...bumps, disc([0, 0], 58)], eyes), { k: 1 }), "evenodd");
};
