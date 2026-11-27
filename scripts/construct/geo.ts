// The geometry every crest is built from: points, paths with exact transforms, and the few constructions a
// compass and a ruler give (circles, arcs, polygons, lenses, smooth curves through points). A dev-only tool: the
// package itself carries only the strings this makes.
//
// The page is 200 by 200 with the crest's centre at (100, 100). Angles are clock angles: 0 is straight up and 90 is
// to the right, so "rotate by 120" turns a motif a third of the way clockwise, as a kamon is turned.

export type Pt = [number, number];

export const CX = 100;
export const CY = 100;
export const C0: Pt = [CX, CY];
/** The radius of the circle every crest is laid out in: a ring's outer edge, and the reach of an unringed crest. */
export const R = 96;

const RAD = Math.PI / 180;

/** A point at clock angle `deg` and distance `r` from `c`. */
export const polar = (r: number, deg: number, c: Pt = C0): Pt => [c[0] + r * Math.sin(deg * RAD), c[1] - r * Math.cos(deg * RAD)];
export const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
export const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
export const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export const dist = (a: Pt, b: Pt): number => Math.hypot(b[0] - a[0], b[1] - a[1]);
/** The clock angle of the direction from `a` to `b`. */
export const bearing = (a: Pt, b: Pt): number => Math.atan2(b[0] - a[0], -(b[1] - a[1])) / RAD;
/** `p` turned by `deg` clockwise about `c`. */
export const turn = (p: Pt, deg: number, c: Pt = C0): Pt => {
  const s = Math.sin(deg * RAD);
  const k = Math.cos(deg * RAD);
  const x = p[0] - c[0];
  const y = p[1] - c[1];

  return [c[0] + x * k - y * s, c[1] + x * s + y * k];
};
/** `p` reflected across the vertical line x = `x`. */
export const flipX = (p: Pt, x = CX): Pt => [2 * x - p[0], p[1]];

type Cmd =
  | { k: "M"; p: Pt }
  | { k: "L"; p: Pt }
  | { k: "C"; a: Pt; b: Pt; p: Pt }
  | { k: "A"; r: number; large: 0 | 1; sweep: 0 | 1; p: Pt }
  | { k: "Z" };

const fmt = (n: number, decimals = 2): string => {
  const unit = 10 ** decimals;
  const text = (Math.round(n * unit) / unit).toFixed(decimals).replace(/\.?0+$/, "");

  return text === "-0" || text === "" ? "0" : text;
};

/** A path of lines, cubic curves and circular arcs, kept as numbers so that it can be turned, mirrored and repeated exactly. */
export class Path {
  cmds: Cmd[] = [];
  private cur: Pt = [0, 0];
  private start: Pt = [0, 0];

  M(p: Pt): this {
    this.cmds.push({ k: "M", p });
    this.cur = p;
    this.start = p;

    return this;
  }

  L(p: Pt): this {
    this.cmds.push({ k: "L", p });
    this.cur = p;

    return this;
  }

  C(a: Pt, b: Pt, p: Pt): this {
    this.cmds.push({ k: "C", a, b, p });
    this.cur = p;

    return this;
  }

  /** A quadratic curve, written as the cubic that is the same curve. */
  Q(a: Pt, p: Pt): this {
    const from = this.cur;

    return this.C(lerp(from, a, 2 / 3), lerp(p, a, 2 / 3), p);
  }

  /** A circular arc of radius `r` to `p`; `sweep` 1 goes clockwise on the page. */
  A(r: number, large: 0 | 1, sweep: 0 | 1, p: Pt): this {
    this.cmds.push({ k: "A", r, large, sweep, p });
    this.cur = p;

    return this;
  }

  Z(): this {
    this.cmds.push({ k: "Z" });
    this.cur = this.start;

    return this;
  }

  get at(): Pt {
    return this.cur;
  }

  /** Every point and arc run through `f` (a similarity: turning, mirroring, moving or scaling alike in x and y). */
  private mapped(f: (p: Pt) => Pt, scale: number, mirror: boolean): Path {
    const out = new Path();
    for (const c of this.cmds) {
      if (c.k === "M") out.M(f(c.p));
      else if (c.k === "L") out.L(f(c.p));
      else if (c.k === "C") out.C(f(c.a), f(c.b), f(c.p));
      else if (c.k === "A") out.A(c.r * scale, c.large, mirror ? ((1 - c.sweep) as 0 | 1) : c.sweep, f(c.p));
      else out.Z();
    }

    return out;
  }

  rotate(deg: number, c: Pt = C0): Path {
    return this.mapped((p) => turn(p, deg, c), 1, false);
  }

  move(dx: number, dy: number): Path {
    return this.mapped((p) => [p[0] + dx, p[1] + dy], 1, false);
  }

