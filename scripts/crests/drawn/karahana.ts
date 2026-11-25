// The arabesque flower in the 1892 book. Local coordinates rise from the centre and its layout radius is 100.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleCircle, circleThrough, disc, mirrored, nearest, reversed, rotated, seg, shortArc, thickSeg, toPath, vdist } from "../../construct/compass.ts";
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

/** Three round lobes, with two arcs running from the shoulders to the heart. */
const scallopedPetal = (
  tip: V, tipRadius: number, shoulder: V, shoulderRadius: number, flankRadius: number, gap = 0,
): Region => {
  const middle = tipRadius + gap;
  const side = shoulderRadius + gap;
  const topCentre: V = [0, tip[1] - tipRadius];
  const tipJoin = nearest(circleCircle(topCentre, middle, shoulder, side), [shoulder[0] / 2, tip[1]]);
  const flankJoin: V = [shoulder[0] + side * 0.8, shoulder[1] - side * 0.6];
  const foot: V = [3 + gap, 4];
  const flank = circleThrough(foot, flankJoin, flankRadius, [flankRadius, 8]);
  const peak: V = [0, tip[1] + gap];
  const right = [shortArc(flank, foot, flankJoin), shortArc({ c: shoulder, r: side }, flankJoin, tipJoin), shortArc({ c: topCentre, r: middle }, tipJoin, peak)];

  return [...right, ...right.map(mirrored).map(reversed).reverse(), seg([-foot[0], foot[1]], foot)];
};

const turnBy = (region: Region, degrees: number): Region => region.map((piece) => rotated(piece, degrees * DEG));
const ruledBlade = (coordinates: V[]): Region => coordinates.map((point, i) => seg(point, coordinates[(i + 1) % coordinates.length]));

/** In the sword flower lozenge the side petals are longer than the upright petals. */
export const kenHanabishiBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const heart = disc([0, 0], 13.5);
  const upright = (gap: number): Region => scallopedPetal([0, 80], 17, [19, 57], 17, 126, gap);
  const sideways = (gap: number): Region => scallopedPetal([0, 100], 15, [14, 69], 18, 142, gap);
  const up = carve([upright(0)], [heart, thickSeg([0, 0], [0, 40], 4.5)]);
  const side = carve([sideways(0)], [heart, thickSeg([0, 0], [0, 45], 4.5)]);
  const blade = ruledBlade([[2, 2], [66, 31], [60, 53], [40, 62]]);
  const clear = carve([blade], [upright(2), turnBy(sideways(2), -90), heart]);
  const opposite = clear.map((loop) => turnBy(loop, 180));
  const mirror = (loop: Region): Region => loop.map(mirrored).map(reversed).reverse();

  c.guideCircle(C0, reach);
  c.guideSpokes(4, 0, reach);
  for (const angle of [0, 180]) {
    c.fill("flower-lozenge", toPath(up, { ...placing, turn: angle }));
    c.fill("flower-lozenge", toPath(side, { ...placing, turn: angle + 90 }));
  }
  c.fill("flower-lozenge", toPath(carve([disc([0, 0], 11)], [disc([0, 0], 1.5)]), placing));
  for (const blade of [clear, clear.map(mirror), opposite, opposite.map(mirror)]) c.fill("sword", toPath(blade, placing));
};
