// The crossed battle axes of the ringed crest, 丸に違い鉞, in a frame of their own: the crest's middle at (0, 0), x to the right, y
// up, in the units of the 1892 crest book's cell (the ring's inner circle is 79 there), then scaled so that the pair reaches `reach`.
//
// The heads are bigger than those of 違い鉞 and sweep down and out to a point, their edge below the bevel a wavy white line. A head is
// the ground between four circles and three ruled lines: the top of the bevel (47 about (-38, 12)), the line of its back, the blade's
// round (39 about (-86, 51)), the lower outer curve (26 about (-48, 16)), the line of its foot, the line of its inner side and the arch
// both heads share over the crossing (62 about (34, -12)). The two heads are mirror images. A handle is 8 wide with square ends and
// leans 42 degrees from level through (0, -1.5); it goes under its own head (a white gap of 2 round the head), and at the crossing the
// rising handle lies over the falling one, a gap of 2 each side of it.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, circleCircle, disc, inside, lineCircle, mirrored, nearest, seg, shortArc, toPath, vadd, vdist, vmul } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { line, unit } from "./masakari.ts";

const GAP = 2;
const HALF = 4;
/** How far the farthest point of the pair is from the middle. */
const REACH = 76;

const TOP: Circle = { c: [-38, 11.6], r: 46.84 };
const BLADE: Circle = { c: [-86.5, 50.7], r: 39.1 };
const LOWER: Circle = { c: [-48.2, 15.9], r: 26.4 };
const ARCH: Circle = { c: [34.1, -12.5], r: 61.8 };
/** The back of the head, upright. */
const BACK_X = -49.5;
const FOOT_Y = -10;
/** The head's inner side: a line through these two points. */
const SIDE: [V, V] = [[-26.6, -10], [-18.3, 18.5]];
const SIDE_DIR = unit(SIDE[0], SIDE[1]);
/** The side's normal pointing away from the head, to the right. */
const SIDE_OUT: V = [SIDE_DIR[1], -SIDE_DIR[0]];

/** The left head's outline, grown `g` all round (the white gap round it is the head grown by the gap). */
const head = (g: number): Region => {
  const top: Circle = { c: TOP.c, r: TOP.r + g };
  const blade: Circle = { c: BLADE.c, r: BLADE.r - g };
  const lower: Circle = { c: LOWER.c, r: LOWER.r + g };
  const arch: Circle = { c: ARCH.c, r: ARCH.r - g };
  const backX = BACK_X - g;
  const foot = FOOT_Y - g;
  const [s0, s1] = SIDE.map((p): V => vadd(p, vmul(SIDE_OUT, g)));
  const apex: V = nearest(circleCircle(top.c, top.r, arch.c, arch.r), [0, 39]);
  const corner: V = nearest(lineCircle([backX, 0], [backX, 100], top.c, top.r), [-49.5, 57]);
  const notch: V = nearest(lineCircle([backX, 0], [backX, 100], blade.c, blade.r), [-49.5, 38]);
  const tip: V = nearest(circleCircle(blade.c, blade.r, lower.c, lower.r), [-74, 15]);
  const toe: V = nearest(lineCircle([-100, foot], [100, foot], lower.c, lower.r), [-53, foot]);
  const base: V = [s0[0] + ((foot - s0[1]) / (s1[1] - s0[1])) * (s1[0] - s0[0]), foot];
  const shoulder: V = nearest(lineCircle(s0, s1, arch.c, arch.r), [-19.3, 18.5]);

  return [shortArc(top, apex, corner), seg(corner, notch), shortArc(blade, notch, tip), shortArc(lower, tip, toe), seg(toe, base), seg(base, shoulder), shortArc(arch, shoulder, apex)];
};
const HEAD = head(0);
const HEAD_GAP = head(GAP);
const RIGHT_HEAD_GAP = HEAD_GAP.map(mirrored);

// The wavy white line along the blade's lower edge, from the tip to the foot of the inner side: seven teeth, the line 2 wide.
const TIP: V = nearest(circleCircle(BLADE.c, BLADE.r, LOWER.c, LOWER.r), [-74, 15]);
const WAVE_FROM: V = [TIP[0], TIP[1] + 0.7];
const WAVE_TO: V = [SIDE[0][0], FOOT_Y];
const WAVE_ALONG = unit(WAVE_FROM, WAVE_TO);
const WAVE_UP: V = [-WAVE_ALONG[1], WAVE_ALONG[0]];
const WAVE_LENGTH = vdist(WAVE_FROM, WAVE_TO);
const TEETH = 7;
const STEP = WAVE_LENGTH / (2 * TEETH);
const SWING = 2;
const LEAN = Math.atan2(2 * SWING, STEP);
const WAVE_HALF = 1 / Math.cos(LEAN);
const waveAt = (i: number): V => [i * STEP, i % 2 === 0 ? -SWING : SWING];
const wavePoint = (s: number, d: number): V => [WAVE_FROM[0] + WAVE_ALONG[0] * s + WAVE_UP[0] * d, WAVE_FROM[1] + WAVE_ALONG[1] * s + WAVE_UP[1] * d];
const waveCentre = (s: number): number => {
  const i = Math.floor(s / STEP);
  const [s0, d0] = waveAt(i);
  const [, d1] = waveAt(i + 1);

  return d0 + ((d1 - d0) * (s - s0)) / STEP;
};
const inWave = (p: V): boolean => {
  const s = (p[0] - WAVE_FROM[0]) * WAVE_ALONG[0] + (p[1] - WAVE_FROM[1]) * WAVE_ALONG[1];
  const d = (p[0] - WAVE_FROM[0]) * WAVE_UP[0] + (p[1] - WAVE_FROM[1]) * WAVE_UP[1];
  if (s < -STEP || s > WAVE_LENGTH + STEP) return false;

  return Math.abs(d - waveCentre(s)) <= WAVE_HALF;
};
const waveLines = (): Piece[] => {
  const out: Piece[] = [];
  for (let i = -1; i <= 2 * TEETH; i += 1) {
    const [s0, d0] = waveAt(i);
    const [s1, d1] = waveAt(i + 1);
    const along = unit(wavePoint(s0, d0), wavePoint(s1, d1));
    for (const w of [WAVE_HALF, -WAVE_HALF]) out.push(line(wavePoint(s0, d0 + w), along));
  }

  return out;
};

