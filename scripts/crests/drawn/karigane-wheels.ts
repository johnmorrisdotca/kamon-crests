// Circular wing, neck and tail arcs measured from frame 18 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);

  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

// The two perpendicular bisectors give the centre of the circle struck through three measured landmarks.
const curve = (from: V, through: V, to: V): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const left = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);

  return arcTo({ c, r: dist(c, from) }, from, to, left) as Arc;
};

const seam = ({ c, r, a0, a1 }: Arc, width: number): Region => thickArc(c, r, width, a0, a1);
const eye = (centre: V, radius: number): Region => carve([disc(centre, radius)], [disc(centre, radius * 0.4)]).flat();

export const daizenKariganeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const left: V = [-84, 33];
  const shoulder: V = [-23, 66];
  const beak: V = [-29, 77];
  const forehead: V = [-12, 82];
  const nape: V = [24, 67];
  const right: V = [82, 41];
  const rightRoot: V = [33, 48];
  const tail: V = [6, 2];
  const leftRoot: V = [-23, 43];
  const outline = [
    curve(left, [-58, 58], shoulder), seg(shoulder, beak), seg(beak, forehead),
    curve(forehead, [9, 94], nape), curve(nape, [57, 58], right),
    curve(right, [58, 49], rightRoot), curve(rightRoot, [37, 24], tail),
    curve(tail, [-19, 17], leftRoot), curve(leftRoot, [-52, 48], left),
  ];
  const openings = [
    eye([9, 82], 5.3), disc([4, 33], 4.1),
    thickSeg([-27, 75], [-13, 74], 1.8),
    seam(curve(leftRoot, [-11, 58], nape), 1.9),
    seam(curve([4, 33], [13, 43], rightRoot), 1.8),
  ];
  const bird = carve([outline], openings);
  for (const turn of [0, 180]) c.fill("goose", toPath(bird, { k: 1, turn }));
};
