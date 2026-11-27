import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

import { C0, R } from "../../construct/geo.ts";

type Edge = [V, V, number, V];
const outline = (edges: Edge[]): Region => edges.map(([from, to, radius, centre]) =>
  shortArc(circleThrough(from, to, radius, centre), from, to),
);
const reflected = (half: Region): Region => [...half, ...reversedRun(half.map(mirrored))];

// The front petal is split at the top, with a broader side petal behind it on either side.
const middle = reflected(outline([
  [[0,65],[20,76],25,[10,55]],
  [[20,76],[38,62],21,[18,59]],
  [[38,62],[34,40],31,[10,56]],
  [[34,40],[0,15],49,[4,64]],
]));
const rightPetal = outline([
  [[33,52],[61,62],24,[49,43]],
  [[61,62],[67,52],12,[58,49]],
  [[67,52],[84,46],23,[71,31]],
  [[84,46],[88,31],18,[73,35]],
  [[88,31],[70,11],29,[62,37]],
  [[70,11],[41,3],52,[44,54]],
  [[41,3],[14,1],74,[23,72]],
  [[14,1],[24,34],34,[43,10]],
  [[24,34],[33,52],32,[52,31]],
]);
const centreVein = reflected(outline([[[0,17],[0,40],17,[-14,29]]]));
const outerVein = outline([
  [[21,6],[43,22],27,[42,1]],
  [[43,22],[21,6],32,[25,37]],
]);

// The forked twig and slanting leaf follow the lower half of the printed spray.
const branch = outline([
  [[-45,0],[-25,8],42,[-27,-24]],
  [[-25,8],[-10,18],17,[-27,26]],
  [[-10,18],[-1,8],12,[-12,7]],
  [[-1,8],[23,8],45,[12,50]],
  [[23,8],[8,-9],21,[27,-12]],
  [[8,-9],[30,-28],30,[34,0]],
  [[30,-28],[34,-13],14,[44,-24]],
  [[34,-13],[41,-31],16,[51,-20]],
  [[41,-31],[69,-45],36,[45,-58]],
  [[69,-45],[51,-51],19,[55,-32]],
  [[51,-51],[15,-40],69,[35,-5]],
  [[15,-40],[-20,-42],75,[0,-113]],
  [[-20,-42],[-24,-34],14,[-12,-34]],
  [[-24,-34],[25,-34],66,[0,24]],
  [[25,-34],[3,-24],28,[22,-8]],
  [[3,-24],[-45,0],63,[-44,-62]],
]);
const leaf = outline([
  [[-91,-55],[-48,-29],92,[-48,-115]],
  [[-48,-29],[-18,-28],48,[-31,-69]],
  [[-18,-28],[4,-36],35,[-10,-57]],
  [[4,-36],[-15,-44],23,[-17,-21]],
  [[-15,-44],[-58,-48],88,[-43,-132]],
  [[-58,-48],[-91,-55],104,[-53,-148]],
]);
const veins: [V, V][] = [
  [[-79,-48],[-75,-49]],
  [[-73,-43],[-67,-48]],
  [[-66,-39],[-59,-46]],
  [[-59,-35],[-51,-44]],
  [[-52,-32],[-43,-43]],
  [[-44,-31],[-35,-42]],
  [[-36,-31],[-28,-41]],
  [[-28,-31],[-21,-39]],
  [[-20,-33],[-15,-39]],
];
const markings = veins.flatMap(([a, b]) => [thickSeg(a, b, 2), disc(a, 1), disc(b, 1)]);
const bark = [
  thickSeg([49,-48],[56,-44],1.15),
  thickSeg([53,-49],[60,-45],1.15),
];
const offset = (loop: Region, width: number): Region[] => loop.flatMap((edge) =>
  edge.t === "A" ? [thickArc(edge.c, edge.r, width, edge.a0, edge.a1)] : [],
);
const central = carve([middle], [centreVein, branch, ...offset(branch, 3)]);
const side = carve([rightPetal], [middle, ...offset(middle, 3.4), outerVein, branch, ...offset(branch, 3)]);
const left = carve([rightPetal.map(mirrored)],
  [middle, ...offset(middle, 3.4), outerVein.map(mirrored), branch, ...offset(branch, 3)]);
const leavesAndBranch = carve([leaf, branch], [...markings, ...bark]);

export function nakaBirakiEdaZakuraBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const part = "cherry";
  const place = { k: .94 };
  c.fill(part, toPath([...central, ...side, ...left], place), "evenodd");
  c.fill(part, toPath(leavesAndBranch, place), "evenodd");
}
