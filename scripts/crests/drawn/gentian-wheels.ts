import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversed, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const GENTIAN = "gentian";
const centre: V = [0, 0];
const original = { k: 1 };

function polygon(points: V[]): Region {
  return points.map((point, index) => seg(point, points[(index + 1) % points.length]));
}

function arcBand(a: V, b: V, radius: number, near: V): Region {
  const circle = circleThrough(a, b, radius, near);
  const arc = shortArc(circle, a, b);
  if (arc.t !== "A") throw new Error("The curved seam must follow a compass circle");

  return thickArc(circle.c, circle.r, WEIGHT.thread, arc.a0, arc.a1);
}

function opposite(seams: Region[]): Region[] {
  return [...seams, ...seams.map((seam) => seam.map(mirrored))];
}

function wheel(c: Builder, rim: number, field: number, seams: Region[]): void {
  const hub = 11.8;
  const hubGap = 2.4;
  const cuts = Array.from({ length: 8 }, (_, i) => seams.map((seam) => seam.map((edge) => rotated(edge, i * 45 * DEG)))).flat();
  const face = carve([disc(centre, field)], [disc(centre, hub + hubGap), ...cuts]);

  c.guideCircle(C0, R);
  c.guideSpokes(8, 0, R);
  c.fill(GENTIAN, toPath([disc(centre, rim), disc(centre, field + WEIGHT.thread)], original), "evenodd");
  c.fill(GENTIAN, toPath(face, original), "evenodd");
  c.fill(GENTIAN, toPath([disc(centre, hub)], original));
}

export function asagaoRindoBuild(c: Builder): void {
  const r = 78;
  const field = 64.2;
  const crown = polygon([[0, 96], [13, 86], [7, r + 1], [-7, r + 1], [-13, 86]]);
  const diamond: V[] = [[0, 65], [11.5, 47], [0, 39], [-11.5, 47]];
  const facets = diamond.map((point, i) => thickSeg(point, diamond[(i + 1) % diamond.length], WEIGHT.thread));
  const cuts = opposite([
    thickSeg([-3, 13], [-6.8, 43], WEIGHT.thread),
    thickSeg([-11.6, 47], [-21.8, 60], WEIGHT.thread),
    thickSeg([-10.9, 46.8], [0, 48.5], WEIGHT.thread),
  ]);

  wheel(c, r, field, [...facets, ...cuts]);
  for (let i = 0; i < 8; i += 1) c.fill(GENTIAN, toPath([crown], { k: 1, turn: i * 45 }));
}

function flowerFace(): Region[] {
  const right: V[] = [[0, 37], [11, 25], [17, 16], [37, 14], [27, 6], [18, 0], [20, -13], [9, -13], [0, -9]];
  const rim = polygon([...right, ...right.slice(1, -1).reverse().map(([x, y]): V => [-x, y])]);
  const rays = [
    thickSeg([0, 1], [0, 24], WEIGHT.thread),
    ...opposite([
      arcBand([2, 1], [26, 8], 45, [15, -39]),
      arcBand([2, 1], [15, -8], 32, [29, 22]),
    ]),
  ];
  return carve([rim], rays);
}

function lens(foot: number, tip: number, radius: number, near: number): Region {
  const a: V = [0, foot];
  const b: V = [0, tip];
  const side = shortArc(circleThrough(a, b, radius, [-near, (foot + tip) / 2]), a, b);
  return [side, reversed(mirrored(side))];
}

export function rindoBishiBuild(c: Builder): void {
  const outside = polygon([[0, 77], [96, 0], [0, -77], [-96, 0]]);
  const opening = polygon([[0, 67], [85, 0], [0, -67], [-85, 0]]);
  const blade = lens(2, 73, 79, 70);
  const split = thickSeg([0, 9], [0, 69], WEIGHT.thread);
  const bladeInk = carve([blade], [split]);
  const stem = thickSeg([-38, 3], [-1, 61], WEIGHT.thin);
  const stemInk = carve([stem], [split]);
  const face = flowerFace();

  c.guideCircle(C0, R);
  c.fill(GENTIAN, toPath([outside, opening], original), "evenodd");
  c.fill(GENTIAN, toPath(bladeInk, original), "evenodd");
  c.fill(GENTIAN, toPath(bladeInk, { k: 1, turn: 180 }), "evenodd");
  c.fill(GENTIAN, toPath(stemInk, original));
  c.fill(GENTIAN, toPath(stemInk, { k: 1, turn: 180 }));
  c.fill(GENTIAN, toPath(face, { k: 0.65, at: [-35, 0], turn: 225 }), "evenodd");
  c.fill(GENTIAN, toPath(face, { k: 0.65, at: [35, 0], turn: 45 }), "evenodd");
}

export function maruNiFutatsuRindoBuild(c: Builder): void {
  const leaves = carve([lens(15, 73, 64, 57)], [thickSeg([0, 18], [0, 70], WEIGHT.thread)]);
  const stalk = polygon([[-6, 12], [-8, 21], [8, 21], [6, 12]]);
  const face = flowerFace();

  c.ring("ring-medium");
  c.fill(GENTIAN, toPath([disc(centre, 10.8)], original));
  c.fill(GENTIAN, toPath(leaves, { k: 1, turn: 90 }), "evenodd");
  c.fill(GENTIAN, toPath(leaves, { k: 1, turn: 270 }), "evenodd");
  c.fill(GENTIAN, toPath([stalk], original));
  c.fill(GENTIAN, toPath([stalk], { k: 1, turn: 180 }));
  c.fill(GENTIAN, toPath(face, { k: 0.96, at: [0, 30] }), "evenodd");
  c.fill(GENTIAN, toPath(face, { k: 0.96, at: [0, -30], turn: 180 }), "evenodd");
}
