// The Tokugawa hollyhock, 三つ葉葵: three heart leaves a third of a turn apart, their points at the centre, struck with a compass
// and a ruler. Its proportions were measured from a picture of the ringed crest; the drawing is this construction.
//
// The frame is the top leaf's: the crest's centre at (0, 0), x to the right, y up the leaf's axis, and the ring's outer edge at
// 100, so one unit is a hundredth of the radius. A grid point is a point of whole numbers. Only the right half of one leaf is
// constructed; the left half is its mirror image, and the other two leaves are the first turned.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import {
  DEG,
  angleOf,
  arcA,
  arcTo,
  carve,
  circleCircle,
  disc,
  lineCircle,
  lineLine,
  mirrored,
  nearest,
  onCircle,
  onPage,
  openPath,
  reversedRun,
  seg,
  tangentCircle,
  thickArc,
  thickSeg,
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

// The veins that are arcs, all on grid points.
const V1 = at(22, 103, 45);
const V3 = at(3, 12, 48);
const V5 = at(-60, 7, 87);
const V6 = at(88, 91, 95);
/** The middle of the midrib's band: only to find where the lower veins leave it. */
const MID = at(-82, 36, 89.25);

/** For the crest without a ring: the wedge ends in a point between the lobes. A grid point; it touches N at the neck (2, 56) and meets the axis at (0, 64). */
const P = at(-15, 56, 17);

const W_CURL = 1.8;
const W_VEIN = 1.7;
/** A vein is inked a little past the leaf's edge, so that it cuts the edge cleanly. */
const OVER = 1.2;

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
const veinLine = (from: V, to: V, over = OVER): void => {
  white.push(thickSeg(from, vadd(to, vmul(vunit(vsub(to, from)), over)), W_VEIN));
};

// The curl: S1 from where it leaves the outline, under the eye, up and over; then the hook, with a round end.
const curlFrom = (angleOf(S1.c, touch(BAND, S1)) + TAU) % TAU;
white.push(thickArc(S1.c, S1.r, W_CURL, curlFrom, HOOK + TAU));
white.push(thickArc(S2.c, S2.r, W_CURL, HOOK, 185 * DEG));
white.push(disc(onCircle(S2.c, S2.r, 185 * DEG), W_CURL / 2));

// The cap vein, from the curl to the lobe's edge, and its branch.
const edgeB = onCircle(A.c, A.r, 3 * DEG);
veinArc(V1, nearest(circleCircle(V1.c, V1.r, S1.c, S1.r), [15.6, 58.5]), nearest(circleCircle(V1.c, V1.r, A.c, A.r), [43, 63]));
veinLine(nearest(lineCircle([34.6, 0], [34.6, 1], V1.c, V1.r), [34.6, 60]), edgeB);
// The second vein and its branch, which meets the first's at the edge: neighbouring forks are aimed at one point, which makes the pointed cells.
const edgeC = nearest(circleCircle(V3.c, V3.r, A.c, A.r), [46, 33]);
veinArc(V3, nearest(circleCircle(V3.c, V3.r, S1.c, S1.r), [15.7, 58.3]), edgeC);
veinLine(nearest(lineCircle([0, 47.5], [1, 47.5], V3.c, V3.r), [36, 47.5]), edgeB);
// The third: ruled from the curl to a fork at the grid point (34, 39), one tine to each neighbour's end.
const FORK: V = [34, 39];
veinLine([15, 49], FORK, 0);
veinLine(FORK, edgeC);
veinLine(FORK, E2);
// The fourth, from the curl to the straight side, and its branch.
veinArc(V5, nearest(circleCircle(V5.c, V5.r, S1.c, S1.r), [15.7, 49.7]), nearest(lineCircle(E1, E2, V5.c, V5.r), [26.3, 18.4]));
veinLine(nearest(lineCircle([0, 30], [1, 30], V5.c, V5.r), [24, 30]), E2);
// The two from the midrib to the straight side.
veinArc(V6, nearest(circleCircle(V6.c, V6.r, MID.c, MID.r), [8.5, 39]), nearest(lineCircle(E1, E2, V6.c, V6.r), [26.5, 18.5]));
veinLine(nearest(lineCircle([0, 26.5], [1, 26.5], V6.c, V6.r), [18.5, 26.5]), lineLine(E1, E2, [15.5, 0], [15.5, 1]));
veinLine(nearest(lineCircle([0, 18], [1, 18], MID.c, MID.r), [6.3, 18]), lineLine(E1, E2, [13.3, 0], [13.3, 1]));

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

/** The part of a large circle that lies inside the circle of radius `limit` about the centre, as an open arc. */
const within = (circ: Circle, limit: number): Piece[] => {
  const cuts = circleCircle(circ.c, circ.r, [0, 0], limit);
  if (cuts.length < 2) return [arcA(circ.c, circ.r, 0, TAU)];
  const a0 = angleOf(circ.c, cuts[0]);
  let a1 = angleOf(circ.c, cuts[1]);
  while (a1 <= a0) a1 += TAU;
  const middle = onCircle(circ.c, circ.r, (a0 + a1) / 2);

  return [vlen(middle) < limit ? arcA(circ.c, circ.r, a0, a1) : arcA(circ.c, circ.r, a1, a0 + TAU)];
};

/**
 * Draws the hollyhock. `ringed` is 丸に三つ葉葵: the ring, and each leaf's wedge joined to it. Without it the same three leaves
 * are drawn larger, to fill the layout circle, and each wedge ends in a point between its lobes.
 */
export const aoiBuild = (c: Builder, ringed: boolean): void => {
  const k = ringed ? R / O.r : R / AOI_REACH;
  const top: Placing = { k };
  const limit = ringed ? O.r : AOI_REACH;
  const struck = (circ: Circle): void => {
    if (vlen(circ.c) + circ.r <= limit + 1e-9) c.guideCircle(onPage(circ.c, top), circ.r * k);
    else c.guidePath(openPath(within(circ, limit), top));
  };

  c.guideCircle(C0, R);
  if (ringed) c.guideCircle(C0, I.r * k);
  c.guideSpokes(6, 0, limit * k);
  for (const circ of ringed ? [H, N, M2, M1] : [P, N, M2, M1]) struck(circ);
  for (const circ of [N1, M21, M11, A]) struck(circ);
  c.guideLine(onPage(tLeafTip, top), onPage(tCorner, top));
  for (const circ of [S1, S2, V1, V3, V5, V6]) struck(circ);

  if (ringed) c.fill("frame", circle(C0, O.r * k).join(circle(C0, I.r * k)), "evenodd");
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("hollyhock", toPath([axisShape(ringed)], { k, turn }));
      c.fill("hollyhock", toPath(cells, { k, turn }));
      c.fill("hollyhock", toPath(cells, { k, turn, mirror: true }));
    });
  }
};
