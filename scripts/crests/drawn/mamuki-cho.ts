import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { frontButterflyBody } from "../library/butterfly-body-facing.ts";
import { butterflyFoot } from "../library/butterfly-foot.ts";
import { frontButterflyWing } from "../library/butterfly-wing-facing.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const centre: V = [0, 0];
const motif = "butterfly";
const footPosition: V = [(179 - 158) * .61, (155 - 253) * .61];
const feet: readonly V[] = [[0, 0], [9.5, -1], [18.3, -2.8]];
const wingSpan = (306 - 158) * .61;
const bodyLength = (309 - 5) * .61;
const footLength = (283 - 250) * .61;

export function mamukiChoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    for (const mirror of [false, true]) {
      frontButterflyWing.build(c, centre, 0, wingSpan, { motif, mirror, paper: PAPER });
      for (const [x, y] of feet) {
        const at: V = [(mirror ? -1 : 1) * (footPosition[0] + x), footPosition[1] + y];
        butterflyFoot.build(c, at, 0, footLength, { motif, mirror, keyline: PAPER, paper: PAPER });
      }
    }
    frontButterflyBody.build(c, centre, 0, bodyLength, { motif, paper: PAPER });
  }));
}
