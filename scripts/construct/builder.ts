// What a crest's construction is written with: the guides of its layout (割付, the compass circles and ruler lines it is
// set out with) and the shapes it is drawn from, each shape belonging to one named part. The build keeps the order the
// calls are made in: guides first, then shape by shape, which is the order the construction animation plays them.

import { C0, Path, R, circle, dist, flipX, polar, turn } from "./geo.ts";
import type { Pt } from "./geo.ts";
import { lineCircle } from "./compass.ts";

export interface Guide {
  /** What it is: a compass `circle`, struck in full, or a ruler `line`. */
  type: "circle" | "line";
  d: string;
  /** The part it is struck for: the part of the first shape that takes an arc or an edge from it, or the motif it sets out. */
  part: string;
  /** Guides are struck for the unit that is drawn, which is unit 0. */
  unit: number;
  /** For a circle: its centre, and the number of its compass width (the crest's widths numbered from 1, the smallest first). */
  at?: [number, number];
  width?: number;
  /** For a circle that bounds the gap cut in a piece where another passes over it. */
  gap?: true;
  /** For a circle the compass is stepped round at its own width, from the top, clockwise: the six points it marks. */
  marks?: [number, number][];
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
  /** Which of its part's units it is: 0 for the unit that is laid out and drawn, 1 and up for that unit turned to each other place. */
  unit: number;
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

/** Where the endless line through `a` and `b` meets the square the layout circle stands in. */
const lineSquare = (a: Pt, b: Pt): [Pt, Pt] => {
  const d: Pt = [b[0] - a[0], b[1] - a[1]];
  const ts = [0, 1].flatMap((k) => (Math.abs(d[k]) < 1e-9 ? [] : [(C0[k] - R - a[k]) / d[k], (C0[k] + R - a[k]) / d[k]]));
  const at = (t: number): Pt => [a[0] + d[0] * t, a[1] + d[1] * t];
  const inside = ts.map(at).filter((p) => Math.abs(p[0] - C0[0]) < R + ON && Math.abs(p[1] - C0[1]) < R + ON);
  const along = (p: Pt): number => p[0] * d[0] + p[1] * d[1];
  inside.sort((p, q) => along(p) - along(q));

  return [inside[0], inside[inside.length - 1]];
};

/** The places a unit is turned to: every turn of a regular layout, nearest first, then the same mirrored. */
const PLACES: { turn: number; flip: boolean }[] = [false, true].flatMap((flip) =>
  [...new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 32].flatMap((n) => Array.from({ length: n }, (_, i) => Math.round(((360 * i) / n) * 1e4) / 1e4)))]
    .map((a) => (a > 180 ? a - 360 : a))
    .sort((a, b) => Math.abs(a) - Math.abs(b) || b - a)
    .map((a) => ({ turn: a, flip })),
);
const ON = 0.005;

/** How far a point stands off the endless line through `g.a` and `g.b`. */
const offLine = (g: { a: Pt; b: Pt }, p: Pt): number => Math.abs((g.b[0] - g.a[0]) * (p[1] - g.a[1]) - (g.b[1] - g.a[1]) * (p[0] - g.a[0])) / dist(g.a, g.b);

/** How far round from the top a point is, clockwise about the centre, in degrees from 0 up to 360. */
const clockOf = (p: Pt): number => ((Math.atan2(p[0] - C0[0], C0[1] - p[1]) * 180) / Math.PI + 360.005) % 360 - 0.005;

/** The weights of a crest's lines, in the page's 200 units: one scale for every crest, so that they sit together. */
export const WEIGHT = { thread: 2.4, thin: 6.4, medium: 9.6, thick: 14.4, hair: 1.6 } as const;

export type RingKind = "ring-thread" | "ring-thin" | "ring-medium" | "ring-thick";
/**
 * The weights of the rings, measured from fifteen ringed crests drawn in the usual way (docs/provenance.md, "Rings"): the ring of a
 * 丸に crest is 0.079 to 0.095 of the crest's diameter, 0.087 at the median, so 16.8 on the 192 of the layout circle; a thin ring is
 * a thirtieth of the diameter.
 */
