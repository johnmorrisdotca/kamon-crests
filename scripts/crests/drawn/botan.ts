// The peony flower, 大割り牡丹, struck in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100.
// Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 9, 大わりぼたん).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: the white round a petal where it lies over another, and between the two petals of a pair that meet on the axis. */
const LINE = 2;
/**
 * The petals, from the one in front to the one at the back, each a circle on a grid point: a petal on the axis, or the right one
 * of a pair. Each lies over all that come after it. An outer petal's far edge is flatter than its sides: the arc of a second,
 * wider circle (`cap`), all of one width, each a third of the way out from the centre towards its petal.
 */
const CAP = 65;
const PETALS: { c: V; r: number; pair?: true; cap?: V }[] = [
  // The round petal in front, and the two that cup it and meet above it.
  { c: [0, -42], r: 27 },
  { c: [21, -28], r: 27, pair: true },
  // The heart of the flower, a dome behind them.
  { c: [0, -18], r: 45 },
  // The outer petals, from the foot up each side.
  { c: [0, -80], r: 40, cap: [0, -35] },
  { c: [62, -63], r: 35, pair: true, cap: [27, -22] },
  { c: [70, -22], r: 35, pair: true, cap: [34, -6] },
  { c: [55, 9], r: 40, pair: true, cap: [32, 15] },
  // The petal over the heart, the two behind it that meet under its top, and the one at the back.
  { c: [0, 10], r: 52 },
  { c: [40, 30], r: 50, pair: true },
  { c: [0, 30], r: 70 },
];
/** The heart is the third of them, and its stamens are white dots on grid points. */
const HEART = 2;
const STAMENS: Circle[] = [[0, 17], [12, 13], [-12, 13], [24, 7], [-24, 7]].map((c) => ({ c: c as V, r: 2 }));

/**
 * The peony flower, 大割り牡丹: round petals one over another about the flower's heart, as it is seen from the front. A round
 * petal stands in front with one cupping it each side, the heart is a dome behind them with five white stamens, and ten more
 * petals stand round and over it to the top. A white line parts each petal from those it lies over. The petals are inked from the
 * front one back, and the left one of a pair where it stands.
 */
export const botanBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
  const within = (circ: Circle, p: V, grow = 0): boolean => vdist(circ.c, p) < circ.r + grow;
  const axis = seg([LINE / 2, -200], [LINE / 2, 200]);

  c.guideCircle(C0, reach);
  PETALS.forEach((petal, i) => {
    const over: Circle[] = PETALS.slice(0, i).flatMap((one) => (one.pair ? [one, flip(one)] : [one]));
    const holes = i === HEART ? STAMENS : [];
    const loops: Region[] = longLast(
      carveWhere([...disc(petal.c, petal.r), ...(petal.cap ? disc(petal.cap, CAP) : []), ...over.flatMap((one) => disc(one.c, one.r + LINE)), ...holes.flatMap((one) => disc(one.c, one.r)), ...(petal.pair ? [axis] : [])], (p) => {
        if (!within(petal, p) || (petal.cap && vdist(petal.cap, p) > CAP) || (petal.pair && p[0] < LINE / 2)) return false;

        return !over.some((one) => within(one, p, LINE)) && !holes.some((one) => within(one, p));
      }),
    );
    c.fill(part, toPath(loops, placing));
    if (petal.pair) c.fill(part, toPath(loops.map((loop) => loop.map(mirrored)), placing));
  });
};
