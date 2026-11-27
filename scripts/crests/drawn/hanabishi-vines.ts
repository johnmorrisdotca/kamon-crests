import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, disc, inside, mirrored, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

// The round shoulders leave room for both forked vine tips on each diagonal.
const tip = disc([0, 72], 20);
const shoulder = disc([24, 53], 17);
const shoulders = [shoulder, shoulder.map(mirrored)];
const root = disc([0, 0], 56);
const middle = disc([0, 0], 14);
const stamen = [disc([39, 25], 40.7), disc([-39, 25], 40.7)];
const sides = [seg([-200, -193], [200, 207]), seg([-200, 207], [200, -193])];
const petal = carveWhere([tip, ...shoulders, root, middle, ...stamen, ...sides].flat(), (p) =>
  p[1] - Math.abs(p[0]) > 7 && !inside(middle, p) &&
  [tip, ...shoulders, root].some((loop) => inside(loop, p)) &&
  !stamen.every((loop) => inside(loop, p)),
);

type Arc = Extract<Piece, { t: "A" }>;
const arc = (a: V, b: V, r: number, near: V): Arc => shortArc(circleThrough(a, b, r, near), a, b) as Arc;
const upper: Arc[] = [
  arc([41, 41], [55, 62], 47, [15, 75]),
  arc([55, 62], [49, 72], 9, [48, 63]),
  arc([49, 72], [42, 65], 7, [49, 65]),
  arc([42, 65], [48, 65], 4, [45, 67]),
];

const stroke = (list: Arc[], width: number): Region[] => list.flatMap(({ c, r, a0, a1 }) => [
  thickArc(c, r, width, a0, a1),
  disc([c[0] + r * Math.cos(a1), c[1] + r * Math.sin(a1)], width / 2),
]);
const reflected = (loop: Region): Region => loop.map(mirrored).map(piece => rotated(piece, -Math.PI / 2));
const ink = stroke(upper, 5.5);
const stem = thickSeg([8, 8], [46, 46], 4.2);
// Touching a round cap at a tangent can leave an arc with coincident ends.
const branch = carve([stem, ...ink, ...ink.map(reflected)], [middle])
  .map((loop) => loop.filter((piece) => piece.t !== "A" || Math.abs(piece.a1 - piece.a0) > 1e-6));
const bead = carve([disc([0, 0], 12.3)], [disc([0, 0], 2.3)]);

export function shihoTsuruHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 90, 180, 270]) {
    c.fill("flower-lozenge", toPath(petal, { k: 1, turn }), "evenodd");
    c.fill("flower-lozenge", toPath(branch, { k: 1, turn }), "evenodd");
  }
  c.fill("flower-lozenge", toPath(bead, { k: 1 }), "evenodd");
}
