import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, shortArc, thickArc, toPath } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";
import { AOI_LEAF } from "./aoi.ts";

const arc = (from: V, to: V, radius: number, near: V): Piece => shortArc(circleThrough(from, to, radius, near), from, to);

function curvedBand(from: V, to: V, radius: number, centre: V, width: number): Region {
  const curve = arc(from, to, radius, centre) as Extract<Piece, { t: "A" }>;

  return thickArc(curve.c, curve.r, width, Math.min(curve.a0, curve.a1), Math.max(curve.a0, curve.a1));
}

const aoiLocation = (turn: number, reach: number): V => [reach * Math.sin(turn * DEG), reach * Math.cos(turn * DEG)];

function aoiLeafAt(c: Builder, placing: Placing): void {
  const right = toPath([AOI_LEAF.axis, ...AOI_LEAF.cells], placing);
  const left = toPath(AOI_LEAF.cells, { ...placing, mirror: true });

  c.fill("hollyhock", right.join(left));
}

export function aoiGurumaBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(6, 0, R);
  const size = 0.63;
  const at = 43.5 - AOI_LEAF.tip[1] * size;
  const vine = carve([
    curvedBand([6, 12.3], [15.4, 49], 52, [53, 26], 7),
    curvedBand([15.4, 49], [33.7, 71.5], 37, [-1, 80], 7),
    curvedBand([33.7, 71.5], [14, 78.1], 20, [23, 68], 7),
    disc([15.4, 49], 3.45),
    disc([33.7, 71.5], 3.45),
  ], []);
  for (const turn of [0, 60, 120, 180, 240, 300]) {
    const placing = { k: size, at: aoiLocation(turn, at), turn };
    c.group(() => {
      c.fill("hollyhock", toPath(vine, { k: 1, turn }), "evenodd");
      aoiLeafAt(c, placing);
    });
  }
  c.fill("hollyhock", toPath([disc([0, 0], 15.8)], { k: 1 }));
}

export function mitsuWariAoiBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(3, 0, R);
  const tip: V = [-90.9, -25.9];
  const body = [
    arc(tip, [-49, 47], 139, [32, -54]),
    arc([-49, 47], [-10, 71.8], 93, [-7, -17]),
    arc([-10, 71.8], [-8.5, 90], 17, [0, 81]),
    arc([-8.5, 90], [13, 89.6], 46, [2, 47]),
    arc([13, 89.6], [30.8, 49.2], 42, [-9, 58]),
    arc([30.8, 49.2], [11.8, 20.7], 44, [-11, 56]),
    arc([11.8, 20.7], [-42.7, 8.3], 77, [-34, 84]),
    arc([-42.7, 8.3], tip, 68, [-51, -58]),
  ];
  const cuts = [
    thickArc([-1, 77], 7.8, 2.0, -100 * DEG, 203 * DEG),
    curvedBand([-6.1, 72], [-76.8, -10.1], 107, [22, -36], 2.25),
    curvedBand([-17, 57.1], [-19, 15.5], 62, [-76, 39], 1.7),
    curvedBand([-35, 41.3], [-40, 9.6], 53, [-81, 32], 1.65),
    curvedBand([-50.6, 24], [-58, 0.5], 50, [-95, 25], 1.65),
    curvedBand([-5.3, 65.9], [5.7, 25.5], 69, [-57, 40], 1.75),
    curvedBand([3.2, 69.1], [20.6, 36.7], 57, [-21, 30], 1.7),
  ];
  const ink = carve([body], cuts);
  c.fill("hollyhock", toPath([disc([0, 0], 96), disc([0, 0], 93.1)], { k: 1 }), "evenodd");
  for (const turn of [0, 120, 240]) c.fill("hollyhock", toPath(ink, { k: 1, turn }), "evenodd");
}

export function mitsuTsuruAoiMaruBuild(c: Builder): void {
  c.precision(2);
  c.guideSpokes(3, 0, R);
  const outer = [disc([0, 0], 96), disc([0, 0], 91.1)];
  const vine = carve([
    curvedBand([-19, 53.5], [65.7, 62.7], 91, [34, -25], 5.2),
    curvedBand([83, 38.8], [61.5, 55.7], 31, [64, 26], 4.8),
    curvedBand([61.5, 55.7], [48, 51.8], 13, [57, 45], 4.8),
    thickArc([49, 45.3], 7.2, 4.1, 82 * DEG, 339 * DEG),
  ], []);
  c.fill("hollyhock", toPath(outer, { k: 1 }), "evenodd");
  c.zoom(0.94);
  for (const turn of [0, 120, 240]) {
    const sin = Math.sin(turn * DEG);
    const cos = Math.cos(turn * DEG);
    const at: V = [-68.4 * cos + 38.2 * sin, 68.4 * sin + 38.2 * cos];
    c.group(() => {
      c.fill("hollyhock", toPath(vine, { k: 1, turn }), "evenodd");
      aoiLeafAt(c, { k: 0.84, at, turn: turn + 72 });
    });
  }
}
