import type { Builder } from "../../construct/builder.ts";
import { C0, R, poly } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

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
