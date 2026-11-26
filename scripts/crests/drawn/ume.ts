// Plum forms measured from labelled cells in the 1892 crest book, in a plane with its y axis up.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, disc, onPage, rotated, seg, thickSeg, toPath, vdist } from "../../construct/compass.ts";
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
