import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, disc, mirrored, moved, onCircle, reversedRun, rotated, seg,
  shortArc, thickArc, thickSeg, toPath, vadd, vmul, vsub, vunit,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const paper = 1.85;
const arc = (a: V, b: V, width: number, near: V) =>
  shortArc(circleThrough(a, b, width, near), a, b);
const seam = (a: V, b: V, radius: number, near: V): Region => {
  const piece = arc(a, b, radius, near) as Extract<Piece, { t: "A" }>;
  return thickArc(piece.c, piece.r, paper, piece.a0, piece.a1);
};
const turned = (parts: Region[], at: V, angle: number): Region[] =>
  parts.map((part) => part.map((piece) => moved(rotated(piece, angle * DEG), at)));

const leafRoot: V = [0, 0];
const leafTip: V = [0, 11.4];
const edge = arc(leafRoot, leafTip, 9.8, [9, 5.7]);
const leaf = [edge, ...reversedRun([mirrored(edge)])];

/** One shoot, with the tip and two leaf pairs on measured stations of the same axis. */
const sprig = (from: V, to: V): Region[] => {
  const direction = vunit(vsub(to, from));
  const turn = Math.atan2(direction[1], direction[0]) / DEG - 90;
  const buds = [0.52, 0.78].flatMap((position) => {
    const join = vadd(from, vmul(vsub(to, from), position));
    return [-1, 1].flatMap((side) => turned([leaf], join, turn + side * 52));
  });

  return [thickSeg(from, to, 2.6), ...buds, ...turned([leaf], to, turn)];
};

const petal = (angle: number): Region => disc(onCircle([0, 0], 5.4, angle * DEG), 4.6);
const flower = carve([disc([0, 0], 5.7), ...[18, 90, 162, 234, 306].map(petal)], [disc([0, 0], 2.15)]);

export const hanagasaYonezawaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  const fill = (parts: Region[]): void => c.fill("conical-hat", toPath(parts, { k: 1 }), "evenodd");

  const west: V = [-91, -12];
  const east: V = [91, -12];
  const roof: Region = [arc(west, east, 120, [0, -220]), arc(east, west, 350, [0, -300])];
  const seamGuide: Region = seam([-88, -10.9], [88, -10.9], 350, [0, -290]);
  const rib = (x: number): Region => thickSeg([x * .28, 39], [x, -12], paper);
  const ribs = [-73, -51, -27, 0, 27, 51, 73].map(rib);
  const cap: Region = [
    arc([-25, 31], [25, 31], 47, [0, -50]), arc([25, 31], [-25, 31], 48, [0, 100]),
  ];
  const capClearance: Region = [
    arc([-29, 31], [29, 31], 53, [0, -56]), arc([29, 31], [-29, 31], 54, [0, 105]),
  ];

  const upperLeft: V = [-77, -8];
  const upperRight: V = [77, -8];
  const lowerLeft: V = [-77, -44];
  const lowerRight: V = [77, -44];
  const fabric: Region = [
    arc(upperLeft, upperRight, 350, [0, -290]), seg(upperRight, lowerRight),
    arc(lowerRight, lowerLeft, 205, [0, 154]), seg(lowerLeft, upperLeft),
  ];
  const hem = seam([-78, -39], [78, -39], 203, [0, 145]);
  const clothStem = seam([-64, -18], [68, -26], 122, [0, 90]);
  const embroidered = [
    ...turned(flower, [-48, -32], -20),
    ...turned(flower, [-20, -37], -20),
    ...turned(flower, [23, -23], -20),
    ...turned(flower, [48, -26], -20),
    ...turned([leaf], [-60, -21], -62), ...turned([leaf], [-35, -29], 32),
    ...turned([leaf], [10, -23], 58), ...turned([leaf], [60, -37], -23),
  ];

  const flank = [
    ...sprig([-17, 35], [-65, 47]),
    ...sprig([-8, 38], [-45, 68]),
    ...sprig([-4, 40], [-21, 76]),
  ];
  const leaves = [...flank, ...flank.map((outline) => outline.map(mirrored)), ...sprig([0, 40], [0, 83])];

  c.group(() => {
    fill(carve([fabric], [roof, hem, clothStem, ...embroidered, thickSeg([0, -46], [0, -94], 8.3)]));
    fill([thickSeg([0, -48], [0, -93], 5.8)]);
  });
  c.group(() => {
    fill(carve(leaves, [roof, capClearance]));
    fill(carve([roof], [capClearance, seamGuide, ...ribs]));
    fill([cap]);
  });
};
