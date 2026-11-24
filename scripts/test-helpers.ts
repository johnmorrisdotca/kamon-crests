// What the tests use to look inside a crest's SVG: its paths' coordinates, with no DOM.

/** The tags and attributes of a crest's SVG, as plain data. */
export interface Tag {
  name: string;
  attributes: Record<string, string>;
}

/** Every tag of an SVG string. Throws when the text is not well formed enough to read (an unquoted attribute, an unclosed tag). */
export const tagsOf = (svg: string): Tag[] => {
  const tags: Tag[] = [];
  const re = /<(\/?)([A-Za-z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>/g;
  let last = 0;
  const stack: string[] = [];
  for (let m = re.exec(svg); m !== null; m = re.exec(svg)) {
    const between = svg.slice(last, m.index);
    if (/[<>]/.test(between)) throw new Error(`unreadable markup near "${between.slice(0, 40)}"`);
    last = m.index + m[0].length;
    if (m[1] === "/") {
      if (stack.pop() !== m[2]) throw new Error(`</${m[2]}> closes nothing`);
      continue;
    }
    const attributes: Record<string, string> = {};
    for (const a of m[3].matchAll(/([\w:-]+)="([^"]*)"/g)) attributes[a[1]] = a[2];
    tags.push({ name: m[2], attributes });
    if (m[4] !== "/") stack.push(m[2]);
  }
  if (svg.slice(last).trim() !== "") throw new Error("text after the last tag");
  if (stack.length > 0) throw new Error(`<${stack[stack.length - 1]}> is never closed`);

  return tags;
};

/** The bounding box of the points and control points of some path data (the package writes relative lines, curves and arcs). */
export const boundsOf = (d: string): { x0: number; y0: number; x1: number; y1: number; points: number } => {
  const tokens = d.match(/[MmLlHhVvCcAaZz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let i = 0;
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let command = "";
  const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity, points: 0 };
  const take = (): number => {
    const n = Number(tokens[i]);
    i += 1;
    if (!Number.isFinite(n)) throw new Error(`not a number in ${d.slice(0, 60)}`);

    return n;
  };
  const mark = (px: number, py: number): void => {
    box.x0 = Math.min(box.x0, px);
    box.y0 = Math.min(box.y0, py);
    box.x1 = Math.max(box.x1, px);
    box.y1 = Math.max(box.y1, py);
    box.points += 1;
  };
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) {
      command = tokens[i];
      i += 1;
      if (command === "z" || command === "Z") {
        x = sx;
        y = sy;
        continue;
      }
    }
    const rel = command === command.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    const k = command.toLowerCase();
    if (k === "m" || k === "l") {
      x = ox + take();
      y = oy + take();
      if (k === "m") {
        sx = x;
        sy = y;
        command = rel ? "l" : "L";
      }
      mark(x, y);
    } else if (k === "h") {
      x = ox + take();
      mark(x, y);
    } else if (k === "v") {
      y = oy + take();
      mark(x, y);
    } else if (k === "c") {
      mark(ox + take(), oy + take());
      mark(ox + take(), oy + take());
      x = ox + take();
      y = oy + take();
      mark(x, y);
    } else if (k === "a") {
      take();
      take();
      take();
      take();
      take();
      x = ox + take();
      y = oy + take();
      mark(x, y);
    } else throw new Error(`unknown path command ${command}`);
  }

  return box;
};

type XY = [number, number];

/** A piece of some path data: a ruled line from `a` to `b`, or an arc of radius `r` from `a` through `mid` to `b`. */
export type Drawn = { t: "L"; a: XY; b: XY } | { t: "A"; a: XY; b: XY; mid: XY; r: number };

/** The lines and arcs of some path data (the package writes moves, relative lines and circular arcs; a curve throws). */
export const piecesOf = (d: string): Drawn[] => {
  const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const out: Drawn[] = [];
  let i = 0;
  let at: XY = [0, 0];
  let start: XY = [0, 0];
  let command = "";
  const take = (): number => Number(tokens[i++]);
  const line = (to: XY): void => {
    if (Math.hypot(to[0] - at[0], to[1] - at[1]) > 0.02) out.push({ t: "L", a: at, b: to });
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
      command = rel ? "l" : "L";
    } else if (k === "l") line([ox + take(), oy + take()]);
    else if (k === "h") line([ox + take(), at[1]]);
    else if (k === "v") line([at[0], oy + take()]);
    else if (k === "a") {
      let r = take();
      take();
      take();
      const large = take();
      const sweep = take();
      const to: XY = [ox + take(), oy + take()];
      const chord = Math.hypot(to[0] - at[0], to[1] - at[1]);
      // An arc that ends where it starts draws nothing.
      if (chord < 0.02) continue;
      r = Math.max(r, chord / 2);
      const u: XY = [(at[1] - to[1]) / chord, (to[0] - at[0]) / chord];
      const h = Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (large === sweep ? -1 : 1);
      const c: XY = [(at[0] + to[0]) / 2 + h * u[0], (at[1] + to[1]) / 2 + h * u[1]];
      const side = sweep === 1 ? -r : r;
      out.push({ t: "A", a: at, b: to, mid: [c[0] + side * u[0], c[1] + side * u[1]], r });
      at = to;
    } else throw new Error(`piecesOf: ${command} is not a move, a line or an arc`);
  }

  return out;
};

