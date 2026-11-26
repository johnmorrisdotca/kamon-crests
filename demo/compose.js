// The Build page's own logic, with nothing of the page in it: a crest composed from the package's own drawings. A unit is a whole
// crest the package already draws (its construction: guides, shapes, steps). Composing places it, scaled, turned or mirrored, once
// or several times, inside a ring or none, and gives back a construction of the same kind, which the animation plays as it plays any
// crest. No shape is drawn here that the package has not drawn: a placing moves, scales, turns and mirrors a drawing, and a
// similarity keeps a circle a circle and a line a line, so a composed crest is still compass circles, arcs of them, and ruled lines.
//
// Every function is pure and takes what it needs, so a test runs it on the built package and the page runs it on the same files.

const C = 100;
/** The radius of the layout circle every crest is set out in. */
export const R = 96;
/** The weights of the rings the package draws (`RING_WEIGHT` in scripts/construct/builder.ts), and the white between a ring and what is inside it. */
export const RING_WEIGHT = { "ring-thin": 6.4, "ring-medium": 16.8 };
export const RING_GAP = 3.5;
/** Which counts each arrangement can really be built at: the ones a unit turned about the centre, set round a circle, in a row or mirrored makes. */
export const ARRANGEMENT_COUNTS = {
  single: [1],
  radial: [2, 3, 4, 5, 6, 7, 8],
  ring: [2, 3, 4, 5, 6, 7, 8],
  rows: [2, 3, 4, 5],
  facing: [2],
};
export const FRAME_IDS = ["none", ...Object.keys(RING_WEIGHT)];
export const COUNTS = [1, 2, 3, 4, 5, 6, 7, 8];

const DEG = Math.PI / 180;

// ---- Numbers and path data, written as the package writes them: a move, then relative lines and arcs.

const fmt = (n, decimals) => {
  const unit = 10 ** decimals;
  const text = (Math.round(n * unit) / unit).toFixed(decimals).replace(/\.?0+$/, "");

  return text === "-0" || text === "" ? "0" : text;
};

/** Path data as segments with absolute points: `M`, `L`, `C`, `A` (`r`, `large`, `sweep`) and `Z`. */
export const parsePath = (d) => {
  const tokens = d.match(/[MmLlHhVvCcAaZz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const out = [];
  let i = 0;
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let command = "";
  const take = () => {
    const n = Number(tokens[i]);
    i += 1;
    if (!Number.isFinite(n)) throw new Error(`not a number in ${d.slice(0, 60)}`);

    return n;
  };
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) {
      command = tokens[i];
      i += 1;
      if (command === "z" || command === "Z") {
        out.push({ c: "Z" });
        x = sx;
        y = sy;
        continue;
      }
    }
    const rel = command === command.toLowerCase();
    const [ox, oy] = rel ? [x, y] : [0, 0];
    const k = command.toLowerCase();
    if (k === "m" || k === "l") {
      x = ox + take();
      y = oy + take();
      out.push({ c: k === "m" ? "M" : "L", p: [x, y] });
      if (k === "m") {
        sx = x;
        sy = y;
        command = rel ? "l" : "L";
      }
    } else if (k === "h") {
      x = ox + take();
      out.push({ c: "L", p: [x, y] });
    } else if (k === "v") {
      y = oy + take();
      out.push({ c: "L", p: [x, y] });
    } else if (k === "c") {
      const a = [ox + take(), oy + take()];
      const b = [ox + take(), oy + take()];
      x = ox + take();
      y = oy + take();
      out.push({ c: "C", a, b, p: [x, y] });
    } else if (k === "a") {
      const r = take();
      take();
      take();
      const large = take();
      const sweep = take();
      x = ox + take();
      y = oy + take();
      out.push({ c: "A", r, large, sweep, p: [x, y] });
    } else throw new Error(`unknown path command ${command}`);
  }

  return out;
};

