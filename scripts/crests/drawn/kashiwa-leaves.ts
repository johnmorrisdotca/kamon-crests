import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const bowOak = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const arc = shortArc(circleThrough(from, to, radius, hint), from, to);
  if (arc.t !== "A") throw new Error("The oak band needs a compass arc.");
  return thickArc(arc.c, arc.r, width, arc.a0, arc.a1);
};

const turnOak = (loop: Region, turn: number): Region => loop.map((piece) => rotated(piece, turn * DEG));

const veinedOak = (reach: number): Region[] => {
  const tip: V = [0, reach];
  const root: V = [0, 9];
  const edge = (side: number): Region => {
    const outside: V = [side * reach * 0.37, reach * 0.49];
    return [
      shortArc(circleThrough(tip, outside, reach * 0.68, [-side * reach * 0.30, reach * 0.44]), tip, outside),
      shortArc(circleThrough(outside, root, reach * 0.91, [-side * reach * 0.48, reach * 0.72]), outside, root),
    ];
  };
  const leaf = [...edge(1), ...edge(-1).reverse().map(reversed)];
  const flanks = [-1, 1].flatMap((side) => [0, 1, 2, 3].map((n) => disc([side * (0.29 - n * 0.036) * reach, (0.35 + n * .13) * reach], reach * 0.095)));
  const veins: Region[] = [thickSeg([0, 8], [0, reach * 0.92], 2)];
  for (const side of [-1, 1]) for (let n = 0; n < 4; n += 1) {
    veins.push(bowOak([0, (0.23 + n * 0.135) * reach], [(0.28 - n * 0.039) * reach * side, (0.43 + n * 0.134) * reach], reach * .77, [reach * 0.51 * side, reach * 0.11], 1.75));
  }
  return carve([leaf, ...flanks], [...veins, disc([0, 0], 10.5)]);
};


/** The Tosa arrangement retains the two long lower leaves under the upright one. */
export const tsuyoItowaNiTosaGashiwaBuild = (c: Builder, inner: number): void => {
  c.precision(3);
  const upper = veinedOak(85);
  const lower = veinedOak(92);
  const k = (inner - 2.6) / 92;
  c.guideSpokes(6, 0, inner);
  c.fill("oak", toPath(upper, { k }));
  for (const turn of [113, 247]) c.fill("oak", toPath(lower.map((loop) => turnOak(loop, turn)), { k }));
  c.fill("oak", toPath([disc([0, 0], 8)], { k }));
};

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
