import type { Builder } from "../../construct/builder.ts";
import { DEG } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { knottedButterflyHead } from "../library/butterfly-head-knotted.ts";
import { diamondButterflyWing } from "../library/butterfly-wing-diamond.ts";
import { layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

const centre: V = [0, 0];
const motif = "butterfly";
const p = (x: number, y: number): V => [(x - 187.5) * .62, (154 - y) * .62];

function turned([x, y]: V, turn: number): V {
  const a = turn * DEG;
  return [x * Math.cos(a) + y * Math.sin(a), -x * Math.sin(a) + y * Math.cos(a)];
}

export function fusenChoBishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 180]) {
    c.group(() => layerParts(c, () => {
      for (const mirror of [false, true]) {
        diamondButterflyWing.build(c, centre, turn, (342 - 187.5) * .62, { motif, mirror, paper: PAPER });
      }
      leafLens.build(c, turned(p(187.5, 48), turn), turn, 27.5, { motif, width: .33, paper: PAPER, keyline: PAPER });
      leafLens.build(c, turned(p(187.5, 92), turn), turn, 38, { motif, width: .38, paper: PAPER, keyline: PAPER });
      knottedButterflyHead.build(c, turned(p(187.5, 132), turn), turn, 22.5, { motif, paper: PAPER, keyline: PAPER });
    }));
  }
}
