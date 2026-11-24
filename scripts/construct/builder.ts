// What a crest's construction is written with: the guides of its layout (割付, the compass circles and ruler lines it is
// set out with) and the shapes it is drawn from, each shape belonging to one named part. The build keeps the order the
// calls are made in: guides first, then shape by shape, which is the order the construction animation plays them.

import { C0, Path, R, circle, dist, flipX, polar, turn } from "./geo.ts";
import type { Pt } from "./geo.ts";

export interface Guide {
  /** What it is: a compass `circle`, struck in full, or a ruler `line`. */
  type: "circle" | "line";
  d: string;
}

export interface Shape {
  /** The part it belongs to: "frame", or a motif's id. */
  part: string;
  /** `fill` shapes are solid; `stroke` shapes are lines of one weight. */
  kind: "fill" | "stroke";
  d: string;
  /** For a stroke: its weight, in the page's 200 units. */
  width?: number;
  cap?: "butt";
  /** For a fill with holes: the even-odd rule. */
  rule?: "evenodd";
  /** Shapes of one group are traced together. */
  group: number;
  /** For a shape that is the unit already drawn, turned to another place: the degrees, clockwise about the centre. */
  turn?: number;
  /** For such a shape: the unit is mirrored left to right before it is turned. */
  flip?: true;
}

/** A piece of a path on the page: a ruled line from `a` to `b`, or an arc of radius `r` from `a` through `mid` to `b`. */
type Piece = { a: Pt; b: Pt; mid?: Pt; c?: Pt; r?: number };

const piecesOf = (path: Path): Piece[] => {
  const out: Piece[] = [];
  let at: Pt = [0, 0];
  let start: Pt = [0, 0];
  for (const cmd of path.cmds) {
    const to = cmd.k === "Z" ? start : cmd.p;
    if (cmd.k === "M") start = to;
    else if (cmd.k === "A") {
      const chord = dist(at, to);
      const r = Math.max(cmd.r, chord / 2);
      const u: Pt = [(at[1] - to[1]) / chord, (to[0] - at[0]) / chord];
      const h = Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (cmd.large === cmd.sweep ? -1 : 1);
      const c: Pt = [(at[0] + to[0]) / 2 + h * u[0], (at[1] + to[1]) / 2 + h * u[1]];
      const side = cmd.sweep === 1 ? -r : r;
      out.push({ a: at, b: to, mid: [c[0] + side * u[0], c[1] + side * u[1]], c, r });
    } else if (dist(at, to) > 0.02) out.push({ a: at, b: to });
    at = to;
  }

  return out;
};

/** The places a unit is turned to: every turn of a regular layout, nearest first, then the same mirrored. */
const PLACES: { turn: number; flip: boolean }[] = [false, true].flatMap((flip) =>
  [...new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 32].flatMap((n) => Array.from({ length: n }, (_, i) => Math.round(((360 * i) / n) * 1e4) / 1e4)))]
    .map((a) => (a > 180 ? a - 360 : a))
    .sort((a, b) => Math.abs(a) - Math.abs(b) || b - a)
    .map((a) => ({ turn: a, flip })),
);
const ON = 0.005;

/** The weights of a crest's lines, in the page's 200 units: one scale for every crest, so that they sit together. */
export const WEIGHT = { thread: 2.4, thin: 6.4, medium: 9.6, thick: 14.4, hair: 1.6 } as const;

export type RingKind = "ring-thread" | "ring-thin" | "ring-medium" | "ring-thick";
/**
 * The weights of the rings, measured from fifteen ringed crests drawn in the usual way (docs/provenance.md, "Rings"): the ring of a
 * 丸に crest is 0.079 to 0.095 of the crest's diameter, 0.087 at the median, so 16.8 on the 192 of the layout circle; a thin ring is
 * a thirtieth of the diameter.
 */
const RING_WEIGHT: Record<RingKind, number> = { "ring-thread": WEIGHT.thread, "ring-thin": WEIGHT.thin, "ring-medium": 16.8, "ring-thick": 24 };

