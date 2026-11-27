import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { layerParts } from "./mitsuba-gashiwa-parts/layers.ts";
import { leafOak } from "./mitsuba-gashiwa-parts/leaf-oak.ts";

const paper = 1.15;
const root: V = [0, -38];
const foot: V[] = [[-10, -72], [-14, -51], [-24, -37], [0, -40], [24, -37], [14, -51], [10, -72]];
const husk = [
  seg(foot[0], foot[1]),
  shortArc(circleThrough(foot[1], foot[2], 27, [-30, -62]), foot[1], foot[2]),
  seg(foot[2], foot[3]),
  seg(foot[3], foot[4]),
  shortArc(circleThrough(foot[4], foot[5], 27, [30, -62]), foot[4], foot[5]),
  seg(foot[5], foot[6]),
  seg(foot[6], foot[0]),
];

function placeLeaf(c: Builder, turn: number, size: number): void {
  const angle = turn * DEG;
  const centre: V = [root[0] + Math.sin(angle) * size / 2, root[1] + Math.cos(angle) * size / 2];
  leafOak.build(c, centre, turn, size, { motif: "oak", paper, keyline: paper });
}

export function mitsubaGashiwaBuild(c: Builder): void {
  c.precision(3);
  c.fill("oak", toPath([husk], { k: 1 }));
  c.group(() => layerParts(c, () => {
    placeLeaf(c, -62, 100);
    placeLeaf(c, 62, 100);
    placeLeaf(c, 0, 122);
  }));
}
