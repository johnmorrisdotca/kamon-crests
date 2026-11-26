import { WEIGHT } from "../../construct/builder.ts";
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const FLOWER = "bellflower";
const placing = { k: 1 };

function arc(from: V, to: V, radius: number, centre: V) {
  return shortArc(circleThrough(from, to, radius, centre), from, to);
}

function fanRays(centre: V, ends: V[]): Region[] {
  return ends.map((end) => thickSeg(centre, end, WEIGHT.thread));
}

export function maruNiHitotsuKikyoBuild(c: Builder): void {
  const hook = thickArc([-10, 62], 9, 5.6, -55 * DEG, 235 * DEG);
  const rearLeaf = [
    arc([-18, 18], [-48, 50], 57, [5, 67]),
    arc([-48, 50], [6, 27], 66, [-38, -17]),
    seg([6, 27], [-18, 18]),
  ];
  const rearTip = [
    arc([-13, 27], [21, 70], 62, [34, 25]),
    arc([21, 70], [18, 42], 27, [-2, 58]),
    seg([18, 42], [-13, 27]),
  ];
  const highPetal = [
    arc([-12, 24], [36, 57], 62, [30, -2]),
    arc([36, 57], [33, 24], 44, [-7, 47]),
    seg([33, 24], [-12, 24]),
  ];
  const left = [
    arc([-10, -14], [-48, 25], 54, [5, 41]),
    arc([-48, 25], [-12, 23], 83, [-32, -56]),
    arc([-12, 23], [3, -8], 32, [-29, -4]),
    seg([3, -8], [-10, -14]),
  ];
  const right = [
    arc([2, -9], [17, 28], 40, [36, 0]),
    arc([17, 28], [51, 39], 61, [18, 86]),
    arc([51, 39], [40, -3], 99, [-44, 42]),
    seg([40, -3], [2, -9]),
  ];
  const cup = [
    arc([-44, -13], [5, -19], 51, [-23, -62]),
    arc([5, -19], [62, 0], 67, [50, -60]),
    arc([62, 0], [28, -36], 74, [91, -60]),
    arc([28, -36], [18, -70], 86, [-55, -30]),
    arc([18, -70], [-12, -77], 22, [-1, -58]),
    arc([-12, -77], [-18, -58], 16, [0, -64]),
    arc([-18, -58], [-7, -53], 11, [-17, -47]),
    arc([-7, -53], [-44, -13], 74, [-74, -77]),
  ];
  const cupSeam = thickArc([36, -44], 35, WEIGHT.thread, 113 * DEG, 183 * DEG);
  const petalRays = fanRays([3, -8], [[-33, 11], [-23, 14], [-13, 18], [-3, 18], [7, 20], [16, 17], [27, 15]]);
  const seam = fanRays([-11, 20], [[-38, 19], [6, 23], [26, 30]]);

  c.ring("ring-medium");
  c.fill(FLOWER, toPath(carve([hook, rearTip, highPetal, rearLeaf], [left, right, ...seam]), placing));
  c.fill(FLOWER, toPath(carve([left, right], [...petalRays, cup, ...seam]), placing), "evenodd");
  c.fill(FLOWER, toPath(carve([cup], [cupSeam]), placing), "evenodd");
}
