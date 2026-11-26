import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, reversed, rotated, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

/** Three veined leaves alternate with paired curls. */
export const tsuruGashiwaBuild = (c: Builder): void => {
  c.precision(3);
  const pair = [thickSeg([0, 10], [0, 77], 3.8)];
  for (const side of [-1, 1]) {
    pair.push(thickArc([side * 10.9, 77.8], 10.2, 3.45, side === 1 ? 2.55 : 0.59, side === 1 ? 7.05 : 5.09));
  }
  const leaf = veinedOak(85.9);
  c.guideCircle(C0, 96);
  c.guideSpokes(6, 0, 96);
  for (const turn of [0, 120, 240]) {
    c.fill("oak", toPath(leaf.map((loop) => turnOak(loop, turn)), { k: 0.982 }));
    c.fill("oak", toPath(carve(pair, []).map((loop) => turnOak(loop, turn + 60)), { k: 0.982 }));
  }
  c.fill("oak", toPath([disc([0, 0], 8.5)], { k: 0.982 }));
};
