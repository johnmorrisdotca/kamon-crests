// The stylised turtle in frame 19 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { circleThrough, mirrored, reversed, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, side: V) => shortArc(circleThrough(from, to, radius, side), from, to);
const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

export const komonjiKameBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  const crest: V = [0, 85];
  const temple: V = [17, 73];
  const neck: V = [15, 55];
  const shoulder: V = [30, 43];
  const upperClaw: V = [34, 67];
  const knuckle: V = [53, 53];
  const upperTip: V = [74, 32];
  const armRoot: V = [41, 27];
  const hip: V = [37, -39];
  const lowerTip: V = [76, -44];
  const lowerClaw: V = [50, -64];
  const heel: V = [30, -83];
  const hock: V = [25, -51];
  const tail: V = [0, -64];
  const half = [
    curve(crest, temple, 19, [1, 66]), curve(temple, neck, 24, [-6, 66]),
    curve(neck, shoulder, 19, [16, 39]), curve(shoulder, upperClaw, 15, [25, 57]),
    curve(upperClaw, knuckle, 27, [30, 40]), curve(knuckle, upperTip, 25, [54, 29]),
    curve(upperTip, armRoot, 31, [60, 9]), curve(armRoot, hip, 84, [-38, 1]),
    curve(hip, lowerTip, 35, [56, -17]), curve(lowerTip, lowerClaw, 34, [45, -38]),
    curve(lowerClaw, heel, 36, [57, -96]), curve(heel, hock, 25, [8, -72]),
    curve(hock, tail, 31, [0, -34]),
  ];
  const silhouette = [...half, ...half.slice().reverse().map((edge) => reversed(mirrored(edge)))];
  const rightShell = [
    polygon([[7, 35], [17, 37], [10, 44]]),
    polygon([[7, 12], [23, 9], [22, 22], [7, 20]]),
    polygon([[9, -5], [24, -7], [23, -22], [9, -21]]),
    polygon([[9, -34], [19, -33], [11, -45]]),
  ];
  const shell = [...rightShell, ...rightShell.map((one) => one.map(mirrored))];
  c.fill("turtle", toPath([silhouette, ...shell], { k: 1 }), "evenodd");
};
