import type { Builder } from "../../construct/builder.ts";
import { WEIGHT } from "../../construct/builder.ts";
import { disc, seg, toPath } from "../../construct/compass.ts";
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
const fanPanels = (fan: ClosedFan): Region[] => {
  const { tip, shoulder, butt, outer, inner, spine } = fan;
  const seam = spine + WEIGHT.hair;

  return [
    polygon([[-outer, tip], [-seam, tip], [-seam, shoulder], [-inner, shoulder]]),
    rectangle(-spine, spine, butt, tip),
    polygon([[seam, tip], [outer, tip], [inner, shoulder], [seam, shoulder]]),
  ];
};

const TRIO: ClosedFan = { tip: 91, shoulder: 20, butt: 4, outer: 21, inner: 16, spine: 3.5 };

export const mitsuKumiawaseOgiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  for (const turn of [0, 112.5, 247.5]) c.fill("fan", toPath(fanPanels(TRIO), { k: 1, turn }));
};

const WHEEL: ClosedFan = { tip: 93, shoulder: 21, butt: 12, outer: 19, inner: 9, spine: 3 };

export const ogiGurumaBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.fill("fan", toPath([disc([0, 0], 10)], { k: 1 }));
  for (let turn = 0; turn < 360; turn += 45) c.fill("fan", toPath(fanPanels(WHEEL), { k: 1, turn }));
};
