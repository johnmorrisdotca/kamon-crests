// Bracken fronds from frame 15 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, disc, mirrored, onCircle, reversedRun, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const uprightBracken = (): Region[] => {
  const stem = thickSeg([0, -25], [0, 7], 4.5);
  const branch = thickArc([12, 7], 12, 3.9, Math.PI, 0);
  const curl = thickArc([18.1, 7], 5.7, 3.65, 0, -215 * DEG);
  return carve([stem, disc([0, -25], 2.25), branch, curl, reversedRun(branch.map(mirrored)), reversedRun(curl.map(mirrored))], []);
};

/** The three upright fronds stand inside the scalloped bracken roundel. */
export const mitsuTachiWarabiBuild = (c: Builder): void => {
  c.precision(3);
  const rim: Region[] = [disc([0, 0], 94)];
  for (let angle = 0; angle < 360; angle += 20) rim.push(disc(onCircle([0, 0], 84, angle * DEG), 12.5));
  const dots = [31, 82, 151, 212, 270, 335].map((angle) => disc(onCircle([0, 0], 87, angle * DEG), 2.6));
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  c.fill("bracken", toPath(carve(rim, [disc([0, 0], 79), ...dots]), { k: 0.985 }));
  const frond = uprightBracken();
  const places: V[] = [[0, 38], [-38, -16], [38, -16]];
  for (const at of places) c.fill("bracken", toPath(frond, { k: 0.95, at }));
};

/** Two rounded fern fronds curl around a small central joint. */
export const hanaWarabiBuild = (c: Builder): void => {
  c.precision(3);
  const body: Region[] = [disc([-45, -2], 49), disc([45, -2], 49), disc([0, 43], 36), disc([0, -43], 36)];
  const side: Region[] = [
    thickArc([44, 0], 35, 2.9, -139 * DEG, 139 * DEG),
    thickArc([73, 9], 6, 2.55, 27 * DEG, 245 * DEG),
    thickArc([73, -9], 6, 2.55, -245 * DEG, -27 * DEG),
    thickSeg([11, 0], [36, 0], 2.35),
  ];
  const opposite = side.map((piece) => reversedRun(piece.map(mirrored)));
  const centre = [disc([0, 0], 13.0), thickSeg([0, 19], [0, 27], 2.35), thickSeg([0, -19], [0, -27], 2.35)];
  c.guideCircle(C0, 96);
  c.guideLine([100, 21], [100, 179]);
  c.fill("bracken", toPath([...carve(body, [...side, ...opposite, ...centre]), disc([0, 0], 10.1)], { k: 1 }));
};
