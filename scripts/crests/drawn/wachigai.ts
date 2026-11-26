import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, onPage, rotated, thickArc, toPath } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0 } from "../../construct/geo.ts";

/** Each of the inner rings crosses over its next neighbour near the middle and under it farther out. */
export const threeInThickRing = (c: Builder): void => {
  const room = c.ring("ring-thick");
  const outer = 39;
  const inner = 32;
  const gap = 1.4;
  const top: V = [0, 23];
  const right: V = [top[1] * Math.sqrt(3) / 2, -top[1] / 2];
  const left: V = [-right[0], right[1]];
  const halfBand = (other: V, lean: number) => thickArc(other, (outer + inner) / 2, outer - inner + 2 * gap, (lean - 180) * DEG, lean * DEG);
  const unit = carve([disc(top, outer)], [disc(top, inner), halfBand(right, 120), halfBand(left, 60)]);
  c.guideCircle(C0, room);
  for (const other of [right, left]) {
    c.gapCircle(onPage(other, { k: 1 }), outer + gap);
    c.gapCircle(onPage(other, { k: 1 }), inner - gap);
  }
  for (const angle of [0, -120, -240]) {
    c.fill("linked-rings", toPath(unit.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))), { k: 1 }), "evenodd");
  }
};

/** The bands of the three-way split are cropped by the enclosing circle. Each band crosses its two neighbours once inside it. */
export const splitThreeWachigai = (c: Builder): void => {
  const room = c.ring("ring-thin");
  const offset = 91;
  const outer = 110;
  const inner = 98;
  const gap = 1.5;
  const top: V = [0, offset];
  const left: V = [-offset * Math.sqrt(3) / 2, -offset / 2];
  const lowerArc = thickArc(top, (outer + inner) / 2, outer - inner, Math.PI, 2 * Math.PI);
  const over = thickArc(left, (outer + inner) / 2, outer - inner + 2 * gap, -120 * DEG, 60 * DEG);
  const circle = (centre: V): V => onPage(centre, { k: 1 });
  c.guideCircle(circle(top), outer);
  c.guideCircle(circle(top), inner);
  c.gapCircle(circle(left), outer + gap);
  c.gapCircle(circle(left), inner - gap);
  // Clip the outside runs at the inner edge of the enclosing circle before tracing the remaining arcs.
  const clipped = carveWhere([...lowerArc, ...over, ...disc([0, 0], room)], (p) => Math.hypot(...p) <= room && inside(lowerArc, p) && !inside(over, p));
  for (const angle of [0, -120, -240]) {
    c.fill("linked-rings", toPath(clipped.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))), { k: 1 }), "evenodd");
  }
};
