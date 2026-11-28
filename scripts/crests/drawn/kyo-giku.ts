import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, circleThrough, DEG, disc, onCircle, shortArc, thickArc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { leafPinnate } from "../library/leaf-pinnate.ts";
import { PAPER } from "../library/part.ts";
import { petalFanBlade } from "../library/petal-fan-blade.ts";

const motif = "chrysanthemum";
const origin: V = [0, 0];
const radius = 90;
const side = onCircle(origin, radius, 190 * DEG);
const foot = onCircle(origin, radius, 255 * DEG);

function curved(a: V, b: V, proportion: number, hint: V) {
  return shortArc(circleThrough(a, b, Math.hypot(a[0] - b[0], a[1] - b[1]) * proportion, hint), a, b);
}

type RimMark = readonly [point: V, curvature: number];
type Vein = readonly [foot: V, tip: V, curvature: number, hint: V];

function blade(marks: readonly RimMark[], first: number, last: number, veins: readonly Vein[]): Region[] {
  const outline = marks.slice(0, -1).map(([point, curvature], index) =>
    curved(point, marks[index + 1][0], Math.abs(curvature), [curvature > 0 ? -92 : -6, 0]));
  outline.push(arcA(origin, radius, first * DEG, last * DEG));
  const cuts = veins.map(([a, b, proportion, hint]) => {
    const arc = curved(a, b, proportion, hint);
    if (arc.t !== "A") throw new Error("The leaf veins are bowed arcs");
    return thickArc(arc.c, arc.r, PAPER, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
  });
  return carve([outline], cuts);
}

const upper = blade([
  [onCircle(origin, radius, 90 * DEG), 1.75], [[-6, 69], 1.55], [[-17, 49], 1.5],
  [[-27, 38], 1.35], [[-47, 33], 1.2], [[-35, 33], 1.8], [[-18, 28], 1.6],
  [[-46, 16], 1.8], [[-66, 5], 1.8], [side, 2.1],
], 190, 90, [
  [[-16, 82], [-46, 74], 1.75, [-92, 45]], [[-24, 70], [-58, 60], 1.6, [-93, 36]],
  [[-32, 58], [-70, 49], 1.7, [-89, 11]], [[-45, 47], [-80, 37], 1.6, [-87, 9]],
  [[-58, 34], [-85, 26], 1.8, [-88, -8]], [[-72, 18], [-86, 12], 1.3, [-89, -10]],
  [[-48, 17], [-43, 27], 1.4, [-60, 28]], [[-62, 9], [-55, 22], 1.6, [-70, 23]],
]);
const lower = blade([
  [side, 1.37], [[-63, -31], 1.6], [[-49, -45], 1.2], [[-42, -61], 1.4],
  [[-36, -74], 1.2], [[-31, -78], 1.4], [foot, 1.5],
], 255, 190, [
  [[-74, -29], [-77, -43], 1.6, [-74, -53]], [[-59, -39], [-61, -59], 1.55, [-63, -58]],
  [[-49, -52], [-49, -70], 1.55, [-44, -66]], [[-38, -64], [-40, -76], 1.3, [-38, -74]],
]);

const footRim: Region = [
  arcA(origin, radius, 255 * DEG, 285 * DEG),
  curved(onCircle(origin, radius, 285 * DEG), foot, 1.31, [0, -136]),
];

export function kyoGikuBuild(c: Builder): void {
  c.precision(3);
  c.group(() => {
    for (const mirror of [false, true]) {
      fillPart(c, motif, upper, { k: 1, mirror });
      fillPart(c, motif, lower, { k: 1, mirror });
      const side = mirror ? 1 : -1;
      leafPinnate.build(c, [12.5 * side, -72.2], 40 * side, 25.5, { motif, width: .57 });
    }
    const bow = 11 * DEG;
    cordBand.build(c, [-49, 34.7], 101, 98 * bow / Math.sin(bow), {
      motif, width: 4.55, runs: [{ length: 1, bend: -22 }],
    });
    fillPart(c, motif, [footRim], { k: 1 });
    branchTaper.build(c, [0, -50], 0, 69, { motif, width: .055, bend: .015 });
    fillPart(c, motif, [disc([0, -17], 6.25)], { k: 1 });

    layerParts(c, () => {
      for (const main of [false, true]) {
        for (let station = 0; station < 24; station += 1) {
          if ((station % 6 === 0) !== main) continue;
          const angle = station * 15 * DEG;
          const dx = 65 * Math.sin(angle);
          const dy = 38 * Math.cos(angle);
          const full = Math.hypot(dx, dy);
          const length = full * (main ? 1 : .88) - 4.8;
          const reach = (4.8 + length / 2) / full;
          petalFanBlade.build(c, [dx * reach, -17 + dy * reach], Math.atan2(dx, dy) / DEG, length, {
            motif, width: main ? .185 : .155, keyline: PAPER,
          });
        }
      }
    });
  });
}
