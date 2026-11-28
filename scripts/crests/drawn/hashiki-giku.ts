import type { Builder } from "../../construct/builder.ts";
import { DEG, disc, vdist } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { leafLobedChrysanthemum } from "../library/leaf-lobed-chrysanthemum.ts";
import { PAPER } from "../library/part.ts";
import { petalFanBlade } from "../library/petal-fan-blade.ts";

const motif = "chrysanthemum";
const scale = 1.34;
const page = ([x, y]: Readonly<V>): V => [(x - 68) * scale, (65 - y) * scale];
const flower = page([68, 35]);
const root = page([68, 127]);
const rootRadius = 55 * scale;

/** All leaf feet are marked on the same curved basal stem. */
function leafFoot(angle: number): V {
  const radians = angle * DEG;
  return [-rootRadius * Math.sin(radians), root[1] + rootRadius * (1 - Math.cos(radians))];
}

const leaves = [
  { station: 53, tip: [9, 42], bend: 33 },
  { station: 34, tip: [28, 74], bend: 14 },
  { station: 17, tip: [49, 88], bend: 7 },
] as const;

export function hashikiGikuBuild(c: Builder): void {
  c.precision(3);
  c.group(() => {
    const span = vdist(flower, root);
    branchTaper.build(c, [0, (flower[1] + root[1]) / 2], 0, span, {
      motif, width: 4 / span, bend: 2.9 / span,
    });
    layerParts(c, () => {
      for (const side of [1, -1]) {
        for (const { station, tip: mark, bend } of leaves) {
          const foot = leafFoot(station);
          const tip = page(mark);
          const dx = tip[0] - foot[0];
          const dy = tip[1] - foot[1];
          const halfSweep = bend * DEG / 2;
          const size = Math.hypot(dx, dy) * halfSweep / Math.sin(halfSweep);
          const turn = Math.atan2(dx, dy) / DEG - bend / 2;
          leafLobedChrysanthemum.build(c, [side * foot[0], foot[1]], side * turn, size, {
            motif, profile: "narrow", bend, mirror: side < 0, paper: PAPER, keyline: PAPER,
          });
        }
        const sweep = 56;
        cordBand.build(c, root, -90 * side, rootRadius * sweep * DEG, {
          motif, width: 3.8, runs: [{ length: 1, bend: side * sweep }],
        });
      }
    });

    layerParts(c, () => {
      // Keep the approved 24-petal head at its measured stations.
      for (let station = 0; station < 24; station += 1) {
        const theta = station * 15 * DEG;
        const dx = 80 * Math.sin(theta);
        const dy = 43 * Math.cos(theta);
        const length = Math.hypot(dx, dy);
        const mid = (length + 3) / (2 * length);
        petalFanBlade.build(c, [flower[0] + dx * mid, flower[1] + dy * mid], Math.atan2(dx, dy) / DEG,
          length - 3, { motif, width: .164, keyline: PAPER });
      }
      fillPart(c, motif, [disc(flower, 5.7)], { k: 1 });
    });
  });
}