/** The white between a ring and the motif inside it: 0.018 of the diameter at the median of the same fifteen crests. */
export const RING_GAP = 3.5;

export class Builder {
  guides: Guide[] = [];
  shapes: Shape[] = [];
  private groupId = 0;
  private k = 1;

  /** Everything drawn from now on is drawn `k` times the size about the centre: for a crest set inside a ring. */
  zoom(k: number): void {
    this.k = k;
  }

  private z(path: Path): Path {
    return this.k === 1 ? path : path.scale(this.k);
  }
  private open = false;
  private decimals = 2;

  /**
   * Shapes drawn from now on are written to `n` decimals of the page's 200 units. A crest vectorised from a book is written to one
   * (a twentieth of a pixel at 200 pixels), which keeps its many curves within the size budget.
   */
  precision(n: number): void {
    this.decimals = n;
  }

  /** Shapes drawn inside `body` are one step of the animation. */
  group(body: () => void): void {
    this.groupId += 1;
    this.open = true;
    body();
    this.open = false;
  }

  private nextGroup(): number {
    if (!this.open) this.groupId += 1;

    return this.groupId;
  }

  private struck: { c: Pt; r: number; guide: number; used?: true }[] = [];
  private ruled: { a: Pt; b: Pt; guide: number }[] = [];

  private strikeCircle(c: Pt, r: number): void {
    if (this.struck.some((g) => Math.abs(g.r - r) < ON && dist(g.c, c) < ON)) return;
    this.struck.push({ c, r, guide: this.guides.length });
    this.guides.push({ type: "circle", d: circle(c, r).d() });
  }

  /** Rules the line from `a` to `b`; a line already ruled along it is made longer instead. */
  private rule(a: Pt, b: Pt): void {
    const off = (g: { a: Pt; b: Pt }, p: Pt): number => Math.abs((g.b[0] - g.a[0]) * (p[1] - g.a[1]) - (g.b[1] - g.a[1]) * (p[0] - g.a[0])) / dist(g.a, g.b);
    const old = this.ruled.find((g) => g.guide >= 0 && off(g, a) < ON && off(g, b) < ON);
    if (old === undefined) {
      this.ruled.push({ a, b, guide: this.guides.length });
      this.guides.push({ type: "line", d: new Path().M(a).L(b).d() });

      return;
    }
    const along = (p: Pt): number => (p[0] - old.a[0]) * (old.b[0] - old.a[0]) + (p[1] - old.a[1]) * (old.b[1] - old.a[1]);
    const ends = [old.a, old.b, a, b].sort((p, q) => along(p) - along(q));
    old.a = ends[0];
    old.b = ends[3];
    this.guides[old.guide].d = new Path().M(old.a).L(old.b).d();
  }

  guideCircle(c: Pt, r: number): void {
    this.strikeCircle([C0[0] + (c[0] - C0[0]) * this.k, C0[1] + (c[1] - C0[1]) * this.k], r * this.k);
  }

  guideLine(a: Pt, b: Pt): void {
    const line = this.z(new Path().M(a).L(b)).points;
    this.rule(line[0], line[1]);
  }

  /** A guide that is ruled lines end to end (a square's edges). */
  guidePath(path: Path): void {
    const placed = this.z(path);
    for (const piece of piecesOf(placed)) this.ruled.push({ a: piece.a, b: piece.b, guide: -1 });
    this.guides.push({ type: "line", d: placed.d() });
  }

