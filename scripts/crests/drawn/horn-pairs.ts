// Two cut horns laid across each other, from the 1892 book. Coordinates are the page's, from its middle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { hornCut } from "../library/horn-cut.ts";

// The horn that lies on top runs from its cut end at the lower left to its point at the upper right.
const CUT_END = [-67, -52.5] as const;
const POINT = [71, 64] as const;

export function oriawaseTsunoBuild(c: Builder): void {
  c.precision(3);
  const across = POINT[0] - CUT_END[0];
  const up = POINT[1] - CUT_END[1];
  const length = Math.hypot(across, up);
  const turn = Math.atan2(across, up) * 180 / Math.PI;
  const middle = [(CUT_END[0] + POINT[0]) / 2, (CUT_END[1] + POINT[1]) / 2] as const;
  const horn = { motif: "horn", width: 0.18, bend: 0.125 };

  c.guideCircle(C0, R);
  layerParts(c, () => {
    hornCut.build(c, [-middle[0], middle[1]], -turn, length, { ...horn, bend: -horn.bend, ticks: [[0.25, 4, "left"], [0.5, 2, "right"], [0.7, 3, "left"], [0.82, 2, "left"]] });
    hornCut.build(c, [middle[0], middle[1]], turn, length, { ...horn, keyline: PAPER });
  });
}
