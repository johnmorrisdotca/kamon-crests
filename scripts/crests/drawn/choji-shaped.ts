import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, shortArc, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";
import { chojiInk } from "./choji.ts";

const clove = "clove";
const rad = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function stamp(c: Builder, ink: Region[][], k: number, at: V, turn: number): void {
  c.group(() => {
    for (const sign of ink) c.fill(clove, toPath(sign, { k, at, turn }));
  });
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
