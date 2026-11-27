import type { Builder } from "../../construct/builder.ts";
import {
  DEG, arcA, carve, disc, mirrored, onCircle, moved, reversedRun, rotated, seg, shortArc, thickSeg,
} from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart } from "../library/layers.ts";
import { leafLensOutline } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

const motif = "round-fan";
const halfLength = 58;
const centreY = 25;
const radius = 21;
const dip = 8.5;
const quarter = halfLength / 2;
const bend = (quarter ** 2 + (dip / 2) ** 2) / dip;
const turn = 28.5;
const pose = { k: 1, turn };
const point = ([x, y]: V): V => [
  x * Math.cos(turn * DEG) + y * Math.sin(turn * DEG),
  y * Math.cos(turn * DEG) - x * Math.sin(turn * DEG),
];

function panel(inset: number): Region {
  const left: V = [-halfLength, centreY];
  const r = radius - inset;
  const top = centreY + r;
  const high: V = [-halfLength, top];
  const join: V = [-quarter, top - dip / 2];
  const low: V = [0, top - dip];
  const leftTop: Region = [
    shortArc({ c: [-halfLength, top - bend], r: bend }, high, join),
    shortArc({ c: [0, low[1] + bend], r: bend }, join, low),
  ];
  return [
    arcA(left, r, -Math.PI / 2, -3 * Math.PI / 2), ...leftTop, ...reversedRun(leftTop.map(mirrored)),
    arcA([halfLength, centreY], r, Math.PI / 2, -Math.PI / 2), seg([halfLength, centreY - r], [-halfLength, centreY - r]),
  ];
}

/** One unit is placed at an angle within each fan face before the layout turns. */
function place(parts: Region[], centre: V, angle: number, size: number): Region[] {
  const scaled = ([x, y]: V): V => [x * size, y * size];
  return parts.map((region) => region.map((piece) => {
    const edge = piece.t === "L"
      ? seg(scaled(piece.a), scaled(piece.b))
      : arcA(scaled(piece.c), piece.r * size, piece.a0, piece.a1);
    return moved(rotated(edge, -angle * DEG), centre);
  }));
}

const pineSize = 1.35;
const pineTurn = -77;
const pine = carve([
  disc([-5.25, 1.35], 4.45), disc([0, 3.35], 4.4), disc([5.25, 1.35], 4.45),
  thickSeg([-5.2, -.5], [5.2, -.5], 4.2),
  thickSeg([0, -1.5], [0, -7.2], 2.5),
  thickSeg([0, -5.8], [-3.7, -8.3], 2.15), disc([-3.7, -8.3], 1.075),
  thickSeg([0, -5.8], [3.7, -8.3], 2.15), disc([3.7, -8.3], 1.075),
], []);
const needleWidth = PAPER / pineSize;
const needles = carve([
  thickSeg([-6.5, -1.15], [6.5, -1.15], needleWidth),
  ...[-5.6, -2.8, 0, 2.8, 5.6].map((x) =>
    thickSeg([x, -1.12], [1.1 * x, 4.35], needleWidth)),
], []);
const pineSites: V[] = [-53, -26.5, 0, 26.5, 53].map((x) => [x, 24.8 + Math.abs(x) * .055]);
const pineOutlines = pineSites.flatMap((centre) => place(pine, centre, pineTurn, pineSize));
const pineMarks = pineSites.flatMap((centre) => place(needles, centre, pineTurn, pineSize));

const leafSize = 15.4;
const leaf = leafLensOutline(.31);
const vein = thickSeg([0, -.31], [0, .35], PAPER / leafSize);
const leafSites = [-51, -25.5, 0, 25.5, 51].flatMap((x) => [-125, -69, -13, 43, 99].map((direction) => ({
  at: onCircle([x, -28], leafSize / 2 - .4, (90 - direction) * DEG), direction,
})));
const leafOutlines = leafSites.flatMap(({ at, direction }) => place([leaf], at, direction, leafSize));
const leafMarks = leafSites.flatMap(({ at, direction }) => place([vein], at, direction, leafSize));
const leafStem = carve([
  thickSeg([-62, -28], [62, -28], 2.4), disc([-62, -28], 1.2),
  thickSeg([61, -28], [66, -24], 2.4), disc([66, -24], 1.2),
  thickSeg([61, -28], [66, -33], 2.4), disc([66, -33], 1.2),
], []);

export const kuwanaUchiwaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const lower = (region: Region): Region => region.map((piece) => rotated(mirrored(piece), Math.PI));
  c.group(() => {
    const rim = 2.55;
    fillPart(c, motif, [
      panel(0), panel(rim),
      ...carve([panel(rim + PAPER)], pineOutlines),
      ...pineMarks,
    ], pose);
    fillPart(c, motif, [
      lower(panel(0)), lower(panel(rim)),
      ...carve([lower(panel(rim + PAPER))], [...leafOutlines, ...leafStem]),
      ...leafMarks,
    ], pose);
    fanRib.build(c, point([-87, 0]), 90 + turn, 174, { motif, rootWidth: 8, tipWidth: 8 });
  });
};
