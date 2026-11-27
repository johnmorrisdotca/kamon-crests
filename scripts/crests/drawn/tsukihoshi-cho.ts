import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { knottedButterflyHead } from "../library/butterfly-head-knotted.ts";
import { moonButterflyWing } from "../library/butterfly-wing-moon.ts";
import { layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";
import { petal } from "../library/petal.ts";

const p = (x: number, y: number): V => [(x - 178) * .61, (163 - y) * .61];
const centre: V = [0, 0];
const motif = "butterfly";
const line = { motif, paper: PAPER, keyline: PAPER };

export function tsukihoshiChoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    for (const mirror of [false, true]) {
      moonButterflyWing.build(c, centre, 0, (334 - 178) * .61, { motif, paper: PAPER, mirror });
    }
    leafLens.build(c, p(178, 270), 180, 39, { ...line, width: .43, midrib: false });
    leafLens.build(c, p(178, 294), 180, 26, { ...line, width: .53, midrib: false });
    knottedButterflyHead.build(c, p(178, 228), 180, 15.4, line);
    for (const side of [-1, 1]) {
      leafLens.build(c, p(178 + side * 31, 38), side * 116, 28, { ...line, width: .37 });
      leafLens.build(c, p(178 + side * 23, 52), side * 110, 22, { ...line, width: .35 });
      petal.build(c, p(178 + side * 18, 91), side * 16, 22, { ...line, width: .57 });
    }
    leafLens.build(c, p(178, 39), 180, 24, { ...line, width: .46, midrib: false });
    leafLens.build(c, p(178, 62), 180, 23, { ...line, width: .45, midrib: false });
    leafLens.build(c, p(178, 83), 180, 20, { ...line, width: .41, midrib: false });
    knottedButterflyHead.build(c, p(178, 112), 0, 24.5, line);
  }));
}
