// The crossed battle axes, 違い鉞, in a frame of their own: the crest's middle at (0, 0), x to the right, y up, in the units of the
// 1892 crest book's drawing (the pair is about 200 across and 190 high there), then scaled so that the pair reaches `reach`.
//
// Two axes, mirror images, their heads up and out and their long handles crossed below. A head is the ground between five circles
// and a ruled line: the top of the bevel (45 about (-45, 40)), the line of its back, the curved notch below the stub of the handle
// (35 about (-102, 64)), the full round of the blade (37 about (-62, 28)) and the arch that both heads share over the crossing
// (66 about (8, -25) for the left head, its mirror for the right). A saw-toothed white line runs along the bevel from the back of
// the head to where the two heads meet, and three white strokes lie along the blade. A handle is 12 wide with round ends; it runs
// at half a right angle through (0, -8), passes under its own head (a white gap of 2 round the head), and at the crossing the
// rising handle lies over the falling one, a gap of 2 each side of it.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, circleCircle, disc, inside, lineCircle, mirrored, nearest, seg, shortArc, toPath, vadd, vdist, vmul } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";

const GAP = 2;
const HALF = 6;
/** How far the farthest point of the pair is from the middle, which is where the pair reaches the layout circle. */
const REACH = 108;

const F1: Circle = { c: [-45, 40], r: 45 };
const F3: Circle = { c: [-62, 28], r: 37 };
const F4: Circle = { c: [-98, 62], r: 37 };
const F5: Circle = { c: [8, -25], r: 66 };
/** The back of the head: a line through these two points; it leans out by 9 for every 39 up. */
const BACK: [V, V] = [[-66, 48], [-56, 85]];

export const unit = (a: V, b: V): V => {
  const d: V = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(d[0], d[1]);

  return [d[0] / l, d[1] / l];
};
const BACK_DIR = unit(BACK[0], BACK[1]);
/** The back's normal pointing away from the head, to the left. */
const BACK_OUT: V = [-BACK_DIR[1], BACK_DIR[0]];

/** The left head's outline, grown `g` all round (the white gap round it is the head grown by the gap). */
const head = (g: number): Region => {
  const [a, b] = BACK.map((p): V => vadd(p, vmul(BACK_OUT, g)));
  const [f1, f3, f4, f5]: Circle[] = [{ c: F1.c, r: F1.r + g }, { c: F3.c, r: F3.r + g }, { c: F4.c, r: F4.r - g }, { c: F5.c, r: F5.r - g }];
  const top: V = nearest(circleCircle(f1.c, f1.r, f5.c, f5.r), [0, 40]);
  const corner: V = nearest(lineCircle(a, b, f1.c, f1.r), [-56, 85]);
  const notch: V = nearest(lineCircle(a, b, f4.c, f4.r), [-68, 41]);
  const tip: V = nearest(circleCircle(f4.c, f4.r, f3.c, f3.r), [-100, 29]);
  const heel: V = nearest(circleCircle(f3.c, f3.r, f5.c, f5.r), [-55, -4]);

  return [shortArc(f1, top, corner), seg(corner, notch), shortArc(f4, notch, tip), shortArc(f3, tip, heel), shortArc(f5, heel, top)];
};
const HEAD = head(0);
const HEAD_GAP = head(GAP);
const RIGHT_HEAD_GAP = HEAD_GAP.map(mirrored);

/** A ruled line long enough to cross the whole crest, through `p` along `d`. */
export const line = (p: V, d: V): Piece => seg([p[0] - d[0] * 300, p[1] - d[1] * 300], [p[0] + d[0] * 300, p[1] + d[1] * 300]);

// The saw-toothed white line: along the way from the head's back to where the heads meet, nine teeth, the line 2 wide.
const SAW_FROM: V = [-58, 80];
const SAW_TO: V = [0, 41];
const SAW_ALONG = unit(SAW_FROM, SAW_TO);
const SAW_UP: V = [-SAW_ALONG[1], SAW_ALONG[0]];
const SAW_LENGTH = vdist(SAW_FROM, SAW_TO);
const TEETH = 9;
const STEP = SAW_LENGTH / (2 * TEETH);
const SWING = 2;
/** The line's half width measured across the baseline: 1 across the tooth's own edge, over the cosine of its lean. */
const LEAN = Math.atan2(2 * SWING, STEP);
const SAW_HALF = 1 / Math.cos(LEAN);
const sawAt = (i: number): V => [i * STEP, i % 2 === 0 ? -SWING : SWING];
const sawPoint = (s: number, d: number): V => [SAW_FROM[0] + SAW_ALONG[0] * s + SAW_UP[0] * d, SAW_FROM[1] + SAW_ALONG[1] * s + SAW_UP[1] * d];
const sawCentre = (s: number): number => {
  const i = Math.floor(s / STEP);
  const [s0, d0] = sawAt(i);
  const [, d1] = sawAt(i + 1);

  return d0 + ((d1 - d0) * (s - s0)) / STEP;
};
const inSaw = (p: V): boolean => {
  const s = (p[0] - SAW_FROM[0]) * SAW_ALONG[0] + (p[1] - SAW_FROM[1]) * SAW_ALONG[1];
  const d = (p[0] - SAW_FROM[0]) * SAW_UP[0] + (p[1] - SAW_FROM[1]) * SAW_UP[1];
  if (s < -STEP || s > SAW_LENGTH + STEP) return false;

  return Math.abs(d - sawCentre(s)) <= SAW_HALF;
};
const sawLines = (): Piece[] => {
  const out: Piece[] = [];
  for (let i = -1; i <= 2 * TEETH; i += 1) {
    const [s0, d0] = sawAt(i);
    const [s1, d1] = sawAt(i + 1);
    const along = unit(sawPoint(s0, d0), sawPoint(s1, d1));
    for (const w of [SAW_HALF, -SAW_HALF]) out.push(line(sawPoint(s0, d0 + w), along));
  }

  return out;
};

