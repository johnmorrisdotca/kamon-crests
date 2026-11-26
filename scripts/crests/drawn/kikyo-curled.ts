import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, circleThrough, mirrored, onCircle, reversedRun, seg, shortArc, thickArc, thickSeg, toPath, vmul } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

const FLOWER = "bellflower";
const plain = { k: 1 };

function polygon(points: V[]): Region {
  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
}

function bow(from: V, to: V, radius: number, on: V): Piece {
  return shortArc(circleThrough(from, to, radius, on), from, to);
}

function bowBand(from: V, to: V, radius: number, on: V, width: number): Region {
  const edge = bow(from, to, radius, on);
  if (edge.t !== "A") throw new Error("The band must lie on a circle");

  return thickArc(edge.c, edge.r, width, edge.a0, edge.a1);
}

function mirrorAroundAxis(half: Region): Region {
  return [...half, ...reversedRun(half.map(mirrored))];
}

function scalePiece(edge: Piece, k: number): Piece {
  return edge.t === "L" ? seg(vmul(edge.a, k), vmul(edge.b, k)) : { ...edge, c: vmul(edge.c, k), r: edge.r * k };
}

export function musubiKikyoBuild(c: Builder): void {
  const outerTip: V = [0, 96];
  const innerTip: V = [0, 85];
  const endOuter: V = [30, 52];
  const endInner: V = [22, 52];
  const centre: V = [-25, 29];
  const outer: Circle = { c: centre, r: 20 };
  const inner: Circle = { c: centre, r: 12 };
  const curlStart = 154 * DEG;
  const curlEnd = 466 * DEG;
  const outerJoin = onCircle(centre, outer.r, curlStart);
  const innerJoin = onCircle(centre, inner.r, curlStart);
  const curlOutsideEnd = onCircle(centre, outer.r, curlEnd);
  const curlInsideEnd = onCircle(centre, inner.r, curlEnd);

  const outline = [
    bow(outerTip, outerJoin, 90, [80, 10]),
    arcTo(outer, outerJoin, curlOutsideEnd, true),
    seg(curlOutsideEnd, curlInsideEnd),
    arcTo(inner, curlInsideEnd, innerJoin, false),
    bow(innerJoin, innerTip, 90, [80, 10]),
    bow(innerTip, endInner, 62, [-35, 39]),
    seg(endInner, endOuter),
    bow(endOuter, outerTip, 70, [-35, 39]),
  ];
  for (let i = 0; i < 5; i += 1) c.fill(FLOWER, toPath([outline], { ...plain, turn: 72 * i }));
}

export function hanaKikyoBuild(c: Builder): void {
  const top: V = [0, 72];
  const shoulder: V = [38, 31];
  const side: V = [95, 9];
  const waist: V = [49, -23];
  const lowerTip: V = [56, -66];
  const bottomNotch: V = [0, -47];
  const front = mirrorAroundAxis([
    bow(top, shoulder, 87, [-45, 11]),
    bow(shoulder, side, 84, [74, -52]),
    bow(side, waist, 62, [45, 25]),
    bow(waist, lowerTip, 58, [-19, -46]),
    bow(lowerTip, bottomNotch, 66, [28, 18]),
  ]);
  const rearShoulder = polygon([[28, 59], [48, 58], [62, 31], [25, 24]]);
  const rearFoot = polygon([[52, -16], [76, -22], [79, -34], [52, -48]]);
  const rearCentre = polygon([[0, -80], [-24, -61], [0, -43], [24, -61]]);
  const rear = [rearShoulder, rearFoot, rearShoulder.map(mirrored), rearFoot.map(mirrored), rearCentre];
  const gap = front.map((edge) => scalePiece(edge, 1.025));
  const sideRays = [
    bowBand([4, -15], [21, 23], 66, [68, -21], WEIGHT.thread),
    bowBand([11, -16], [40, 17], 66, [59, -38], WEIGHT.thread),
    bowBand([19, -20], [60, 7], 64, [45, -50], WEIGHT.thread),
  ];
  const rays = [
    thickSeg([0, -15], [0, 29], WEIGHT.thread),
    ...sideRays, ...sideRays.map((ray) => ray.map(mirrored)),
    bowBand([-40, -45], [40, -45], 44, [0, -80], WEIGHT.thread),
  ];
  c.fill(FLOWER, toPath(carve(rear, [gap]), plain));
  c.fill(FLOWER, toPath(carve([front], rays), plain), "evenodd");
}