  /** Whether a piece lies on a circle struck or a line ruled, once it is brought back from the place it was turned to. */
  private laid(piece: Piece, place: { turn: number; flip: boolean }, mark = false): boolean {
    const home = (p: Pt): Pt => (place.flip ? flipX(turn(p, -place.turn)) : turn(p, -place.turn));
    const [a, b] = [home(piece.a), home(piece.b)];
    if (piece.mid !== undefined) {
      const mid = home(piece.mid);

      const on = this.struck.find((g) => Math.abs(g.r - piece.r!) < ON && [a, mid, b].every((p) => Math.abs(dist(p, g.c) - g.r) < ON));
      if (on !== undefined && mark) on.used = true;

      return on !== undefined;
    }
    const off = (g: { a: Pt; b: Pt }, p: Pt): number => {
      const t = Math.min(1, Math.max(0, ((p[0] - g.a[0]) * (g.b[0] - g.a[0]) + (p[1] - g.a[1]) * (g.b[1] - g.a[1])) / dist(g.a, g.b) ** 2));

      return dist(p, [g.a[0] + (g.b[0] - g.a[0]) * t, g.a[1] + (g.b[1] - g.a[1]) * t]);
    };

    return this.ruled.some((g) => off(g, a) < ON && off(g, b) < ON);
  }

  /**
   * Before a shape is inked, every circle its arcs are taken from is struck in full and every line its straight edges lie on is
   * ruled, unless they already are. A shape that is the unit already laid out, turned to another place, strikes nothing: it is
   * marked as turned, and the animation shows the unit turned there.
   */
  private layOut(path: Path): { turn?: number; flip?: true } {
    if (path.cmds.some((cmd) => cmd.k === "C")) return {};
    const pieces = piecesOf(path);
    const home = { turn: 0, flip: false };
    const place = pieces.every((piece) => this.laid(piece, home)) ? home : PLACES.find((one) => pieces.every((piece) => this.laid(piece, one)));
    for (const piece of pieces) {
      if (this.laid(piece, place ?? home, true)) continue;
      if (piece.mid === undefined) this.rule(piece.a, piece.b);
      else {
        this.strikeCircle(piece.c!, piece.r!);
        this.laid(piece, home, true);
      }
    }
    if (place !== undefined && place !== home) return { turn: place.turn, ...(place.flip ? { flip: true as const } : {}) };

    return {};
  }

  /** The spokes of a layout: `n` lines from the centre, the first at `a0`. */
  guideSpokes(n: number, a0 = 0, r = R, c: Pt = C0): void {
    for (let i = 0; i < n; i += 1) this.guideLine(c, polar(r, a0 + (360 * i) / n, c));
  }

  fill(part: string, path: Path, rule?: "evenodd"): void {
    const placed = this.z(path);
    this.shapes.push({ part, kind: "fill", d: placed.d(this.decimals), ...(rule === undefined ? {} : { rule }), group: this.nextGroup(), ...this.layOut(placed) });
  }

  stroke(part: string, path: Path, width: number, cap?: "butt"): void {
    this.shapes.push({ part, kind: "stroke", d: this.z(path).d(this.decimals), width: Math.round(width * this.k * 100) / 100, ...(cap === undefined ? {} : { cap }), group: this.nextGroup() });
  }

  /**
   * The guides, once everything is drawn. A circle no shape takes an arc from is kept when it is part of the layout, but not when
   * it is only another circle turned to a place the unit is turned to: the turn shows that one.
   */
  laidOut(): Guide[] {
    const again = this.struck.filter(
      (g) => g.used !== true && this.struck.some((u) => u.used === true && Math.abs(u.r - g.r) < ON && PLACES.some((place) => dist(place.flip ? flipX(turn(g.c, -place.turn)) : turn(g.c, -place.turn), u.c) < ON)),
    );

    return this.guides.filter((_, i) => !again.some((g) => g.guide === i));
  }

  /**
   * The frame of a ringed crest: the black between two circles about the centre, the outer one the layout circle and the inner
   * one the ring's weight inside it. Both circles are struck as guides. Returns the radius of the room inside it.
   */
  ring(kind: RingKind, radius = R): number {
    const w = RING_WEIGHT[kind];
    this.guideCircle(C0, radius);
    this.guideCircle(C0, radius - w);
    this.fill("frame", circle(C0, radius).join(circle(C0, radius - w)), "evenodd");

    return radius - w;
  }
}

/** The layout circles every ringed crest is set out with, from the outside in. */
export const layoutRadii = (inner: number): number[] => [R, inner];
