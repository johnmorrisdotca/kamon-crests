// The crane in a circle, 鶴の丸, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle
// at 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 21, 鶴の丸); every centre is a grid
// point and every compass width a whole number.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: between two feathers, round a scale, and round the window. */
const LINE = 3;
const RIM = 100;
/** The round window the wings leave about the head: the bird is drawn inside the inner circle, the feathers outside the outer. */
const WINDOW: V = [0, 40];
const WINDOW_IN = 46;
const WINDOW_OUT = WINDOW_IN + LINE;
/** The right wing's long feathers: the white lines between them are arcs about one point left of the axis, so they follow the rim and rise round the window. */
const LONG: V = [-40, 10];
const LONG_R = [92, 104, 116, 128];
/** The lines across the right wing's feathers: arcs about one point high on the left. */
const ACROSS: V = [20, 120];
const ACROSS_R = [140, 151, 162, 173, 184, 195];
/** The line across the right wing's upper feathers, from the second long line down to the rim: an arc about a point low on the left. */
const UPPER: V = [-34, -73];
const UPPER_R = 160;
/** Above this level the wings' tips cross the axis, each over the other's. */
const CROSS = 80;
/** The breast: rows of round scales about the window's centre, each row over the next; a row is how far its scales are from the centre, the angle of its outermost scale from straight down, and the angle between two. */
const SCALE = 10;
const ROWS: { out: number; from: number; step: number }[] = [
  { out: 57, from: 56, step: 16 },
  { out: 68, from: 40.5, step: 13.5 },
  { out: 79, from: 40.6, step: 11.6 },
  { out: 90, from: 30.6, step: 10.2 },
  { out: 101, from: 22.75, step: 9.1 },
  { out: 112, from: 16.4, step: 8.2 },
];
/** The tail: the lens between two circles that cross on the axis at the foot of the rim, with a white line down the middle. */
const TAIL: V = [40, -70];
const TAIL_R = 50;
/** The head looks to the left: a circle with a ringed eye. */
const HEAD: Circle = { c: [4, 58], r: 20 };
const EYE: Circle = { c: [-5, 66], r: 5 };
const PUPIL = 2.5;
/** The crest of feathers at the back of the head: three white slivers, each the lens between two circles of one width. */
const CREST_R = 11;
const CREST: [V, V][] = [
  [[13, 72], [8, 52]],
  [[9, 79], [13, 59]],
  [[3, 84], [14, 67]],
];
/** The neck: the band between two circles about one point, the inner one touching the head. */
const NECK: V = [48, 25];
const NECK_R: [number, number] = [35, 47];
/** The breast's upper edge in the window, and the white line down the front of the neck. */
const BREAST: Circle = { c: [54, -93], r: 136 };
const THROAT: Circle = { c: [-80, 60], r: 90 };
/** The beak: two ruled edges that meet in its point, and the white line of the mouth between them. */
const BEAK: V = [-40, 43];
const BEAK_TOP: V = [-12, 60];
const BEAK_FOOT: V = [-6, 50];
const MOUTH: V = [-9, 55];
const MOUTH_LINE = 1.5;

