// A vine sparrow from frame 45 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, circleCircle, DEG, disc, mirrored, nearest, onCircle, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
const stroke = ({ c, r, a0, a1 }: Arc, width: number): Region => thickArc(c, r, width, a0, a1);

export const tsuruSuzumeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const crown: Circle = { c: [0, 32], r: 52 };
  const flank: Circle = { c: [-48, -25], r: 45 };
  const shoulder = nearest(circleCircle(crown.c, crown.r, flank.c, flank.r), [-49, 15]);
  const right: V = [-shoulder[0], shoulder[1]];
  const tip = onCircle(flank.c, flank.r, 50 * DEG);
  const side = stroke(arcTo(flank, tip, shoulder, false) as Arc, 6);
  const arch = stroke(arcTo(crown, shoulder, right, false) as Arc, 6);
  const cap = disc(tip, 6.5);
  const joint = disc(shoulder, 3);

  c.fill("sparrow", toPath([arch], { k: 1 }));
  for (const piece of [side, cap, joint]) {
    c.fill("sparrow", toPath([piece], { k: 1 }));
    c.fill("sparrow", toPath([piece.map(mirrored)], { k: 1 }));
  }
};