interface Laid {
  guides: readonly { type: string; d: string; part?: string }[];
  shapes: readonly { d: string; part?: string; turn?: number; flip?: boolean }[];
}

/**
 * What of a construction's finished shapes was never struck or ruled: the arcs that lie on no circle its guides strike in full, the
 * straight edges on no line they rule, and the guides that are neither a whole circle nor ruled lines. A shape that is the unit
 * turned (`turn`, `flip`) is held against what the turn step shows at its place: its own part's guides turned the same way, and
 * every guide where it was struck. `within` is the most a point may stand off its guide.
 */
export const unstruck = (construction: Laid, within = 0.05): { arcs: number; ofArcs: number; lines: number; ofLines: number; bare: number } => {
  const circles: { c: XY; r: number; part?: string }[] = [];
  const lines: { a: XY; b: XY; part?: string }[] = [];
  let bare = 0;
  for (const guide of construction.guides) {
    const pieces = piecesOf(guide.d);
    if (guide.type === "line" && pieces.every((p) => p.t === "L")) lines.push(...pieces.map((p) => ({ a: p.a, b: p.b, part: guide.part })));
    else if (guide.type === "circle" && pieces.length === 2 && pieces.every((p) => p.t === "A") && Math.hypot(pieces[0].a[0] - pieces[1].b[0], pieces[0].a[1] - pieces[1].b[1]) < 0.02) {
      circles.push({ part: guide.part, c: [(pieces[0].a[0] + pieces[0].b[0]) / 2, (pieces[0].a[1] + pieces[0].b[1]) / 2], r: (pieces[0] as { r: number }).r });
    } else bare += 1;
  }
  const count = { arcs: 0, ofArcs: 0, lines: 0, ofLines: 0, bare };
  for (const shape of construction.shapes) {
    const a = ((shape.turn ?? 0) * Math.PI) / 180;
    // Back to where the unit stands: turned back, then mirrored back.
    const home = (p: XY): XY => {
      const x = p[0] - 100;
      const y = p[1] - 100;
      const bx = x * Math.cos(a) + y * Math.sin(a);

      return [100 + (shape.flip === true ? -bx : bx), 100 - x * Math.sin(a) + y * Math.cos(a)];
    };
    for (const piece of piecesOf(shape.d)) {
      if (piece.t === "A") {
        count.ofArcs += 1;
        const there = [piece.a, piece.mid, piece.b];
        const points = there.map(home);
        const lies = (g: { c: XY; r: number }, on: XY[]): boolean => Math.abs(g.r - piece.r) <= within && on.every((p) => Math.abs(Math.hypot(p[0] - g.c[0], p[1] - g.c[1]) - g.r) <= within);
        if (!circles.some((g) => lies(g, there) || (g.part === shape.part && lies(g, points)))) count.arcs += 1;
        continue;
      }
      count.ofLines += 1;
      const there = [piece.a, piece.b];
      const points = there.map(home);
      const on = (g: { a: XY; b: XY }, p: XY): boolean => Math.abs((g.b[0] - g.a[0]) * (p[1] - g.a[1]) - (g.b[1] - g.a[1]) * (p[0] - g.a[0])) / Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]) <= within;
      if (!lines.some((g) => there.every((p) => on(g, p)) || (g.part === shape.part && points.every((p) => on(g, p))))) count.lines += 1;
    }
  }

  return count;
};

/**
 * The ends of a construction's ruled lines that stand on nothing: not at the centre, and on no circle or line struck before the
 * line is ruled. A line ruled between two such points was placed by eye, however exactly the shape then follows it.
 */
