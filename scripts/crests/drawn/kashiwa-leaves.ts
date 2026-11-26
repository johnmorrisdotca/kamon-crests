import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const bowOak = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const arc = shortArc(circleThrough(from, to, radius, hint), from, to);
  if (arc.t !== "A") throw new Error("The oak band needs a compass arc.");
  return thickArc(arc.c, arc.r, width, arc.a0, arc.a1);
};

const turnOak = (loop: Region, turn: number): Region => loop.map((piece) => rotated(piece, turn * DEG));

/** The toothed edges point away from a round heart in three equal directions. */
export const kabuGashiwaBuild = (c: Builder): void => {
  c.precision(3);
  const coordinates: V[] = [[0, 92], [14, 75], [16, 63], [26, 68], [25, 52], [19, 42], [31, 45], [26, 29],
    [17, 15], [0, 7], [-17, 15], [-26, 29], [-31, 45], [-19, 42], [-25, 52], [-26, 68], [-16, 63], [-14, 75]];
  const outline = coordinates.map((p, index) => seg(p, coordinates[(index + 1) % coordinates.length]));
  const white = [disc([0, 0], 10.25), thickSeg([0, 10], [0, 83], 2)];
  for (const side of [-1, 1]) {
    for (const [foot, tip, x] of [[23, 46, 23], [36, 54, 19], [47, 66, 14], [60, 76, 12]]) {
      white.push(bowOak([0, foot], [x * side, tip], 58, [55 * side, foot - 14], 1.75));
    }
  }
  const leaf = carve([outline], white);
  c.guideCircle(C0, 96);
  c.guideSpokes(6, 0, 96);
  for (const turn of [0, 120, 240]) c.fill("oak", toPath(leaf.map((loop) => turnOak(loop, turn)), { k: 0.98 }));
  c.fill("oak", toPath([disc([0, 0], 8.6)], { k: 0.98 }));
};