/** Segments as compact relative path data, from points rounded first so that rounding never drifts (as the package's own `Path.d`). */
export const writePath = (segments, decimals = 3, snap = false) => {
  const unit = 10 ** decimals;
  const q = (p) => [Math.round(p[0] * unit) / unit, Math.round(p[1] * unit) / unit];
  let out = "";
  let last = "";
  let cur = [0, 0];
  let start = [0, 0];
  const emit = (letter, numbers) => {
    const body = numbers.map((n) => fmt(n, decimals)).reduce((text, n) => (text === "" ? n : /^-/.test(n) ? `${text}${n}` : `${text} ${n}`), "");
    if (letter === last && letter !== "m" && letter !== "z") out += /^-/.test(body) ? body : ` ${body}`;
    else out += `${letter}${body}`;
    last = letter;
  };
  for (const s of segments) {
    if (s.c === "Z") {
      out += "z";
      last = "z";
      cur = start;
      continue;
    }
    const p = q(s.p);
    const dx = p[0] - cur[0];
    const dy = p[1] - cur[1];
    if (s.c === "M") {
      emit(out === "" ? "M" : "m", out === "" ? p : [dx, dy]);
      start = p;
    } else if (s.c === "L") {
      if (Math.abs(dy) < 0.005) emit("h", [dx]);
      else if (Math.abs(dx) < 0.005) emit("v", [dy]);
      else emit("l", [dx, dy]);
    } else if (s.c === "C") {
      const a = q(s.a);
      const b = q(s.b);
      emit("c", [a[0] - cur[0], a[1] - cur[1], b[0] - cur[0], b[1] - cur[1], dx, dy]);
    } else {
      // A half circle's ends are 2r apart, and rounded they are 2r to within the rounding: the arc's centre then wanders far (a chord a hair
      // short of 2r puts it off the middle by the root of the shortfall). When the ends are 2r apart to within a hundredth, r is set to
      // half the chord, rounded down, so that the centre is the middle of the chord.
      const chord = Math.hypot(dx, dy);
      const flat = snap && Math.abs(2 * s.r - chord) < 0.01;
      emit("a", [flat ? Math.floor((chord / 2) * unit) / unit : s.r, flat ? Math.floor((chord / 2) * unit) / unit : s.r, 0, s.large, s.sweep, dx, dy]);
    }
    cur = p;
  }

  return out;
};

// ---- A placing: mirrored left to right about the page's middle line, scaled about the centre, moved, then turned clockwise about the centre.

/** Where a point of a drawing stands once placed. */
export const placePoint = (p, m) => {
  const x = ((m.flip === true ? 2 * C - p[0] : p[0]) - C) * m.k + (m.dx ?? 0);
  const y = (p[1] - C) * m.k + (m.dy ?? 0);
  const a = (m.turn ?? 0) * DEG;

  return [C + x * Math.cos(a) - y * Math.sin(a), C + x * Math.sin(a) + y * Math.cos(a)];
};

/** How many decimals some path data is written to. */
const decimalsOf = (d) => Math.max(2, ...(d.match(/\.\d+/g) ?? []).map((n) => n.length - 1));

/** Whether a placing leaves a drawing where it stands. */
const isHome = (m) => m.k === 1 && m.flip !== true && !m.dx && !m.dy && !m.turn;

/** The decimals a drawing is written to once placed: its own where it stays, three at least where it is moved or scaled. */
const digitsOf = (d, m) => (isHome(m) ? decimalsOf(d) : Math.max(3, decimalsOf(d)));

/** Path data placed: every point moved, every arc's radius scaled, a mirror flipping the way each arc goes round. */
export const placePath = (d, m, decimals = 3) =>
  writePath(
    parsePath(d).map((s) => {
      if (s.c === "Z") return s;
      if (s.c === "A") return { ...s, r: s.r * m.k, sweep: m.flip === true ? 1 - s.sweep : s.sweep, p: placePoint(s.p, m) };
      if (s.c === "C") return { ...s, a: placePoint(s.a, m), b: placePoint(s.b, m), p: placePoint(s.p, m) };

      return { ...s, p: placePoint(s.p, m) };
    }),
    decimals,
    !isHome(m),
  );

/**
 * How far from the page's centre the drawing reaches: the farthest point of any of its shapes, found exactly (an arc's farthest
 * point is where the ray from the centre through the arc's own centre leaves it, if that is on the arc, else an end).
 */
