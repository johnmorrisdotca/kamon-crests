import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";

const short = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

export function mamezoKiriBuild(c: Builder): void {
  c.precision(2);
  c.ring("ring-thin");
  const edge = [
    seg([0, 0], [32.1, 0]),
    short([32.1, 0], [28.7, -20.6], 46, [-13, 0]),
    short([28.7, -20.6], [15.2, -28.8], 16, [15, -15]),
    short([15.2, -28.8], [13, -44.7], 23, [-9, -32]),
    short([13, -44.7], [0, -48.8], 15.9, [0, -33]),
  ];
  const half = short([15.1, -34.5], [14.6, -20.1], 17, [2, -29]) as Extract<Piece, { t: "A" }>;
  const fold = thickArc(half.c, half.r, 1.9, Math.min(half.a0, half.a1), Math.max(half.a0, half.a1));
  const cloak = carve([[...edge, ...reversedRun(edge.map(mirrored))]], [fold, fold.map(mirrored)]);
  const cap = [[seg([0, 17], [12.5, 4.2]), seg([12.5, 4.2], [-12.5, 4.2]), seg([-12.5, 4.2], [0, 17])]];
  for (const x of [-50.5, 50.5]) {
    const at: V = [x, 26];
    c.group(() => {
      c.fill("paulownia", toPath(cloak, { k: 1, at }), "evenodd");
      c.fill("paulownia", toPath([...cap, thickSeg([0, 0], [0, 42], 2.3), disc([0, 42], 5.1)], { k: 0.93, at }));
    });
  }
  const at: V = [0, -4];
  c.group(() => {
    c.fill("paulownia", toPath(cloak, { k: 1, at }), "evenodd");
    c.fill("paulownia", toPath([...cap, thickSeg([0, 0], [0, 82], 2.7), disc([0, 82], 5.2)], { k: 1, at }));
  });
  for (const direction of [false, true]) {
    c.fill("paulownia", toPath([thickSeg([0, 46], [17.4, 60.7], 2.45), disc([17.4, 60.7], 5.3)], { k: 1, at, mirror: direction }));
  }
}
