// The Tokugawa hollyhock, 三つ葉葵: three heart leaves a third of a turn apart, their points at the centre, struck with a compass
// and a ruler. Its proportions were measured from a picture of the ringed crest, and the fan of its veins from the 三ツあふひ of the
// 1892 crest book (frame 37, right page, row 1, first column from the right); the drawing is this construction.
//
// The frame is the top leaf's: the crest's centre at (0, 0), x to the right, y up the leaf's axis, and the ring's outer edge at
// 100, so one unit is a hundredth of the radius. A grid point is a point of whole numbers. Only the right half of one leaf is
// constructed; the left half is its mirror image, and the other two leaves are the first turned.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import {
  DEG,
  angleOf,
  arcTo,
  carve,
  circleCircle,
  disc,
  lineCircle,
  mirrored,
  nearest,
  onCircle,
  onPage,
  reversedRun,
  seg,
  tangentCircle,
  thickArc,
  toPath,
  touch,
  vadd,
  vlen,
  vmul,
  vsub,
  vunit,
} from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const at = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });

// The ring: 100 and 81 about the centre.
const O = at(0, 0, 100);
const I = at(0, 0, 81);

// The black wedge on the leaf's axis, which runs down between the two lobes from the ring and ends as a spindle near the centre.
/** From the ring down to the neck. A grid point; it touches N at (5.6, 66.8), a 3-4-5 point. */
const H = at(36, 44, 38);
/** Round the neck, 2 from the axis at its closest. A grid point. */
const N = at(20, 56, 18);
/** The long side of the spindle, down to its tip on the axis. A grid point. */
const M2 = at(-82, 36, 88);
/** Width 20, turning the curve over between N and M2: it touches N from outside and M2 from inside. */
const M1 = tangentCircle(N, 1, M2, -1, 10, [-4, 42]);

// The leaf. Its white outline round the neck is the band of 2 between N and N'; its midrib is the band of 2.5 between M2 and M2'.
const N1 = at(20, 56, 16);
const M21 = at(-82, 36, 90.5);
const M11 = tangentCircle(N1, 1, M21, -1, 12, [-6, 41]);
/** The round lobe: width 53, its centre on the grid line y = 46, standing so that N' touches it from inside. */
const A = at(20 + Math.sqrt(10.5 * 10.5 - 100), 46, 26.5);
/** The leaf's straight side beside the stem: a ruled line through two grid points, rising 3 in 5. */
const E1: V = [4, 5];
const E2: V = [39, 26];

// The curl. S1 (width 14, its centre on the grid line y = 54) touches the middle of the outline's band from inside, so the outline
// rolls into it; S2 (width 4) is the hook that ends it, touching S1 from inside on its radius at 100 degrees.
const BAND = at(20, 56, 17);
const S1 = at(20 - Math.sqrt(100 - 4), 54, 7);
const HOOK = 100 * DEG;
const S2: Circle = { c: vadd(S1.c, vmul([Math.cos(HOOK), Math.sin(HOOK)], 5)), r: 2 };

// The veins: a fan of six from the curl to the leaf's edge and a seventh from the midrib, and six branches. Every one is an arc,
// its centre a grid point and its width a whole number. A vein bows towards the notch; the branch that leaves it bows the other
// way and ends where the vein before ends, so the cell between two veins is a lens, pointed at the curl and at the edge.
const VEINS: Circle[] = [at(37, 21, 44), at(29, 8, 49), at(15, 1, 51), at(-1, -1, 53), at(-13, 6, 49), at(-61, 5, 83), at(-21, 14, 33)];
const BRANCHES: Circle[] = [at(29, 71, 15), at(37, 67, 19), at(43, 64, 26), at(47, 57, 30), at(41, 53, 32), at(28, 39, 25)];
/** Near where each vein leaves the curl (the last, the midrib), where it ends on the edge, and where the branch leaves the vein after it. */
const LEAVES: V[] = [[15, 59.1], [17, 55.5], [16.9, 52], [15.3, 49.4], [13, 47.5], [10.6, 47], [7.3, 31]];
const ENDS: V[] = [[42, 64.7], [48.8, 52.8], [48.8, 39.2], [43.1, 28.5], [33.1, 22.5], [21.3, 15.4], [11.7, 9.6]];
const FORKS: V[] = [[32.3, 56.4], [33, 48.4], [30, 41.5], [24.4, 37.3], [16.7, 32.2], [10.4, 21.2]];
/** The middle of the midrib's band: only to find where the last vein leaves it. */
const MID = at(-82, 36, 89.25);

