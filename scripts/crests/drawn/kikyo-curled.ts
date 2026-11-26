import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, circleThrough, onCircle, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, V } from "../../construct/compass.ts";

const FLOWER = "bellflower";
const plain = { k: 1 };

function bow(from: V, to: V, radius: number, on: V): Piece {
  return shortArc(circleThrough(from, to, radius, on), from, to);
}

export function musubiKikyoBuild(c: Builder): void {
  const outerTip: V = [0, 96];
  const innerTip: V = [0, 85];
  const endOuter: V = [30, 52];
  const endInner: V = [22, 52];
  const centre: V = [-25, 29];
  const outer: Circle = { c: centre, r: 20 };
  const inner: Circle = { c: centre, r: 12 };
  const curlStart = 154 * DEG;
  const curlEnd = 466 * DEG;
  const outerJoin = onCircle(centre, outer.r, curlStart);
  const innerJoin = onCircle(centre, inner.r, curlStart);
  const curlOutsideEnd = onCircle(centre, outer.r, curlEnd);
  const curlInsideEnd = onCircle(centre, inner.r, curlEnd);

  const outline = [
    bow(outerTip, outerJoin, 90, [80, 10]),
    arcTo(outer, outerJoin, curlOutsideEnd, true),
    seg(curlOutsideEnd, curlInsideEnd),
    arcTo(inner, curlInsideEnd, innerJoin, false),
    bow(innerJoin, innerTip, 90, [80, 10]),
    bow(innerTip, endInner, 62, [-35, 39]),
    seg(endInner, endOuter),
    bow(endOuter, outerTip, 70, [-35, 39]),
  ];
  for (let i = 0; i < 5; i += 1) c.fill(FLOWER, toPath([outline], { ...plain, turn: 72 * i }));
}
