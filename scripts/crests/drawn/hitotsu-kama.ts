// 一つ鎌, as the 1892 crest book draws 一ッかま (frame 18, left page, second row, fourth column from the right): an upright sickle,
// its blade sweeping out to the left from the top of the handle, with a cord looped once to the right of the handle and twice to
// the left of it, one end hanging loose and the other through the eye. Built as the ringed sickle is, from the cell's own points in
// the book's pixels, every curve a circle struck through three of them.
import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, disc, lineLine, pieceStart, seg, thickArc, thickSeg, vdist } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

const motif = "sickle";
/** The cell's pixels to the page: the middle of the crest's box at (416, 733), its farthest point 160 out. */
const scale = 96 / 160;
const at = ([x, y]: V): V => [(x - 416) * scale, (733 - y) * scale];
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
  arc([500, 617.5], [415, 600], [295, 700]),
  arc([295, 700], [365, 637.5], [467.5, 632]),
  seg(at([467.5, 632]), at([467.5, 645])),
  seg(at([467.5, 645]), at([500, 645])),
  seg(at([500, 645]), at([500, 617.5])),
];
const back = arc([305, 693], [415, 608], [490, 624]);
const backLine = thickArc(back.c, back.r, PAPER, back.a0, back.a1);
const eye = at([482, 840]);
const grip = carve(
  [thickSeg(at([484, 632]), at([484, 850]), 32.5 * scale), disc(at([484, 850]), 16.25 * scale)],
  [disc(eye, 6 * scale), thickSeg(at([467, 637.5]), at([501, 637.5]), PAPER), thickSeg(at([467, 647.5]), at([501, 647.5]), PAPER)],
);

export const hitotsuKamaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle([100, 100], 96);
  c.group(() => layerParts(c, () => {
    // Behind the handle: the loop on its right, and the two runs that pass behind it.
    rope(c, arc([500, 672], [538, 690], [532, 728]));
    rope(c, arc([532, 728], [518, 752], [500, 758]));
    rope(c, arc([468, 735], [435, 717], [405, 722]));
    rope(c, arc([466, 762], [452, 780], [436, 800]));
    fillPart(c, motif, [blade, backLine], { k: 1 }, PAPER);
    fillPart(c, motif, grip, { k: 1 }, PAPER);
    // The loops to the left, the loose end, and the run through the eye.
    rope(c, arc([405, 722], [370, 704], [362, 722]), PAPER);
    rope(c, arc([362, 722], [385, 733], [402, 733]), PAPER);
    rope(c, arc([402, 733], [370, 760], [335, 777]), PAPER);
    rope(c, arc([436, 800], [398, 789], [392, 808]), PAPER);
    rope(c, arc([392, 808], [412, 813], [420, 805]), PAPER);
    rope(c, arc([420, 805], [445, 820], [482, 833]), PAPER);
  }));
};
