// The flower lozenge, 花菱, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at
// 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 8, 花びし).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: between two petals, and round the middle. */
const LINE = 2;
/** The middle: a disc with a white dot in it, and a white line round it. */
const MIDDLE = 10;
const DOT = 2;
/** The petals meet on this circle about the centre: the notch between two petals stands on it. */
const NOTCH = 58;
/** The lines between the petals run through the centre and this grid point, and through its mirror image. */
const BETWEEN: V = [50, 40];

/** A petal: its three round lobes, the middle one first, and the two circles its white stamen lies between. */
export interface HanabishiPetal {
  lobes: Circle[];
  stamen: [Circle, Circle];
}
/** The petal that points up: the short one. */
export const HANABISHI_UP: HanabishiPetal = {
  lobes: [{ c: [0, 53], r: 19 }, { c: [30, 47], r: 16 }, { c: [-30, 47], r: 16 }],
  stamen: [{ c: [35, 22], r: 37 }, { c: [-35, 22], r: 37 }],
};
/** The petal that points right: the long one, its tip on the layout circle. */
export const HANABISHI_SIDE: HanabishiPetal = {
  lobes: [{ c: [81, 0], r: 19 }, { c: [62, 16], r: 18 }, { c: [62, -16], r: 18 }],
  stamen: [{ c: [24, 48], r: 50 }, { c: [24, -48], r: 50 }],
};

const within = (circles: Circle[], p: V, grow = 0): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r + grow);
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 9, a[1] - (b[1] - a[1]) * 9], [a[0] + (b[0] - a[0]) * 9, a[1] + (b[1] - a[1]) * 9]);
/** How far a point stands to the left of the line from the centre through `to`. */
const leftOf = (to: V, p: V): number => (to[0] * p[1] - to[1] * p[0]) / Math.hypot(to[0], to[1]);
/** The line `off` to the left of the line from the centre through `to`. */
const beside = (to: V, off: number): Piece => {
  const n: V = [(-to[1] * off) / Math.hypot(to[0], to[1]), (to[0] * off) / Math.hypot(to[0], to[1])];

  return ruled(n, [to[0] + n[0], to[1] + n[1]]);
};

/**
 * The flower lozenge, 花菱: four petals about a round middle, the two at the sides longer than the two above and below, so
 * that the flower fills a lozenge. A petal is three round lobes on a circle about the centre; a white line runs between any
 * two petals, a white stamen lies along each from the middle, and the middle is a disc with a white dot in a white ring.
 * The petal that points up and the one that points right are built in full, and the other two where they stand.
 */
export const hanabishiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const rise: V = BETWEEN;
  const fall: V = [BETWEEN[0], -BETWEEN[1]];
  const lines = [rise, fall].flatMap((to) => [beside(to, LINE / 2), beside(to, -LINE / 2)]);
  const petal = (one: HanabishiPetal, inSector: (p: V) => boolean): Piece[][] =>
    longLast(
      carveWhere(
        [...disc([0, 0], NOTCH), ...disc([0, 0], MIDDLE + LINE), ...one.lobes.flatMap((lobe) => disc(lobe.c, lobe.r)), ...one.stamen.flatMap((side) => disc(side.c, side.r)), ...lines],
        (p) => inSector(p) && vdist([0, 0], p) > MIDDLE + LINE && (vdist([0, 0], p) < NOTCH || within(one.lobes, p)) && !one.stamen.every((side) => within([side], p)),
      ),
    );
  const up = petal(HANABISHI_UP, (p) => leftOf(rise, p) > LINE / 2 && leftOf(fall, p) > LINE / 2 && p[1] > 0);
  const side = petal(HANABISHI_SIDE, (p) => leftOf(rise, p) < -LINE / 2 && leftOf(fall, p) > LINE / 2 && p[0] > 0);
  const middle = carveWhere([...disc([0, 0], MIDDLE), ...disc([0, 0], DOT)], (p) => vdist([0, 0], p) < MIDDLE && vdist([0, 0], p) > DOT);
  const half = Math.PI;

  c.guideCircle(C0, reach);
  for (const r of [NOTCH, MIDDLE + LINE, MIDDLE, DOT]) c.guideCircle(C0, r * placing.k);
  c.fill(part, toPath(up, placing));
  c.fill(part, toPath(side, placing));
  c.fill(part, toPath(up.map((loop) => loop.map((p) => rotated(p, half))), placing));
  c.fill(part, toPath(side.map((loop) => loop.map((p) => rotated(p, half))), placing));
  c.fill(part, toPath(middle, placing));
};
