// Pear forms measured from frame 24 of the 1892 book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversed, rotated, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const pearArc = (from: V, to: V, r: number, hint: V) => shortArc(circleThrough(from, to, r, hint), from, to);
const turnPear = (region: Region, turn: number): Region => region.map((piece) => rotated(piece, turn * DEG));

const pearLobe = (reach: number, halfWidth: number): Region => {
  const shoulder: V = [halfWidth, reach * 0.78];
  const tip: V = [0, reach];
  const root: V = [0, 6.6];
  const half = [
    pearArc(root, shoulder, reach * 1.32, [-reach * 0.91, reach * 0.65]),
    pearArc(shoulder, tip, halfWidth * 1.29, [-halfWidth * 0.22, reach * 0.82]),
  ];
  return [...half, ...half.map(mirrored).reverse().map(reversed)];
};

const pearRadial = (axial: number[], diagonal: number): Region[] => {
  const cuts: Region[] = [disc([0, 0], 13.4)];
  const ink: Region[] = [];
  for (let i = 0; i < 8; i += 1) {
    const length = i % 2 ? diagonal : axial[i / 2];
    const width = i % 2 ? 12.25 : 19.35;
    ink.push(turnPear(pearLobe(length, width), 45 * i));
    cuts.push(turnPear(thickSeg([0, 13], [0, length * 0.64], i % 2 ? 1.9 : 2.15), 45 * i));
  }
  return [...carve(ink, cuts), disc([0, 0], 11.55)];
};

/** Four long and four shorter lobes open around a small round core. */
export const nashiNoKiriguchiBuild = (c: Builder, reach = 96): void => {
  c.precision(3);
  c.guideCircle(C0, reach);
  c.guideSpokes(8, 0, reach);
  c.fill("pear-section", toPath(pearRadial([96, 96, 96, 96], 62.4), { k: reach / 96 }));
};
