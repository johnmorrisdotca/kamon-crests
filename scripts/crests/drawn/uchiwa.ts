import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carveWhere, DEG, disc, inside, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** The handle is ruled between two parallel sides and cut square at the butt. */
const handle = (width: number, butt: number, top: number): Region => [
  seg([-width, butt], [width, butt]),
  seg([width, butt], [width, top]),
  seg([width, top], [-width, top]),
  seg([-width, top], [-width, butt]),
];

export const mitsuUchiwaBuild = (c: Builder): void => {
  const centre: V = [0, 53];
  const pivot: V = [0, 3];
  const paper = disc(centre, 42);
  const margin = disc(centre, 40);
  const bound = disc(pivot, 41);
  const binding = disc(pivot, 39.4);
  const directions = Array.from({ length: 11 }, (_, i) => (i - 5) * 9);
  const ray = (angle: number): V => [pivot[0] + 44 * Math.sin(angle * DEG), pivot[1] + 44 * Math.cos(angle * DEG)];
  const ribs = directions.flatMap((angle) => [seg(pivot, ray(angle - 1.15)), seg(pivot, ray(angle + 1.15))]);
  const white = (point: V): boolean => {
    if (!inside(margin, point) || !inside(bound, point)) return false;
    const angle = Math.atan2(point[0] - pivot[0], point[1] - pivot[1]) / DEG;

    return !inside(binding, point) || directions.some((rib) => Math.abs(angle - rib) < 1.15);
  };

  const stem = handle(5, -93, 24);
  const underNext = handle(5 + WEIGHT.hair, -93 - WEIGHT.hair, 24).map((edge) => rotated(edge, -120 * DEG));
  const regions = carveWhere(
    [...paper, ...margin, ...bound, ...binding, ...ribs, ...stem, ...underNext],
    (point) => ((inside(paper, point) && !white(point)) || inside(stem, point)) && !inside(underNext, point),
  );
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) c.fill("round-fan", toPath(regions, { k: 1, turn }));
};
