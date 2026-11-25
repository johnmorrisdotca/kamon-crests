// The arabesque flower in the 1892 book. Local coordinates rise from the centre and its layout radius is 100.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, seg, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

const MIDDLE = 12;
const HEART = disc([0, 0], MIDDLE + 2.5);
const EDGE_X = 100 * Math.sin(36 * DEG);
const EDGE_Y = 100 * Math.cos(36 * DEG);

const petalRegion = (): Region[] => {
  const lobes = [[0, 0, 81], [0, 77, 23], [-31, 68, 21], [31, 68, 21]] as const;
  const stamen = thickSeg([0, 0], [0, 43], 3.2);
  const edges: V[] = [[-EDGE_X, EDGE_Y], [EDGE_X, EDGE_Y]];
  const shifted = (edge: V): V => [Math.sign(edge[0]) * -1.25 / Math.cos(36 * DEG), 0];
  const petalSides = edges.map((edge) => {
    const start = shifted(edge);
    return seg(start, [start[0] + edge[0], edge[1]]);
  });
  return carveWhere(
    [...lobes.flatMap(([x, y, r]) => disc([x, y], r)), ...petalSides, ...HEART, ...stamen],
    ([x, y]) => y * Math.sin(36 * DEG) - Math.abs(x) * Math.cos(36 * DEG) > 1.25 &&
      vdist([0, 0], [x, y]) > MIDDLE + 2.5 &&
      lobes.some(([cx, cy, r]) => vdist([cx, cy], [x, y]) < r) &&
      !(Math.abs(x) < 1.6 && y < 43),
  );
};

export const karahanaBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const petal = petalRegion();

  c.guideCircle(C0, reach);
  c.guideSpokes(10, 0, reach);
  for (let i = 0; i < 5; i += 1) c.fill("karahana", toPath(petal, { ...placing, turn: 72 * i }));
  c.fill("karahana", toPath([disc([0, 0], MIDDLE)], placing));
};
