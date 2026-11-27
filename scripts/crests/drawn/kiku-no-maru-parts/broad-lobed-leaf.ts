import { carveWhere, circleThrough, inside, mirrored, shortArc, thickArc, thickSeg } from "../../../construct/compass.ts";
import type { Piece, Region, V } from "../../../construct/compass.ts";

type Arc = Extract<Piece, { t: "A" }>;

// Half of the broad lobed leaf in 菊の丸, frame 40 R1 C3. The midrib runs from the foot to the highest lobe.
const half: V[] = [
  [0, 0], [16, 8], [19, 20], [14, 22], [30, 26], [32, 34],
  [21, 40], [23, 51], [13, 55], [13, 65], [0, 75],
];
const points: V[] = [...half, ...half.slice(1, -1).reverse().map(([x, y]): V => [-x, y])];
const outline = points.map((a, i) => {
  const b = points[(i + 1) % points.length];
  return shortArc(circleThrough(a, b, Math.hypot(a[0] - b[0], a[1] - b[1]) * 2, [0, 38]), a, b);
});

export function broadLobedChrysanthemumLeaf(paper: number): Region[] {
  const clefts = [thickSeg([0, 3], [0, 70], paper)];
  for (const [height, extent, rise] of [[15, 16, 12], [29, 22, 8], [43, 10, 15]]) {
    const foot: V = [0, height];
    const tip: V = [extent, height + rise];
    const arc = shortArc(circleThrough(foot, tip, 40, [extent, 0]), foot, tip) as Arc;
    const vein = thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
    clefts.push(vein, vein.map(mirrored));
  }
  return carveWhere([...outline, ...clefts.flat()], (p) => inside(outline, p) && !clefts.some((region) => inside(region, p)));
}
