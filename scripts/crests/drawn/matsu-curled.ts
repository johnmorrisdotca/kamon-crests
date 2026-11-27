import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, mirrored, reversedRun, shortArc, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";

const pine = "pine";
const arc = (a: V, b: V, r: number, c: V) =>
  shortArc(circleThrough(a, b, r, c), a, b);

const footHalf: Region = [
  arc([0, 11], [6.8, 4], 9.5, [0, 3]),
  arc([6.8, 4], [15, -1], 20, [23, 14]),
  arc([15, -1], [4.5, -0.1], 13, [8, 11]),
  arc([4.5, -0.1], [0, -9], 19, [17, -13]),
];
const foot = [...footHalf, ...reversedRun(footHalf.map(mirrored))];
const point = (turn: number, radius: number): V => [radius * Math.sin(turn * DEG), radius * Math.cos(turn * DEG)];

export function mitsuMatsubaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(3, 0, R);
  const outer: Region = [
    arc([8, 92], [-93, -13], 94, [1, -2]),
    arc([-93, -13], [8, 92], 125, [29, -40]),
  ];
  const inner: Region = [
    arc([8, 87], [-8, -39], 74, [58, 14]),
    arc([-8, -39], [8, 87], 82, [67, 16]),
  ];
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill(pine, toPath([outer, inner], { k: 1, turn }));
      c.fill(pine, toPath([foot], { k: 0.98, at: point(turn + 4, 87), turn: turn + 74 }));
    });
  }
}
