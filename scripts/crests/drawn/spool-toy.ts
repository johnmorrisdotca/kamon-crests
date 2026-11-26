import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]) => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const spool = polygon([[-50.5, 80], [50.5, 80], [7.2, 0], [50.5, -80], [-50.5, -80], [-7.2, 0]]);

export function ryugoBuild(c: Builder): void {
  c.guideCircle(C0, R);
  c.fill("spool-toy", toPath([spool], { k: 1 }));
}

export function maruNiRyugoBuild(c: Builder): void {
  c.ring("ring-thin");
  c.fill("spool-toy", toPath([spool], { k: 0.85 }));
}
