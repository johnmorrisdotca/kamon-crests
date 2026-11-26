// The six pale snow lobes on the round ground at frame 41 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, disc, lineLine, mirrored, reversedRun, rotated, toPath } from "../../construct/compass.ts";
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

export const kokumochiYukiwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideCircle(C0, R - 1);
  c.guideSpokes(6, 0, R);

  const valleyRadius = 43.5;
  const valley: V = [valleyRadius * Math.sin(30 * DEG), valleyRadius * Math.cos(30 * DEG)];
  const right: Region = [
    arc([0, 94], [9, 93.2], [14, 89]),
    arc([14, 89], [21, 87], [21, 79]),
    arc([21, 79], [26, 75], [24, 68]),
    arc([24, 68], [27, 63], [24, 57]),
    arc([24, 57], [27, 52], [22, 48]),
    arc([22, 48], [18.5, 42], valley),
  ];
  const lobe = [...reversedRun(right.map(mirrored)), ...right];
  const snow = Array.from({ length: 6 }, (_, index) => lobe.map((piece) => rotated(piece, -60 * index * DEG))).flat();
  c.fill("black-disc", toPath([disc([0, 0], R), disc([0, 0], R - 1)], { k: 1 }), "evenodd");
  c.fill("snow-ring", toPath([disc([0, 0], R - 1), snow], { k: 1 }), "evenodd");
};
