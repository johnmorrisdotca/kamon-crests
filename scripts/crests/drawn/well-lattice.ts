import { RING_GAP } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { CX, CY, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

/** An L-shaped arrangement of three square eyes, turned to place one eye above the other two. */
export const maruNiKumiawaseIgetaBuild = (c: Builder): void => {
  c.precision(3);
  const reach = c.ring("ring-medium") - RING_GAP;
  const d = reach * 0.49;
  const b = reach * 0.115;
  const t = reach * 0.22;
  const place = (point: Pt): Pt => {
    const [x, y] = turn(point, 45, [0, 0]);
    return [CX + x, CY + y * 0.86];
  };
  // Follow the exposed ends on one side of the lattice, from its upper corner to the open lower eye.
  const half: Pt[] = [
    [-d - b, -d - b], [-d - b, -d - t], [-d + b, -d - t], [-d + b, -d - b],
    [-b, -d - b], [-b, -d - t], [b, -d - t], [b, -d - b],
    [d - b, -d - b], [d - b, -d - t], [d + b, -d - t], [d + b, -d - b],
    [d + t, -d - b], [d + t, -d + b], [d + b, -d + b],
    [d + b, -b], [d + t, -b], [d + t, b], [d + b, b],
    [d + b, t], [d - b, t], [d - b, b], [b, b],
  ];
  const other = half.slice(1, -1).reverse().map(([x, y]): Pt => [y, x]);
  const eyeCentres: Pt[] = [[-d / 2, -d / 2], [d / 2, -d / 2], [-d / 2, d / 2]];
  const h = d / 2 - b;
  const eyes = eyeCentres.map(([x, y]) => {
    const corners: Pt[] = [[x - h, y - h], [x + h, y - h], [x + h, y + h], [x - h, y + h]];
    return poly(corners.map(place));
  });
  c.fill("well-frame", poly([...half, ...other].map(place)).join(...eyes), "evenodd");
};
