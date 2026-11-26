import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, reversedRun,
  seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

const ray = (angle: number, radius: number): V => [radius * Math.sin(angle * DEG), radius * Math.cos(angle * DEG)];
const rule = (points: V[]): Region => points.slice(1).map((point, i) => seg(points[i], point));
const outline = (points: V[]): Region => [...rule(points), seg(points[points.length - 1], points[0])];

function incision(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const edge = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1));
}

const rightCrown = [
  [0, 95.3], [3.6, 90], [6.8, 94.7], [9.6, 90.2], [13.5, 94], [16.5, 88.9],
  [20.8, 91.7], [23.7, 86.3], [27, 89.1], [29, 84], [32.8, 85], [36, 77.2],
].map(([angle, radius]) => ray(angle, radius));

function drawFace(c: Builder, k: number): void {
  const root: V = [0, 0];
  const rim = rightCrown[rightCrown.length - 1];
  const leftRim: V = [-rim[0], rim[1]];
  const teeth = rightCrown.slice(1).map((point, i) => {
    const from = rightCrown[i];
    return shortArc(circleThrough(from, point, Math.max(16, vdist(from, point) * 2), [0, 58]), from, point);
  });
  const petal: Region = [...teeth, seg(rim, root), seg(root, leftRim), ...reversedRun(teeth.map(mirrored))];
  const rightVeins = [
    incision([5, 11], [25, 63], 92, [91, 22], 2.15),
    incision([9, 9], [21, 28], 29, [31, 8], 1.75),
  ];
  const separation = thickSeg(root, ray(36, 93), 2.8);
  const cuts = [
    disc(root, 15.9), thickSeg([0, 13], [0, 77], 2.15),
    ...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored)), separation, separation.map(mirrored),
  ];
  const ink = carve([petal], cuts);
  for (let i = 0; i < 5; i++) c.fill("china-pink", toPath(ink, { k, turn: i * 72 }), "evenodd");
  c.fill("china-pink", toPath([disc(root, 13.1)], { k }));
}

export function sekichikuBuild(c: Builder): void {
  c.guideCircle(C0, R);
  drawFace(c, 1);
}

export function maruSekichikuBuild(c: Builder): void {
  const inner = c.ring("ring-medium");
  drawFace(c, (inner - 2.5) / 95.3);
}

function inCircle(ink: Region, cuts: Region[], radius: number): Region[] {
  const clip = disc([0, 0], radius);
  return carveWhere([ink, clip, ...cuts].flat(), (point) =>
    inside(ink, point) && inside(clip, point) && !cuts.some((cut) => inside(cut, point)),
  );
}

export function nozokiSekichikuBuild(c: Builder): void {
  const inner = c.ring("ring-thin") - 1.3;
  const crownRight: V[] = [
    [0, -7], [9, -9], [13, -15], [20, -12], [23, -19], [30, -16], [32, -24], [38, -21],
    [36, -35], [44, -30], [49, -33], [53, -31], [55, -36], [61, -35], [61, -40],
    [69, -39], [69, -51], [61, -68], [53, -84], [29, -98], [0, -102],
  ];
  const silhouette = outline([...crownRight, ...crownRight.slice(1, -1).reverse().map(([x, y]): V => [-x, y])]);
  const heart: V = [0, -88];
  const rightVeins = [
    incision([10, -84], [37, -35], 94, [98, -100], 2.6),
    incision([7, -85], [25, -34], 94, [93, -89], 2),
    incision([13, -86], [50, -46], 126, [109, -104], 2),
    incision([15, -86], [59, -50], 111, [102, -116], 1.8),
  ];
  const veins = [...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored)), thickSeg([0, -81], [0, -17], 2)];
  const ink = inCircle(silhouette, [disc(heart, 18), ...veins], inner);
  c.fill("china-pink", toPath(ink, { k: 1 }), "evenodd");
  c.fill("china-pink", toPath(inCircle(disc(heart, 14.5), [], inner), { k: 1 }), "evenodd");
}
