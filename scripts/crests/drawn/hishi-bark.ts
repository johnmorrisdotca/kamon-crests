import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, rotated, seg, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const polygon = (points: V[]): Region => points.map((a, i) => seg(a, points[(i + 1) % points.length]));
const at = (radius: number, clock: number): V => [radius * Math.sin(clock * DEG), radius * Math.cos(clock * DEG)];
const unit = (a: V, b: V): V => {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return [(b[0] - a[0]) / length, (b[1] - a[1]) / length];
};

/**
 * Five pine-bark lozenges meeting at the centre, 五つ松皮菱. Each lobe is a kite from the centre: its tip stands on the layout
 * circle and its two inner corners on a circle 0.6 of that, 36 degrees either side of its axis. A side runs from the inner corner
 * out along a line leaning a little outward, steps in across a short jog about 0.44 of the way, and runs on to the tip.
 */
export function itsutsuMatsukawaBishiBuild(c: Builder): void {
  const tip = 94;
  const corner = 56;
  const jog = 0.44;
  const lean = 5.1;
  const loop: V[] = [];
  for (let k = 0; k < 5; k += 1) {
    const axis = 72 * k;
    const top = at(tip, axis);
    const left = at(corner, axis - 36);
    const right = at(corner, axis + 36);
    const ul = unit(left, top);
    const ur = unit(right, top);
    const length = Math.hypot(top[0] - left[0], top[1] - left[1]);
    const out: V = [-ul[1], ul[0]];
    const outRight: V = [ur[1], -ur[0]];
    const sideLeft = (along: number, off: number): V => [left[0] + ul[0] * along * length + out[0] * off, left[1] + ul[1] * along * length + out[1] * off];
    const sideRight = (along: number, off: number): V => [right[0] + ur[0] * along * length + outRight[0] * off, right[1] + ur[1] * along * length + outRight[1] * off];
    loop.push(left, sideLeft(jog + 0.02, lean), sideLeft(jog - 0.02, -lean), top, sideRight(jog - 0.02, -lean), sideRight(jog + 0.02, lean));
  }
  const arrow = (near: number, far: number, width: number): Region => polygon([[-width, near], [0, far], [width, near]]);
  const seam: Region[] = [thickSeg([0, 0], [0, corner + 4], 2.4), arrow(corner * 0.3, corner * 0.64, 3.8)];
  const cuts = [36, 108, 180, 252, 324].flatMap((angle) => seam.map((shape) => shape.map((edge) => rotated(edge, -angle * DEG))));
  c.guideCircle(C0, tip);
  c.guideCircle(C0, corner);
  c.guideSpokes(5, 36, corner + 4);
  c.fill("diamond", toPath(carve([polygon(loop)], cuts), { k: 1 }), "evenodd");
}
