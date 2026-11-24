// The compass and the ruler, exactly: a crest's outline as arcs of its construction circles and ruled lines, cut where they
// meet and joined into closed shapes. Nothing is flattened to short lines and no curve is fitted: every edge a shape is
// written with is an arc of a circle of the layout, or a straight line of it.
//
// A construction is written in its own frame: the crest's centre at (0, 0), x to the right and y UP, in whatever unit the
// layout counts in (a grid step). `toPath` puts a shape on the page. Angles here are the usual ones, in radians,
// counter-clockwise from the x axis.
import { CX, CY, Path } from "./geo.ts";
import type { Pt } from "./geo.ts";

export type V = [number, number];

/** A compass circle of the layout: its centre and its radius. */
export interface Circle {
  c: V;
  r: number;
}

/** A piece of an outline: a ruled line from `a` to `b`, or the arc of a circle from angle `a0` to `a1` (counter-clockwise when `a1 > a0`). */
export type Piece = { t: "L"; a: V; b: V } | { t: "A"; c: V; r: number; a0: number; a1: number };

/** A closed outline: its pieces end to end. */
export type Region = Piece[];

const TAU = Math.PI * 2;

export const DEG = Math.PI / 180;
export const vsub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1]];
export const vadd = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1]];
export const vmul = (a: V, k: number): V => [a[0] * k, a[1] * k];
export const vlen = (a: V): number => Math.hypot(a[0], a[1]);
export const vunit = (a: V): V => vmul(a, 1 / vlen(a));
export const vdist = (a: V, b: V): number => vlen(vsub(a, b));
/** The angle of `p` as seen from `c`. */
export const angleOf = (c: V, p: V): number => Math.atan2(p[1] - c[1], p[0] - c[0]);
/** The point of the circle (`c`, `r`) at angle `a`. */
export const onCircle = (c: V, r: number, a: number): V => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
/** The point where the circle `from` touches the circle `to`: on the line of their centres, on `from`. */
export const touch = (from: Circle, to: Circle): V => vadd(from.c, vmul(vunit(vsub(to.c, from.c)), from.r));

/** Where two circles cross: none, one (they touch) or two points. */
export const circleCircle = (c1: V, r1: number, c2: V, r2: number): V[] => {
  const d = vdist(c1, c2);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h2 = r1 * r1 - a * a;
  if (h2 < -1e-9) return [];
  const h = Math.sqrt(Math.max(0, h2));
  const e = vunit(vsub(c2, c1));
  const f = vadd(c1, vmul(e, a));
  const n: V = [-e[1], e[0]];
  if (h < 1e-7) return [f];

  return [vadd(f, vmul(n, h)), vadd(f, vmul(n, -h))];
};

/** Where the endless line through `p` and `q` crosses a circle. */
export const lineCircle = (p: V, q: V, c: V, r: number): V[] => {
  const d = vunit(vsub(q, p));
  const w = vsub(p, c);
  const b = w[0] * d[0] + w[1] * d[1];
  const disc = b * b - (w[0] * w[0] + w[1] * w[1] - r * r);
  if (disc < -1e-9) return [];
  const s = Math.sqrt(Math.max(0, disc));

  return [vadd(p, vmul(d, -b + s)), vadd(p, vmul(d, -b - s))];
};

/** Where two endless lines cross. */
export const lineLine = (p1: V, q1: V, p2: V, q2: V): V => {
  const d1 = vsub(q1, p1);
  const d2 = vsub(q2, p2);
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  const w = vsub(p2, p1);
  const t = (w[0] * d2[1] - w[1] * d2[0]) / den;

  return vadd(p1, vmul(d1, t));
};

/** Of several crossings, the one nearest a point named roughly. */
export const nearest = (points: V[], hint: V): V => {
  if (points.length === 0) throw new Error(`compass: nothing crosses near ${hint.join(", ")}`);

  return points.slice().sort((a, b) => vdist(a, hint) - vdist(b, hint))[0];
};

/**
 * A circle of a set compass width that touches two circles already struck. `sideA` and `sideB` say how it touches each: 1 from
 * outside, -1 from inside it (the new circle within the old). Of the two places it can stand, the one nearest `hint`.
 */
