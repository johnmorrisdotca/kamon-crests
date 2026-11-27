import type { Builder } from "../../construct/builder.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import { DEG, carve, disc, mirrored, onCircle, rotated, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const sideBites = (offset: number, radius: number): Region[] => [disc([-offset, 0], radius), disc([offset, 0], radius)];

export const chukageFundoBuild = (c: Builder): void => {
  const opening = carve([disc(centre, 81)], sideBites(69, 41));
  const outline = carve([disc(centre, R)], [...sideBites(69, 28), ...opening]);

  c.guideCircle(C0, R);
  c.fill("weight", toPath(outline, { k: 1 }), "evenodd");
};

/** Overlapping circles make the scallops and are concealed where the two weight bites open. */
const scallops = (count: number, radius: number): Region[] =>
  Array.from({ length: count }, (_, i) => disc(onCircle(centre, R - radius, (2 * Math.PI * i) / count), radius));

export const maruNiHanaFundoBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  const lobes = scallops(12, 28);
  const ink = carve([disc(centre, 87), ...lobes], sideBites(64, 35));

  c.fill("weight", toPath(ink, { k: reach / R }), "evenodd");
};

export const hanaFundoBuild = (c: Builder): void => {
  const lobes = scallops(16, 26);
  const curl = [
    thickArc([-46.5, 70], 6.7, WEIGHT.hair, 51 * DEG, 317 * DEG),
    thickArc([-37, 74], 7, WEIGHT.hair, -118 * DEG, 163 * DEG),
  ];
  const top = [...curl, ...curl.map((mark) => mark.map(mirrored))];
  const curls = [...top, ...top.map((mark) => mark.map((piece) => rotated(piece, Math.PI)))];
  const ink = carve([disc(centre, 89), ...lobes], [...sideBites(69, 28), ...curls]);

  c.guideCircle(C0, R);
  c.fill("weight", toPath(ink, { k: 1 }), "evenodd");
};

export const kokumochiMitsuFundoBuild = (c: Builder): void => {
  const openings = [90, 210, 330].map((angle) => disc(onCircle(centre, 50.6, angle * DEG), 42.7));
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  c.fill("weight", toPath([disc(centre, R), ...openings], { k: 1 }), "evenodd");
};
