import type { Builder } from "../../construct/builder.ts";
import { DEG, carveWhere, circleThrough, disc, inside, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

export function matsubaBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(4, 0, R);
  const outside = bow([-82, 0], [31, 76], 120, [-49, 109], 2.6);
  const inside = bow([-80, 0], [4, 36], 116, [-45, 113], 2.15);
  for (const turn of [0, 180]) {
    for (const mirror of [false, true]) {
      c.fill(motif, toPath([outside, inside], { k: 1, turn, mirror }));
    }
  }
  c.fill(motif, toPath([head], { k: 0.81, at: [82, 0], turn: 90 }));
  c.fill(motif, toPath([head], { k: 0.81, at: [-82, 0], turn: 270 }));
}

/** A level shaft and a folded needle cross at the right. Both continue to the ring. */
export function maruNiHitotsuMatsubaBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-medium");
  const insideRing = disc([0, 0], room);
  const peak: V = [2, 30];
  const ruled = [
    thickSeg([-room - 5, -8], [room + 5, -8], 3.4),
    thickSeg([-55, -7], peak, 4),
    thickSeg(peak, [82, -33], 4),
  ];
  const needle = carveWhere(
    [...ruled.flat(), ...insideRing],
    (point) => Math.hypot(...point) < room && ruled.some((strip) => inside(strip, point)),
  );
  c.fill(motif, toPath(needle, { k: 1 }));
  c.fill(motif, toPath([head], { k: 1.25, at: [-53, -8], turn: 270 }));
}

export function itsutsuMatsubaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(5, 0, R);
  const turns = [0, 72, 144, 216, 288];
  const edge = inwardSides(turns.map((t) => on(t, 80)), 86);
  const inside = inwardSides(turns.map((t) => on(t, 72)), 77);
  c.fill(motif, toPath([edge, inside], { k: 1 }), "evenodd");
  const lens: Region = [
    arc([0, 8], [0, 34], 18, [-16, 22]),
    arc([0, 34], [0, 8], 18, [16, 22]),
  ];
  const space: Region = [
    arc([0, 12], [0, 30], 13.7, [-11, 21]),
    arc([0, 30], [0, 12], 13.7, [11, 21]),
  ];
  for (const t of turns) {
    c.fill(motif, toPath([head], { k: 0.89, at: on(t, 80), turn: t }));
    c.fill(motif, toPath([lens, space], { k: 1, turn: t + 36 }), "evenodd");
  }
}
