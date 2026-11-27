import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, mirrored, reversedRun, rotated, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";

const motif = "pine";
const arc = (a: V, b: V, radius: number, centre: V) =>
  shortArc(circleThrough(a, b, radius, centre), a, b);
const headHalf: Region = [
  arc([0, 12.5], [7.2, 6], 8.2, [0, 4]),
  arc([7.2, 6], [17, -1], 27, [30, 27]),
  arc([17, -1], [5.1, -0.5], 12, [12, 10.5]),
  arc([5.1, -0.5], [0, -10], 25, [26, -19]),
];

const head = [...headHalf, ...reversedRun(headHalf.map(mirrored))];
const on = (angle: number, reach: number): V => [reach * Math.sin(angle * DEG), reach * Math.cos(angle * DEG)];
function inwardSides(points: V[], radius: number): Region {
  return points.map((a, i) => {
    const b = points[(i + 1) % points.length];
    const middle: V = [(a[0] + b[0]) * 2.6, (a[1] + b[1]) * 2.6];

    return arc(a, b, radius, middle);
  });
}

export function rokkakuMatsubaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const turns = [0, 60, 120, 180, 240, 300];
  const rim = inwardSides(turns.map((t) => on(t, 88)), 65);
  const inside = inwardSides(turns.map((t) => on(t, 81)), 56);
  c.fill(motif, toPath([rim, inside], { k: 1 }), "evenodd");
  for (const t of [0, 120, 240]) {
    c.fill(motif, toPath([head], { k: 0.82, at: on(t, 86), turn: t }));
  }
}

export function tsunagiMatsubaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const turns = [0, 60, 120, 180, 240, 300];
  const rim = inwardSides(turns.map((t) => on(t, 71)), 50);
  const inside = inwardSides(turns.map((t) => on(t, 64)), 43);
  c.fill(motif, toPath([rim, inside], { k: 1 }), "evenodd");
  const oval: Region = [
    arc([0, 59], [0, 96], 27, [-20, 77]),
    arc([0, 96], [0, 59], 27, [20, 77]),
  ];
  const opening: Region = [
    arc([0, 64], [0, 91], 22, [-17, 77]),
    arc([0, 91], [0, 64], 22, [17, 77]),
  ];
  for (const t of [0, 120, 240]) {
    c.fill(motif, toPath([head], { k: 0.9, at: on(t, 76), turn: t }));
    c.fill(motif, toPath([oval, opening], { k: 1, turn: t + 60 }), "evenodd");
  }
}

/** Four banks of straight needles use one ruled layout. A curled foot finishes each axis. */
export function yotsuWariMatsuBuild(c: Builder): void {
  c.precision(3);
  const reach = 94;
  const turns = [0, 90, 180, 270];
  const needles: Region[] = [];
  for (let offset = -82; offset <= 82; offset += 8.2) {
    const chord = Math.sqrt(2 * reach ** 2 - offset ** 2);
    const start = Math.max(3.8, 3.8 - offset, (-offset - chord) / 2);
    const end = (-offset + chord) / 2;
    if (end - start > 1) needles.push(thickSeg([start, start + offset], [end, end + offset], 2.4));
  }
  const allNeedles = turns.flatMap((turn) => needles.map((loop) => loop.map((edge) => rotated(edge, -turn * DEG))));
  const axes = turns.map((turn) =>
    thickSeg(on(turn, 1.9), on(turn, 84), 2.95),
  );
  c.guideCircle(C0, reach);
  c.guideSpokes(4, 0, R);
  c.fill(motif, toPath([...allNeedles, ...axes], { k: 1 }));
  for (const turn of turns) c.fill(motif, toPath([head], { k: 0.9, at: on(turn, 84), turn }));
}
