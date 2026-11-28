// The three-split arabesque flower in the 1892 book. The circle the three flowers are cut by counts 100.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, mirrored, reversedRun, seg, thickSeg, toPath, vadd, vdist, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { PAPER } from "../library/part.ts";

const ORIGIN: V = [0, 0];
const RIM = 100;
const AT: V = [0, RIM];
const HEART = 13;
const SECTOR = 32 * DEG;
const SIDE = 72;
const STAMEN = 41;
// The inward petal, measured from the flower's heart on the rim: a round body, a tip lobe and two shoulders.
const LOBES: readonly (readonly [x: number, y: number, r: number])[] = [[0, 0, 70], [0, 75.5, 18.5], [-20, 61, 21], [20, 61, 21]];
// A side petal runs from the end of the inward petal's flank to the rim, 59 degrees round, in two shallow scallops.
const MEET = 59;
const SCALLOP = 4;

const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1];
/** The point `r` out from the middle, `turn` degrees clockwise from upright. */
const out = (r: number, turn: number): V => [r * Math.sin(turn * DEG), r * Math.cos(turn * DEG)];

const splitFlower = (paper: number): Region[] => {
  const sin = Math.sin(SECTOR);
  const cos = Math.cos(SECTOR);
  // In the flower's own frame the heart is the origin and y runs towards the middle of the crest.
  const own = ([x, y]: V): V => [x, RIM - y];
  const lobes = LOBES.map(([x, y, r]) => ({ c: own([x, y]), r }));
  // The paper line between the inward petal and a side petal: `edge` is 1 for its outer edge and -1 for its inner one.
  const flank = (side: 1 | -1, edge: 1 | -1): Region[number] => {
    const foot = own([edge * side * paper / 2 / cos, 0]);

    return seg(foot, vadd(foot, [side * 110 * sin, -110 * cos]));
  };
  const clear = (p: V): boolean => vdist(AT, p) > HEART + paper;
  const middle = carveWhere(
    [...lobes.flatMap(({ c, r }) => disc(c, r)), flank(1, -1), flank(-1, -1), ...disc(AT, HEART + paper), ...thickSeg(AT, own([0, STAMEN]), paper)],
    (p) => {
      const [x, y] = own(p);

      return y * sin - Math.abs(x) * cos > paper / 2 && clear(p) && lobes.some(({ c, r }) => vdist(c, p) < r) && !(Math.abs(x) < paper / 2 && y < STAMEN);
    },
  );

  const corner = own([SIDE * sin, SIDE * cos]);
  const meet = out(RIM, MEET);
  const along = vunit(vsub(meet, corner));
  const inwards: V = [-along[1], along[0]];
  const towards = dot(vsub(AT, corner), inwards) > 0 ? inwards : vmul(inwards, -1);
  const chord = vdist(corner, meet) / 2;
  // The scallops cross each other a little outside their common chord, so the cusp between them is theirs alone.
  const reach = chord * 0.56;
  const radius = (reach * reach + SCALLOP * SCALLOP) / (2 * SCALLOP);
  const scallops = [0.25, 0.75].map((t) => ({ c: vadd(vadd(corner, vmul(along, 2 * chord * t)), vmul(towards, radius)), r: radius }));
  const base = vadd(corner, vmul(towards, SCALLOP));
  const ray = vunit(vsub(own([Math.sin(62 * DEG), Math.cos(62 * DEG)]), AT));
  const stamen = thickSeg(AT, vadd(AT, vmul(ray, 38)), paper);
  const right = carveWhere(
    [...disc(ORIGIN, RIM), flank(1, 1), ...disc(AT, HEART + paper), seg(vsub(base, vmul(along, 60)), vadd(base, vmul(along, 120))), ...scallops.flatMap(({ c, r }) => disc(c, r)), ...stamen],
    (p) => {
      const [x, y] = own(p);
      const from = vsub(p, AT);

      return vdist(ORIGIN, p) < RIM && x > 0 && x * cos - y * sin > paper / 2 && clear(p) &&
        (dot(vsub(p, base), towards) > 0 || scallops.some(({ c, r }) => vdist(c, p) < r)) &&
        !(Math.abs(from[0] * ray[1] - from[1] * ray[0]) < paper / 2 && dot(from, ray) < 38);
    },
  );
  const cap = carveWhere([...disc(AT, HEART), ...disc(ORIGIN, RIM)], (p) => vdist(AT, p) < HEART && vdist(ORIGIN, p) < RIM);

  return [...middle, ...right, ...right.map((loop) => reversedRun(loop.map(mirrored))), ...cap];
};

export function mitsuwariKarahanaBuild(c: Builder): void {
  c.precision(3);
  const k = R / RIM;
  const flower = splitFlower(PAPER / k);

  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  for (const turn of [0, 120, 240]) c.fill("karahana", toPath(flower, { k, turn }), "evenodd");
}
