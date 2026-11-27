import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const origin: V = [0, 0];
const at = (turn: number, distance: number): V => [distance * Math.sin(turn * DEG), distance * Math.cos(turn * DEG)];
const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);

function surround(loop: Region, width: number): Region[] {
  return loop.map((edge) => edge.t === "A"
    ? thickArc(edge.c, edge.r, width, edge.a0, edge.a1)
    : thickSeg(edge.a, edge.b, width));
}

/** The three clove petals sit in the wide end of a white horn that narrows into the tail. */
export function hidariHitotsuChojiTomoeBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const reach = at(151, R);
  const shoulder: V = [-14, 43];
  const head: V = [36, -5];
  const left: V = [-57, -7];
  const low: V = [-51, -49];
  const centre: V = [-18, 7];
  const inner: V = [-46, -33];
  const innerLow: V = [-38, -60];
  const horn: Region = [
    bow(reach, low, 86, [-8, 7]),
    bow(low, left, 70, [15, -15]),
    bow(left, shoulder, 47, [-13, -3]),
    bow(shoulder, head, 46, [-12, -2]),
    bow(head, centre, 65, [3, -51]),
    bow(centre, inner, 56, [10, -35]),
    bow(inner, innerLow, 51, [4, -49]),
    bow(innerLow, reach, 95, [17, 27]),
  ];
  c.fill("tomoe", toPath([disc(origin, R), horn], { k: 1 }), "evenodd");

  const petals: { centre: V; width: number; stem: V; tip: V }[] = [
    { centre: [-14, 23], width: 16, stem: [-13, 4], tip: [-13, 25] },
    { centre: [-40, 5], width: 14, stem: [-29, -9], tip: [-42, 9] },
    { centre: [13, 16], width: 15, stem: [9, 1], tip: [15, 16] },
  ];
  const seam = surround(horn, 3.4);
  const middle = disc(petals[0].centre, petals[0].width + 1.8);
  for (const [i, petal] of petals.entries()) {
    const lobe = disc(petal.centre, petal.width);
    const window = carveWhere([...lobe, ...horn], (point) => inside(lobe, point) && inside(horn, point));
    const vein = thickSeg(petal.stem, petal.tip, 2.5);
    const gaps = [...seam, vein, ...(i === 0 ? [] : [middle])];
    c.fill("clove", toPath(carve(window, gaps), { k: 1 }), "evenodd");
  }
}
