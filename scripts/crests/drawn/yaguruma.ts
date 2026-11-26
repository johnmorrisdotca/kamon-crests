// The arrow wheel, 矢車, as the 1892 crest book draws 八ッ矢車 (frame 29, left page, fourth row, second cell from the right): eight
// arrows round a small hub, each a shaft with a vane to either side, the vanes striped across, and each arrow's vane lying over the
// next one's near the hub. The book draws it in thin lines; ours is solid, like the other crests: the shafts, the vanes and the
// hub are ink, and the book's lines are white gaps of the book's own width. One arrow is built, standing at the top, and turned
// an eighth of a turn at a time, built where it stands.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, disc, rotated, seg, toPath, DEG } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

/** The book's arrows reach past the layout circle at their vanes' outer corners: the wheel is drawn at 0.96 of the measured size. */
const PLACING: Placing = { k: 0.96 };
const TAU = Math.PI * 2;
/** A white line: the book's own line. */
const GAP = 1.6;
/** The hub, and the white line round it. */
const HUB = 12;
const HUB_GAP = 14;
/** The shaft's lines stand 2 to each side of the axis, and it ends 94 out. */
const SHAFT = 2;
const END = 94;
/** The left vane of the arrow at the top: its edges are lines through these points, the stripes across it at 30 degrees, like its ends. */
const SLANT = Math.tan(30 * DEG);
const TOP = 76;
const FOOT = 22;
const STRIPES = [67, 63, 59, 46, 42, 38];
/** The vane's outer edge, through (-32, 93) and leaning 15 degrees off the shaft. */
const OUTER: [V, V] = [[-32, 93], [-32 + 71 * Math.tan(15 * DEG), 22]];
/** Which way the vanes lie, as the book has them: each arrow's right vane goes under the left vane of the next arrow, clockwise, an eighth of a turn on. */
const NEXT = 45;

/** How far a point stands inside the line through a and b, on the side of `inner` (negative outside). */
const side = (a: V, b: V, inner: V, p: V): number => {
  const d: V = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(d[0], d[1]);
  const s = (q: V): number => (d[0] * (q[1] - a[1]) - d[1] * (q[0] - a[0])) / l;

  return Math.sign(s(inner)) * s(p);
};
/** A line across the left vane at 30 degrees, through the shaft line at height `y`. */
const across = (y: number): [V, V] => [[-SHAFT, y], [-SHAFT - 10, y + 10 * SLANT]];
const turnBack = (p: V, deg: number): V => {
  const a = deg * DEG;

  return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
};

/** Whether a point is in the left vane (with `more`, grown by that much all round), counting the stripes as white when `striped`. */
const inLeftVane = (p: V, more = 0, striped = true): boolean => {
  const inner: V = [-20, 50];
  const half = GAP / 2 - more;
  if (p[0] > -SHAFT - half) return false;
  if (side(...across(TOP), inner, p) < half || side(...across(FOOT), inner, p) < half || side(...OUTER, inner, p) < half) return false;

  return !striped || STRIPES.every((y) => Math.abs(side(...across(y), inner, p)) >= GAP / 2);
};
const inVane = (p: V, more = 0, striped = true): boolean => inLeftVane(p, more, striped) || inLeftVane([-p[0], p[1]], more, striped);
const inShaft = (p: V): boolean => Math.abs(p[0]) <= SHAFT - GAP / 2 && p[1] <= END && p[1] > 0;

/** The arrow at the top, its right vane cut where the left vane of the next arrow lies over it, and everything cut by the hub's white line. */
const inkedArrow = (p: V): boolean => {
  if (Math.hypot(p[0], p[1]) < HUB_GAP) return false;
  if (inShaft(p)) return true;
  if (!inVane(p)) return false;
  const there = turnBack(p, NEXT);

  return !(p[0] > 0 && there[0] < 0 && inVane(there, GAP, false));
};

const arrowOutlines = (): Piece[] => {
  const lines: [V, V][] = [];
  for (const m of [1, -1]) {
    const f = ([a, b]: [V, V]): [V, V] => [[m * a[0], a[1]], [m * b[0], b[1]]];
    for (const half of [GAP / 2, -GAP / 2, (3 * GAP) / 2]) {
      lines.push(f([[-SHAFT + half, 0], [-SHAFT + half, 10]]));
      for (const [a, b] of [across(TOP), across(FOOT), OUTER]) {
        const d: V = [b[0] - a[0], b[1] - a[1]];
        const l = Math.hypot(d[0], d[1]);
        const n: V = [-d[1] / l, d[0] / l];
        for (const s of [1, -1]) lines.push(f([[a[0] + n[0] * half * s, a[1] + n[1] * half * s], [b[0] + n[0] * half * s, b[1] + n[1] * half * s]]));
      }
    }
    for (const y of STRIPES) for (const s of [1, -1]) {
      const [a, b] = across(y);
      const d: V = [b[0] - a[0], b[1] - a[1]];
      const l = Math.hypot(d[0], d[1]);
      const n: V = [(-d[1] / l) * (GAP / 2) * s, (d[0] / l) * (GAP / 2) * s];
      lines.push(f([[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]]]));
    }
  }
  lines.push([[0, END], [1, END]]);
  const long = ([a, b]: [V, V]): Piece => {
    const d: V = [b[0] - a[0], b[1] - a[1]];
    const l = Math.hypot(d[0], d[1]);

    return seg([a[0] - (d[0] / l) * 300, a[1] - (d[1] / l) * 300], [a[0] + (d[0] / l) * 300, a[1] + (d[1] / l) * 300]);
  };
  const turned = lines.map(long);
  // The lines of the next arrow, where its left vane lies over this one's right.
  const next = turned.map((piece) => rotated(piece, -NEXT * DEG));

  return [...turned, ...next, arcA([0, 0], HUB_GAP, 0, TAU)];
};

export const yagurumaArrow = (): Region[] => carveWhere(arrowOutlines(), inkedArrow);

/** 八つ矢車: the hub, then the arrow at the top and the same arrow where it stands each eighth of a turn round, clockwise. */
export const yatsuYagurumaBuild = (c: Builder, part: string): void => {
  c.guideCircle(C0, R);
  const unit = yagurumaArrow();
  for (let k = 0; k < 8; k += 1) c.fill(part, toPath(unit.map((loop) => loop.map((p) => rotated(p, -45 * k * DEG))), PLACING), "evenodd");
  c.fill(part, toPath([disc([0, 0], HUB)], PLACING));
};
