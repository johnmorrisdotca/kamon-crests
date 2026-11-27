import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

const arc = (from: V, to: V, radius: number, centre: V): Piece =>
  shortArc(circleThrough(from, to, radius, centre), from, to);

const paired = (half: Piece[]): Region => [...half, ...reversedRun(half.map(mirrored))];

function ribbon(from: V, to: V, radius: number, centre: V, width: number): Region {
  const line = arc(from, to, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(line.c, line.r, width, Math.min(line.a0, line.a1), Math.max(line.a0, line.a1));
}

const wings = paired([
  arc([0, 5], [38, 21], 53, [34, -31]),
  arc([38, 21], [75, 21], 60, [57, -36]),
  arc([75, 21], [92, 8], 26, [69, -4]),
  arc([92, 8], [94, -16], 39, [57, -5]),
  arc([94, -16], [85, -37], 24, [72, -19]),
  arc([85, -37], [70, -45], 20, [70, -25]),
  arc([70, -45], [54, -56], 30, [51, -32]),
  arc([54, -56], [38, -58], 25, [45, -38]),
  arc([38, -58], [19, -78], 29, [13, -52]),
  arc([19, -78], [0, -87], 28, [0, -59]),
]);

const lowerWing = (shoulder: number) => paired([
  arc([0, shoulder], [17, -34], 40, [-21, -46]),
  arc([17, -34], [22, -53], 26, [-4, -51]),
  arc([22, -53], [14, -64], 16, [11, -50]),
  arc([14, -64], [0, -71], 15, [0, -56]),
]);

const sideWing = (root: V): Region => [
  arc(root, [42, 9], 45, [39, -36]),
  arc([42, 9], [67, 9], 44, [52, -30]),
  arc([67, 9], [78, -3], 20, [61, -11]),
  arc([78, -3], [74, -27], 27, [52, -15]),
  arc([74, -27], [62, -35], 15, [59, -21]),
  arc([62, -35], [43, -33], 42, [55, 5]),
  arc([43, -33], root, 52, [-1, -56]),
];

const spike = paired([
  arc([0, 87], [11, 80], 13, [3, 74]),
  arc([11, 80], [9, 70], 13, [-2, 77]),
  arc([9, 70], [15, 65], 14, [3, 57]),
  arc([15, 65], [15, 58], 11, [4, 62]),
  arc([15, 58], [19, 48], 15, [4, 49]),
  arc([19, 48], [20, 40], 12, [9, 43]),
  arc([20, 40], [24, 31], 13, [12, 33]),
  arc([24, 31], [24, 19], 19, [6, 24]),
  arc([24, 19], [0, 12], 32, [4, 43]),
]);

function softSpike(c: Builder, placing: Placing, tiers: readonly number[]): void {
  const cuts = tiers.flatMap((y) => {
    const left = ribbon([-22, y - 0.6], [-0.8, y - 5.8], 33, [-2, y + 27], 1.9);

    return [left, left.map(mirrored)];
  });
  cuts.push(thickSeg([0, 11], [0, 78], 2.7));
  c.fill("paulownia", toPath(carve([spike], cuts), placing), "evenodd");
}

function shadowKiri(c: Builder, ringed: boolean): void {
  c.precision(2);
  if (ringed) {
    const room = c.ring("ring-medium");
    c.zoom((room - RING_GAP) / R);
  }
  c.guideCircle(C0, R);
  softSpike(c, { k: 0.95, at: [0, -7] }, [49, 71]);
  for (const x of [-61, 61]) softSpike(c, { k: 0.61, at: [x, 9] }, [50]);
  const upper = sideWing(ringed ? [18, 0] : [12, -2]);
  const centre = disc([0, 0], 12.2);
  const cuts = [upper, upper.map(mirrored), lowerWing(ringed ? -27 : -14), centre];
  if (ringed) {
    const loop = ribbon([13, -4.4], [33, -11.7], 34, [16, -35], 3.4);
    cuts.push(loop, loop.map(mirrored), thickSeg([0, -12], [0, -22], 3.3));
  }
  c.fill("paulownia", toPath(carve([wings], cuts), { k: 1 }), "evenodd");
  c.fill("paulownia", toPath([disc([0, 0], 10.1)], { k: 1 }));
}

export function chukageKiriBuild(c: Builder): void {
  shadowKiri(c, false);
}

export function maruNiChukageKiriBuild(c: Builder): void {
  shadowKiri(c, true);
}
