// One ruled mountain band from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const yamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const slope = 1.2;
  const outer = 82;
  const inner = 49;
  const foot = -slope * outer / 2;
  const corners: V[] = [
    [-outer, foot], [0, foot + slope * outer], [outer, foot], [inner, foot], [0, foot + slope * inner], [-inner, foot],
  ];
  const band: Region = corners.map((corner, index) => seg(corner, corners[(index + 1) % corners.length]));
  c.fill("mountain", toPath([band], { k: 1 }));
};
