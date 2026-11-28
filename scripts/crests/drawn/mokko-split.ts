// The three-split quince in the 1892 book: three quinces stand with their hearts on one circle, and the circle cuts each in half. The circle counts 100.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, disc, inside, rotated, seg, toPath, vadd, vdist, vmul } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { MOKKO_HEART, SIDE, UPRIGHT, mokkoUnit } from "./mokko.ts";
import type { Lobe } from "./mokko.ts";
import { PAPER } from "../library/part.ts";

const ORIGIN: V = [0, 0];
const RIM = 100;
const AT: V = [0, RIM];
// The quince is the catalogue's, at six fifths of its size, with its inward lobe and its side lobes shortened to the cell's reach.
const SIZE = 1.2;
const INWARD: Lobe = { ...UPRIGHT, crown: { c: [0, -13], r: 85 }, shoulderX: 13, shoulderWidth: 26, cut: { c: [0, 2], r: 50.5 } };
const ALONG: Lobe = { ...SIDE, cut: { c: [0, 4], r: 54 } };

/** A piece of the quince, drawn about its own centre and pointing up, set on the rim: turned `turn` degrees clockwise, sized, and moved to the top of the circle. */
const onRim = (region: Region, turn: number): Region => region.map((piece): Piece => {
  const turned = rotated(piece, -turn * Math.PI / 180);
  const move = (p: V): V => vadd(vmul(p, SIZE), AT);

  return turned.t === "L" ? seg(move(turned.a), move(turned.b)) : arcA(move(turned.c), turned.r * SIZE, turned.a0, turned.a1);
});

// Each quince keeps to its third of the circle, a paper line clear of the next one.
const HALF = Math.PI / 3;
const clipped = (regions: Region[], paper: number): Region[] => {
  const sin = Math.sin(HALF);
  const cos = Math.cos(HALF);
  const foot = paper / 2 / sin;
  const bounds = [-1, 1].map((side) => seg([0, foot], [side * 120 * sin, foot + 120 * cos]));

  return carveWhere(
    [...regions.flat(), ...disc(ORIGIN, RIM), ...bounds],
    (p) => vdist(ORIGIN, p) < RIM && (p[1] - foot) * sin - Math.abs(p[0]) * cos > 0 && regions.some((loop) => inside(loop, p)),
  );
};

export function mitsuwariMokkoBuild(c: Builder): void {
  c.precision(3);
  const k = R / RIM;
  const paper = PAPER / k;
  const inward = mokkoUnit(INWARD);
  const along = mokkoUnit(ALONG);
  // The quince's inward lobe points at the middle, and its two side lobes run along the circle. Its outward lobe lies outside and is not drawn.
  const frame = clipped([...inward.frame.map((loop) => onRim(loop, 180)), ...along.frame.map((loop) => onRim(loop, 90)), ...along.frame.map((loop) => onRim(loop, 270))], paper);
  const flower = clipped([
    ...inward.flower.map((loop) => onRim(loop, 180)), ...along.flower.map((loop) => onRim(loop, 90)), ...along.flower.map((loop) => onRim(loop, 270)),
    onRim(disc(ORIGIN, MOKKO_HEART), 0),
  ], paper);

  c.guideCircle(C0, R);
  for (const turn of [0, 120, 240]) c.fill("quince-lobes", toPath(frame, { k, turn }));
  for (const turn of [0, 120, 240]) c.fill("karahana", toPath(flower, { k, turn }));
}
