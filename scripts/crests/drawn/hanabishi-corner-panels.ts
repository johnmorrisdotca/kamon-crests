import type { Builder } from "../../construct/builder.ts";
import { carve, carveWhere, circleThrough, disc, inside, mirrored, reversedRun, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

const edge: V = [47, 47];
const curve = (a: V, b: V, r: number, hint: V) => shortArc(circleThrough(a, b, r, hint), a, b);
// The inward edge has a broad central lobe and two small scallops near the rim.
const half: Region = [
  seg([0, 94], edge),
  curve(edge, [40, 44], 9, [43, 50]),
  curve([40, 44], [35, 46], 8, [34, 38]),
  curve([35, 46], [28, 43], 8, [29, 51]),
  curve([28, 43], [21, 44], 18, [24, 60]),
  curve([21, 44], [11, 34], 12, [12, 44]),
  curve([11, 34], [0, 25], 11, [0, 36]),
];
const panel = [...half, ...reversedRun(half.map(mirrored))];
const rightCut = thickSeg([8,86],[23,42],1.6);
const rightVein = thickSeg([12,81],[25,62],1.7);
const midVein = thickSeg([0,84],[0,59],1.7);
const cap = disc([0,91],15);
const lozenge = (s: number): Region => [
  seg([0,s],[s,0]), seg([s,0],[0,-s]), seg([0,-s],[-s,0]), seg([-s,0],[0,s]),
];
const perimeter = lozenge(94);
const capInside = carveWhere([...perimeter, ...cap], (p) => inside(perimeter, p) && inside(cap, p));
const flower = carve([panel],[
  rightCut,rightCut.map(mirrored),rightVein,rightVein.map(mirrored),midVein,disc([0,59],.85),disc([25,62],.85),disc([-25,62],.85),
  disc([0,91],16.7),
]);
const border = carve([perimeter],[lozenge(92.0)]);

export function sumiTateWariYotsuHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of [0, 90, 180, 270]) {
    c.fill("flower-lozenge", toPath([...flower, ...capInside], { k: 1, turn }), "evenodd");
  }
  c.fill("flower-lozenge", toPath(border, { k: 1 }), "evenodd");
}
