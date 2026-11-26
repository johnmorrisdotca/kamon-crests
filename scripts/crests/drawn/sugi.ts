// Cedar silhouettes and branching cuts measured from frame 45 of the 1892 book.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, lineLine, mirrored, reversedRun, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { dist, mid } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type Tree = {
  x: number;
  top: number;
  bottom: number;
  foot: number;
  width: number;
  trunk: number;
};

const bisector = (p: V, q: V): [V, V] => {
  const [x, y] = mid(p, q);
  return [[x, y], [x + p[1] - q[1], y + q[0] - p[0]]];
};

const arc = (from: V, through: V, to: V): Arc => {
  const c = lineLine(...bisector(from, through), ...bisector(through, to));
  const turn = (through[0] - from[0]) * (to[1] - from[1]) > (through[1] - from[1]) * (to[0] - from[0]);
  return arcTo({ c, r: dist(c, from) }, from, to, turn) as Arc;
};

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

const profile = ([from, through, to]: [V, V, V], width: number): Region => {
  const { c, r, a0, a1 } = arc(from, through, to);
  return thickArc(c, r, width, a0, a1);
};

const cedar = (tree: Tree): { crown: Region; ink: Region[] } => {
  const point = (x: number, proportion: number): V => [x * tree.width, tree.bottom + proportion * (tree.top - tree.bottom)];
  const tip = point(0, 1);
  const notches: [inner: number, base: number, outer: number, rise: number][] = [
    [0.12, 0.936, 0.21, 0.983],
    [0.24, 0.852, 0.38, 0.909],
    [0.40, 0.765, 0.54, 0.817],
    [0.56, 0.667, 0.67, 0.725],
    [0.70, 0.572, 0.82, 0.623],
    [0.80, 0.477, 0.95, 0.528],
    [0.92, 0.380, 1.00, 0.421],
  ];
  const half: Region = [];
  let next = tip;
  for (const [inner, base, outer, rise] of notches) {
    const valley = point(inner, base);
    const shoulder = point(outer, rise);
    half.push(
      arc(next, point((inner + next[0] / tree.width) / 2 + 0.012, (base + (next[1] - tree.bottom) / (tree.top - tree.bottom)) / 2), valley),
      arc(valley, point((inner + outer) / 2 - 0.012, (base + rise) / 2), shoulder),
    );
    next = shoulder;
  }
  const hip = point(0.87, 0.19);
  half.push(arc(next, point(0.98, 0.31), hip));
  half.push(arc(hip, point(0.55, 0.057), point(0, 0)));
  const crown = [...half, ...reversedRun(half.map(mirrored))];

  const branches = [0.827, 0.724, 0.622, 0.518, 0.414, 0.310, 0.206].flatMap((base, index) => {
    const span = [0.22, 0.36, 0.48, 0.58, 0.69, 0.75, 0.62][index];
    const reach = point(span, base - 0.101);
    const joint = point(span * 0.57, base - 0.054);
    const main = profile([point(0.024, base), point(span * 0.51, base - 0.068), reach], 2.05);
    const twig = thickSeg(joint, point(span * 0.9, base - 0.062), 1.45);
    return [main, twig, main.map(mirrored), twig.map(mirrored)];
  });

  const stemFloor = tree.foot;
  const stem: Region = polygon([[-tree.trunk / 2, stemFloor], [tree.trunk / 2, stemFloor], [0.9, tree.top - 6], [-0.9, tree.top - 6]]);
  const gap = polygon([[-tree.trunk / 2 - 1.5, stemFloor - 2], [tree.trunk / 2 + 1.5, stemFloor - 2], [2.25, tree.top - 3], [-2.25, tree.top - 3]]);
  return { crown, ink: [...carve([crown], [...branches, gap]), stem] };
};

const treeAt = (c: Builder, tree: Tree): void => {
  c.fill("cedar", toPath(cedar(tree).ink, { k: 1, at: [tree.x, 0] }));
};

export const maruNiIpponSugiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  c.guideLine([100, 4], [100, 196]);
  treeAt(c, { x: 0, top: 83, bottom: -74, foot: -87, width: 60, trunk: 5.6 });
};

export const itowaNiSugiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thread");
  c.guideLine([100, 4], [100, 196]);
  treeAt(c, { x: 0, top: 88, bottom: -77, foot: -91, width: 68, trunk: 9.9 });
};

export const maruNiNihonSugiBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  const tree: Tree = { x: -41, top: 67, bottom: -65, foot: -76, width: 39, trunk: 4.5 };
  treeAt(c, tree);
  treeAt(c, { ...tree, x: -tree.x });
};
