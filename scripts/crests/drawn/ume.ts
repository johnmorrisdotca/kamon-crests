// Plum forms measured from labelled cells in the 1892 crest book, in a plane with its y axis up.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, disc, inside, mirrored, reversed, shortArc, onPage, rotated, seg, thickArc, thickSeg, toPath, touch, vdist } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

const CENTRE: V = [0, 0];
const PETAL_ANGLES = [0, 72, 144, 216, 288];
const s = Math.sin(36 * DEG);
const t = Math.cos(36 * DEG);

/** A rounded front petal sits between two ruled seams. A little paper opens above its circular heart. */
const frontPetal = (gap: number): Region[] => {
  const crown: V = [0, 57];
  const offset = (1.25 - gap) / s;
  const edge = (x: number): V => [x, offset + Math.abs(x) * t / s];
  return carveWhere([
    ...disc(crown, 43 + gap), ...disc(CENTRE, 16), seg([0, offset], edge(90)), seg([0, offset], edge(-90)),
  ], ([x, y]) => y * s - Math.abs(x) * t > 1.25 - gap && vdist(crown, [x, y]) < 43 + gap && vdist(CENTRE, [x, y]) > 16);
};

export const yaeUmeBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const placing = { k: reach / 100 };
  const front = longLast(carve(frontPetal(0), [thickSeg(CENTRE, [0, 43], 4)]));
  const clearance = frontPetal(2);
  const neighbours = [-36, 36].flatMap((degrees) => clearance.map((loop) => loop.map((piece) => rotated(piece, degrees * DEG))));
  const rear = longLast(carve([disc([0, 59], 37)], neighbours));

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  c.guideCircle(C0, 16 * placing.k);
  for (const turn of PETAL_ANGLES) c.guideCircle(onPage([0, 59], { ...placing, turn: turn + 36 }), 37 * placing.k);
  for (const turn of PETAL_ANGLES) c.guideCircle(onPage([0, 57], { ...placing, turn }), 43 * placing.k);
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(rear, { ...placing, turn: turn + 36 }));
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(front, { ...placing, turn }));
  c.fill("plum", toPath([disc(CENTRE, 13.5)], placing));
};

/** The calyx and its hooked stalk are visible between five separate petals. */
export const utenaPlumBuild = (c: Builder, reach: number): void => {
  const placing = { k: reach / 100 };
  const top = { c: [0, 74] as V, r: 26 };
  const bottom = { c: [0, 50] as V, r: 26 };
  const side = { c: [-Math.sqrt(28 ** 2 - 12 ** 2), 62] as V, r: 54 };
  const upper = touch(side, top);
  const lower = touch(side, bottom);
  const right = shortArc(side, upper, lower);
  const petal = [shortArc(top, [-upper[0], upper[1]], upper), right, shortArc(bottom, lower, [-lower[0], lower[1]]), reversed(mirrored(right))];
  const points: V[] = [[0, 37], [11, 15], [36, 10], [19, -5], [24, -25], [2, -16], [-19, -28], [-17, -6], [-37, 6], [-15, 13]];
  const calyx = points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  const stalk = thickArc([26, 0], 26, 7, 180 * DEG, 242 * DEG);
  const white = disc(CENTRE, 31);
  const trimmed = carve([petal], [white]);

  c.guideCircle(C0, reach);
  for (const turn of PETAL_ANGLES) c.fill("plum", toPath(trimmed, { ...placing, turn }));
  c.fill("plum", toPath(carve([calyx, stalk], []), placing));
};

/** The peeping bowl rises from behind the lower rim. Its cropped discs follow one strike of the inside circle. */
export const nozokiPlumBuild = (c: Builder, inner: number): void => {
  const placing = { k: inner / 100 };
  const ground = disc(CENTRE, 98);
  const heads: Region[] = [disc([-74, -68], 33), disc([0, -38], 31), disc([74, -68], 33)];
  const heart = disc([0, -108], 21);
  const rays: Region[] = [[-33, -96], [-20, -79], [-8, -75], [8, -75], [20, -79], [33, -96]].map(([x, y]) => thickSeg([x * 0.55, -102], [x, y], 4));
  const clipped = (shape: Region): Region[] => carveWhere([...shape, ...ground], (p) => vdist(CENTRE,p) < 98 && inside(shape,p));

  c.guideCircle(C0, inner * 0.98);
  for (const set of [heads, rays, [heart]]) c.fill("plum", toPath(set.flatMap(clipped), placing));
};
