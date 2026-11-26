import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleCircle, circleThrough, disc, lineCircle, mirrored, moved, nearest, reversed, reversedRun, rotated, seg, shortArc, thickSeg, toPath, touch, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
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

function fiveLobes(reach: number, notchReach: number, radius: number): Region {
  const tip: V = [0, reach];
  const notch = polar(notchReach, 54);
  const edge = shortArc(circleThrough(tip, notch, radius, [-radius, 0]), tip, notch);
  const lobe = [mirrored(reversed(edge)), edge];

  return Array.from({ length: 5 }, (_, i) => lobe.map((piece) => rotated(piece, -72 * i * DEG))).flat();
}

export function chukageUraKikyoBuild(c: Builder): void {
  const outline = fiveLobes(96, 71, 74);
  const opening = fiveLobes(77, 54, 61);
  const back = fiveLobes(34, 21, 40).map((edge) => moved(edge, [0, 8]));
  const upperLeft: V = [-10, 8];
  const upperRight: V = [12, 9];
  const lowerRight: V = [21, -32];
  const lowerLeft: V = [6, -34];
  const right = circleThrough(upperRight, lowerRight, 42, [46, 0]);
  const left = circleThrough(lowerLeft, upperLeft, 55, [-30, -16]);
  const stem = [seg(upperLeft, upperRight), shortArc(right, upperRight, lowerRight), seg(lowerRight, lowerLeft), shortArc(left, lowerLeft, upperLeft)];
  c.fill(BELLFLOWER, toPath([outline, opening], { k: 1 }), "evenodd");
  c.fill(BELLFLOWER, toPath(carve([back, stem], []), { k: 1 }));
}

function petalWithVein(from: V, to: V, radius: number): Region[] {
  const along = vunit(vsub(to, from));
  const normal: V = [-along[1], along[0]];
  const first = circleThrough(from, to, radius, vadd(from, normal));
  const second = circleThrough(from, to, radius, vsub(from, normal));
  const outline = [shortArc(first, from, to), shortArc(second, to, from)];
  const vein = thickSeg(vadd(from, vmul(along, 2)), vsub(to, vmul(along, 5)), WEIGHT.thread);

  return carve([outline], [vein]);
}

export function mitsuKumiawaseKikyoBuild(c: Builder): void {
  const centre: V = [0, 36];
  const neighbour = polar(36, 210);
  const along = vunit(vsub(neighbour, centre));
  const joiningPetal = petalWithVein(vadd(centre, vmul(along, 9)), vsub(neighbour, vmul(along, 9)), 35);
  const outerPetals = [18, 90, 162].flatMap((angle) => petalWithVein(vadd(centre, polar(9, angle)), vadd(centre, polar(59, angle)), 43));
  const flower = [disc(centre, 8), ...outerPetals, ...joiningPetal];
  for (let i = 0; i < 3; i += 1) c.fill(BELLFLOWER, toPath(flower, { k: 1, turn: 120 * i }), "evenodd");
}
