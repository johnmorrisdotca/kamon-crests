// The puffed sparrow and four open curls in frame 27 of the 1892 crest book.
import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, onCircle, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

const withMirror = (parts: Region[]): Region[] => [...parts, ...parts.map((region) => region.map(mirrored))];

const seam = (points: ThreePoints): Region => {
  const { c, r, a0, a1 } = curve(points);
  return thickArc(c, r, WEIGHT.hair, a0, a1);
};

// A band crosses the upright axis at each end of this half.
const across = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

const horizontalBand: ThreePoints[] = [
  [[0, 76], [34, 71], [49, 60]], [[49, 60], [51, 50], [47, 42]],
  [[47, 42], [35, 40], [29, 46]], [[29, 46], [30, 52], [35, 57]],
  [[35, 57], [16, 64], [0, 64]],
];

const verticalBand: ThreePoints[] = [
  [[0, 94], [21, 91], [35, 78]], [[35, 78], [39, 63], [37, 47]],
  [[37, 47], [32, 41], [26, 40]], [[26, 40], [22, 44], [23, 51]],
  [[23, 51], [16, 66], [9, 70]], [[9, 70], [3, 72.8], [0, 73]],
];

const wings: [V, V][] = [
  [[17, 26], [41, 32]], [[18, 21], [43.5, 23]], [[19, 17], [45, 12]],
  [[21, 11], [45, 3]], [[21, 4], [44, -7]],
];

export const yotsuKanFukuraSuzumeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const shallow = across(horizontalBand.map(curve));
  const tall = across(verticalBand.map(curve));
  for (const turn of [0, 90, 180, 270]) {
    c.fill("curled-band", toPath([turn % 180 === 0 ? shallow : tall], { k: 1, turn }));
  }

  const head: V = [0, 49];
  const shoulder: V = [15, 30];
  const wingTip: V = [37, 38];
  const wingBase: V = [43, -15];
  const tailCorner: V = [39, -20];
  const foot: V = [0, -37];
  const feathers = across([
    curve([head, [5, 39], shoulder]), curve([shoulder, [28, 33], wingTip]),
    curve([wingTip, [48, 13], wingBase]), seg(wingBase, tailCorner),
    curve([tailCorner, [29, -31], [18, -34]]), curve([[18, -34], [7, -37], foot]),
  ]);
  const featherCentre: V = [0, 8];
  const fan = [5, 14, 23, 32, 41].map((degrees) => {
    const angle = (-90 + degrees) * (Math.PI / 180);
    return thickSeg(onCircle(featherCentre, 19, angle), onCircle(featherCentre, 45, angle), WEIGHT.hair);
  });
  const sideCuts = withMirror([
    seam([[15, 33], [17, 23], [12, 16]]),
    seam([[12, 16], [20, 13], [21, 4]]),
    seam([[43, -15], [34, -10], [21, -7]]), seam([[39, -20], [28, -14], [16, -10]]),
    ...wings.map(([from, to]) => thickSeg(from, to, WEIGHT.hair)),
    ...fan,
    disc([10.5, 28], 1.5),
  ]);
  const cuts = [...sideCuts, seam([[12, 16], [0, 14], [-12, 16]]), seam([[21, 4], [0, -12], [-21, 4]])];
  c.fill("sparrow", toPath(carve([feathers], cuts), { k: 1 }), "evenodd");
};
