// The lightning crests, 稲妻: a square spiral, the shape of the key-fret thunder pattern, set in a face of a cube drawn in the
// plain way (a regular hexagon with the cube's three faces round its middle). A face is a rhombus: two edges of length 96 from the
// middle at 30 and 150 degrees from level, and the spiral is a band 5 wide whose runs lie along the face's two edges. The crest is
// the hexagon's rim, the three edges that part the faces, and the one spiral in the top face turned a third and two thirds of a
// turn about the middle.
import type { Builder } from "../../construct/builder.ts";
import { CX, CY, R, poly, turn } from "../../construct/geo.ts";
import type { Pt } from "../../construct/geo.ts";
import { carveWhere, rotated, seg, toPath, DEG } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

const A = 96;
const WIDTH = 5;
const PLACING: Placing = { k: 1 };
const U: V = [Math.cos(30 * DEG), Math.sin(30 * DEG)];
const W: V = [Math.cos(150 * DEG), Math.sin(150 * DEG)];
/** How far a band of width 5 stands from its middle line, in the face's own steps (a step is 96 along an edge). */
const HALF = WIDTH / 2 / (A * Math.sin(120 * DEG));

/** The spiral's turns in the face's own coordinates (s along the edge at 30 degrees, t along the one at 150), as the 1892 book draws the top face of 三つ稲妻. */
const SPIRAL: V[] = [[0, 0.2], [0.835, 0.2], [0.835, 0.87], [0.225, 0.87], [0.225, 0.425], [0.685, 0.425], [0.685, 0.69], [0.4, 0.69]];

const at = (s: number, t: number): V => [A * (s * U[0] + t * W[0]), A * (s * U[1] + t * W[1])];
/** The endless line along the edge at 30 degrees where t is fixed, or along the one at 150 where s is fixed. */
const along = (fixed: "s" | "t", n: number): Piece => {
  const p = fixed === "t" ? at(0, n) : at(n, 0);
  const d = fixed === "t" ? U : W;

  return seg([p[0] - d[0] * 300, p[1] - d[1] * 300], [p[0] + d[0] * 300, p[1] + d[1] * 300]);
};

interface Bar {
  /** `t` for a run along the 30 degree edge (t fixed), `s` for a run along the 150 degree one. */
  fixed: "s" | "t";
  at: number;
  /** The run's ends along its edge, with the half width at the corners already added. */
  from: number;
  to: number;
}
const bars = (): Bar[] => {
  const out: Bar[] = [];
  for (let i = 0; i + 1 < SPIRAL.length; i += 1) {
    const [a, b] = [SPIRAL[i], SPIRAL[i + 1]];
    out.push(a[1] === b[1] ? { fixed: "t", at: a[1], from: Math.min(a[0], b[0]) - HALF, to: Math.max(a[0], b[0]) + HALF } : { fixed: "s", at: a[0], from: Math.min(a[1], b[1]) - HALF, to: Math.max(a[1], b[1]) + HALF });
  }
  // The edge that runs from the middle out to the corner at 30 degrees.
  out.push({ fixed: "t", at: 0, from: -HALF, to: 0.95 });

  return out;
};
const inBar = (b: Bar, s: number, t: number): boolean => {
  const [x, y] = b.fixed === "t" ? [s, t] : [t, s];

  return Math.abs(y - b.at) <= HALF + 1e-9 && x >= b.from && x <= b.to;
};
const stOf = (p: V): V => {
  const det = U[0] * W[1] - U[1] * W[0];

  return [(p[0] * W[1] - p[1] * W[0]) / (det * A), (U[0] * p[1] - U[1] * p[0]) / (det * A)];
};

const hexagon = (r: number): Region => {
  const corners: V[] = Array.from({ length: 6 }, (_, i): V => [r * Math.sin((i * 60 * Math.PI) / 180), r * Math.cos((i * 60 * Math.PI) / 180)]);

  return corners.map((p, i) => seg(p, corners[(i + 1) % 6]));
};

