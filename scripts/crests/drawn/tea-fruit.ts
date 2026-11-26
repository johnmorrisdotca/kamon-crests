import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

function roundedRun(points: V[], middle: V, bend = 1.45): Piece[] {
  return points.slice(1).map((point, i) => {
    const from = points[i];
    return shortArc(circleThrough(from, point, Math.max(12, vdist(from, point) * bend), middle), from, point);
  });
}

export function mukoTeaFruitBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const centre: V = [0, 0];
  const tip: V = [0, 94.8];
  const leafFoot: V = [0, 40];
  const edge = roundedRun([tip, [22, 79], [33, 62], [32, 48], leafFoot], [0, 64]);
  const leaf: Region = [...edge, ...reversedRun(edge.map(mirrored))];
  const leafInk = carve([leaf], [disc(centre, 60.2), thickSeg([0, 52], [0, 92], 2.45)]);
  for (let i = 0; i < 3; i++) c.fill("tea-fruit", toPath(leafInk, { k: 1, turn: i * 120 }), "evenodd");

  const veins = Array.from({ length: 6 }, (_, i) => {
    const direction = i * 60 * DEG;
    const ray = (radius: number): V => [radius * Math.sin(direction), radius * Math.cos(direction)];
    return thickSeg(ray(12.6), ray(36), 2.6);
  });
  const fruit = carve([disc(centre, 57)], [disc(centre, 15), ...veins]);
  c.fill("tea-fruit", toPath(fruit, { k: 1 }), "evenodd");
  c.fill("tea-fruit", toPath([disc(centre, 12)], { k: 1 }));
}

type Arc = Extract<Piece, { t: "A" }>;

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

function incision(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const edge = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1));
}

function paint(c: Builder, loops: Region[], placing: Placing): void {
  c.fill("tea-fruit", toPath(loops, placing), "evenodd");
}

function head(c: Builder, placing: Placing): void {
  const base: V = [0, -18];
  const crown = roundedRun([[0, 62], [14, 72], [34, 76], [50, 69], [59, 51], [60, 30], [53, 11], [39, -5], [20, -15], base], [0, 31]);
  const body: Region = [...crown, ...reversedRun(crown.map(mirrored))];
  const curve = incision([0, 58], [11, 21], 33, [-18, 36], 2.6);
  const side = [
    incision([13, 46], [34, 52], 18, [25, 38], 2.4),
    incision([34, 52], [37, 18], 39, [7, 25], 2.4),
    incision([8, -16], [19, -4], 19, [21, -18], 2.35),
  ];
  const capRim = roundedRun([[-22, 69], [-14, 87], [0, 94], [14, 87], [22, 69]], [0, 60]);
  paint(c, carve([[...capRim, seg([22, 69], [-22, 69])]], [body]), placing);
  const veins = [
    curve, curve.map(mirrored), ...side, ...side.map((vein) => vein.map(mirrored)),
    thickSeg([0, -17], [0, -3], 2.15),
  ];
  paint(c, carve([body], veins), placing);
}

const leafRight = (() => {
  const points: V[] = [[17, -43], [30, -23], [49, -14], [68, -13], [94, -14], [76, -34], [59, -57], [39, -61], [17, -43]];
  const outline = roundedRun(points, [50, -35], 1.65);
  return carve([outline], [incision([19, -43], [90, -16], 156, [10, 115], 2.5)]);
})();

function drawOne(c: Builder, k: number): void {
  const stem = polygon([
    [-10, -12], [10, -12], [10, -42], [28, -34], [31, -45], [11, -61], [13, -93],
    [-13, -93], [-11, -61], [-31, -45], [-28, -34], [-10, -42],
  ]);
  paint(c, [stem], { k });
  paint(c, leafRight, { k });
  paint(c, leafRight, { k, mirror: true });
  head(c, { k });
}

export function hitotsuTeaFruitBuild(c: Builder): void {
  c.guideCircle(C0, R);
  drawOne(c, 1);
}

export function itowaHitotsuTeaFruitBuild(c: Builder): void {
  const inner = c.ring("ring-thread");
  drawOne(c, (inner - 2.6) / 96);
}
