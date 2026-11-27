import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { V } from "../../construct/compass.ts";
import { paulowniaLeaf } from "./kiri.ts";

export function hanaKiriGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const leaves = paulowniaLeaf(false);
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const theta = turn * DEG;
    const at: V = [7.4 * Math.sin(theta), 7.4 * Math.cos(theta)];
    c.fill("paulownia", toPath(leaves, { k: 0.94, at, turn: turn + 180 }));
  }
  c.fill("paulownia", toPath([disc([0, 0], 10.6)], { k: 1 }));
}
