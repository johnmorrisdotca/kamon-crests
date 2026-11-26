// Two violet flowers measured from frame 45 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, mirrored, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

const band = (from: V, via: V, to: V, width: number): Region => {
  const { c, r, a0, a1 } = arc(from, via, to);
  return thickArc(c, r, width, a0, a1);
};

const mirror = (run: Region): Region => reversedRun(run.map(mirrored));

export const dakiSumireBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideLine([100, 4], [100, 196]);

  const flower: Region = [
    arc([-44, 42], [-51, 49], [-59, 49]),
    arc([-59, 49], [-66, 51], [-73, 48]),
    arc([-73, 48], [-78, 39], [-73, 34]),
    arc([-73, 34], [-74, 25], [-66, 20]),
    arc([-66, 20], [-57, 23], [-55, 27]),
    arc([-55, 27], [-46, 20], [-39, 23]),
    arc([-39, 23], [-34, 30], [-39, 36]),
    arc([-39, 36], [-39, 39], [-44, 42]),
  ];
  const flowerLines = [
    band([-63, 36], [-56, 32], [-49, 32], 2),
    thickSeg([-56, 33], [-55, 28], 1.5),
  ];
  const outerLeaf: Region = [
    arc([-42, -73], [-85, -38], [-91, 18]),
    arc([-91, 18], [-87, 30], [-80, 41]),
    arc([-80, 41], [-70, -21], [-42, -73]),
  ];
  const outerVein = band([-47, -64], [-78, -20], [-82, 29], 1.9);
  const innerLeaf: Region = [
    arc([-18, -60], [-27, -20], [-24, 21]),
    arc([-24, 21], [-13, -14], [-18, -60]),
  ];
  const innerVein = band([-19, -51], [-20, -19], [-22, 11], 1.75);
  const topCurled: Region = [
    arc([-65, 49], [-49, 66], [-23, 83]),
    arc([-23, 83], [-12, 89], [-6, 89]),
    seg([-6, 89], [-1, 84]),
    seg([-1, 84], [-6, 81]),
    seg([-6, 81], [-2, 78]),
    seg([-2, 78], [-15, 76]),
    arc([-15, 76], [-38, 67], [-59, 48]),
    seg([-59, 48], [-65, 49]),
  ];
  const lowerBranch = [
    band([-61, 23], [-57, -20], [-48, -42], 7.6),
    band([-48, -42], [-39, -62], [-27, -73], 7.6),
    band([-18, -56], [-17, -69], [-25, -75], 4.8),
    band([-45, -70], [-31, -76], [-25, -75], 4.7),
  ];
  const crossingStem = band([-28, -74], [-10, -79], [14, -92], 5.8);
  const crossingGap = band([-28, -74], [-10, -79], [14, -92], 9.2);
  const form = [
    ...carve([flower], flowerLines),
    ...carve([outerLeaf], [outerVein]),
    ...carve([innerLeaf], [innerVein]),
    topCurled,
    ...lowerBranch,
  ];
  c.fill("violet", toPath(form, { k: 1 }));
  c.fill("violet", toPath(form.map(mirror), { k: 1 }));
  c.fill("violet", toPath(carve([mirror(crossingStem)], [crossingGap]), { k: 1 }));
  c.fill("violet", toPath([crossingStem], { k: 1 }));
};
