import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, rotated, shortArc, thickArc } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./mitsuba-kaji-no-ha-parts/layers.ts";
import { scallopedMulberryLeaf } from "./mitsuba-kaji-no-ha-parts/scalloped-mulberry-leaf.ts";

const paper = 1.15;
const motif = "paper-mulberry";
const offset = 49.6;
const turns = [0, 120, 240];

function stalkBand(width: number): Region {
  const root: V = [0, 29];
  const tip: V = [-16.5, -10.8];
  const arc = shortArc(circleThrough(root, tip, 48.5, [-42, 7]), root, tip) as Extract<Piece, { t: "A" }>;
  return thickArc(arc.c, arc.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

const crossedStalk = carve([stalkBand(4.8)], [stalkBand(4.8 + 2 * paper).map((piece) => rotated(piece, 120 * DEG))]);

export function mitsubaKajiNoHaBuild(c: Builder): void {
  c.precision(2);
  c.group(() => {
    for (const turn of turns) fillPart(c, motif, crossedStalk, { k: 1, turn });
    for (const turn of turns) {
      const centre: V = [offset * Math.sin(turn * DEG), offset * Math.cos(turn * DEG)];
      scallopedMulberryLeaf.build(c, centre, turn, .398 * 100, { motif, paper, stalkFoot: -71 });
    }
  });
}
