// Embracing and round millet sprays from frame 35 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, disc, lineLine, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type ThreePoints = [V, V, V];

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const stroke = ({ c, r, a0, a1 }: Arc, width: number): Region => thickArc(c, r, width, a0, a1);

const ears = [1, 2, 3, 4, 4, 4, 3, 3, 2, 1].flatMap((count, row) => Array.from({ length: count }, (_, seed) =>
  disc([(seed - (count - 1) / 2) * 4.25, (4.5 - row) * 3.75], 1.76),
));

export const awaNoMaruBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const sweep = thickArc([0, 0], 93.4, 4.95, 0.08, 2 * Math.PI - 0.12);
  const highStem = stroke(curve([[-31, 69], [-70, 13], [-52, -46]]), 4.5);
  const lowStem = stroke(curve([[-52, -46], [-11, -80], [37, -84]]), 5.15);
  const middleStem = [
    stroke(curve([[-25, 7], [-34, -33], [-13, -72]]), 4.6),
    stroke(curve([[-13, -72], [9, -86], [40, -84]]), 4.6),
  ];
  const inwardLeaf = [
    curve([[55, -79], [11, -56], [-6, -10]]),
    curve([[-6, -10], [23, 42], [61, 47]]),
    curve([[61, 47], [29, 35], [5, -11]]),
    curve([[5, -11], [18, -53], [55, -79]]),
  ];
  const outerLeaf = [
    curve([[37, -76], [61, -57], [92, -12]]),
    curve([[92, -12], [77, -57], [37, -76]]),
  ];
  const lowLeaf = [
    curve([[29, -90], [-24, -69], [-45, -32]]),
    curve([[-45, -32], [-42, 17], [-20, 50]]),
    curve([[-20, 50], [-34, 16], [-34, -32]]),
    curve([[-34, -32], [-16, -66], [29, -90]]),
  ];
  c.fill("millet", toPath([sweep, highStem, lowStem, ...middleStem, inwardLeaf, outerLeaf, lowLeaf], { k: 1 }));
  c.fill("millet", toPath(ears, { k: 1.6, at: [-8, 68], turn: 94 }));
  c.fill("millet", toPath(ears, { k: 1.10, at: [-19, 8], turn: 20 }));
};
