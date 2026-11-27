// The clove, 丁子, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100. Its
// proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 12, 丸に一ッ丁子).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, onPage, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: round the bud where it lies over the petals, and round the middle petal where it lies over the other two. */
const LINE = 2;
/** The bud's round head, a circle on the axis. */
const HEAD: Circle = { c: [0, 18], r: 37 };
/** The bud's right side: a long arc that touches the head at its widest and runs down to the point on the axis. Its centre is level with the head's. */
const SIDE: Circle = { c: [-154, 18], r: 191 };
/** The middle petal, and the petal on the right. */
const MIDDLE: Circle = { c: [0, 69], r: 22 };
const PETAL: Circle = { c: [35, 50], r: 24 };
/** A white stamen lies along each petal, on the line from the head's centre through the petal's: this wide, and out to this circle about the head's centre. */
const STAMEN = 4;
const STAMEN_END = 60;

const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
/** The endless line through two points, as a piece long enough to cross the whole crest. */
const ruled = (a: V, b: V): Piece => seg([a[0] - (b[0] - a[0]) * 9, a[1] - (b[1] - a[1]) * 9], [a[0] + (b[0] - a[0]) * 9, a[1] + (b[1] - a[1]) * 9]);
/** How far a point stands to the left of the line from `a` to `b`. */
const leftOf = ([a, b]: [V, V], p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / vdist(a, b);
/** The line `off` to the left of the line from `a` to `b`. */
const beside = ([a, b]: [V, V], off: number): Piece => {
  const n: V = [(-(b[1] - a[1]) * off) / vdist(a, b), ((b[0] - a[0]) * off) / vdist(a, b)];

  return ruled([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]);
};

export function chojiInk(): [Region[], Region[], Region[], Region[]] {
  const rib = (to: V): [V, V] => [HEAD.c, to];
  const stamen = (to: V, p: V): boolean => Math.abs(leftOf(rib(to), p)) < STAMEN / 2 && vdist(HEAD.c, p) < STAMEN_END;
  const stamenLines = (to: V): Piece[] => [beside(rib(to), STAMEN / 2), beside(rib(to), -STAMEN / 2), ...disc(HEAD.c, STAMEN_END)];
  const over = disc(HEAD.c, HEAD.r + LINE);

  const middle = carveWhere([...disc(MIDDLE.c, MIDDLE.r), ...over, ...stamenLines(MIDDLE.c)], (p) => within(MIDDLE, p) && !within(HEAD, p, LINE) && !stamen(MIDDLE.c, p));
  const petal = carveWhere(
    [...disc(PETAL.c, PETAL.r), ...over, ...disc(MIDDLE.c, MIDDLE.r + LINE), ...stamenLines(PETAL.c)],
    (p) => within(PETAL, p) && !within(HEAD, p, LINE) && !within(MIDDLE, p, LINE) && !stamen(PETAL.c, p),
  );
  // The head and the sides touch on the level line through their centres.
  const level = ruled(HEAD.c, SIDE.c);
  const bud = carveWhere([...disc(HEAD.c, HEAD.r), ...disc(SIDE.c, SIDE.r), ...disc(flip(SIDE).c, SIDE.r), level], (p) => within(HEAD, p) || (p[1] < HEAD.c[1] && within(SIDE, p) && within(flip(SIDE), p)));

  const left = petal.map((loop) => loop.map(mirrored));
  return [longLast(middle), longLast(petal), longLast(bud), longLast(left)];
}

/**
 * The clove, 丁子: a flower bud of the clove tree, dried as a spice. The bud is a drop, a round head that narrows to a point at
 * the foot, and three round petals stand on the head, the middle one over the other two, a white stamen along each. The bud
 * lies over the petals, a white line round it. The middle petal, the right petal and the bud are built in full, and the left
 * petal where it stands.
 */
export const chojiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const shapes = chojiInk();

  c.guideCircle(C0, reach);
  c.guideLine(onPage(HEAD.c, placing), onPage(SIDE.c, placing));
  for (const shape of shapes) c.fill(part, toPath(shape, placing));
};
