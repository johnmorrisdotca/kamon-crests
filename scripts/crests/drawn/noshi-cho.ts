import type { Builder } from "../../construct/builder.ts";
import {
  DEG, arcA, carve, circleThrough, disc, onCircle, reversedRun, seg, shortArc, thickArc,
  thickSeg, toPath, vadd, vmul,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const scale = 0.57;
const at = ([x, y]: V): V => [(x - 158) * scale, (157 - y) * scale];
const knot = at([151, 232]);
const paper = 1.65;

/** Each neighbouring pair of strips shares the same struck edge up to its shorter cut end. */
const spreadEdge = (index: number, reach: number): Extract<Piece, { t: "A" }> => {
  const aim = (142 - index * 16.6) * DEG;
  const normal: V = [-Math.sin(aim), Math.cos(aim)];
  const radius = 304;
  const centre = vadd(knot, vmul(normal, radius));
  const start = aim - Math.PI / 2;

  return arcA(centre, radius, start, start + reach * scale / radius) as Extract<Piece, { t: "A" }>;
};

const edgeEnd = (arc: Extract<Piece, { t: "A" }>): V => onCircle(arc.c, arc.r, arc.a1);
const paperStrip = (index: number, leftReach: number, rightReach: number): Region => {
  const left = spreadEdge(index, leftReach);
  const right = spreadEdge(index + 1, rightReach);
  return [left, seg(edgeEnd(left), edgeEnd(right)), ...reversedRun([right])];
};

/** Tails and the curl are bands of the same width, with a cut end. */
const ribbonWidth = 6;
const tail = (from: V, to: V, radius: number, hint: V): Region => {
  const edge = shortArc(circleThrough(from, to, radius, hint), from, to) as Extract<Piece, { t: "A" }>;
  return thickArc(edge.c, edge.r, ribbonWidth, edge.a0, edge.a1);
};

export const noshiChoBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const reaches = [
    [151, 152], [137, 134], [131, 124], [216, 204], [192, 168],
    [158, 146], [190, 158], [171, 159], [148, 159],
  ];
  const strips = reaches.map(([left, right], index) => paperStrip(index, left, right));
  const openings = reaches.slice(1).map(([left], i) => {
    const edge = spreadEdge(i + 1, Math.max(reaches[i][1], left) + 2);
    return thickArc(edge.c, edge.r, paper, edge.a0, edge.a1);
  });

  const curlCentre = at([76, 76]);
  const outer = 14.1;
  const inner = 6.1;
  const routeStart = 38 * DEG;
  const joint = onCircle(curlCentre, outer, routeStart);
  const tangent: V = [Math.sin(routeStart), -Math.cos(routeStart)];
  const curlFoot = vadd(joint, vmul(tangent, 33));
  const innerCentre: V = [curlCentre[0] + outer - inner, curlCentre[1]];
  const curl = [
    thickSeg(joint, curlFoot, ribbonWidth),
    thickArc(curlCentre, outer, ribbonWidth, routeStart, 2 * Math.PI),
    thickArc(innerCentre, inner, ribbonWidth, 0, 218 * DEG),
    disc(onCircle(innerCentre, inner, 218 * DEG), ribbonWidth / 2),
  ];
  const tails = [
    tail(knot, at([70, 278]), 97, at([111, 197])),
    tail(knot, at([122, 303]), 70, at([218, 260])),
  ];
  const buckle = [
    thickSeg(at([141, 228]), at([153, 245]), ribbonWidth),
    thickSeg(at([153, 222]), at([165, 239]), ribbonWidth),
  ];
  const joinClearance = [
    thickSeg(at([141, 228]), at([153, 245]), ribbonWidth + 2 * paper),
    thickSeg(at([153, 222]), at([165, 239]), ribbonWidth + 2 * paper),
  ];
  const ink = (regions: Region[]): void => c.fill("noshi", toPath(regions, { k: 1 }), "evenodd");
  c.group(() => {
    ink(carve(curl, strips));
    ink(carve(strips, [...openings, ...joinClearance]));
    ink(carve(tails, joinClearance));
    ink(carve(buckle, []));
  });
};
