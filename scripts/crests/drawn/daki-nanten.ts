import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, onCircle, shortArc } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { berry } from "../library/berry.ts";
import { PAPER } from "../library/part.ts";

type Arc = Extract<Piece, { t: "A" }>;
const motif = "nanten";
const sheet = ([x, y]: V): V => [(x - 98) * .91, (104 - y) * .905];
const trunkFoot = sheet([112, 184]);
const trunkTip = sheet([56, 66]);
const trunkBow = -.187;
const trunk = [sweep(trunkFoot, trunkTip, trunkBow)];
const tailTip = sheet([142, 181.5]);

function root(p: V, arcs = trunk): V {
  const points = arcs.map(({ c, r, a0, a1 }) => {
    const a = Math.atan2(p[1] - c[1], p[0] - c[0]) - a0;
    const d = Math.atan2(Math.sin(a), Math.cos(a));
    const t = Math.max(0, Math.min(.91, d / (a1 - a0)));
    return onCircle(c, r, a0 + t * (a1 - a0));
  });
  const distance = (q: V) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  return points.reduce((best, q) => distance(q) < distance(best) ? q : best);
}

const sprigs: readonly (readonly [number, V, V, number, number])[] = [
  [-1, [61, 121], [28, 104], 2.3, -.065], [0, [40, 111], [28, 79], 2.0, .10],
  [-1, [62, 122], [74, 94], 2.2, -.07], [-1, [84, 166], [40, 157], 2.8, .03],
  [3, [70, 161], [46, 173], 2.1, .09], [-1, [90, 173], [85, 142], 2.0, -.12],
];
const leafParents = [0, 1, 0, -1, 2, 2, 3, 3, 4, 5, 5, 5];
function sweep(base: V, to: V, bend: number): Arc {
  const { length, unit } = axis(base, to);
  const w = Math.abs(bend * length);
  const r = length * length / (8 * w) + w / 2;
  const normal: V = [unit[1], -unit[0]];
  const mid: V = [(base[0] + to[0]) / 2, (base[1] + to[1]) / 2];
  const hint: V = [mid[0] - Math.sign(bend) * normal[0] * r, mid[1] - Math.sign(bend) * normal[1] * r];
  return shortArc(circleThrough(base, to, r, hint), base, to) as Arc;
}

const leaves: readonly (readonly [join: V, foot: V, tip: V, length: number, bend: number])[] = [
  [[65, 123], [29, 105], [15, 63], 39, -.08], [[34, 104], [28, 82], [42, 36], 42, .045],
  [[52, 115], [41, 109], [45, 65], 38, .06], [[60, 107], [59, 96], [65, 67], 27, -.07],
  [[62, 121], [73, 96], [93, 57], 40, -.07], [[61, 122], [66, 111], [97, 86], 37, -.045],
  [[82, 165], [32, 150], [6, 104], 45, -.045], [[69, 162], [55, 160], [34, 118], 42, .045],
  [[74, 162], [49, 174], [9, 147], 41, .06], [[90, 172], [82, 162], [66, 124], 38, -.025],
  [[89, 171], [85, 145], [85, 111], 32, -.06], [[89, 158], [89, 150], [98, 132], 22, .06],
];
const berries: V[] = [[68, 22], [81, 20], [60, 33], [72, 33], [84, 32], [56, 44], [67, 44], [78, 43], [53, 54], [63, 54], [74, 53], [54, 65], [65, 64]];

function axis(from: V, to: V) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  return { length, turn: Math.atan2(dx, dy) / DEG, unit: [dx / length, dy / length] as V };
}

export function dakiNantenBuild(c: Builder): void {
  c.precision(3);
  c.group(() => layerParts(c, () => {
    for (const side of [1, -1]) {
      const flip = ([x,y]: V): V => [side*x,y];
      const rails: Arc[] = [];
      function twig(a: V, b: V, width: number, bend: number, keyline = 0): void {
        const base = flip(a);
        const to = flip(b);
        const placement = axis(base, to);
        const centre: V = [(base[0] + to[0]) / 2, (base[1] + to[1]) / 2];
        branchTaper.build(c, centre, placement.turn, placement.length, {
          motif, paper: PAPER, width: Math.min(.43, width / placement.length), bend: bend * side, keyline,
        });
      }
      const crossingPaper = side < 0 ? PAPER : 0;
      twig(trunkFoot, trunkTip, 6.2, trunkBow, crossingPaper);
      twig(root(sheet([107, 182])), tailTip, 4.0, .056);
      for (const [prior, join, end, width, bow] of sprigs) {
        const a = root(sheet(join), prior < 0 ? trunk : [rails[prior]]);
        const b = sheet(end);
        rails.push(sweep(a, b, bow));
        twig(a, b, width, bow);
      }
      for (const [i, [, foot, tip, size]] of leaves.entries()) {
        const a = sheet(foot);
        const b = sheet(tip);
        const { unit } = axis(a, b);
        const tipOfTwig: V = [a[0] + 4.4 * unit[0], a[1] + 4.4 * unit[1]];
        const parent = leafParents[i];
        const from = root(a, parent < 0 ? trunk : [rails[parent]]);
        if (axis(from, tipOfTwig).length > .7) twig(from, tipOfTwig, 1.65, -.035);
        const leafEnd: V = [a[0] + size * unit[0], a[1] + size * unit[1]];
        const leafCentre: V = [(a[0] + leafEnd[0]) / 2, (a[1] + leafEnd[1]) / 2];
        leafLens.build(c, flip(leafCentre), axis(flip(a), flip(leafEnd)).turn, size, { motif, paper: PAPER, width: .32 });
      }
    }
  }));
  c.group(() => layerParts(c, () => {
    for (const side of [1, -1]) {
      for (const position of berries) {
        const [x, y] = sheet(position);
        berry.build(c, [side * x, y], 0, 6.45, { motif, paper: PAPER, keyline: PAPER });
      }
    }
  }));
}
