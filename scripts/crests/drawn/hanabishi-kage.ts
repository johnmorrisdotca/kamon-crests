import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, disc, inside, mirrored, reversedRun, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";

const part = "flower-lozenge";
const quarters = [0, 90, 180, 270];

/** Carry the measured upper-right quadrant to the other three places without stretching its arcs. */
const whole = (quarter: Region): Region => {
  const right = [...quarter, ...reversedRun(quarter.map((piece) => rotated(mirrored(piece), Math.PI)))];
  return [...right, ...reversedRun(right.map(mirrored))];
};

const rear = whole(outline([
  "0,83 32,65 22,78",
  "32,65 53,59 45,65",
  "53,59 53,43 56,51",
  "53,43 79,34 70,42",
  "79,34 79,21 81,27",
  "79,21 96,0 91,15",
]));

const front = whole(outline([
  "0,59 19,41 15,54",
  "19,41 34,36 28,42",
  "34,36 31,27 34,31",
  "31,27 58,21 47,26",
  "58,21 61,12 62,17",
  "61,12 72,0 69,7",
]));

const scaled = (loop: Region, k: number): Region => loop.map((piece) => {
  const point = ([x, y]: V): V => [k * x, k * y];
  return piece.t === "L" ? seg(point(piece.a), point(piece.b)) : { ...piece, c: point(piece.c), r: piece.r * k };
});

export const chuKageHanabishiKuzushiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  const base = carve([rear], [scaled(rear, .952)]);
  const corner = thickSeg([25, 23], [58, 49], 3.1);
  const opposite = [corner, corner.map(mirrored)];
  const seams = [...opposite, ...opposite.map((loop) => loop.map((piece) => rotated(piece, Math.PI)))];
  const backingDetails = carveWhere([...rear, ...front, ...seams.flat()], (p) => inside(rear, p) && !inside(front, p) && seams.some((one) => inside(one, p)));
  c.fill(part, toPath([...base, ...backingDetails], { k: 1 }), "evenodd");
  c.fill(part, toPath([front, scaled(front, .934)], { k: 1 }), "evenodd");

  const stamen = outline(["0,12 0,31 4.8,24", "0,31 0,12 -4.8,24"]);
  const opening = outline(["0,16 0,28 2.3,23.5", "0,28 0,16 -2.3,23.5"]);
  for (const turn of quarters) c.fill(part, toPath([stamen, opening], { k: 1, turn }), "evenodd");
  c.fill(part, toPath([disc([0, 0], 10.6), disc([0, 0], 8)], { k: 1 }), "evenodd");
};