  scale(k: number, c: Pt = C0): Path {
    return this.mapped((p) => [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k], Math.abs(k), k < 0);
  }

  /** Reflected across the vertical line x = `x`. */
  mirror(x = CX): Path {
    return this.mapped((p) => flipX(p, x), 1, true);
  }

  /** Reflected across the horizontal line y = `y`. */
  mirrorY(y = CY): Path {
    return this.mapped((p) => [p[0], 2 * y - p[1]], 1, true);
  }

  /** Reflected across the line through `c` at clock angle `deg`. */
  reflect(deg: number, c: Pt = C0): Path {
    return this.rotate(-deg, c).mirror(c[0]).rotate(deg, c);
  }

  /** This path's subpaths and `other`'s, as one path (for even-odd holes and for one stroke through several parts). */
  join(...others: Path[]): Path {
    const out = new Path();
    out.cmds = [...this.cmds, ...others.flatMap((o) => o.cmds)];

    return out;
  }

  /** The same path run backwards: the first subpath's way round reversed. Needed to cut a hole with the non-zero rule. */
  get points(): Pt[] {
    return this.cmds.flatMap((c) => (c.k === "Z" ? [] : [c.p]));
  }

  /** The path as compact relative SVG path data, from the points rounded first so that rounding never drifts. */
  d(decimals = 2): string {
    const unit = 10 ** decimals;
    const q = (p: Pt): Pt => [Math.round(p[0] * unit) / unit, Math.round(p[1] * unit) / unit];
    let out = "";
    let last = "";
    let cur: Pt = [0, 0];
    let start: Pt = [0, 0];
    let move: Pt | undefined;
    const emit = (letter: string, nums: number[]): void => {
      const body = nums.map((n) => fmt(n, decimals)).reduce((text, n) => (text === "" ? n : /^-/.test(n) ? `${text}${n}` : `${text} ${n}`), "");
      if (letter === last && letter !== "m" && letter !== "z") out += /^-/.test(body) ? body : ` ${body}`;
      else out += `${letter}${body}`;
      last = letter;
    };
    for (const c of this.cmds) {
      if (c.k === "Z") {
        if (move === undefined) {
          out += "z";
          last = "z";
        }
        cur = start;
        continue;
      }
      const p = q(c.p);
      const dx = p[0] - cur[0];
      const dy = p[1] - cur[1];
      if (c.k === "M") {
        // Keep the offset of an empty subpath for the next visible move.
        move = move === undefined ? [dx, dy] : [move[0] + dx, move[1] + dy];
        start = cur = p;
        continue;
      }
      const samePoint = dx === 0 && dy === 0;
      const emptyCurve = c.k !== "C" || [c.a, c.b].map(q).every(([x, y]) => x === cur[0] && y === cur[1]);
      // A nearly level line may encode no motion, but the next segment still
      // uses the rounded point for its relative coordinates.
      const emptyRuler = c.k === "L" && dx === 0 && Math.abs(dy) < 0.005;
      if ((samePoint && emptyCurve) || emptyRuler) {
        cur = p;
        continue;
      }
      // Delay the move so an entire collapsed loop leaves no empty subpath.
      if (move !== undefined) {
        emit(out === "" ? "M" : "m", move);
        move = undefined;
      }
      if (c.k === "L") {
        if (Math.abs(dy) < 0.005) emit("h", [dx]);
        else if (Math.abs(dx) < 0.005) emit("v", [dy]);
        else emit("l", [dx, dy]);
      } else if (c.k === "C") {
        const a = q(c.a);
        const b = q(c.b);
        emit("c", [a[0] - cur[0], a[1] - cur[1], b[0] - cur[0], b[1] - cur[1], dx, dy]);
      } else emit("a", [c.r, c.r, 0, c.large, c.sweep, dx, dy]);
      cur = p;
    }

    return out;
  }
}

/**
 * A path from absolute path data of moves, lines, cubic curves and closes only (`M x y`, `L x y`, `C x y x y x y`, `Z`), as the
 * vectorised crests are stored: a shape traced from a period crest book and cleaned, written once on the 200 page.
 */
export const parsePath = (data: string): Path => {
  const path = new Path();
  const tokens = data.match(/[MLCZ]|-?\d+(?:\.\d+)?/g) ?? [];
  let i = 0;
  const pt = (): Pt => {
    const p: Pt = [Number(tokens[i]), Number(tokens[i + 1])];
    i += 2;

    return p;
  };
  while (i < tokens.length) {
    const command = tokens[i];
    i += 1;
    if (command === "M") path.M(pt());
    else if (command === "L") path.L(pt());
    else if (command === "C") path.C(pt(), pt(), pt());
    else if (command === "Z") path.Z();
    else throw new Error(`parsePath: unexpected ${command}`);
  }

  return path;
};

