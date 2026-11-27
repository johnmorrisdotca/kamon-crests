import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, mirrored, reversedRun, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const arc = (from: V, to: V, radius: number, near: V) => shortArc(circleThrough(from, to, radius, near), from, to);

function shrink(edge: Piece, scale: number, [x, y]: V): Piece {
  const place = ([u, v]: V): V => [u * scale + x, v * scale + y];

  return edge.t === "A"
    ? { ...edge, c: place(edge.c), r: edge.r * scale }
    : { ...edge, a: place(edge.a), b: place(edge.b) };
}

function ribbon(from: V, to: V, radius: number, near: V, width: number): Region {
  const piece = arc(from, to, radius, near) as Extract<Piece, { t: "A" }>;
  return thickArc(piece.c, piece.r, width, Math.min(piece.a0, piece.a1), Math.max(piece.a0, piece.a1));
}

export function matsubaAoiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.zoom(0.89);
  const half = [
    arc([0, 38], [-30, 1], 75, [34, 0]),
    arc([-30, 1], [-23, -23], 18, [-15, -8]),
    arc([-23, -23], [0, -16], 18, [-11, -12]),
  ];
  const shell = [...half, ...reversedRun(half.map(mirrored))];
  const slit = ribbon([0, 15], [-17, -5], 32, [-26, 20], 3.2);
  const join = ribbon([0, 15], [0, -9], 31, [-29, 0], 3.2);
  const inner = half.map((edge) => shrink(edge, 0.75, [0, 5]));
  const border = [...inner, ...reversedRun(inner.map(mirrored))];
  const leaf = [...carve([shell], [border]), ...carve([slit, slit.map(mirrored), join], [])];
  const leftStem = [
    ribbon([-41, 58], [7, 35], 50, [-36, 10], 4.6),
    ribbon([7, 35], [27, -58], 118, [-80, -30], 4.4),
  ];
  const rightStem = [
    ribbon([53, 59], [-1, 28], 37, [38, 23], 4.8),
    ribbon([-1, 28], [25, -58], 108, [103, 20], 4.6),
  ];
  const foot: Region = [
    arc([26, -55], [55, -48], 21, [45, -69]),
    arc([55, -48], [36, -65], 22, [58, -69]),
    arc([36, -65], [29, -87], 29, [7, -67]),
    arc([29, -87], [19, -67], 28, [46, -66]),
    arc([19, -67], [-11, -61], 35, [5, -93]),
    arc([-11, -61], [26, -55], 24, [6, -70]),
  ];
  const stems = carve([...leftStem, ...rightStem, foot], []);
  c.fill("hollyhock", toPath(stems, { k: 1 }), "evenodd");
  c.fill("hollyhock", toPath(leaf, { k: 1.02, turn: 232, at: [-55, 38] }), "evenodd");
  c.fill("hollyhock", toPath(leaf, { k: .79, turn: 142, at: [61, 50] }), "evenodd");
}
