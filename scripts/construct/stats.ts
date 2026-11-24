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
 * A crest's counts.
 *
 * - `circles`: the compass circles its steps strike, each in full.
 * - `lines`: the straight lines its steps rule (a guide of several edges, such as a square, counts each edge).
 * - `arcs`: the curved edges of its finished shapes, the arcs inked. Arcs that follow one another on one circle are one arc, so a
 *   whole circle is one; a curve of a crest still traced from a book counts as one.
 * - `steps`: the steps of its construction.
 * - `widths`: the distinct compass widths, the radii of its circles as they are written.
 * - `fills`: its solid shapes.
 * - `symmetry`: how many places the finished outline can be turned to and look the same (1: none; 0: any, a circle), and whether it
 *   has a mirror line.
 * - `score`: its complexity, circles and lines and arcs together: every stroke of the compass and the ruler.
 */
export const statsOf = (construction: Construction): CrestStats => {
  const radii = new Set<string>();
  let lines = 0;
  for (const guide of construction.guides) {
    const edges = edgesOf(guide.d);
    if (guide.type === "circle") radii.add(/a([\d.]+) /.exec(guide.d)?.[1] ?? "");
    else lines += edges.length;
  }
  const inked = construction.shapes.flatMap((shape, at) => edgesOf(shape.d).map((e) => ({ ...e, sub: e.sub + 1e3 * at })));
  const curved = inked.filter((e) => e.c !== undefined || e.via !== undefined);
  const onCircle = (e: Edge, f: Edge): boolean => e.c !== undefined && f.c !== undefined && e.sub === f.sub && Math.abs(e.r! - f.r!) < 0.02 && Math.hypot(e.c[0] - f.c[0], e.c[1] - f.c[1]) < 0.02;
  let arcs = 0;
  for (const sub of new Set(curved.map((e) => e.sub))) {
    const run = inked.filter((e) => e.sub === sub);
    const starts = run.filter((e, i) => (e.c !== undefined || e.via !== undefined) && !onCircle(e, run[(i + run.length - 1) % run.length])).length;
    arcs += Math.max(1, starts);
  }

  const circles = construction.guides.filter((guide) => guide.type === "circle").length;

  return {
    score: circles + lines + arcs,
    circles,
    lines,
    arcs,
    steps: construction.steps.length,
    widths: radii.size,
    fills: construction.shapes.filter((shape) => shape.kind === "fill").length,
    symmetry: symmetryOf(inked),
  };
};
