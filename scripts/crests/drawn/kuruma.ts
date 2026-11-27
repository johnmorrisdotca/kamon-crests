import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, onCircle, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { RIM as TOMOE_RIM, comma } from "../tomoe.ts";

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

/** Eight square vanes stand on the cardinal and diagonal axes outside the eight fine spokes. */
export const kazagurumaBuild = (c: Builder): void => {
  c.guideCircle(C0, 96);
  c.guideSpokes(8, 0, 96);
  c.guideCircle(C0, 69);
  c.group(() => {
    for (let i = 0; i < 8; i += 1) {
      const a = i * 45;
      const middle = polar(centre, 69, a);
      const blade = polygon([a, a + 90, a + 180, a + 270].map((turn) => polar(middle, 27, turn)));

      c.fill("wheel", toPath([blade], placement));
    }
  });
  for (const reach of [43, 38, 10]) c.guideCircle(C0, reach);
  c.fill("wheel", toPath([disc(centre, 42), disc(centre, 37.5)], placement), "evenodd");
  c.group(() => {
    for (const spoke of spokes(centre, 8, 0, 12, 36, 1.3, 2)) c.fill("wheel", toPath([spoke], placement));
  });
  c.fill("wheel", toPath([disc(centre, 10)], placement));
};

export const kinoshitaGurumaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(12, 90, R);
  c.fill("wheel", toPath([disc(centre, R), disc(centre, 92)], placement), "evenodd");
  c.fill("wheel", toPath([disc(centre, 32), disc(centre, 28.6)], placement), "evenodd");
  const rays = spokes(centre, 12, 90, 31, 93, 1.8, 4.7);
  c.fill("wheel", toPath(rays, placement));
  for (const angle of [0, 120, 240]) c.fill("tomoe", toPath([comma(angle)], { k: 26.8 / TOMOE_RIM.r, turn: 25 }));
};

const flowerWheel = (hub: V, turn: number): Region[] => {
  const rim = disc(hub, 52);
  const outside = [disc(hub, 66), ...Array.from({ length: 16 }, (_, i) => disc(polar(hub, 61, turn + 11.25 + 22.5 * i), 8.8))];
  const seams = Array.from({ length: 8 }, (_, i) => {
    const angle = turn + 45 * i;
    return thickSeg(polar(hub, 51, angle), polar(hub, 72, angle), 2.1);
  });
  const petals = carveWhere([...outside.flat(), ...rim, ...seams.flat()], (p) =>
    outside.some((region) => inside(region, p)) && !inside(rim, p) && !seams.some((region) => inside(region, p)));
  return [...petals, ...ring(hub, 50.5, 45.3, 8, turn, 1.65), ...spokes(hub, 8, turn + 22.5, 8, 45.6, 1.5, 3.1), disc(hub, 9)];
};

export const hanaGurumaBuild = (c: Builder): void => {
  const front: V = [-12, -15];
  const rear: V = [12, 15];
  const face = flowerWheel(front, 97);
  const behind = flowerWheel(rear, 115);
  const mask = disc(front, 70.4);
  const visible = carveWhere([...mask, ...behind.flat()], (p) => !inside(mask, p) && behind.some((region) => inside(region, p)));

  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("wheel", toPath(visible, placement), "evenodd");
  c.fill("wheel", toPath(face, placement));
};
