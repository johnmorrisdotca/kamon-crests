import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, rotated, pieceEnd, reversedRun, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type Edge = [from: V, to: V, radius: number, centre: V];
const strike = ([a, b, r, near]: Edge): Arc => shortArc(circleThrough(a, b, r, near), a, b) as Arc;
const outline = (edges: Edge[]): Region => edges.map(strike);
const symmetric = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];
const brush = (edges: Edge[], width: number): Region[] => edges.flatMap((edge) => {
  const arc = strike(edge);
  return [thickArc(arc.c, arc.r, width, arc.a0, arc.a1), disc(pieceEnd(arc), width / 2)];
});

const forewing = outline([
  [[7,3],[26,27],31,[37,-4]],
  [[26,27],[50,29],46,[42,-17]],
  [[50,29],[43,19],25,[24,41]],
  [[43,19],[24,3],29,[24,32]],
  [[24,3],[7,3],40,[15,42]],
]);
const hindwing = outline([
  [[7,1],[26,-4],25,[13,-22]],
  [[26,-4],[32,-15],20,[15,-17]],
  [[32,-15],[12,-17],31,[19,9]],
  [[12,-17],[7,1],20,[26,-3]],
]);
const foreCut = [
  ...brush([[[10,7],[31,16],28,[30,-12]]],1.9),
  ...brush([[[14,13],[34,22],27,[33,-3]]],1.85),
  disc([39,23],1.8),
];
const hindCut = [
  ...brush([[[11,-3],[21,-8],17,[18,8]]],1.7),
  disc([22,-12],1.6),disc([26,-11],1.5),
];
const abdomen = symmetric(outline([
  [[0,7],[8,1],8,[0,-1]],
  [[8,1],[6,-15],32,[-24,-4]],
  [[6,-15],[0,-25],14,[-5,-17]],
]));
const antenna = brush([
  [[5,11],[15,30],31,[33,8]],
  [[15,30],[25,40],39,[47,11]],
], 2.7);
const facingAntenna = brush([
  [[5,11],[21,25],37,[33,-6]],
  [[21,25],[40,26],34,[33,-6]],
], 2.7);
// The butterflies are viewed from one side. The farther pair of wings sits at a different angle.
const swing = (region: Region) => region.map((piece) => rotated(piece, -17 * DEG));
const wings = carve([forewing, hindwing], [...foreCut, ...hindCut]);
const nearWings = wings.map(swing);
const farWings = wings.map((loop) => loop.map(mirrored));
const body = carve([abdomen, disc([0,10],7.5), ...facingAntenna, ...antenna.map((loop) => loop.map(mirrored))], []);

export function mitsuHanaChoBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const butterflies: Placing[] = [
    { at: [-43, 51], k: .83, turn: -47 },
    { at: [-13, -14], k: .94, turn: -47 },
    { at: [39, -50], k: 1.05, turn: -47 },
  ];
  for (const place of butterflies) c.fill("butterfly", toPath([...body, ...nearWings, ...farWings], place), "evenodd");
}
