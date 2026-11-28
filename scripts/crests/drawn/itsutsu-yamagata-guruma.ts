// Five bent ruled bands turned about the centre, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const itsutsuYamagataGurumaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const upper = (42 * Math.PI) / 180;
  const lower = (38 * Math.PI) / 180;
  const width = 13;
  const cotangents = 1 / Math.tan(upper) + 1 / Math.tan(lower);
  const tip: V = [0, R];
  const foot: V = [0, R - width / Math.sin(upper)];
  const near: V = [0, width / Math.sin(lower)];
  const outerX = -R / cotangents;
  const outerElbow: V = [outerX, -outerX / Math.tan(lower)];
  const innerX = (near[1] - foot[1]) / cotangents;
  const innerElbow: V = [innerX, near[1] - innerX / Math.tan(lower)];
  const outline: V[] = [tip, outerElbow, [0, 0], near, innerElbow, foot];
  const band: Region = outline.map((point, index) => seg(point, outline[(index + 1) % outline.length]));
  for (let i = 0; i < 5; i += 1) c.fill("mountain", toPath([band], { k: 1, turn: 72 * i }));
};
