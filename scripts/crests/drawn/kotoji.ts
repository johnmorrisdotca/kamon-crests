import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { DEG, arcA, circleThrough, mirrored, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const pushBridge = (): Region => {
  const chin: V = [8, 74];
  const neck: V = [11, 51];
  const shoulder: V = [36, 29];
  const toe: V = [70, -75];
  const heel: V = [18, -75];
  const over: V = [12, 11];
  const side = [seg(chin, neck), arc(neck, shoulder, 35, [49, 63]), arc(shoulder, toe, 105, [130, 4]),
    seg(toe, heel), arc(heel, over, 170, [184, 13])];
  const crown = arc(over, [-12, 11], 12.6, [0, 7]);

  return [seg([-8, 74], chin), ...side, crown, ...side.map(mirrored).map((p) =>
    p.t === "L" ? seg(p.b, p.a) : arcA(p.c, p.r, p.a1, p.a0),
  ).reverse()];
};

const place = (region: Region, k: number, turning: number, offset: V): Region => {
  const point = (p: V): V => [p[0] * k + offset[0], p[1] * k + offset[1]];

  return region.map((piece) => {
    const p = rotated(piece, -turning * DEG);

    return p.t === "L" ? seg(point(p.a), point(p.b)) : arcA(point(p.c), p.r * k, p.a0, p.a1);
  });
};

export const oshiKotojiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("koto-bridge", toPath([pushBridge()], { k: 0.93 }));
};

export const maruNiMitsuKotojiBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const bridge = place(pushBridge(), 0.57, 0, [0, -47]);
  for (const turn of [0, 120, 240]) c.fill("koto-bridge", toPath([bridge], { k: reach / R, turn }));
};