export const reachOf = (shapes) => {
  let best = 0;
  const far = (p) => Math.hypot(p[0] - C, p[1] - C);
  for (const shape of shapes) {
    let at = [0, 0];
    for (const s of parsePath(shape.d)) {
      if (s.c === "A") {
        const chord = Math.hypot(s.p[0] - at[0], s.p[1] - at[1]);
        const r = Math.max(s.r, chord / 2);
        const h = (Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (s.large === s.sweep ? -1 : 1)) / chord;
        const c = [(at[0] + s.p[0]) / 2 + h * (at[1] - s.p[1]), (at[1] + s.p[1]) / 2 + h * (s.p[0] - at[0])];
        const away = Math.hypot(c[0] - C, c[1] - C);
        const u = away < 1e-9 ? [0, -1] : [(c[0] - C) / away, (c[1] - C) / away];
        const a0 = Math.atan2(at[1] - c[1], at[0] - c[0]);
        const a1 = Math.atan2(s.p[1] - c[1], s.p[0] - c[0]);
        const ap = Math.atan2(u[1], u[0]);
        const turn = (from, to) => (((s.sweep === 1 ? to - from : from - to) % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI);
        if (turn(a0, ap) <= turn(a0, a1)) best = Math.max(best, away + r);
      }
      if (s.c !== "Z") {
        best = Math.max(best, far(s.p));
        at = s.p;
      }
    }
  }

  return best;
};

/** The circles the arcs of some shapes are taken from: the centre and radius of each arc, found from its ends and its radius. */
export const arcCircles = (shapes) => {
  const out = [];
  for (const shape of shapes) {
    let at = [0, 0];
    for (const s of parsePath(shape.d)) {
      if (s.c === "A") {
        const chord = Math.hypot(s.p[0] - at[0], s.p[1] - at[1]);
        if (chord >= 0.02) {
          const r = Math.max(s.r, chord / 2);
          const h = (Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (s.large === s.sweep ? -1 : 1)) / chord;
          out.push({ c: [(at[0] + s.p[0]) / 2 + h * (at[1] - s.p[1]), (at[1] + s.p[1]) / 2 + h * (s.p[0] - at[0])], r });
        }
      }
      if (s.c !== "Z") at = s.p;
    }
  }

  return out;
};

// ---- Guides: a circle struck in full or a line ruled, as a Builder writes them.

const circleD = (at, r) => writePath([{ c: "M", p: [at[0], at[1] - r] }, { c: "A", r, large: 1, sweep: 1, p: [at[0], at[1] + r] }, { c: "A", r, large: 1, sweep: 1, p: [at[0], at[1] - r] }, { c: "Z" }], 2);

/** A ruled line as it is written: from its upper end down; a level line from the left. */
const lineD = (a, b) => {
  const [from, to] = a[1] - b[1] > 0.005 || (Math.abs(a[1] - b[1]) <= 0.005 && a[0] > b[0]) ? [b, a] : [a, b];

  return writePath([{ c: "M", p: from }, { c: "L", p: to }], 2);
};

const round2 = (n) => Math.round(n * 100) / 100;

/** A guide as numbers: a circle's centre and radius, a line's two ends. */
export const readGuide = (guide) => {
  if (guide.type === "circle") return { ...guide, at: guide.at, r: Number(/a([\d.]+)/.exec(guide.d)?.[1]) };
  const [from, to] = parsePath(guide.d).map((s) => s.p);

  return { ...guide, a: from, b: to };
};

/** Where the endless line through `a` and `b` meets the circle about the page's centre: the two points, or null. */
const meetCircle = (a, b, r) => {
  const d = [b[0] - a[0], b[1] - a[1]];
  const f = [a[0] - C, a[1] - C];
  const A = d[0] * d[0] + d[1] * d[1];
  const B = 2 * (f[0] * d[0] + f[1] * d[1]);
  const D = B * B - 4 * A * (f[0] * f[0] + f[1] * f[1] - r * r);
  if (D <= 0) return null;
  const t = [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)];

  return t.map((u) => [a[0] + d[0] * u, a[1] + d[1] * u]);
};

/**
 * A guide of a unit, placed. A copy at the centre of a ring has its lines ruled out to the page's layout circle, as a Builder rules every
 * line, and no layout circle of its own: the ring's outer circle is it.
 */
