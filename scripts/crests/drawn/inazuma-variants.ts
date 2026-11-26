// The four and five lozenge spirals in frame 6 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

// The two edges of a face are the ruler directions. The small break along the inner side leads into the fret.
const FOUR_FACE: Pt[] = [
  [4, 4], [98, 4], [98, 98], [4, 98], [4, 28], [81, 28], [81, 80], [23, 80], [23, 49],
  [58, 49], [58, 58], [39, 58], [39, 67], [68, 67], [68, 40], [16, 40], [16, 88], [89, 88], [89, 18], [4, 18],
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
