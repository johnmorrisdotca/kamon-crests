// Two hawk feathers that embrace, 抱き鷹の羽, as the 1892 crest book draws だき鷹 (frame 21, right page, fourth row, third cell from
// the right): two feathers bent round a round hole, their rounded tips meeting at the top and their quills crossing below, each
// vane striped across in three places. The book draws them in thin lines; ours is solid, like the other crests: the vanes and the
// shafts are ink, and the book's lines are white gaps 2 wide. The feathers' edges are circles about the middle, the tips circles
// on the band's middle circle, the stripes and the quills ruled lines. The left feather is built first, whole, and the right one is the
// same mirrored, built where it stands, its quill passing under the left one's with a white line each side of it.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcA, carveWhere, mirrored, seg, toPath, DEG } from "../../construct/compass.ts";
import type { Piece, Placing, Region, V } from "../../construct/compass.ts";

const PLACING: Placing = { k: 1 };
const TAU = Math.PI * 2;
const GAP = 2;
/** The band of the feathers, about the middle: the outer vane from 80 to 95, the shaft from 72 to 78, the inner vane from 53 to 70. */
const OUTER = 95;
const SHAFT_OUT = 78;
const SHAFT_IN = 72;
const INNER = 53;
/** The left feather's tip: a circle of half the band's width, its centre on the band's middle circle 14 degrees left of the top, so that it laps the axis and is cut by a ruled line a white line's half width left of it. The line its vanes end on above the quill (degrees clockwise from the top). */
const TIP_R = (OUTER - INNER) / 2;
const TIP: V = [-(OUTER + INNER) / 2 * Math.sin(14 * DEG), (OUTER + INNER) / 2 * Math.cos(14 * DEG)];
const FOOT = -165;
/** The stripes: a pair of white lines 9 apart across both vanes at each of these, leaning 30 degrees off the radius so that from the shaft out they run towards the tip, a chevron on the shaft. The last crosses the outer vane only. */
const STRIPES = [-38, -102, -158];
const LEAN = 30;
const PAIR = 4.5;
/** The quill runs on from the shaft at the foot to an end 92 out on the other side of the axis, its end rounded. */
const QUILL_END: V = [15, -91];

const polarAt = (r: number, deg: number): V => [r * Math.sin(deg * DEG), r * Math.cos(deg * DEG)];
const clock = (p: V): number => Math.atan2(p[0], p[1]) / DEG;
const dist = (a: V, b: V): number => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** Signed distance of a point from the line through a and b (left of a to b is positive). */
const offLine = (a: V, b: V, p: V): number => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / dist(a, b);
const quillFrom = (): V => polarAt((SHAFT_OUT + SHAFT_IN) / 2, FOOT);
const HALF_QUILL = (SHAFT_OUT - SHAFT_IN) / 2;

/** A stripe's line through the point `r` out on the radius at `deg`, leaning `lean` degrees off it. */
const stripe = (deg: number, r: number, lean: number, off: number): [V, V] => {
  const a = polarAt(r, deg);
  const d = polarAt(1, deg + lean);
  const n: V = [-d[1], d[0]];

  return [[a[0] + n[0] * off, a[1] + n[1] * off], [a[0] + n[0] * off + d[0], a[1] + n[1] * off + d[1]]];
};
const stripeLines = (): [V, V][] =>
  STRIPES.flatMap((deg, i) => [-PAIR, PAIR].flatMap((off) => [stripe(deg, (OUTER + SHAFT_OUT) / 2, LEAN, off), ...(i < 2 ? [stripe(deg, (SHAFT_IN + INNER) / 2, -LEAN, off)] : [])]));

const inQuill = (p: V, more = 0): boolean => {
  const a = quillFrom();
  const along = ((QUILL_END[0] - a[0]) * (p[0] - a[0]) + (QUILL_END[1] - a[1]) * (p[1] - a[1])) / dist(a, QUILL_END);

  return (Math.abs(offLine(a, QUILL_END, p)) <= HALF_QUILL + more && along >= -10 && along <= dist(a, QUILL_END)) || dist(p, QUILL_END) <= HALF_QUILL + more;
};

