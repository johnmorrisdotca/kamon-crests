// Clematis constructions from frame 34 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversed, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const clematisArc = (from: V, to: V, r: number, hint: V): Region[number] =>
  shortArc(circleThrough(from, to, r, hint), from, to);

const rotateClematis = (piece: Region, turn: number): Region => piece.map((stroke) => rotated(stroke, turn * DEG));

const clematisOutline = (tip: number, valleyRadius: number): Region => {
  const valley: V = [valleyRadius * .5, valleyRadius * Math.sqrt(3) / 2];
  const side = clematisArc([0, tip], valley, 88, [-51, 42]);
  const petal = [reversed(mirrored(side)), side];
  return [0, -60, -120, -180, -240, -300].flatMap((turn) => rotateClematis(petal, turn));
};

const clematisSlit = (root: V, tip: V, r: number, first: V, second: V): Region =>
  [clematisArc(root, tip, r, first), clematisArc(tip, root, r + 2, second)];

/** A second row of shorter petals shows between the six main points. */
export const yaeTessenBuild = (c: Builder): void => {
  c.precision(3);
  const angles = [0, 60, 120, 180, 240, 300];
  const front = clematisOutline(96, 60);
  const border = clematisOutline(92, 63);
  const backing = rotateClematis(clematisOutline(91, 57), 30);
  const mainVein = clematisSlit([0, 13], [0, 80], 153, [135, 50], [-135, 50]);
  const sideVein = clematisSlit([6, 13], [16, 64], 112, [102, 29], [-99, 61]);
  const cuts = angles.flatMap((turn) => [rotateClematis(mainVein, turn), rotateClematis(sideVein, turn), rotateClematis(sideVein.map(mirrored), turn)]);
  c.guideCircle(C0, 96);
  c.guideSpokes(6, 0, 96);
  c.fill("clematis", toPath(carve([backing], [border]), { k: 1 }));
  c.fill("clematis", toPath(carve([front], cuts), { k: 1 }));
};

export const mitsuTachiTessenBuild = (c: Builder): void => {
  const tip: V = [0, 88];
  const right: V = [3.5, 12];
  const left: V = [-3.5, 12];
  const bladeSide = clematisArc(tip, right, 66, [-54, 48]);
  const blade = [bladeSide, seg(right, left), reversed(mirrored(bladeSide))];
  const vein = thickSeg([0, 15], [0, 83], 2.2);
  const veinedBlade = carve([blade], [vein]);

  const rootRight: V = [6, 12];
  const shoulder: V = [36, 62];
  const cleft: V = [13, 74];
  const innerCleft: V = [-16, 73];
  const sideLobe: V = [-39, 56];
  const neck: V = [-11, 46];
  const rootLeft: V = [-6, 12];
  const petal = [
    clematisArc(rootRight, shoulder, 120, [77, 12]),
    clematisArc(shoulder, cleft, 15, [21, 62]),
    clematisArc(cleft, innerCleft, 16, [0, 64]),
    clematisArc(innerCleft, sideLobe, 18, [-21, 55]),
    clematisArc(sideLobe, neck, 17, [-21, 58]),
    clematisArc(neck, rootLeft, 80, [-65, 25]),
    seg(rootLeft, rootRight),
  ];

  c.guideCircle(C0, 96);
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill("clematis", toPath(veinedBlade, { k: 1, turn }), "evenodd");
      c.fill("clematis", toPath([petal], { k: 1, turn: turn + 60 }));
    });
  }
  c.fill("clematis", toPath([disc([0, 0], 9.2)], { k: 1 }));
};
