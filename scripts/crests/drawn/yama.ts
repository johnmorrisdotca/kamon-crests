// The three- and five-facet mountains from frame 29 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];

/** Each facet ends at a curved opening, with a ruled seam between it and its neighbour. */
const mountainFacets = (c: Builder, count: number, inner: number, hollow: number, offset: number): void => {
  c.precision(3);
  const angle = Math.PI / count;
  const halfGap = 1.35;
  const reach = Math.sqrt(R * R - halfGap * halfGap);
  const point = (d: number, side: number): V => [
    side * (d * Math.sin(angle) - halfGap * Math.cos(angle)),
    d * Math.cos(angle) + halfGap * Math.sin(angle),
  ];
  const outerLeft = point(reach, -1);
  const outerRight = point(reach, 1);
  const innerLeft = point(inner, -1);
  const innerRight = point(inner, 1);
  const concave = circleThrough(innerRight, innerLeft, hollow, [0, R]);
  const facet = [
    shortArc({ c: centre, r: R }, outerLeft, outerRight),
    seg(outerRight, innerRight),
    shortArc(concave, innerRight, innerLeft),
    seg(innerLeft, outerLeft),
  ];

  c.guideCircle(C0, R);
  for (let i = 0; i < count; i += 1) c.fill("mountain", toPath([facet], { k: 1, turn: offset + 360 * i / count }));
};

export const mitsuYamaBuild = (c: Builder): void => mountainFacets(c, 3, 20.5, 32, 0);
export const itsutsuYamaBuild = (c: Builder): void => mountainFacets(c, 5, 18.5, 17.5, 14);