/** A path through the points with straight lines. */
export const poly = (points: Pt[], close = true): Path => {
  const path = new Path();
  points.forEach((p, i) => (i === 0 ? path.M(p) : path.L(p)));
  if (close) path.Z();

  return path;
};

/** A full circle, as two arcs. */
export const circle = (c: Pt, r: number): Path => new Path().M([c[0] + r, c[1]]).A(r, 1, 1, [c[0] - r, c[1]]).A(r, 1, 1, [c[0] + r, c[1]]).Z();

/** An open arc of the circle (`c`, `r`) from clock angle `a0` to `a1`, going clockwise when `a1 > a0`. */
export const arc = (c: Pt, r: number, a0: number, a1: number): Path => {
  const span = a1 - a0;
  const path = new Path().M(polar(r, a0, c));
  const pieces = Math.max(1, Math.ceil(Math.abs(span) / 180));
  for (let i = 1; i <= pieces; i += 1) path.A(r, 0, span > 0 ? 1 : 0, polar(r, a0 + (span * i) / pieces, c));

  return path;
};

const KAPPA = 0.5522847498;

/** An ellipse centred at `c`, `rx` across and `ry` up, turned by `deg`. */
export const ellipse = (c: Pt, rx: number, ry: number, deg = 0): Path => {
  const p = new Path()
    .M([c[0] + rx, c[1]])
    .C([c[0] + rx, c[1] + ry * KAPPA], [c[0] + rx * KAPPA, c[1] + ry], [c[0], c[1] + ry])
    .C([c[0] - rx * KAPPA, c[1] + ry], [c[0] - rx, c[1] + ry * KAPPA], [c[0] - rx, c[1]])
    .C([c[0] - rx, c[1] - ry * KAPPA], [c[0] - rx * KAPPA, c[1] - ry], [c[0], c[1] - ry])
    .C([c[0] + rx * KAPPA, c[1] - ry], [c[0] + rx, c[1] - ry * KAPPA], [c[0] + rx, c[1]])
    .Z();

  return deg === 0 ? p : p.rotate(deg, c);
};

/** A regular polygon of `n` corners on the circle (`c`, `r`), the first at clock angle `a0`. */
export const ngon = (n: number, r: number, a0 = 0, c: Pt = C0): Path => poly(Array.from({ length: n }, (_, i) => polar(r, a0 + (360 * i) / n, c)));

export const ngonPoints = (n: number, r: number, a0 = 0, c: Pt = C0): Pt[] => Array.from({ length: n }, (_, i) => polar(r, a0 + (360 * i) / n, c));

/** A shape of two circular arcs between `p` and `q`, `bulge` (a fraction of the chord) out at its widest on each side: a petal or a slit. */
export const lens = (p: Pt, q: Pt, bulge: number): Path => {
  const chord = dist(p, q);
  const sagitta = chord * bulge;
  const radius = (chord * chord) / 8 / sagitta + sagitta / 2;

  return new Path().M(p).A(radius, 0, 1, q).A(radius, 0, 1, p).Z();
};

/** A smooth closed or open curve through the points: Catmull-Rom splines written as cubic curves. */
export const smooth = (points: Pt[], closed = true, tension = 1): Path => {
  const n = points.length;
  const at = (i: number): Pt => (closed ? points[((i % n) + n) % n] : points[Math.min(n - 1, Math.max(0, i))]);
  const path = new Path().M(points[0]);
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    path.C(add(p1, mul(sub(p2, p0), tension / 6)), sub(p2, mul(sub(p3, p1), tension / 6)), p2);
  }
  if (closed) path.Z();

  return path;
};

/** Continues `path` (which stands at the first point) with a smooth open curve through `points`. */
export const curveThrough = (path: Path, points: Pt[], tension = 1): Path => {
  const n = points.length;
  const at = (i: number): Pt => points[Math.min(n - 1, Math.max(0, i))];
  for (let i = 0; i < n - 1; i += 1) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    path.C(add(p1, mul(sub(p2, p0), tension / 6)), sub(p2, mul(sub(p3, p1), tension / 6)), p2);
  }

  return path;
};

/**
 * Points along a polar outline: `radius(t)` for t from 0 to 1 across the angles `a0` to `a1` about `c`, `steps` apart.
 * The outline of a scalloped leaf is one of these, smoothed.
 */
export const outline = (radius: (t: number) => number, a0: number, a1: number, steps: number, c: Pt = C0): Pt[] =>
  Array.from({ length: steps + 1 }, (_, i) => polar(radius(i / steps), a0 + ((a1 - a0) * i) / steps, c));

/** Round a number as the output does, for tests and notes. */
export const round2 = (n: number): number => Math.round(n * 100) / 100;
