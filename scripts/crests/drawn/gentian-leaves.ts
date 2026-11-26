import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversed, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const GENTIAN = "gentian";
const centre: V = [0, 0];
const plain = { k: 1 };

function radial(radius: number, turn: number): V {
  return [radius * Math.sin(turn * DEG), radius * Math.cos(turn * DEG)];
}

function polygon(points: V[]): Region {
  return points.map((point, index) => seg(point, points[(index + 1) % points.length]));
}

function lens(start: V, end: V, radius: number): Region[] {
  const [x, y] = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const arc = (near: V) => shortArc(circleThrough(start, end, radius, near), start, end);
  const outside = [arc([x - dy, y + dx]), reversed(arc([x + dy, y - dx]))];
  const first: V = [start[0] + dx * 0.18, start[1] + dy * 0.18];
  const last: V = [end[0] - dx * 0.18, end[1] - dy * 0.18];
  const width = Math.hypot(dx, dy) < 45 ? WEIGHT.hair : WEIGHT.thread;
  return [outside, thickSeg(first, last, width)];
}

function seam(start: V, end: V, radius: number, near: V): Region {
  const circle = circleThrough(start, end, radius, near);
  const arc = shortArc(circle, start, end);
  if (arc.t !== "A") throw new Error("The vein must be a circular arc");
  return thickArc(circle.c, circle.r, WEIGHT.thread, arc.a0, arc.a1);
}

function bloom(): Region[] {
  const right: V[] = [[0, 35], [12, 24], [17, 15], [35, 12], [25, 3], [15, 0], [19, -13], [8, -13], [0, -8]];
  const rim = polygon([...right, ...right.slice(1, -1).reverse().map(([x, y]): V => [-x, y])]);
  const shoulders = [seam([0, 1], [24, 9], 42, [18, -36]), seam([0, 1], [14, -8], 37, [30, 23])];
  const ribs = [
    thickSeg([0, 1], [0, 24], WEIGHT.thread),
    ...shoulders,
    ...shoulders.map((cut) => cut.map(mirrored)),
  ];
  return carve([rim], ribs);
}

export function mitsubaRindoBuild(c: Builder): void {
  const leaf = lens([0, 15], [0, 96], 52);
  const blossom = bloom();
  const stalk = thickSeg([0, 11], [0, 46], WEIGHT.thin);
  c.guideCircle(C0, R);
  c.fill(GENTIAN, toPath([disc(centre, 13)], plain));
  for (let i = 0; i < 3; i += 1) {
    const turn = 120 * i;
    c.fill(GENTIAN, toPath([stalk], { k: 1, turn }));
    c.fill(GENTIAN, toPath(blossom, { k: 0.9, at: radial(60, turn), turn }), "evenodd");
    c.fill(GENTIAN, toPath(leaf, { k: 1, turn: turn + 60 }), "evenodd");
  }
}

export function itowaNiYotsuRindoBuild(c: Builder): void {
  const upright = lens([0, 14], [0, 72], 42);
  const across = lens([0, 14], [0, 84], 55);
  const flower = bloom();
  const stalk = thickSeg([0, 11], [0, 39], WEIGHT.thin);

  c.ring("ring-thread");
  c.fill(GENTIAN, toPath([disc(centre, 12.5)], plain));
  for (const turn of [0, 180]) c.fill(GENTIAN, toPath(upright, { k: 1, turn }), "evenodd");
  for (const turn of [90, 270]) c.fill(GENTIAN, toPath(across, { k: 1, turn }), "evenodd");
  for (const turn of [45, 135, 225, 315]) {
    c.fill(GENTIAN, toPath([stalk], { k: 1, turn }));
    c.fill(GENTIAN, toPath(flower, { k: 0.64, at: radial(51, turn), turn }), "evenodd");
  }
}
