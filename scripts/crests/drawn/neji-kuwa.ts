// The ringed melon of five turning lobes from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { dist, mid } from "../../construct/geo.ts";

type ThreePoints = [V, V, V];
type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const lobeArcs: ThreePoints[] = [
  [[0, 0], [-22, 13], [-33, 35]], [[-33, 35], [-30, 58], [-16, 74]],
  [[-16, 74], [2, 82], [20, 78]], [[20, 78], [34, 72], [34, 63]],
  [[34, 63], [30, 60], [26, 64]], [[26, 64], [8, 59], [-1, 48]],
  [[-1, 48], [-8, 24], [0, 0]],
];

export const maruNiNejiKuwaBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  const { c: centre, r, a0, a1 } = curve([[-0.6, 1], [-12, 38], [28, 69]]);
  const whiteSeam = thickArc(centre, r, 2.35, a0, a1);
  const lobe = carve([lobeArcs.map(curve)], [whiteSeam]);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("quince-lobes", toPath(lobe, { k: 1, turn }));
};
