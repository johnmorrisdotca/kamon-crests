import type { Builder } from "../../construct/builder.ts";
import { DEG, nearest, onCircle, vdist } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { berry } from "../library/berry.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { branchSpine, branchSpineGeometry } from "../library/branch-spine.ts";
import { layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { leafLens } from "../library/leaf-lens.ts";

const motif = "nanten";
const axis = (base: V, tip: V) => ({
  centre: [(base[0] + tip[0]) / 2, (base[1] + tip[1]) / 2] as V,
  angle: Math.atan2(tip[0] - base[0], tip[1] - base[1]) / DEG,
  length: Math.hypot(tip[0] - base[0], tip[1] - base[1]),
});

// A tangent follows each of the compass arcs in the single continuous main stem.
const trunkPoints: V[] = [[-38, -80.9], [-7.6, -65.4], [18.5, -33.1], [24, 11.6], [0.1, 57.5]];
const trunkFoot = trunkPoints[0];
const trunkLength = vdist(trunkFoot, trunkPoints.at(-1)!);
const stations = trunkPoints.map(([x, y]): V => [(x - trunkFoot[0]) / trunkLength, (y - trunkFoot[1]) / trunkLength]);
const heading = -5;
const trunkWidth = 2.5;
const trunk = branchSpineGeometry(trunkPoints, trunkWidth, heading).axis;

const rootOnTrunk = (p: V): V => {
  const roots = trunk.map((piece) => {
    if (piece.t === "L") {
      const [x, y] = piece.a;
      const dx = piece.b[0] - x;
      const dy = piece.b[1] - y;
      const k = Math.max(0, Math.min(1, ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy)));
      return [x + k * dx, y + k * dy] as V;
    }
    const { c, r, a0, a1 } = piece;
    const angle = Math.atan2(p[1] - c[1], p[0] - c[0]) - a0;
    const delta = Math.atan2(Math.sin(angle), Math.cos(angle));
    const progress = Math.max(0, Math.min(1, delta / (a1 - a0)));
    return onCircle(c, r, a0 + progress * (a1 - a0));
  });
  return nearest(roots, p);
};

// Side stems leave an actual root on the trunk. Leaf and fruit bases cover their stem tips.
const trunkOffshoots: [V, V, number, number][] = [
  [[5.7, 43.6], [-25, 61], 1.6, -.07],
  [[6.5, 43.7], [-24.9, 46.2], 1.45, .015],
  [[18.6, 24], [21.2, 45.3], 1.55, -.025],
  [[21.4, 19], [38, 39.3], 1.6, -.044],
  [[20.2, 22.2], [11.2, 28.3], 1.55, .035],
  [[26.4, -0.6], [46.2, 12.2], 1.6, -.05],
  [[25.6, -21], [52.3, -4.3], 1.6, -.06],
  [[21.3, -32.5], [19.2, -17], 1.3, .075],
  [[1.5, -52.3], [-19.4, -22.8], 2, .06],
  [[-1, -48], [-18.3, -43.6], 1.6, .025],
  [[20.6, -33.5], [42.4, -31.6], 1.55, .047],
  [[-13.6, -66.4], [39.2, -65.7], 1.7, -.032],
  [[25.7, -6.5], [18.7, -6.3], 1.15, -.055],
];
const stems: [V, V, number, number][] = [
  ...trunkOffshoots.map(([base, tip, width, bend]): [V, V, number, number] => [rootOnTrunk(base), tip, width, bend]),
  [[-9.5, -37], [-24.8, -20.8], 1.55, -.035],
  [[-9.5, -37], [-10.2, -20.5], 1.55, .03],
  [[-42.6, -62], [-58.4, -72], 1, .018],
  [[18.7, -67.7], [38.3, -55.9], 1.35, -.017],
  [[-14, 8], [-30.7, 22.8], 1.65, -.09],
  [[-29.8, 22.2], [-43.5, 22], 1.3, .008],
  [[-31.5, 18], [-28.6, 40.4], 1.3, -.085],
];

const leaves: [V, V][] = [
  [[0.9, 55.3], [-21.3, 84.2]],
  [[-21.6, 59.9], [-63.5, 72.7]],
  [[19.8, 41.6], [32.5, 77.5]],
  [[35, 37.4], [61.4, 54.7]],
  [[14.3, 28], [-26.4, 31.9]],
  [[42.3, 12.2], [80, 13.1]],
  [[-21.9, -23.1], [-60.2, 4]],
  [[-9.7, -23.7], [-14.3, 20.7]],
  [[-14.9, -41.3], [-49.6, -66.3]],
];

const fruit: V[] = [
  [-50.8, 26.4], [-44.9, 26.4], [-40.2, 26.2], [-56, 25], [-47.7, 22.5], [-59.9, 22], [-42.3, 22],
  [-53.4, 21.1], [-63.3, 18.9], [-49.7, 18.2], [-58.2, 17.7], [-43.2, 17.5], [-53.9, 16.1], [-63.3, 14.3],
  [-58.9, 13], [3.1, 16.2], [7.4, 14.7], [-3.9, 13.7], [9.8, 10.8], [2.4, 10.9], [-6.2, 9.7],
  [-2.3, 7.2], [10, 6.1], [1.8, 4.3], [13.7, 0.9], [6.4, 0], [18.8, -1.8], [15.5, -5.2],
  [9.7, -5.8], [20.7, -6.4], [17.3, -10], [11.9, -10.9], [4.3, -12.8], [44.1, -26.8], [48.9, -29.2],
  [55.9, -31], [39.2, -31], [44.7, -33.7], [61.7, -34], [50.8, -36.2], [39.2, -37.1], [66.9, -38.3],
  [57.5, -39.5], [43.5, -39.5], [72, -42.3], [47.7, -42.3], [63.5, -43.2], [52.9, -43.2], [57.5, -45.6],
  [72, -48.3], [63.8, -49.6],
];

/** One spray of nine leaves and three bunches of berries on a tapering stem. */
export function edaNantenBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => layerParts(c, () => {
    branchSpine.build(c, trunkFoot, 0, trunkLength, { motif, stations, heading, width: trunkWidth / trunkLength, paper: PAPER });
    for (const [base, tip, baseWidth, bend] of stems) {
      const { centre, angle, length } = axis(base, tip);
      branchTaper.build(c, centre, angle, length, { motif, width: baseWidth / length, bend, paper: PAPER });
    }
    for (const [base, tip] of leaves) {
      const { angle, length } = axis(base, tip);
      const reach = 39 / (2 * length);
      const centre: V = [base[0] + (tip[0] - base[0]) * reach, base[1] + (tip[1] - base[1]) * reach];
      leafLens.build(c, centre, angle, 39, { motif, width: .32, paper: PAPER });
    }
    for (const point of fruit) berry.build(c, point, 0, 2.14, { motif, highlight: "opening", paper: PAPER });
  }));
}
