import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, mirrored, reversedRun, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, side: V) => shortArc(circleThrough(from, to, radius, side), from, to);
const side: Region = [
  curve([0, 96], [15, 79], 59, [40, 99]),
  curve([15, 79], [22, 67], 19, [5, 64]),
  curve([22, 67], [43, 46], 21, [25, 49]),
  seg([43, 46], [0, 3]),
];
const petal: Region = [...side, ...reversedRun(side.map(mirrored))];

const eye: Region = [
  curve([0, 23], [3.5, 39], 37, [-30, 46]),
  curve([3.5, 39], [0, 44], 5, [0, 39]),
  curve([0, 44], [-3.5, 39], 5, [0, 39]),
  curve([-3.5, 39], [0, 23], 37, [30, 46]),
];

export function yotsumeHanabishiBuild(c: Builder): void {
  c.precision(3);
  const quarter = carve([petal], [eye]);
  for (const turn of [0, 90, 180, 270]) c.fill("flower-lozenge", toPath(quarter, { k: 1, turn }), "evenodd");
}
