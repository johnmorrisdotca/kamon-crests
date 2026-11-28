// The split flower lozenge in the 1892 book: two half flowers face each other inside one lozenge. Coordinates are the page's, from its middle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, lineCircle, mirrored, reversedRun, seg, thickSeg, toPath, vadd, vdist, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { PAPER } from "../library/part.ts";

const WIDE = R;
const HIGH = 66;
const AT: V = [0, HIGH];
const SIDE: V = [WIDE, 0];
const HEART = 11;
const SECTOR = 28 * DEG;
const STAMEN = 42;
const SIDE_STAMEN = 28;
const SIDE_LEAN = 42 * DEG;
// The inward petal, measured from the flower's heart on the upper corner: a round body, a tip lobe and two shoulders.
const LOBES: readonly (readonly [x: number, y: number, r: number])[] = [[0, 0, 54], [0, 50.5, 13.4], [-18.5, 47.5, 11.5], [18.5, 47.5, 11.5]];
const SCALLOP = 2.5;

const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1];
const inLozenge = ([x, y]: V): boolean => Math.abs(x) / WIDE + Math.abs(y) / HIGH < 1;
const lozenge: Region = [seg([0, HIGH], [WIDE, 0]), seg([WIDE, 0], [0, -HIGH]), seg([0, -HIGH], [-WIDE, 0]), seg([-WIDE, 0], [0, HIGH])];

const halfFlower = (paper: number): Region[] => {
  const sin = Math.sin(SECTOR);
  const cos = Math.cos(SECTOR);
  // In the flower's own frame the heart is the origin and y runs down towards the middle of the crest.
  const own = ([x, y]: V): V => [x, HIGH - y];
  const lobes = LOBES.map(([x, y, r]) => ({ c: own([x, y]), r }));
  // The paper line between the inward petal and a side petal: `edge` is 1 for its outer edge and -1 for its inner one.
  const flank = (side: 1 | -1, edge: 1 | -1): Region[number] => {
    const foot = own([edge * side * paper / 2 / cos, 0]);

    return seg(foot, vadd(foot, [side * 90 * sin, -90 * cos]));
  };
  const clear = (p: V): boolean => vdist(AT, p) > HEART + paper;
  const middle = carveWhere(
    [...lobes.flatMap(({ c, r }) => disc(c, r)), flank(1, -1), flank(-1, -1), ...disc(AT, HEART + paper), ...thickSeg(AT, own([0, STAMEN]), paper)],
    (p) => {
      const [x, y] = own(p);

      return y * sin - Math.abs(x) * cos > paper / 2 && clear(p) && lobes.some(({ c, r }) => vdist(c, p) < r) && !(Math.abs(x) < paper / 2 && y < STAMEN);
    },
  );

  // A side petal fills the corner between the flank, the lozenge's edge and a scalloped edge from the shoulder's end to the side corner.
  const shoulder = lobes[3];
  const corner = lineCircle(AT, vadd(AT, [sin, -cos]), shoulder.c, shoulder.r).sort((a, b) => vdist(b, AT) - vdist(a, AT))[0];
  const along = vunit(vsub(SIDE, corner));
  const towards: V = [-along[1], along[0]];
  const reach = vdist(corner, SIDE) / 4 * 1.12;
  const radius = (reach * reach + SCALLOP * SCALLOP) / (2 * SCALLOP);
  const scallops = [0.25, 0.75].map((t) => ({ c: vadd(vadd(corner, vmul(along, vdist(corner, SIDE) * t)), vmul(towards, radius)), r: radius }));
  const base = vadd(corner, vmul(towards, SCALLOP));
  const ray: V = [Math.sin(SIDE_LEAN), -Math.cos(SIDE_LEAN)];
  const stamen = thickSeg(AT, vadd(AT, vmul(ray, SIDE_STAMEN)), paper);
  const right = carveWhere(
    [...lozenge, flank(1, 1), ...disc(AT, HEART + paper), seg(vsub(base, vmul(along, 40)), vadd(base, vmul(along, 120))), ...scallops.flatMap(({ c, r }) => disc(c, r)), ...stamen],
    (p) => {
      const [x, y] = own(p);
      const from = vsub(p, AT);

      return inLozenge(p) && x > 0 && x * cos - y * sin > paper / 2 && clear(p) &&
        (dot(vsub(p, base), towards) > 0 || scallops.some(({ c, r }) => vdist(c, p) < r)) &&
        !(Math.abs(from[0] * ray[1] - from[1] * ray[0]) < paper / 2 && dot(from, ray) < SIDE_STAMEN);
    },
  );
  const cap = carveWhere([...disc(AT, HEART), ...lozenge], (p) => vdist(AT, p) < HEART && inLozenge(p));

  return [...middle, ...right, ...right.map((loop) => reversedRun(loop.map(mirrored))), ...cap];
};

export function wariHanabishiBuild(c: Builder): void {
  c.precision(3);
  const flower = halfFlower(PAPER);

  c.guideCircle(C0, R);
  for (const turn of [0, 180]) c.fill("flower-lozenge", toPath(flower, { k: 1, turn }), "evenodd");
}
