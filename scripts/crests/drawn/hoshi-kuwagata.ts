import { RING_GAP } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, rotated, shortArc, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const link = (a: V, b: V, radius: number, hint: V) => shortArc(circleThrough(a, b, radius, hint), a, b);

const horn = (): Region => {
  const yTip = 66 / Math.sqrt(3);
  const left: V = [-66, yTip];
  const right: V = [66, yTip];
  const crown: Circle = { c: [0, 52], r: 25 };
  const shoulder = Math.sqrt(crown.r * crown.r - 19 * 19) + crown.c[1];
  const leftShoulder: V = [-19, shoulder];
  const rightShoulder: V = [19, shoulder];
  const lowLeft: V = [-37, 34];
  const lowRight: V = [37, 34];
  const notchLeft: V = [-28, 37];
  const notchRight: V = [28, 37];
  const neck: V = [0, 31];
  return [
    link(left, leftShoulder, 68, [-71, 104]), shortArc(crown, leftShoulder, rightShoulder),
    link(rightShoulder, right, 68, [71, 104]),
    link(right, lowRight, 35, [54, 74]), link(lowRight, notchRight, 14, [33, 51]),
    link(notchRight, neck, 38, [13, 73]), link(neck, notchLeft, 38, [-13, 73]),
    link(notchLeft, lowLeft, 14, [-33, 51]), link(lowLeft, left, 35, [-54, 74]),
  ];
};

const panel = (grow: number): Region => {
  const bottom: V = [0, 49 - 20.5 - grow];
  const top: V = [0, 49 + 20.5 + grow];
  const radius = 20.72 + grow;
  return [link(bottom, top, radius, [20, 49]), link(top, bottom, radius, [-20, 49])];
};

/** The three horns meet at their tips, and each rounded inner panel ends in a separate star. */
export const hoshiMitsuKuwagataBuild = (c: Builder): void => {
  c.precision(3);
  const reach = c.ring("ring-thin") - RING_GAP;
  const placing = { k: (reach - 4.5) / 77 };
  const star: V = [0, 29.5];
  const radius = 8.8;
  const separation = disc(star, radius + 1.55);
  const shell = carve([horn()], [panel(1.5), separation]);
  const insert = carve([panel(0)], [separation]);
  const unit = [...shell, ...insert];
  const angles = [0, 120, 240];
  const turn = (loop: Region, angle: number): Region => loop.map((piece) => rotated(piece, angle * DEG));
  for (const angle of angles) c.fill("helmet-horn", toPath(unit.map((loop) => turn(loop, angle)), placing), "evenodd");
  for (const angle of angles) c.fill("star", toPath([turn(disc(star, radius), angle)], placing), "evenodd");
};
