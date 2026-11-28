// Five discs round a sixth, from frame 10 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { disc, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuBoshiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("star", toPath([disc([0, 0], 29)], { k: 1 }));
  for (let i = 0; i < 5; i += 1) c.fill("star", toPath([disc([0, 64], 32)], { k: 1, turn: 72 * i }));
};
