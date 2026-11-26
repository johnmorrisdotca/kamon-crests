import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;

function polygon(points: V[]): Region {
  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
}

function roundedRun(points: V[], centreSide: V, bend: number): Piece[] {
  return points.slice(1).map((point, i) => {
    const from = points[i];
    return shortArc(circleThrough(from, point, Math.max(12, vdist(from, point) * bend), centreSide), from, point);
  });
}

function band(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const arc = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

function ink(c: Builder, loops: Region[], placing: Placing): void {
  c.fill("spatterdock", toPath(loops, placing), "evenodd");
}

const leaf = (() => {
  const half = roundedRun([[0, 95], [21, 77], [37, 60], [43, 46], [38, 35], [26, 30], [15, 31], [6, 24], [0, 24]], [0, 53], 1.6);
  const body = [...half, ...reversedRun(half.map(mirrored))];
  const midrib = polygon([[0, 91], [3, 74], [4, 59], [6, 46], [2, 36], [0, 31], [-2, 36], [-6, 46], [-4, 59], [-3, 74]]);
  const keeps: [V, V][] = [
    [[3, 75], [14, 86]], [[4, 65], [24, 77]], [[5, 56], [32, 69]], [[6, 48], [39, 59]],
    [[12, 45], [41, 49]], [[20, 41], [38, 39]], [[20, 37], [31, 33]],
  ];
  const right = keeps.map(([from, to]) => band(from, to, 56, [57, 20], 2.3));
  const curl = thickArc([16, 37], 7.2, 2.6, -.17, 4.8);
  const veins = [curl, ...right];
  return carve([body], [midrib, ...veins, ...veins.map((vein) => vein.map(mirrored))]);
})();

const stalk = thickSeg([0, 8], [0, 31], 4.6);

function centre(c: Builder, radius = 11.6): void {
  ink(c, [disc([0, 0], radius)], { k: 1 });
}

export function mitsuKohoneBuild(c: Builder): void {
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    ink(c, [stalk], { k: 1, turn });
    ink(c, leaf, { k: 1, turn });
  }
  centre(c);
}

export function maruHitotsuKohoneBuild(c: Builder): void {
  c.ring("ring-thin");
  ink(c, [thickSeg([0, -86], [0, -70], 3.9)], { k: 1 });
  ink(c, leaf, { k: 1.21, at: [0, -103] });
}
