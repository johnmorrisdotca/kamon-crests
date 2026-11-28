// One flat triangle in a thin ring, from frame 25 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";

export const maruNiHitotsuUrokoBuild = (c: Builder): void => {
  c.precision(3);
  const band = 11.3;
  c.guideCircle(C0, R);
  c.guideCircle(C0, R - band);
  c.fill("frame", circle(C0, R).join(circle(C0, R - band)), "evenodd");
  const corners: V[] = [[0, 50], [-76.6, -30], [76.6, -30]];
  const triangle: Region = corners.map((corner, index) => seg(corner, corners[(index + 1) % corners.length]));
  c.fill("scale", toPath([triangle], { k: 1 }));
};