const placeGuide = (guide, m, centred, layoutUsed) => {
  // A drawing set where it already stands is left as it is, with its own digits.
  if (isHome(m)) return { ...guide, unit: guide.unit ?? 0 };
  const g = readGuide(guide);
  const { type, part, gap } = g;
  if (type === "circle") {
    const at = placePoint(g.at, m).map(round2);
    const r = round2(g.r * m.k);
    if (centred && !layoutUsed && Math.abs(g.r - R) < 0.01 && Math.hypot(g.at[0] - C, g.at[1] - C) < 0.01) return null;

    return { type, part, unit: 0, at, d: circleD(at, r), ...(gap === true ? { gap } : {}), ...(g.marks === undefined ? {} : { marks: g.marks.map((p) => placePoint(p, m).map(round2)) }) };
  }
  let [a, b] = [placePoint(g.a, m), placePoint(g.b, m)];
  if (centred && m.k !== 1) [a, b] = meetCircle(a, b, R) ?? [a, b];

  return { type, part, unit: 0, d: lineD(a, b) };
};

/** A guide's place in the order of a Builder's underdrawing: circles first, a part's centred circles outermost first, the rest by width and clockwise; then lines by parallel sets. */
const clockOf = (p) => ((Math.atan2(p[0] - C, C - p[1]) * 180) / Math.PI + 360.005) % 360 - 0.005;
const keyOf = (g, parts) => {
  const part = parts.indexOf(g.part);
  if (g.type === "circle") {
    const r = Number(/a([\d.]+)/.exec(g.d)?.[1]);
    const centred = Math.hypot(g.at[0] - C, g.at[1] - C) < 0.005;

    return [0, part, centred ? 0 : 1, Math.round(r * 100) * (centred ? -1 : 1), centred ? -1 : Math.round(clockOf(g.at) * 100), Math.round(Math.hypot(g.at[0] - C, g.at[1] - C) * 100)];
  }
  const [a, b] = parsePath(g.d).map((s) => s.p);
  const lean = Math.round(((Math.atan2(b[0] - a[0], a[1] - b[1]) * 180) / Math.PI + 360) * 100) % 18000;
  const foot = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const angle = (lean / 100) * DEG;

  return [1, part, lean, Math.round(((foot[0] - C) * Math.cos(angle) + (foot[1] - C) * Math.sin(angle)) * 100)];
};

/**
 * The guides in the order a Builder strikes them (`laidOut` in scripts/construct/builder.ts), with each circle's centre and the number
 * of its compass width (the crest's widths numbered from 1, the smallest first). One struck twice is struck once.
 */
export const layOut = (guides) => {
  const seen = new Set();
  const kept = guides.filter((g) => {
    const id = g.type === "circle" ? `c ${g.at.map((n) => n.toFixed(2))} ${/a([\d.]+)/.exec(g.d)?.[1]}` : `l ${parsePath(g.d).map((s) => s.p.map((n) => n.toFixed(2))).sort().join(" ")}`;
    if (seen.has(id)) return false;
    seen.add(id);

    return true;
  });
  const parts = [...new Set(kept.map((g) => g.part))];
  const keys = new Map(kept.map((g) => [g, keyOf(g, parts)]));
  const order = [...kept].sort((x, y) => keys.get(x).map((n, i) => n - keys.get(y)[i]).find((n) => n !== 0) ?? kept.indexOf(x) - kept.indexOf(y));
  const radius = (g) => Math.round(Number(/a([\d.]+)/.exec(g.d)?.[1]) * 100);
  const widths = [...new Set(order.filter((g) => g.type === "circle").map(radius))].sort((a, b) => a - b);

  return order.map((g) => (g.type === "circle" ? { ...g, width: widths.indexOf(radius(g)) + 1 } : g));
};

// ---- The units.

/**
 * A unit as plain drawings: every place the crest turns or mirrors a part to is written out, with its own circles and lines, so that
 * the whole can be set anywhere. `tools.fullBuilt` is the package's own (`/animate`); it gives each place its guides.
 */
