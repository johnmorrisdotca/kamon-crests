import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region } from "../../construct/compass.ts";
import { C0, CX, CY, Path, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

const corners = ([x, y]: Pt, h: number): Pt[] => [[x, y - h], [x + h, y], [x, y + h], [x - h, y]];
const onPage = ([x, y]: Pt): Pt => [CX + x, CY + y];
const diamond = (at: Pt, h: number): Path => poly(corners(at, h).map(onPage));
const diamondRegion = (at: Pt, h: number): Region => {
  const points = corners(at, h).map(([x, y]): Pt => [x, -y]);

  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
};

const eyesOnAxes = (d: number): Pt[] => [[0, -d], [d, 0], [0, d], [-d, 0]];
const eye = (at: Pt, outer: number, opening: number): Path => diamond(at, outer).join(diamond(at, opening));

const layout = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
};

export const ringedSixEyes = (c: Builder): void => {
  c.ring("ring-thin");
  const h = 24;
  for (const y of [-h, h]) {
    for (const x of [-2 * h, 0, 2 * h]) c.fill("knot-eye", eye([x, y], h, 6), "evenodd");
  }
};

export const linkedNineEyes = (c: Builder): void => {
  layout(c);
  // The four corner units reach three shares to the side and two up or down. Their outer tips are on the layout circle.
  const h = R / Math.sqrt(13);
  for (const y of [-2 * h, 0, 2 * h]) {
    for (const x of [-2 * h, 0, 2 * h]) c.fill("knot-eye", eye([x, y], h, 7), "evenodd");
  }
};

export const knottedFourEyes = (c: Builder): void => {
  layout(c);
  const d = 56;
  const band = diamond([0, 0], 50).join(diamond([0, 0], 21));
  const eyes = eyesOnAxes(d).reduce((path, at) => path.join(eye(at, R - d, 12)), new Path());
  // The narrow diamonds in the overlaps are left by the crossings of the two sets of boundaries.
  c.fill("knot-eye", eyes.join(band), "evenodd");
};

export const stackedFiveEyes = (c: Builder): void => {
  layout(c);
  const d = 51;
  const front = 49;
  const gap = diamondRegion([0, 0], front + 3);
  for (const at of eyesOnAxes(d)) {
    const behind = carve([diamondRegion(at, R - d)], [diamondRegion(at, 10), gap]);
    c.fill("knot-eye", toPath(behind, { k: 1 }), "evenodd");
  }
  c.fill("knot-eye", eye([0, 0], front, 10), "evenodd");
};
