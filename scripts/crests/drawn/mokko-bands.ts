// The ring quince in the 1892 book: the quince's flower inside four curled bands. Coordinates are the page's, from its middle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, arcTo, carve, carveWhere, disc, mirrored, onCircle, reversedRun, seg, shortArc, tangentCircle, thickSeg, toPath, touch, vdist } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { PAPER } from "../library/part.ts";

const WIDTH = 16;
const BULB = 10;
const BULB_IN = 7;
const FILLET = 4;

/**
 * A band that arches away from the middle: its circle stands `out` from the middle, and its bulbs stand `open` degrees either side of the
 * arch's top. It is the catalogue's curled quince band, with its two edges taken the long way over the top so that a band may wrap
 * more than half way round.
 */
const band = (out: number, r: number, open: number): Region[] => {
  const centre: V = [0, out];
  const outer: Circle = { c: centre, r };
  const inner: Circle = { c: centre, r: r - WIDTH };
  const bulb: Circle = { c: onCircle(centre, inner.r + BULB_IN, (90 - open) * DEG), r: BULB };
  const top: V = [0, out + r];
  const outerBend = tangentCircle(outer, 1, bulb, 1, FILLET, top);
  const innerBend = tangentCircle(inner, -1, bulb, 1, FILLET, top);
  const outerJoin = touch(outer, outerBend);
  const innerJoin = touch(inner, innerBend);
  const outerTip = touch(bulb, outerBend);
  const innerTip = touch(bulb, innerBend);
  const mirror = ([x, y]: V): V => [-x, y];
  const cap = [shortArc(outerBend, outerJoin, outerTip), arcTo(bulb, outerTip, innerTip, false), shortArc(innerBend, innerTip, innerJoin)];

  return [[arcTo(outer, mirror(outerJoin), outerJoin, false), ...cap, arcTo(inner, innerJoin, mirror(innerJoin), true), ...reversedRun(cap.map(mirrored))]];
};

// The flower: two short upright petals and two long side petals, each a round body with a tip lobe and two shoulders between ruled seams.
const HEART = 9.5;
const SEAM = 48 * DEG;
const ORIGIN: V = [0, 0];
interface Petal {
  open: number;
  lobes: readonly Circle[];
  stamen: number;
}
const UPRIGHT: Petal = { open: SEAM, lobes: [{ c: ORIGIN, r: 24 }, { c: [0, 35], r: 12 }, { c: [-13, 23], r: 11.5 }, { c: [13, 23], r: 11.5 }], stamen: 25 };
const LEVEL: Petal = { open: 90 * DEG - SEAM, lobes: [{ c: ORIGIN, r: 26 }, { c: [0, 47.5], r: 13 }, { c: [-11.5, 29], r: 12.5 }, { c: [11.5, 29], r: 12.5 }], stamen: 30 };

const petal = ({ open, lobes, stamen }: Petal, paper: number): Region[] => {
  const sin = Math.sin(open);
  const cos = Math.cos(open);
  const foot = paper / 2 / cos;
  const clear = HEART + paper;

  return carveWhere(
    [
      ...lobes.flatMap(({ c, r }) => disc(c, r)), ...disc(ORIGIN, clear), ...thickSeg(ORIGIN, [0, stamen], 2 * paper),
      ...[-1, 1].map((side) => seg([-side * foot, 0], [-side * foot + side * 90 * sin, 90 * cos])),
    ],
    ([x, y]) => y * sin - Math.abs(x) * cos > paper / 2 && vdist(ORIGIN, [x, y]) > clear && lobes.some(({ c, r }) => vdist(c, [x, y]) < r) && !(Math.abs(x) < paper && y < stamen),
  );
};

export function kanMokkoBuild(c: Builder): void {
  c.precision(3);
  const upright = band(22.6, 53.4, 55);
  const side = band(55.8, 39.6, 104);

  c.guideCircle(C0, R);
  for (const turn of [0, 180]) c.fill("curled-band", toPath(upright, { k: 1, turn }));
  for (const turn of [90, 270]) c.fill("curled-band", toPath(side, { k: 1, turn }));
  for (const turn of [0, 180]) c.fill("karahana", toPath(petal(UPRIGHT, PAPER), { k: 1, turn }));
  for (const turn of [90, 270]) c.fill("karahana", toPath(petal(LEVEL, PAPER), { k: 1, turn }));
  c.fill("karahana", toPath(carve([disc(ORIGIN, HEART)], [disc(ORIGIN, PAPER)]), { k: 1 }), "evenodd");
}
