import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, moved, rotated, seg, thickSeg, toPath, vadd, vmul, vsub, vunit } from "../../construct/compass.ts";
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

/** Two opposite stepped leaves share the long diagonal of the lozenge. */
export const ogiBishiBuild = (c: Builder): void => {
  c.precision(3);
  const pivot: V = [92, 3];
  const crown: V[] = [[-93, 6], [-77, 18], [-73, 35], [-54, 37], [-47, 51], [-28, 49], [-31, 67], [-14, 77]];
  const upper = crown[crown.length - 1];
  const lower = crown[0];
  const near = (end: V): V => vadd(pivot, vmul(vunit(vsub(end, pivot)), 62));
  const [upperRib, lowerRib] = [near(upper), near(lower)];
  const paper = polygon([lowerRib, ...crown, upperRib]);
  const guards = [thickSeg(pivot, upper, 3.4), thickSeg(pivot, lower, 3.5), disc(pivot, 2.0)];
  const margins = [thickSeg(pivot, upper, 5.8), thickSeg(pivot, lower, 6.0)];
  const ribs = [1, 2, 3, 4, 5].map((i) => {
    const at = vadd(upperRib, vmul(vsub(lowerRib, upperRib), i / 6));
    return thickSeg(pivot, at, 1.7);
  });
  const face = [...carve([paper], margins), ...carve([...guards, ...ribs], [])];
  c.guideCircle(C0, R);
  for (const turn of [0, 180]) c.fill("fan", toPath(face, { k: 1, turn }), "evenodd");
};
