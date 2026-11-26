// A flat tile with its written face measured from frame 33 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, seg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const arc = (from: V, via: V, to: V): Arc => {
  const c = lineLine(...bisector(from, via), ...bisector(via, to));
  const turn = (via[0] - from[0]) * (to[1] - from[1]) > (via[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

export const futowaNiHitotsuKomaBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thick");
  c.guideLine([100, 4], [100, 196]);
  const tile = polygon([[0, 62], [38, 41], [49, -44], [-49, -44], [-38, 41]]);
  const downstroke = polygon([[-5, 42], [1, 39], [1, 9], [-6, 3]]);
  const crossStroke = polygon([[0, 6], [10, 17], [14, 15], [12, 9], [4, 2], [-5, -4], [-9, -1]]);
  const lowerStroke: Region = [
    arc([5, 3], [-1, -4], [-4, -11]),
    arc([-4, -11], [2, -22], [8, -34]),
    seg([8, -34], [5, -37]),
    arc([5, -37], [-2, -28], [-9, -15]),
    arc([-9, -15], [-10, -6], [-5, 1]),
    seg([-5, 1], [5, 3]),
  ];
  c.fill("promoted-shogi-pawn", toPath(carve([tile], [downstroke, crossStroke, lowerStroke]), { k: 1 }));
};
