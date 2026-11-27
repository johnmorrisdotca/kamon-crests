import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, moved, onCircle, reversedRun, rotated, seg, shortArc, thickArc, thickSeg,
} from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

const motif = "bag";
const mirror = (region: Region): Region => region.map(mirrored);
const polygon = (corners: V[]): Region =>
  corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));

const waist: V = [0, 20];
const shoulder = onCircle([-31, 30], 31.8, 147 * DEG);
const join: V = [-31, 61.8];
const crown: V = [0, Math.sqrt(92 ** 2 - 31 ** 2) - 30.2];
const leftLip = [
  shortArc(circleThrough(waist, shoulder, 70, [-25, 80]), waist, shoulder),
  shortArc({ c: [-31, 30], r: 31.8 }, shoulder, join),
  shortArc({ c: [-31, -30.2], r: 92 }, join, crown),
];
const bagMouth = [...leftLip, ...reversedRun(mirror(leftLip))];

const bagBody = polygon([[-43, 20], [43, 20], [43, -47], [0, -76], [-43, -47]]);
const seam = thickSeg([0,19], [0,-77], PAPER);
const curl = [
  thickArc([0, 0], 6.6, PAPER, 54 * DEG, 2 * Math.PI),
  thickArc([3.3, 0], 3.3, PAPER, 0, 215 * DEG),
];
const pattern = [-4, -20.5, -37, -53.5, -70].flatMap((y, row) =>
  [-36, -21, -8.2].flatMap((x, col) => {
    const at: V = [x, y + Math.max(0, -x - 14) * .61];
    const turn = ((row + col) % 2 === 0 ? 21 : 201) * DEG;
    const left = curl.map((region) => region.map((piece) => moved(rotated(piece, turn), at)));
    return [...left, ...left.map(mirror)];
  }));

function loop(c: Builder, start: V, turn: number, length: number, radius: number, bend: number, width: number): void {
  const sweep = radius * Math.PI;
  cordBand.build(c, start, turn, 2 * length + sweep, {
    motif, width, paper: PAPER, keyline: PAPER, seam: true,
    runs: [{ length }, { length: sweep, bend }, { length }],
  });
}

export const chuwaNiTachiFukuroBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-medium");
  c.group(() => layerParts(c, () => {
    fillPart(c, motif, carve([bagBody], [seam, ...pattern]), { k: 1 });
    fillPart(c, motif, [bagMouth], { k: 1 }, PAPER);
    for (const side of [-1, 1]) {
      leafLens.build(c, [side * 10, 43], side * 25, 32, { motif, keyline: PAPER, paper: PAPER, width: .22 });
      leafLens.build(c, [side * 25, 44], side * 39, 29, { motif, keyline: PAPER, paper: PAPER, width: .24 });

      loop(c, [side * 3, 19], side * 90, 43, 4.95, -side * 180, 3.6);
      loop(c, [side * 3, 21], side * 86, 24, 3.25, -side * 180, 2.85);
      loop(c, [side * 1.5, 18], side * 148, 28, 4.55, side * 180, 3.6);
      loop(c, [side * 2, 16], side * 166, 25, 3.35, side * 180, 2.85);
    }

    leafLens.build(c, [0, 44], 0, 27, { motif, keyline: PAPER, paper: PAPER, width: .225 });
    fillPart(c, motif, [disc([0,23],6.4), disc([0,23],2.85)], { k: 1 }, PAPER);
  }));
};