export const tangentCircle = (a: Circle, sideA: 1 | -1, b: Circle, sideB: 1 | -1, r: number, hint: V): Circle => ({
  c: nearest(circleCircle(a.c, sideA === 1 ? a.r + r : a.r - r, b.c, sideB === 1 ? b.r + r : b.r - r), hint),
  r,
});

export const seg = (a: V, b: V): Piece => ({ t: "L", a, b });
export const arcA = (c: V, r: number, a0: number, a1: number): Piece => ({ t: "A", c, r, a0, a1 });
/** The arc of a circle from one of its points to another, counter-clockwise or clockwise. */
export const arcTo = (circle: Circle, from: V, to: V, ccw: boolean): Piece => {
  const a0 = angleOf(circle.c, from);
  let a1 = angleOf(circle.c, to);
  if (ccw) while (a1 <= a0 + 1e-12) a1 += TAU;
  else while (a1 >= a0 - 1e-12) a1 -= TAU;

  return arcA(circle.c, circle.r, a0, a1);
};

export const pieceStart = (p: Piece): V => (p.t === "L" ? p.a : onCircle(p.c, p.r, p.a0));
export const pieceEnd = (p: Piece): V => (p.t === "L" ? p.b : onCircle(p.c, p.r, p.a1));
const pieceAt = (p: Piece, t: number): V => (p.t === "L" ? vadd(p.a, vmul(vsub(p.b, p.a), t)) : onCircle(p.c, p.r, p.a0 + (p.a1 - p.a0) * t));
const pieceNormal = (p: Piece, t: number): V => {
  if (p.t === "L") {
    const d = vunit(vsub(p.b, p.a));

    return [-d[1], d[0]];
  }
  const a = p.a0 + (p.a1 - p.a0) * t;
  const s = p.a1 > p.a0 ? -1 : 1;

  return [s * Math.cos(a), s * Math.sin(a)];
};
const pieceSub = (p: Piece, t0: number, t1: number): Piece =>
  p.t === "L" ? seg(pieceAt(p, t0), pieceAt(p, t1)) : arcA(p.c, p.r, p.a0 + (p.a1 - p.a0) * t0, p.a0 + (p.a1 - p.a0) * t1);
export const reversed = (p: Piece): Piece => (p.t === "L" ? seg(p.b, p.a) : arcA(p.c, p.r, p.a1, p.a0));
/** An outline run the other way. */
export const reversedRun = (run: Piece[]): Piece[] => run.map(reversed).reverse();

/** The piece mirrored in the y axis (x to -x). */
export const mirrored = (p: Piece): Piece => (p.t === "L" ? seg([-p.a[0], p.a[1]], [-p.b[0], p.b[1]]) : arcA([-p.c[0], p.c[1]], p.r, Math.PI - p.a0, Math.PI - p.a1));
const rotatePoint = (p: V, a: number): V => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)];
/** The piece turned counter-clockwise by `a` about the centre. */
export const rotated = (p: Piece, a: number): Piece => (p.t === "L" ? seg(rotatePoint(p.a, a), rotatePoint(p.b, a)) : arcA(rotatePoint(p.c, a), p.r, p.a0 + a, p.a1 + a));
/** The piece moved by `d`. */
export const moved = (p: Piece, d: V): Piece => (p.t === "L" ? seg(vadd(p.a, d), vadd(p.b, d)) : arcA(vadd(p.c, d), p.r, p.a0, p.a1));

