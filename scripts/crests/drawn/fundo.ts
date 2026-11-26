import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { carve, carveWhere, disc, inside, onCircle, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const sideBites = (offset: number, radius: number): Region[] => [disc([-offset, 0], radius), disc([offset, 0], radius)];

export const chukageFundoBuild = (c: Builder): void => {
  const outer = disc(centre, R);
  const outerRule = disc(centre, 81);
  const innerRule = disc(centre, 78.5);
  const bites = sideBites(69, 28);
  const near = sideBites(69, 40);
  const far = sideBites(69, 42.5);
  const boundaries = [outer, outerRule, innerRule, ...bites, ...near, ...far];
  const ink = carveWhere(boundaries.flat(), (p) => {
    const inOuter = inside(outerRule, p) && !near.some((bite) => inside(bite, p));
    const inInner = inside(innerRule, p) && !far.some((bite) => inside(bite, p));

    return inside(outer, p) && !bites.some((bite) => inside(bite, p)) && (!inOuter || inInner);
  });

  c.guideCircle(C0, R);
  c.fill("weight", toPath(ink, { k: 1 }), "evenodd");
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
