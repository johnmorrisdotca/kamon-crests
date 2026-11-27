import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleCircle, disc, nearest, rotated, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

type Cut = [centre: V, radius: number, near: V];
// The broad hook and the small curl beside it, measured from the upper lobe.
const outer: Cut[] = [
  [[-4, 49], 37, [-13, 13]],
  [[6, 54], 48, [-33, 27]],
  [[-11, 57], 31, [-42, 57]],
  [[2, 46], 46, [-18, 87]],
  [[16, 71], 18, [19, 89]],
  [[20, 65], 14, [34, 68]],
  [[20, 70], 19, [20, 51]],
  [[29, 21], 60, [1, 74]],
  [[13, 49], 37, [-24, 50]],
  [[-14, 18], 5, [-13, 22]],
];
const inner: Cut[] = [
  [[84, 47], 95, [-6, 15]],
  [[4, 34], 14, [-10, 33]],
  [[-1, 34], 12, [-3, 46]],
  [[3, 42], 7, [9, 40]],
  [[4, 30], 7, [0, 36]],
  [[-5, 21], 6, [0, 24]],
];

const outline = (cuts: Cut[]): Region => {
  const circles = cuts.map(([c, r]): Circle => ({ c, r }));
  const joins = circles.map((circle, i) => {
    const prior = circles[(i + circles.length - 1) % circles.length];
    return nearest(circleCircle(prior.c, prior.r, circle.c, circle.r), cuts[i][2]);
  });
  return circles.map((circle, i) => shortArc(circle, joins[i], joins[(i + 1) % joins.length]));
};

export function nejiTomoeBuild(c: Builder): void {
  c.precision(3);
  const broad = outline(outer);
  const narrow = outline(inner);
  const above = broad.map((piece) => rotated(piece, -72 * DEG));
  const seam = above.flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, 3.8, piece.a0, piece.a1)] : []);
  const centre = disc([0, 0], 17);
  const petals = carve([broad, narrow], [centre, above, ...seam]);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("tomoe", toPath(petals, { k: 1, turn }), "evenodd");
  c.fill("tomoe", toPath(carve([centre], [disc([0, 0], 15)]), { k: 1 }), "evenodd");
}
