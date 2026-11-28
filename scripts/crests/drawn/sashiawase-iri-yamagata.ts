// Two ruled mountain bands set into each other, each with one short leg, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const slope = 1.8;
const base = -55.8;
const outer = 62;
const inner = 41;
const shift = 15.25;
const step = 37;
const gap = 1.6;

const polygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

/** A chevron band centred on `centre`, one foot cut short at `step` above the other; `grow` thickens it by that much on every edge. */
const chevron = (centre: number, short: "left" | "right", grow = 0, drop = 0): Region => {
  const run = grow / Math.sin(Math.atan(slope));
  const out = outer + run;
  const inn = inner - run;
  const footLeft = base + (short === "left" ? step : 0) - drop;
  const footRight = base + (short === "right" ? step : 0) - drop;
  const left = (y: number, half: number): V => [centre - half + (y - base) / slope, y];
  const right = (y: number, half: number): V => [centre + half - (y - base) / slope, y];

  return polygon([left(footLeft, out), [centre, base + out * slope], right(footRight, out), right(footRight, inn), [centre, base + inn * slope], left(footLeft, inn)]);
};

export const sashiawaseIriYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("mountain", toPath(carve([chevron(-shift, "right")], [chevron(shift, "left", gap, 4)]), { k: 1 }));
  c.fill("mountain", toPath([chevron(shift, "left")], { k: 1 }));
};
