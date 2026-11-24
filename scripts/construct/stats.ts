// A crest's counts, taken from its construction and from nothing else: the circles struck, the lines ruled, the arcs inked, the
// steps, the compass widths, the fills, and the symmetry of the finished outline. `pnpm data` writes them into each record.
import type { CrestStats } from "../../src/manifest.types.ts";
import type { Construction } from "../../src/render.ts";

type XY = [number, number];

/** An edge of some path data: a ruled line, an arc of the circle (`c`, `r`) from angle `a0` through `da`, or a curve by its two handles. */
export interface Edge {
  /** Which closed outline of the path it belongs to. */
  sub: number;
  a: XY;
  b: XY;
  c?: XY;
  r?: number;
  a0?: number;
  da?: number;
  via?: [XY, XY];
}

const TAU = Math.PI * 2;

/** The edges of some path data, as the package writes it: moves, lines, circular arcs and curves, absolute or relative. */
export const edgesOf = (d: string): Edge[] => {
  const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const out: Edge[] = [];
  let i = 0;
  let at: XY = [0, 0];
  let start: XY = [0, 0];
  let sub = -1;
  let command = "";
  const take = (): number => Number(tokens[i++]);
  const line = (to: XY): void => {
    if (Math.hypot(to[0] - at[0], to[1] - at[1]) > 0.02) out.push({ sub, a: at, b: to });
    at = to;
  };
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) {
      command = tokens[i];
      i += 1;
      if (command.toLowerCase() === "z") {
        line(start);
        continue;
      }
    }
    const rel = command === command.toLowerCase();
    const [ox, oy] = rel ? at : [0, 0];
    const k = command.toLowerCase();
    if (k === "m") {
      at = [ox + take(), oy + take()];
      start = at;
      sub += 1;
      command = rel ? "l" : "L";
    } else if (k === "l") line([ox + take(), oy + take()]);
    else if (k === "h") line([ox + take(), at[1]]);
    else if (k === "v") line([at[0], oy + take()]);
    else if (k === "c") {
      const via: [XY, XY] = [[ox + take(), oy + take()], [ox + take(), oy + take()]];
      const to: XY = [ox + take(), oy + take()];
      out.push({ sub, a: at, b: to, via });
      at = to;
    } else if (k === "a") {
      let r = take();
      take();
      take();
      const large = take();
      const sweep = take();
      const to: XY = [ox + take(), oy + take()];
      const chord = Math.hypot(to[0] - at[0], to[1] - at[1]);
      if (chord < 0.02) continue;
      r = Math.max(r, chord / 2);
      const u: XY = [(at[1] - to[1]) / chord, (to[0] - at[0]) / chord];
      const h = Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (large === sweep ? -1 : 1);
      const c: XY = [(at[0] + to[0]) / 2 + h * u[0], (at[1] + to[1]) / 2 + h * u[1]];
      const a0 = Math.atan2(at[1] - c[1], at[0] - c[0]);
      const span = (((Math.atan2(to[1] - c[1], to[0] - c[0]) - a0) * (sweep === 1 ? 1 : -1)) % TAU + TAU) % TAU;
      out.push({ sub, a: at, b: to, c, r, a0, da: sweep === 1 ? span : -span });
      at = to;
    } else throw new Error(`edgesOf: ${command} is not a move, a line, an arc or a curve`);
  }

  return out;
};

const pointAt = (e: Edge, t: number): XY => {
  if (e.c !== undefined) return [e.c[0] + e.r! * Math.cos(e.a0! + e.da! * t), e.c[1] + e.r! * Math.sin(e.a0! + e.da! * t)];
  if (e.via === undefined) return [e.a[0] + (e.b[0] - e.a[0]) * t, e.a[1] + (e.b[1] - e.a[1]) * t];
  const s = 1 - t;
  const w = [s * s * s, 3 * s * s * t, 3 * s * t * t, t * t * t];

  return [0, 1].map((x) => w[0] * e.a[x] + w[1] * e.via![0][x] + w[2] * e.via![1][x] + w[3] * e.b[x]) as XY;
};

const offLine = (a: XY, b: XY, p: XY): number => {
  const t = Math.min(1, Math.max(0, ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)));

  return Math.hypot(p[0] - a[0] - (b[0] - a[0]) * t, p[1] - a[1] - (b[1] - a[1]) * t);
};

/** How far a point may stand off the outline and still be on it: shapes are written to a tenth or a hundredth of a unit. */
const ON = 0.2;

