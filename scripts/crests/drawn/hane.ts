// The divided shuttlecock crest measured from frame 8 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, onCircle, seg, shortArc, thickArc, toPath, type V } from "../../construct/compass.ts";

const vaneBow = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

const veinArc = (from: V, to: V, radius: number, near: V, width: number) => {
  const circle = circleThrough(from, to, radius, near);
  const part = shortArc(circle, from, to);
  if (part.t !== "A") throw new Error("The crease must follow a circle");
  return thickArc(circle.c, circle.r, width, part.a0, part.a1);
};

/** Three folded vanes turn inside a rim whose three weights anchor its inner arcs. */
export const mitsuwariHaneBuild = (c: Builder): void => {
  c.precision(3);
  const tip: V = [3, 86];
  const shoulder: V = [-13, 62];
  const edge: V = [-15, 34];
  const root: V = [0, 2];
  const waist: V = [9, 41];
  const flap: V = [22, 60];
  const vane = [
    vaneBow(tip, shoulder, 40, [22, 56]),
    vaneBow(shoulder, edge, 52, [34, 46]),
    vaneBow(edge, root, 31, [11, 31]),
    vaneBow(root, waist, 196, [194, -4]),
    vaneBow(waist, flap, 62, [56, 28]),
    seg(flap, tip),
  ];
  const crease = veinArc([-1, 9], [3, 79], 203, [201, 34], 2.25);
  const folded = carve([vane], [crease]);
  const link = veinArc([-77, 44], [-10, 67], 108, [-19, -27], 3.3);
  const rimWeight = disc(onCircle([0, 0], 88.25, 150 * DEG), 7.5);
  c.guideSpokes(6, 0, 96);
  c.fill("shuttlecock", toPath([disc([0, 0], 96), disc([0, 0], 90.8)], { k: 1 }), "evenodd");
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("shuttlecock", toPath([rimWeight, link], { k: 1, turn }));
      c.fill("shuttlecock", toPath(folded, { k: 1, turn }));
    });
  }
};
