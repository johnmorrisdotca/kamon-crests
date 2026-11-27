import type { Builder } from "../../construct/builder.ts";
import { DEG, vdist } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { layerParts } from "../library/layers.ts";
import { leafMaple } from "../library/leaf-maple.ts";

const paper = 1.15;
// Centre the print within the outer guide while preserving the measured scale.
const point = ([x, y]: V): V => [(x - 102) * .88 - 3, (96 - y) * .88 + 5];

function twig(c: Builder, from: V, to: V, width: number, bow: number): void {
  const a = point(from);
  const b = point(to);
  const span = vdist(a, b);
  const middle: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const turn = Math.atan2(b[0] - a[0], b[1] - a[1]) / DEG;

  branchTaper.build(c, middle, turn, span, { motif: "maple", width: width / span, bend: bow / span });
}

export function edaMomijiBuild(c: Builder): void {
  c.precision(3);
  c.group(() => layerParts(c, () => {
    twig(c, [179, 179], [32, 167], 5.2, 8);
    twig(c, [177, 179], [193, 163], 5, -2.7);
    twig(c, [112, 163.5], [82, 180], 4.2, -2);
    twig(c, [120, 166], [105, 134], 4.6, 2.2);
    twig(c, [88, 100], [63, 11], 5.1, 0);
    const up = (y: number): V => [63 + (y - 11) * 25 / 89, y];
    twig(c, up(45), [94, 29], 3.9, -3);
    twig(c, up(50), [56, 41], 3.4, 2.2);
    twig(c, up(67), [95, 58], 3.1, -2.2);
    twig(c, up(89), [26, 85], 3.3, -4);
    leafMaple.build(c, point([62, 81]), -60, 52, { motif: "maple", paper, lobes: 5, folded: "right", spread: .72 });
    leafMaple.build(c, point([106, 125]), 0, 66, { motif: "maple", paper, stalk: false });
  }));
}
