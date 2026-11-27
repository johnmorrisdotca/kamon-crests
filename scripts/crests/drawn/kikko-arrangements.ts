import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle, ngonPoints, poly, polar } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

const hexagon = (radius: number, centre: Pt = C0) => poly(ngonPoints(6, radius, 0, centre));

export function mitsuKikkoKuzushiBuild(c: Builder): void {
  const outline: Pt[] = [[0, 0], [37, 20], [37, 54], [23, 54], [23, 29], [0, 15], [-23, 29], [-23, 54], [-37, 54], [-37, 20]];
  const apices: Pt[] = [[100, 42], [139, 103], [61, 103]];
  c.guideCircle(C0, R);
  for (const [x, y] of apices) {
    const corners: Pt[] = outline.map(([dx, dy]) => [x + dx, y + dy]);
    const band = poly(corners);
    c.guidePath(band);
    c.fill("tortoise-shell", band);
  }
}

export function mitsuyoriKikkoMochiBuild(c: Builder): void {
  c.stepRound(R);
  for (const angle of [0, 120, 240]) {
    const centre = polar(48, angle);
    const tile = hexagon(46.8, centre);
    c.guidePath(tile);
    c.guideCircle(centre, 16);
    c.fill("tortoise-shell", tile.join(circle(centre, 16)), "evenodd");
  }
}
