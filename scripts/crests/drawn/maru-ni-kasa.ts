import type { Builder } from "../../construct/builder.ts";
import { DEG, arcA, circleThrough, disc, mirrored, onCircle, pieceStart, shortArc } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "conical-hat";
const crownLeft: V = [-15, 35];
const crownRight: V = [15, 35];
const leftEdge: V = [-75, -14];
const rightEdge: V = [75, -14];
type Arc = Extract<Piece, { t: "A" }>;

const crown: Region = [
  shortArc(circleThrough(leftEdge, crownLeft, 92, [-11, -45]), leftEdge, crownLeft),
  arcA([0, 35], 15, Math.PI, 0),
  shortArc(circleThrough(crownRight, rightEdge, 92, [11, -45]), crownRight, rightEdge),
  shortArc(circleThrough(rightEdge, leftEdge, (75 ** 2 + 19 ** 2) / 38, [0, -152]), rightEdge, leftEdge),
];

function band(c: Builder, arc: Arc, width: number, keyline = 0): void {
  const sweep = arc.a1 - arc.a0;
  const heading = arc.a0 + Math.sign(sweep) * Math.PI / 2;
  cordBand.build(c, pieceStart(arc), 90 - heading / DEG, Math.abs(sweep) * arc.r, {
    motif, width, paper: PAPER, runs: [{ length: 1, bend: -sweep / DEG }], keyline,
  });
}

export const maruNiKasaBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  c.group(() => layerParts(c, () => {
    const joint: V = [-22, 19];
    const loop = arcA(joint, 38, 217 * DEG, 340 * DEG) as Arc;
    const root = onCircle(joint, 38, 256 * DEG);
    const tip: V = [-50, -34];
    const tail = shortArc(circleThrough(root, tip, 30, [-49, -4]), root, tip) as Arc;
    const sides = [
      { sign: 1, tie: mirrored(loop) as Arc, tail: mirrored(tail) as Arc, end: [50, -34] as V, keyline: 0 },
      { sign: -1, tie: loop, tail, end: tip, keyline: PAPER },
    ];
    for (const { sign, tie, tail: loose, end, keyline } of sides) {
      band(c, tie, 5.4, keyline);
      band(c, loose, 3.8);
      fillPart(c, motif, [disc(end, 1.9)], { k: 1 });
      fanRib.build(c, [sign * 27, -17], -sign * 16, 24, { motif, rootWidth: 2.8, tipWidth: 2.8 });
      fanRib.build(c, [sign * 5, -13], sign * 50, 19, { motif, rootWidth: 2.6, tipWidth: 2.6 });
    }
    fillPart(c, motif, [crown], { k: 1 });
  }));
};
