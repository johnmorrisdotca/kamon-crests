// Three interwoven geese measured from frame 18 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, carveWhere, disc, lineLine, seg, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

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

export const kanawaKariganeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);

  const outer: V = [19 * Math.sqrt(3), 19];
  const inner: V = [23.25 * Math.sqrt(3), 23.25];
  const nextOuter: V = [0, -38];
  const nextInner: V = [0, -46.5];
  const radius = 57;
  const opening = 44.8;
  const seam = 1.7;

  const outlines = [
    ...disc(outer, radius), ...disc(inner, opening),
    ...disc(nextOuter, radius + seam), ...disc(nextInner, opening - seam),
  ];
  const loop = carveWhere(outlines, (point) => {
    const inLoop = vdist(point, outer) < radius && vdist(point, inner) > opening;
    const belowNext = vdist(point, nextOuter) < radius + seam && vdist(point, nextInner) > opening - seam;
    return inLoop && !belowNext;
  });

  const head: Region = [
    seg([-32, 85], [-19, 89]),
    arc([-19, 89], [-9, 95], [1, 94]),
    arc([1, 94], [12, 91], [19, 82]),
    arc([19, 82], [11, 75], [10, 68]),
    arc([10, 68], [5, 67], [-2, 72]),
    arc([-2, 72], [-11, 75], [-14, 81]),
    seg([-14, 81], [-32, 85]),
  ];
  const eye: V = [-8, 87.5];
  const face = carve([head], [disc(eye, 3.1), thickSeg([-28, 85.1], [-19, 84.7], 1.35)]);
  for (const turn of [0, 120, 240]) {
    c.fill("goose", toPath(loop, { k: 1, turn }));
    c.fill("goose", toPath([...face, disc(eye, 1.1)], { k: 1, turn }));
  }
};
