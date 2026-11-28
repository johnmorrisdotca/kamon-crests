import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, disc, lineLine, pieceStart, seg, thickArc, thickSeg, vdist } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "sickle";
const scale = .6;
const at = ([x, y]: V): V => [(x - 168) * scale, (160 - y) * scale];
type Arc = Extract<Piece, { t: "A" }>;

function bisector(a: V, b: V): [V, V] {
  const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return [mid, [mid[0] - b[1] + a[1], mid[1] + b[0] - a[0]]];
}

/** Strike one circle through three points along the path found in the cell. */
function arc(start: V, middle: V, end: V): Arc {
  const a = at(start);
  const m = at(middle);
  const b = at(end);
  const centre = lineLine(...bisector(a, m), ...bisector(m, b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: vdist(centre, a) }, a, b, cross > 0) as Arc;
}

function rope(c: Builder, run: Arc, keyline = 0): void {
  const sweep = run.a1 - run.a0;
  const heading = run.a0 + Math.sign(sweep) * Math.PI / 2;
  cordBand.build(c, pieceStart(run), 90 - heading / DEG, Math.abs(sweep) * run.r, {
    motif, width: 4.6, paper: PAPER, seam: true, keyline, runs: [{ length: 1, bend: -sweep / DEG }],
  });
}

const blade = [
  seg(at([123, 132]), at([121, 92])),
  arc([121, 92], [172, 62], [286, 115]),
  arc([286, 115], [208, 96], [148, 111]),
  seg(at([148, 111]), at([148, 132])),
  seg(at([148, 132]), at([123, 132])),
];
const cut = arc([151, 103], [209, 84], [273, 103]);
const cuttingLine = thickArc(cut.c, cut.r, PAPER, cut.a0, cut.a1);
const eye = at([146, 255]);
const grip = carve(
  [thickSeg(at([137, 124]), at([137, 268]), 28 * scale), disc(at([137, 268]), 14 * scale)],
  [disc(eye, 5.2), thickSeg(at([126, 132]), at([148, 132]), PAPER), thickSeg(at([126, 139]), at([148, 139]), PAPER)],
);

export const maruNiHitotsuKamaBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  c.group(() => layerParts(c, () => {
    rope(c, arc([131, 246], [92, 212], [130, 180]));
    rope(c, arc([143, 214], [185, 219], [211, 246]));
    rope(c, arc([146, 181], [218, 184], [248, 132]));
    rope(c, arc([130, 143], [90, 175], [132, 214]), PAPER);
    fillPart(c, motif, [blade, cuttingLine], { k: 1 }, PAPER);
    fillPart(c, motif, grip, { k: 1 }, PAPER);
    rope(c, arc([149, 255], [186, 197], [149, 145]), PAPER);
  }));
};
