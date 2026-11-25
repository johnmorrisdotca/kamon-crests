// The crane in a circle, 鶴の丸, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle
// at 100. Its proportions were measured from the 1892 crest book (伊呂波分新撰紋帳, frame 21, 鶴の丸).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carveWhere, disc, mirrored, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, V } from "../../construct/compass.ts";
import { longLast } from "./leafy.ts";

/** A white line: between two feathers, round a scale, and between the wings and the body. */
const LINE = 2;
/** The wings' tips lie on the layout circle. */
const RIM = 100;
/** The round window the wings leave about the head. */
const WINDOW: Circle = { c: [0, 48], r: 47 };
/** The body, and the belly below it. */
const BODY: Circle = { c: [0, -8], r: 36 };
const BELLY: Circle = { c: [0, -42], r: 26 };
/** The head, and the eye in it: a white disc with a dot. */
const HEAD: Circle = { c: [-6, 55], r: 15 };
const EYE: Circle = { c: [-8, 57], r: 4.5 };
const PUPIL = 2;
/** The neck bends round from the head down into the body: the band between two circles about one point, as far as it lies in a third circle. */
const NECK: { c: V; r: [number, number]; span: Circle } = { c: [-22, 24], r: [36, 49], span: { c: [22, 40], r: 34 } };
/** The compass width of every long line: the lines between the long feathers, and the beak's two edges and its mouth. */
const LONG = 96;
/** The beak points down to the left: its upper edge, its lower edge and the white line of the mouth between them are arcs about these points. */
const BEAK_TOP: V = [41, -22];
const BEAK_FOOT: V = [11, -52];
const MOUTH: V = [29, -38];
const MOUTH_LINE = 1.5;
/** The lines between a wing's long feathers, from the top down: each an arc about a grid point, from the rim in to the wing's small feathers. */
const FEATHERS: V[] = [[-43, 61], [-31, 71], [-16, 78], [0, 83], [17, 85], [36, 83], [56, 78], [78, -121], [49, -131], [17, -132], [-13, -126], [-40, -111], [-60, -91]];
/** The breast: a circle with a white line round its lower edge, and rows of scales below it, each row round ends on a circle about the breast's centre. */
const BREAST: Circle = { c: [0, 12], r: 30 };
const SCALE = 9;
/** Each row of the belly's scales: how far its scales' centres are from the breast's centre, the clock angles they stand at, and the circle the row is laid on. */
const BELLY_ROWS: { out: number; at: number[]; base: number }[] = [
  { out: 34, at: [139.5, 166.5, 193.5, 220.5], base: 37 },
  { out: 46, at: [140, 160, 180, 200, 220], base: 49 },
  { out: 58, at: [156, 172, 188, 204], base: 61 },
  { out: 70, at: [167, 180, 193], base: 73 },
];
/** The wing's two rows of small feathers about the body's centre: round ends that point out, the inner row over the outer one. */
const WING_ROWS: { out: number; at: number[]; base: number; r: number }[] = [
  { out: 45, at: [68, 92, 116, 140], base: 47, r: 10 },
  { out: 54, at: [56, 80, 104, 128, 152], base: 57, r: 12 },
];

/** The grid point nearest the point `r` from `c` at clock angle `clock`. */
const gridAt = (c: V, r: number, clock: number): V => [Math.round(c[0] + r * Math.sin(clock * DEG)), Math.round(c[1] + r * Math.cos(clock * DEG))];
/** A row of round ends laid on a circle: the circle, and the ends' own circles. */
const row = (c: V, o: { out: number; at: number[]; base: number }, r: number): Circle[] => [{ c, r: o.base }, ...o.at.map((clock) => ({ c: gridAt(c, o.out, clock), r }))];
const within = (circles: Circle[], p: V, grow = 0): boolean => circles.some((circ) => vdist(circ.c, p) < circ.r + grow);
/** Whether a point lies on the white line round one of the rows, each row lying over the next. */
const lined = (rows: Circle[][], p: V): boolean => {
  for (const one of rows) if (within(one, p, LINE)) return !within(one, p);

  return false;
};
const both = (circles: Circle[]): Piece[] => circles.flatMap((circ) => [...disc(circ.c, circ.r), ...disc(circ.c, circ.r + LINE)]);
const band = (c: V, r: number, w: number): Piece[] => [...disc(c, r - w / 2), ...disc(c, r + w / 2)];

/**
 * The crane in a circle, 鶴の丸: a crane seen from the front with its wings raised until their tips meet over its head, so that
 * the long feathers make the crest's own circle and leave a round window. In the window the head looks to the left, with a
 * ringed eye, a long beak and a white line down the neck. Each wing is thirteen white lines between its long feathers, all of
 * one compass width, and two rows of small round feathers about the body; the body is a breast and rows of scales down the
 * belly. The right wing is built in full, then the head and the body, and the left wing where it stands.
 */
export const tsuruBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const small = WING_ROWS.map((o) => row(BODY.c, o, o.r));
  const scales = [[BREAST], ...BELLY_ROWS.map((o) => row(BREAST.c, o, SCALE))];
  const wing = (p: V): boolean => {
    if (p[0] < LINE / 2 || vdist([0, 0], p) > RIM || within([WINDOW], p) || within([BODY, BELLY], p, LINE)) return false;
    if (small.some((one) => within(one, p, LINE))) return !lined(small, p);

    return !FEATHERS.some((at) => Math.abs(vdist(at, p) - LONG) < LINE / 2);
  };
  const bird = (p: V): boolean => {
    const body = within([BODY, BELLY], p);
    const head = within([HEAD], p);
    const neck = vdist(NECK.c, p) > NECK.r[0] && vdist(NECK.c, p) < NECK.r[1] && within([NECK.span], p);
    const beak = p[0] < -10 && within([WINDOW], p) && vdist(BEAK_TOP, p) < LONG && vdist(BEAK_FOOT, p) > LONG;
    if (!body && !head && !neck && !beak) return false;
    if (within([EYE], p)) return vdist(EYE.c, p) < PUPIL;
    if (!head && beak && Math.abs(vdist(MOUTH, p) - LONG) < MOUTH_LINE / 2) return false;

    return head || neck || !body || !lined(scales, p);
  };
  const wingOutlines: Piece[] = [
    ...disc([0, 0], RIM),
    ...disc(WINDOW.c, WINDOW.r),
    seg([LINE / 2, -200], [LINE / 2, 200]),
    ...[BODY, BELLY].flatMap((circ) => disc(circ.c, circ.r + LINE)),
    ...small.flatMap(both),
    ...FEATHERS.flatMap((at) => band(at, LONG, LINE)),
  ];
  const birdOutlines: Piece[] = [
    ...[BODY, BELLY, HEAD, EYE, NECK.span, WINDOW].flatMap((circ) => disc(circ.c, circ.r)),
    ...NECK.r.flatMap((r) => disc(NECK.c, r)),
    ...disc(EYE.c, PUPIL),
    ...disc(BEAK_TOP, LONG),
    ...disc(BEAK_FOOT, LONG),
    ...band(MOUTH, LONG, MOUTH_LINE),
    ...scales.flatMap(both),
  ];
  const right = longLast(carveWhere(wingOutlines, wing));

  c.guideCircle(C0, reach);
  c.fill(part, toPath(right, placing));
  c.fill(part, toPath(longLast(carveWhere(birdOutlines, bird)), placing));
  c.fill(part, toPath(right.map((loop) => loop.map(mirrored)), placing));
};
