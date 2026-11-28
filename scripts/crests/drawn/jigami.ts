import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, lineLine, moved, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R, circle } from "../../construct/geo.ts";

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

/**
 * 丸に地紙 (frame 36, right r2c3): one fan paper in a ring drawn at the cell's width. In the book's pixels from the ring's centre:
 * the ring from 129 to 156; the paper's upper corners 123.75 out and 24.5 up, its lower ones 73.75 out and 62 down; its upper edge an
 * arc through them and 75 up, its lower edge an arc through them and 22.5 down; its sides ruled.
 */
export const maruNiJigamiBuild = (c: Builder): void => {
  const [outer, inner] = [156, 129];
  const k = R / outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner * k);
  c.fill("frame", circle(C0, R).join(circle(C0, inner * k)), "evenodd");
  const up: V = [123.75, 24.5];
  const down: V = [73.75, -62];
  const shape: Region = [
    arcThrough([-up[0], up[1]], [0, 75], up),
    seg(up, down),
    arcThrough(down, [0, -22.5], [-down[0], down[1]]),
    seg([-down[0], down[1]], [-up[0], up[1]]),
  ];
  c.fill("fan-paper", toPath([shape], { k }));
};

/** The arc from `a` through `m` to `b`, on the circle through the three. */
const arcThrough = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), normal(mid(a, m), m), mid(m, b), normal(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};
