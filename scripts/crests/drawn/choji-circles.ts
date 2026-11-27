import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, toPath } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";
import { chojiInk } from "./choji.ts";

const part = "clove";
const radiusAt = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function stamp(c: Builder, body: Region[][], k: number, at: V, turn: number): void {
  c.group(() => {
    for (const piece of body) c.fill(part, toPath(piece, { k, at, turn }));
  });
}

function buds(c: Builder, count: number, reach: number, joint: number): void {
  c.guideSpokes(count, 0, reach);
  c.guideCircle(C0, joint);
  const ink = chojiInk();
  const k = (reach - joint - 1.3) / 186;
  for (let i = 0; i < count; i += 1) {
    const turn = i * 360 / count;
    stamp(c, ink, k, radiusAt(turn, joint + 94 * k), turn);
  }
  c.fill(part, toPath([disc([0, 0], joint)], { k: 1 }));
}

export function mutsuChojiBuild(c: Builder): void {
  c.precision(2);
  buds(c, 6, 96, 13.9);
}

export function yatsuChojiBuild(c: Builder): void {
  c.precision(2);
  buds(c, 8, 96, 12.4);
}

export function kokonotsuChojiBuild(c: Builder): void {
  c.precision(2);
  buds(c, 9, 96, 11.8);
}

export function chuwaNiMutsuChojiBuild(c: Builder): void {
  c.precision(2);
  const room = c.ring("ring-medium");
  buds(c, 6, room - 2.8, (room - 2.8) * 0.1448);
}
