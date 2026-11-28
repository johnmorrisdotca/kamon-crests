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
  c.fill(clove, toPath(rear, { k, at: [-2, -2] }), "evenodd");
  c.fill(clove, toPath(front, { k, at: [-2, -2] }), "evenodd");
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

/** Two opposed buds and two pairs of hollow vines make a lozenge. */
export function chojiTsuruBishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, 96);
  c.guideSpokes(4, 0, 96);
  const bow = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);
  const end: V = [-95, 0];
  const shoulder: V = [-31, 55];
  const root: V = [-13, 39];
  const vine = [
    bow(end, shoulder, 97, [-17, -47]),
    bow(shoulder, root, 24, [-36, 19]),
    bow(root, end, 154, [-110, 150]),
  ];
  const eyeRoot: V = [-30, 39];
  const eyeTip: V = [-76, 12];
  const eye = [bow(eyeTip, eyeRoot, 87, [-10, -48]), bow(eyeRoot, eyeTip, 110, [-95, 117])];
  const tailEnd: V = [-38, 1];
  const tailBase: V = [0, 11];
  const tail = [bow(tailEnd, tailBase, 58, [-8, -49]), bow(tailBase, tailEnd, 83, [-39, 80])];
  const opening: Region = [
    bow([0, -52], [-10, 22], 92, [73, -6]),
    bow([-10, 22], [10, 22], 11, [0, 15]),
    bow([10, 22], [0, -52], 92, [-73, -6]),
  ];
  const [middle, right, bud, left] = chojiInk();
  const ink = [middle, right, carve(bud, [opening]), left];
  for (const turn of [0, 180]) {
    c.group(() => {
      c.fill(clove, toPath([vine, eye], { k: 1, turn }), "evenodd");
      c.fill(clove, toPath([vine, eye], { k: 1, turn, mirror: true }), "evenodd");
      c.fill(clove, toPath([tail], { k: 1, turn }));
      for (const piece of ink) {
        c.fill(clove, toPath(piece, { k: 0.37, at: rad(turn, 43), turn }));
      }
    });
  }
}

/** One clove stands upright above two that cross at their feet, the right one in front. */
export function mitsumoriChojiBuild(c: Builder, k = 1): void {
  c.precision(3);
  const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);
  const around = (loop: Region, width: number): Region[] => loop.map((edge) => edge.t === "A"
    ? thickArc(edge.c, edge.r, width, edge.a0, edge.a1)
    : thickSeg(edge.a, edge.b, width));
  const stamen = (from: V, tip: V): Region[] => [thickSeg(from, tip, 2.6), disc(tip, 1.7)];
  const flower = (bud: Region, petals: { at: V; r: number; from: V; tip: V }[]): Region[] => {
    const clearance = around(bud, 4.2);
    const first = disc(petals[0].at, petals[0].r + 2.1);

    return [bud, ...petals.flatMap((petal, i) => carve([disc(petal.at, petal.r)], [bud, ...clearance, ...stamen(petal.from, petal.tip), ...(i === 0 ? [] : [first])]))];
  };

  const root: V = [-52, -55];
  const inside: V = [22, 9];
  const outside: V = [56, -0.5];
  const bent: Region = [
    bow(inside, outside, 18, [39, 3]),
    bow(outside, root, 80, [-22, 17]),
    bow(root, inside, 68, [-48, 11]),
  ];
  const front = flower(bent, [
    { at: [53, 18], r: 17.5, from: [46, 7], tip: [55, 23] },
    { at: [29.8, 15.5], r: 8.5, from: [28, 10], tip: [30, 17] },
    { at: [69.3, -4.2], r: 10.4, from: [58, -2.4], tip: [72, 0.5] },
  ]);
  const rear = carve(front.map((loop) => loop.map(mirrored)), [bent, ...around(bent, 4.2)]);

  const foot: V = [0, -27];
  const upright: Region = [
    bow([-16, 49], [16, 49], 28, [0, 26]),
    bow([16, 49], foot, 120, [-100, 0]),
    bow(foot, [-16, 49], 120, [100, 0]),
  ];
  const standing = flower(upright, [
    { at: [0, 65], r: 14, from: [0, 54], tip: [0, 67] },
    { at: [-22, 52.5], r: 13, from: [-14, 47], tip: [-26, 52] },
    { at: [22, 52.5], r: 13, from: [14, 47], tip: [26, 52] },
  ]);
  c.fill(clove, toPath(standing, { k }), "evenodd");
  c.fill(clove, toPath(rear, { k, at: [-2, -2] }), "evenodd");
  c.fill(clove, toPath(front, { k, at: [-2, -2] }), "evenodd");
}