/** Whether a point is ink in the left feather, before the right one's quill is laid over it. */
const inLeft = (p: V): boolean => {
  const r = Math.hypot(p[0], p[1]);
  const deg = clock(p);
  const inBand = r <= OUTER && r >= INNER && deg <= clock(TIP) && deg >= FOOT;
  if (!inBand && (dist(p, TIP) > TIP_R || p[0] > -GAP / 2)) return inQuill(p);
  if (p[0] > -GAP / 2) return false;
  if (Math.abs(r - (SHAFT_OUT + GAP / 2)) < GAP / 2 || Math.abs(r - (SHAFT_IN - GAP / 2)) < GAP / 2) return false;
  if (stripeLines().some(([a, b]) => Math.abs(offLine(a, b, p)) < GAP / 2 && nearStripe(a, p))) return false;

  return true;
};
/** A stripe's white crosses only its own vane, near where it is struck. */
const nearStripe = (a: V, p: V): boolean => {
  const r = Math.hypot(p[0], p[1]);
  const outer = Math.hypot(a[0], a[1]) > (SHAFT_OUT + SHAFT_IN) / 2;

  return dist(a, p) < 16 && (outer ? r > SHAFT_OUT : r < SHAFT_IN);
};

const flipped = (p: V): V => [-p[0], p[1]];
/** The right feather, drawn in the left's place and mirrored: cut where the left feather's quill lies over it. */
const inkedRight = (p: V): boolean => inLeft(p) && !inQuill(flipped(p), GAP);

const outlines = (under = false): Piece[] => {
  const whole = (c: V, r: number): Piece => arcA(c, r, 0, TAU);
  const long = ([a, b]: [V, V]): Piece => {
    const l = dist(a, b);
    const d: V = [(b[0] - a[0]) / l, (b[1] - a[1]) / l];

    return seg([a[0] - d[0] * 300, a[1] - d[1] * 300], [a[0] + d[0] * 300, a[1] + d[1] * 300]);
  };
  const a = quillFrom();
  const d: V = [(QUILL_END[0] - a[0]) / dist(a, QUILL_END), (QUILL_END[1] - a[1]) / dist(a, QUILL_END)];
  const n: V = [-d[1], d[0]];
  const quill = (more: number): Piece[] => [
    ...[1, -1].map((s) => long([[a[0] + n[0] * (HALF_QUILL + more) * s, a[1] + n[1] * (HALF_QUILL + more) * s], [QUILL_END[0] + n[0] * (HALF_QUILL + more) * s, QUILL_END[1] + n[1] * (HALF_QUILL + more) * s]])),
    whole(QUILL_END, HALF_QUILL + more),
  ];
  const own = [
    ...[OUTER, SHAFT_OUT + GAP, SHAFT_OUT, SHAFT_IN, SHAFT_IN - GAP, INNER].map((r) => whole([0, 0], r)),
    whole(TIP, TIP_R),
    long([[0, 0], polarAt(1, FOOT)]),
    long([[0, 0], TIP]),
    long([[0, 0], [0, 1]]),
    long([[-GAP / 2, 0], [-GAP / 2, 1]]),
    ...stripeLines().flatMap(([p, q]) => {
      const l = dist(p, q);
      const m: V = [-(q[1] - p[1]) / l, (q[0] - p[0]) / l];

      return [1, -1].map((s) => long([[p[0] + m[0] * s * (GAP / 2), p[1] + m[1] * s * (GAP / 2)], [q[0] + m[0] * s * (GAP / 2), q[1] + m[1] * s * (GAP / 2)]]));
    }),
    ...quill(0),
  ];
  const theirs = quill(GAP).map((piece) => mirrored(piece));

  return under ? [...own, ...theirs] : own;
};

export const dakitakaLeft = (): Region[] => carveWhere(outlines(), inLeft);
/** The right feather's outline, in the left's place. */
export const dakitakaRight = (): Region[] => carveWhere(outlines(true), inkedRight);

/** 抱き鷹の羽: the left feather, then the right one, its mirror image, built where it stands. */
export const dakiTakanohaBuild = (c: Builder, part: string): void => {
  c.guideCircle(C0, R);
  c.fill(part, toPath(dakitakaLeft(), PLACING), "evenodd");
  c.fill(part, toPath(dakitakaRight().map((loop) => loop.map((piece) => mirrored(piece))), PLACING), "evenodd");
};
