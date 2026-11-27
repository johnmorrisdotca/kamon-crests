import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { chojiInk } from "./choji.ts";

const clove = "clove";
const rad = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function stamp(c: Builder, ink: Region[][], k: number, at: V, turn: number): void {
  c.group(() => {
    for (const sign of ink) c.fill(clove, toPath(sign, { k, at, turn }));
  });
}

/** The right bud passes in front of the left. The rear bud ends at a gap around the leading edge. */
export function chigaiChojiBuild(c: Builder, k = 1): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);
  const root: V = [-48, -70];
  const inside: V = [19, 13];
  const outside: V = [68, 9];
  const bud = [
    bow(inside, outside, 26, [43, 4]),
    bow(outside, root, 85, [-15, 15]),
    bow(root, inside, 93, [-72, 23]),
  ];
  const clearance = bud.flatMap((edge) => edge.t === "A"
    ? [thickArc(edge.c, edge.r, 4.4, edge.a0, edge.a1)]
    : [thickSeg(edge.a, edge.b, 4.4)]);
  const middle: V = [52, 52];
  const inner: V = [20, 43];
  const outer: V = [75, 34];
  const stamen = (tip: V): Region[] => [thickSeg([45, 8], tip, 2.9), disc(tip, 1.85)];
  const crown = [
    ...carve([disc(middle, 18)], [bud, ...clearance, ...stamen([52, 57])]),
    ...carve([disc(inner, 15)], [bud, ...clearance, disc(middle, 20), ...stamen([19, 46])]),
    ...carve([disc(outer, 17)], [bud, ...clearance, disc(middle, 20), ...stamen([82, 39])]),
  ];
  const front = [bud, ...crown];
  const rear = carve(front.map((loop) => loop.map(mirrored)), [bud, ...clearance]);
  c.fill(clove, toPath(rear, { k }), "evenodd");
  c.fill(clove, toPath(front, { k }), "evenodd");
}

export function chojiBishiBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(8, 0, R);
  const ink = chojiInk();
  for (const [turn, reach] of [
    [0, 82], [45, 76], [90, 97], [135, 76],
    [180, 82], [225, 76], [270, 97], [315, 76],
  ]) {
    const k = (reach - 13) / 187;
    stamp(c, ink, k, rad(turn, 13 + k * 94), turn);
  }
  c.fill(clove, toPath([disc([0, 0], 13.4)], { k: 1 }));
}