export const unanchored = (construction: Pick<Laid, "guides">, within = 0.05): number => {
  const circles: { c: XY; r: number }[] = [];
  const lines: { a: XY; b: XY }[] = [];
  let loose = 0;
  for (const guide of construction.guides) {
    const pieces = piecesOf(guide.d);
    if (guide.type === "circle") {
      circles.push({ c: [(pieces[0].a[0] + pieces[0].b[0]) / 2, (pieces[0].a[1] + pieces[0].b[1]) / 2], r: (pieces[0] as { r: number }).r });
      continue;
    }
    for (const piece of pieces) {
      for (const p of [piece.a, piece.b]) {
        const onLine = (g: { a: XY; b: XY }): boolean => {
          const t = Math.min(1, Math.max(0, ((p[0] - g.a[0]) * (g.b[0] - g.a[0]) + (p[1] - g.a[1]) * (g.b[1] - g.a[1])) / ((g.b[0] - g.a[0]) ** 2 + (g.b[1] - g.a[1]) ** 2)));

          return Math.hypot(p[0] - g.a[0] - (g.b[0] - g.a[0]) * t, p[1] - g.a[1] - (g.b[1] - g.a[1]) * t) <= within;
        };
        if (Math.hypot(p[0] - 100, p[1] - 100) > within && !circles.some((g) => Math.abs(Math.hypot(p[0] - g.c[0], p[1] - g.c[1]) - g.r) <= within) && !lines.some(onLine)) loose += 1;
      }
    }
    lines.push(...pieces.map((piece) => ({ a: piece.a, b: piece.b })));
  }

  return loose;
};

/** How far round from the top a point is, clockwise about the centre (100, 100), in degrees. */
export const clockOf = (p: XY): number => ((Math.atan2(p[0] - 100, 100 - p[1]) * 180) / Math.PI + 360) % 360;

interface Built extends Laid {
  guides: readonly { type: string; d: string; part?: string; unit?: number }[];
  steps: readonly ({ op: string; guide?: number; shapes?: readonly number[] })[];
}

/**
 * What a construction inks with nothing under it, going by its steps. Each shape is held against the guides struck in steps BEFORE
 * the step that first inks it; a shape built at another place by a turn step is held against those and its own part's guides stood
 * at its place, which that step strikes there before its ink.
 *
 * - `arcs`: inked arcs on no circle struck earlier. The circle's radius is within `near` of the arc's, and its centre within `near`
 *   of the arc's centre; an arc too short or too near a half circle to give its centre to that from ends written to two decimals
 *   is held by its ends and its middle lying on the circle, within `within`.
 * - `edges`: inked straight edges that do not lie, from end to end, on a line ruled earlier.
 * - `ends`: ends of such edges (an edge written as several pieces end to end is one edge) that stand on no crossing: no other circle or line struck earlier passes through them.
 * - `curves`: shapes with a curve that is not an arc.
 */