/** For the crest without a ring: the wedge ends in a point between the lobes. A grid point; it touches N at the neck (2, 56) and meets the axis at (0, 64). */
const P = at(-15, 56, 17);

const W_CURL = 1.8;
const W_VEIN = 1.7;
/** A vein is inked a little past the leaf's edge, so that it cuts the edge cleanly. */
const OVER = 4;

const tQ = touch(H, N);
const tHorn = nearest(circleCircle(H.c, H.r, I.c, I.r), [20, 78]);
const tNM1 = touch(N, M1);
const tM1M2 = vadd(M2.c, vmul(vunit(vsub(M1.c, M2.c)), M2.r));
const tTip = nearest(lineCircle([0, 0], [0, 1], M2.c, M2.r), [0, 4]);
const tNeck: V = [2, 56];
const tPoint: V = [0, 64];

const tA = vadd(A.c, vmul(vunit(vsub(N1.c, A.c)), A.r));
const tCorner = nearest(lineCircle(E1, E2, A.c, A.r), [43, 28]);
const tLeafTip = nearest(lineCircle(E1, E2, M21.c, M21.r), [3, 4.4]);
const tM21M11 = vadd(M21.c, vmul(vunit(vsub(M11.c, M21.c)), M21.r));
const tM11N1 = touch(N1, M11);

/** The right side of the spindle, from the neck down to its tip. */
const spindle: Piece[] = [arcTo(N, tNeck, tNM1, true), arcTo(M1, tNM1, tM1M2, false), arcTo(M2, tM1M2, tTip, false)];
/** The right side of the wedge above the neck in the ringed crest: from the ring's inner edge down to the neck. */
const wedge: Piece[] = [arcTo(H, tHorn, tQ, true), arcTo(N, tQ, tNeck, true)];
/** The same in the crest without a ring: from the point on the axis down to the neck. */
const point: Piece[] = [arcTo(P, tPoint, tNeck, false)];

/** The outline of the right half of the leaf, clockwise from where the lobe leaves the neck. */
const lobe: Region = [arcTo(A, tA, tCorner, false), seg(tCorner, tLeafTip), arcTo(M21, tLeafTip, tM21M11, true), arcTo(M11, tM21M11, tM11N1, true), arcTo(N1, tM11N1, tA, false)];

// The white lines inside the lobe.
const white: Region[] = [];
const veinArc = (on: Circle, from: V, to: V): void => {
  const a0 = angleOf(on.c, from);
  let d = angleOf(on.c, to) - a0;
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;
  white.push(thickArc(on.c, on.r, W_VEIN, a0, a0 + d + (Math.sign(d) * OVER) / on.r));
};

// The curl: S1 from where it leaves the outline, under the eye, up and over; then the hook, with a round end.
const curlFrom = (angleOf(S1.c, touch(BAND, S1)) + TAU) % TAU;
white.push(thickArc(S1.c, S1.r, W_CURL, curlFrom, HOOK + TAU));
white.push(thickArc(S2.c, S2.r, W_CURL, HOOK, 185 * DEG));
white.push(disc(onCircle(S2.c, S2.r, 185 * DEG), W_CURL / 2));

