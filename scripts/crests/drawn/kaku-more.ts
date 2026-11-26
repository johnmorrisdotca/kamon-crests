// Two corner-up square variants measured from frame 19 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { disc, toPath } from "../../construct/compass.ts";
import { C0, CX, CY, R } from "../../construct/geo.ts";
import { diamond } from "./kaku.ts";

const layout = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
};

export const komochiKakuBuild = (c: Builder): void => {
  layout(c);
  c.fill("square-frame", toPath([diamond([0, 0], R), diamond([0, 0], 56)], { k: 1 }), "evenodd");
  c.fill("square-frame", toPath([diamond([0, 0], 44), diamond([0, 0], 36)], { k: 1 }), "evenodd");
};

export const teppoKakuBuild = (c: Builder): void => {
  layout(c);
  c.guideCircle(C0, 62.5);
  c.fill("square-frame", toPath([diamond([0, 0], R), disc([0, 0], 62.5)], { k: 1 }), "evenodd");
};
