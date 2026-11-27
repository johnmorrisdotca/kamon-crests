import type { Builder } from "../../construct/builder.ts";
import {
  DEG, arcA, carve, circleThrough, disc, moved, onCircle, pieceStart, rotated, seg, shortArc, thickSeg, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { tasselFan } from "../library/tassel-fan.ts";

const motif = "fan";
const pivot: V = [-3, -39];
const ray = (distance: number, turn: number): V => onCircle(pivot, distance, (90 - turn) * DEG);
const fanPaper: Region = [
  seg(ray(35, 57), ray(105, 57)),
  arcA(pivot, 105, 33 * DEG, 147 * DEG),
  seg(ray(105, -57), ray(35, -57)),
  arcA(pivot, 35, 147 * DEG, 33 * DEG),
];

const feathers: V = [-9, 30];
/** The two bowed sides meet the round ends at their common tangents. */
function vane(clearance = 0): Region {
  const end = 19;
  const halfWidth = 13.4;
  const radius = 150;
  const depth = Math.sqrt((radius - halfWidth) ** 2 - end ** 2);
  const angle = Math.atan2(depth, end);
  return [
    arcA([0, -depth], radius + clearance, angle, Math.PI - angle),
    arcA([-end, 0], halfWidth + clearance, Math.PI - angle, Math.PI + angle),
    arcA([0, depth], radius + clearance, Math.PI + angle, 2 * Math.PI - angle),
    arcA([end, 0], halfWidth + clearance, -angle, angle),
  ];
}

const vaneShape = vane();
const vaneClearance = vane(PAPER);
const stamp = (region: Region, turn: number): Region =>
  region.map((piece) => moved(rotated(piece, turn * DEG), feathers));
const angles = [-47, 46];
const vaneKeylines = angles.map((turn) => stamp(vaneClearance, turn));
const vanePaper = [
  ...[-1, 1].map((side) => thickSeg([-36, side * 2.55], [36, side * 2.55], PAPER)),
  ...[-26, -17, -8, 1, 10, 19, 28].flatMap((x) => [-1, 1].map((side) =>
    thickSeg([x, side * 2.65], [x + 11, side * 14.2], PAPER))),
];

function cords(c: Builder, direction: number): void {
  const side = Math.sign(direction);
  for (const [high, low] of [[99, 67], [67, 35.5]]) {
    const a = ray(high, direction);
    const b = ray(low, direction);
    const radius = vdist(a, b) * .52;
    const middle = ray((high + low) / 2, direction);
    const hint: V = [middle[0] - 11 * side, middle[1] + 12];
    const arc = shortArc(circleThrough(a, b, radius, hint), a, b) as Extract<Piece, { t: "A" }>;
    const sweep = arc.a1 - arc.a0;
    const heading = 90 - arc.a0 / DEG - Math.sign(sweep) * 90;
    cordBand.build(c, pieceStart(arc), heading, Math.abs(sweep) * radius, {
      motif, width: 4.5, seam: true, paper: PAPER, runs: [{ length: 1, bend: -sweep / DEG }],
    });
    const start = onCircle(arc.c, radius, arc.a0 + .42 * sweep);
    const knot: V = [start[0] + 1.5 * side, start[1] - 15.5];
    const hang = Math.atan2(knot[0] - start[0], knot[1] - start[1]) / DEG;
    cordBand.build(c, start, hang, vdist(start, knot), { motif, width: 3.4, paper: PAPER, seam: true });
    tasselFan.build(c, knot, side * 5, 21, { motif, finish: "drop", paper: PAPER });
  }
}

export const akitaHanaOgiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);

  c.group(() => {
    for (const [index, turn] of angles.entries()) {
      const cuts = [...vanePaper.map((region) => stamp(region, turn)), ...vaneKeylines.slice(index + 1)];
      fillPart(c, "hawk-feather", carve([stamp(vaneShape, turn)], cuts), { k: 1 });
    }
  });

  c.group(() => layerParts(c, () => {
    cords(c, -57.8);
    cords(c, 61.2);
    for (const direction of [-53, -32, -11, 11, 32, 53]) {
      fanRib.build(c, ray(-29, direction), direction, 66,
        { motif, rootWidth: 5.6, tipWidth: 4.2, cap: "round" });
    }

    const seams = [-43, -28, -14, 0, 14, 28, 43].map((a) =>
      thickSeg(ray(34, a), ray(106, a), PAPER));
    const bindings = [-49, -36, -22, -8, 8, 22, 36, 49].flatMap((a) =>
      carve([thickSeg(ray(77, a), ray(97, a), 5.6)],
        [thickSeg(ray(77 + PAPER, a), ray(97 - PAPER, a), 5.6 - 2 * PAPER)]));
    fillPart(c, motif, carve([fanPaper], [...bindings, ...seams, ...vaneKeylines]), { k: 1 });

    const heel: V = [-23, -61];
    const tip = ray(104, 57);
    const guard = carve([disc(heel, 6.9), thickSeg(heel, tip, 13.8), disc(tip, 6.9)], [disc([-5, -46], 2.3)]);
    fillPart(c, motif, guard, { k: 1 }, PAPER);
  }));
};
