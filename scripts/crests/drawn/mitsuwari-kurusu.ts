// Three clipped floral crosses from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, mirrored, rotated, seg, thickArc, thickSeg, toPath, type Region, type V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (corners: V[]): Region =>
  corners.map((corner, index) => seg(corner, corners[(index + 1) % corners.length]));

export const mitsuwariKurusuBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);

  // The two band edges and the small hub all meet the outer circle.
  const sectorCentre: V = [0, 92];
  const bandSeams = [
    thickArc(sectorCentre, 62.8, 1.6, 186 * DEG, 354 * DEG),
    thickArc(sectorCentre, 49.5, 1.6, 186 * DEG, 354 * DEG),
    thickArc(sectorCentre, 14.6, 1.55, 161 * DEG, 379 * DEG),
  ];

  // Closed white seams separate each indented blossom from its neighbour.
  const petal = polygon([
    [10.5, 78.4], [27, 73.2], [43.3, 67], [35.3, 58.1],
    [28.4, 59.3], [25.4, 54], [19.7, 54.3], [13, 49],
  ]);
  const ribs = [
    thickSeg([5, 79.4], [10.6, 43], 1.65),
    thickSeg([12.1, 80.1], [19.5, 68.7], 1.25),
  ];

  const seamToNext = [
    thickSeg([31.3, 38.8], [51.7, 2.5], 1.55),
    thickSeg([50.5, 69.2], [59.2, 49.1], 1.55),
  ];
  const centreLeaf = polygon([
    [0, 1.5], [-4.2, -10.3], [-8.2, -17.6], [0, -31.7],
    [8.2, -17.6], [4.2, -10.3],
  ]);
  const rimLeaf = polygon([[54.8, 35.5], [60.4, 48.2], [79.8, 51.1], [70.2, 38.7]]);
  const cuts = [
    ...bandSeams, petal, petal.map(mirrored), ...ribs, ...ribs.map((rib) => rib.map(mirrored)),
    ...seamToNext, centreLeaf, rimLeaf,
  ];
  const whiteSeams = [0, 120, 240].flatMap((turn) =>
    cuts.map((outline) => outline.map((piece) => rotated(piece, turn * DEG))),
  );
  c.fill("cross", toPath(carve([disc([0, 0], R)], whiteSeams), { k: 1 }));
};
