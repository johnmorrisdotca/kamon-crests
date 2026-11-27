import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, carveWhere, disc, inside, rotated, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import { outline } from "./eiraku.ts";

const orient = (region: Region, angle: number): Region => region.map((piece) => rotated(piece, angle * DEG));

const twoCut = outline([
  "89,-17 57,41 81,19",
  "57,41 6,37 24,49",
  "6,37 -11,-12 -11,18",
  "-11,-12 2,-39 -9,-26",
  "2,-39 22,-29 11,-37",
  "22,-29 28,-19 25,-25",
  "28,-19 20,-6 22,-13",
  "20,-6 42,17 21,10",
  "42,17 79,13 61,21",
  "79,13 89,-17 87,0",
]);

const threeCut = outline([
  "-22,88 -46,58 -39,76",
  "-46,58 -44,23 -49,37",
  "-44,23 -22,3 -35,9",
  "-22,3 12,-1 -5,-5",
  "12,-1 42,28 32,9",
  "42,28 39,53 44,43",
  "39,53 24,64 33,60",
  "24,64 9,53 19,57",
  "9,53 -12,52 -2,50",
  "-12,52 -25,64 -21,55",
  "-25,64 -22,88 -27,77",
]);

/** At a crossover, the gap follows the overlying band's arcs, leaving its other crossing free. */
const woven = (band: Region[], turn: number, behind: (p: V) => boolean, divide: Region): Region[] => {
  const over = band.map((loop) => orient(loop, turn));
  const clearance = over.flatMap((loop) => loop.flatMap((piece) => piece.t === "A" ? [thickArc(piece.c, piece.r, 3.15, piece.a0, piece.a1)] : []));
  const inBand = (loops: Region[], p: V): boolean => loops.filter((loop) => inside(loop, p)).length % 2 !== 0;
  const edges = [...band.flat(), ...over.flat(), ...clearance.flat(), ...divide];
  return carveWhere(edges, (p) => inBand(band, p) && !(behind(p) && (inBand(over, p) || clearance.some((loop) => inside(loop, p)))));
};

export const wachigaiTomoeBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);
  c.guideSpokes(4);
  const band = carve([disc([30, 0], 65)], [twoCut]);
  const unit = woven(band, 180, ([, y]) => y < 0, [seg([-96, 0], [96, 0])]);
  for (const turn of [0, 180]) c.fill("tomoe", toPath(unit, { k: 1, turn }), "evenodd");
};
