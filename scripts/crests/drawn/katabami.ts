import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, reversed, rotated, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const PART = "wood-sorrel";
const CENTRE: V = [0, 0];
const TURNS = [0, 120, 240];

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const turnRegions = (regions: Region[], turn: number): Region[] =>
  regions.map((region) => region.map((piece) => rotated(piece, -turn * DEG)));
const bow = (from: V, to: V, radius: number, side: V) => shortArc(circleThrough(from, to, radius, side), from, to);

const heartLeaf = (height: number, lobe: number, radius: number): Region[] => {
  const left = disc([-lobe, height], radius);
  const right = disc([lobe, height], radius);
  const taper = polygon([[0, 8], [-25, height - 8], [0, height + 8], [25, height - 8]]);
  return carve([left, right, taper], []);
};

const arrow = polygon([[-1.6, 9.9], [-1.6, 31], [-6.6, 38], [0, 46.4], [6.6, 38], [1.6, 31], [1.6, 9.9]]);

/** The ring holds three broad heart leaves with pointed white stamens. */
export const sakaiKatabamiBuild = (c: Builder, inner: number): void => {
  c.precision(3);
  const k = (inner - 3.1) / 96;
  const lobes = heartLeaf(59.7, 23.5, 31.6);
  const leaf = carve(lobes, [arrow, disc(CENTRE, 16.1)]);
  c.guideSpokes(6, 0, inner);
  for (const turn of TURNS) c.fill(PART, toPath(leaf, { k, turn }));
  c.fill(PART, toPath([disc(CENTRE, 13.1)], { k }));
};
