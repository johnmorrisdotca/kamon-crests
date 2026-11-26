import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, rotated, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const spool = (r: number): Region => {
  const top: V = [0, r];
  const right: V = [r, 0];
  const one = arc(top, right, r * 1.65, [2 * r, 2 * r]);

  return [0, 90, 180, 270].map((turn) => rotated(one, -turn * DEG));
};

export const mitsuIrekoItomakiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(4, 0, R);
  c.fill("thread-spool", toPath([spool(96), spool(71)], { k: 1 }), "evenodd");
  c.fill("thread-spool", toPath([spool(47), spool(23)], { k: 1 }), "evenodd");
};
