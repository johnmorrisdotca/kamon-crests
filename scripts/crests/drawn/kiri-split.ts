import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, hint: V): Piece =>
  shortArc(circleThrough(from, to, radius, hint), from, to);
const sector = (half: Piece[]): Region => [...half, ...reversedRun(half.map(mirrored))];

function stripe(from: V, to: V, radius: number, hint: V, width: number): Region {
  const curve = arc(from, to, radius, hint) as Extract<Piece, { t: "A" }>;

  return thickArc(curve.c, curve.r, width, Math.min(curve.a0, curve.a1), Math.max(curve.a0, curve.a1));
}

const rim = [disc([0, 0], R), disc([0, 0], 92.6)];

export function mitsuWariKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(3, 0, R);
  c.fill("paulownia", toPath(rim, { k: 1 }), "evenodd");
  const spike = sector([
    arc([0, 91], [18.5, 85], 24, [0, 68]),
    arc([18.5, 85], [19, 72], 15, [6, 78]),
    arc([19, 72], [22.5, 65], 12, [10, 65]),
    arc([22.5, 65], [20.2, 50], 24, [0, 61]),
    arc([20.2, 50], [17.3, 36], 20, [2, 47]),
    arc([17.3, 36], [12.1, 26], 15, [2, 34]),
    arc([12.1, 26], [11, 17], 13, [-1, 23]),
    arc([11, 17], [0, 6.8], 11, [0, 17]),
  ]);
  const tierMarks = [76, 64, 52, 41].flatMap((y, n) => {
    const wing = stripe([0, y - 9], [20.1 - n * 1.65, y], 36, [1, y + 25], 2.0);

    return [wing, wing.map(mirrored)];
  });
  const stalk = thickSeg([0, 89], [0, 21], 2.65);
  const drawSpike = carve([spike], [stalk, ...tierMarks]);
  const west = [
    arc([2.4, 92.9], [45, 80.7], 93, [0, 0]),
    arc([45, 80.7], [69, 62], 92, [0, 0]),
    arc([69, 62], [60, 47], 23, [57, 56]),
    arc([60, 47], [40, 49], 21, [47, 67]),
    arc([40, 49], [28, 56], 23, [39, 70]),
    arc([28, 56], [22, 70], 25, [44, 72]),
    arc([22, 70], [2.4, 92.9], 28, [-4, 68]),
  ];
  const folds = [
    stripe([30, 78], [35, 55], 28, [9, 58], 1.8),
    stripe([41, 76], [45, 51], 30, [18, 56], 1.8),
    stripe([52, 69.7], [55, 50], 24, [35, 57], 1.8),
  ];
  const leaf = carve([west], folds);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("paulownia", toPath(drawSpike, { k: 1, turn }), "evenodd");
      c.fill("paulownia", toPath(leaf, { k: 1, turn }).join(toPath(leaf, { k: 1, turn, mirror: true })), "evenodd");
    });
  }
}
