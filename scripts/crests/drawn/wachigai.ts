import type { Builder } from "../../construct/builder.ts";
import { DEG, arcTo, carve, carveWhere, disc, inside, onPage, pieceEnd, pieceStart, reversedRun, rotated, seg, thickArc, toPath, touch } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
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

/** One side of the band's upper lobe and its diagonal return into the next lobe. */
const knottedEdge = (inset: number): Region => {
  const at = 50;
  const lobeRadius = 46;
  const bridgeRadius = 101;
  const distance = bridgeRadius - lobeRadius;
  // The bridge circles lie on a diagonal and touch both neighbouring lobe circles internally.
  const diagonal = (at + Math.sqrt(2 * distance * distance - at * at)) / 2;
  const crown: Circle = { c: [0, at], r: lobeRadius - inset };
  const next: Circle = { c: [-at, 0], r: lobeRadius - inset };
  const bridge: Circle = { c: [-diagonal, diagonal], r: bridgeRadius - inset };
  const prior: Circle = { c: [diagonal, diagonal], r: bridgeRadius - inset };
  const join = touch(bridge, crown);

  return [arcTo(crown, touch(prior, crown), join, false), arcTo(bridge, join, touch(bridge, next), false)];
};

const knotBand = (gap: number): Region => {
  const out = knottedEdge(-gap);
  const back = reversedRun(knottedEdge(10 + gap));

  return [...out, seg(pieceEnd(out[1]), pieceStart(back[0])), ...back, seg(pieceEnd(back[1]), pieceStart(out[0]))];
};

export const knottedWachigai = (c: Builder): void => {
  const band = knotBand(0);
  const over = knotBand(1.5).map((edge) => rotated(edge, -90 * DEG));
  const unit = carveWhere([...band, ...over, seg([-25, -150], [-25, 150])], (p) => inside(band, p) && !(p[0] > -25 && inside(over, p)));
  c.guideCircle(C0, 96);
  for (const angle of [0, 270, 180, 90]) {
    c.fill("linked-rings", toPath(unit.map((loop) => loop.map((edge) => rotated(edge, angle * DEG))), { k: 1 }), "evenodd");
  }
};
