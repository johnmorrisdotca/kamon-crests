// The front-facing rabbit, 真向き兎, struck and ruled. Its proportions were measured from a picture of the crest and checked
// against the crest book of 1892 (伊呂波分新撰紋帳, frame 25, 真向うさぎ); the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up; the rabbit is 192 wide and 168 high, and a grid point is a
// point of whole numbers. The left half is the mirror image of the right.
import type { Builder } from "../../construct/builder.ts";
import { CX, CY } from "../../construct/geo.ts";
import {
  DEG,
  angleOf,
  arcA,
  arcTo,
  carve,
  circleCircle,
  disc,
  mirrored,
  nearest,
  onPage,
  openPath,
  seg,
  thickArc,
  thickSeg,
  toPath,
  vadd,
  vdist,
  vmul,
  vsub,
  vunit,
} from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;

/** The body: two circles of 68 on the grid points 28 each side of the axis, 16 below the centre. They cross on the axis, which makes the notch under the chin. */
const BODY: Circle = { c: [28, -16], r: 68 };
/** The point of the back, on the axis: the two ruled lines from it touch the body's circles. */
const PEAK: V = [0, 84];
/** The face: a circle of 40 on the axis. */
const FACE: Circle = { c: [0, -41], r: 40 };
/** An ear: the lens between two arcs of 108 struck through its tip and its root. */
const EAR_TIP: V = [75, 69];
const EAR_ROOT: V = [18, -7];
const EAR_R = 108;
/** An eye: a ring about a grid point, and a dot in it. */
const EYE: V = [14, -31];
/** The arm, which comes round under the chin to the paw: an arc of 33. */
const ARM: Circle = { c: [19, -39], r: 33 };

const W_LINE = 1.3;
const W_FINE = 0.9;

/** The circle of radius `r` through two points, its centre on the side of `hint`. */
const through = (p: V, q: V, r: number, hint: V): Circle => ({ c: nearest(circleCircle(p, r, q, r), hint), r });
/** Where a ruled line from `from` touches the circle `circ`, on the side of `hint`. */
const tangentFrom = (from: V, circ: Circle, hint: V): V => {
  const d = vdist(from, circ.c);

  return nearest(circleCircle(circ.c, circ.r, from, Math.sqrt(d * d - circ.r * circ.r)), hint);
};

const shoulder = tangentFrom(PEAK, BODY, [65, 40]);
const earOuter = through(EAR_TIP, EAR_ROOT, EAR_R, [110, 0]);
const earInner = through(EAR_TIP, EAR_ROOT, EAR_R, [-20, 60]);
const ear: Region = [arcTo(earOuter, EAR_TIP, EAR_ROOT, true), arcTo(earInner, EAR_ROOT, EAR_TIP, true)];

/** The black of the right half and the axis: the body's circle, the back up to its point, the ear. */
const blackRight: Region[] = [disc(BODY.c, BODY.r), ear];
/** The back: the triangle between the point and the two places its lines touch the body. */
const back: Region = [seg(PEAK, shoulder), seg(shoulder, [-shoulder[0], shoulder[1]]), seg([-shoulder[0], shoulder[1]], PEAK)];

// The white lines of the right half.
const whiteRight: Region[] = [];
/** An arc of a circle from one of its points to another the short way, inked `w` wide. */
const line = (circ: Circle, from: V, to: V, w: number): void => {
  const a0 = angleOf(circ.c, from);
  let d = angleOf(circ.c, to) - a0;
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;
  whiteRight.push(thickArc(circ.c, circ.r, w, a0, a0 + d));
};
// The ear's two sides, from its tip down to the face.
const footOuter = nearest(circleCircle(earOuter.c, EAR_R, FACE.c, FACE.r), [34, -12]);
const footInner = nearest(circleCircle(earInner.c, EAR_R, FACE.c, FACE.r), [16, 4]);
line(earOuter, EAR_TIP, footOuter, W_LINE);
line(earInner, EAR_TIP, footInner, W_LINE);
// The face: over the crown between the ears, and down the cheek from the ear to the arm.
whiteRight.push(thickArc(FACE.c, FACE.r, W_LINE, 90 * DEG, angleOf(FACE.c, footInner)));
whiteRight.push(thickArc(FACE.c, FACE.r, W_LINE, angleOf(FACE.c, footOuter), -20 * DEG));
// The eye: a ring and a dot.
whiteRight.push(thickArc(EYE, 3.9, 1.6, 0, TAU / 2), thickArc(EYE, 3.9, 1.6, TAU / 2, TAU), disc(EYE, 1.1));
// The line of the nose, from beside the eye down to the nose; the nose itself is a lens on the axis.
const bridge = through([5.5, -27], [2.5, -54], 43, [45, -44]);
line(bridge, [5.5, -27], [2.5, -54], W_LINE);
// Four whiskers, ruled.
for (const [from, to] of [[[16, -45], [46, -35]], [[16, -47], [49, -43]], [[16, -49], [47, -50.5]], [[16, -51], [41, -57]]] as [V, V][]) whiteRight.push(thickSeg(from, to, W_FINE));
// The arm and the three claws of the paw.
whiteRight.push(thickArc(ARM.c, ARM.r, W_LINE, -23 * DEG, -70 * DEG));
for (const from of [[31, -70], [26.5, -71.5], [22, -72]] as V[]) whiteRight.push(thickSeg(from, vadd(from, vmul(vunit([-0.5, -0.87]), 8)), W_FINE));

const nose: Region = [arcTo(through([-5, -56], [5, -56], 6, [0, -52]), [5, -56], [-5, -56], false), arcTo(through([-5, -56], [5, -56], 6, [0, -60]), [-5, -56], [5, -56], false)];
const both = (regions: Region[]): Region[] => [...regions, ...regions.map((region) => region.map(mirrored))];
const rabbit = carve([...both(blackRight), back], [...both(whiteRight), nose]);

/** Draws the rabbit to fill the layout circle of radius `reach`: its ear tips stand on that circle. */
export const usagiBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / Math.hypot(EAR_TIP[0], EAR_TIP[1]) };
  const k = placing.k;
  const page = (p: V): [number, number] => onPage(p, placing);
  c.guideCircle([CX, CY], reach);
  c.guideLine(page([0, 96]), page([0, -96]));
  for (const side of [1, -1]) {
    const flip = (p: V): V => [side * p[0], p[1]];
    c.guideCircle(page(flip(BODY.c)), BODY.r * k);
    c.guideLine(page(PEAK), page(flip(vadd(shoulder, vmul(vsub(shoulder, PEAK), 0.15)))));
    for (const circ of [earOuter, earInner]) {
      const run: Piece[] = [arcA(circ.c, circ.r, angleOf(circ.c, EAR_TIP) - (circ === earOuter ? 0.12 : -0.12), angleOf(circ.c, EAR_ROOT) + (circ === earOuter ? 0.12 : -0.12))];
      c.guidePath(openPath(side === 1 ? run : run.map(mirrored), placing));
    }
    c.guideCircle(page(flip(ARM.c)), ARM.r * k);
  }
  c.guideCircle(page(FACE.c), FACE.r * k);
  c.fill("rabbit", toPath(rabbit, placing));
};
