import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, rotated, seg, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** A lens cut from one circle by the next circle of the same width. */
const lens = (a: V, b: V, r: number): Region[] =>
  carveWhere([...disc(a, r), ...disc(b, r)], (p) => vdist(a, p) < r && vdist(b, p) < r);

export const linkedThreeShippo = (c: Builder): void => {
  const r = 48;
  const top: V = [0, 24];
  const right: V = [r, -24];
  const left: V = [-r, -24];
  c.guideCircle(C0, R);
  const neighbours: [V, V[]][] = [
    [top, [[r, 72], right, left, [-r, 72]]],
    [right, [[96, 24], [96, -72], [0, -72]]],
    [left, [[0, -72], [-96, -72], [-96, 24]]],
  ];
  for (const [centre, adjacent] of neighbours) {
    for (const other of adjacent) c.fill("seven-treasures", toPath(lens(centre, other, r), { k: 1 }));
  }
};

export const flowerShippo = (c: Builder): void => {
  const frameRadius = 84;
  c.guideCircle(C0, R);
  const axes: V[] = [[0, frameRadius], [frameRadius, 0], [0, -frameRadius], [-frameRadius, 0]];
  const diagonalCentres: V[] = [[84, 84], [84, -84], [-84, -84], [-84, 84]];
  for (const other of diagonalCentres) c.fill("seven-treasures", toPath(lens([0, 0], other, frameRadius), { k: 1 }));
  for (const centre of axes) c.fill("seven-treasures", toPath([disc(centre, 12)], { k: 1 }));

  const petals = [disc([0, 0], 29), disc([0, 30], 10), disc([11, 23], 9), disc([-11, 23], 9)];
  const centre = disc([0, 0], 8.5);
  const stamen = thickSeg([0, 7], [0, 19], 2.6);
  const seam = Math.SQRT2;
  const boundaries = [seg([-100, seam - 100], [100, seam + 100]), seg([-100, seam + 100], [100, seam - 100])];
  const petal = carveWhere([...petals.flat(), ...centre, ...stamen, ...boundaries], (p) =>
    p[1] > Math.abs(p[0]) + seam && petals.some((lobe) => inside(lobe, p)) && !inside(centre, p) && !inside(stamen, p),
  );
  for (const angle of [0, -90, -180, -270]) c.fill("flower-lozenge", toPath(petal.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))), { k: 1 }));
  c.fill("flower-lozenge", toPath(carve([disc([0, 0], 7)], [disc([0, 0], 2)]), { k: 1 }));
};