// Three white strokes on the blade, 2 wide: two straight, one a short arc of a circle of 67 about (29, -9).
interface Stroke {
  a: V;
  b: V;
}
const STRAIGHT: Stroke[] = [{ a: [-51.5, 23], b: [-38.5, 46] }, { a: [-41.5, 19.5], b: [-27.5, 43.5] }];
const BOW: Circle = { c: [28.7, -9.3], r: 66.8 };
const BOW_FROM = 160;
const BOW_TO = 138;
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

/** A handle: its two end centres, 8 wide with square ends. */
interface Handle {
  a: V;
  b: V;
}
const LEAN_HANDLE = 42;
const CROSS: V = [0, -1.5];
const handleEnd = (from: number, side: 1 | -1): V => [CROSS[0] + side * from * Math.cos((LEAN_HANDLE * Math.PI) / 180), CROSS[1] + side * from * Math.sin((LEAN_HANDLE * Math.PI) / 180)];
const RISING: Handle = { a: handleEnd(73, -1), b: handleEnd(77, 1) };
const FALLING: Handle = { a: [-RISING.a[0], RISING.a[1]], b: [-RISING.b[0], RISING.b[1]] };
const inHandle = (p: V, h: Handle, grow: number): boolean => {
  const l = vdist(h.a, h.b);
  const d = unit(h.a, h.b);
  const t = (p[0] - h.a[0]) * d[0] + (p[1] - h.a[1]) * d[1];
  const w = (p[0] - h.a[0]) * -d[1] + (p[1] - h.a[1]) * d[0];

  return t >= -grow && t <= l + grow && Math.abs(w) <= HALF + grow;
};
const handleOutlines = (h: Handle, grow: number): Piece[] => {
  const d = unit(h.a, h.b);
  const n: V = [-d[1], d[0]];

  return [...[1, -1].map((w) => line(vadd(h.a, vmul(n, w * (HALF + grow))), d)), line(vadd(h.a, vmul(d, -grow)), n), line(vadd(h.b, vmul(d, grow)), n)];
};

/**
 * The crossed axes of the ringed crest: two heads, mirror images, and two handles under them, the rising one over the falling at
 * the crossing. `reach` is how far the pair stands from the middle at its farthest.
 */
export const maruMasakariBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / REACH };
  const headOutlines: Piece[] = [...disc(TOP.c, TOP.r), ...disc(BLADE.c, BLADE.r), ...disc(LOWER.c, LOWER.r), ...disc(ARCH.c, ARCH.r), line([BACK_X, 0], [0, 1]), line([0, FOOT_Y], [1, 0]), line(SIDE[0], SIDE_DIR), ...waveLines(), ...strokeOutlines()];
  const inked = (p: V): boolean => inside(HEAD, p) && !inWave(p) && !STRAIGHT.some((s) => inStraight(p, s)) && !inBow(p);
  c.guideCircle(C0, reach);
  const left = carveWhere(headOutlines, inked);
  c.fill(part, toPath(left, placing), "evenodd");
  c.fill(part, toPath(left.map((loop) => loop.map(mirrored)), placing), "evenodd");
  const covered = (p: V): boolean => inside(HEAD_GAP, p) || inside(RIGHT_HEAD_GAP, p);
  const gapOutlines: Piece[] = [...disc(TOP.c, TOP.r + GAP), ...disc(BLADE.c, BLADE.r - GAP), ...disc(LOWER.c, LOWER.r + GAP), ...disc(ARCH.c, ARCH.r - GAP)];
  const gapLines: Piece[] = [line([BACK_X - GAP, 0], [0, 1]), line([0, FOOT_Y - GAP], [1, 0]), line(vadd(SIDE[0], vmul(SIDE_OUT, GAP)), SIDE_DIR)];
  const keep: Piece[] = [...gapOutlines, ...gapOutlines.map(mirrored), ...gapLines, ...gapLines.map(mirrored)];
  c.fill(part, toPath(carveWhere([...handleOutlines(RISING, 0), ...keep], (p) => inHandle(p, RISING, 0) && !covered(p)), placing), "evenodd");
  c.fill(part, toPath(carveWhere([...handleOutlines(FALLING, 0), ...handleOutlines(RISING, GAP), ...keep], (p) => inHandle(p, FALLING, 0) && !covered(p) && !inHandle(p, RISING, GAP)), placing), "evenodd");
};
