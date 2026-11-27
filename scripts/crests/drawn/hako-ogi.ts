import type { Builder } from "../../construct/builder.ts";
import {
  DEG, arcA, carve, circleThrough, disc, mirrored, onCircle, pieceStart, rotated, moved, seg, shortArc, thickArc, thickSeg, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { tasselFan } from "../library/tassel-fan.ts";

const motif = "fan";
const pivot: V = [0, 5];
const onRay = (distance: number, turn: number): V =>
  onCircle(pivot, distance, (90 - turn) * DEG);
const polygon = (corners: V[]): Region =>
  corners.map((point, i) => seg(point, corners[(i + 1) % corners.length]));

const radius = (76 ** 2 + 36 ** 2) / (2 * 36);
const paperCentre: V = [0, 91 - radius];
const edge = 76;
const halfSpan = Math.acos(edge / radius);
const rightTip = onCircle(paperCentre, radius, halfSpan);
const leftTip = onCircle(paperCentre, radius, Math.PI - halfSpan);
const guardTurn = Math.atan2(rightTip[0], rightTip[1] - pivot[1]) / DEG;
const fanPaper: Region = [
  arcA(paperCentre, radius, halfSpan, Math.PI - halfSpan),
  seg(leftTip, onRay(40, -guardTurn)),
  arcA(pivot, 40, (90 + guardTurn) * DEG, (90 - guardTurn) * DEG),
  seg(onRay(40, guardTurn), rightTip),
];

const lid: V[] = [[-51, -2], [-13, 23], [13, 23], [51, -2], [23, -23], [-23, -23]];
const innerLid: V[] = [[-38, -2], [-10, 16 + PAPER / 2], [10, 16 + PAPER / 2], [38, -2], [18, -17], [-18, -17]];
const caseFront = polygon([lid[0], lid[5], lid[4], lid[3], [51, -72], [23, -90], [-23, -90], [-51, -72]]);

/** Both circles in the rolled line have the same tangent where they meet. */
const scroll = [
  thickArc([0, 0], 7.7, PAPER, 58 * DEG, 2 * Math.PI),
  thickArc([4, 0], 3.7, PAPER, 0, 218 * DEG),
];
const casketPattern = [-33, -50, -67, -84].flatMap((y, row) =>
  [-45, -30, -12].flatMap((x, col) => {
    const at: V = [x, y + Math.max(0, -x - 23) * .68];
    const turn = ((row + col) % 2 === 0 ? 15 : 195) * DEG;
    const left = scroll.map((region) => region.map((piece) => moved(rotated(piece, turn), at)));
    return [...left, ...left.map((region) => region.map(mirrored))];
  }));

const fanHeel: Region = [
  seg(onRay(2, 0), onRay(-19, 49)),
  arcA(pivot, 19, (270 - 49) * DEG, (270 + 49) * DEG),
  seg(onRay(-19, -49), onRay(2, 0)),
];

function swing(c: Builder, arc: Extract<Piece, { t: "A" }>, width: number, seam: boolean): void {
  const sweep = arc.a1 - arc.a0;
  const turn = 90 - (arc.a0 + Math.sign(sweep) * Math.PI / 2) / DEG;
  cordBand.build(c, pieceStart(arc), turn, Math.abs(sweep) * arc.r, {
    motif, width, paper: PAPER, seam, runs: [{ length: 1, bend: -sweep / DEG }],
  });
}

function attachments(c: Builder, side: number): void {
  const from: V = [side * 74, 56];
  const to: V = [side * 35, 35];
  const outer = shortArc(circleThrough(from, to, 22.4, [side * 49, 58]), from, to) as Extract<Piece, { t: "A" }>;
  swing(c, outer, 4.4, false);

  const fromInside: V = [side * 63, 48];
  const toInside = onCircle(outer.c, outer.r, outer.a0 + (outer.a1 - outer.a0) * .48);
  const wrap = shortArc(circleThrough(fromInside, toInside, 30, [side * 44, 51]), fromInside, toInside) as Extract<Piece, { t: "A" }>;
  swing(c, wrap, 2.5, false);

  const root = onCircle(outer.c, outer.r, outer.a0 + (outer.a1 - outer.a0) * .39);
  const knot: V = [side * 67, -41];
  const turn = Math.atan2(knot[0] - root[0], knot[1] - root[1]) / DEG;
  cordBand.build(c, root, turn, vdist(root, knot), { motif, width: 5.3, paper: PAPER, seam: true });
  tasselFan.build(c, knot, side * 3, 30, { motif, paper: PAPER, finish: "drop" });
}

export const hakoOgiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    const panels = [thickSeg([-23, -22], [-23, -91], PAPER), thickSeg([23, -22], [23, -91], PAPER)];
    fillPart(c, motif, carve([caseFront], [...panels, ...casketPattern]), { k: 1 });

    const lidRim = innerLid.map((point, i) => thickSeg(point, innerLid[(i + 1) % innerLid.length], PAPER));
    const lidCorners = innerLid.map((point) => disc(point, PAPER / 2));
    fillPart(c, motif, carve([polygon(lid)], [...lidRim, ...lidCorners, fanHeel]), { k: 1 }, PAPER);
    for (const side of [-1, 1]) attachments(c, side);

    for (const turn of [-45, -30, -15, 0, 15, 30, 45]) {
      fanRib.build(c, onRay(-17, turn), turn, 59, { motif, rootWidth: 2.6, tipWidth: 3.5, cap: "round" });
    }
    fillPart(c, motif, [fanPaper], { k: 1 });
    const start = onRay(-17, guardTurn);
    fanRib.build(c, start, guardTurn, vdist(start, rightTip),
      { motif, keyline: PAPER, rootWidth: 4.7, tipWidth: 5.2, cap: "round" });
  }));
};
