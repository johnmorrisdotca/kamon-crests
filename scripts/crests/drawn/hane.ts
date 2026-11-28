// The divided shuttlecock crest measured from frame 8 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { circle } from "../../construct/geo.ts";
import { DEG, arcTo, carve, circleThrough, disc, lineLine, onCircle, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, type V } from "../../construct/compass.ts";

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

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};

/**
 * 三つ羽根 (frame 8, right r1c1): a shuttlecock seen from the side, three curved vanes from the top of its stem and a bead at its
 * foot. In the book's pixels from the top of the stem: the upper vane a crescent from 135 left and 62.5 up to 147.5 right and 5
 * down, between arcs through (6, 54) and (-2.5, 2.5), tilted as printed; the lower vanes crescents from the stem to tips 117.5
 * to either side and 147.5 down; the stem 12.5 wide to the bead, a disc of 23 whose centre stands 172.5 down.
 */
export const mitsuHaneBuild = (c: Builder): void => {
  const [left, right]: V[] = [[-135, 62.5], [147.5, -5]];
  const upper = [arcVia(left, [6, 54], right), arcVia(right, [-2.5, 2.5], left)];
  const lower = (side: 1 | -1) => {
    const tip: V = [side * 117.5, -147.5];
    const run = [arcVia([side * -2.5, 2.5], [side * 70, -22], tip), arcVia(tip, [side * 62, -84], [side * 2.5, -32.5]), seg([side * 2.5, -32.5], [side * -2.5, 2.5])];
    return side === 1 ? run : reversedRun(run);
  };
  const stem = thickSeg([0, -20], [0, -152], 12.5);
  const bead = disc([0, -172.5], 23);
  const centre: V = [6, -60];
  const k = 96 / 190;
  const placing = { k, at: [-centre[0] * k, -centre[1] * k] as V };
  c.guideCircle([100, 100], 96);
  c.group(() => {
    c.fill("shuttlecock", toPath(carve([stem, bead], []), placing));
    c.fill("shuttlecock", toPath([lower(-1)], placing));
    c.fill("shuttlecock", toPath([lower(1)], placing));
    c.fill("shuttlecock", toPath([upper], placing));
  });
};

/**
 * 丸に三つ羽根 (frame 8, right r2c1): a shuttlecock seen from above in a ring drawn at the cell's width: a round bead, three
 * spokes out to a thread ring, and from the end of each spoke a curved vane sweeping round towards the middle. In the book's pixels
 * from the bead's centre: the ring from 128 to 150 and the thread ring at 121; the bead 16 in radius; the first spoke 7.3 degrees
 * clockwise of upright; each vane's outer edge an arc from (10, 117.5) through (-37.5, 87.5) to its tip at (-67.5, 0), its inner
 * edge back through (-22.5, 57.5) to (17.5, 110).
 */
export const maruNiMitsuHaneBuild = (c: Builder): void => {
  const [outer, inner, thread] = [150, 128, 121];
  const k = 96 / outer;
  c.guideCircle([100, 100], 96);
  c.guideCircle([100, 100], inner * k);
  c.fill("frame", circle([100, 100], 96).join(circle([100, 100], inner * k)), "evenodd");
  const ring = [thickArc([0, 0], thread, 2.5, 0, Math.PI), thickArc([0, 0], thread, 2.5, Math.PI, 2 * Math.PI)];
  const spoke = thickSeg([0, 0], [15, 117.5], 7.5);
  const vane = [arcVia([10, 117.5], [-37.5, 87.5], [-67.5, 0]), arcVia([-67.5, 0], [-22.5, 57.5], [17.5, 110]), seg([17.5, 110], [10, 117.5])];
  c.group(() => {
    c.fill("shuttlecock", toPath(ring, { k }));
    c.fill("shuttlecock", toPath([disc([0, 0], 16)], { k }));
  });
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("shuttlecock", toPath([spoke], { k, turn }));
      c.fill("shuttlecock", toPath([vane], { k, turn }));
    });
  }
};