export const flatten = (unit, tools) => {
  const built = tools.fullBuilt(unit);

  return {
    guides: built.guides.map((g) => ({ ...readGuide(g), unit: 0 })),
    // A shape that was a place the unit turns or mirrors to is drawn there as it stands: it keeps its path, and loses what said it was a turn.
    shapes: unit.shapes.map((shape) => Object.fromEntries(Object.entries(shape).filter(([key]) => key !== "turn" && key !== "flip" && key !== "unit"))),
  };
};

/** The ring's two circles and its shape, as `Builder.ring` makes them: the black between a circle at the layout radius and one the ring's weight inside it. */
export const ringOf = (frame) => {
  const w = RING_WEIGHT[frame];
  const circle = (r) => [{ c: "M", p: [C + r, C] }, { c: "A", r, large: 1, sweep: 1, p: [C - r, C] }, { c: "A", r, large: 1, sweep: 1, p: [C + r, C] }, { c: "Z" }];

  return {
    guides: [R, R - w].map((r) => ({ type: "circle", part: "frame", unit: 0, at: [C, C], d: circleD([C, C], r) })),
    shape: { part: "frame", kind: "fill", d: writePath([...circle(R), ...circle(R - w)], 2), rule: "evenodd", group: 1, unit: 0 },
    room: R - w - RING_GAP,
  };
};

/** The room a ring leaves for what is inside: the layout radius with no ring. */
export const roomOf = (frame) => (frame === "none" ? R : ringOf(frame).room);

/** Whether an arrangement can be built at a count. */
export const canBuild = (arrangement, count) => (ARRANGEMENT_COUNTS[arrangement] ?? []).includes(count);

/**
 * Where the copies of a unit stand, and how big each is, in a room of radius `room`. Their layout circles touch one another and the
 * room's circle: set round a circle, `n` of them have their centres `room - r` from the centre, and `r = room * s / (1 + s)` where `s`
 * is the sine of half the angle between neighbours; in a row the `n` circles share the room's diameter.
 */
export const placings = (arrangement, count, room, reach, framed) => {
  if (arrangement === "single") return [{ k: framed ? room / reach : 1, dx: 0, dy: 0, centred: true }];
  if (arrangement === "rows" || arrangement === "facing") {
    const r = room / count;

    return Array.from({ length: count }, (_, i) => ({ k: r / R, dx: (2 * i - (count - 1)) * r, dy: 0, centred: false }));
  }
  const s = Math.sin(Math.PI / count);
  const r = (room * s) / (1 + s);
  const pitch = room - r;

  return Array.from({ length: count }, (_, i) => ({ k: r / R, dx: pitch * Math.sin((360 * i * DEG) / count), dy: -pitch * Math.cos((360 * i * DEG) / count), centred: false, pitch }));
};

/**
 * A crest composed from a unit.
 *
 * @param options - `unit`: the construction of a crest with no frame; `frame`: "none", "ring-thin" or "ring-medium"; `arrangement` and `count`
 *   (see `ARRANGEMENT_COUNTS`); `mirror`: the unit mirrored left to right.
 * @param tools - `fullBuilt` and `stepsOf`, from the package's `/animate`.
 * @returns A construction: guides, shapes and the steps that draw them, as any crest has.
 */
