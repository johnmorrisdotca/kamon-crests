// The treasure knot, 宝結び, in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 96.
//
// One cord, 8 wide, goes round a knot that stands twice as wide as it is high. Its straight runs lie on lines that rise or fall
// three in four (a 3-4-5 triangle, 36.87 degrees), 30 apart across: the three that rise are at -0.6x + 0.8y = 30, 0 and -30, and
// the three that fall at 0.6x + 0.8y = -30, 0 and 30. Six round turns, each a circle of 15 about its middle with the cord 4 each side
// of it (circles of 11 and 19), join the runs end to end: a loop at each side, centred 75 out on the level line, whose two legs
// cross at 50, and four hairpins, centred 25 across and 37.5 up or down, whose two legs run side by side. The cord is
// followed round: the loop on the left, the run that rises through 30 to the hairpin at the upper right, back down through 0 to
// the hairpin at the lower left, up through -30 to the loop on the right, then the three that fall, from the right loop to the
// hairpin at the upper left, down through 0 to the hairpin at the lower right and back up through -30 to the left loop.
// At each of the nine places two runs cross, one passes over the other, and over and under alternate along the cord.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carveWhere, disc, seg, toPath, vdist } from "../../construct/compass.ts";
import type { Piece, Placing, V } from "../../construct/compass.ts";

/** Half the cord's width, the white gap beside a run that lies over another, and the circle each turn is struck on. */
const HALF = 4;
const GAP = 2;
const TURN = 15;

/** The two directions the runs lie in: the normal to the rising runs and to the falling ones, and the way each runs, each of length one. */
const RISE = { n: [-0.6, 0.8] as V, u: [0.8, 0.6] as V };
const FALL = { n: [0.6, 0.8] as V, u: [0.8, -0.6] as V };

/** A turn: its middle, and the span of angles (in degrees, counter-clockwise from the right) its cord covers. */
interface Turn {
  c: V;
  from: number;
  to: number;
}
/** A run: its direction, how far across it lies (the line n . p = d), and where it starts and ends (the tangent points of the turns at its ends). */
interface Run {
  dir: typeof RISE;
  d: number;
  from: V;
  to: V;
}

const LEFT: Turn = { c: [-75, 0], from: 53.13, to: 306.87 };
const RIGHT: Turn = { c: [75, 0], from: -126.87, to: 126.87 };
const UPPER_RIGHT: Turn = { c: [25, 37.5], from: -53.13, to: 126.87 };
const UPPER_LEFT: Turn = { c: [-25, 37.5], from: 53.13, to: 233.13 };
const LOWER_LEFT: Turn = { c: [-25, -37.5], from: 126.87, to: 306.87 };
const LOWER_RIGHT: Turn = { c: [25, -37.5], from: 233.13, to: 413.13 };
const TURNS: Turn[] = [LEFT, UPPER_RIGHT, LOWER_LEFT, RIGHT, UPPER_LEFT, LOWER_RIGHT];

/** The runs in the order the cord takes them. */
const RUNS: Run[] = [
  { dir: RISE, d: 30, from: [-66, -12], to: [16, 49.5] },
  { dir: RISE, d: 0, from: [34, 25.5], to: [-34, -25.5] },
  { dir: RISE, d: -30, from: [-16, -49.5], to: [66, 12] },
  { dir: FALL, d: 30, from: [66, -12], to: [-16, 49.5] },
  { dir: FALL, d: 0, from: [-34, 25.5], to: [34, -25.5] },
  { dir: FALL, d: -30, from: [16, -49.5], to: [-66, 12] },
];

/** Which run passes over which, at the nine places they cross: the run, then the one it lies over. */
const OVER: [number, number][] = [
  [0, 5],
  [4, 0],
  [0, 3],
  [3, 1],
  [1, 4],
  [5, 1],
  [2, 5],
  [4, 2],
  [2, 3],
];

const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1];
const across = (run: Run, p: V): number => dot(run.dir.n, p) - run.d;
const along = (run: Run, p: V): number => dot(run.dir.u, p);
const onRun = (run: Run, p: V, wide: number): boolean => {
  const a = along(run, run.from);
  const b = along(run, run.to);

  return Math.abs(across(run, p)) < wide && along(run, p) > Math.min(a, b) && along(run, p) < Math.max(a, b);
};
const onTurn = (turn: Turn, p: V): boolean => {
  const r = vdist(turn.c, p);
  if (r < TURN - HALF || r > TURN + HALF) return false;
  let a = (Math.atan2(p[1] - turn.c[1], p[0] - turn.c[0]) * 180) / Math.PI;
  while (a < turn.from) a += 360;

  return a <= turn.to;
};
/** The line n . p = d, as a piece long enough to cross the whole crest. */
const line = (dir: typeof RISE, d: number): Piece => {
  const at: V = [dir.n[0] * d, dir.n[1] * d];

  return seg([at[0] - dir.u[0] * 300, at[1] - dir.u[1] * 300], [at[0] + dir.u[0] * 300, at[1] + dir.u[1] * 300]);
};

/**
 * The treasure knot: one cord with six round turns and six straight runs, nine places where two runs cross. The ink is the cord,
 * cut where a run lies under another: the run beneath stops a white gap short of the one over it, along lines struck beside it.
 */
export const takaraBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 96 };
  // A run is ink where it stands, except within a gap of a run that lies over it.
  const inked = (p: V): boolean => {
    if (TURNS.some((turn) => onTurn(turn, p))) return true;

    return RUNS.some((run, i) => onRun(run, p, HALF) && !OVER.some(([over, under]) => under === i && onRun(RUNS[over], p, HALF + GAP)));
  };
  const outlines: Piece[] = [];
  for (const turn of TURNS) for (const r of [TURN - HALF, TURN + HALF]) outlines.push(...disc(turn.c, r));
  for (const run of RUNS) for (const w of [HALF, -HALF]) outlines.push(line(run.dir, run.d + w));
  for (const run of RUNS) for (const w of [HALF + GAP, -HALF - GAP]) outlines.push(line(run.dir, run.d + w));
  c.guideCircle(C0, reach);
  c.fill(part, toPath(carveWhere(outlines, inked), placing), "evenodd");
};