const onEdge = (e: Edge, p: XY): boolean => {
  if (e.c !== undefined) {
    if (Math.abs(Math.hypot(p[0] - e.c[0], p[1] - e.c[1]) - e.r!) > ON) return false;
    const slack = ON / e.r!;
    const t = ((((Math.atan2(p[1] - e.c[1], p[0] - e.c[0]) - e.a0!) * Math.sign(e.da!)) % TAU) + TAU) % TAU;

    return t <= Math.abs(e.da!) + slack || t >= TAU - slack;
  }
  if (e.via === undefined) return offLine(e.a, e.b, p) <= ON;
  for (let k = 0; k < 12; k += 1) if (offLine(pointAt(e, k / 12), pointAt(e, (k + 1) / 12), p) <= ON) return true;

  return false;
};

/** The numbers of places a crest may be turned to: the same list a unit is turned through when it is drawn. */
const FOLDS = [32, 24, 20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2];

const symmetryOf = (edges: Edge[]): CrestStats["symmetry"] => {
  const points = edges.flatMap((e) => [0.25, 0.5, 0.75].map((t) => pointAt(e, t)));
  const same = (deg: number, flip: boolean): boolean => {
    const a = (deg * Math.PI) / 180;

    return points.every((p) => {
      const x = flip ? 100 - p[0] : p[0] - 100;
      const y = p[1] - 100;
      const q: XY = [100 + x * Math.cos(a) - y * Math.sin(a), 100 + x * Math.sin(a) + y * Math.cos(a)];

      return edges.some((e) => onEdge(e, q));
    });
  };
  const folds = FOLDS.filter((n) => same(360 / n, false));
  const angles = [...new Set(FOLDS.flatMap((n) => Array.from({ length: n }, (_, i) => Math.round((360 * i * 1e4) / n) / 1e4)))];

  return { turns: folds.includes(32) && folds.includes(9) && folds.includes(7) ? 0 : (folds[0] ?? 1), mirror: angles.some((deg) => same(deg, true)) };
};

/**
 * A crest's complexity, from its counts.
 *
 * - `score`: three for each arc inked, two for each circle struck, one for each line ruled, and five for each time the compass is
 *   set to a new width after the first. An arc is the most careful work, and resetting the compass is the slowest move.
 * - `meter`: the score on a fixed scale of 0 to 100, 25 for each tenfold: a score of 10 is 25, of 100 is 50, of 1000 is 75. It is
 *   not relative to the other crests, so a crest keeps its meter as crests are added.
 * - `grade`: 1 to 5, in bands of the score at round numbers: under 25, 25 to 99, 100 to 299, 300 to 999, and 1000 or more. Like
 *   the meter it is fixed, so a crest's grade never moves.
 */
export const complexityOf = (counts: Pick<CrestStats, "circles" | "lines" | "arcs" | "widths">): Pick<CrestStats, "score" | "meter" | "grade"> => {
  const score = 3 * counts.arcs + 2 * counts.circles + counts.lines + 5 * Math.max(0, counts.widths - 1);
  const meter = Math.min(100, Math.max(0, Math.round(25 * Math.log10(Math.max(1, score)))));

  return { score, meter, grade: ([25, 100, 300, 1000].filter((from) => score >= from).length + 1) as CrestStats["grade"] };
};

/** How near two circles or two lines are to be one: guides are written to a hundredth of a unit. */
const SAME = 0.05;

/**
 * A crest's counts: what the animation does, like a character's stroke count, over every place a turn or a mirror builds.
 *
 * - `circles`: the compass circles struck, each in full: the unit's, and the unit's again at each other place it is turned to.
 *   A circle that lands on one already struck (one about the crest's centre does, at every place) is counted once.
 * - `lines`: the straight lines ruled, counted the same way (a guide of several edges, such as a square, counts each edge).
 * - `arcs`: the arcs inked, at every place. Arcs that follow one another along one struck circle are one arc, so a whole circle
 *   is one; a curve of a crest still traced from a book counts as one.
 * - `steps`: the steps of its construction.
 * - `widths`: the distinct compass widths, the radii of its circles as they are written: a width used at five places is one width.
 * - `fills`: its solid shapes.
 * - `symmetry`: how many places the finished outline can be turned to and look the same (1: none; 0: any, a circle), and whether it
 *   has a mirror line.
 * - `score`, `meter`, `grade`: its complexity (`complexityOf`).
 */
