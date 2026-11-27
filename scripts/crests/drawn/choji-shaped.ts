import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";
import { chojiInk } from "./choji.ts";

const clove = "clove";
const rad = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function stamp(c: Builder, ink: Region[][], k: number, at: V, turn: number): void {
  c.group(() => {
    for (const sign of ink) c.fill(clove, toPath(sign, { k, at, turn }));
  });
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
