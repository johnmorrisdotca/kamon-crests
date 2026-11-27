import type { Builder } from "../construct/builder.ts";
import { berry } from "../crests/library/berry.ts";
import { layerParts } from "../crests/library/layers.ts";

export function singlePlacement(c: Builder): void {
  berry.build(c, [0, 0], 0, 4, { motif: "nanten" });
}

export function repeatedPlacement(c: Builder): void {
  c.precision(3);
  c.group(() => layerParts(c, () => {
    for (let row = 0; row < 7; row += 1) {
      for (let column = 0; column < 12; column += 1) {
        berry.build(c, [-77 + column * 14, 60 - row * 20], 0, 4, { motif: "nanten" });
      }
    }
  }));
}
