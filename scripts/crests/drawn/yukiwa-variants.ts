import type { Builder } from "../../construct/builder.ts";
import { DEG, circleCircle, circleThrough, disc, nearest, rotated, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const at = (radius: number, degrees: number): V => [radius * Math.cos(degrees * DEG), radius * Math.sin(degrees * DEG)];
const turnOutline = (regions: Region[], angle: number): Region[] => regions.map((loop) => loop.map((edge) => rotated(edge, angle * DEG)));
const ink = (c: Builder, regions: Region[], angle = 0): void => c.fill("snow-ring", toPath(turnOutline(regions, angle), { k: 1 }), "evenodd");

export const iwakazeSnow = (c: Builder): void => {
  const hub = 13;
  c.guideCircle(C0, R);
  c.guideCircle(C0, hub);
  const ray = thickSeg([0, hub], [0, 88], 3);
  const origin: V = [0, 0];
  const tip = at(R, 30);
  const clear = { c: origin, r: hub + 1 };
  const first = circleThrough(origin, tip, 84, at(R, 120));
  const second = circleThrough(origin, tip, 84, at(R, -60));
  const near = at(clear.r, 30);
  const a = nearest(circleCircle(clear.c, clear.r, first.c, first.r), near);
  const b = nearest(circleCircle(clear.c, clear.r, second.c, second.r), near);
  const petal = [shortArc(first, a, tip), shortArc(second, tip, b), shortArc(clear, b, a)];
  for (const angle of [0, -120, -240]) ink(c, [ray], angle);
  for (const angle of [0, -120, -240]) ink(c, [petal], angle);
  ink(c, [disc([0, 0], hub)]);
};
