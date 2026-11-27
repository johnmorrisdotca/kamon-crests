import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, moved, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, centre: V): Piece =>
  shortArc(circleThrough(from, to, radius, centre), from, to);

const band = (from: V, to: V, radius: number, centre: V, width: number): Region => {
  const curve = arc(from, to, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(curve.c, curve.r, width, Math.min(curve.a0, curve.a1), Math.max(curve.a0, curve.a1));
};

function halves(points: V[]): Region {
  const half = points.slice(0, -1).map((point, i) => seg(point, points[i + 1]));

  return [...half, ...reversedRun(half.map(mirrored))];
}

const wheelLeaf = halves([
  [0, 0], [23, -19], [40, -34], [32, -38], [41, -53],
  [31, -53], [34, -69], [23, -65], [20, -83], [12, -77], [0, -95],
]);
const axialVein = thickSeg([0, -3], [0, -87], 2.4);
const sideVeins = [
  band([0, -19], [31, -43], 56, [-20, -65], 2.1),
  band([0, -31], [28, -55], 47, [-15, -68], 2.0),
  band([0, -42], [23, -63], 40, [-13, -76], 1.85),
  band([0, -54], [17, -71], 35, [-14, -77], 1.8),
  band([0, -64], [12, -78], 30, [-13, -80], 1.7),
];
const leafInk = carve([wheelLeaf], [axialVein, ...sideVeins, ...sideVeins.map((band) => band.map(mirrored))]);

const flower = halves([
  [0, 88], [5, 80], [9, 83], [6, 75], [13, 77], [7, 70], [0, 66],
]);
const twig = carve([
  thickSeg([0, 5], [0, 70], 3.15),
  thickSeg([0, 52], [-13.5, 73], 2.8),
  thickSeg([0, 52], [13.5, 73], 2.8),
  flower,
  flower.map((piece) => moved(piece, [-14, -12])),
  flower.map((piece) => moved(piece, [14, -12])),
], []);

function rotatePoint(point: V, turn: number): V {
  const angle = turn * DEG;
  const [x, y] = point;

  return [x * Math.cos(angle) + y * Math.sin(angle), -x * Math.sin(angle) + y * Math.cos(angle)];
}

export function kiriGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("paulownia", toPath(leafInk, { k: 0.92, at: rotatePoint([0, 7], turn), turn: turn + 180 }), "evenodd");
      c.fill("paulownia", toPath(twig, { k: 0.92, at: rotatePoint([0, 9], turn + 60), turn: turn + 60 }), "evenodd");
    });
  }
  c.fill("paulownia", toPath([disc([0, 0], 13.9)], { k: 1 }));
}