/** 三つ稲妻: the cube's three spirals. */
export const mitsuInazumaBuild = (c: Builder, part: string): void => {
  c.stepRound(R);
  const rim = WIDTH / (Math.sqrt(3) / 2);
  c.fill(part, toPath([hexagon(A), hexagon(A - rim)], PLACING), "evenodd");
  const all = bars();
  const outlines: Piece[] = [];
  for (const b of all) {
    for (const w of [-HALF, HALF]) outlines.push(along(b.fixed, b.at + w));
    for (const e of [b.from, b.to]) outlines.push(along(b.fixed === "t" ? "s" : "t", e));
  }
  const unit = carveWhere(outlines, (p) => {
    const [s, t] = stOf(p);

    return all.some((b) => inBar(b, s, t));
  });
  for (const turn of [0, 120, 240]) c.fill(part, toPath(unit.map((loop) => loop.map((p) => rotated(p, -turn * DEG))), PLACING), "evenodd");
};

/** An inked rectangle of a cell, in the cell's own steps from its top left corner: `u` across to the right, `v` down. */
type Block = [u0: number, u1: number, v0: number, v1: number];

const CELL = 64;
const GAP = 4;
const EDGE = 2;
/** The spiral band of one cell, as the 1892 book draws it in the top left cell of 四ッいなづま: it starts on the cell's right edge, runs left, up, right, down, left, up and right to a short hook. */
const BLOCKS: Block[] = [
  [10, CELL, 48, 53],
  [10, 15, 10, 53],
  [10, 51, 10, 15],
  [46, 51, 10, 36],
  [23, 51, 31, 36],
  [23, 28, 21, 36],
  [23, 40, 21, 26],
];

/** 四つ稲妻: four cells in a block, each a thin square holding the spiral, the top left cell turned a quarter turn each time. */
export const yotsuInazumaBuild = (c: Builder, part: string): void => {
  c.stepRound(R);
  const half = CELL + GAP / 2;
  // The top left cell stands with its corner at (-half, half): `u` across, `v` down.
  const from = (u: number, v: number): V => [-half + u, half - v];
  const toCell = (p: V): V => [p[0] + half, half - p[1]];
  const inCell = (p: V): boolean => {
    const [u, v] = toCell(p);

    return u >= 0 && u <= CELL && v >= 0 && v <= CELL;
  };
  const inked = (p: V): boolean => {
    const [u, v] = toCell(p);
    if (!inCell(p)) return false;
    if (u < EDGE || u > CELL - EDGE || v < EDGE || v > CELL - EDGE) return true;

    return BLOCKS.some(([u0, u1, v0, v1]) => u >= u0 && u <= u1 && v >= v0 && v <= v1);
  };
  const us = new Set<number>([0, EDGE, CELL - EDGE, CELL]);
  const vs = new Set<number>([0, EDGE, CELL - EDGE, CELL]);
  for (const [u0, u1, v0, v1] of BLOCKS) {
    for (const u of [u0, u1]) us.add(u);
    for (const v of [v0, v1]) vs.add(v);
  }
  const outlines: Piece[] = [];
  for (const u of us) outlines.push(seg([from(u, 0)[0], -300], [from(u, 0)[0], 300]));
  for (const v of vs) outlines.push(seg([-300, from(0, v)[1]], [300, from(0, v)[1]]));
  const unit = carveWhere(outlines, inked);
  for (const turn of [0, 90, 180, 270]) c.fill(part, toPath(unit.map((loop) => loop.map((p) => rotated(p, -turn * DEG))), PLACING), "evenodd");
};

// The top face of the ringed cube, in hundredths along the upward-right and upward-left edges from its lower tip.
const RINGED_FACE: Pt[] = [
  [2, 2], [99, 2], [99, 99], [2, 99], [2, 24], [80, 24], [80, 77], [25, 77],
  [25, 46], [52, 46], [52, 56], [40, 56], [40, 63], [63, 63], [63, 40], [20, 40],
  [20, 82], [85, 82], [85, 18], [2, 18],
];

export const ringedThreeLightning = (c: Builder): void => {
  c.ring("ring-thin");
  const radius = 82;
  c.stepRound(radius);
  for (const angle of [0, 120, 240]) {
    const corners = RINGED_FACE.map(([u, v]): Pt => [CX + ((u - v) * radius * Math.sqrt(3)) / 200, CY - ((u + v) * radius) / 200]);
    c.fill("lightning", poly(corners.map((point) => turn(point, angle))));
  }
};
