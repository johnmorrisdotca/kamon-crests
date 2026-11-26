import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleCircle, circleThrough, disc, nearest, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const at = (radius: number, degrees: number): V => [radius * Math.cos(degrees * DEG), radius * Math.sin(degrees * DEG)];
const turnOutline = (regions: Region[], angle: number): Region[] => regions.map((loop) => loop.map((edge) => rotated(edge, angle * DEG)));
const ink = (c: Builder, regions: Region[], angle = 0): void => c.fill("snow-ring", toPath(turnOutline(regions, angle), { k: 1 }), "evenodd");

const lens = (from: V, to: V, radius: number): Region => {
  const [x, y] = to;
  const [dx, dy] = [x - from[0], y - from[1]];
  const [mx, my] = [(x + from[0]) / 2, (y + from[1]) / 2];
  const left = circleThrough(from, to, radius, [mx - dy, my + dx]);
  const right = circleThrough(from, to, radius, [mx + dy, my - dx]);

  return [shortArc(left, from, to), shortArc(right, to, from)];
};

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

const stripe = (x: number): Region => {
  const left = x - 1.6;
  const right = x + 1.6;
  const a: V = [left, Math.abs(left) / Math.sqrt(3)];
  const end = Math.sqrt(R * R - Math.max(left * left, right * right));
  const b: V = [left, end];
  const c: V = [right, end];
  const d: V = [right, Math.abs(right) / Math.sqrt(3)];
  const foot = x === 0 ? [seg(d, [0, 0]), seg([0, 0], a)] : [seg(d, a)];

  return [seg(a, b), seg(b, c), seg(c, d), ...foot];
};

export const kumoSnow = (c: Builder): void => {
  c.guideCircle(C0, R);
  const stripes = Array.from({ length: 19 }, (_, i) => stripe((i - 9) * 7.5));
  const root: V = [0, -70];
  const leaves = [lens(root, [0, -95], 34), lens(root, [-17, -89], 34), lens(root, [17, -89], 34)];
  const stem = thickSeg([0, 0], root, 3.4);
  for (const angle of [0, -120, -240]) ink(c, stripes, angle);
  const branch = carve([stem, ...leaves], []);
  for (const angle of [-120, -240, 0]) ink(c, branch, angle);
};
