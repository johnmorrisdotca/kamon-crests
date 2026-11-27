import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, moved, onCircle, rotated, seg, shortArc, thickArc, toPath,
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

/** Two struck circles with a shared tangent where the scroll turns in. */
const vineCurl = (at: V, reach: number, width: number, turn: number): Region[] => {
  const small = reach * .45;
  const inner: V = [reach - small, 0];

  return place([
    band(origin, reach, width, 75, 360),
    band(inner, small, width, 0, 213),
    disc(onCircle(inner, small, 213 * DEG), width / 2),
  ], at, turn);
};

const leafTip: V = [64, 77];
const leafFoot: V = [2, -91];
const inside: V = [10, -11];
const leaf: Region = [
  arc(leafFoot, leafTip, 95, [11, 5]),
  arc(leafTip, inside, 74, [-18, 42]),
  seg(inside, leafFoot),
];
const indentations = [[88, 44], [96, 17], [92, -37], [58, -74], [31, -86]].map((at) => disc(at as V, 6.25));
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
  const upper = vineCurl([-13, 73], 18.2, 8.5, 161);
  const lower = vineCurl([-33, -68], 18.8, 8.5, -20);
  const lowerClearance = vineCurl([-33, -68], 18.8, 8.5 + 2 * paper, -20);
  const left = [
    band([-35, -5], 50.5, 12.5, 102, 266),
    band([-32, -2], 34, 3.7, 138, 244),
  ];
  const drum = [
    band([0, 52], 5.1, paper, 178, 364),
    band([0, -52], 5.1, paper, 0, 187),
  ];
  const ink = (regions: Region[]): void => c.fill("gion-amulet", toPath(regions, { k: 1 }), "evenodd");
  c.group(() => {
    ink(carve([leaf], [...indentations, ...leafFolds, ...under]));
    ink(carve([...upper, ...lower], under));
    ink(carve(left, [...under, ...lowerClearance]));
  });
  ink(carve([paperRing[0]], [paperRing[1], ...frontGap, ...backGap]));
  ink(carve(back, [...frontGap, ...place(drum, origin, 47)]));
  ink(carve(front, place(drum, origin, -47)));
};
