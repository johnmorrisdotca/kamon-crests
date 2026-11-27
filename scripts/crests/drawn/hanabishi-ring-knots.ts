import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, circleThrough, disc, inside, mirrored, rotated, pieceEnd, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
const curve = (a: V, b: V, r: number, p: V): Arc => shortArc(circleThrough(a, b, r, p), a, b) as Arc;
// A pair of open curves ties the lower sector into the outer rim.
const toLeft = [
  curve([0,-90],[-11,-74],30,[15,-68]),
  curve([-11,-74],[-13,-60],24,[11,-61]),
  curve([-13,-60],[-5,-52],8,[-5,-60]),
  curve([-5,-52],[-1,-54],6,[-4,-58]),
];
const loopRibbon = (arcs: Arc[], w: number): Region[] => arcs.flatMap((a) => [
  thickArc(a.c, a.r, w, a.a0, a.a1),
  disc(pieceEnd(a), w / 2),
]);
const left = loopRibbon(toLeft,6.7);
const right = left.map((region) => region.map(mirrored));
const lowerLoop = carve([...left, ...right], []);
const outside = disc([0,0],94);
const insideRim = disc([0,0],88);
const seam = disc([-4,-94],3.8);
const turns = [0, 120, 240];
const seams = turns.map((turn) => seam.map((piece) => rotated(piece, turn * DEG)));
const wreath = carve([outside],[insideRim,...seams]);
const petal = carve([
  disc([0,50],18), disc([26,66],16), disc([-26,66],16),
  disc([0,73],21),
],[
  disc([0,96],18),
]);
const calyx = disc([0,96],16);
const cap = carveWhere([...calyx, ...outside], (p) => inside(calyx, p) && inside(outside, p));
const flower = [...petal, ...cap];
const lozenge = [
  curve([0,75],[0,55],18,[-15,65]),
  curve([0,55],[0,75],18,[15,65]),
];
const unit = carve(flower,[lozenge]);

export function mitsuWariMusubiHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  for (const turn of turns) {
    c.fill("flower-lozenge", toPath(unit, { k: 1, turn }), "evenodd");
    c.fill("flower-lozenge", toPath(lowerLoop, { k: 1, turn }), "evenodd");
  }
  c.fill("flower-lozenge", toPath(wreath, { k: 1 }), "evenodd");
}