export const compose = ({ unit, frame = "none", arrangement = "single", count = 1, mirror = false }, tools) => {
  if (!FRAME_IDS.includes(frame)) throw new RangeError(`no frame ${frame}`);
  if (!canBuild(arrangement, count)) throw new RangeError(`${arrangement} cannot be built at ${count}`);
  const centred = arrangement === "single" && !mirror;
  // One copy at the centre is the unit itself, scaled about the centre: a turn about the centre commutes with that, so the unit keeps its turns.
  const flat = centred ? { guides: unit.guides.map((g) => ({ ...readGuide(g), unit: g.unit ?? 0 })), shapes: unit.shapes } : flatten(unit, tools);
  const motif = flat.shapes.find((shape) => shape.part !== "frame")?.part ?? "frame";
  const ring = frame === "none" ? null : ringOf(frame);
  const room = ring === null ? R : ring.room;
  const places = placings(arrangement, count, room, reachOf(flat.shapes), ring !== null);
  const guides = [];
  const shapes = [];
  let group = 0;
  if (ring !== null) {
    guides.push(...ring.guides);
    shapes.push({ ...ring.shape });
    group = ring.shape.group;
  }
  // What sets the copies out: the layout circle the lines run to, the circle their centres stand on, and a line through each centre (or the row's, or the mirror's).
  const about = (r) => ({ type: "circle", part: motif, unit: 0, at: [C, C], d: circleD([C, C], r) });
  const line = (a, b) => ({ type: "line", part: motif, unit: 0, d: lineD(a, b) });
  const through = (deg) => {
    const [a, b] = meetCircle([C, C], [C + Math.sin(deg * DEG), C - Math.cos(deg * DEG)], R);

    return line(a, b);
  };
  if (arrangement !== "single") guides.push(about(R));
  if (arrangement === "radial" || arrangement === "ring") {
    guides.push(about(room), about(places[0].pitch));
    for (let i = 0; i < count; i += 1) guides.push(through((360 * i) / count));
  } else if (arrangement === "rows") guides.push(through(90));
  else if (arrangement === "facing") guides.push(through(0));

  // The unit's own layout circle is the ring's outer circle, unless a shape of the unit takes an arc from it.
  const layoutUsed = arcCircles(flat.shapes).some((one) => Math.abs(one.r - R) < 0.05 && Math.hypot(one.c[0] - C, one.c[1] - C) < 0.05);
  const unitGroups = Math.max(0, ...flat.shapes.map((shape) => shape.group));
  // Set round a circle or in a row, each copy is the unit moved, so each is built in full where it stands. Turned about the centre, or in a
  // mirrored pair, the unit is built once and the other places are it turned or mirrored: the unit, then the turn.
  const copies = arrangement === "radial" || arrangement === "facing" ? 1 : count;
  const built = [];
  let firstBase = group;
  for (let i = 0; i < copies; i += 1) {
    const m = { flip: mirror, k: places[i].k, dx: places[i].dx, dy: places[i].dy };
    for (const g of flat.guides) {
      const placed = placeGuide(g, m, places[i].centred && ring !== null, layoutUsed);
      if (placed !== null) guides.push(placed);
    }
    const base = group;
    if (i === 0) firstBase = base;
    for (const s of flat.shapes) {
      const placed = { ...s, d: placePath(s.d, m, digitsOf(s.d, m)), ...(s.kind === "stroke" ? { width: round2((s.width ?? 0) * m.k) } : {}), group: base + s.group, unit: s.unit ?? 0 };
      shapes.push(placed);
      if (i === 0) built.push(placed);
    }
    group = base + unitGroups;
  }
  // Turned about the centre, or mirrored, the first copy's shapes are the unit's, taken to each other place.
  const others = arrangement === "radial" ? Array.from({ length: count - 1 }, (_, i) => ({ turn: (360 * (i + 1)) / count, n: i + 1 })) : arrangement === "facing" ? [{ turn: 0, flip: true, n: 1 }] : [];
  for (const place of others) {
    for (const s of built) {
      const turned = place.turn > 180 ? place.turn - 360 : place.turn;
      shapes.push({ ...s, d: placePath(s.d, { k: 1, turn: place.turn, flip: place.flip === true }, Math.max(3, decimalsOf(s.d))), group: s.group - firstBase + group, unit: place.n, turn: turned, ...(place.flip === true ? { flip: true } : {}) });
    }
    group += unitGroups;
  }
  const laid = layOut(guides);

  return { guides: laid, shapes, steps: tools.stepsOf(laid, shapes) };
};

/** Whether two sets of shapes are the same drawing: the same shapes, each with the same moves, lines and arcs, every point within `within`. */
export const sameDrawing = (a, b, within = 0.1) =>
  a.length === b.length &&
  a.every((shape, i) => {
    const [x, y] = [parsePath(shape.d), parsePath(b[i].d)];

    return shape.part === b[i].part && x.length === y.length && x.every((s, k) => s.c === y[k].c && (s.p === undefined || Math.hypot(s.p[0] - y[k].p[0], s.p[1] - y[k].p[1]) <= within) && Math.abs((s.r ?? 0) - (y[k].r ?? 0)) <= within);
  });

// ---- What the page offers, from the catalogue's records.

/** Whether a record is a unit: one motif, no frame, a drawing the package has finished (not one still being redrawn). */
const isUnit = (record) => record.frame === "none" && record.motifs.length === 1 && record.redrawing !== true;

