// Three fruit and paired vines from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, thickArc, thickSeg, toPath, type Piece, type Region, type V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type Bend = [V, V, V];

const bisector = (from: V, to: V): [V, V] => {
  const [x, y] = mid(from, to);
  return [[x, y], [x + from[1] - to[1], y + to[0] - from[0]]];
};

const curve = ([from, through, to]: Bend): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const forward = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, forward) as Arc;
};

const stroke = (bend: Bend, width: number): Region => {
  const { c, r, a0, a1 } = curve(bend);
  return thickArc(c, r, width, a0, a1);
};

export const mitsuTsuruMakuwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);

  const fruit: Region = [
    curve([[0, 7.8], [-28.8, 40.9], [-33.3, 65.2]]),
    curve([[-33.3, 65.2], [-22.4, 88], [0, 94.4]]),
    curve([[0, 94.4], [22.4, 88], [33.3, 65.2]]),
    curve([[33.3, 65.2], [28.8, 40.9], [0, 7.8]]),
  ];
  const longitudinalSeams = [
    stroke([[2.6, 11], [10.2, 45.5], [8.7, 89.8]], 1.65),
    stroke([[7, 12.1], [22, 49.2], [11.5, 89.4]], 1.65),
  ];
  const crownSeam = stroke([[-13.9, 94.2], [0, 87.3], [13.9, 94.2]], 1.75);
  const stripedFruit = carve([fruit], [
    crownSeam, ...longitudinalSeams, ...longitudinalSeams.map((seam) => seam.map(mirrored)),
  ]);

  const stalk = thickSeg([0, -10], [0, -72], 5.9);
  const rightCurl = [
    stroke([[0, -69], [10, -81], [24.1, -79.3]], 5.6),
    stroke([[24.1, -79.3], [29.5, -70.5], [23, -62.9]], 5.6),
    stroke([[23, -62.9], [17.4, -65.6], [20.4, -70.8]], 5.0),
    disc([24.1, -79.3], 2.75),
    disc([23, -62.9], 2.65),
    disc([20.4, -70.8], 2.5),
  ];
  const curl = carve([stalk, ...rightCurl, ...rightCurl.map((part) => part.map(mirrored))], []);
  const hub = carve([disc([0, 0], 12.3)], [disc([0, 0], 9.4)]);

  for (const turn of [0, 120, 240]) {
    c.fill("makuwa-melon", toPath(stripedFruit, { k: 1, turn }));
    c.fill("makuwa-melon", toPath(curl, { k: 1, turn }));
  }
  c.fill("makuwa-melon", toPath(hub, { k: 1 }));
};
