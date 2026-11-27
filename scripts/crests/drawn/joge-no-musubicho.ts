import type { Builder } from "../../construct/builder.ts";
import { DEG } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { knottedButterflyHead } from "../library/butterfly-head-knotted.ts";
import { knottedButterflyWing } from "../library/butterfly-wing-knotted.ts";
import { cordBand } from "../library/cord-band.ts";
import { layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

const centre: V = [0, 0];
const motif = "butterfly";
const p = (x: number, y: number): V => [(x - 176) * .61, (167 - y) * .61];

function placed([x, y]: V, turn: number): V {
  const angle = turn * DEG;
  return [x * Math.cos(angle) + y * Math.sin(angle), -x * Math.sin(angle) + y * Math.cos(angle)];
}

export function jogeMusubichoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 180]) {
    c.group(() => layerParts(c, () => {
      for (const mirror of [false, true]) {
        knottedButterflyWing.build(c, centre, turn, (330 - 176) * .61, { motif, mirror, paper: PAPER });
      }
      leafLens.build(c, placed(p(176, 54), turn), turn, 51, { motif, width: .26, paper: PAPER, keyline: PAPER });
      knottedButterflyHead.build(c, placed(p(176, 104), turn), turn, (118 - 91) * .61, { motif, paper: PAPER, keyline: PAPER });
      for (const side of [-1, 1]) {
        const at = placed(p(176 + side * 13, 112), turn);
        cordBand.build(c, at, turn + side * 149, 37.8, {
          motif, width: 2.68, paper: PAPER,
          runs: [{ length: 26.6, bend: side * 31 }, { length: 11.2, bend: side * 162 }],
        });
      }
    }));
  }
}
