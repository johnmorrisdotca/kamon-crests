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