/** The grid point nearest the point `r` from `c` at `angle` degrees from straight down, positive to the right. */
const below = (c: V, r: number, angle: number): V => [Math.round(c[0] + r * Math.sin((angle * Math.PI) / 180)), Math.round(c[1] - r * Math.cos((angle * Math.PI) / 180))];
const scales: Circle[][] = ROWS.map((row) => {
  const out: Circle[] = [];
  for (let a = -row.from; a <= row.from + 1e-9; a += row.step) out.push({ c: below(WINDOW, row.out, a), r: SCALE });

  return out;
});
/** The tick on each scale: a white sliver pointing away from the window's centre, the lens between two circles of one width on grid points either side of it. */
const TICK_R = 9;
const tickOf = (scale: Circle): [V, V] => {
  const d = vdist(WINDOW, scale.c);
  const u: V = [(scale.c[0] - WINDOW[0]) / d, (scale.c[1] - WINDOW[1]) / d];
  const m: V = [scale.c[0] + 6 * u[0], scale.c[1] + 6 * u[1]];
  let best: { pair: [V, V]; err: number } | undefined;
  for (let i = -1; i <= 1; i += 1)
    for (let j = -1; j <= 1; j += 1)
      for (let k = -1; k <= 1; k += 1)
        for (let l = -1; l <= 1; l += 1) {
          const a: V = [Math.round(m[0] - 7.8 * u[1]) + i, Math.round(m[1] + 7.8 * u[0]) + j];
          const b: V = [Math.round(m[0] + 7.8 * u[1]) + k, Math.round(m[1] - 7.8 * u[0]) + l];
          const gap = vdist(a, b);
          const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const along = Math.abs(((b[0] - a[0]) * u[0] + (b[1] - a[1]) * u[1]) / gap);
          const err = Math.abs(2 * TICK_R - gap - 3.2) * 4 + vdist(mid, m) + along * 6;
          if (best === undefined || err < best.err) best = { pair: [a, b], err };
        }

  return best!.pair;
};
const ticks: [V, V][][] = scales.map((row) => row.map(tickOf));
const within = (circles: Circle[], p: V, grow = 0): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r + grow);
const flip = (p: V): V => [-p[0], p[1]];
/** Which side of the line through `a` and `b` a point is on. */
const side = (a: V, b: V, p: V): number => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
/** The ruled line through two points, long enough to cross the page. */
const ruled = (a: V, b: V): Piece => {
  const d = vdist(a, b);
  const u: V = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];

  return seg([a[0] - u[0] * 400, a[1] - u[1] * 400], [a[0] + u[0] * 400, a[1] + u[1] * 400]);
};
const band = (c: V, r: number, w: number): Piece[] => [...disc(c, r - w / 2), ...disc(c, r + w / 2)];
const onLine = (c: V, radii: number[], p: V): boolean => radii.some((r) => Math.abs(vdist(c, p) - r) < LINE / 2);
/** Whether a point lies on a white line of the right wing: those of its long feathers, which cross over the axis above `CROSS`, and those across them below the window's centre. */
const rightLine = (p: V): boolean => ((p[0] > 0 || p[1] > CROSS) && onLine(LONG, LONG_R, p)) || (p[0] > 0 && ((p[1] < WINDOW[1] && onLine(ACROSS, ACROSS_R, p)) || (vdist(LONG, p) > LONG_R[1] && onLine(UPPER, [UPPER_R], p))));

/**
 * Whether a point of the two wings, the breast's scales and the tail is ink: the crest is mirror-symmetric in all of them, so the
 * right half is built and the left half is its mirror image.
 */
const plumage = (p: V): boolean => {
  if (vdist([0, 0], p) > RIM || vdist(WINDOW, p) < WINDOW_OUT) return false;
  for (const [i, row] of scales.entries())
    if (within(row, p, LINE)) {
      if (!within(row, p)) return false;
      const at = row.findIndex((circ) => vdist(circ.c, p) < circ.r);

      return !(vdist(ticks[i][at][0], p) < TICK_R && vdist(ticks[i][at][1], p) < TICK_R);
    }
  const tail = (grow: number): boolean => vdist(TAIL, p) < TAIL_R + grow && vdist(flip(TAIL), p) < TAIL_R + grow;
  if (tail(LINE)) return tail(0) && Math.abs(p[0]) > LINE / 2;

  return !rightLine(p) && !rightLine(flip(p));
};

/** Whether a point of the head, the neck, the beak and the breast in the window is ink. */
const bird = (p: V): boolean => {
  if (vdist(WINDOW, p) > WINDOW_IN) return false;
  // Below the beak the head is cut back to the front of the neck: the throat.
  const head = vdist(HEAD.c, p) < HEAD.r && (vdist(NECK, p) < NECK_R[1] || side(BEAK, BEAK_FOOT, p) > 0);
  const beak = p[0] < 0 && p[0] > BEAK[0] && side(BEAK, BEAK_TOP, p) < 0 && side(BEAK, BEAK_FOOT, p) > 0;
  const n = vdist(NECK, p);
  const body = n > NECK_R[0] && side(HEAD.c, NECK, p) < 0 && (n < NECK_R[1] || vdist(BREAST.c, p) < BREAST.r);
  if (!head && !beak && !body) return false;
  if (vdist(EYE.c, p) < EYE.r) return vdist(EYE.c, p) < PUPIL;
  if (head && CREST.some(([a, b]) => vdist(a, p) < CREST_R && vdist(b, p) < CREST_R)) return false;
  if (!head && beak) return Math.abs(side(BEAK, MOUTH, p)) / vdist(BEAK, MOUTH) > MOUTH_LINE / 2;
  if (!head && Math.abs(vdist(THROAT.c, p) - THROAT.r) < LINE / 2) return false;

  return true;
};

