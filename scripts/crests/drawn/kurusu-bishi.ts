import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const outline = (corners: V[]): Region => corners.map((corner, i) => seg(corner, corners[(i + 1) % corners.length]));
const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to);

const outer = outline([[0, 63], [75, 0], [0, -63], [-75, 0]]);
const inner = outline([[0, 49], [59, 0], [0, -49], [-59, 0]]);

const cap: Region = [
  seg([-10, 57], [-22, 70]),
  curve([-22, 70], [-9, 72], 19, [-15, 54]),
  curve([-9, 72], [0, 82], 12, [0, 72]),
  curve([0, 82], [9, 72], 12, [0, 72]),
  curve([9, 72], [22, 70], 19, [15, 54]),
  seg([22, 70], [10, 57]),
  seg([10, 57], [-10, 57]),
];

// The two lateral caps extend farther than the upper and lower pair.
const sideCap: Region = [
  curve([60, 12], [87, 23], 56, [79, 64]),
  curve([87, 23], [86, 8], 26, [63, 16]),
  curve([86, 8], [96, 0], 18, [82, -6]),
  curve([96, 0], [86, -8], 18, [82, 6]),
  curve([86, -8], [87, -23], 26, [63, -16]),
  curve([87, -23], [60, -12], 56, [79, -64]),
  seg([60, -12], [60, 12]),
];
const petal: Region = [
  curve([8, 8], [12, 19], 24, [31, 2]),
  seg([12, 19], [9, 27]),
  curve([9, 27], [17, 25], 15, [14, 12]),
  seg([17, 25], [24, 29]),
  curve([24, 29], [28, 23], 18, [12, 20]),
  seg([28, 23], [35, 16]),
  curve([35, 16], [25, 12], 18, [23, 27]),
  curve([25, 12], [8, 8], 45, [20, -30]),
];
const petalInk = carve([petal], [thickSeg([13, 11], [24, 20], 1.7)]);
const uprightArm = outline([[-2.7, 9], [-4.8, 43], [0, 49], [4.8, 43], [2.7, 9]]);
const sidewaysArm = outline([[-2.7, 9], [-4.8, 52], [0, 59], [4.8, 52], [2.7, 9]]);

export const kurusuBishiBuild = (c: Builder): void => {
  c.precision(3);
  for (const turn of [0, 90, 180, 270]) {
    const lateral = turn === 90 || turn === 270;
    if (!lateral) c.fill("cross", toPath([cap], { k: 1, turn }));
    c.fill("cross", toPath([lateral ? sidewaysArm : uprightArm], { k: 1, turn }));
    c.fill("cross", toPath(petalInk, { k: 1, turn }));
  }
  c.fill("cross", toPath([sideCap], { k: 1 }));
  c.fill("cross", toPath([sideCap.map(mirrored)], { k: 1 }));
  c.fill("diamond", toPath([outer, inner], { k: 1 }), "evenodd");
  c.fill("cross", toPath([disc([0, 0], 8.5)], { k: 1 }));
};
