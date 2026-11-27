import type { Builder } from "../../construct/builder.ts";
import { C0, R, polar } from "../../construct/geo.ts";
import { DEG, carve, carveWhere, disc, rotated, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Region } from "../../construct/compass.ts";
import { HANABISHI_SIDE, hanabishiBuild } from "./hanabishi.ts";

const part = "flower-lozenge";

export function itowaNiHanabishiBuild(c: Builder): void {
  c.ring("ring-thread");
  hanabishiBuild(c, part, 82);
}
