import type { Builder } from "../../construct/builder.ts";
import { RING_WEIGHT } from "../../construct/builder.ts";
import { carve, DEG, disc, vdist } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { leafLobedChrysanthemum } from "../library/leaf-lobed-chrysanthemum.ts";
import { PAPER } from "../library/part.ts";
import { petalFanBlade } from "../library/petal-fan-blade.ts";

const motif = "chrysanthemum";
const scale = 1.34;
const page = ([x, y]: Readonly<V>): V => [(x - 68) * scale, (65 - y) * scale];
const flower = page([68, 35]);
const root = page([68, 127]);
const rimRadius = 88.4;
const innerRadius = rimRadius - RING_WEIGHT["ring-thin"];
const leafSeat = 80;

/** Mark a point clockwise from the foot of the left rim. */
function rimPoint(angle: number, radius: number): V {
  const radians = angle * DEG;
  return [-radius * Math.sin(radians), -radius * Math.cos(radians)];
}

const leaves = [
  { station: 47, tip: [17.3, 46.5], bend: -64 },
  { station: 34, tip: [33, 77.7], bend: -17 },
  { station: 17, tip: [49, 88], bend: 7 },
] as const;

export function hashikiGikuBuild(c: Builder): void {
  c.precision(3);
  c.group(() => {
    // Strike the whole rim and leave its upper reach behind the flower head.
    c.guideCircle(C0, rimRadius);
    c.guideCircle(C0, innerRadius);
    const rim = carve([disc([0, 0], rimRadius)], [disc([0, 0], innerRadius), disc(flower, 76.4)]);
    fillPart(c, "frame", rim, { k: 1 });

    const span = vdist(flower, root);
    branchTaper.build(c, [0, (flower[1] + root[1]) / 2], 0, span, {
      motif, width: 4 / span, bend: 2.9 / span,
    });
    const shootLength = innerRadius - leafSeat + 1.9;
    for (const side of [1, -1]) {
      for (const { station } of leaves) {
        const [x, y] = rimPoint(station, innerRadius + .3 - shootLength / 2);
        branchTaper.build(c, [side * x, y], side * station, shootLength, {
          motif, width: 1.8 / shootLength, bend: .008,
        });
      }
    }
    layerParts(c, () => {
      for (const side of [1, -1]) {
        for (const { station, tip: mark, bend } of leaves) {
          const foot = rimPoint(station, leafSeat);
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
