import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleCircle, disc, lineCircle, mirrored, nearest, reversedRun, rotated, seg, shortArc, thickSeg, toPath, touch } from "../../construct/compass.ts";
import type { Circle, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const CENTRE: V = [0, 0];
const BELLFLOWER = "bellflower";
const polar = (radius: number, degrees: number): V => [radius * Math.cos(degrees * DEG), radius * Math.sin(degrees * DEG)];

export function kokumochiKikyoBuild(c: Builder): void {
  const tip: V = [0, 94];
  const shoulder: Circle = { c: [10, 53], r: 24 };
  const flankRadius = 88;
  const flank: Circle = {
    c: nearest(circleCircle(shoulder.c, flankRadius - shoulder.r, tip, flankRadius), [-54, 41]),
    r: flankRadius,
  };
  const bisector = polar(R, 54);
  const notch = nearest(lineCircle(CENTRE, bisector, shoulder.c, shoulder.r), polar(44, 54));
  const shoulderJoin = touch(flank, shoulder);
  const right = [seg(CENTRE, notch), shortArc(shoulder, notch, shoulderJoin), shortArc(flank, shoulderJoin, tip)];
  const petal = [...right, ...reversedRun(right.map(mirrored))];

  const heart = 13;
  const ray: V = [0, 44];
  const halfRay = WEIGHT.thin / 2;
  const blackCuts = [
    disc(CENTRE, heart + 2),
    thickSeg(CENTRE, ray, WEIGHT.thin),
    disc(ray, halfRay),
    ...[54, 126].map((angle) => thickSeg(CENTRE, polar(67, angle), 2 * WEIGHT.thread)),
  ];
  const openings = carve([petal], blackCuts);
  const holes = Array.from({ length: 5 }, (_, i) => openings.map((opening) => opening.map((edge) => rotated(edge, 72 * i * DEG)))).flat();

  c.guideCircle(C0, R);
  c.guideCircle(C0, R - 1);
  c.guideCircle(C0, tip[1]);
  c.guideSpokes(10, 0, R);
  c.fill("black-disc", toPath([disc(CENTRE, R), disc(CENTRE, R - 1)], { k: 1 }), "evenodd");
  c.fill(BELLFLOWER, toPath([disc(CENTRE, R - 1), ...holes, disc(CENTRE, heart)], { k: 1 }), "evenodd");
}
