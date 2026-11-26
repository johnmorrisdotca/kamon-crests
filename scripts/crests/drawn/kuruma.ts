import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, onCircle, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const centre: V = [0, 0];
const placement = { k: 1 };
const polar = (origin: V, radius: number, deg: number): V => onCircle(origin, radius, deg * DEG);
const polygon = (points: V[]): Region => points.map((p, i) => seg(p, points[(i + 1) % points.length]));

const spokes = (origin: V, count: number, turn: number, foot: number, tip: number, footHalf: number, tipHalf: number): Region[] =>
  Array.from({ length: count }, (_, i) => {
    const a = (turn + (360 * i) / count) * DEG;
    const at = (distance: number, half: number): V => [
      origin[0] + distance * Math.cos(a) - half * Math.sin(a),
      origin[1] + distance * Math.sin(a) + half * Math.cos(a),
    ];

    return polygon([at(foot, -footHalf), at(tip, -tipHalf), at(tip, tipHalf), at(foot, footHalf)]);
  });

const ring = (origin: V, outer: number, inner: number, count: number, turn: number, seam: number): Region[] => {
  const gaps = Array.from({ length: count }, (_, i) => {
    const angle = turn + (360 * i) / count;

    return thickSeg(polar(origin, inner - 2, angle), polar(origin, outer + 2, angle), seam);
  });

  return carve([disc(origin, outer)], [disc(origin, inner), ...gaps]);
};

/** Six joins in the tyre and six staggered inside it, with spokes splayed toward the felloes. */
export const mutsuWariGenjiGurumaBuild = (c: Builder): void => {
  for (const reach of [96, 79, 60, 12]) c.guideCircle(C0, reach);
  c.guideSpokes(12, 0, 96);
  c.fill("wheel", toPath(ring(centre, 96, 80, 6, 0, 2.3), placement));
  c.fill("wheel", toPath(ring(centre, 77, 60, 6, 30, 2.5), placement));
  c.group(() => {
    for (const spoke of spokes(centre, 6, 0, 15, 57, 2.25, 8)) c.fill("wheel", toPath([spoke], placement));
  });
  c.fill("wheel", toPath([disc(centre, 12)], placement));
};

/** The three hubs stand on the edge of one disc. Each wheel hides its neighbour's edges in turn. */
export const mitsuWariGenjiGurumaBuild = (c: Builder): void => {
  const edge = disc(centre, R);
  const hubs = Array.from({ length: 3 }, (_, i) => polar(centre, 95, 90 + 120 * i));
  c.guideCircle(C0, R);
  c.guideSpokes(3, 90, R);
  hubs.forEach((hub, i) => {
    const angle = 90 + 120 * i;
    const beside = disc(hubs[(i + 1) % 3], 98);
    const wheel = [
      ...ring(hub, 96.5, 66, 8, angle, 2.15),
      ...ring(hub, 63, 47.5, 8, angle + 22.5, 2.4),
      ...spokes(hub, 8, angle + 22.5, 9.5, 46, 1.75, 7),
      disc(hub, 7.4),
    ];
    const ink = carveWhere([edge, beside, ...wheel].flat(), (p) =>
      inside(edge, p) && !inside(beside, p) && wheel.some((shape) => inside(shape, p)),
    );

    c.fill("wheel", toPath(ink, placement), "evenodd");
  });
};
