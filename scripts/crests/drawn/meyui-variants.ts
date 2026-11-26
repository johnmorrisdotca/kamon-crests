// Further knot eyes measured from frames 19 and 20 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { R } from "../../construct/geo.ts";
import { diamond, eye, eyesOnAxes, layout } from "./meyui.ts";

export const kakeYotsumeBuild = (c: Builder): void => {
  layout(c);
  for (const at of eyesOnAxes(53)) {
    const nested = eye(at, R - 53, 34).join(diamond(at, 17)).join(diamond(at, 8));
    c.fill("knot-eye", nested, "evenodd");
  }
};
