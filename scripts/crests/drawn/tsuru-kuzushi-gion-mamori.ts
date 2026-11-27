import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, moved, onCircle, rotated, seg, shortArc, thickArc, toPath,
  vadd, vlen, vmul, vsub, vunit,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { scroll } from "./gion-bishi.ts";

const origin: V = [0, 0];
const paper = 1.9;

const arc = (from: V, to: V, radius: number, near: V) =>
  shortArc(circleThrough(from, to, radius, near), from, to);
const band = (at: V, reach: number, width: number, from: number, to: number): Region =>
  thickArc(at, reach, width, from * DEG, to * DEG);
const place = (regions: Region[], at: V, turn: number): Region[] =>
  regions.map((region) => region.map((edge) => moved(rotated(edge, turn * DEG), at)));

/** The outside and returning arc share a tangent on the radius through their join. */
const curl = (centre: V, radius: number, width: number, join: number): Region[] => {
  const end = join + 240;
  const inner = radius * 0.44;
  const inside = onCircle(centre, radius - inner, end * DEG);
  const finish = end + 202;
  return [
    band(centre, radius, width, join, end),
    band(inside, inner, width, end, finish),
    disc(onCircle(inside, inner, finish * DEG), width / 2),
  ];
};

/** Both curls join the sweep at tangent points on their larger circle. */
const sweepingVine = (width: number): Region[] => {
  const centre: V = [-5, -12];
  const radius = 73;
  const top = 112;
  const bottom = 242;
  const head = 18;
  const foot = 19;
  return [
    ...curl(onCircle(centre, radius + head, top * DEG), head, width, top + 180),
    band(centre, radius, width, top, bottom),
    ...curl(onCircle(centre, radius - foot, bottom * DEG), foot, width, bottom),
  ];
};

/** A series of turned convex lobes between the leaf's deliberate serrations. */
const serratedLeaf = (): Region => {
  const foot: V = [2, -91];
  const tip: V = [64, 77];
  const spine: V = [10, -11];
  const run = arc(foot, tip, 95, [11, 5]) as Extract<Piece, { t: "A" }>;
  const lobeCount = 7;
  const marks = Array.from({ length: lobeCount + 1 }, (_, i) =>
    onCircle(run.c, run.r, run.a0 + (run.a1 - run.a0) * i / lobeCount));
  const lobe = (a: V, b: V): Piece => {
    const middle = vmul(vadd(a, b), 0.5);
    const toward = vunit(vsub(run.c, middle));
    return arc(a, b, vlen(vsub(a, b)) * .83, vadd(middle, vmul(toward, 45)));
  };
  return [...marks.slice(1).map((b, i) => lobe(marks[i], b)), arc(tip, spine, 74, [-18, 42]), seg(spine, foot)];
};

const vein = (from: V, to: V, near: V): Region => {
  const edge = arc(from, to, 55, near) as Extract<Piece, { t: "A" }>;
  return thickArc(edge.c, edge.r, paper, edge.a0, edge.a1);
};
const leafFolds = [
  vein([49, 22], [76, 52], [26, 58]),
  vein([53, 7], [81, 26], [34, 50]),
  vein([52, -1], [86, -28], [47, -50]),
  vein([25, -31], [70, -56], [66, 19]),
  vein([13, -37], [25, -77], [-28, -68]),
];

export const tsuruKuzushiGionMamoriBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const front = place(scroll(8.1, 52), origin, -47);
  const back = place(scroll(8.1, 52), origin, 47);
  const frontGap = place(scroll(8.1 + paper, 52), origin, -47);
  const backGap = place(scroll(8.1 + paper, 52), origin, 47);
  const paperRing = [disc(origin, 51.5), disc(origin, 41.3)];
  const under = [...frontGap, ...backGap, disc(origin, 53.4)];
  const vine = sweepingVine(9.9);
  const vineClearance = sweepingVine(9.9 + 2 * paper);
  const leaf = serratedLeaf();
  const drum = [
    band([0, 52], 5.1, paper, 178, 364),
    band([0, -52], 5.1, paper, 0, 187),
  ];
  const ink = (regions: Region[]): void => c.fill("gion-amulet", toPath(regions, { k: 1 }), "evenodd");
  c.group(() => {
    ink(carve([leaf], [...leafFolds, ...under, ...vineClearance]));
    ink(carve(vine, [...frontGap, ...backGap]));
  });
  ink(carve([paperRing[0]], [paperRing[1], ...frontGap, ...backGap, ...vineClearance]));
  ink(carve(back, [...frontGap, ...place(drum, origin, 47)]));
  ink(carve(front, place(drum, origin, -47)));
};
