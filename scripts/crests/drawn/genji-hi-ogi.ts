import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, onCircle, pieceStart, shortArc, thickArc, thickSeg, vdist,
} from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { cordBand } from "../library/cord-band.ts";
import { fanRib } from "../library/fan-rib.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { tasselFan } from "../library/tassel-fan.ts";

const motif = "fan";
const pivot: V = [-5, -30];
const ray = (length: number, turn: number): V => onCircle(pivot, length, (90 - turn) * DEG);
const widthAt = (radius: number): number => 2 * radius * Math.tan(7.55 * DEG) - PAPER;
const turns = [-57, -41.9, -26.8, -11.7, 3.4, 18.5, 33.6, 48.7];
const tips = [92, 95, 98, 102, 107, 101, 94, 88];

function loops(c: Builder, turn: number, positions: readonly [number, number][]): void {
  const side = Math.sign(turn);
  for (const [index, [high, low]] of positions.entries()) {
    const from = ray(high, turn);
    const to = ray(low, turn);
    const radius = vdist(from, to) * .51;
    const midpoint = ray((high + low) / 2, turn);
    const hint: V = [midpoint[0] - 13 * side, midpoint[1] + 15];
    const arc = shortArc(circleThrough(from, to, radius, hint), from, to) as Extract<Piece, { t: "A" }>;
    const sweep = arc.a1 - arc.a0;
    const entry = 90 - (arc.a0 + Math.sign(sweep) * Math.PI / 2) / DEG;
    cordBand.build(c, pieceStart(arc), entry, Math.abs(sweep) * radius, {
      motif, width: 4.5, paper: PAPER, seam: true, runs: [{ length: 1, bend: -sweep / DEG }],
    });

    const root = onCircle(arc.c, radius, arc.a0 + .41 * sweep);
    const knot: V = [root[0] + (index === 0 ? 1.6 : 3.2) * side, root[1] - 17];
    const hanging = Math.atan2(knot[0] - root[0], knot[1] - root[1]) / DEG;
    cordBand.build(c, root, hanging, vdist(root, knot), { motif, width: 3.4, paper: PAPER, seam: true });
    tasselFan.build(c, knot, 5 * side, 21, { motif, paper: PAPER, finish: "drop" });
  }
}

export const genjiHiOgiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    loops(c, -62.7, [[88, 57], [67, 35]]);
    loops(c, 61.5, [[98, 67], [75, 43]]);

    for (const turn of [-52, -31, -10, 11, 32, 53]) {
      fanRib.build(c, ray(-25, turn), turn, 28, { motif, rootWidth: 6.1, tipWidth: 2.6, cap: "round" });
    }

    for (const [i, turn] of turns.entries()) {
      const span = tips[i];
      fanRib.build(c, ray(5.5, turn), turn, span - 5.5, { motif, rootWidth: widthAt(5.5), tipWidth: widthAt(span) });
    }

    const belt = thickArc(pivot, 66.5, 4.4, (90 - 55) * DEG, (90 + 61) * DEG);
    fillPart(c, motif, [belt], { k: 1 }, PAPER);
    for (const turn of [-49.5, -34.5, -19.4, -4.3, 10.9, 26, 41.1]) {
      fanRib.build(c, ray(59.5, turn), turn, 15.2, { motif, rootWidth: 4.3, tipWidth: 4.3, keyline: PAPER });
    }

    const heel: V = [-22, -46];
    const tip: V = [83, 20];
    const guard = [thickSeg(heel, tip, 14.6), disc(heel, 7.3), disc(tip, 7.3)];
    const cartouche = [
      thickSeg([59, 6], [77, 17], 7), disc([59, 6], 3.5), disc([68, 11], 4.3), disc([77, 17], 3.5),
    ];
    fillPart(c, motif, carve(guard, [...cartouche, disc(pivot, 2.05)]), { k: 1 }, PAPER);
    fillPart(c, motif, carve([thickSeg([63, 8.3], [73, 15], 1.7), disc([68, 11], 1.9)], []), { k: 1 });
  }));
};
