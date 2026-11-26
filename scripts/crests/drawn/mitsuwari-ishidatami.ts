// The circular paving pattern measured from frame 7 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, disc, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polar = (radius: number, clock: number): V => [radius * Math.sin(clock * DEG), radius * Math.cos(clock * DEG)];

export const mitsuwariIshidatamiBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  const axis = 27.2;
  const left: V = polar(axis, -60);
  const right: V = polar(axis, 60);
  const bottom: V = polar(axis, 180);
  const leftShoulder: V = [left[0], 65.2];
  const rightShoulder: V = [right[0], 65.2];
  const neighbour: V = [Math.sqrt(3) * 65.2 / 2 - left[0] / 2, -65.2 / 2 - Math.sqrt(3) * left[0] / 2];
  const junction = polar(73, 57);
  const rim = R - 1.4;
  const stroke = 1.9;

  const centre: Region = [seg(left, right), seg(right, bottom), seg(bottom, left)];
  const cuts = [
    thickSeg(left, leftShoulder, stroke),
    thickSeg(right, rightShoulder, stroke),
    thickSeg(leftShoulder, rightShoulder, stroke),
    thickSeg(leftShoulder, polar(rim, -22), stroke),
    thickSeg(rightShoulder, polar(rim, 22), stroke),
    thickSeg(rightShoulder, junction, stroke),
    thickSeg(neighbour, junction, stroke),
    thickSeg(junction, polar(rim, 66), stroke),
    thickSeg(junction, polar(rim, 50), stroke),
    thickArc([0, 0], 89.7, 1.55, 68 * DEG, 112 * DEG),
  ];
  const seams = [0, 120, 240].flatMap((clock) => cuts.map((cut) => cut.map((piece) => rotated(piece, -clock * DEG))));
  c.fill("paving-square", toPath(carve([disc([0, 0], R)], [centre, ...seams]), { k: 1 }), "evenodd");
};
