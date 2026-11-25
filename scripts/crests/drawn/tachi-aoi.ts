// The standing hollyhock, 立ち葵: three hollyhock leaves on stems that rise from one foot, struck with a compass and a ruler.
// The leaf is the Tokugawa hollyhock's (aoi.ts), stood with its notch on its stem; the stems and the foot were measured from
// the 1892 crest book (伊呂波分新撰紋帳, frame 36, 立あふひ) and compared with a picture of the crest as it is drawn today.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, in the leaf's own unit. The top leaf stands on the upright
// line through the centre and the two side leaves are the same leaf a quarter turn to each side, so the three tips stand on
// the layout circle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, lineCircle, mirrored, moved, nearest, onPage, reversedRun, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { AOI_LEAF } from "./aoi.ts";

const at = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });

/** A stem is 6 wide: 3 either side of its line. */
const HALF = 3;

/** How the three leaves stand and what their stems are struck with. Every centre is a grid point and every width a whole number. */
export interface Standing {
  /** The leaf's own origin, near its tip, stands this far from the centre, and the leaf hangs back from it towards the centre. */
  far: number;
  /** The white line between the upright stem and the right branch, which passes behind it. */
  gap: number;
  /** The foot stands on this level line. */
  base: number;
  /** The left branch's upper edge: it touches the upper line of the left leaf's stem and runs down into the upright stem. */
  upLeft: Circle;
  /** The left branch's lower edge: it touches the lower line of the left leaf's stem and the trunk's left side. */
  lowLeft: Circle;
  /** The trunk's left side, upright. */
  sideLeft: number;
  /** The foot's left side: it touches the trunk's side and flares out to the base. */
  footLeft: Circle;
  /** The right branch's upper edge: it touches the upper line of the right leaf's stem and the far side of the gap. */
  upRight: Circle;
  lowRight: Circle;
  sideRight: number;
  footRight: Circle;
}

/** The crest on its own, measured from the 立あふひ of the 1892 book and from the crest as it is drawn today. */
export const TACHI_AOI: Standing = {
  far: 119,
  gap: 3,
  base: -96,
  upLeft: at(-54, -52, 55),
  lowLeft: at(-53, -44, 41),
  sideLeft: -12,
  footLeft: at(-62, -50, 50),
  upRight: at(43, -34, 37),
  lowRight: at(47, -36, 33),
  sideRight: 14,
  footRight: at(64, -50, 50),
};

/** The crest in a ring: the leaves stand closer to the centre and the branches are shorter, so that the three fill the ring. */
export const TACHI_AOI_RINGED: Standing = {
  far: 107,
  gap: 4,
  base: -92,
  upLeft: at(-33, -27, 30),
  lowLeft: at(-38, -33, 30),
  sideLeft: -8,
  footLeft: at(-66, -39, 58),
  upRight: at(42, -32, 35),
  lowRight: at(42, -31, 28),
  sideRight: 14,
  footRight: at(72, -42, 58),
};

const upright = (x: number): [V, V] => [[x, 0], [x, 1]];
const level = (y: number): [V, V] => [[0, y], [1, y]];
const meet = (line: [V, V], circ: Circle, hint: V): V => nearest(lineCircle(line[0], line[1], circ.c, circ.r), hint);

/** The trunk: the upright stem, the left branch that joins it, and the left half of the foot. Clockwise from the top of the stem. */
const trunk = (s: Standing, OVER: Circle): Region => {
  const { upLeft: UP_L, lowLeft: LOW_L, sideLeft: SIDE_L, footLeft: FOOT_L, base: BASE } = s;
  const topL = meet(upright(-HALF), OVER, [-HALF, 55]);
  const topR = meet(upright(HALF), OVER, [HALF, 55]);
  const footL = meet(level(BASE), FOOT_L, [-42, BASE]);
  const endLow = meet(level(-HALF), OVER, [-55, -HALF]);
  const endUp = meet(level(HALF), OVER, [-55, HALF]);
  const crotch = meet(upright(-HALF), UP_L, [-HALF, -31]);

  return [
    arcTo(OVER, topL, topR, false),
    seg(topR, [HALF, BASE]),
    seg([HALF, BASE], footL),
    arcTo(FOOT_L, footL, [SIDE_L, FOOT_L.c[1]], true),
    seg([SIDE_L, FOOT_L.c[1]], [SIDE_L, LOW_L.c[1]]),
    arcTo(LOW_L, [SIDE_L, LOW_L.c[1]], [LOW_L.c[0], -HALF], true),
    seg([LOW_L.c[0], -HALF], endLow),
    arcTo(OVER, endLow, endUp, false),
    seg(endUp, [UP_L.c[0], HALF]),
    arcTo(UP_L, [UP_L.c[0], HALF], crotch, false),
    seg(crotch, topL),
  ];
};

