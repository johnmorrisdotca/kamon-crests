// Three star arrangements from frame 10 of the 1892 crest book.
import { RING_GAP, WEIGHT, type Builder } from "../../construct/builder.ts";
import { DEG, angleOf, carve, circleThrough, disc, onCircle, rotated, thickArc, toPath, type V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { discsBuild } from "./families.ts";

export const mitsuBoshiKuzushiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);

  const centre: V = [0, 0];
  const edge = onCircle(centre, R + 2, 30 * DEG);
  const seam = circleThrough(centre, edge, 104, [80, -80]);
  const gap = thickArc(seam.c, seam.r, WEIGHT.thread, angleOf(seam.c, centre), angleOf(seam.c, edge));
  const gaps = [0, 120, 240].map((turn) => gap.map((piece) => rotated(piece, turn * DEG)));
  c.fill("star", toPath(carve([disc(centre, R)], [...gaps, disc(centre, WEIGHT.hair)]), { k: 1 }));
};

export const chuwaNiItsutsuBoshiBuild = (c: Builder): void => {
  const reach = c.ring("ring-medium") - RING_GAP;
  discsBuild(c, "star", reach, { n: 4, ring: 67.6, r: 32.4, centre: 32.4 });
};

export const inyoNanatsuBoshiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const centre: V = [0, 0];
  const radius = (R - WEIGHT.thread / 2) / 2;
  const ring = (at: V) => [
    disc(at, radius + WEIGHT.thread / 2),
    disc(at, radius - WEIGHT.thread / 2),
  ];

  c.stepRound(radius);
  c.fill("star", toPath(ring(centre), { k: 1 }), "evenodd");
  for (const angle of [90, 30, -30, -90, -150, -210]) {
    c.fill("star", toPath(ring(onCircle(centre, radius, angle * DEG)), { k: 1 }), "evenodd");
  }
};