// The place of a point on a piece (0 at its start, 1 at its end), or null when the point is off it.
const paramOn = (p: Piece, point: V): number | null => {
  const EPS = 1e-7;
  if (p.t === "L") {
    const d = vsub(p.b, p.a);
    const t = ((point[0] - p.a[0]) * d[0] + (point[1] - p.a[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);

    return t > -EPS && t < 1 + EPS ? Math.min(1, Math.max(0, t)) : null;
  }
  const span = p.a1 - p.a0;
  let da = angleOf(p.c, point) - p.a0;
  if (span > 0) {
    da = ((da % TAU) + TAU) % TAU;
    if (da > span + EPS && da > TAU - EPS) da -= TAU;
  } else {
    da = -(((-da % TAU) + TAU) % TAU);
    if (da < span - EPS && da < -TAU + EPS) da += TAU;
  }
  const t = da / span;

  return t > -EPS && t < 1 + EPS ? Math.min(1, Math.max(0, t)) : null;
};

const crossings = (p: Piece, q: Piece): V[] => {
  let points: V[] = [];
  if (p.t === "L" && q.t === "L") {
    const d1 = vsub(p.b, p.a);
    const d2 = vsub(q.b, q.a);
    if (Math.abs(d1[0] * d2[1] - d1[1] * d2[0]) > 1e-12) points = [lineLine(p.a, p.b, q.a, q.b)];
  } else if (p.t === "L" && q.t === "A") points = lineCircle(p.a, p.b, q.c, q.r);
  else if (p.t === "A" && q.t === "L") points = lineCircle(q.a, q.b, p.c, p.r);
  else if (p.t === "A" && q.t === "A") {
    if (vdist(p.c, q.c) < 1e-9) return [];
    points = circleCircle(p.c, p.r, q.c, q.r);
  }

  return points.filter((x) => paramOn(p, x) !== null && paramOn(q, x) !== null);
};

/** Whether a point is inside a closed outline (a ray is cast to the right and its crossings counted). */
export const inside = (region: Region, point: V): boolean => {
  let n = 0;
  const [px, py] = point;
  for (const p of region) {
    if (p.t === "L") {
      const [x1, y1] = p.a;
      const [x2, y2] = p.b;
      if (y1 > py !== y2 > py && x1 + ((py - y1) / (y2 - y1)) * (x2 - x1) > px) n += 1;
      continue;
    }
    const dy = py - p.c[1];
    if (Math.abs(dy) >= p.r) continue;
    const dx = Math.sqrt(p.r * p.r - dy * dy);
    for (const x of [p.c[0] + dx, p.c[0] - dx]) {
      if (x <= px) continue;
      const span = p.a1 - p.a0;
      let da = Math.atan2(dy, x - p.c[0]) - p.a0;
      if (span > 0) {
        da = ((da % TAU) + TAU) % TAU;
        if (da < span) n += 1;
      } else {
        da = ((-da % TAU) + TAU) % TAU;
        if (da < -span) n += 1;
      }
    }
  }

  return n % 2 === 1;
};

/** A whole circle as an outline. */
export const disc = (c: V, r: number): Region => [arcA(c, r, 0, TAU)];

/** A ruled line inked `w` wide, from `p` to `q`, its ends cut square. */
export const thickSeg = (p: V, q: V, w: number): Region => {
  const d = vunit(vsub(q, p));
  const n: V = [(-d[1] * w) / 2, (d[0] * w) / 2];
  const a = vadd(p, n);
  const b = vadd(q, n);
  const c = vsub(q, n);
  const e = vsub(p, n);

  return [seg(a, b), seg(b, c), seg(c, e), seg(e, a)];
};

/** The arc of a circle from angle `a0` to `a1` inked `w` wide: the band between two circles about its centre, its ends cut on the radius. */
export const thickArc = (c: V, r: number, w: number, a0: number, a1: number): Region => {
  const o = r + w / 2;
  const i = r - w / 2;

  return [arcA(c, o, a0, a1), seg(onCircle(c, o, a1), onCircle(c, i, a1)), arcA(c, i, a1, a0), seg(onCircle(c, i, a0), onCircle(c, o, a0))];
};

/** Whether two pieces lie on the same circle or the same endless line, the second going on from where the first ends. */
const goesOn = (p: Piece, q: Piece): boolean => {
  if (p.t === "A" && q.t === "A") return vdist(p.c, q.c) < 1e-7 && Math.abs(p.r - q.r) < 1e-7 && p.a1 > p.a0 === q.a1 > q.a0 && Math.abs(p.a1 - p.a0) + Math.abs(q.a1 - q.a0) < TAU - 1e-6;
  if (p.t === "L" && q.t === "L") {
    const d = vunit(vsub(p.b, p.a));
    const e = vunit(vsub(q.b, q.a));

    return Math.abs(d[0] * e[1] - d[1] * e[0]) < 1e-9 && d[0] * e[0] + d[1] * e[1] > 0;
  }

  return false;
};

/** An outline with each run of pieces of one circle, or of one line, written as a single piece. */
const joined = (loop: Region): Region => {
  let at = loop.findIndex((p, i) => !goesOn(loop[(i + loop.length - 1) % loop.length], p));
  if (at < 0) at = 0;
  const out: Piece[] = [];
  for (let i = 0; i < loop.length; i += 1) {
    const p = loop[(at + i) % loop.length];
    const last = out[out.length - 1];
    if (i > 0 && goesOn(last, p)) {
      if (last.t === "L" && p.t === "L") out[out.length - 1] = seg(last.a, p.b);
      else if (last.t === "A" && p.t === "A") out[out.length - 1] = arcA(last.c, last.r, last.a0, last.a1 + (p.a1 - p.a0));
    } else out.push(p);
  }

  return out;
};

/**
 * The closed outlines of the ink, where `inked` says whether a point is ink, made only of pieces of the circles and lines given:
 * each is cut where it crosses another, and the cuts that part ink from paper are kept and joined.
 */
export const carveWhere = (outlines: Piece[], inked: (point: V) => boolean): Region[] => {
  const kept: Piece[] = [];
  outlines.forEach((p, i) => {
    const cuts = [0, 1];
    outlines.forEach((q, j) => {
      if (j === i) return;
      for (const x of crossings(p, q)) cuts.push(paramOn(p, x) ?? 0);
    });
    cuts.sort((a, b) => a - b);
    for (let k = 0; k + 1 < cuts.length; k += 1) {
      if (cuts[k + 1] - cuts[k] < 1e-9) continue;
      const s = pieceSub(p, cuts[k], cuts[k + 1]);
      const m = pieceAt(s, 0.5);
      const n = pieceNormal(s, 0.5);
      const left = inked(vadd(m, vmul(n, 2e-5)));
      const right = inked(vadd(m, vmul(n, -2e-5)));
      if (left !== right) kept.push(left ? s : reversed(s));
    }
  });
  const key = (point: V): string => `${Math.round(point[0] * 1e5)},${Math.round(point[1] * 1e5)}`;
  const seen = new Set<string>();
  const unique: Piece[] = [];
  for (const s of kept) {
    const k = `${key(pieceStart(s))}|${key(pieceAt(s, 0.5))}|${key(pieceEnd(s))}`;
    if (!seen.has(k)) {
      seen.add(k);
      unique.push(s);
    }
  }
  const loops: Region[] = [];
  const used = unique.map(() => false);
  for (let i = 0; i < unique.length; i += 1) {
    if (used[i]) continue;
    const loop = [unique[i]];
    used[i] = true;
    const start = pieceStart(unique[i]);
    let end = pieceEnd(unique[i]);
    while (vdist(end, start) > 1e-4) {
      let best = -1;
      let bestDistance = 1e-4;
      for (let j = 0; j < unique.length; j += 1) {
        if (used[j]) continue;
        const d = vdist(pieceStart(unique[j]), end);
        if (d < bestDistance) {
          bestDistance = d;
          best = j;
        }
      }
      if (best < 0) throw new Error(`compass: an outline does not close near ${end.map((v) => v.toFixed(3)).join(", ")}`);
      used[best] = true;
      loop.push(unique[best]);
      end = pieceEnd(unique[best]);
    }
    loops.push(loop);
  }

  return loops.map(joined);
};

/**
 * What is left of the outlines `plus` (their union) when the outlines `minus` are cut out of it, as closed outlines made only
 * of pieces of the outlines given: each is cut where it crosses another, and the cuts that part ink from paper are kept and joined.
 */
export const carve = (plus: Region[], minus: Region[]): Region[] => {
  const regions = [...plus, ...minus];
  const inked = (point: V): boolean => plus.some((r) => inside(r, point)) && !minus.some((m) => inside(m, point));
  const kept: Piece[] = [];
  regions.forEach((region, i) =>
    region.forEach((p) => {
      const cuts = [0, 1];
      regions.forEach((other, j) => {
        if (j === i) return;
        for (const q of other) for (const x of crossings(p, q)) cuts.push(paramOn(p, x) ?? 0);
      });
      cuts.sort((a, b) => a - b);
      for (let k = 0; k + 1 < cuts.length; k += 1) {
        if (cuts[k + 1] - cuts[k] < 1e-9) continue;
        const s = pieceSub(p, cuts[k], cuts[k + 1]);
        const m = pieceAt(s, 0.5);
        const n = pieceNormal(s, 0.5);
        const left = inked(vadd(m, vmul(n, 2e-5)));
        const right = inked(vadd(m, vmul(n, -2e-5)));
        if (left !== right) kept.push(left ? s : reversed(s));
      }
    }),
  );
  const key = (point: V): string => `${Math.round(point[0] * 1e5)},${Math.round(point[1] * 1e5)}`;
  const seen = new Set<string>();
  const unique: Piece[] = [];
  for (const s of kept) {
    const k = `${key(pieceStart(s))}|${key(pieceAt(s, 0.5))}|${key(pieceEnd(s))}`;
    if (!seen.has(k)) {
      seen.add(k);
      unique.push(s);
    }
  }
  const loops: Region[] = [];
  const used = unique.map(() => false);
  for (let i = 0; i < unique.length; i += 1) {
    if (used[i]) continue;
    const loop = [unique[i]];
    used[i] = true;
    const start = pieceStart(unique[i]);
    let end = pieceEnd(unique[i]);
    while (vdist(end, start) > 1e-4) {
      let best = -1;
      let bestDistance = 1e-4;
      for (let j = 0; j < unique.length; j += 1) {
        if (used[j]) continue;
        const d = vdist(pieceStart(unique[j]), end);
        if (d < bestDistance) {
          bestDistance = d;
          best = j;
        }
      }
      if (best < 0) throw new Error(`compass: an outline does not close near ${end.map((v) => v.toFixed(3)).join(", ")}`);
      used[best] = true;
      loop.push(unique[best]);
      end = pieceEnd(unique[best]);
    }
    loops.push(loop);
  }

  return loops;
};

/** Where the construction's frame lies on the page: its unit is `k` of the page's, turned `turn` degrees clockwise, mirrored left to right first when `mirror` is set. */
export interface Placing {
  k: number;
  turn?: number;
  mirror?: boolean;
}

/** A point of the construction on the page. */
export const onPage = (p: V, placing: Placing): Pt => {
  const x = placing.mirror === true ? -p[0] : p[0];
  const a = -(placing.turn ?? 0) * DEG;
  const [rx, ry] = rotatePoint([x, p[1]], a);

  return [CX + placing.k * rx, CY - placing.k * ry];
};

/** Closed outlines of the construction as one path on the page, in arcs and lines. */
export const toPath = (loops: Region[], placing: Placing): Path => {
  const path = new Path();
  const mirror = placing.mirror === true;
  for (const loop of loops) {
    path.M(onPage(pieceStart(loop[0]), placing));
    for (const p of loop) {
      if (p.t === "L") {
        path.L(onPage(p.b, placing));
        continue;
      }
      const span = p.a1 - p.a0;
      const n = Math.max(1, Math.ceil(Math.abs(span) / (Math.PI * 0.9)));
      for (let i = 1; i <= n; i += 1) path.A(p.r * placing.k, 0, span > 0 !== mirror ? 0 : 1, onPage(onCircle(p.c, p.r, p.a0 + (span * i) / n), placing));
    }
    path.Z();
  }

  return path;
};

/** The circle of radius `r` through two points, its centre on the side of `hint`. */
export const circleThrough = (p: V, q: V, r: number, hint: V): Circle => ({ c: nearest(circleCircle(p, r, q, r), hint), r });

/** The arc of a circle from one of its points to another, the short way round. */
export const shortArc = (circle: Circle, from: V, to: V): Piece => {
  let d = angleOf(circle.c, to) - angleOf(circle.c, from);
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;

  return arcTo(circle, from, to, d > 0);
};
