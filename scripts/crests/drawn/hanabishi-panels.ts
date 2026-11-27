import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, disc, inside, mirrored, reversedRun, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

const edge: V = [94 * Math.sqrt(3) / 2, 47];
const curve = (a: V, b: V, r: number, hint: V) => shortArc(circleThrough(a, b, r, hint), a, b);
// The inner edge of the panel forms a broad central lobe and two scalloped shoulders.
const half: Region = [
  shortArc({c:[0,0],r:94}, [0,94], edge),
  curve(edge,[58,42],42,[68,83]),
  curve([58,42],[50,46],12,[55,51]),
  curve([50,46],[33,41],24,[39,61]),
  curve([33,41],[22,26],14,[21,40]),
  curve([22,26],[13,25],16,[18,41]),
  curve([13,25],[0,11],14,[0,25]),
];
const panel = [...half, ...reversedRun(half.map(mirrored))];
const rightCut = thickSeg([9,94],[36,34],1.8);
const rightVein = thickSeg([13,90],[36,76],1.7);
const midVein = thickSeg([0,87],[0,62],1.7);
const cap = disc([0,101],16);
const perimeter = disc([0,0],94);
const capInside = carveWhere([...perimeter, ...cap], (p) => inside(perimeter, p) && inside(cap, p));
const flower = carve([panel],[
  rightCut,rightCut.map(mirrored),rightVein,rightVein.map(mirrored),midVein,disc([0,62],.85),disc([36,76],.85),disc([-36,76],.85),
  disc([0,101],17.6),
]);
const border = carve([perimeter],[disc([0,0],92.3)]);

export function mitsuWariHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) {
    c.fill("flower-lozenge", toPath([...flower, ...capInside], { k: 1, turn }), "evenodd");
  }
  c.fill("flower-lozenge", toPath(border, { k: 1 }), "evenodd");
}
