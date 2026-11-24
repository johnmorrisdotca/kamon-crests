// The plover, 千鳥, struck and ruled, in the way the drawing manuals set it out: compass circles of set widths, each placed
// against the ones before, and the outline inked from their arcs. The head, the wing and the belly are three circles; the saddle
// of the back, the bite under the wing tip, the notch of the tail and the throat are circles struck from outside; the beak is ruled
// from its point to the head. Its proportions were measured from a picture of the crest; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, in the page's own units. The plover looks to the left.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleCircle, circleThrough, disc, nearest, seg, tangentCircle, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

const FAR = disc([0, 0], 4000);
const outside = (regions: Region[]): Region => [...carve(regions, []).flat(), ...FAR];
const round = (circle: Circle, grow = 0): Region => disc(circle.c, circle.r + grow);
/** The shape's last piece is its longest arc, so that the compass arm rests on a centre that arc gives exactly. */
const settled = (loops: Region[]): Region[] => {
  const last = loops[loops.length - 1];
  const span = (i: number): number => {
    const p = last[i];

    return p.t === "A" ? p.r * Math.min(Math.abs(p.a1 - p.a0), 2.6) : 0;
  };
  const at = last.reduce((best, _, i) => (span(i) > span(best) ? i : best), 0);

  return [...loops.slice(0, -1), [...last.slice(at + 1), ...last.slice(0, at + 1)]];
};

const HEAD: Circle = { c: [-46, 34], r: 36 };
const WING: Circle = { c: [35, 25], r: 57 };
const BELLY: Circle = { c: [5, 3], r: 55 };
/** The breast and the tail's outer edge: one long arc down the left side. */
const SIDE: Circle = { c: [14, -19], r: 76 };
/** The saddle of the back, struck from above to cut a little into the head and the wing. */
const SADDLE: Circle = tangentCircle({ c: HEAD.c, r: HEAD.r - 0.4 }, 1, { c: WING.c, r: WING.r - 0.4 }, 1, 42, [-22, 110]);
const BITE: Circle = { c: [85, 38], r: 32 };
const NOTCH: Circle = { c: [1, -78], r: 26 };
const BEAK: V = [-95, 32];
/** The throat, struck from outside through the beak's point and a point of the side's circle. */
const THROAT: Circle = circleThrough(BEAK, nearest(circleCircle(SIDE.c, SIDE.r, [-61, -8], 1), [-62, -7]), 34, [-97, -3]);
const EYE: V = [-56, 45];
/** The wing's line: the crescent left between two circles. */
const FOLD: [Circle, Circle] = [{ c: [6, 2], r: 34 }, { c: [-2, 5], r: 37 }];

/** Where the line ruled from the beak's point touches the head, above. */
const brow = ((): V => {
  const d = vdist(BEAK, HEAD.c);

  return nearest(circleCircle(HEAD.c, HEAD.r, BEAK, Math.sqrt(d * d - HEAD.r * HEAD.r)), [-75, 58]);
})();
/** A box under the level line at `y`. */
const under = (y: number): Region => [seg([-300, y], [300, y]), seg([300, y], [300, -300]), seg([300, -300], [-300, -300]), seg([-300, -300], [-300, y])];
/** A box to the left of the upright line at `x`. */
const leftOf = (x: number): Region => [seg([x, 300], [-300, 300]), seg([-300, 300], [-300, -300]), seg([-300, -300], [x, -300]), seg([x, -300], [x, 300])];

const body: Region[] = settled(
  carve(
    [
      round(HEAD),
      // The wing's circle counts only above the level line where the bite meets the belly.
      ...carve([round(WING)], [under(25)]),
      round(BELLY),
      ...carve([round(SIDE)], [outside([leftOf(0)])]),
      [seg(HEAD.c, WING.c), seg(WING.c, SADDLE.c), seg(SADDLE.c, HEAD.c)],
      [seg(BEAK, brow), seg(brow, [-60, 30]), seg([-60, 30], [-80, 15]), seg([-80, 15], BEAK)],
    ],
    [round(THROAT), round(SADDLE), round(BITE), round(NOTCH), disc(EYE, 7), ...carve([round(FOLD[0])], [round(FOLD[1])])],
  ),
);

/** A claw: the crescent left between two circles that cross at its point. */
const claw = (low: Circle, over: Circle): Region[] => carve([round(low)], [round(over)]);
const FEET: [Circle, Circle][] = [
  [{ c: [64, 11], r: 19 }, { c: [65, 16], r: 18 }],
  [{ c: [70, 17], r: 26 }, { c: [75, 20], r: 22 }],
  [{ c: [41, -37], r: 20 }, { c: [47, -28], r: 25 }],
  [{ c: [48, -42], r: 25 }, { c: [55, -30], r: 32 }],
];
const feet: Region[][] = [
  settled(carve(FEET.slice(0, 2).flatMap(([low, over]) => claw(low, over)), [outside([under(12.5)])])),
  settled(FEET.slice(2).flatMap(([low, over]) => claw(low, over))),
];

/** How far the plover reaches from the centre. */
const REACH = 100.5;

/** Draws the plover to fill the layout circle of radius `reach`, as the construction is placed. */
export const chidoriBuild = (c: Builder, reach: number, placing: Omit<Placing, "k"> = {}): void => {
  const at: Placing = { ...placing, k: reach / REACH };
  c.fill("plover", toPath(body, at));
  for (const foot of feet) c.fill("plover", toPath(foot, at));
};
