// Quince arrangements from frame 28 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { circleThrough, disc, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import { curledBand } from "./quince-band.ts";
import { takanohaBuild } from "./takanoha.ts";

const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to);
const centre: V = [0, 0];
const fifths = [0, 72, 144, 216, 288];

const lobedFrame = (c: Builder): void => {
  const left: V = [-42, 75];
  const right: V = [42, 75];
  const rightRoot: V = [39, 65];
  const leftRoot: V = [-39, 65];
  const lobe = [
    curve(left, right, 52, [0, 42]),
    curve(right, rightRoot, 20, [22, 73]),
    curve(rightRoot, leftRoot, 75, [0, 0]),
    curve(leftRoot, left, 20, [-22, 73]),
  ];
  const curl = curledBand({ c: centre, r: 71 }, { c: centre, r: 65 }, { c: [33, 58], r: 5.8 }, 5.3, 2.55);
  for (const turn of fifths) c.fill("frame", toPath([lobe, ...curl], { k: 1, turn }));
};

export const mokkoNiUmeBachiBuild = (c: Builder): void => {
  c.precision(3);
  const flower = [disc([0, 36], 18.1), thickSeg([-3, 10], [-6, 17], 2), thickSeg([3, 10], [6, 17], 2)];
  c.guideCircle(C0, 36);
  lobedFrame(c);
  for (const turn of fifths) c.fill("plum", toPath(flower, { k: 1, turn }));
  c.fill("plum", toPath([disc(centre, 7.3)], { k: 1 }));
};

export const uriNiChigaiTakanohaBuild = (c: Builder): void => {
  c.precision(3);
  lobedFrame(c);
  takanohaBuild(c, 49);
};
