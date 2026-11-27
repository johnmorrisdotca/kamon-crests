import type { Builder } from "../../construct/builder.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { budRound } from "./kiku-zuru-parts/bud-round.ts";
import { calyxCup } from "./kiku-zuru-parts/calyx-cup.ts";
import { craneNeck } from "./kiku-zuru-parts/crane-neck.ts";
import { layerParts } from "./kiku-zuru-parts/layers.ts";
import { petalFanBlade } from "./kiku-zuru-parts/petal-fan-blade.ts";

const paper = 1;
const point = ([x, y]: V): V => [(x - 102) * .93, (97 - y) * .895];

// Each petal ends at its own tip; the narrower paper gaps lead back toward one cup.
const petals: readonly (readonly [V, V])[] = [
  [[78, 110], [8, 79]], [[85, 108], [27, 72]], [[91, 106], [48, 63]],
  [[97, 104], [66, 57]], [[100, 102], [82, 56]], [[104, 102], [110, 47]],
  [[113, 109], [157, 74]], [[122, 112], [176, 81]], [[129, 116], [197, 89]],
];

function petalPlacement(root: V, tip: V) {
  const a = point(root);
  const b = point(tip);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const centre: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

  return { centre, turn: Math.atan2(dx, dy) * 180 / Math.PI, size: Math.hypot(dx, dy) };
}

export function kikuZuruBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    craneNeck.build(c, point([77, 132]), 0, 95.8, { motif: "crane" });
    const buds: readonly (readonly [V, V, number])[] = [[[98, 80.6], [147, 43], 6.35], [[94, 102.2], [173, 51], 7.5]];
    for (const [root, tip, radius] of buds) {
      const { turn, size } = petalPlacement(root, tip);
      budRound.build(c, point(tip), turn, radius, { motif: "chrysanthemum", seams: 2, stalkLength: size - radius, paper });
    }
    for (const [root, tip] of petals) {
      const { centre, turn, size } = petalPlacement(root, tip);
      petalFanBlade.build(c, centre, turn, size, { motif: "chrysanthemum", width: .27, keyline: paper });
    }
    calyxCup.build(c, point([103, 110]), -4, 24, { motif: "chrysanthemum", keyline: paper });
  }));
}
