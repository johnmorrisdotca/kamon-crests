// A soft three-lobed shape: three round lobes joined by wide hollow curves, from frame 45 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carveWhere, disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export const oboroSuhamaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const reach = 64;
  const lobe = 32;
  const hollow = 61;
  const polar = (distance: number, clock: number): V => [distance * Math.sin((clock * Math.PI) / 180), distance * Math.cos((clock * Math.PI) / 180)];
  const away = (reach + Math.sqrt(4 * (lobe + hollow) ** 2 - 3 * reach * reach)) / 2;
  const lobes = [0, 120, 240].map((clock) => ({ c: polar(reach, clock), r: lobe }));
  const hollows = [60, 180, 300].map((clock) => ({ c: polar(away, clock), r: hollow }));
  const from = polar(reach, 0);
  const to = polar(away, 60);
  const touch: V = [from[0] + ((to[0] - from[0]) * lobe) / (lobe + hollow), from[1] + ((to[1] - from[1]) * lobe) / (lobe + hollow)];
  const joint = Math.hypot(touch[0], touch[1]);
  const near = (p: V, circle: { c: V; r: number }): boolean => Math.hypot(p[0] - circle.c[0], p[1] - circle.c[1]) < circle.r;
  const ink = (p: V): boolean => !hollows.some((h) => near(p, h)) && (Math.hypot(...p) < joint || lobes.some((l) => near(p, l)));
  const outlines = [...lobes.flatMap((l) => disc(l.c, l.r)), ...hollows.flatMap((h) => disc(h.c, h.r)), ...disc([0, 0], joint)];
  c.fill("sandbar", toPath(carveWhere(outlines, ink), { k: 1 }));
};
