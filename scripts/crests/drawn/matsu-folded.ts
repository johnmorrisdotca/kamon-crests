import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

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
const poly = (vertices: V[]): Region => vertices.map((a, i) => seg(a, vertices[(i + 1) % vertices.length]));
const on = (angle: number, reach: number): V => [reach * Math.sin(angle * DEG), reach * Math.cos(angle * DEG)];
function inwardSides(points: V[], radius: number): Region {
  return points.map((a, i) => {
    const b = points[(i + 1) % points.length];
    const middle: V = [(a[0] + b[0]) * 2.6, (a[1] + b[1]) * 2.6];

    return arc(a, b, radius, middle);
  });
}
function bow(a: V, b: V, radius: number, centre: V, width: number): Region {
  const piece = arc(a, b, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(piece.c, piece.r, width, Math.min(piece.a0, piece.a1), Math.max(piece.a0, piece.a1));
}

export function oriMatsubaBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(4, 0, R);
  const rim = poly([[0, 52], [81, 0], [0, -52], [-81, 0]]);
  const inside = poly([[0, 47], [74, 0], [0, -47], [-74, 0]]);
  c.fill(motif, toPath([rim, inside], { k: 1 }), "evenodd");
  for (const y of [-2.6, 2.6]) {
    c.fill(motif, toPath([thickSeg([-78, y], [78, y], 2.4)], { k: 1 }));
  }
  c.fill(motif, toPath([head], { k: 0.81, at: [83, 0], turn: 90 }));
  c.fill(motif, toPath([head], { k: 0.81, at: [-83, 0], turn: 270 }));
}
