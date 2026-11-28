// The ringed arabesque flower with a floating figured border in the 1892 book. The room inside the ring counts 100.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import { DEG, arcA, carveWhere, disc, mirrored, reversedRun, rotated, seg, thickSeg, toPath, vadd, vdist, vmul } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { PAPER } from "../library/part.ts";
import { vineFork } from "../library/vine-fork.ts";
import { FIVE_LOBES } from "./karahana.ts";

const ORIGIN: V = [0, 0];
const RING = 11.5;
const RING_CLEAR = 2;
const HEART = 12;
const SECTOR = 36 * DEG;

/** One petal of the five-petalled arabesque flower in a reach of 100, with every paper line `paper` wide. */
const petal = (paper: number): Region[] => {
  const sin = Math.sin(SECTOR);
  const cos = Math.cos(SECTOR);
  const foot = paper / 2 / cos;
  const sides = [-1, 1].map((side) => seg([-side * foot, 0], [-side * foot + side * 100 * sin, 100 * cos]));

  return carveWhere(
    [...FIVE_LOBES.flatMap(([x, y, r]) => disc([x, y], r)), ...sides, ...disc(ORIGIN, HEART + paper), ...thickSeg(ORIGIN, [0, 43], paper)],
    ([x, y]) => y * sin - Math.abs(x) * cos > paper / 2 &&
      vdist(ORIGIN, [x, y]) > HEART + paper &&
      FIVE_LOBES.some(([cx, cy, r]) => vdist([cx, cy], [x, y]) < r) &&
      !(Math.abs(x) < paper / 2 && y < 43),
  );
};

const sized = (piece: Piece, k: number, by: V): Piece =>
  piece.t === "L" ? seg(vadd(vmul(piece.a, k), by), vadd(vmul(piece.b, k), by)) : arcA(vadd(vmul(piece.c, k), by), piece.r * k, piece.a0, piece.a1);

/** The point `r` out from the middle, `turn` degrees clockwise from upright. */
const out = (r: number, turn: number): V => [r * Math.sin(turn * DEG), r * Math.cos(turn * DEG)];

// A border flower stands on the rim at the top and opens towards the middle. Its two side petals run along the rim to the next flowers.
const RIM = 100;
const BORDER = 0.41;
const SIDE_LOBES: readonly (readonly [r: number, turn: number, radius: number])[] = [[96, 19, 21], [99, 28, 13], [100, 33, 4.5]];

const borderFlower = (paper: number): Region[] => {
  const at: V = [0, RIM];
  const inner = paper / BORDER;
  const middle = petal(inner).map((loop) => loop.map((piece) => sized(rotated(piece, Math.PI), BORDER, at)));
  const heart = (HEART + inner) * BORDER;
  const across: V = [Math.cos(SECTOR), Math.sin(SECTOR)];
  const along: V = [Math.sin(SECTOR), -Math.cos(SECTOR)];
  const foot = vadd(at, vmul(across, paper / 2));
  const ray: V = [Math.sin(2 * SECTOR), -Math.cos(2 * SECTOR)];
  const stamen = thickSeg(at, vadd(at, vmul(ray, 43 * BORDER)), paper);
  const lobes = SIDE_LOBES.map(([r, turn, radius]) => ({ c: out(r, turn), r: radius }));
  const right = carveWhere(
    [...lobes.flatMap(({ c, r }) => disc(c, r)), ...disc(ORIGIN, RIM), seg(foot, vadd(foot, vmul(along, 80))), ...disc(at, heart), ...stamen],
    (p) => vdist(ORIGIN, p) < RIM &&
      lobes.some(({ c, r }) => vdist(c, p) < r) &&
      (p[0] - at[0]) * across[0] + (p[1] - at[1]) * across[1] > paper / 2 &&
      vdist(at, p) > heart &&
      !(Math.abs((p[0] - at[0]) * ray[1] - (p[1] - at[1]) * ray[0]) < paper / 2 && (p[0] - at[0]) * ray[0] + (p[1] - at[1]) * ray[1] < 43 * BORDER),
  );
  const cap = carveWhere([...disc(at, HEART * BORDER), ...disc(ORIGIN, RIM)], (p) => vdist(at, p) < HEART * BORDER && vdist(ORIGIN, p) < RIM);

  return [...middle, ...right, ...right.map((loop) => reversedRun(loop.map(mirrored))), ...cap];
};

export function maruNiKarahanaFusenRyoBuild(c: Builder): void {
  c.precision(3);
  // The ring is the cell's own: about 6 percent of the diameter. The flowers stand a paper line inside it.
  c.guideCircle(C0, R);
  c.guideCircle(C0, R - RING);
  c.fill("frame", circle(C0, R).join(circle(C0, R - RING)), "evenodd");
  const room = R - RING - RING_CLEAR;
  const k = room / 100;
  const paper = PAPER / k;
  const flower = 0.42;
  const border = borderFlower(paper);
  const centre = petal(paper / flower);

  c.guideCircle(C0, room);
  for (let i = 0; i < 5; i += 1) c.fill("karahana", toPath(border, { k, turn: 36 + 72 * i }), "evenodd");
  const whole = [...Array.from({ length: 5 }, (_, i) => centre.map((loop) => loop.map((piece) => rotated(piece, -72 * i * DEG)))).flat(), disc(ORIGIN, HEART)];
  c.fill("karahana", toPath(whole, { k: k * flower }));
  for (let i = 0; i < 5; i += 1) vineFork.build(c, out(54 * k, 72 * i), 72 * i, 28 * k, { motif: "karahana", width: 0.1, stem: 0.45 });
}
