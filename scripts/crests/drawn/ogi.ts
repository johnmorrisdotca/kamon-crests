import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { arcA, carve, DEG, disc, rotated, seg, toPath } from "../../construct/compass.ts";
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

const TRIO: ClosedFan = { tip: 91, shoulder: 20, butt: 4, outer: 21, inner: 16, spine: 3.5 };

export const mitsuKumiawaseOgiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  for (const turn of [0, 112.5, 247.5]) c.fill("fan", toPath(fanPanels(TRIO), { k: 1, turn }));
};

const CROSSED: ClosedFan = { tip: 87, shoulder: 17, butt: -72, outer: 22, inner: 16, spine: 3 };

export const sanbonChigaiOgiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  const panels = fanPanels(CROSSED, true);
  const bottomPanels = fanPanels({ ...CROSSED, outer: 20 }, true);
  // The two fans to the back lose ink alongside the spine that crosses them.
  const { butt, shoulder, spine } = CROSSED;
  const clearance = rectangle(-spine - WEIGHT.hair, spine + WEIGHT.hair, butt - WEIGHT.hair, shoulder);
  const turn = (region: Region, degrees: number): Region => region.map((edge) => rotated(edge, -degrees * DEG));
  const left = 300;
  const right = 60;
  const overLeft = turn(clearance, right);
  const overBottom = turn(clearance, left);
  const fill = (regions: Region[]): void => c.fill("fan", toPath(regions, { k: 1 }));

  fill(carve(bottomPanels.map((region) => turn(region, 180)), [overBottom, overLeft]));
  fill(carve(panels.map((region) => turn(region, left)), [overLeft]));
  fill(panels.map((region) => turn(region, right)));
};

const WHEEL: ClosedFan = { tip: 93, shoulder: 21, butt: 12, outer: 19, inner: 9, spine: 3 };

export const ogiGurumaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("fan", toPath([disc([0, 0], 10)], { k: 1 }));
  for (let turn = 0; turn < 360; turn += 45) c.fill("fan", toPath(fanPanels(WHEEL), { k: 1, turn }));
};
