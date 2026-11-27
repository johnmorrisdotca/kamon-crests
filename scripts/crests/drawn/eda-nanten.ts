import type { Builder } from "../../construct/builder.ts";
import { DEG, onCircle } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { berry } from "../library/berry.ts";
import { branchTaper, branchTaperAxis } from "../library/branch-taper.ts";
import { layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

const motif = "nanten";

function axis(base: V, tip: V) {
  const dx = tip[0] - base[0];
  const dy = tip[1] - base[1];
  const length = Math.hypot(dx, dy);
  const centre: V = [(base[0] + tip[0]) / 2, (base[1] + tip[1]) / 2];
  return { centre, turn: Math.atan2(dx, dy) / DEG, length };
}

const foot: V = [-38, -80.9];
const crown: V = [-2.7, 60.1];
const bend = .294;
const trunk = axis(foot, crown);
const spine = branchTaperAxis(bend);

/** Use the nearest point on the same compass arc as the stock trunk. */
function trunkRoot([x, y]: V): V {
  const sin = Math.sin(trunk.turn * DEG);
  const cos = Math.cos(trunk.turn * DEG);
  const dx = (x - trunk.centre[0]) / trunk.length;
  const dy = (y - trunk.centre[1]) / trunk.length;
  const local: V = [dx * cos - dy * sin, dx * sin + dy * cos];
  const angle = Math.atan2(local[1] - spine.c[1], local[0] - spine.c[0]) - spine.a0;
  const sweep = Math.atan2(Math.sin(angle), Math.cos(angle));
  const progress = Math.max(0, Math.min(1, sweep / (spine.a1 - spine.a0)));
  const [u, v] = onCircle(spine.c, spine.r, spine.a0 + progress * (spine.a1 - spine.a0));
  return [trunk.centre[0] + trunk.length * (u * cos + v * sin), trunk.centre[1] + trunk.length * (-u * sin + v * cos)];
}

type Stem = readonly [base: V, tip: V, width: number, bend: number];
const fork: V = [-8.3, -36.8];
const leftFruitFork: V = [-30.6, 22.7];
const rightStubFork: V = [17.9, -67.5];

// Every main side stem leaves the actual trunk arc. Tips reach into the part they carry.
const offshoots: readonly Stem[] = [
  [[5.7, 43.6], [-24.9, 60.7], 2.7, -.07],
  [[6.5, 43.7], [-24.9, 46.2], 2.05, .015],
  [[18.6, 24], [21.2, 45.3], 2.8, -.025],
  [[21.4, 19], [38, 39.3], 2.9, -.044],
  [[20.2, 22.2], [11.2, 28.3], 2.7, .035],
  [[26.4, -.6], [46.2, 12.2], 2.65, -.05],
  [[25.6, -21], [52.3, -4.3], 2.55, -.06],
  [[21.3, -32.5], [19.2, -17], 2.1, .075],
  [[1.5, -52.3], [-8.7, -36], 3.85, .06],
  [[-1, -48], [-18.3, -43.6], 2.8, .025],
  [[20.6, -33.5], [42.9, -31.4], 2.7, .047],
  [[-13.6, -66.4], [39.2, -65.7], 2.9, -.032],
  [[25.7, -6.5], [15.8, -6.5], 2.5, -.055],
];
const secondary: readonly Stem[] = [
  [fork, [-24.8, -20.8], 2.55, -.035],
  [fork, [-10.2, -20.5], 2.55, .03],
  [[-42.6, -62], [-58.4, -72], 1.55, .018],
  [rightStubFork, [38.3, -55.9], 1.9, -.017],
  [[-14, 8], [-31, 22.7], 2.9, -.09],
  [leftFruitFork, [-44.9, 22], 2.2, .008],
  [leftFruitFork, [-28.6, 40.4], 1.9, -.085],
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

// Three bunches follow the cell's printed extents. Each repeats the same solid berry.
const bunches: readonly (readonly V[])[] = [
  [[-61.9, 17.8], [-56.4, 14.8], [-58, 23], [-51.7, 26.1], [-49.7, 18.8], [-44.2, 22.6]],
  [[-4.4, 10.1], [2.3, 12.9], [8.6, 9.9], [-.5, 4.0], [6.8, 3.4], [11.5, -1.6], [6.8, -6.0], [15.0, -7.6]],
  [[43.8, -28.6], [50.9, -31], [44.6, -36.4], [57.8, -33.5], [53.6, -40.4], [64.5, -38.7], [62.0, -45.3], [70.0, -44.4]],
];

function drawStem(c: Builder, [base, tip, width, curve]: Stem) {
  const { centre, turn, length } = axis(base, tip);
  branchTaper.build(c, centre, turn, length, { motif, width: width / length, bend: curve, paper: PAPER });
}

/** The nine leaves and three bunches repeat two stock parts around a tapered stalk. */
export function edaNantenBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  c.group(() => {
    layerParts(c, () => {
      branchTaper.build(c, trunk.centre, trunk.turn, trunk.length, { motif, width: .048, bend, paper: PAPER });
      for (const [root, tip, width, curve] of offshoots) drawStem(c, [trunkRoot(root), tip, width, curve]);
      for (const stem of secondary) drawStem(c, stem);
      for (const [base, tip] of leaves) {
        const { turn, length } = axis(base, tip);
        const reach = 39 / (2 * length);
        const centre: V = [base[0] + (tip[0] - base[0]) * reach, base[1] + (tip[1] - base[1]) * reach];
        leafLens.build(c, centre, turn, 39, { motif, width: .32, paper: PAPER });
      }
    });
    for (const bunch of bunches) {
      layerParts(c, () => {
        for (const point of bunch) berry.build(c, point, 0, 4.4, { motif, paper: PAPER, keyline: PAPER });
      });
    }
  });
}