/**
 * The crest that stands for a motif: of the crests that are only that motif with no frame, the plain one of one (count 1, single), else
 * the family's plain form, else the first in the books' order.
 */
export const unitFor = (records, motif) =>
  records
    .filter((record) => isUnit(record) && record.motifs[0].motif === motif)
    .sort((a, b) => Number(!(a.motifs[0].count === 1 && a.motifs[0].arrangement === "single")) - Number(!(b.motifs[0].count === 1 && b.motifs[0].arrangement === "single")) || Number(a.variantKind !== "base") - Number(b.variantKind !== "base") || a.no - b.no)[0] ?? null;

/** Every motif that has a unit, with it. */
export const unitsOf = (records) => {
  const units = new Map();
  for (const record of records) if (isUnit(record) && !units.has(record.motifs[0].motif)) units.set(record.motifs[0].motif, unitFor(records, record.motifs[0].motif));

  return units;
};

/** Whether the unit is turned one way or the other (a tomoe): its mirror is another crest. */
export const isChiral = (record) => record.stats.symmetry.mirror === false;

/** The way the composed motif turns: the unit's, or the other when it is mirrored; undefined where the catalogue names none. */
export const turnOf = (record, mirror) => {
  const own = record.motifs[0].turn;

  return own === undefined ? undefined : mirror ? (own === "left" ? "right" : "left") : own;
};

/**
 * The crests of the catalogue that have these parts: the frame, the motif, how many of it, how it is set out and which way it turns. The
 * catalogue's own words for the parts, so "the same parts" is as exact as the catalogue's grammar: a ring of upright copies is `ring`
 * or `triangle` there (and `radial` for a symmetric motif, as 三つ盛り唐花 is written), copies turned about the centre are `radial`.
 * Only a unit that is one of its motif can be counted up; a mirrored unit with no left or right in the catalogue is not matched.
 */
export const sameParts = (records, { unit, frame, arrangement, count, mirror = false }) => {
  const use = unit.motifs[0];
  if (isChiral(unit) && mirror && use.turn === undefined) return [];
  if (arrangement !== "single" && (use.count !== 1 || use.arrangement !== "single")) return [];
  const total = use.count * count;
  const wanted = arrangement === "single" ? [use.arrangement] : arrangement === "ring" ? (isChiral(unit) ? ["ring", "triangle"] : ["ring", "triangle", "radial"]) : [arrangement];
  const turn = turnOf(unit, mirror);

  return records.filter((record) => record.frame === frame && record.motifs.length === 1 && record.motifs[0].motif === use.motif && record.motifs[0].count === total && wanted.includes(record.motifs[0].arrangement) && record.motifs[0].turn === turn && record.redrawing !== true);
};

/**
 * What the crest is called, in a language, in the crest grammar: the motif's name (with the way it turns, where the catalogue names one;
 * a unit with a count in its own name, such as 梅鉢 or 三つ葉葵, by its own name), said with the count and the arrangement, then the frame.
 * `terms` are the vocabulary's `MOTIFS` and `TURNS`, `say(key, values, lang)` gives the page's words and `countName(n, lang)` the count's.
 */
export const nameOf = (spec, terms, say, countName, lang) => {
  const { unit, frame, arrangement, count, mirror = false } = spec;
  const use = unit.motifs[0];
  const motif = terms.motifs.find((one) => one.id === use.motif);
  const turn = terms.turns.find((one) => one.id === turnOf(unit, mirror));
  const plain = use.count === 1 && use.arrangement === "single";
  // A unit that is one of its motif is named for the motif; a left tomoe is named for the way it turns, and a mirrored one of no named turn says so.
  let name = plain && !(isChiral(unit) && turn === undefined) ? (turn === undefined ? motif[lang] : lang === "ja" ? `${turn.ja}${motif.ja}` : `${turn.en} ${motif.en.toLowerCase()}`) : unit.name[lang];
  if (turn === undefined && mirror && isChiral(unit)) name = say("bn_mirrored", { name }, lang);
  if (arrangement !== "single") name = say(`bn_${arrangement}`, { name, n: countName(count, lang) }, lang);

  return say(`bn_frame_${frame}`, { name }, lang);
};
