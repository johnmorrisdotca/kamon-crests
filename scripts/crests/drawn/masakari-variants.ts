import type { Builder } from "../../construct/builder.ts";
import { RING_GAP, WEIGHT } from "../../construct/builder.ts";
import { carve, circleThrough, disc, seg, shortArc, thickSeg, toPath, vadd, vlen, vmul, vsub } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

/** The shoulder bevel is a thin gap edged by a repeated run of shallow circular lobes. */
const bevel = (from: V, to: V): Region[] => {
  const run = vsub(to, from);
  const normal: V = [-run[1], run[0]];
  const lean = vmul(normal, 1.2 / vlen(normal));
  const scallops = Array.from({ length: 6 }, (_, i) => disc(vadd(vadd(from, vmul(run, (i + 0.5) / 6)), lean), 1.75));

  return [thickSeg(from, to, WEIGHT.hair), ...scallops];
};

const grooves = (from: V, to: V): Region[] =>
  [-6.5, 0, 6.5].map((height, i) => thickSeg([from[0], from[1] + height], [to[0] + i - 1, to[1] + height], 1.65));

const edge = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const broadHead = (): Region[] => {
  const upperLeft: V = [-31, 28];
  const upperRight: V = [32, 26];
  const lowerRight: V = [32, -26];
  const lowerLeft: V = [-31, -28];
  const head = [
    edge(upperLeft, upperRight, 85, [0, 105]),
    edge(upperRight, lowerRight, 54, [-18, 0]),
    edge(lowerRight, lowerLeft, 85, [0, -105]),
    edge(lowerLeft, upperLeft, 48, [8, 0]),
  ];

  return carve([head], [...bevel([-22, -29], [-22, 29]), ...grooves([-5, -1.2], [22, 1.4])]);
};

export const hosoNihonMasakariBuild = (c: Builder): void => {
  const field = c.ring("ring-thin") - RING_GAP;
  const head = broadHead();
  const shaft = thickSeg([0, -74], [0, 72], 6.3);
  for (const x of [-34, 34]) {
    c.group(() => {
      c.fill("axe", toPath([shaft], { k: field / R, at: [x, 0] }));
      c.fill("axe", toPath(head, { k: field / 120, at: [x, 32] }), "evenodd");
    });
  }
};

export const hosoMitsuMasakariBuild = (c: Builder): void => {
  const field = c.ring("ring-thin") - RING_GAP;
  const near: V = [2, 3];
  const shoulder: V = [-44, 82];
  const back: V = [39, 86];
  const foot: V = [52, 43];
  const heel: V = [26, 35];
  const blank = [
    edge(near, shoulder, 57, [9, 53]), edge(shoulder, back, 120, [-5, 171]),
    edge(back, foot, 55, [-2, 48]), seg(foot, heel), edge(heel, near, 56, [42, -17]),
  ];
  const head = carve([blank], [...bevel([-37, 81], [2, 13]), ...grooves([7, 56], [36, 64])]);
  const shaft = thickSeg([13, 11], [17, 94], 6.8);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("axe", toPath([shaft], { k: field / R, turn }));
      c.fill("axe", toPath(head, { k: field / R, turn }), "evenodd");
    });
  }
};

export const itsutsuMasakariBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const head = broadHead();
  const shaft = thickSeg([0, 15], [0, 95], 6);
  for (let i = 0; i < 5; i += 1) {
    const turn = i * 72;
    const at: V = [62 * Math.sin((turn * Math.PI) / 180), 62 * Math.cos((turn * Math.PI) / 180)];
    c.group(() => {
      c.fill("axe", toPath([shaft], { k: 1, turn }));
      c.fill("axe", toPath(head, { k: 0.77, turn, at }), "evenodd");
    });
  }
  c.fill("axe", toPath([disc([0, 0], 12)], { k: 1 }));
};
