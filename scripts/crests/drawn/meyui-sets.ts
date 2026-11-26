// Twisted knot-eyes from frame 20 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0, CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";

export const nejiYotsumeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  // The next square covers its neighbour's inner corner and partly enters its square opening.
  const leaf: Pt[] = [
    [-30, -90], [30, -30], [1.5, -1.5], [-19, -22], [-13, -28], [-30, -45],
    [-47, -28], [-40, -21], [-59, -2], [-89, -32],
  ];
  const face: Pt[] = leaf.map(([x, y]) => [CX + x, CY + y]);
  for (const angle of [0, 90, 180, 270]) c.fill("knot-eye", poly(face.map((point) => turn(point, angle))));
};