/**
 * The crane in a circle, 鶴の丸: a crane seen from the front with its wings raised round a round window, their tips crossing over
 * the top of it. In the window the head looks to the left, with a ringed eye and a long beak, and the neck comes down into the
 * breast. Each wing is long feathers that follow the rim, the white lines between them arcs about one point, and lines across
 * them about another; the breast is rows of round scales, and the tail a lens at the foot. The right half is built in full, then
 * the head and the neck, and the left half where it stands.
 */
export const tsuruBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const near = scales.flat().filter((circ) => circ.c[0] > -SCALE - LINE - 1);
  const nearTicks = ticks.flat().filter((_, i) => scales.flat()[i].c[0] > -SCALE - LINE - 1);
  const halfOutlines: Piece[] = [
    ...disc([0, 0], RIM),
    ...disc(WINDOW, WINDOW_OUT),
    seg([-1, -200], [-1, 200]),
    seg([0, -200], [0, 200]),
    ...[LINE / 2, -LINE / 2].map((x) => seg([x, -200], [x, 200])),
    ...near.flatMap((circ) => [...disc(circ.c, circ.r), ...disc(circ.c, circ.r + LINE)]),
    ...nearTicks.flat().flatMap((at) => disc(at, TICK_R)),
    ...[TAIL, flip(TAIL)].flatMap((t) => [...disc(t, TAIL_R), ...disc(t, TAIL_R + LINE)]),
    ...LONG_R.flatMap((r) => [...band(LONG, r, LINE), ...band(flip(LONG), r, LINE)]),
    ...ACROSS_R.flatMap((r) => band(ACROSS, r, LINE)),
    ...band(UPPER, UPPER_R, LINE),
    seg([-200, CROSS], [200, CROSS]),
    seg([-200, WINDOW[1]], [200, WINDOW[1]]),
  ];
  const birdOutlines: Piece[] = [
    ...disc(WINDOW, WINDOW_IN),
    ...disc(HEAD.c, HEAD.r),
    ...disc(EYE.c, EYE.r),
    ...disc(EYE.c, PUPIL),
    ...CREST.flat().flatMap((at) => disc(at, CREST_R)),
    ...NECK_R.flatMap((r) => disc(NECK, r)),
    ...disc(BREAST.c, BREAST.r),
    ...band(THROAT.c, THROAT.r, LINE),
    ruled(HEAD.c, NECK),
    ruled(BEAK, BEAK_TOP),
    ruled(BEAK, BEAK_FOOT),
    seg([BEAK[0], -200], [BEAK[0], 200]),
    seg([0, -200], [0, 200]),
    ...[MOUTH_LINE / 2, -MOUTH_LINE / 2].map((o) => {
      const d = vdist(BEAK, MOUTH);
      const n: V = [(-(MOUTH[1] - BEAK[1]) / d) * o, ((MOUTH[0] - BEAK[0]) / d) * o];

      return ruled([BEAK[0] + n[0], BEAK[1] + n[1]], [MOUTH[0] + n[0], MOUTH[1] + n[1]]);
    }),
  ];
  const right = longLast(carveWhere(halfOutlines, (p) => p[0] > -1 && plumage(p)));

  c.guideCircle(C0, reach);
  c.fill(part, toPath(right, placing));
  c.fill(part, toPath(longLast(carveWhere(birdOutlines, bird)), placing));
  c.fill(part, toPath(right.map((loop) => loop.map(mirrored)), placing));
};
