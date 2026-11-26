import type { Builder } from "../../construct/builder.ts";
import { carveWhere, disc, toPath, vdist } from "../../construct/compass.ts";
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
