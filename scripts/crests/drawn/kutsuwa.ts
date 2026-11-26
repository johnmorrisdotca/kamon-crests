import type { Builder } from "../../construct/builder.ts";
import { disc, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const quarters = (reach: number, halfCross: number): Region[] => {
  const neck = Math.sqrt(reach * reach - halfCross * halfCross);
  const a: V = [halfCross, neck];
  const b: V = [neck, halfCross];
  const corner: V = [halfCross, halfCross];
  const one = [shortArc({ c: [0, 0], r: reach }, a, b), seg(b, corner), seg(corner, a)];

  return [0, 1, 2, 3].map((n) => one.map((piece) => rotated(piece, (n * Math.PI) / 2)));
};

export const futoKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  c.fill("horse-bit", toPath([disc([0, 0], 94), ...quarters(40, 12)], { k: 1 }), "evenodd");
};
