import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, centre: V): Piece =>
  shortArc(circleThrough(from, to, radius, centre), from, to);

const paired = (half: Piece[]): Region => [...half, ...reversedRun(half.map(mirrored))];

function ribbon(from: V, to: V, radius: number, centre: V, width: number): Region {
  const line = arc(from, to, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(line.c, line.r, width, Math.min(line.a0, line.a1), Math.max(line.a0, line.a1));
}

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const hornedLeaf = polygon([
  [0, 5], [28, 21], [49, 27], [73, 24], [89, 16], [94, 5],
  [85, 6], [94, -14], [83, -13], [89, -33], [72, -29],
  [77, -49], [60, -45], [63, -61], [41, -51], [23, -24],
]);

const leafOpening = polygon([
  [16, 1], [37, 13], [56, 15], [78, 7], [69, 5],
  [81, -10], [69, -8], [76, -21], [61, -18],
  [65, -31], [47, -28], [29, -16],
]);

const heartPoints: V[] = [
  [0, -6], [12, -16], [22, -31], [35, -55], [24, -54], [29, -69],
  [19, -66], [15, -84], [8, -79], [0, -94],
];
const heartHole: V[] = [[0, -17], [12, -35], [21, -52], [13, -50], [16, -62], [8, -58], [0, -74]];

const pairedLines = (points: V[]): Region => {
  const half = points.slice(0, -1).map((point, i) => seg(point, points[i + 1]));

  return paired(half);
};

function serratedSpike(c: Builder, placing: Placing, main: boolean): void {
  const top: V[] = [[0, 86], [6.5, 77], [14, 81], [11.5, 70]];
  const heights = main ? [70, 63, 55, 47, 39, 31] : [70, 60, 50, 39];
  const needles = heights.flatMap((height, i): V[] => {
    const edge = 15 + (70 - height) / 4.3;

    return [[edge, height + 0.8], [edge - 3.8, height - 2.1], [edge + (i % 2 === 0 ? 2.5 : 1.8), height - 5]];
  });
  const wing = [...top, ...needles, [23, 15] as V, [0, 12] as V];
  const leaf = pairedLines(wing);
  const notch = thickSeg([0, 11], [0, 75], 2.85);
  const tiers = (main ? [44, 61] : [54]).flatMap((y) => {
    const ridge = ribbon([0, y - 4.7], [20.5, y + 4.8], 30, [4, y + 25], 2.1);

    return [ridge, ridge.map(mirrored)];
  });
  c.fill("paulownia", toPath(carve([leaf], [notch, ...tiers]), placing), "evenodd");
}

function serratedKiri(c: Builder, shadow: boolean): void {
  c.precision(2);
  c.guideCircle(C0, R);
  c.zoom(0.93);
  serratedSpike(c, { k: 0.96, at: [0, -1] }, true);
  for (const x of [-61, 61]) serratedSpike(c, { k: 0.68, at: [x, 12] }, false);
  const node = disc([0, 0], 11.8);
  const upperVeins = [
    ribbon([10, 3.6], [74, 15], 97, [46, -79], 2.3),
    ribbon([17, -5.6], [75, 3.5], 96, [54, -101], 2.0),
  ];
  const lowerVeins = [[24, -12], [33, -18.1], [43, -22.4], [53, -26.1], [64, -29.2]].map(([x, y]) =>
    ribbon([x, y + 7.9], [x + 8, y - 10], 38, [x + 31, y + 13], 1.8));
  const vein = thickSeg([15, -5.8], [77, -30.4], 2.3);
  const centreCuts = [
    thickSeg([0, -11], [0, -87], 2.35),
    ribbon([0, -23.5], [22, -57.4], 46, [-24, -62], 2.1),
    ribbon([0, -34.9], [17, -64.7], 36, [-12, -68], 2.1),
    ribbon([0, -46.5], [11, -71.4], 27, [-11, -66], 1.85),
  ];
  const openings = shadow ? [leafOpening, node] : [vein, ...upperVeins, ...lowerVeins, node];
  const centreLeaf = carve([pairedLines(heartPoints)], shadow ? [pairedLines(heartHole), node] : [
    ...centreCuts, ...centreCuts.slice(1).map((cut) => cut.map(mirrored)), node,
  ]);
  const sideLeaf = carve([hornedLeaf], openings);
  for (const mirror of [false, true]) c.fill("paulownia", toPath(sideLeaf, { k: 1, mirror }), "evenodd");
  c.fill("paulownia", toPath(centreLeaf, { k: 1 }), "evenodd");
  c.fill("paulownia", toPath([disc([0, 0], 9.7)], { k: 1 }));
}

export function goshichiOniKiriBuild(c: Builder): void {
  serratedKiri(c, false);
}

export function chukageOniKiriBuild(c: Builder): void {
  serratedKiri(c, true);
}
