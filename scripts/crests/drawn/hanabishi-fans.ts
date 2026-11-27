import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, rotated, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

type Edge = [V, V, number, V];
const outline = (edges: Edge[]): Region => edges.map(([a, b, r, near]) => shortArc(circleThrough(a, b, r, near), a, b));
const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

// A fan carries three petals, the upright petal between its two spreading wings.
const outer = symmetric(outline([
  [[0,93],[14,78],15,[0,78]],
  [[14,78],[29,72],16,[16,63]],
  [[29,72],[28,65],13,[19,70]],
  [[28,65],[47,63],23,[36,48]],
  [[47,63],[63,59],28,[61,82]],
  [[63,59],[80,50],20,[62,43]],
  [[80,50],[44,24],125,[61,-74]],
  [[44,24],[9,5],106,[65,-62]],
  [[9,5],[0,6],13,[6,19]],
]));
const sideCut = symmetric(outline([
  [[0,34],[0,63],36,[-33,48]],
]));
const tiltedCut = sideCut.map((piece) => rotated(piece, -48 * DEG));

const fanCrown = symmetric(outline([
  [[0,31],[8,23],11,[-3,20]],
  [[8,23],[21,21],70,[26,93]],
  [[21,21],[8,10],24,[-1,34]],
  [[8,10],[0,7],19,[7,27]],
]));
const ring = disc([0,0],9);
const hub = carve([disc([0,0],8)], [disc([0,0],1.65)]);

// Two fine channels separate the three petals of the fan.
const stemCut = thickSeg([0,22],[27,65],1.8);
const borders = [stemCut, stemCut.map(mirrored), thickSeg([0,0],[100,100/Math.sqrt(3)],1.5), thickSeg([0,0],[-100,100/Math.sqrt(3)],1.5)];
const crownGap = fanCrown.flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, 2.8, piece.a0, piece.a1)] : []);
const petalUnit = carve([outer], [ring, fanCrown, ...crownGap, ...borders, sideCut, tiltedCut, tiltedCut.map(mirrored)]);

export function mitsuYoseHanabishiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const unit = [...petalUnit, ...carve([fanCrown], [ring])];
  for (const turn of [0, 120, 240]) c.fill("flower-lozenge", toPath(unit, { k: 1, turn }), "evenodd");
  c.fill("flower-lozenge", toPath(hub, { k: 1 }), "evenodd");
}
