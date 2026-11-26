// The four and five lozenge spirals in frame 6 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

// The two edges of a face are the ruler directions. The small break along the inner side leads into the fret.
const FOUR_FACE: Pt[] = [
  [4, 4], [98, 4], [98, 98], [4, 98], [4, 28], [81, 28], [81, 80], [23, 80], [23, 49],
  [58, 49], [58, 58], [39, 58], [39, 67], [68, 67], [68, 40], [16, 40], [16, 88], [89, 88], [89, 18], [4, 18],
];

const FIVE_FACE: Pt[] = [
  [3, 3], [98, 3], [98, 98], [3, 98], [3, 22], [82, 22], [82, 80], [23, 80], [23, 46],
  [57, 46], [57, 56], [39, 56], [39, 64], [68, 64], [68, 37], [14, 37], [14, 88], [91, 88], [91, 14], [3, 14],
];

export const itowaNiYotsuInazumabishiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thread");
  const half = 43.5;
  const height = 0.75;
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  const face = FOUR_FACE.map(([u, v]): Pt => [CX + (u - v) * half / 100, CY - (u + v) * half / 100]);

  for (const angle of [0, 90, 180, 270]) {
    const rotated = face.map((point) => turn(point, angle));
    c.fill("lightning", poly(rotated.map(([x, y]) => [x, CY + (y - CY) * height])));
  }
};

export const itsutsuInazumaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const face = FIVE_FACE.map(([u, v]): Pt => [CX + (u - v) * 0.32, CY - (u + v) * 0.485]);

  for (const angle of [0, 72, 144, 216, 288]) c.fill("lightning", poly(face.map((point) => turn(point, angle))));
};
