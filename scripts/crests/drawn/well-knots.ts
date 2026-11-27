import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const quarters = [0, 90, 180, 270];

const archedBand = (gap: number): Region => {
  const centreOfArc = (halfSpan: number, sagitta: number, level: number): Circle => {
    const r = (halfSpan * halfSpan + sagitta * sagitta) / (2 * sagitta);
    return { c: [0, level + sagitta - r], r };
  };
  const level = 1.8 - gap;
  const outer = R - 1.7 + gap;
  const inner = R * 0.735 - gap;
  const outerCircle = centreOfArc(outer, 43 + 2 * gap, level);
  const innerCircle = centreOfArc(inner, 25 - 2 * gap, level);
  const outerLeft: V = [-outer, level];
  const outerRight: V = [outer, level];
  const innerLeft: V = [-inner, level];
  const innerRight: V = [inner, level];
  return [shortArc(outerCircle, outerLeft, outerRight), seg(outerRight, innerRight),
    shortArc(innerCircle, innerRight, innerLeft), seg(innerLeft, outerLeft)];
};

/** Four compass bands, each covered at the left crossing by the next band. */
export const wachigaiIBuild = (c: Builder): void => {
  c.precision(3);
  const cover = archedBand(1.25).map((piece) => rotated(piece, 90 * DEG));
  const top = carve([archedBand(0)], [cover]);
  for (const angle of quarters) {
    const bands = top.map((loop) => loop.map((piece) => rotated(piece, angle * DEG)));
    c.fill("well-frame", toPath(bands, { k: 1 }), "evenodd");
  }
};
