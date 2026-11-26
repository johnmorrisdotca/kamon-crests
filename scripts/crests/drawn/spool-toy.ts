import type { Builder } from "../../construct/builder.ts";
import { seg, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

export function ryugoBuild(c: Builder): void {
  c.guideCircle(C0, R);
  const points: V[] = [[-50.5, 80], [50.5, 80], [7.2, 0], [50.5, -80], [-50.5, -80], [-7.2, 0]];
  const outline = points.map((point, i) => seg(point, points[(i + 1) % points.length]));
  c.fill("spool-toy", toPath([outline], { k: 1 }));
}
