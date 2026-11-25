// The peony flower, 大割り牡丹, struck in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100.
// Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 9, 大わりぼたん).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the white round a petal where it lies over another, and between the two petals of a pair that meet on the axis. */
const LINE = 2;
const o = (x: number, y: number, r: number): Circle => ({ c: [x, y], r });
/** A circle and its mirror, for a petal on the axis that ripples the same on both sides. */
const both = (x: number, y: number, r: number): Circle[] => [o(x, y, r), o(-x, y, r)];
/**
 * The petals, from the one in front to the one at the back: a petal on the axis, or the right one of a pair. A petal is where all
 * of its `sides` meet, and each side is the circles it is struck from taken together, so an edge ripples where one of them runs
 * into the next. Each petal lies over all that come after it; `meet` is a pair that meets on the axis.
 */
const PETALS: { sides: Circle[][]; pair?: true; meet?: true }[] = [
  // The wide petal in front, and the two that cup it and meet above it.
  { sides: [[o(0, -30, 34), ...both(16, -41, 20)], [o(0, -57, 41)]] },
  { sides: [[o(12, -32, 28), o(26, -26, 22)]], pair: true, meet: true },
  // The heart of the flower, a dome behind them.
  { sides: [[o(0, -4, 30), ...both(18, -4, 24)]] },
  // The outer petals, from the foot up each side.
  { sides: [[o(0, -71, 28), ...both(15, -75, 23)]] },
  { sides: [[o(68, -46, 20), o(52, -60, 22), o(60, -52, 24)], [o(62, -80, 50)]], pair: true },
  { sides: [[o(80, -8, 20), o(76, -22, 20), o(64, -12, 28)], [o(60, -22, 35), o(78, -22, 38)]], pair: true },
  { sides: [[o(44, 25, 25), o(68, 30, 21), o(78, 16, 19), o(60, 18, 22)]], pair: true },
  // The petal over the heart, the two behind it that meet under its top, and the one at the back.
  { sides: [[o(0, 41, 20), ...both(20, 36, 19), o(0, 26, 26)]] },
  { sides: [[o(24, 50, 27), o(48, 57, 26), o(60, 48, 23)]], pair: true, meet: true },
  { sides: [[o(0, 78, 21), ...both(22, 72, 24)]] },
];
type Petal = (typeof PETALS)[number];
/** The heart is the third of them, and its stamens are white dots on grid points. */
const HEART = 2;
const STAMENS: Circle[] = [[0, 14], [12, 11], [-12, 11], [24, 5], [-24, 5]].map((c) => ({ c: c as V, r: 2 }));
/** The petals inked together, front to back: the left ones of a run's pairs are built where they stand once its right ones are inked. */
const RUNS = [[0, 1], [2, 3, 4, 5, 6], [7, 8], [9]];

/**
 * The peony flower, 大割り牡丹: rippled petals one over another about the flower's heart, as it is seen from the front. A wide
 * petal stands in front with one cupping it each side, the heart is a dome behind them with five white stamens, and eleven more
 * petals stand round and over it to the top. A white line parts each petal from those it lies over. The petals are inked from the
 * front one back, and the left one of a pair where it stands, once the right one is inked.
 */
export const botanBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const flip = (p: V): V => [-p[0], p[1]];
  const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
  const inPetal = (petal: Petal, p: V, grow = 0): boolean =>
    petal.sides.every((side) => side.some((one) => within(one, p, grow))) && (petal.meet === undefined || grow > 0 || p[0] >= LINE / 2);
  const covers = (petal: Petal, p: V): boolean => inPetal(petal, p, LINE) || (petal.pair === true && inPetal(petal, flip(p), LINE));
  const circlesOf = (petal: Petal, grow = 0): Circle[] =>
    petal.sides.flat().flatMap((one) => [{ c: one.c, r: one.r + grow }, ...(petal.pair ? [{ c: flip(one.c), r: one.r + grow }] : [])]);
  const axis = seg([LINE / 2, -200], [LINE / 2, 200]);

  c.guideCircle(C0, reach);
  for (const run of RUNS) {
    const lefts: Region[][] = [];
    c.group(() =>
      run.forEach((i) => {
        const petal = PETALS[i];
        const over = PETALS.slice(0, i);
        const holes = i === HEART ? STAMENS : [];
        const outlines = [...circlesOf(petal), ...over.flatMap((one) => circlesOf(one, LINE)), ...holes].flatMap((one) => disc(one.c, one.r));
        const loops: Region[] = longLast(
          carveWhere([...outlines, ...(petal.meet ? [axis] : [])], (p) => inPetal(petal, p) && !over.some((one) => covers(one, p)) && !holes.some((one) => within(one, p))),
        );
        c.fill(part, toPath(loops, placing));
        if (petal.pair) lefts.push(loops.map((loop) => loop.map(mirrored)));
      }),
    );
    for (const loops of lefts) c.fill(part, toPath(loops, placing));
  }
};