export const offGuides = (construction: Built, within = 0.05, near = 0.15): { arcs: number; edges: number; ends: number; curves: number } => {
  const count = { arcs: 0, edges: 0, ends: 0, curves: 0 };
  const struckAt = new Map<number, number>();
  const inkedAt = new Map<number, number>();
  construction.steps.forEach((step, n) => {
    if (step.op === "guide" && step.guide !== undefined && !struckAt.has(step.guide)) struckAt.set(step.guide, n);
    if (step.op === "trace" || step.op === "draw" || step.op === "turn") for (const i of step.shapes ?? []) if (!inkedAt.has(i)) inkedAt.set(i, n);
  });
  type Circle = { c: XY; r: number };
  type Line = { a: XY; b: XY };
  const guides = construction.guides.map((guide, i) => {
    const pieces = piecesOf(guide.d);
    const circle: Circle | null = guide.type === "circle" && pieces.length === 2 && pieces[0].t === "A" ? { c: [(pieces[0].a[0] + pieces[0].b[0]) / 2, (pieces[0].a[1] + pieces[0].b[1]) / 2], r: pieces[0].r } : null;
    const line: Line | null = guide.type === "line" && pieces.length === 1 && pieces[0].t === "L" ? { a: pieces[0].a, b: pieces[0].b } : null;

    return { circle, line, part: guide.part, at: struckAt.get(i) ?? Infinity };
  });
  const off = (g: Line, p: XY): number => Math.abs((g.b[0] - g.a[0]) * (p[1] - g.a[1]) - (g.b[1] - g.a[1]) * (p[0] - g.a[0])) / Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]);
  const along = (g: Line, p: XY): number => ((p[0] - g.a[0]) * (g.b[0] - g.a[0]) + (p[1] - g.a[1]) * (g.b[1] - g.a[1])) / ((g.b[0] - g.a[0]) ** 2 + (g.b[1] - g.a[1]) ** 2);
  const onCircle = (g: Circle, p: XY): boolean => Math.abs(Math.hypot(p[0] - g.c[0], p[1] - g.c[1]) - g.r) <= within;
  construction.shapes.forEach((shape, index) => {
    if (/[^MmLlHhVvAaZz\d\s.,-]/.test(shape.d)) {
      count.curves += 1;

      return;
    }
    const when = inkedAt.get(index) ?? -1;
    const a = ((shape.turn ?? 0) * Math.PI) / 180;
    // Where a point of the unit stands at this shape's place: mirrored, then turned.
    const there = (p: XY): XY => {
      const x = (shape.flip === true ? 200 - p[0] : p[0]) - 100;
      const y = p[1] - 100;

      return [100 + x * Math.cos(a) - y * Math.sin(a), 100 + x * Math.sin(a) + y * Math.cos(a)];
    };
    const circles: Circle[] = [];
    const lines: Line[] = [];
    for (const guide of guides) {
      if (guide.at >= when) continue;
      if (guide.circle !== null) circles.push(guide.circle);
      if (guide.line !== null) lines.push(guide.line);
      if (shape.turn === undefined || guide.part !== shape.part) continue;
      if (guide.circle !== null) circles.push({ c: there(guide.circle.c), r: guide.circle.r });
      if (guide.line !== null) lines.push({ a: there(guide.line.a), b: there(guide.line.b) });
    }
    // An edge written as several straight pieces end to end is one edge.
    const pieces: Drawn[] = [];
    for (const piece of piecesOf(shape.d)) {
      const last = pieces[pieces.length - 1];
      const straight = piece.t === "L" && last?.t === "L" && Math.hypot(last.b[0] - piece.a[0], last.b[1] - piece.a[1]) < 0.005 && off({ a: last.a, b: piece.b }, last.b) < 0.02 && along({ a: last.a, b: piece.b }, last.b) > 0 && along({ a: last.a, b: piece.b }, last.b) < 1;
      if (straight) pieces[pieces.length - 1] = { t: "L", a: last.a, b: piece.b };
      else pieces.push(piece);
    }
    for (const piece of pieces) {
      if (piece.t === "A") {
        const chord = Math.hypot(piece.b[0] - piece.a[0], piece.b[1] - piece.a[1]);
        const m: XY = [(piece.a[0] + piece.b[0]) / 2, (piece.a[1] + piece.b[1]) / 2];
        const rise = Math.hypot(piece.mid[0] - m[0], piece.mid[1] - m[1]);
        // The centre is the arc's radius back from its middle point, through the middle of its chord.
        const centre: XY = rise < 1e-9 ? m : [piece.mid[0] + ((m[0] - piece.mid[0]) / rise) * piece.r, piece.mid[1] + ((m[1] - piece.mid[1]) / rise) * piece.r];
        const loose = chord < 4 || chord > 1.98 * piece.r;
        if (!circles.some((g) => Math.abs(g.r - piece.r) <= near && (Math.hypot(g.c[0] - centre[0], g.c[1] - centre[1]) <= near || (loose && [piece.a, piece.mid, piece.b].every((p) => onCircle(g, p)))))) count.arcs += 1;
        continue;
      }
      const on = lines.find((g) => [piece.a, piece.b].every((p) => off(g, p) <= within && along(g, p) > -1e-3 && along(g, p) < 1 + 1e-3));
      if (on === undefined) {
        count.edges += 1;
        continue;
      }
      for (const p of [piece.a, piece.b]) if (!circles.some((g) => onCircle(g, p)) && !lines.some((g) => g !== on && off(g, p) <= within && off(g, on.a) + off(g, on.b) > 1)) count.ends += 1;
    }
  });

  return count;
};

/**
 * The ruled lines of a construction that are not ruled full length: a line whose ends do not both stand on the outer guide circle
 * (the largest struck about the centre). `square` counts those that run instead from side to side of the square that circle stands
 * in, as a line does that an edge follows past the circle; `short` counts the rest, which stop short.
 */
export const notFullLength = (construction: Pick<Laid, "guides">, within = 0.05): { short: number; square: number; lines: number } => {
  const count = { short: 0, square: 0, lines: 0 };
  let outer = 0;
  for (const guide of construction.guides) {
    const pieces = piecesOf(guide.d);
    if (guide.type === "circle" && pieces[0]?.t === "A" && Math.hypot((pieces[0].a[0] + pieces[0].b[0]) / 2 - 100, (pieces[0].a[1] + pieces[0].b[1]) / 2 - 100) <= within) outer = Math.max(outer, pieces[0].r);
  }
  for (const guide of construction.guides) {
    if (guide.type !== "line") continue;
    count.lines += 1;
    const pieces = piecesOf(guide.d);
    const ends: XY[] = pieces.length === 1 ? [pieces[0].a, pieces[0].b] : [];
    if (ends.length === 2 && ends.every((p) => Math.abs(Math.hypot(p[0] - 100, p[1] - 100) - outer) <= within)) continue;
    if (ends.length === 2 && ends.every((p) => Math.abs(Math.max(Math.abs(p[0] - 100), Math.abs(p[1] - 100)) - outer) <= within)) count.square += 1;
    else count.short += 1;
  }

  return count;
};
