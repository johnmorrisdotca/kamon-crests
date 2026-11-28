// The knotted manji in a thread ring, from the 1892 book: four round loops of one broad band, each lying over the next.
import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, angleOf, carveWhere, circleCircle, disc, onCircle, thickArc, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

// In the print's proportions, with the ring's outer radius as 100: the loops' centres stand 36 from the middle and each loop is 49 in radius.
const OUT = 36;
const LOOP = 49;
const EYE = 10.5;
const EYE_OUT = 3.5;
const REACH = 0.885;

/** The loop whose centre stands `turn` degrees clockwise from upright. */
const loop = (turn: number): Circle => ({ c: [OUT * Math.sin(turn * DEG), OUT * Math.cos(turn * DEG)], r: LOOP });
const within = ({ c, r }: Circle, p: V): boolean => vdist(c, p) < r;

/**
 * What one loop shows of the loop that lies over it, the one a quarter turn back. That loop's edge is a paper line from the notch between
 * the two as far as this loop's eye. The eye is the opening of this loop: the part of a small circle that lies outside the upper loop's edge.
 */
const marks = (turn: number, paper: number): { eye: Circle; over: Circle; line: Region; from: number; to: number } => {
  const own = loop(turn);
  const over = loop(turn - 90);
  const towards = angleOf(over.c, own.c);
  const eye: Circle = { c: onCircle(over.c, over.r + EYE_OUT, towards), r: EYE };
  // The notch is the crossing of the two loops that lies away from the middle.
  const notch = circleCircle(own.c, own.r, over.c, over.r).sort((a, b) => vdist(b, [0, 0]) - vdist(a, [0, 0]))[0];
  let to = angleOf(over.c, notch);
  while (to < towards) to += 2 * Math.PI;
  const from = towards + 8 * DEG;

  return { eye, over, line: thickArc(over.c, over.r, paper, from, to + 4 * DEG), from, to: to + 4 * DEG };
};

export function itowaNiMusubiManjiBuild(c: Builder): void {
  c.precision(3);
  const outer = 96;
  c.ring("ring-thread");
  const k = outer * REACH / (OUT + LOOP);
  const paper = WEIGHT.hair / k;
  const turns = [0, 90, 180, 270];
  const loops = turns.map(loop);
  const all = turns.map((turn) => marks(turn, paper));
  const cut = (p: V): boolean => all.some(({ eye, over, from, to }) => {
    if (within(eye, p) && !within(over, p)) return true;
    let a = angleOf(over.c, p);
    while (a < from) a += 2 * Math.PI;

    return a < to && Math.abs(vdist(over.c, p) - over.r) < paper / 2;
  });
  const knot = carveWhere(
    [...loops.flatMap(({ c: centre, r }) => disc(centre, r)), ...all.flatMap(({ eye, line }) => [...disc(eye.c, eye.r), ...line])],
    (p) => loops.some((one) => within(one, p)) && !cut(p),
  );

  c.guideCircle(C0, OUT * k);
  c.fill("manji", toPath(knot, { k }), "evenodd");
}
