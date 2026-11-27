import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, moved, reversedRun, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, centre: V): Piece => shortArc(circleThrough(from, to, radius, centre), from, to);
const half = [
  arc([0, 0], [12, -19], 37, [-23, -29]),
  arc([12, -19], [17, -33], 26, [-8, -31]),
  arc([17, -33], [17, -49], 33, [-15, -41]),
  arc([17, -49], [20, -63], 29, [-8, -59]),
  arc([20, -63], [13, -79], 35, [-15, -57]),
  arc([13, -79], [0, -93], 44, [-23, -59]),
];
const outline = [...half, ...reversedRun(half.map(mirrored))];
const rib = thickSeg([0, -4], [0, -86], 2.15);
const lines = [
  thickSeg([0, -14], [11.8, -32], 1.7),
  thickSeg([0, -25], [15, -43], 1.7),
  thickSeg([0, -36], [15.3, -54], 1.7),
  thickSeg([0, -47], [16, -65], 1.7),
  thickSeg([0, -57], [12.2, -73], 1.7),
  thickSeg([0, -67], [9, -79], 1.7),
];
const leaf = carve([outline], [rib, ...lines, ...lines.map((line) => line.map(mirrored))]);

const vertex = Array.from({ length: 10 }, (_, n): V => {
  const r = n % 2 === 0 ? 12.3 : 7.1;
  const theta = n * 36 * DEG;

  return [r * Math.sin(theta), r * Math.cos(theta)];
});
const star = vertex.map((point, n) => seg(point, vertex[(n + 1) % vertex.length]));

function starSpike(x: number, height: number, tiers: number[], spread: number, foot = 1.5): Region[] {
  const top: V = [x, height];
  const parts = [thickSeg([x, foot], top, 3.2), star.map((piece) => moved(piece, top))];
  const light = [thickSeg([x - 5.4, height - 1.3], [x + 5.4, height - 1.3], 1.5)];
  for (const level of tiers) {
    for (const sign of [-1, 1]) {
      const bud: V = [x + spread * sign, level + 8.5];
      parts.push(thickSeg([x, level], bud, 2.55), star.map((piece) => moved(piece, bud)));
      light.push(thickSeg([bud[0] - 4, bud[1] - 1.3], [bud[0] + 4, bud[1] - 1.3], 1.35));
    }
  }

  return carve(parts, light);
}

export function hanaKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  c.fill("paulownia", toPath(starSpike(0, 80, [25, 49], 22), { k: 1 }), "evenodd");
  for (const sign of [-1, 1]) {
    c.fill("paulownia", toPath(starSpike(61 * sign, 41, [18], 15.6, -13.5), { k: 1 }), "evenodd");
    c.fill("paulownia", toPath(leaf, { k: 1, at: [3 * sign, -2], turn: -80 * sign }), "evenodd");
  }
  c.fill("paulownia", toPath(leaf, { k: 0.98, at: [0, -3.3] }), "evenodd");
  c.fill("paulownia", toPath([disc([0, 0], 8.65)], { k: 1 }));
}