// Three white strokes along the blade, 2 wide: two straight, one a short arc of a circle of 41 about (-24, -4).
interface Stroke {
  a: V;
  b: V;
}
const STRAIGHT: Stroke[] = [{ a: [-71, 23], b: [-60, 49] }, { a: [-71, 15], b: [-47, 45] }];
const BOW: Circle = { c: [-24, -4], r: 41 };
const BOW_FROM = 153.2;
const BOW_TO = 114.6;
const inStraight = (p: V, s: Stroke): boolean => {
  const l = vdist(s.a, s.b);
  const d = unit(s.a, s.b);
  const t = (p[0] - s.a[0]) * d[0] + (p[1] - s.a[1]) * d[1];
  const w = (p[0] - s.a[0]) * -d[1] + (p[1] - s.a[1]) * d[0];

  return t >= 0 && t <= l && Math.abs(w) <= 1;
};
const inBow = (p: V): boolean => {
  const a = (Math.atan2(p[1] - BOW.c[1], p[0] - BOW.c[0]) * 180) / Math.PI;

  return Math.abs(vdist(p, BOW.c) - BOW.r) <= 1 && a >= BOW_TO && a <= BOW_FROM;
};
const strokeOutlines = (): Piece[] => {
  const out: Piece[] = [];
  for (const s of STRAIGHT) {
    const d = unit(s.a, s.b);
    const n: V = [-d[1], d[0]];
    for (const w of [1, -1]) out.push(line(vadd(s.a, vmul(n, w)), d));
    for (const p of [s.a, s.b]) out.push(line(p, n));
  }
  for (const r of [BOW.r - 1, BOW.r + 1]) out.push(...disc(BOW.c, r));
  for (const deg of [BOW_FROM, BOW_TO]) out.push(line(BOW.c, [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)]));

  return out;
};

/** A handle: its two end centres; it is 12 wide with round ends. */
interface Handle {
  a: V;
  b: V;
}
const RISING: Handle = { a: [-68, -76], b: [77, 69] };
const FALLING: Handle = { a: [68, -76], b: [-77, 69] };
const inHandle = (p: V, h: Handle, grow: number): boolean => {
  const l = vdist(h.a, h.b);
  const d = unit(h.a, h.b);
  const t = Math.max(0, Math.min(l, (p[0] - h.a[0]) * d[0] + (p[1] - h.a[1]) * d[1]));

  return vdist(p, [h.a[0] + d[0] * t, h.a[1] + d[1] * t]) <= HALF + grow;
};
const handleOutlines = (h: Handle, grow: number): Piece[] => {
  const d = unit(h.a, h.b);
  const n: V = [-d[1], d[0]];

  return [...[1, -1].map((w) => line(vadd(h.a, vmul(n, w * (HALF + grow))), d)), ...disc(h.a, HALF + grow), ...disc(h.b, HALF + grow)];
};

/**
 * The crossed axes: two heads, mirror images, and two handles under them, the rising one over the falling at the crossing.
 * `reach` is how far the pair stands from the middle at its farthest.
 */
export const masakariBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / REACH };
  const headOutlines: Piece[] = [...disc(F1.c, F1.r), ...disc(F3.c, F3.r), ...disc(F4.c, F4.r), ...disc(F5.c, F5.r), line(BACK[0], BACK_DIR), ...sawLines(), ...strokeOutlines()];
  const inked = (p: V): boolean => inside(HEAD, p) && !inSaw(p) && !STRAIGHT.some((s) => inStraight(p, s)) && !inBow(p);
  c.guideCircle(C0, reach);
  const left = carveWhere(headOutlines, inked);
  c.fill(part, toPath(left, placing), "evenodd");
  c.fill(part, toPath(left.map((loop) => loop.map(mirrored)), placing), "evenodd");
  const covered = (p: V): boolean => inside(HEAD_GAP, p) || inside(RIGHT_HEAD_GAP, p);
  const gapOutlines: Piece[] = [...disc(F1.c, F1.r + GAP), ...disc(F3.c, F3.r + GAP), ...disc(F4.c, F4.r - GAP), ...disc(F5.c, F5.r - GAP)];
  const mirroredGap: Piece[] = gapOutlines.map(mirrored);
  const gapLines: Piece[] = [line(vadd(BACK[0], vmul(BACK_OUT, GAP)), BACK_DIR), line([-vadd(BACK[0], vmul(BACK_OUT, GAP))[0], vadd(BACK[0], vmul(BACK_OUT, GAP))[1]], [-BACK_DIR[0], BACK_DIR[1]])];
  const keep = [...gapOutlines, ...mirroredGap, ...gapLines];
  c.fill(part, toPath(carveWhere([...handleOutlines(RISING, 0), ...keep], (p) => inHandle(p, RISING, 0) && !covered(p)), placing), "evenodd");
  c.fill(part, toPath(carveWhere([...handleOutlines(FALLING, 0), ...handleOutlines(RISING, GAP), ...keep], (p) => inHandle(p, FALLING, 0) && !covered(p) && !inHandle(p, RISING, GAP)), placing), "evenodd");
};