// The fan. The first four veins end on the round lobe, the fourth in its corner, and the last three on the straight side; a branch
// ends with the vein before.
const ends = VEINS.map((on, i) => nearest(i < 4 ? circleCircle(on.c, on.r, A.c, A.r) : lineCircle(E1, E2, on.c, on.r), ENDS[i]));
VEINS.forEach((on, i) => {
  const from = i < 6 ? S1 : MID;
  veinArc(on, nearest(circleCircle(on.c, on.r, from.c, from.r), LEAVES[i]), ends[i]);
});
BRANCHES.forEach((on, i) => {
  const to = nearest(i < 3 ? circleCircle(on.c, on.r, A.c, A.r) : lineCircle(E1, E2, on.c, on.r), ends[i]);
  veinArc(on, nearest(circleCircle(on.c, on.r, VEINS[i + 1].c, VEINS[i + 1].r), FORKS[i]), to);
});

/** The black cells of the right half of one leaf: the lobe with the curl and the veins left white. */
const cells = carve([lobe], white);

/** How far the leaves reach from the centre: the far side of a lobe. */
export const AOI_REACH = vlen(A.c) + A.r;

/** The whole black shape on a leaf's axis: its right side, and the mirror image back up. `overlap` carries the ringed wedge a little into the ring, so that no hairline shows between them. */
const axisShape = (ringed: boolean): Region => {
  const right = [...(ringed ? wedge : point), ...spindle];
  const left = reversedRun(right.map(mirrored));
  if (!ringed) return [...right, ...left];
  const out = vmul(vunit(tHorn), I.r + 2);
  const outLeft: V = [-out[0], out[1]];

  return [...right, ...left, seg([-tHorn[0], tHorn[1]], outLeft), arcTo(at(0, 0, I.r + 2), outLeft, out, false), seg(out, tHorn)];
};

/**
 * Draws the hollyhock. `ringed` is 丸に三つ葉葵: the ring, and each leaf's wedge joined to it. Without it the same three leaves
 * are drawn larger, to fill the layout circle, and each wedge ends in a point between its lobes.
 */
export const aoiBuild = (c: Builder, ringed: boolean): void => {
  const k = ringed ? R / O.r : R / AOI_REACH;
  const top: Placing = { k };
  const limit = ringed ? O.r : AOI_REACH;
  const struck = (circ: Circle): void => c.guideCircle(onPage(circ.c, top), circ.r * k);

  c.guideCircle(C0, R);
  if (ringed) c.guideCircle(C0, I.r * k);
  c.guideSpokes(6, 0, limit * k);
  for (const circ of ringed ? [H, N, M2, M1] : [P, N, M2, M1]) struck(circ);
  for (const circ of [N1, M21, M11, A]) struck(circ);
  c.guideLine(onPage(tLeafTip, top), onPage(tCorner, top));
  for (const circ of [S1, S2, ...VEINS, ...BRANCHES]) struck(circ);

  if (ringed) c.fill("frame", circle(C0, O.r * k).join(circle(C0, I.r * k)), "evenodd");
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("hollyhock", toPath([axisShape(ringed)], { k, turn }));
      c.fill("hollyhock", toPath(cells, { k, turn }));
      c.fill("hollyhock", toPath(cells, { k, turn, mirror: true }));
    });
  }
};

/**
 * The leaf alone, in its own frame (its tip near the origin, its axis up), for the crests that stand it elsewhere: the black
 * cells of its right half, the right side of its spindle from the neck down to its tip, and what they are struck with.
 */
export const AOI_LEAF = {
  cells,
  axis: axisShape(false),
  spindle,
  /** Round the neck: a stem that comes down between the lobes ends on it. */
  neck: N,
  /** The circles of the right half, in the order they are struck. */
  circles: [N, M2, M1, N1, M21, M11, A, S1, S2, ...VEINS, ...BRANCHES],
  /** The straight side: its two ends. */
  side: [tLeafTip, tCorner] as [V, V],
  /** The spindle's tip, on the axis. */
  tip: tTip,
  /** The far side of a lobe, up the axis. */
  top: A.c[1] + A.r,
};
