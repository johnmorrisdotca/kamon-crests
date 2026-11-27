import type { Builder } from "../../construct/builder.ts";
import { curvedMulberryLeaf, mulberryStalk } from "./daki-kaji-no-ha-parts/curved-mulberry-leaf.ts";
import { fillPart, layerParts } from "./daki-kaji-no-ha-parts/layers.ts";

export function dakiKajiNoHaBuild(c: Builder): void {
  const motif = "paper-mulberry";
  const paper = 1.15;
  c.precision(2);
  c.group(() => layerParts(c, () => {
    for (const mirror of [false, true]) {
      fillPart(c, motif, [mulberryStalk], { k: 1, mirror }, mirror ? paper : 0);
      curvedMulberryLeaf.build(c, [0, 0], 0, 100, { motif, paper, mirror });
    }
  }));
}
