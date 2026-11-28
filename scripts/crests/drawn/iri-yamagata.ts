// Two ruled mountain bands, the right one passing in front of the left, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const slope = 1.55;
const base = -49.6;
const outer = 64;
const inner = 41;
const shift = 16;
const gap = 1.6;

const polygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

const chevron = (centre: number, grow = 0, drop = 0): Region => {
  const run = grow / Math.sin(Math.atan(slope));
  const out = outer + run;
  const inn = inner - run;
  const foot = base - drop;

  return polygon([
    [centre - out - drop / slope, foot], [centre, base + out * slope], [centre + out + drop / slope, foot],
    [centre + inn + drop / slope, foot], [centre, base + inn * slope], [centre - inn - drop / slope, foot],
  ]);
};

export const iriYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("mountain", toPath(carve([chevron(-shift)], [chevron(shift, gap, 4)]), { k: 1 }));
  c.fill("mountain", toPath([chevron(shift)], { k: 1 }));
};
