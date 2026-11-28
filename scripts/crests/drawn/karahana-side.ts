// The arabesque flower seen from the side in the 1892 book. Coordinates count from the foot of the upright petal's axis, in a reach of about 92.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, bowedArc, carve, carveWhere, disc, mirrored, moved, reversedRun, rotated, seg, vdist } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const FLOWER = "karahana";
const within = ({ c, r }: Circle, p: V): boolean => vdist(c, p) < r;
const lens = (a: V, b: V, bow: number): Region => [bowedArc(a, b, bow), bowedArc(b, a, bow)];

// The upright petal: ruled flanks meet a round body, and three lobes crown it.
const BODY: Circle = { c: [0, 22], r: 37.5 };
const CROWN: readonly Circle[] = [{ c: [0, 62], r: 16 }, { c: [-19, 50], r: 12.5 }, { c: [19, 50], r: 12.5 }];
const FLANK_FOOT: V = [12, -14];
const FLANK_HEAD: V = [37, 28];

const uprightPetal = (): Region[] => {
  const [fx, fy] = FLANK_FOOT;
  const [dx, dy] = [FLANK_HEAD[0] - fx, FLANK_HEAD[1] - fy];
  const flank = (side: 1 | -1): Region[number] => seg([side * fx, fy], [side * (fx + dx * 1.3), fy + dy * 1.3]);
  const outline = carveWhere(
    [...disc(BODY.c, BODY.r), ...CROWN.flatMap(({ c, r }) => disc(c, r)), flank(1), flank(-1), seg([-60, fy], [60, fy])],
    ([x, y]) => y > fy && ((within(BODY, [x, y]) && (Math.abs(x) - fx) * dy - (y - fy) * dx < 0) || CROWN.some((lobe) => within(lobe, [x, y]))),
  );

  return carve(outline, [lens([0, 14], [0, 36], 2.6)]);
};

// A side petal in its own frame: the root at the origin and the tip along x. A ruled flank from the root touches the upper lobe, one long arc
// from the root makes the belly and touches the end lobe at its lowest point, and the end lobe closes the petal.
const SIDE_ROOT: V = [17, -11];
const SIDE_LEAN = 38 * DEG;
const END: Circle = { c: [68, -3], r: 15 };
const UPPER: Circle = { c: [47, 6], r: 16 };
const BELLY_FOOT: V = [END.c[0], END.c[1] - END.r];
// The belly's circle passes through the root and touches the end lobe from outside it, so its centre stands above the lobe's.
const BELLY_RISE = (BELLY_FOOT[0] ** 2 + BELLY_FOOT[1] ** 2) / (-2 * BELLY_FOOT[1]);
const BELLY: Circle = { c: [BELLY_FOOT[0], BELLY_FOOT[1] + BELLY_RISE], r: BELLY_RISE };

const tangentFrom = ({ c, r }: Circle, side: 1 | -1): V => {
  const d = Math.hypot(c[0], c[1]);
  const a = Math.atan2(c[1], c[0]) + side * Math.asin(r / d);
  const reach = Math.sqrt(d * d - r * r);

  return [reach * Math.cos(a), reach * Math.sin(a)];
};

const sidePetal = (): Region[] => {
  const up = tangentFrom(UPPER, 1);
  const cross = (a: V, b: V, p: V): number => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const body = (p: V): boolean => within(BELLY, p) && cross([0, 0], up, p) < 0 && cross(up, BELLY_FOOT, p) < 0;
  const outline = carveWhere(
    [...[END, UPPER, BELLY].flatMap(({ c, r }) => disc(c, r)), seg([0, 0], up), seg(up, BELLY_FOOT)],
    (p) => body(p) || within(END, p) || within(UPPER, p),
  );

  return carve(outline, [lens([9, -1], [38, -2], 2.2)]).map((loop) => loop.map((piece) => moved(rotated(piece, SIDE_LEAN), SIDE_ROOT)));
};

// The calyx and the bent stalk: one pointed sepal stands before the upright petal, and the stalk narrows, turns to the right and ends in a slanted cut.
const stem = (): Region => {
  const left: V = [-28, -12];
  const right: V = [31, -11];
  const waist: V = [19, -35];
  const toe: V = [46, -63];
  const heel: V = [25, -70];
  const knee: V = [-1, -38];

  return [seg(left, [-9, -9]), seg([-9, -9], [0, 11]), seg([0, 11], [9, -9]), seg([9, -9], right), bowedArc(right, waist, -3), seg(waist, toe), seg(toe, heel), seg(heel, knee), bowedArc(knee, left, 2)];
};

export function yokomiKarahanaBuild(c: Builder): void {
  c.precision(3);
  const k = R / 92;
  const at: V = [-4 * k, 0];
  const keyline = PAPER;
  const right = sidePetal();
  const left = right.map((loop) => reversedRun(loop.map(mirrored)));

  c.guideCircle(C0, R);
  layerParts(c, () => {
    fillPart(c, FLOWER, left, { k, at });
    fillPart(c, FLOWER, uprightPetal(), { k, at }, keyline);
    fillPart(c, FLOWER, right, { k, at }, keyline);
    fillPart(c, FLOWER, [stem()], { k, at }, keyline);
  });
}
