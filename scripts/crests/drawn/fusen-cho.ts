import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { butterflyBody } from "../library/butterfly-body.ts";
import { fusenWing } from "../library/fusen-wing.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const centre: V = [0, 0];
const motif = "butterfly";
const wingSpan = (329 - 174) * .59;
const bodyLength = (313 - 143) * .59;

export function fusenChoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    fusenWing.build(c, centre, 0, wingSpan, { motif, paper: PAPER });
    fusenWing.build(c, centre, 0, wingSpan, { motif, paper: PAPER, mirror: true });
    butterflyBody.build(c, centre, 0, bodyLength, { motif, paper: PAPER });
  }));
}
