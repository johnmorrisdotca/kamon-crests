import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, moved, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { fanPanels } from "./ogi.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

/** A folded fan follows each side of the well, with its paper crossing the handle of the next. */
export const igetaOgiBuild = (c: Builder): void => {
  c.precision(3);
  const fan = { tip: 57, shoulder: -49, butt: -64, outer: 16, inner: 14.5, spine: 3.25 };
  const { tip, shoulder, outer, inner, butt, spine } = fan;
  const gap = WEIGHT.hair;
  const panel = fanPanels(fan, true);
  const above: Region[] = [
    polygon([[-outer - gap, tip + gap], [outer + gap, tip + gap], [inner + gap, shoulder - gap], [-inner - gap, shoulder - gap]]),
    thickSeg([0, butt - gap], [0, shoulder + gap], 2 * (spine + gap)),
  ];
  const place = (shape: Region, angle: number): Region => shape.map((edge) => rotated(moved(edge, [48, 0]), angle * DEG));
  c.guideCircle(C0, R);
  for (const angle of [-45, -135, -225, -315]) {
    const front = above.map((shape) => place(shape, angle + 90));
    const here = panel.map((shape) => place(shape, angle));
    c.fill("fan", toPath(carve(here, front), { k: 1 }), "evenodd");
  }
};
