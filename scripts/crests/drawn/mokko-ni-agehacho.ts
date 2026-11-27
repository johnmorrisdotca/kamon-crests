import type { Builder } from "../../construct/builder.ts";
import { disc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { butterflyFoot } from "../library/butterfly-foot.ts";
import { cordBand } from "../library/cord-band.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { quinceLobe } from "../library/quince-lobe.ts";
import { swallowtailForewing } from "../library/swallowtail-forewing.ts";
import { swallowtailHead } from "../library/swallowtail-head.ts";
import { swallowtailHindwing } from "../library/swallowtail-hindwing.ts";

const p = (x: number, y: number): V => [(x - 166) * .61, (169 - y) * .61];
const centre: V = [0, 0];
const motif = "butterfly";
const ring = 66 - PAPER / 2;
const footRoot = p(181, 215);
const footOffsets: readonly V[] = [[0, 0], [11, 5], [22, 8]];

export function mokkoNiAgehachoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => {
    for (let i = 0; i < 5; i += 1) {
      quinceLobe.build(c, centre, i * 72, R, { motif: "frame", innerRadius: 66 + PAPER / 2, paper: PAPER });
    }
    c.fill("frame", toPath([disc(centre, ring), disc(centre, ring - 2.45)], { k: 1 }), "evenodd");
  });
  c.group(() => layerParts(c, () => {
    swallowtailForewing.build(c, centre, 0, (219 - 143) * .61, { motif, pose: "folded", paper: PAPER });
    swallowtailHindwing.build(c, centre, 0, (229 - 92) * .61, { motif, paper: PAPER });
    swallowtailForewing.build(c, centre, 0, (223 - 84) * .61, { motif, paper: PAPER, keyline: PAPER });
    cordBand.build(c, p(134, 148), -8, 38.4, {
      motif, paper: PAPER, width: 1.75, runs: [{ length: 7.3 }, { length: 25, bend: -150 }, { length: 6.1, bend: -138 }],
    });
    cordBand.build(c, p(123, 214), -34, 35.35, {
      motif, paper: PAPER, width: 1.65, runs: [{ length: 21.75 }, { length: 9.8, bend: -170 }, { length: 3.8, bend: -135 }],
    });
    for (const [x, y] of footOffsets) {
      butterflyFoot.build(c, [footRoot[0] + x, footRoot[1] + y], -25, 15.7, { motif, paper: PAPER, keyline: PAPER });
    }
    swallowtailHead.build(c, p(157, 234), 0, (258 - 212) * .61, { motif, paper: PAPER, keyline: PAPER });
  }));
}
