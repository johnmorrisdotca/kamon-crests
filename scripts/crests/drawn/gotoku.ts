// Brazier trivet measured from frame 33 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, disc, onCircle, rotated, seg, shortArc, toPath, type Region, type V } from "../../construct/compass.ts";

/** Three inward rests form one piece with the circular body. */
export const gotokuBuild = (c: Builder): void => {
  c.precision(3);
  const centre: V = [0, 0];
  const inside = 72;
  const circle = { c: centre, r: inside };
  const start = onCircle(centre, inside, 76 * DEG);
  const end = onCircle(centre, inside, -12 * DEG);
  const next = onCircle(centre, inside, -44 * DEG);
  const heel: V = [27, 11];
  const toe: V = [-4, -34];
  const shelf: V = [15, -34];
  const bend: V = [31, -29];
  const third = [
    shortArc(circle, start, end),
    seg(end, heel),
    seg(heel, toe),
    seg(toe, shelf),
    shortArc(circleThrough(shelf, bend, 35, [18, 0]), shelf, bend),
    seg(bend, next),
  ];
  const opening: Region = [0, -120, -240].flatMap((turn) => third.map((piece) => rotated(piece, turn * DEG)));
  c.guideSpokes(3, 0, 96);
  c.fill("brazier-trivet", toPath([disc(centre, 96), opening], { k: 1 }), "evenodd");
};
