// The diagonal lightning cross on frame 6 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

// The two ruler directions are the edges of a 100-by-100 grid. The same details turn a quarter at a time in this grid.
const quarter = ([u, v]: Pt): Pt => [100 - v, u];
const onLozenge = ([u, v]: Pt, halfWidth: number, halfHeight: number): Pt => [
  CX + (u - v) * halfWidth / 100,
  CY + (u + v - 100) * halfHeight / 100,
];

// One white separation begins and ends on the ruled edge, folding around the hook and two fingers.
const CROSS_SEAM: Pt[] = [
  [0, 31], [30, 31], [30, 13], [13, 13], [13, 20], [22, 20], [22, 24], [9, 24], [9, 9],
  [55, 9], [55, 36], [51, 36], [51, 13], [46, 13], [46, 36], [42, 36], [42, 13], [34, 13], [34, 35], [0, 35],
];
const MIDDLE_HOLE: Pt[] = [[43, 43], [47, 43], [47, 47], [43, 47]];

export const sumitateJumonjiInazumaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  const onSquare = (p: Pt): Pt => onLozenge(p, R, R);
  const outer: Pt[] = [[0, 0], [100, 0], [100, 100], [0, 100]];
  let cross = poly(outer.map(onSquare));
  let seam = CROSS_SEAM;
  let hole = MIDDLE_HOLE;
  for (let i = 0; i < 4; i += 1) {
    cross = cross.join(poly(seam.map(onSquare)), poly(hole.map(onSquare)));
    seam = seam.map(quarter);
    hole = hole.map(quarter);
  }
  c.fill("lightning", cross, "evenodd");
};
