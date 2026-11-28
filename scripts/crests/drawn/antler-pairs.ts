// Two branched antlers laid across each other, from the 1892 book. Coordinates are the page's, from its middle, for the antler on top.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, bowedArc, carve, mirrored, reversedRun, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { cutEndMarks, hatchArcs, hatchTicks } from "../library/cut-end.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

// The beam's cut end stands at the lower left, and four tines open to the upper right. Each edge is one arc between two of these points.
const CUT_UPPER: V = [-69.4, -53.3];
const CUT_LOWER: V = [-56.6, -68.7];
const HOOK_FOOT: V = [48, -24];
const HOOK_TIP: V = [62, -4];
const HOOK_NOTCH: V = [34, -8];
const SIDE_FOOT: V = [37, 0];
// The side tine and the main tine end bluntly: a short arc joins their two edges.
const SIDE_TIP_LOWER: V = [71, 33];
const SIDE_TIP_UPPER: V = [68, 37.5];
const SIDE_NOTCH: V = [46, 20];
const MAIN_TIP_RIGHT: V = [64, 63.5];
const MAIN_TIP_LEFT: V = [57, 67];
const MAIN_NOTCH: V = [18, 22];
const BROW_TIP: V = [26, 54];
const BROW_FOOT: V = [0, 22];

const antler = (paper: number): Region[] => {
  const mainEdge = bowedArc(SIDE_NOTCH, MAIN_TIP_RIGHT, -4);
  const outline: Region = [
    seg(CUT_UPPER, CUT_LOWER),
    bowedArc(CUT_LOWER, HOOK_FOOT, 2),
    bowedArc(HOOK_FOOT, HOOK_TIP, -2.5),
    bowedArc(HOOK_TIP, HOOK_NOTCH, 9),
    seg(HOOK_NOTCH, SIDE_FOOT),
    bowedArc(SIDE_FOOT, SIDE_TIP_LOWER, -7),
    bowedArc(SIDE_TIP_LOWER, SIDE_TIP_UPPER, -2),
    bowedArc(SIDE_TIP_UPPER, SIDE_NOTCH, -1.5),
    mainEdge,
    bowedArc(MAIN_TIP_RIGHT, MAIN_TIP_LEFT, -3),
    bowedArc(MAIN_TIP_LEFT, MAIN_NOTCH, -5),
    bowedArc(MAIN_NOTCH, BROW_TIP, 4.8),
    bowedArc(BROW_TIP, BROW_FOOT, -8),
    bowedArc(BROW_FOOT, CUT_UPPER, 10),
  ];
  const end = cutEndMarks(CUT_UPPER, CUT_LOWER, [0, 0], paper);
  const ticks = hatchTicks(mainEdge, [0.4, 0.49, 0.58, 0.67, 0.76, 0.85], [-6.5, -3], paper);
  const arcs = hatchArcs([43, 30], [13, 17, 21], 242 * DEG, 292 * DEG, paper);

  return carve([outline, end.face], [...end.cuts, ...ticks, ...arcs]);
};

export function chigaiTsunoBuild(c: Builder): void {
  c.precision(3);
  const upper = antler(PAPER);
  const lower = upper.map((loop) => reversedRun(loop.map(mirrored)));

  c.guideCircle(C0, R);
  layerParts(c, () => {
    fillPart(c, "horn", lower, { k: 1 });
    fillPart(c, "horn", upper, { k: 1 }, PAPER);
  });
}
