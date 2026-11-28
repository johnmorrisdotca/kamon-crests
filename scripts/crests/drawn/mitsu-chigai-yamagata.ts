// Three ruled mountain bands, the middle one woven behind the outer two, from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

interface Mountain {
  apex: number;
  height: number;
  left: number;
  right: number;
  width: number;
}

const base = -51.9;
const gap = 1.6;

const outline = ({ apex, height, left, right, width }: Mountain): Region => {
  const rise = (height * (left + right - 2 * width)) / (left + right);
  const innerApex: V = [apex - left + width + (rise * left) / height, base + rise];

  return polygon([[apex - left, base], [apex, base + height], [apex + right, base], [apex + right - width, base], innerApex, [apex - left + width, base]]);
};

/** The band's right or left leg, thickened by the gap on both edges, and run on below the foot. */
const leg = ({ apex, height, left, right, width }: Mountain, side: "left" | "right"): Region => {
  const reach = side === "left" ? left : right;
  const drift = (Math.hypot(reach, height) / height) * gap;
  const sign = side === "left" ? -1 : 1;
  const at = (offset: number, y: number): number => apex + sign * (reach - offset - ((y - base) * reach) / height);
  const top = base + height * 0.7;
  const low = base - 3;

  return polygon([
    [at(0, low) + sign * drift, low], [at(0, top) + sign * drift, top], [at(width, top) - sign * drift, top], [at(width, low) - sign * drift, low],
  ]);
};

export const mitsuChigaiYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const first: Mountain = { apex: -41.2, height: 94, left: 33.7, right: 42.6, width: 13.5 };
  const last: Mountain = { apex: 35.1, height: 94, left: 33.7, right: 42.6, width: 13.5 };
  const middle: Mountain = { apex: -3, height: 103.8, left: 37.6, right: 54.1, width: 15 };
  c.fill("mountain", toPath(carve([outline(middle)], [leg(first, "right"), leg(last, "left")]), { k: 1 }));
  c.fill("mountain", toPath([outline(first)], { k: 1 }));
  c.fill("mountain", toPath([outline(last)], { k: 1 }));
};
