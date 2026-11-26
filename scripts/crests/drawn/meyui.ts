import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, Path, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

const corners = ([x, y]: Pt, h: number): Pt[] => [[x, y - h], [x + h, y], [x, y + h], [x - h, y]];
const onPage = ([x, y]: Pt): Pt => [CX + x, CY + y];
const diamond = (at: Pt, h: number): Path => poly(corners(at, h).map(onPage));

const eyesOnAxes = (d: number): Pt[] => [[0, -d], [d, 0], [0, d], [-d, 0]];
const eye = (at: Pt, outer: number, opening: number): Path => diamond(at, outer).join(diamond(at, opening));

const layout = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
};

export const knottedFourEyes = (c: Builder): void => {
  layout(c);
  const d = 56;
  const band = diamond([0, 0], 50).join(diamond([0, 0], 21));
  const eyes = eyesOnAxes(d).reduce((path, at) => path.join(eye(at, R - d, 12)), new Path());
  // The narrow diamonds in the overlaps are left by the crossings of the two sets of boundaries.
  c.fill("knot-eye", eyes.join(band), "evenodd");
};
