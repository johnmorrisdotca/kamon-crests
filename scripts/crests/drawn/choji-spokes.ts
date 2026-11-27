import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { DEG, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Region, V } from "../../construct/compass.ts";
import { chojiBuild, chojiInk } from "./choji.ts";

const clove = "clove";
const point = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];
const arc = (a: V, b: V, radius: number, near: V) => shortArc(circleThrough(a, b, radius, near), a, b);

function stamp(c: Builder, ink: Region[][], k: number, at: V, turn: number): void {
  c.group(() => {
    for (const shape of ink) c.fill(clove, toPath(shape, { k, at, turn }));
  });
}

function layout(c: Builder, count: number, reach: number, joint: number): void {
  c.guideSpokes(count, 0, reach);
  const ink = chojiInk();
  const k = (reach - joint - 1) / 186;
  for (let i = 0; i < count; i += 1) {
    const turn = i * 360 / count;
    stamp(c, ink, k, point(turn, joint + 94 * k), turn);
  }
  if (joint > 0) c.fill(clove, toPath([disc([0, 0], joint)], { k: 1 }));
}

export function maruNiHitotsuChojiBuild(c: Builder): void {
  const room = c.ring("ring-medium");
  chojiBuild(c, clove, room - 2.7);
}

/** Three upright clove buds grow into the joint and the two outer lobes of the lower fan. */
export function itowaNiChojiGurumaBuild(c: Builder): void {
  c.precision(3);
  const room = c.ring("ring-thread");
  const k = (room - RING_GAP) / 96;
  const ink = chojiInk();
  const joint = 13.5;
  const lower = 0.39;
  for (const turn of [114, 180, 246]) {
    stamp(c, ink, lower * k, point(turn, (joint + 94 * lower) * k), turn);
  }
  const stems = [thickSeg([-46, -5], [-45, -16], 3.4), thickSeg([46, -5], [45, -16], 3.4)];
  c.fill(clove, toPath(stems, { k }));
  const upper: { at: V; width: number; turn: number }[] = [
    { at: [-50, 20], width: 0.29, turn: -8 },
    { at: [0, 42], width: 0.32, turn: 0 },
    { at: [50, 20], width: 0.29, turn: 8 },
  ];
  for (const { at, width, turn } of upper) {
    stamp(c, ink, width * k, [at[0] * k, at[1] * k], turn);
  }
  c.fill(clove, toPath([disc([0, 0], joint)], { k }));
}

export function kenNiMitsuChojiBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  layout(c, 3, 95, 12.2);

  for (const [turn, spread] of [[60, 20.4], [180, 22.2], [300, 19.8]]) {
    const half = [
      arc([0, 93], [spread, 85], 45, [38, 117]),
      arc([spread, 85], [7, 45], 74, [73, 40]),
      arc([7, 45], [2, 12], 103, [96, 22]),
      seg([2, 12], [0, 12]),
    ];
    const sword = [...half, ...reversedRun(half.map(mirrored))];
    c.fill("sword", toPath([sword], { k: 1, turn }));
  }
}

export function mitsuChojiBuild(c: Builder): void {
  c.precision(2);
  layout(c, 3, 96, 0);
}

export function itsutsuChojiBuild(c: Builder): void {
  c.precision(2);
  layout(c, 5, 97, 12.2);
}

export function sumitateYotsuChojiBuild(c: Builder): void {
  c.precision(2);
  layout(c, 4, 95, 12.5);
}
