import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, DEG, disc, inside, mirrored, rotated, seg, shortArc, thickArc, toPath } from "../../construct/compass.ts";
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

const bow = (from: V, to: V, radius: number, centreSide: V): Region[number] =>
  shortArc(circleThrough(from, to, radius, centreSide), from, to);

/** One scroll-edged half of the fan, seam at the left. */
interface FanProfile {
  width: number;
  crown: number;
  foot: number;
  ribs: number;
  ribSpacing: number;
}

const chineseFanHalf = (profile: FanProfile): Region[] => {
  const { width, ribs: ribCount, ribSpacing } = profile;
  const at = (x: number, y: number): V => [x * width, y];
  const crown = at(37, profile.crown);
  const shoulder = at(70, 40);
  const waist = at(55, -10);
  const heel = at(60, -53);
  const toe = at(33, profile.foot);
  const seamTop: V = [9, 49];
  const seamBottom: V = [9, -69];
  const face: Region = [
    bow(seamTop, crown, 35, at(16, 30)),
    bow(crown, shoulder, 29, at(40, 37)),
    bow(shoulder, waist, 85, at(-15, 25)),
    bow(waist, heel, 85, at(134, -29)),
    bow(heel, toe, 28, at(33, -54)),
    bow(toe, seamBottom, 24, at(33, -59)),
    seg(seamBottom, seamTop),
  ];
  const upperCurl = thickArc(at(23, 46), Math.round(12 * width), WEIGHT.thread, 29 * DEG, -243 * DEG);
  const lowerCurl = thickArc(at(22, -57), Math.round(8 * width), WEIGHT.thread, 190 * DEG, -75 * DEG);
  const ribs = Array.from({ length: ribCount }, (_, i) =>
    thickArc(at(56, -41 - i * ribSpacing), 72, WEIGHT.hair, Math.acos((-47 * width) / 72), 94 * DEG)
  );

  return carve([face], [upperCurl, lowerCurl, ...ribs]);
};

export const hitotsuKaraUchiwaBuild = (c: Builder): void => {
  const right = chineseFanHalf({ width: 1, crown: 66, foot: -83, ribs: 9, ribSpacing: 9 });
  const left = right.map((region) => region.map(mirrored));
  const vertex: V = [0, 91];
  const rightPoint: V = [23, 80];
  const leftPoint: V = [-23, 80];
  const stem: Region = [
    seg([-6, -93], [6, -93]),
    seg([6, -93], [6, 57]),
    bow([6, 57], rightPoint, 24, [30, 61]),
    bow(rightPoint, vertex, 26, [15, 103]),
    bow(vertex, leftPoint, 26, [-15, 103]),
    bow(leftPoint, [-6, 57], 24, [-30, 61]),
    seg([-6, 57], [-6, -93]),
  ];
  c.guideCircle(C0, R);
  c.fill("kara-uchiwa", toPath([stem, ...right, ...left], { k: 1 }), "evenodd");
};

export const hosowaNiNihonUchiwaBuild = (c: Builder): void => {
  c.ring("ring-thin");
  const right = chineseFanHalf({ width: 0.72, crown: 73, foot: -86, ribs: 4, ribSpacing: 22 });
  const left = right.map((region) => region.map(mirrored));
  const stem: Region = [seg([-6, -92], [6, -92]), seg([6, -92], [6, 92]), seg([6, 92], [-6, 92]), seg([-6, 92], [-6, -92])];
  for (const x of [-41, 41]) c.fill("kara-uchiwa", toPath([stem, ...right, ...left], { k: 0.68, at: [x, 0] }), "evenodd");
};