/** The right branch and the right half of the foot, beyond the gap. Clockwise from where the branch leaves the right leaf. */
const branch = (s: Standing, OVER: Circle): Region => {
  const { upRight: UP_R, lowRight: LOW_R, sideRight: SIDE_R, footRight: FOOT_R, base: BASE } = s;
  const far = HALF + s.gap;
  const endUp = meet(level(HALF), OVER, [55, HALF]);
  const endLow = meet(level(-HALF), OVER, [55, -HALF]);
  const footR = meet(level(BASE), FOOT_R, [44, BASE]);

  return [
    arcTo(OVER, endUp, endLow, false),
    seg(endLow, [LOW_R.c[0], -HALF]),
    arcTo(LOW_R, [LOW_R.c[0], -HALF], [SIDE_R, LOW_R.c[1]], true),
    seg([SIDE_R, LOW_R.c[1]], [SIDE_R, FOOT_R.c[1]]),
    arcTo(FOOT_R, [SIDE_R, FOOT_R.c[1]], footR, true),
    seg(footR, [far, BASE]),
    seg([far, BASE], [far, UP_R.c[1]]),
    arcTo(UP_R, [far, UP_R.c[1]], [UP_R.c[0], HALF], false),
    seg([UP_R.c[0], HALF], endUp),
  ];
};

/** A leaf's own stem and spindle, one black shape on its axis: from the circle under the trunk, in between the lobes to the neck, and on to the tip. */
const axis = (T: number, UNDER: Circle): Region => {
  const stand = (p: Piece): Piece => moved(rotated(p, Math.PI), [0, T]);
  const neck = AOI_LEAF.neck;
  // In the leaf's frame: the stem's side comes down the line 3 from the axis and ends on the circle round the neck.
  const onNeck = meet(upright(HALF), neck, [HALF, 62]);
  const from = meet(upright(HALF), at(0, T, UNDER.r), [HALF, T - UNDER.r]);
  const right: Piece[] = [seg(from, onNeck), arcTo(neck, onNeck, [neck.c[0] - neck.r, neck.c[1]], true), ...AOI_LEAF.spindle];
  const stood = right.map(stand);
  const left = reversedRun(stood.map(mirrored));
  const a = left[left.length - 1];
  const start = stood[0];
  if (a.t !== "L" || start.t !== "L") throw new Error("tachi-aoi: the stem's sides are ruled lines");

  return [...stood, ...left, arcTo(UNDER, a.b, start.a, true)];
};

/**
 * Draws the standing hollyhock so that its tips reach `reach` from the centre: the top leaf, then the same leaf where it
 * stands to the right and to the left, then the trunk and the right branch, with the white line between them.
 */
export const tachiAoiBuild = (c: Builder, part: string, reach: number, s: Standing): void => {
  const T = s.far;
  const k = reach / (T - AOI_LEAF.tip[1]);
  const top: Placing = { k };
  /** The leaf in the crest's frame: turned half round and moved up, so that its notch faces the centre. */
  const stand = (p: Piece): Piece => moved(rotated(p, Math.PI), [0, T]);
  const standAt = (p: V): V => [-p[0], T - p[1]];
  /** Where a leaf's own stem ends, under the trunk, and where the trunk's three stems end, over the leaves' own: two circles about the centre, 2 apart. */
  const under = at(0, 0, T - 66);
  const over = at(0, 0, T - 64);
  const cells = AOI_LEAF.cells.map((loop) => loop.map(stand));
  const stem = axis(T, under);

  c.guideCircle(C0, R);
  for (const circ of [over, under]) c.guideCircle(C0, circ.r * k);
  c.guideSpokes(4, 0, reach);
  for (const circ of AOI_LEAF.circles) c.guideCircle(onPage(standAt(circ.c), top), circ.r * k);
  c.guideLine(onPage(standAt(AOI_LEAF.side[0]), top), onPage(standAt(AOI_LEAF.side[1]), top));
  for (const circ of [s.upLeft, s.lowLeft, s.footLeft, s.upRight, s.lowRight, s.footRight]) c.guideCircle(onPage(circ.c, top), circ.r * k);

  for (const turn of [0, 90, 270]) {
    c.group(() => {
      c.fill(part, toPath([stem], { k, turn }));
      c.fill(part, toPath(cells, { k, turn }));
      c.fill(part, toPath(cells, { k, turn, mirror: true }));
    });
  }
  c.fill(part, toPath([trunk(s, over)], top));
  c.fill(part, toPath([branch(s, over)], top));
};
