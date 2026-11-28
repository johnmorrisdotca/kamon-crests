// The mountain-wind snow ring in the 1892 book: a round crystal of six toothed lobes with a teardrop opening between each pair. Its reach counts 96.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { DEG, arcTo, bowedArc, carve, disc, rotated, seg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const ORIGIN: V = [0, 0];
const BODY = 64;
// A lobe stands on the body like a crown of three teeth: a tall one in the middle and one each side. Every edge is one bowed arc
// between a tip and a notch, six arcs to a lobe.
const NECK: V = [24, 59];
const SIDE_TIP: V = [28, 85];
const NOTCH: V = [10, 79];
const TIP: V = [0, 96];
const BOW = -1;
const mirror = ([x, y]: V): V => [-x, y];
const LOBE: Region = [
  bowedArc(mirror(NECK), mirror(SIDE_TIP), BOW), bowedArc(mirror(SIDE_TIP), mirror(NOTCH), BOW), bowedArc(mirror(NOTCH), TIP, BOW),
  bowedArc(TIP, NOTCH, BOW), bowedArc(NOTCH, SIDE_TIP, BOW), bowedArc(SIDE_TIP, NECK, BOW), seg(NECK, mirror(NECK)),
];
// The teardrop: a round end towards the middle and two ruled sides that meet in a point just inside the rim. It stands half way between two lobes.
const DROP: Circle = { c: [0, 42], r: 7.5 };
const DROP_TIP: V = [0, 61];

const teardrop = (): Region => {
  const d = DROP_TIP[1] - DROP.c[1];
  const a = Math.acos(DROP.r / d);
  const right: V = [DROP.c[0] + DROP.r * Math.sin(a), DROP.c[1] + DROP.r * Math.cos(a)];
  const left: V = [-right[0], right[1]];

  return [seg(DROP_TIP, right), arcTo(DROP, right, left, false), seg(left, DROP_TIP)];
};

export function yamakazeNoYukiwaBuild(c: Builder): void {
  c.precision(3);
  const sixths = [0, 60, 120, 180, 240, 300];
  const turned = (region: Region, turn: number): Region => region.map((piece) => rotated(piece, -turn * DEG));
  const ink = [disc(ORIGIN, BODY), ...sixths.map((turn) => turned(LOBE, turn))];
  const paper = sixths.map((turn) => turned(teardrop(), turn + 30));

  c.guideCircle(C0, R);
  c.guideCircle(C0, BODY);
  c.fill("snow-ring", toPath(carve(ink, paper), { k: 1 }), "evenodd");
}