export const statsOf = (construction: Construction): CrestStats => {
  const radii = new Set<string>();
  // What the animation strikes and rules: every guide, and at each other place a turn or a mirror builds, the unit's own guides
  // again, flipped over and turned with it. One that lands on a circle or a line already there is the same one, and counts once.
  const struck: { c: XY; r: number }[] = [];
  const ruled: [XY, XY][] = [];
  const near = (p: XY, q: XY): boolean => Math.hypot(p[0] - q[0], p[1] - q[1]) < SAME;
  const strike = (guide: Construction["guides"][number], place?: { turn?: number; flip?: boolean }): void => {
    const a = ((place?.turn ?? 0) * Math.PI) / 180;
    const there = (p: XY): XY => {
      const x = (place?.flip === true ? 200 - p[0] : p[0]) - 100;
      const y = p[1] - 100;

      return [100 + x * Math.cos(a) - y * Math.sin(a), 100 + x * Math.sin(a) + y * Math.cos(a)];
    };
    const edges = edgesOf(guide.d);
    if (guide.type === "circle") {
      // A circle is written as two half turns, from its top to its foot and back: its centre is half way between them.
      const [c, r] = [there([(edges[0].a[0] + edges[0].b[0]) / 2, (edges[0].a[1] + edges[0].b[1]) / 2]), edges[0].r!];
      if (!struck.some((one) => near(one.c, c) && Math.abs(one.r - r) < SAME)) struck.push({ c, r });

      return;
    }
    for (const edge of edges) {
      const [from, to] = [there(edge.a), there(edge.b)];
      if (!ruled.some(([p, q]) => (near(p, from) && near(q, to)) || (near(p, to) && near(q, from)))) ruled.push([from, to]);
    }
  };
  for (const guide of construction.guides) {
    if (guide.type === "circle") radii.add(/a([\d.]+) /.exec(guide.d)?.[1] ?? "");
    strike(guide);
  }
  const stepped = new Set(construction.steps.flatMap((step) => (step.op === "guide" ? [step.guide] : [])));
  for (const step of construction.steps) {
    if (step.op !== "turn") continue;
    const places = new Map(step.shapes.map((i) => construction.shapes[i]).map((shape) => [`${shape.part} ${shape.turn} ${shape.flip === true}`, shape]));
    for (const shape of places.values()) construction.guides.forEach((guide, i) => stepped.has(i) && guide.unit === 0 && guide.part === shape.part && strike(guide, shape));
  }
  const lines = ruled.length;
  const inked = construction.shapes.flatMap((shape, at) => edgesOf(shape.d).map((e) => ({ ...e, sub: e.sub + 1e3 * at })));
  const curved = inked.filter((e) => e.c !== undefined || e.via !== undefined);
  // The struck circle an inked arc is taken from: the one its ends and its middle stand on, the nearest where two would do; -1 where none does.
  const taken = new Map(inked.map((e) => {
    let [best, least] = [-1, SAME];
    struck.forEach((one, i) => {
      if (e.c === undefined || Math.abs(one.r - e.r!) > 0.15) return;
      const off = Math.max(...[e.a, pointAt(e, 0.5), e.b].map((p) => Math.abs(Math.hypot(p[0] - one.c[0], p[1] - one.c[1]) - one.r)));
      if (off < least) [best, least] = [i, off];
    });

    return [e, best];
  }));
  // Two arcs that follow one another are one arc when they are taken from one struck circle; where no circle was struck (a crest still traced), when they have one centre and radius.
  const onCircle = (e: Edge, f: Edge): boolean =>
    e.c !== undefined && f.c !== undefined && e.sub === f.sub && (taken.get(e)! >= 0 || taken.get(f)! >= 0 ? taken.get(e) === taken.get(f) : Math.abs(e.r! - f.r!) < 0.02 && Math.hypot(e.c[0] - f.c[0], e.c[1] - f.c[1]) < 0.02);
  let arcs = 0;
  for (const sub of new Set(curved.map((e) => e.sub))) {
    const run = inked.filter((e) => e.sub === sub);
    const starts = run.filter((e, i) => (e.c !== undefined || e.via !== undefined) && !onCircle(e, run[(i + run.length - 1) % run.length])).length;
    arcs += Math.max(1, starts);
  }

  const circles = struck.length;

  return {
    ...complexityOf({ circles, lines, arcs, widths: radii.size }),
    circles,
    lines,
    arcs,
    steps: construction.steps.length,
    widths: radii.size,
    fills: construction.shapes.filter((shape) => shape.kind === "fill").length,
    symmetry: symmetryOf(inked),
  };
};
