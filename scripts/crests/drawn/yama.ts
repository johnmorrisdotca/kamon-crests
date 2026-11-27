// The three- and five-facet mountains from frame 29 of the 1892 crest book.
import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, inside, mirrored, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
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

// One inward-pointing cusp and the scallop that runs to the next cusp.
const mountainFork = (root: V, tip: V): Piece[] => {
  const right = shortArc(circleThrough(tip, root, 9, [10, -29]), tip, root);
  const left = reversed(mirrored(right));
  const next: V = [(root[0] - root[1] * Math.sqrt(3)) / 2, (-root[0] * Math.sqrt(3) - root[1]) / 2];
  const hollow = shortArc(circleThrough(root, next, 14, [25, -15]), root, next);
  return [left, right, hollow];
};

export const wariIriMitsuYamaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const root: V = [10, -19];
  const tip: V = [0, -25];
  const end: V = [26, -69];
  const { c: branchCentre, r, a0, a1 } = shortArc(circleThrough(root, end, 79, [-52, -50]), root, end) as Extract<Piece, { t: "A" }>;
  const intoOpening = a0 - Math.sign(a1 - a0) * 2 * WEIGHT.thread / r;
  const branch = thickArc(branchCentre, r, WEIGHT.thread, intoOpening, a1);
  const endCap = disc(end, WEIGHT.thread / 2);
  const seam = thickSeg([0, -24], [0, -100], WEIGHT.thread);
  const cuts: Region[] = [seam, branch, endCap, branch.map(mirrored), endCap.map(mirrored)];
  const turns = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
  const opening = turns.flatMap((turn) => mountainFork(root, tip).map((piece) => rotated(piece, turn)));
  const facets = carve([disc(centre, R)], [opening, ...turns.flatMap((turn) => cuts.map((cut) => cut.map((piece) => rotated(piece, turn))))]);
  const upper = facets.find((facet) => inside(facet, [0, 70]));
  if (upper === undefined) throw new Error("The mountain's upper facet is missing");
  for (const turn of [0, 120, 240]) c.fill("mountain", toPath([upper], { k: 1, turn }));
};
