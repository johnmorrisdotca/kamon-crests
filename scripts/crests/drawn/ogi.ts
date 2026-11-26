import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { arcA, carve, DEG, rotated, seg, toPath } from "../../construct/compass.ts";
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
