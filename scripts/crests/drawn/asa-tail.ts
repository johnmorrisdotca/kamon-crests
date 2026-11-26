// Hemp ornaments from frame 35 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carve, circleThrough, mirrored, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const hempOutline = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

const hempIncision = (start: V, end: V, r: number): Region => {
  const mid: V = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  return [
    shortArc(circleThrough(start, end, r, [mid[0] - dy, mid[1] + dx]), start, end),
    shortArc(circleThrough(end, start, r, [mid[0] + dy, mid[1] - dx]), end, start),
  ];
};

/** Three groups of pointed leaves turn around the small opening. */
export const mitsuwariAsaNoHaBuild = (c: Builder): void => {
  c.precision(3);
  const outline = hempOutline([[0, 94], [23, 56], [63, 62], [51, 33], [27, 18], [0, 11], [-27, 18], [-51, 33], [-63, 62], [-23, 56]]);
  const side = hempIncision([7, 19], [54, 55], 170);
  const mid = hempIncision([0, 18], [0, 87], 229);
  const one = carve([outline], [mid, side, side.map(mirrored)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(6, 0, 96);
  for (const turn of [0, 120, 240]) c.fill("hemp-leaf", toPath(one, { k: 0.985, turn }));
};
