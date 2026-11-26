import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { arcA, disc, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
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

const roundedSquare = (origin: V, half: number, radius: number): Region => {
  const [x, y] = origin;
  const k = half - radius;
  const top: Region = [seg([-k, half], [k, half]), arcA([k, k], radius, Math.PI / 2, 0)];
  const sides = [0, 1, 2, 3].flatMap((n) => top.map((p) => rotated(p, (-n * Math.PI) / 2)));
  const at = (p: V): V => [p[0] + x, p[1] + y];

  return sides.map((p) => p.t === "L" ? seg(at(p.a), at(p.b)) : arcA(at(p.c), p.r, p.a0, p.a1));
};

export const futoKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  c.fill("horse-bit", toPath([disc([0, 0], 94), ...quarters(40, 12)], { k: 1 }), "evenodd");
};

export const hanaKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  c.fill("horse-bit", toPath([disc([0, 0], 94), ...quarters(65, 14.5)], { k: 1 }), "evenodd");
};

export const maruNiKutsuwaBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  c.fill("horse-bit", toPath([disc([0, 0], reach), ...quarters(reach * 0.71, 11.5)], { k: 1 }), "evenodd");
};

export const kakuKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  const eyes = [[-22, -22], [-22, 22], [22, 22], [22, -22]].map((p) => roundedSquare(p as V, 9.6, 1.7));

  c.fill("horse-bit", toPath([roundedSquare([0, 0], 70.5, 14.6), ...eyes], { k: 1 }), "evenodd");
};

export const uchidaKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const centre: V = [0, 0];
  const eye: V = [0, 84.7];
  c.guideSpokes(4, 0, R);
  for (const turn of [0, 90, 180, 270]) {
    c.fill("horse-bit", toPath([disc(eye, 10), disc(eye, 6)], { k: 1, turn }), "evenodd");
  }
  c.fill("horse-bit", toPath([disc(centre, 77.5), disc(centre, 57.3)], { k: 1 }), "evenodd");
  c.fill("horse-bit", toPath([disc(centre, 54.4), ...quarters(45.3, 12.3)], { k: 1 }), "evenodd");
};

export const kageNoKutsuwaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  const centre: V = [0, 0];
  const perimeter = [disc(centre, 94), disc(centre, 89.8)];
  const openings = [
    ...quarters(71.3, 13.8), ...quarters(69.6, 15.5),
    ...quarters(67.1, 18), ...quarters(65.4, 19.7),
  ];
  c.fill("horse-bit", toPath([...perimeter, ...openings], { k: 1 }), "evenodd");
};
