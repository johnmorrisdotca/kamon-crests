// The wild goose, 雁金, struck and ruled. The wings are the black left between four circles: two struck from below for their upper
// edges, which cross on the axis, and two for the hollows under them, which meet in the point of the tail. The head is a circle
// with a ringed eye and a cheek arc about one centre, and a ruled beak. The proportions were measured from pictures of the crest
// as 波戸場承龍 drew it for NHK's デザインあ; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, in the page's own units: every centre is a grid point and every
// compass width a whole number. A white line is 1 wide, the gap between a circle of r and one of r + 1.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleCircle, disc, lineCircle, mirrored, nearest, onCircle, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

/** A circle far outside the page, for what lies outside some outlines: it crosses nothing, so no edge is ever taken from it. */
const FAR = disc([0, 0], 4000);
const outside = (regions: Region[]): Region => [...carve(regions, []).flat(), ...FAR];
const round = (circle: Circle, grow = 0): Region => disc(circle.c, circle.r + grow);
/** The white between a circle of r and one of r + 1, all the way round. */
const ringOf = (c: V, r: number): Region => carve([disc(c, r + 1)], [disc(c, r)]).flat();
const flipped = (regions: Region[]): Region[] => regions.map((region) => region.map(mirrored));
const both = (regions: Region[]): Region[] => [...regions, ...flipped(regions)];
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

// The goose flying, seen from above with its head in profile: 雁金.
/** The left wing's upper edge, and the hollow under it; the right wing's are their mirror images. */
const TOP: Circle = { c: [-27, -85], r: 112 };
const LOW: Circle = { c: [-81, -80], r: 85 };
const HEAD: Circle = { c: [-1, 30], r: 30 };
const EYE: V = [-8, 43];
/** The beak: its point, and where its two edges leave the head and the wing. */
const BEAK: V = [-46, 38];
const beakTop = onCircle(HEAD.c, HEAD.r, 159 * DEG);
const beakFoot = nearest(lineCircle([-36, 0], [-36, 50], TOP.c, TOP.r), [-36, 27]);
/** The point of the collar, on the axis. */
const COLLAR: V = [0, 14];

const flying: Region[] = settled(
  carve(
    [...both([round(TOP)]), round(HEAD), [seg(BEAK, beakTop), seg(beakTop, [-28, 30]), seg([-28, 30], beakFoot), seg(beakFoot, BEAK)]],
    [
      outside([disc([0, 0], 100)]),
      ...both([round(LOW)]),
      // The eye: a dot, a ring and the cheek's arc, about one centre.
      disc(EYE, 2),
      ringOf(EYE, 6),
      thickArc(EYE, 14.5, 1, -88 * DEG, 24 * DEG),
      // The beak's root on the head's circle, and its mouth.
      thickArc(HEAD.c, HEAD.r - 0.25, 1.5, 158 * DEG, 180 * DEG),
      thickSeg([-42.5, 37.2], [-27, 32.6], 1),
      // The collar: two lines ruled from its point up to the wings' upper edges.
      ...both([thickSeg(COLLAR, [-34, 27.3], 1)]),
    ],
  ),
);

/** Draws the flying goose to fill the layout circle of radius `reach`. */
export const kariganeBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 96 };
  c.fill("goose", toPath(flying, placing));
};

// Two geese facing, their beaks joined: 向かい嘴合い雁金. The left goose; the right is its mirror image.
/** The wing's edge toward the other goose, and the hollow behind the wing; the lower wing's are their mirror images in the level axis. */
const INNER: Circle = { c: [-119, 50], r: 107 };
const OUTER: Circle = { c: [-154, 123], r: 136 };
const FACE: Circle = { c: [-45, 0], r: 44 };
const FACE_EYE: V = [-13, 15];
const level = (regions: Region[]): Region[] => [...regions, ...regions.map((region) => region.map((p) => (p.t === "L" ? seg([p.a[0], -p.a[1]], [p.b[0], -p.b[1]]) : { t: "A" as const, c: [p.c[0], -p.c[1]] as V, r: p.r, a0: -p.a0, a1: -p.a1 })))];
/** A box to the right of the upright line at `x`. */
const rightOf = (x: number): Region => [seg([x, -300], [300, -300]), seg([300, -300], [300, 300]), seg([300, 300], [x, 300]), seg([x, 300], [x, -300])];
const wingTip = nearest(circleCircle(INNER.c, INNER.r, OUTER.c, OUTER.r), [-21, 94]);
/** Where the head leaves the wing: the collar's lines end there. */
const nape = nearest(circleCircle(INNER.c, INNER.r, FACE.c, FACE.r), [-15, 33]);
/** How far the pair reaches from the centre: its wing tips. */
const PAIR_REACH = Math.hypot(wingTip[0], wingTip[1]);

const facing: Region[] = settled(
  carve(
    [...level([round(INNER)]), ...carve([round(FACE)], [outside([rightOf(-40)])]), [seg([-12, 0], [0, 0]), seg([0, 0], [0, -9]), seg([0, -9], [-12, 0])]],
    [
      outside([disc([0, 0], 100)]),
      ...level([round(OUTER)]),
      disc(FACE_EYE, 1.5),
      ringOf(FACE_EYE, 3),
      thickArc(FACE_EYE, 7.5, 1, 180 * DEG, 300 * DEG),
      // The beak: its mouth on the level axis, and its lower edge.
      thickSeg([-12, 0.5], [3, 0.5], 1),
      thickSeg([-12.6, 0.45], [0.6, -9.45], 1),
      // The collar.
      ...level([thickSeg([-33, 0], [nape[0] + 0.2, nape[1] + 0.4], 1)]),
    ],
  ),
);

/** Draws the two geese to fill the layout circle of radius `reach`: the left one, then the right one in its place. */
export const mukaiKariganeBuild = (c: Builder, reach: number): void => {
  const k = reach / PAIR_REACH;
  c.fill("goose", toPath(facing, { k }));
  c.fill("goose", toPath(facing, { k, mirror: true }));
};
