// The five-lobed melon on a solid ground in frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, disc, lineLine, mirrored, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { C0, R, dist, mid } from "../../construct/geo.ts";

type ThreePoints = [V, V, V];
type Arc = Extract<Piece, { t: "A" }>;

const turns = [0, 72, 144, 216, 288];

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const curve = ([from, through, to]: ThreePoints): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const lobeHalf = () => [
  curve([[0, 91], [27, 85.2], [42, 77]]),
  curve([[42, 77], [40.8, 66], [33, 59.5]]),
  curve([[33, 59.5], [17, 64], [0, 65.2]]),
];

const petalHalf = () => [
  curve([[0, 53], [7, 51.5], [9, 45.5]]),
  curve([[9, 45.5], [16, 44], [18, 38]]),
  curve([[18, 38], [14, 27], [6, 16]]),
  seg([6, 16], [1.9, 9.3]),
];

export const kokumochiUriBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const half = lobeHalf();
  const opening = [...half, ...reversedRun(half.map(mirrored))];
  const discPath = toPath([disc([0, 0], 95.5), disc([0, 0], 61.5)], { k: 1 });
  const openings = turns.map((turn) => toPath([opening], { k: 1, turn }));
  c.fill("black-disc", discPath.join(...openings), "evenodd");

  const curl = curve([[31, 45], [25, 42], [26, 49]]);
  const leftCurl = mirrored(curl) as Arc;
  const rim = [
    thickArc([0, 0], 58, 2.1, Math.PI / 3.2, Math.PI - Math.PI / 3.2),
    thickArc(curl.c, curl.r, 2.1, curl.a0, curl.a1),
    thickArc(leftCurl.c, leftCurl.r, 2.1, leftCurl.a0, leftCurl.a1),
    thickArc([0, 0], 55, 1.65, Math.PI / 3.15, Math.PI - Math.PI / 3.15),
  ];
  for (const turn of turns) c.fill("quince-lobes", toPath(rim, { k: 1, turn }));

  const petalSide = petalHalf();
  const petal = [...petalSide, seg([1.9, 9.3], [-1.9, 9.3]), ...reversedRun(petalSide.map(mirrored))];
  const stamen = thickSeg([0, 11], [0, 26], 2.9);
  const flower = carve([petal], [stamen, disc([0, 26], 1.43)]);
  for (const turn of turns) c.fill("plum", toPath(flower, { k: 1, turn }));
  c.fill("plum", toPath([disc([0, 0], 6.35), disc([0, 0], 2.7)], { k: 1 }), "evenodd");
};
