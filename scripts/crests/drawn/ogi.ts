import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { arcA, carve, DEG, disc, onCircle, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

interface ClosedFan {
  /** Distances from the arrangement's centre along the fan's axis. */
  tip: number;
  shoulder: number;
  butt: number;
  /** Half-widths of the paper at the tip and shoulder, and of the spine. */
  outer: number;
  inner: number;
  spine: number;
}

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));
const rectangle = (left: number, right: number, bottom: number, top: number): Region =>
  polygon([[left, bottom], [right, bottom], [right, top], [left, top]]);

/** Two tapered leaves of paper, separated from the straight spine by a ruled gap on either side. */
const fanPanels = (fan: ClosedFan, roundButt = false): Region[] => {
  const { tip, shoulder, butt, outer, inner, spine } = fan;
  const seam = spine + WEIGHT.hair;
  const stem = roundButt
    ? [
        arcA([0, butt + spine], spine, Math.PI, 2 * Math.PI),
        seg([spine, butt + spine], [spine, tip]),
        seg([spine, tip], [-spine, tip]),
        seg([-spine, tip], [-spine, butt + spine]),
      ]
    : rectangle(-spine, spine, butt, tip);

  return [
    polygon([[-outer, tip], [-seam, tip], [-seam, shoulder], [-inner, shoulder]]),
    stem,
    polygon([[seam, tip], [outer, tip], [inner, shoulder], [seam, shoulder]]),
  ];
};

const TWO_IN_RING: ClosedFan = { tip: 50, shoulder: -36, butt: -67, outer: 26, inner: 18, spine: 3.5 };

export const maruNiNihonOgiBuild = (c: Builder): void => {
  c.ring("ring-medium");
  const rivet = disc([0, -62], 2);
  const panels = carve(fanPanels(TWO_IN_RING), [rivet]);
  for (const x of [-30, 30]) c.fill("fan", toPath(panels, { k: 1, at: [x, 0] }), "evenodd");
};

const CROSSED_PAIR: ClosedFan = { tip: 81, shoulder: -57, butt: -93, outer: 22, inner: 14, spine: 3.5 };

export const chigaiOgiBuild = (c: Builder): void => {
  const front = fanPanels(CROSSED_PAIR, true);
  const back = fanPanels({ ...CROSSED_PAIR, outer: 20, inner: 12 }, true);
  const { tip, shoulder, butt, outer, inner, spine } = CROSSED_PAIR;
  const gap = WEIGHT.hair;
  const paperClearance = polygon([
    [-outer - gap, tip + gap], [outer + gap, tip + gap], [inner + gap, shoulder - gap], [-inner - gap, shoulder - gap],
  ]);
  const handleClearance = rectangle(-spine - gap, spine + gap, butt - gap, shoulder);
  const turn = (region: Region, degrees: number): Region => region.map((edge) => rotated(edge, -degrees * DEG));
  c.guideCircle(C0, R);
  const angle = 47.5;
  c.fill("fan", toPath(carve(back.map((region) => turn(region, -angle)), [turn(paperClearance, angle), turn(handleClearance, angle)]), { k: 1 }));
  c.fill("fan", toPath(front, { k: 1, turn: angle }));
};

/** A paper face between concentric arcs and the two radial guard edges. */
const paperBand = (pivot: V, inner: number, outer: number, opening: number): Region => {
  const left = (90 + opening) * DEG;
  const right = (90 - opening) * DEG;
  const [innerLeft, outerLeft] = [onCircle(pivot, inner, left), onCircle(pivot, outer, left)];
  const [innerRight, outerRight] = [onCircle(pivot, inner, right), onCircle(pivot, outer, right)];

  return [
    seg(innerLeft, outerLeft), shortArc({ c: pivot, r: outer }, outerLeft, outerRight),
    seg(outerRight, innerRight), shortArc({ c: pivot, r: inner }, innerRight, innerLeft),
  ];
};

export const kasaneOgiBuild = (c: Builder): void => {
  const pivot: V = [0, -59];
  const point = (reach: number, degree: number): V => onCircle(pivot, reach, (90 - degree) * DEG);
  const front = paperBand(pivot, 54, 115, 54);
  const rear = paperBand([0, -27], 55, 111, 49);
  const betweenPapers = paperBand(pivot, 53, 115 + WEIGHT.thread, 55);
  const rightGuard = [thickSeg(point(-18, 54), point(114, 54), 4), disc(point(-18, 54), 2)];
  const aroundGuard = thickSeg(point(-20 - WEIGHT.hair, 54), point(117, 54), 4 + 2 * WEIGHT.hair);
  const ribs = [-54, -33, -16, 0, 16, 33].map((angle) => [
    thickSeg(point(-19, angle), point(55, angle), 4),
    disc(point(-19, angle), 2),
  ]);
  c.guideCircle(C0, R);
  c.fill("fan", toPath(carve([rear], [betweenPapers]), { k: 1 }));
  c.fill("fan", toPath(carve([front], [aroundGuard]), { k: 1 }));
  c.group(() => {
    for (const rib of ribs) c.fill("fan", toPath(carve(rib, [aroundGuard]), { k: 1 }));
  });
  c.fill("fan", toPath(carve(rightGuard, []), { k: 1 }));
};
