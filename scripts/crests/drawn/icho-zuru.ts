import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

// The anchors use the 1892 cell's width and height as 200 divisions each.
const point = ([x, y]: V): V => [(x - 104) * .96, (91 - y) * .91];

function bend(from: V, through: V, to: V): Piece {
  const a = point(from);
  const b = point(to);
  const m = point(through);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const chord = Math.hypot(dx, dy);
  const normal: V = [-dy / chord, dx / chord];
  const middle: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const offset: V = [m[0] - middle[0], m[1] - middle[1]];
  const rise = offset[0] * normal[0] + offset[1] * normal[1];
  if (Math.abs(rise) < .4) return seg(a, b);

  const height = (offset[0] ** 2 + offset[1] ** 2 - (chord / 2) ** 2) / (2 * rise);
  const hint: V = [middle[0] + height * normal[0], middle[1] + height * normal[1]];
  const radius = Math.max(Math.ceil(chord / 2), Math.round(Math.hypot(chord / 2, height)));

  return shortArc(circleThrough(a, b, radius, hint), a, b);
}

function boundary(anchors: V, runs: readonly (readonly [V, V])[]): Region {
  let start = anchors;

  return runs.map(([middle, end]) => {
    const edge = bend(start, middle, end);
    start = end;

    return edge;
  });
}

function vein(from: V, through: V, to: V, width: number): Region {
  const edge = bend(from, through, to);

  return edge.t === "A"
    ? thickArc(edge.c, edge.r, width, Math.min(edge.a0, edge.a1), Math.max(edge.a0, edge.a1))
    : thickSeg(edge.a, edge.b, width);
}

const fan = boundary([132, 117], [
  [[146, 102], [166, 92]], [[184, 88], [198, 88]],
  [[195, 82], [193, 80]], [[191, 71], [184, 68]],
  [[182, 59], [175, 53]], [[168, 53], [160, 50]],
  [[154, 56], [148, 63]], [[140, 65], [137, 59]],
  [[144, 53], [152, 49]], [[157, 43], [157, 37]],
  [[155, 32], [154, 29]], [[150, 25], [147, 24]],
  [[144, 17], [133, 14]], [[129, 9], [121, 7]],
  [[117, 8], [114, 11]], [[105, 10], [99, 15]],
  [[93, 14], [87, 18]], [[86, 22], [81, 23]],
  [[78, 28], [77, 33]], [[79, 40], [88, 49]],
  [[94, 55], [93, 63]], [[88, 66], [82, 64]],
  [[79, 58], [79, 52]], [[77, 46], [71, 43]],
  [[66, 44], [62, 47]], [[51, 46], [43, 54]],
  [[41, 58], [41, 59]], [[34, 65], [33, 81]],
  [[21, 99], [11, 121]], [[33, 100], [57, 85]],
  [[71, 82], [82, 84]], [[93, 96], [104, 113]],
  [[118, 111], [132, 117]],
]);

const neck = boundary([132, 120], [
  [[113, 142], [89, 157]], [[70, 165], [50, 170]],
  [[39, 172], [30, 176]], [[33, 171], [45, 168]],
  [[56, 158], [67, 156]], [[89, 147], [102, 132]],
  [[104, 123], [105, 116]], [[118, 114], [132, 120]],
]);

const veins = [
  vein([117, 114], [118, 69], [118, 21], 2.1),
  vein([117, 77], [111, 53], [99, 40], 1.8),
  vein([119, 76], [125, 54], [138, 35], 1.8),
  vein([109, 115], [86, 81], [48, 76], 2),
  vein([123, 116], [144, 81], [177, 66], 2),
];

export function ichoZuruBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.fill("ginkgo", toPath(carve([fan], veins), { k: 1 }), "evenodd");
  c.fill("crane", toPath(carve([neck], [disc(point([40, 172]), 1.1)]), { k: 1 }), "evenodd");
}
