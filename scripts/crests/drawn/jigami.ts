import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, moved, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arch = (a: V, b: V, radius: number): Region => [shortArc(circleThrough(a, b, radius, [0, -150]), a, b)];

const paper = (margin = 0): Region => {
  const topLeft: V = [-74 - margin, 9 + margin];
  const topRight: V = [74 + margin, 9 + margin];
  const footRight: V = [43 - margin, -38 - margin];
  const footLeft: V = [-43 + margin, -38 - margin];
  return [...arch(topLeft, topRight, 119), seg(topRight, footRight), ...arch(footRight, footLeft, 56), seg(footLeft, topLeft)];
};

export const sangaiJigamiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const at = (shape: Region, y: number): Region => shape.map((edge) => moved(edge, [0, y]));
  const leaf = paper();
  const shadow = paper(2.0);
  const bottom = at(leaf, -26);
  const middle = carve([at(leaf, 4)], [at(shadow, -26)]);
  const top = carve([at(leaf, 34)], [at(shadow, 4)]);
  c.fill("fan-paper", toPath(top, { k: 0.98 }), "evenodd");
  c.fill("fan-paper", toPath(middle, { k: 0.98 }), "evenodd");
  c.fill("fan-paper", toPath([bottom], { k: 0.98 }));
};
