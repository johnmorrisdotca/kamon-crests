import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { bizenButterflyBody } from "../library/butterfly-body-bizen.ts";
import { bizenButterflyWing } from "../library/butterfly-wing-bizen.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const centre: V = [0, 0];
const motif = "butterfly";

export function bizenChoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    for (const mirror of [false, true]) {
      bizenButterflyWing.build(c, centre, 0, (312 - 160) * .615, { motif, mirror, paper: PAPER });
    }
    bizenButterflyBody.build(c, centre, 0, (326 - 84) * .615, { motif, paper: PAPER, keyline: PAPER });
  }));
}
