import type { Builder } from "../../construct/builder.ts";
import { arcA, circleThrough, mirrored, seg, shortArc, toPath } from "../../construct/compass.ts";
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

export const oshiKotojiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("koto-bridge", toPath([pushBridge()], { k: 0.93 }));
};