export const RING_WEIGHT: Record<RingKind, number> = { "ring-thread": WEIGHT.thread, "ring-thin": WEIGHT.thin, "ring-medium": 16.8, "ring-thick": 24 };

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
  /** Every line is ruled full length: `a` and `b` are where it meets the layout circle. */
  private ruled: { a: Pt; b: Pt; guide: number; square?: true }[] = [];
  /** How many shapes were drawn when each guide was struck, and the part being inked now. */
  private before: number[] = [];
  private inking = "";
  private places: Record<string, string[]> = {};

  private strike(type: Guide["type"], d: string): void {
    this.before.push(this.shapes.length);
    this.guides.push({ type, d, part: "", unit: 0 });
  }

  private strikeCircle(c: Pt, r: number): void {
    if (this.struck.some((g) => Math.abs(g.r - r) < ON && dist(g.c, c) < ON)) return;
    this.struck.push({ c, r, guide: this.guides.length });
    // A circle is struck clockwise from its top.
    this.strike("circle", new Path().M([c[0], c[1] - r]).A(r, 1, 1, [c[0], c[1] + r]).A(r, 1, 1, [c[0], c[1] - r]).Z().d());
  }

  /** A ruled line as it is written: from its upper end down; a level line from the left. */
  private static ruledPath(a: Pt, b: Pt): string {
    const [from, to] = a[1] - b[1] > ON || (Math.abs(a[1] - b[1]) <= ON && a[0] > b[0]) ? [b, a] : [a, b];

    return new Path().M(from).L(to).d();
  }

  /**
   * Rules the line through `a` and `b`, full length: from edge to edge of the layout circle, which is struck first if it is not
   * yet. A bar, a square or a lattice is never ruled edge by edge: it is the space between long lines that cross. A line already
   * ruled is not ruled again.
   */
  private rule(a: Pt, b: Pt, inked = false): number {
    // A line an edge runs along past the layout circle, or one that only touches the circle, is ruled across the square the circle stands in.
    const chord = lineCircle(a, b, C0, R) as Pt[];
    const within = chord.length === 2 && dist(chord[0], chord[1]) > 1 && (!inked || [a, b].every((p) => dist(p, C0) < R + ON));
    const old = this.ruled.find((g) => offLine(g, a) < ON && offLine(g, b) < ON);
    if (old !== undefined) {
      if (!within && !old.square) {
        [old.a, old.b] = lineSquare(a, b);
        old.square = true;
        this.guides[old.guide].d = Builder.ruledPath(old.a, old.b);
      }

      return old.guide;
    }
    this.strikeCircle(C0, R);
    const [from, to] = within ? chord : lineSquare(a, b);
    this.ruled.push({ a: from, b: to, guide: this.guides.length, ...(within ? {} : { square: true as const }) });
    this.strike("line", Builder.ruledPath(from, to));

    return this.guides.length - 1;
  }

  guideCircle(c: Pt, r: number): void {
    this.strikeCircle([C0[0] + (c[0] - C0[0]) * this.k, C0[1] + (c[1] - C0[1]) * this.k], r * this.k);
  }

  /**
   * A circle about the centre, and the compass stepped round it at the same width from the top, clockwise: the six points it marks
   * are the corners of a hexagon, and of the two triangles in it. The lines through them are ruled after, full length.
   */
  stepRound(r: number): void {
    this.guideCircle(C0, r);
    const on = this.struck.find((g) => Math.abs(g.r - r * this.k) < ON && dist(g.c, C0) < ON)!;
    this.guides[on.guide].marks = Array.from({ length: 6 }, (_, i) => polar(r * this.k, 60 * i).map((n) => Math.round(n * 100) / 100) as [number, number]);
  }

  /** A gap circle: where one piece passes over another, a circle about the centre of the piece on top, the gap outside its outer edge or inside its inner one. */
  gapCircle(c: Pt, r: number): void {
    const before = this.guides.length;
    this.guideCircle(c, r);
    if (this.guides.length > before) this.guides[before].gap = true;
  }

  guideLine(a: Pt, b: Pt): void {
    const line = this.z(new Path().M(a).L(b)).points;
    this.rule(line[0], line[1]);
  }

  /** The lines a polygon's edges lie on, each ruled full length: the polygon is where they cross, and is never drawn as a polygon. */
  guidePath(path: Path): void {
    for (const piece of piecesOf(this.z(path))) this.rule(piece.a, piece.b);
  }

  /** Whether a piece lies on a circle struck or a line ruled, once it is brought back from the place it was turned to. */
  private laid(piece: Piece, place: { turn: number; flip: boolean }, mark = false): boolean {
    const home = (p: Pt): Pt => (place.flip ? flipX(turn(p, -place.turn)) : turn(p, -place.turn));
    const [a, b] = [home(piece.a), home(piece.b)];
    if (piece.mid !== undefined) {
      const mid = home(piece.mid);

      const on = this.struck.find((g) => Math.abs(g.r - piece.r!) < ON && [a, mid, b].every((p) => Math.abs(dist(p, g.c) - g.r) < ON));
      if (on !== undefined && mark) {
        on.used = true;
        this.guides[on.guide].part ||= this.inking;
      }

      return on !== undefined;
    }
    const on = this.ruled.find((g) => offLine(g, a) < ON && offLine(g, b) < ON);
    if (on !== undefined && mark) this.guides[on.guide].part ||= this.inking;

    return on !== undefined;
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
    // A shape of ruled lines only is never a unit turned: each of its lines is ruled, full length, in the underdrawing.
    const place = pieces.every((piece) => piece.mid === undefined || this.laid(piece, home)) ? home : PLACES.find((one) => pieces.every((piece) => this.laid(piece, one)));
    for (const piece of pieces) {
      if (piece.mid === undefined && (place ?? home) === home) this.rule(piece.a, piece.b, true);
      if (this.laid(piece, place ?? home, true)) continue;
      if (piece.mid === undefined) this.rule(piece.a, piece.b, true);
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
    this.inking = part;
    const place = this.layOut(placed);
    // The unit drawn is 0; each other place it is turned to is the next number, the same for every shape of the unit.
    const places = (this.places[part] ??= []);
    const key = `${place.turn} ${place.flip}`;
    if (place.turn !== undefined && !places.includes(key)) places.push(key);
    this.shapes.push({ part, kind: "fill", d: placed.d(this.decimals), ...(rule === undefined ? {} : { rule }), group: this.nextGroup(), unit: place.turn === undefined ? 0 : places.indexOf(key) + 1, ...place });
  }

  stroke(part: string, path: Path, width: number, cap?: "butt"): void {
    this.shapes.push({ part, kind: "stroke", d: this.z(path).d(this.decimals), width: Math.round(width * this.k * 100) / 100, ...(cap === undefined ? {} : { cap }), group: this.nextGroup(), unit: 0 });
  }

  /**
   * The guides, once everything is drawn. A circle no shape takes an arc from is kept when it is part of the layout, but not when
   * it is only another circle turned to a place the unit is turned to: the turn shows that one.
   */
  laidOut(): Guide[] {
    const again = this.struck.filter(
      (g) => g.used !== true && this.struck.some((u) => u.used === true && Math.abs(u.r - g.r) < ON && PLACES.some((place) => dist(place.flip ? flipX(turn(g.c, -place.turn)) : turn(g.c, -place.turn), u.c) < ON)),
    );

    // A guide no shape takes anything from sets out a motif (a frame is inked from its own guides): the next motif drawn, or the last.
    const motifs = this.shapes.map((shape, i) => ({ i, part: shape.part })).filter((one) => one.part !== "frame");
    this.guides.forEach((guide, i) => (guide.part ||= (motifs.find((one) => one.i >= this.before[i]) ?? motifs[motifs.length - 1])?.part ?? "frame"));

    // The circles first, then the ruled lines. Each part by part, as each first comes: first a part's circles about the crest's centre,
    // the outermost first and inwards, since the field is set out before anything inside it; then its other circles by compass width,
    // the smallest first, and those of one width clockwise from the top by their centres; its lines clockwise by where they run to.
    const circles = new Map(this.struck.map((g) => [g.guide, g]));
    const parts = [...new Set(this.guides.map((guide) => guide.part))];
    // A part's lines go by parallel sets, the sets clockwise from upright; the lines of a set from the top down, across the set (upright ones from the left).
    const lines = new Map(this.ruled.map((g) => {
      const lean = Math.round(((Math.atan2(g.b[0] - g.a[0], g.a[1] - g.b[1]) * 180) / Math.PI + 360) * 100) % 18000;
      const foot: Pt = [(g.a[0] + g.b[0]) / 2, (g.a[1] + g.b[1]) / 2];

      const a = (lean / 100) * (Math.PI / 180);

      return [g.guide, [lean, Math.round(((foot[0] - C0[0]) * Math.cos(a) + (foot[1] - C0[1]) * Math.sin(a)) * 100)]];
    }));
    const key = (i: number): number[] => {
      const g = circles.get(i);
      if (g !== undefined) {
        const centred = dist(g.c, C0) < ON;

        return [0, parts.indexOf(this.guides[i].part), centred ? 0 : 1, Math.round(g.r * 100) * (centred ? -1 : 1), centred ? -1 : Math.round(clockOf(g.c) * 100), Math.round(dist(g.c, C0) * 100)];
      }

      return [1, parts.indexOf(this.guides[i].part), ...lines.get(i)!];
    };
    const order = this.guides.map((_, i) => i).filter((i) => !again.some((g) => g.guide === i));
    const keys = new Map(order.map((i) => [i, key(i)]));
    order.sort((i, j) => keys.get(i)!.map((n, k) => n - keys.get(j)![k]).find((n) => n !== 0) ?? i - j);

    // The compass widths are numbered from the smallest, over the whole crest, and each circle says its centre.
    const widths = [...new Set(order.flatMap((i) => (circles.has(i) ? [Math.round(circles.get(i)!.r * 100)] : [])))].sort((a, b) => a - b);
    for (const i of order) {
      const g = circles.get(i);
      if (g !== undefined) Object.assign(this.guides[i], { at: [Math.round(g.c[0] * 100) / 100, Math.round(g.c[1] * 100) / 100], width: widths.indexOf(Math.round(g.r * 100)) + 1 });
    }

    return order.map((i) => this.guides[i]);
  }

  /**
   * The frame of a ringed crest: the black between two circles about the centre, the outer one the layout circle and the inner
   * one the ring's weight inside it. Both circles are struck as guides. Returns the radius of the room inside it. A ring drawn at
   * the width its book cell shows passes that width as `w`.
   */
  ring(kind: RingKind, radius = R, w = RING_WEIGHT[kind]): number {
    this.guideCircle(C0, radius);
    this.guideCircle(C0, radius - w);
    this.fill("frame", circle(C0, radius).join(circle(C0, radius - w)), "evenodd");

    return radius - w;
  }
}

/** The layout circles every ringed crest is set out with, from the outside in. */
export const layoutRadii = (inner: number): number[] => [R, inner];
