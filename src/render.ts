// The one place a crest's construction becomes SVG text: the finished crest, and the same crest drawn step by step.
// Pure functions on strings: no DOM, no network. The build calls them to write each crest's module, and the package
// calls them to draw the construction animation, so the last frame of one is the other.

/**
 * A line of the crest's layout, drawn thin: a compass circle, always struck in full, or a ruler line.
 *
 * @example
 * ```ts
 * import type { Guide } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const ring: Guide = { type: "circle", d: "M196 100a96 96 0 1 1-192 0a96 96 0 1 1 192 0z" };
 * console.log(ring.type); // "circle"
 * ```
 */
export interface Guide {
  type: "circle" | "line";
  d: string;
  /** The part it is struck for: "frame", or a motif's id. Every guide of the package's crests has one; one written by hand may leave it out. */
  part?: string;
  /** Guides are struck for the unit that is drawn, which is unit 0. */
  unit?: number;
  /** For a circle: its centre, where the compass point goes. */
  at?: [number, number];
  /** For a circle: its compass width's number. The crest's widths are numbered from 1, the smallest first, and a centre is marked with the number of the width struck from it. */
  width?: number;
  /** For a circle that bounds the gap cut in a piece where another passes over it: its step is captioned as a gap circle. */
  gap?: true;
  /** For a circle the compass is stepped round at the circle's own width, from the top, clockwise: the six points it marks, the corners of a hexagon. */
  marks?: [number, number][];
}

/**
 * One shape of the crest, belonging to a named part: solid (`fill`) or a line of one weight (`stroke`).
 *
 * @example
 * ```ts
 * import type { Shape } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const bar: Shape = { part: "bar", kind: "fill", d: "M30 30h140v24H30z", group: 1 };
 * console.log(bar.part); // "bar"
 * ```
 */
export interface Shape {
  part: string;
  kind: "fill" | "stroke";
  d: string;
  width?: number;
  /** For a stroke: `butt` ends it square where it stops (a break in a ring); left out, its ends are round. */
  cap?: "butt";
  rule?: "evenodd";
  group: number;
  /** Which of its part's units it is: 0 for the unit that is laid out and drawn, 1 and up for that unit turned to each other place. Every shape of the package's crests has one. */
  unit?: number;
  /** For a shape that is the unit already drawn, turned to another place: the degrees, clockwise about the centre (100, 100). */
  turn?: number;
  /** For such a shape: the unit is mirrored left to right before it is turned. */
  flip?: true;
}

/**
 * One step of the construction, in the order of a crest painter's six phases:
 *
 * 1. the compass underdrawing, width by width: `centres` marks the centres of the circles of one width, `guide` strikes each circle, and `mark` steps the compass round a circle to mark a hexagon's corners;
 * 2. the ruled underdrawing: `guide`, for a line, rules it full length, from edge to edge of the layout circle;
 * 3. `trace`: only what is needed of the underdrawing is traced, a group of shapes' outlines, thin, along circles and lines already there;
 * 4. `thicken`: the traced outlines are made heavier;
 * 5. `draw` fills a group of shapes, and `turn` builds the unit again at each of its other places (the shapes that are that unit turned or mirrored): the same guides struck there, then its ink;
 * 6. `fade`: finished, the guides flash bold for a moment, then are rubbed out.
 *
 * `fullBuilt` replaces each `turn` by the steps of each place it builds, with the same steps as the unit (a `place` on each says which).
 *
 * @example
 * ```ts
 * import type { Step } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const steps: Step[] = [{ op: "guide", guide: 0 }, { op: "trace", shapes: [0] }, { op: "draw", part: "frame", shapes: [0] }, { op: "fade" }];
 * console.log(steps.map((step) => step.op)); // ["guide", "trace", "draw", "fade"]: every guide before the first trace
 * ```
 */
export type Step = (
  | { op: "centres"; guides: number[] }
  | { op: "guide"; guide: number }
  | { op: "mark"; guide: number }
  | { op: "trace"; shapes: number[] }
  | { op: "thicken"; shapes: number[] }
  | { op: "draw"; part: string; shapes: number[] }
  | { op: "turn"; shapes: number[] }
  | { op: "fade" }
) & {
  /** For a step of a place built in full (`fullBuilt`): which place it builds, counting from 1 at the unit, and how many places the part has. */
  place?: [number, number];
};

/**
 * A crest's construction: its layout guides, its shapes and the steps that draw them. The shapes are the paths of the
 * finished crest.
 *
 * @example
 * ```ts
 * import type { Construction } from "@johnmorrisdotca/kamon-crests/animate";
 * import { crestSteps } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const construction: Construction | null = await crestSteps("janome");
 * console.log(construction?.shapes.length); // 1
 * ```
 */
export interface Construction {
  guides: Guide[];
  shapes: Shape[];
  steps: Step[];
  /** For one part shown alone (`isolated()`): the step to hold it at, with its guides struck and its shapes drawn, or one of them for a count. */
  rest?: number;
  /** For a construction played with the pen drawing the ink, as `ink-draw="on"` asks (the element sets it): `durationOf`, `stepTimes` and `stepAt` then count that pace. Left out, the ink fades in quickly. */
  inkDraw?: boolean;
  /** For a crest still traced from a crest book and being redrawn as a compass construction: it has no guides and no steps, and is shown finished. */
  redrawing?: true;
}

/** The page every crest is drawn on: 200 by 200, the crest's centre at 100, 100. */
export const VIEW_BOX = "0 0 200 200";

const escapeText = (text: string): string => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const shapeAttributes = (shape: Shape): string =>
  shape.kind === "stroke" ? `fill="none" stroke="currentColor" stroke-width="${shape.width}"${shape.cap === "butt" ? ' stroke-linecap="butt"' : ""}` : shape.rule === "evenodd" ? 'fill-rule="evenodd"' : "";

const pathOf = (shape: Shape, extra = ""): string => {
  const attributes = [shapeAttributes(shape), extra].filter(Boolean).join(" ");

  return `<path${attributes === "" ? "" : ` ${attributes}`} d="${shape.d}"/>`;
};

/** A shape as line art: its outline, unfilled, at a weight (a shape that is a line already is left as it is). */
const outlineOf = (shape: Shape, weight = ".6"): string => (shape.kind === "stroke" ? pathOf(shape) : `<path fill="none" stroke="currentColor" stroke-width="${weight}" d="${shape.d}"/>`);

/**
 * The steps a construction is played in, by the six phases (see `Step`): the circles of the underdrawing, each run of one part and
 * one compass width after a step that marks its centres; the lines ruled; each group of shapes traced; the outlines thickened;
 * each group filled, and after a unit the shapes that are it turned, built at their places as one step; then the guides rubbed out.
 *
 * @param guides - The layout guides, in the order they are struck.
 * @param shapes - The shapes, in the order they are drawn; shapes of one group and one part are drawn together.
 * @returns The ordered steps.
 *
 * @example
 * ```ts
 * import { stepsOf } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const steps = stepsOf([{ type: "circle", d: "M0 0" }], [{ part: "frame", kind: "fill", d: "M0 0", group: 1 }]);
 * console.log(steps.map((step) => step.op)); // ["guide", "trace", "thicken", "draw", "fade"]
 * ```
 */
export const stepsOf = (guides: readonly Guide[], shapes: readonly Shape[]): Step[] => {
  const steps: Step[] = [];
  // A circle the compass is stepped round is stepped once the circles of its width are struck.
  let stepped: Step[] = [];
  guides.forEach((guide, i) => {
    if (guide.type !== "circle") return;
    const last = steps[steps.length - 1];
    const before = last?.op === "guide" ? guides[last.guide] : undefined;
    // The centres of one part's circles of one width, struck one after another, are marked together before the first of them.
    if (guide.at !== undefined && !(before?.type === "circle" && before.part === guide.part && before.width === guide.width)) {
      const run: number[] = [];
      for (let k = i; k < guides.length && guides[k].type === "circle" && guides[k].part === guide.part && guides[k].width === guide.width; k += 1) run.push(k);
      steps.push(...stepped.splice(0), { op: "centres", guides: run });
    }
    steps.push({ op: "guide", guide: i });
    if (guide.marks !== undefined) stepped.push({ op: "mark", guide: i });
  });
  steps.push(...stepped);
  stepped = [];
  // The ruled lines belong to the underdrawing too: every one is ruled before anything is traced.
  guides.forEach((guide, i) => {
    if (guide.type !== "circle") steps.push({ op: "guide", guide: i });
  });
  const inked: Step[] = [];
  for (let i = 0; i < shapes.length; ) {
    let end = i;
    const turned = (shape: Shape): boolean => shape.turn !== undefined;
    while (end + 1 < shapes.length && turned(shapes[end + 1]) === turned(shapes[i]) && (turned(shapes[i]) || (shapes[end + 1].group === shapes[i].group && shapes[end + 1].part === shapes[i].part))) end += 1;
    const run = Array.from({ length: end - i + 1 }, (_, k) => i + k);
    inked.push(turned(shapes[i]) ? { op: "turn", shapes: run } : { op: "draw", part: shapes[i].part, shapes: run });
    if (!turned(shapes[i])) steps.push({ op: "trace", shapes: run });
    i = end + 1;
  }
  const unit = shapes.flatMap((shape, i) => (shape.turn === undefined ? [i] : []));
  if (unit.length > 0) steps.push({ op: "thicken", shapes: unit });
  steps.push(...inked);
  if (guides.length > 0) steps.push({ op: "fade" });

  return steps;
};

/**
 * Options for the finished crest.
 *
 * @example
 * ```ts
 * import type { StaticOptions } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const looking: StaticOptions = { guides: true };
 * console.log(looking.guides); // true
 * ```
 */
export interface StaticOptions {
  /** Draw the layout guides faintly under the crest (for looking at a construction; not part of the crest). */
  guides?: boolean;
  /** `false` draws the crest as line art: each shape's own outline, the arcs and ruled lines it is constructed from, thin and unfilled, so that a white line shows as its two edges. */
  fill?: boolean;
}

/**
 * The finished crest: one `<path>` for each shape, solid in the page's text colour (`currentColor`) and with no
 * background, no raster and no script. The line weights are the shapes' own.
 *
 * @param construction - A crest's guides and shapes (`crestSteps()` loads them).
 * @param options - `guides` draws the layout faintly under the crest, for looking at a construction.
 * @returns The SVG string, the same as the crest's own module.
 *
 * @example
 * ```ts
 * import { staticSvg } from "@johnmorrisdotca/kamon-crests/animate";
 * import crest from "@johnmorrisdotca/kamon-crests/crests/janome";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/janome";
 *
 * console.log(staticSvg(construction) === crest); // true
 * ```
 */
export const staticSvg = (construction: Pick<Construction, "guides" | "shapes">, options: StaticOptions = {}): string => {
  const guides = options.guides === true ? construction.guides.map((g) => `<path fill="none" stroke="#c0392b" stroke-width=".6" d="${g.d}"/>`).join("") : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${construction.shapes.map((s) => (options.fill === false ? outlineOf(s) : pathOf(s))).join("")}${guides}</svg>`;
};

/**
 * The ways a looping crest can leave once it is drawn: `fade` fades it out; `scatter` sends each part out from the centre, turning;
 * `spin` turns the whole crest and shrinks it to nothing; `twirl` spins each part about its own middle as it shrinks; `fall` drops
 * the parts out of sight; `close` closes a circle over it, like a shutter.
 *
 * @example
 * ```ts
 * import { EXITS } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * console.log(EXITS.includes("scatter")); // true
 * ```
 */
export const EXITS = ["fade", "scatter", "spin", "twirl", "fall", "close"] as const;
/**
 * One of `EXITS`.
 *
 * @example
 * ```ts
 * import type { Exit } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const leave: Exit = "scatter";
 * console.log(leave); // "scatter"
 * ```
 */
export type Exit = (typeof EXITS)[number];

/**
 * Options for the construction animation.
 *
 * @example
 * ```ts
 * import type { AnimateOptions } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const slow: AnimateOptions = { speed: 0.5, loop: true, id: "hero" };
 * console.log(slow.speed); // 0.5
 * ```
 */
export interface AnimateOptions {
  /** 1 is the usual pace; 2 is twice as fast, 0.5 twice as slow. */
  speed?: number;
  /** Play again from the start, after a pause, until the page is closed. */
  loop?: boolean;
  /**
   * With `loop`, how the finished crest leaves before it is drawn again: it is held for two seconds, then goes in about a second.
   * One of `EXITS` by name, or `true` for all of them, chosen by a `data-exit` attribute on the drawing (the element picks a new
   * one at random each time round). Left out or `false`, the finished crest is held a moment and drawn again.
   */
  exit?: boolean | Exit;
  /** A name for this drawing's styles, so that two on one page do not share them. Letters, digits and hyphens. */
  id?: string;
  /** How much of the layout to show: the guides are drawn thin and rubbed out at the end. */
  guides?: boolean;
  /** `false` leaves out the dots that mark the circles' centres. */
  centres?: boolean;
  /** `false` leaves out the compass-width numbers beside the centres. */
  widths?: boolean;
  /** `false` never fills: the crest stays line art, each shape's own outline. */
  fill?: boolean;
  /** `false` leaves out the compass arm: the thin line from a circle's centre to the pen while the circle is struck or one of its arcs is inked, and that centre's dot made bold. */
  compassArm?: boolean;
  /**
   * `true` (or `"right"`) adds the widths key, off unless it is asked for: one row, the compass opened to the width it is set to, a line as long as that width's
   * radius, drawn to the same scale as the crest, with the centre dot and the number at its left end. As each circle is struck the number changes and the line grows
   * or shrinks to the new width; the box holds the longest, so it is the same size from the first step to the last, however many widths the crest uses.
   * It stands in a margin outside the crest's 200 by 200 square, so the crest itself never moves or shrinks: the view box is wider
   * (`true` or `"right"`, the key to the right of the crest) or taller (`"below"`) while the key is on; left out or `false`, the box is the crest's square. It belongs to the underdrawing,
   * so it goes with the guides, and a crest with no circles has none.
   */
  widthsKey?: boolean | "right" | "below";
  /** `true` has the pen draw the ink: every outline along its length, one after another, clockwise, over a few seconds, the tracing and then the thickening, and the compass arm follows it on the arcs. Left out or `false`, the ink fades in quickly, under a second a step. A still step shows the finished ink either way. */
  inkDraw?: boolean;
  /** `true` builds every place the unit is turned or mirrored to as the first unit was: its circles struck one by one, its lines ruled, its outline traced and thickened, then filled, one place after another, clockwise (see `fullBuilt`). Left out, a place is built in one quick step. */
  fullBuild?: boolean;
}

/** An arc: its centre, where it starts, how far it turns (degrees, clockwise) and where along its path it runs (0 to 1). */
interface Arc {
  cx: number;
  cy: number;
  x: number;
  y: number;
  turn: number;
  from: number;
  to: number;
}

/** The arcs of a shape's path data, as the package writes it: a move, then relative lines and arcs. */
export const arcsOf = (d: string): Arc[] => {
  const tokens = d.match(/[a-z]|-?\d*\.?\d+/gi) ?? [];
  const arcs: Arc[] = [];
  let [x, y, sx, sy, length, i, k] = [0, 0, 0, 0, 0, 0, ""];
  const take = (): number => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[a-z]/i.test(tokens[i])) k = tokens[i++].toLowerCase();
    let [nx, ny, r, large, sweep] = [x, y, 0, 0, 0];
    if (k === "z") [nx, ny] = [sx, sy];
    else if (k === "h") nx += take();
    else if (k === "v") ny += take();
    else {
      if (k === "a") [r, , , large, sweep] = [take(), take(), take(), take(), take()];
      [nx, ny] = [x + take(), y + take()];
    }
    const chord = Math.hypot(nx - x, ny - y);
    if (k === "m") [sx, sy, k] = [nx, ny, "l"];
    else if (r > 0 && chord >= 0.02) {
      const h = (Math.sqrt(Math.max(0, r * r - (chord * chord) / 4)) * (large === sweep ? -1 : 1)) / chord;
      const [cx, cy] = [(x + nx) / 2 + h * (y - ny), (y + ny) / 2 + h * (nx - x)];
      const round = (((Math.atan2(ny - cy, nx - cx) - Math.atan2(y - cy, x - cx)) * 180) / Math.PI + 720) % 360;
      arcs.push({ cx, cy, x, y, turn: sweep ? round : round - 360, from: length, to: (length += (r * (sweep ? round : 360 - round) * Math.PI) / 180) });
    } else length += chord;
    [x, y] = [nx, ny];
  }

  return arcs.map((arc) => ({ ...arc, from: arc.from / length, to: arc.to / length }));
};

/** A guide circle as one arc: struck from its top, once round, clockwise. */
const roundOf = (guide: Guide): Arc[] => (guide.at === undefined ? [] : [{ cx: guide.at[0], cy: guide.at[1], x: guide.at[0], y: guide.at[1] - Number(/a([\d.]+)/.exec(guide.d)?.[1]), turn: 360, from: 0, to: 1 }]);

/**
 * The compass arm for an arc: a thin line from the arc's centre to the pen where the arc starts (or, with `end`, where it ends),
 * and the centre's dot made bold, where the underdrawing marked a centre there (for a unit built at another place, where its own
 * centre stands at that place). An arm with no dot is an arc no struck circle gave.
 */
const armOf = (construction: Construction, arc: Arc, attributes: string, end = false, shape?: Shape): string => {
  const a = end ? (arc.turn * Math.PI) / 180 : 0;
  const [dx, dy] = [arc.x - arc.cx, arc.y - arc.cy];
  const centre = `${n3(arc.cx)}" cy="${n3(arc.cy)}`;
  // A unit built at another place has its centres there: the unit's own, turned (and mirrored) with it.
  const back = (-(shape?.turn ?? 0) * Math.PI) / 180;
  const home = (x: number, y: number): number[] => {
    const hx = (x - 100) * Math.cos(back) - (y - 100) * Math.sin(back);

    return [100 + (shape?.flip === true ? -hx : hx), 100 + (x - 100) * Math.sin(back) + (y - 100) * Math.cos(back)];
  };
  const [at, from, r] = [home(arc.cx, arc.cy), home(arc.x, arc.y), Math.hypot(dx, dy)];
  // An arc too short, or too near a half circle, to give its centre exactly from ends written to two decimals is held by its start standing on the circle.
  const loose = r * Math.abs(arc.turn) < 230 || Math.abs(arc.turn) > 165;
  const marked = construction.guides.some((guide) => {
    const off = Math.hypot((guide.at?.[0] ?? 999) - at[0], (guide.at?.[1] ?? 0) - at[1]);
    const width = Number(/a([\d.]+)/.exec(guide.d)?.[1]);

    return off < 0.1 || (loose && off < 1.5 && Math.abs(width - r) < 0.15 && Math.abs(Math.hypot(guide.at![0] - from[0], guide.at![1] - from[1]) - width) < 0.05);
  });

  return `<g ${attributes}><path fill="none" d="M${centre.replace('" cy="', " ")}L${n3(arc.cx + dx * Math.cos(a) - dy * Math.sin(a))} ${n3(arc.cy + dx * Math.sin(a) + dy * Math.cos(a))}"/>${marked ? `<circle cx="${centre}" r="1.8"/>` : ""}</g>`;
};

const sanitize = (id: string): string => id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 40) || "k";
const n3 = (n: number): string => String(Math.round(n * 1000) / 1000);

/** The widths key, a ruler: where its centre dot stands, the radius of each width the crest uses, the longest of them, and which of the two rows under the bar each width's number goes in (none when neither has room). */
interface Key {
  box: string;
  x: number;
  y: number;
  radii: Map<number, number>;
  longest: number;
  labels: Map<number, 0 | 1 | null>;
}

/** The key's look: the colour, font and size of the marks beside the centres. */
const KEY_LOOK = 'fill="currentColor" stroke="currentColor" font-size="5" font-family="sans-serif"';
/** About how wide one digit of the key's numbers is, and the least gap between two numbers in a row. */
const DIGIT = 2.8;
const LABEL_GAP = 1.2;
/**
 * The widths key of a construction, a ruler: one bar as long as the widest the compass opens, at the crest's own scale, from the
 * centre's dot, with a tick at every width the crest uses and its number, so that a compass can be set from it. The view box makes
 * room for it beside the crest's 200 by 200 square or below it, and is the same from the first step to the last, however many
 * widths the crest uses. Null when the key is off, or the crest strikes no circle.
 */
const keyOf = (construction: Construction, where: AnimateOptions["widthsKey"]): Key | null => {
  if (where === undefined || where === false) return null;
  const radii = new Map<number, number>();
  for (const step of construction.steps) {
    for (const i of step.op === "centres" ? step.guides : step.op === "guide" || step.op === "mark" ? [step.guide] : []) {
      const guide = construction.guides[i];
      if (guide.type === "circle" && guide.width !== undefined) radii.set(guide.width, Number(/a([\d.]+)/.exec(guide.d)?.[1]));
    }
  }
  if (radii.size === 0) return null;
  const longest = Math.max(...radii.values());
  // Each width's number under its tick, in the first of the two rows with room for it beside the last number there, or none;
  // placed from the widest down, so that the end of the bar is always numbered.
  const labels = new Map<number, 0 | 1 | null>();
  const last: [number, number][] = [[Infinity, 0], [Infinity, 0]];
  for (const [width, r] of [...radii].sort((a, b) => b[1] - a[1] || b[0] - a[0])) {
    const half = (String(width).length * DIGIT) / 2;
    const row = ([0, 1] as const).find((one) => r + half + LABEL_GAP <= last[one][0] - last[one][1]) ?? null;
    if (row !== null) last[row] = [r, half];
    labels.set(width, row);
  }
  // The ruler's room: its bar, a gap and a number's room.
  const room = Math.ceil(longest) + 10;
  // Below the crest, the bar is centred under it exactly.
  if (where === "below") return { box: "0 0 200 226", x: (200 - longest) / 2, y: 207, radii, longest, labels };

  return { box: `0 0 ${210 + room + 8} 200`, x: 210, y: 100, radii, longest, labels };
};

/** A width's number on the ruler, centred on its tick: the one the compass is set to above the bar, the scale's in two rows under it. */
const labelOf = (key: Key, width: number, row: -1 | 0 | 1): string =>
  `<text x="${n3(key.x + key.radii.get(width)!)}" y="${n3(row === -1 ? key.y - 2.6 : key.y + 6.4 + row * 5.2)}" text-anchor="middle" stroke="none">${width}</text>`;
/** The ruler, faint: the bar from the centre's dot, a short tick at every width and the numbers that have room. */
const rulerOf = (key: Key): string =>
  `<path fill="none" d="M${n3(key.x)} ${n3(key.y)}h${n3(key.longest)}"/><circle cx="${n3(key.x)}" cy="${n3(key.y)}" r=".9"/><g opacity=".4" stroke-width=".5"><path fill="none" d="${[...key.radii.values()].map((r) => `M${n3(key.x + r)} ${n3(key.y - 1.2)}v2.4`).join("")}"/>${[...key.labels].map(([width, row]) => (row === null ? "" : labelOf(key, width, row))).join("")}</g>`;
/** The width a compass is opened to for an inked arc: the crest's width of that radius, or none where no struck circle gave it. */
const widthOfArc = (key: Key, arc: Arc): number | undefined => {
  const r = Math.hypot(arc.x - arc.cx, arc.y - arc.cy);
  let best: [number, number] | undefined;
  for (const [width, radius] of key.radii) if (Math.abs(radius - r) < 0.05 && (best === undefined || Math.abs(radius - r) < best[1])) best = [width, Math.abs(radius - r)];

  return best?.[0];
};
/** The width the compass is set to, on the ruler: its tick long, and its number bold above the bar. */
const markOf = (key: Key, width: number, attributes = ""): string =>
  `<g${attributes} font-weight="bold"><path fill="none" d="M${n3(key.x + key.radii.get(width)!)} ${n3(key.y - 2)}v4"/>${labelOf(key, width, -1)}</g>`;

interface Timed {
  /** When a step starts and ends, in seconds; for a turn, the seconds it gives each place. */
  t0: number;
  t1: number;
  per?: number;
}

/**
 * How long a construction takes to play at speed 1, in seconds (the pause at the end of a loop not counted).
 *
 * @param construction - A crest's construction (only its steps are read).
 * @returns The seconds; more for a crest with more to draw.
 *
 * @example
 * ```ts
 * import { durationOf } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/mitsuba-aoi";
 *
 * console.log(durationOf(construction) > 5); // true
 * ```
 */
export const durationOf = (construction: Timing): number => timeline(construction).total;

/** A loop holds the finished crest this long; with an exit, it is held EXIT_HOLD, goes in EXIT_GO, and the page is empty for EXIT_GAP. */
const LOOP_HOLD = 1.4;
const EXIT_HOLD = 2;
const EXIT_GO = 1.1;
const EXIT_GAP = 0.4;

/**
 * How long one time round a looping construction takes at speed 1, in seconds: the drawing and the pause after it (and, with an
 * exit, the crest leaving).
 *
 * @param construction - A crest's construction.
 * @param exit - Whether the crest leaves before it is drawn again.
 * @returns The seconds.
 *
 * @example
 * ```ts
 * import { durationOf, loopSeconds } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/janome";
 *
 * console.log(loopSeconds(construction, true) > durationOf(construction)); // true
 * ```
 */
export const loopSeconds = (construction: Timing, exit = false): number => durationOf(construction) + (exit ? EXIT_HOLD + EXIT_GO + EXIT_GAP : LOOP_HOLD);

const GUIDE_TRACE = 0.45;
const GUIDE_GAP = 0.16;
const GUIDE_ALL = 7;
const FADE = 0.7;
/** Before the guides are rubbed out they flash: brighter, at their own width, for this long, so the eye sees what is about to go. */
const FLASH = 0.3;
/** A turn goes round the other places one at a time: the seconds for a place (its guides struck, then its shapes inked), and for the whole turn when there are many. */
const PLACE = 0.7;
const PLACES = 4.5;
/** How long each other kind of step lasts, and how long until the next of its kind starts. */
const PACE: Record<string, [number, number]> = { centres: [0.3, 0.3], mark: [0.6, 0.6], trace: [0.9, 0.42], thicken: [0.5, 0.5], draw: [0.4, 0.25], fade: [FLASH + FADE, FLASH + FADE] };

/** Which place a turned shape is at: shapes of one part, one turn and one flip are one place. */
const placeKey = (shape: Shape): string => `${shape.part} ${shape.turn} ${shape.flip === true}`;

/** What the pace of a construction is read from: its steps, and (for the pen's ink) its shapes and whether the ink is drawn. */
type Timing = Pick<Construction, "steps"> & Partial<Pick<Construction, "shapes" | "inkDraw">>;

/** How many numbers a path command takes (the package writes moves, lines, arcs and curves). */
const ARITY: Record<string, number> = { m: 2, l: 2, h: 1, v: 1, a: 7, c: 6, z: 0 };

/** The length of a path's outline, near enough to share the pen's time between shapes: lines and arcs exactly, a curve by its control polygon. */
const measure = (d: string): [number, number, number, number[]] => {
  let [x, y, sx, sy, total] = [0, 0, 0, 0, 0];
  const box = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [, letter, args] of d.matchAll(/([a-z])([^a-z]*)/gi)) {
    const k = letter.toLowerCase();
    const n = ARITY[k] ?? 0;
    const numbers = (args.match(/-?\d*\.?\d+/g) ?? []).map(Number);
    if (k === "z") total += Math.hypot(sx - x, sy - y);
    if (k === "z") [x, y] = [sx, sy];
    for (let i = 0; n > 0 && i + n <= numbers.length; i += n) {
      const p = numbers.slice(i, i + n);
      const [ox, oy] = letter === k ? [x, y] : [0, 0];
      const [nx, ny] = k === "h" ? [ox + p[0], y] : k === "v" ? [x, oy + p[0]] : [ox + p[n - 2], oy + p[n - 1]];
      const chord = Math.hypot(nx - x, ny - y);
      if (k === "m" && i === 0) [sx, sy] = [nx, ny];
      else if (k === "a" && p[0] > 0) total += p[0] * (p[3] === 1 ? 2 * Math.PI - 2 * Math.asin(Math.min(1, chord / (2 * p[0]))) : 2 * Math.asin(Math.min(1, chord / (2 * p[0]))));
      else if (k === "c") total += (chord + Math.hypot(ox + p[0] - x, oy + p[1] - y) + Math.hypot(p[2] - p[0], p[3] - p[1]) + Math.hypot(nx - ox - p[2], ny - oy - p[3])) / 2;
      else total += chord;
      [x, y] = [nx, ny];
      [box[0], box[1], box[2], box[3]] = [Math.min(box[0], x), Math.min(box[1], y), Math.max(box[2], x), Math.max(box[3], y)];
    }
  }

  return [total, x, y, box];
};
const lengthOf = (d: string): number => measure(d)[0];
/** Where a path's pen ends: after a close, the start of the last subpath. */
const endOf = (d: string): [number, number] => {
  const [, x, y] = measure(d);

  return [x, y];
};

/**
 * A path's subpaths, each as a path of its own that starts with an absolute move, and the share of the whole outline's length
 * each one has, in order. A browser starts the dashes again at every subpath, so the pen draws each one on its own, in its turn.
 */
const piecesOf = (d: string): { d: string; from: number; to: number }[] => {
  const parts = d.split(/(?=[mM])/).filter((part) => part.trim() !== "");
  let [x, y] = [0, 0];
  const pieces = parts.map((part) => {
    const head = /^([mM])\s*(-?\d*\.?\d+)[\s,]*(-?\d*\.?\d+)([\s\S]*)$/.exec(part);
    if (head === null) return part;
    const [, letter, a, b, rest] = head;
    const [sx, sy] = letter === "M" ? [Number(a), Number(b)] : [x + Number(a), y + Number(b)];
    const piece = `M${n3(sx)} ${n3(sy)}${/^[\s,]*[-.\d]/.test(rest) ? (letter === "M" ? "L" : "l") : ""}${rest}`;
    [x, y] = endOf(piece);

    return piece;
  });
  const lengths = pieces.map(lengthOf);
  const total = lengths.reduce((sum, one) => sum + one, 0) || 1;
  let at = 0;

  return pieces.map((piece, i) => ({ d: piece, from: at / total, to: (at += lengths[i]) / total }));
};

/** The pen draws about this many units of outline a second, over 2.5 to 4 seconds a step, and all the crest's inking is held to about INK_ALL seconds. */
const INK_SPEED = 110;
const INK_ALL = 20;

/** Each step's length of outline for the pen: a trace goes over every shape, a thickening over the filled ones (a line is one weight). Zero for any other step. */
const inkLengths = (construction: Timing): number[][] =>
  construction.steps.map((step) => (step.op === "trace" || step.op === "thicken" ? step.shapes.map((i) => (construction.shapes?.[i] === undefined || (step.op === "thicken" && construction.shapes[i].kind !== "fill") ? 0 : lengthOf(construction.shapes[i].d))) : []));

/** The seconds the pen takes over each step's ink, 0 where it is not drawn: the quick fade stands for a step with no outline to draw, or when the ink is not drawn. */
const inkTimes = (construction: Timing): number[] => {
  const wanted = construction.inkDraw !== true ? [] : inkLengths(construction).map((lengths) => lengths.reduce((a, b) => a + b, 0) / INK_SPEED);
  const clamped = wanted.map((seconds) => (seconds > 0 ? Math.min(4, Math.max(2.5, seconds)) : 0));
  const scale = Math.min(1, INK_ALL / Math.max(1, clamped.reduce((a, b) => a + b, 0)));

  return construction.steps.map((_, i) => (clamped[i] > 0 ? Math.max(0.9, clamped[i] * scale) : 0));
};

/** Outlining, thickening and filling: the steps whose second showing of a shape plays at REPEAT times the pace. */
const REPEATABLE = new Set(["trace", "thicken", "draw"]);
const REPEAT = 2;

/**
 * Which steps only do again what an earlier step of the same kind did: the same number of shapes, of the same kinds and the
 * same outline lengths (a copy moved, turned or mirrored). The eye has seen it once, so it plays twice as fast.
 */
const repeats = (construction: Timing): boolean[] => {
  const seen = new Set<string>();

  return construction.steps.map((step) => {
    if (!REPEATABLE.has(step.op) || !("shapes" in step) || construction.shapes === undefined) return false;
    const shapes = step.shapes.map((i) => construction.shapes?.[i]);
    if (shapes.length === 0 || shapes.some((shape) => shape === undefined)) return false;
    const key = `${step.op} ${shapes.map((shape) => `${shape!.kind}:${Math.round(lengthOf(shape!.d) * 2) / 2}`).sort().join(" ")}`;
    const again = seen.has(key);
    seen.add(key);

    return again;
  });
};

const timeline = (construction: Timing): { at: Timed[]; fade: number; total: number; ink: number[] } => {
  const steps = construction.steps;
  const ink = inkTimes(construction);
  const again = repeats(construction);
  const count = (op: string): number => steps.filter((step) => step.op === op).length;
  // A crest of many circles strikes them faster, so that the layout never takes much longer than the drawing.
  const gap = Math.min(GUIDE_GAP, GUIDE_ALL / count("guide"));
  const mark = Math.min(PACE.centres[1], 3 / count("centres"));
  let t = 0.2;
  let end = t;
  let fade = -1;
  const at = steps.map((step, i): Timed => {
    // One kind of step is done before the next kind begins; steps of one kind follow closely.
    const kind = (one: Step): string => (one.op === "centres" || one.op === "mark" ? "guide" : one.op);
    if (i > 0 && kind(steps[i - 1]) !== kind(step)) t = Math.max(t, end) + 0.2;
    if (step.op === "turn") {
      const places = new Set(step.shapes.map((k) => (construction.shapes?.[k] === undefined ? "" : placeKey(construction.shapes[k])))).size;
      const per = Math.min(PLACE, PLACES / places);
      t = Math.max(t, end);
      end = t + places * per;
      t = end;

      return { t0: end - places * per, t1: end, per };
    }
    const [full, after] = ink[i] > 0 ? [ink[i], ink[i]] : step.op === "guide" ? [GUIDE_TRACE, gap] : step.op === "centres" ? [PACE.centres[0], mark] : PACE[step.op];
    const [lasts, next] = again[i] ? [full / REPEAT, after / REPEAT] : [full, after];
    if (step.op === "fade") fade = t;
    const timed = { t0: t, t1: t + lasts };
    end = Math.max(end, timed.t1);
    t += next;

    return timed;
  });

  return { at, fade, total: Math.max(t, end) + 0.3, ink };
};

/**
 * The seconds, at speed 1, at which each of a construction's steps begins.
 *
 * @param construction - A crest's construction (only its steps are read).
 * @returns One time for each step, in order.
 *
 * @example
 * ```ts
 * import { stepTimes } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/janome";
 *
 * console.log(stepTimes(construction).length === construction.steps.length); // true
 * ```
 */
export const stepTimes = (construction: Timing): number[] => timeline(construction).at.map((timed) => timed.t0);

/**
 * For a turn step: each other place the unit goes to, clockwise from the unit, with its shapes, the SVG transform that takes the
 * unit there, and the guides struck there too. They are the unit's own guides, the ones its steps struck, turned (and flipped
 * over) with it; a circle about the centre is left out, since a turn leaves it where it is.
 */
const placesOf = (construction: Construction, step: Step): { turn: number; transform: string; guides: Guide[]; ids: number[]; shapes: number[] }[] => {
  if (step.op !== "turn") return [];
  const struck = new Set(construction.steps.flatMap((one) => (one.op === "guide" ? [one.guide] : [])));
  const places = new Map<string, { turn: number; transform: string; guides: Guide[]; ids: number[]; shapes: number[] }>();
  for (const index of step.shapes) {
    const shape = construction.shapes[index];
    const key = placeKey(shape);
    const ids = construction.guides.flatMap((guide, i) => {
      // A circle is written from its top.
      const about = /^M100 ([\d.]+)a([\d.]+) /.exec(guide.d);

      return struck.has(i) && guide.unit === 0 && guide.part === shape.part && !(about !== null && Math.abs(Number(about[1]) + Number(about[2]) - 100) < 0.01) ? [i] : [];
    });
    if (!places.has(key)) places.set(key, { turn: (((shape.turn ?? 0) % 360) + 360) % 360, transform: `rotate(${n3(shape.turn ?? 0)} 100 100)${shape.flip === true ? " matrix(-1 0 0 1 200 0)" : ""}`, guides: ids.map((i) => construction.guides[i]), ids, shapes: [] });
    places.get(key)!.shapes.push(index);
  }

  // Clockwise from the unit; a sort keeps places of one angle (the unit flipped, or two parts) in the order they are drawn.
  return [...places.values()].sort((a, b) => a.turn - b.turn);
};

/** Where a point of the unit stands at a place: mirrored left to right when the place is a mirror, then turned clockwise about the centre. */
const placed = (x: number, y: number, turn: number, flip: boolean): [number, number] => {
  const [dx, dy, a] = [(flip ? 200 - x : x) - 100, y - 100, (turn * Math.PI) / 180];

  return [100 + dx * Math.cos(a) - dy * Math.sin(a), 100 + dx * Math.sin(a) + dy * Math.cos(a)];
};

/** A guide of the unit, drawn where it stands at a place: a circle struck from its own top about its own centre, a line ruled between its own ends. */
const guideAt = (guide: Guide, turn: number, flip: boolean): Guide => {
  const rest = { ...guide, unit: undefined };
  const to = (point: [number, number]): [number, number] => placed(point[0], point[1], turn, flip).map((n) => Math.round(n * 100) / 100) as [number, number];
  if (guide.type === "circle") {
    const r = Number(/a([\d.]+)/.exec(guide.d)?.[1]);
    const at = to(guide.at ?? [100, 100]);

    return { ...rest, at, d: `M${at[0]} ${n3(at[1] - r)}a${r} ${r} 0 1 1 0 ${n3(2 * r)} ${r} ${r} 0 1 1 0-${n3(2 * r)}z`, ...(guide.marks === undefined ? {} : { marks: guide.marks.map(to) }) };
  }
  const [x, y, dx, dy = 0] = (guide.d.match(/-?[\d.]+/g) ?? []).map(Number);
  const [from, end] = [to([x, y]), to(/h/.test(guide.d) ? [x + dx, y] : /v/.test(guide.d) ? [x, y + dx] : [x + dx, y + dy])];

  return { ...rest, d: `M${from[0]} ${from[1]}l${n3(end[0] - from[0])} ${n3(end[1] - from[1])}` };
};

/**
 * The same construction with every place built in full. A `turn` step builds the unit at its other places in one quick step; here each
 * place, clockwise from the unit, is built as the unit was, one after another: the unit's circles struck one by one at the place (with
 * their centres marked), its lines ruled, the place's shapes traced and thickened, then filled. Nothing is copied or flipped across: each
 * place's circles and lines are written where they stand. The steps grow by the places, each marked `place`, and the shapes, so the finished crest, are the same.
 *
 * @param construction - A crest's construction (`crestSteps()` loads it).
 * @returns A new construction, with more guides and steps; the one given when it has no `turn`, and never changed.
 *
 * @example
 * ```ts
 * import { fullBuilt } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/kikyo";
 *
 * const long = fullBuilt(construction);
 * console.log(long.steps.length > construction.steps.length); // true: each place has its own steps
 * console.log(long.shapes === construction.shapes);           // true: the finished crest is the same
 * ```
 */
export const fullBuilt = (construction: Construction): Construction => {
  if (!construction.steps.some((step) => step.op === "turn")) return construction;
  const guides = [...construction.guides];
  const steps: Step[] = [];
  const last: number[] = [];
  const turns = construction.steps.map((step) => placesOf(construction, step));
  // How many places each part has, the unit counted; a place can be built in more than one turn (a mirror of one group, then of another), and is one place.
  const total = new Map<string, number>();
  const named = new Map<string, number>();
  for (const place of turns.flat()) {
    const { part } = construction.shapes[place.shapes[0]];
    if (!named.has(placeKey(construction.shapes[place.shapes[0]]))) {
      named.set(placeKey(construction.shapes[place.shapes[0]]), 0);
      total.set(part, (total.get(part) ?? 1) + 1);
    }
  }
  const counted = new Map<string, number>();
  construction.steps.forEach((step, i) => {
    if (step.op !== "turn") steps.push(step);
    for (const place of turns[i]) {
      const { part, turn = 0, flip } = construction.shapes[place.shapes[0]];
      const key = placeKey(construction.shapes[place.shapes[0]]);
      const again = named.get(key)! > 0;
      if (!again) {
        named.set(key, (counted.get(part) ?? 1) + 1);
        counted.set(part, named.get(key)!);
      }
      const at: { place: [number, number] } = { place: [named.get(key)!, total.get(part)!] };
      // The unit's own steps for these guides, in the order they were struck, at this place (the first time it is built).
      const copy = new Map<number, number>();
      for (const id of again ? [] : place.ids) {
        copy.set(id, guides.length);
        guides.push(guideAt(construction.guides[id], turn, flip === true));
      }
      for (const one of construction.steps) {
        if (one.op === "centres" && one.guides.some((k) => copy.has(k))) steps.push({ op: "centres", guides: one.guides.filter((k) => copy.has(k)).map((k) => copy.get(k)!), ...at });
        if ((one.op === "guide" || one.op === "mark") && copy.has(one.guide)) steps.push({ op: one.op, guide: copy.get(one.guide)!, ...at });
      }
      // Its shapes: traced in runs of one group, thickened together, filled in runs.
      const runs: number[][] = [];
      for (const index of place.shapes) {
        const before = runs[runs.length - 1]?.[0];
        if (before !== undefined && construction.shapes[before].group === construction.shapes[index].group && construction.shapes[before].part === part) runs[runs.length - 1].push(index);
        else runs.push([index]);
      }
      for (const run of runs) steps.push({ op: "trace", shapes: run, ...at });
      steps.push({ op: "thicken", shapes: place.shapes, ...at });
      for (const run of runs) steps.push({ op: "draw", part, shapes: run, ...at });
    }
    last.push(steps.length - 1);
  });

  return { ...construction, guides, steps, ...(construction.rest === undefined ? {} : { rest: last[construction.rest] }) };
};

/**
 * The construction held still at one step: every guide struck so far, drawn thin (after a turn, the unit's guides at each
 * other place too), and every shape drawn or turned so far, solid. A step that strikes a circle or traces an arc shows the compass
 * arm where that curve ended: a thin line from its centre, the centre's dot bold. After the last step it is the finished crest. For stepping through a construction by hand, and for a scrubber.
 * A shape that no step draws (the rest of the crest, when `isolated()` has left one part's steps) is there from the start, faint.
 *
 * @param source - A crest's construction (`crestSteps()` loads it).
 * @param step - The index of the last step done; -1 is the empty page, and anything past the end is the finished crest.
 * @param options - `guides: false` leaves the layout out.
 * @returns The SVG string, with no animation.
 *
 * @example
 * ```ts
 * import { staticSvg, stepSvg } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/janome";
 *
 * console.log(stepSvg(construction, 0).includes("<path")); // true: the first circle is struck
 * console.log(stepSvg(construction, construction.steps.length - 1) === staticSvg(construction)); // true
 * ```
 */
export const stepSvg = (source: Construction, step: number, options: Pick<AnimateOptions, "guides" | "centres" | "widths" | "fill" | "compassArm" | "widthsKey" | "inkDraw" | "fullBuild"> = {}): string => {
  // A crest still being redrawn has no steps: it is shown finished.
  if (source.redrawing === true) return staticSvg(source, { fill: options.fill });
  // With every place in full, the steps are those of `fullBuilt`.
  const construction = options.fullBuild === true ? fullBuilt(source) : source;
  const done = construction.steps.slice(0, Math.max(0, Math.floor(step) + 1));
  const shown = options.guides !== false && !done.some((one) => one.op === "fade");
  const guides = shown ? done.flatMap((one) => (one.op === "guide" ? [construction.guides[one.guide]] : [])) : [];
  // How far each shape has come: traced, thickened, or filled.
  const level = new Map<number, number>();
  for (const one of done) if (one.op === "trace" || one.op === "thicken" || one.op === "draw" || one.op === "turn") for (const i of one.shapes) level.set(i, one.op === "trace" ? 1 : one.op === "thicken" ? 2 : 3);
  const shapes = construction.shapes.map((shape, i) => (!level.has(i) ? "" : level.get(i) === 3 ? (options.fill === false ? outlineOf(shape) : pathOf(shape)) : outlineOf(shape, level.get(i) === 1 ? ".5" : "1.3")));
  const line = (g: Guide): string => `<path fill="none" stroke="currentColor" stroke-width=".8" opacity=".55" d="${g.d}"/>`;
  const places = guides.length === 0 ? [] : done.flatMap((one) => placesOf(construction, one));
  const layout = `${guides.map(line).join("")}${places.filter((place) => place.guides.length > 0).map((place) => `<g transform="${place.transform}">${place.guides.map(line).join("")}</g>`).join("")}`;
  const marks = shown ? marksOf(construction, done).map((mark) => `${options.centres === false ? "" : `<circle cx="${mark.x}" cy="${mark.y}" r=".9"/>`}${options.widths === false ? "" : `<text x="${mark.tx}" y="${mark.ty}" font-size="5" font-family="sans-serif">${mark.width}</text>`}`) : [];

  // The compass arm of the step just done, where its last curve ended: a circle struck, or the last arc inked.
  const last = done[done.length - 1];
  const curve = options.compassArm === false || last === undefined ? [] : last.op === "guide" ? roundOf(construction.guides[last.guide]) : last.op === "trace" ? last.shapes.flatMap((i) => arcsOf(construction.shapes[i].d)) : [];
  const arm = curve.length === 0 ? "" : armOf(construction, curve[curve.length - 1], 'stroke="currentColor" stroke-width=".5"', true);

  // The key's room stays once the guides are rubbed out, so the drawing keeps one size from the first step to the finished crest.
  const key = options.guides !== false ? keyOf(construction, options.widthsKey) : null;
  // The widths key: the width the compass was last set to so far, for a circle struck, centres marked, or an arc inked in the
  // tracing or the thickening; none before the first.
  const set =
    key === null
      ? undefined
      : done
          .flatMap((one) =>
            one.op === "centres" || one.op === "guide" || one.op === "mark"
              ? [construction.guides[one.op === "centres" ? one.guides[one.guides.length - 1] : one.guide]].flatMap((guide) => (guide.type === "circle" && guide.width !== undefined ? [guide.width] : []))
              : one.op === "trace" || one.op === "thicken"
                ? one.shapes.flatMap((i) => (one.op === "thicken" && construction.shapes[i].kind !== "fill" ? [] : arcsOf(construction.shapes[i].d).flatMap((arc) => widthOfArc(key, arc) ?? [])))
                : [],
          )
          .pop();
  const rows = key === null || set === undefined || !shown ? "" : `<g ${KEY_LOOK} stroke-width=".8">${rulerOf(key)}${markOf(key, set)}</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${key?.box ?? VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${faint(construction)}${layout}${marks.join("")}${shapes.join("")}${arm}${rows}</svg>`;
};

/** The marks of some `centres` and `mark` steps: a dot at each centre or each point stepped off, and beside it the number of the compass width, each further number at one point a little to the right of the last. */
const marksOf = (construction: Construction, steps: readonly Step[]): { step: Step; x: number; y: number; tx: number; ty: number; width: number }[] => {
  const seen = new Map<string, number>();

  return steps.flatMap((step) =>
    (step.op === "centres" ? step.guides : step.op === "mark" ? [step.guide] : []).flatMap((i) => {
      const guide = construction.guides[i];

      return (step.op === "mark" ? (guide.marks ?? []) : guide.at === undefined ? [] : [guide.at]).map((at) => {
        const nth = seen.get(String(at)) ?? 0;
        seen.set(String(at), nth + 1);

        return { step, x: at[0], y: at[1], tx: n3(at[0] + 1.6 + 3.6 * nth) as unknown as number, ty: n3(at[1] - 1.4) as unknown as number, width: guide.width ?? 0 };
      });
    }),
  );
};

/** The shapes no step draws, faint: the rest of the crest behind a part shown alone. A whole construction has none. */
const faint = (construction: Construction): string => {
  const drawn = new Set(construction.steps.flatMap((step) => (step.op === "draw" || step.op === "turn" ? step.shapes : [])));

  return construction.shapes.map((shape, i) => (drawn.has(i) ? "" : pathOf(shape, 'opacity=".12"'))).join("");
};

/**
 * The crest drawn as it is constructed, as an SVG with its own CSS animation: first the layout (the compass circles
 * and ruler lines, drawn thin, every circle in full), then each shape traced as an outline in order and filled in, a unit
 * that is repeated then made at its other places, clockwise and one place at a time (the unit's circles and lines struck there,
 * quickly, then its shapes inked), then the guides rubbed out. While a circle is struck or an arc is inked, the compass arm follows
 * the pen: a thin line from that circle's centre, whose dot is bold for as long.
 * When it ends, and wherever the animation is not run (a reader who asks for less motion, or an old browser), what is
 * on the page is the finished crest, the same paths as `staticSvg` draws. No script: pure SVG and CSS.
 *
 * @param source - A crest's construction (`crestSteps()` loads it).
 * @param options - `speed`, `loop`, `id` and `guides`; see `AnimateOptions`.
 * @returns The animated SVG string.
 *
 * @example
 * ```ts
 * import { animatedSvg } from "@johnmorrisdotca/kamon-crests/animate";
 * import construction from "@johnmorrisdotca/kamon-crests/steps/maru-ni-juji";
 *
 * const svg = animatedSvg(construction, { speed: 1.5, id: "cross" });
 * console.log(svg.includes("@keyframes cross-s0")); // true
 * ```
 */
export const animatedSvg = (source: Construction, options: AnimateOptions = {}): string => {
  // A crest still being redrawn has no steps: it is shown finished, with nothing to play.
  if (source.redrawing === true) return staticSvg(source, { fill: options.fill });
  // With every place in full, the steps are those of `fullBuilt`.
  const built = options.fullBuild === true ? fullBuilt(source) : source;
  const construction = options.inkDraw === undefined ? built : { ...built, inkDraw: options.inkDraw };
  const speed = options.speed !== undefined && options.speed > 0 ? options.speed : 1;
  const loop = options.loop === true;
  const prefix = sanitize(options.id ?? "k");
  const showGuides = options.guides !== false;
  const plan = timeline(construction);
  const key = showGuides ? keyOf(construction, options.widthsKey) : null;
  // The width the compass is set to, from when each circle is struck (or its centres marked).
  const set: [number, number][] = [];
  // The shapes whose outline the pen draws a second time, heavy, in the thickening.
  const inked = new Set<number>();
  const lengths = inkLengths(construction);
  const exits = loop && options.exit !== undefined && options.exit !== false;
  const hold = exits ? EXIT_HOLD + EXIT_GO + EXIT_GAP : loop ? LOOP_HOLD : 0;
  const total = plan.total + hold;
  const pct = (seconds: number): string => `${n3((seconds / total) * 100)}%`;
  const seconds = n3(total / speed);
  const rules: string[] = [];
  const keyframes: string[] = [];
  const iterations = loop ? "infinite" : "1";
  const ease = "animation-timing-function:ease-in-out";
  const classOf = (name: string): string => `.${prefix}-${name}`;
  const animate = (name: string, extra = ""): string => `${classOf(name)}{${extra}animation:${prefix}-${name} ${seconds}s linear ${iterations} both}`;

  const body: string[] = [];
  const guideBody: string[] = [];
  // A guide is struck at its time, stays, and is rubbed out with the rest.
  const strike = (name: string, at: number, trace: number): void => {
    rules.push(animate(name));
    keyframes.push(
      `@keyframes ${prefix}-${name}{0%{opacity:0;stroke-dashoffset:1}${pct(at)}{opacity:1;stroke-dashoffset:1;${ease}}${pct(at + trace)}{opacity:1;stroke-dashoffset:0}${pct(plan.fade + FLASH)}{opacity:1;${ease}}${pct(plan.fade + FLASH + FADE)}{opacity:0;stroke-dashoffset:0}100%{opacity:0;stroke-dashoffset:0}}`,
    );
  };
  const marks: string[] = [];
  // The compass arm: while a circle is struck or an arc is inked, a thin line from its centre follows the pen round, and is gone when the curve ends.
  const arms: string[] = [];
  // The ruler marks the width of each arc the pen inks, while it inks it, as it does each circle struck.
  const setFor = (arcs: Arc[], from: number, to: number): void => {
    if (key === null) return;
    for (const arc of arcs) {
      const width = widthOfArc(key, arc);
      if (width !== undefined) set.push([from + (to - from) * arc.from, width]);
    }
  };
  const arm = (arcs: Arc[], from: number, to: number, timing = "", shape?: Shape): void => {
    if (options.compassArm === false) return;
    for (const arc of arcs) {
      const name = `a${arms.length}`;
      const [t0, t1] = [from + (to - from) * arc.from, from + (to - from) * arc.to];
      arms.push(armOf(construction, arc, `class="${prefix}-a ${prefix}-${name}"`, false, shape));
      rules.push(animate(name, `transform-origin:${n3(arc.cx)}px ${n3(arc.cy)}px;`));
      keyframes.push(`@keyframes ${prefix}-${name}{0%,${pct(t0 - 0.001)}{opacity:0;rotate:0deg}${pct(t0)}{opacity:1;rotate:0deg;${timing}}${pct(t1)}{opacity:1;rotate:${n3(arc.turn)}deg}${pct(t1 + 0.001)},100%{opacity:0;rotate:${n3(arc.turn)}deg}}`);
    }
  };
  // When each shape is traced, thickened and filled.
  const traced = new Map<number, Timed>();
  const thickened = new Map<number, Timed>();
  construction.steps.forEach((step, i) => {
    const times = plan.at[i];
    if (step.op === "trace" || step.op === "thicken") {
      // With the pen, each shape has its own part of the step, in order, as long as it is long; without it, they are done together.
      const sum = lengths[i].reduce((a, b) => a + b, 0);
      let cum = 0;
      step.shapes.forEach((index, j) => {
        const from = times.t0 + ((times.t1 - times.t0) * cum) / (sum || 1);
        cum += lengths[i][j];
        (step.op === "trace" ? traced : thickened).set(index, plan.ink[i] > 0 ? { t0: from, t1: times.t0 + ((times.t1 - times.t0) * cum) / sum } : times);
        if (step.op === "thicken" && plan.ink[i] > 0 && construction.shapes[index].kind === "fill") inked.add(index);
      });
    }
    if (!showGuides) return;
    if (key !== null && (step.op === "centres" || step.op === "guide" || step.op === "mark")) {
      const struck = construction.guides[step.op === "centres" ? step.guides[step.guides.length - 1] : step.guide];
      if (struck.type === "circle" && struck.width !== undefined) set.push([times.t0, struck.width]);
    }
    if (step.op === "guide") {
      const name = `g${step.guide}`;
      guideBody.push(`<path class="${prefix}-${name} ${prefix}-g" pathLength="1" d="${construction.guides[step.guide].d}"/>`);
      strike(name, times.t0, GUIDE_TRACE);
      arm(roundOf(construction.guides[step.guide]), times.t0, times.t0 + GUIDE_TRACE, ease);
    }
    if (step.op === "centres" || step.op === "mark") {
      const name = `c${i}`;
      strike(name, times.t0, 0.15);
      for (const mark of marksOf(construction, construction.steps.slice(0, i + 1)).filter((one) => one.step === step)) {
        marks.push(`<circle class="${prefix}-${name} ${prefix}-c" cx="${mark.x}" cy="${mark.y}" r=".9"/><text class="${prefix}-${name} ${prefix}-w" x="${mark.tx}" y="${mark.ty}">${mark.width}</text>`);
      }
    }
  });
  let placed = 0;
  // Which shape each piece of the body draws, so that a crest that leaves can move each part as one.
  const owner: number[] = [];
  const at: number[] = [];
  const own = (): void => {
    while (owner.length < body.length) owner.push(at[at.length - 1] ?? -1);
  };
  construction.steps.forEach((step, i) => {
    own();
    if (step.op !== "draw" && step.op !== "turn") return;
    const times = plan.at[i];
    // A turn goes round clockwise, a place at a time: its guides struck, then its shapes inked.
    placesOf(construction, step).forEach((place, k) => {
      const per = times.per ?? 0;
      const from = times.t0 + k * per;
      for (const index of place.shapes) traced.set(index, { t0: from + per * 0.4, t1: from + per * 0.8 });
      if (!showGuides || place.guides.length === 0) return;
      const name = `p${placed++}`;
      guideBody.push(`<g transform="${place.transform}">${place.guides.map((guide) => `<path class="${prefix}-${name} ${prefix}-g" pathLength="1" d="${guide.d}"/>`).join("")}</g>`);
      strike(name, from, per * 0.4);
    });
    for (const index of step.shapes) {
      const shape = construction.shapes[index];
      const name = `s${index}`;
      own();
      at.push(index);
      // A shape no step traced is traced as it is drawn; one built at a place is filled as soon as it is traced there.
      const trace = traced.get(index) ?? { t0: times.t0, t1: times.t0 + (times.t1 - times.t0) * 0.6 };
      const thick = thickened.get(index);
      const pen = thick !== undefined && inked.has(index);
      const fill = step.op === "turn" ? { t0: trace.t1, t1: trace.t1 + (times.per ?? 0) * 0.2 } : { t0: Math.max(times.t0, trace.t1), t1: times.t1 };
      // A browser starts the dashes again at each subpath, so a shape of several (a ring, a square with a hole) is drawn a subpath at a time, each in its share of the time, as the arm goes round it.
      const pieces = piecesOf(shape.d);
      const share = (span: Timed, piece: { from: number; to: number }): Timed => ({ t0: span.t0 + (span.t1 - span.t0) * piece.from, t1: span.t0 + (span.t1 - span.t0) * piece.to });
      if (shape.kind === "stroke") {
        pieces.forEach((piece, k) => {
          const own = pieces.length === 1 ? name : `${name}-${k}`;
          const span = share(trace, piece);
          rules.push(animate(own, "stroke-dasharray:1 1;"));
          body.push(pathOf({ ...shape, d: piece.d }, `class="${prefix}-${own}" pathLength="1"`));
          keyframes.push(
            `@keyframes ${prefix}-${own}{0%{stroke-opacity:0;stroke-dashoffset:1}${pct(span.t0)}{stroke-opacity:1;stroke-dashoffset:1;${ease}}${pct(span.t1)}{stroke-opacity:1;stroke-dashoffset:0}100%{stroke-opacity:1;stroke-dashoffset:0}}`,
          );
        });
      } else {
        rules.push(animate(name));
        // Thickened by the pen, the heavy line is a second outline drawn over the first, and fades with it as the fill comes in.
        const heavy = thick === undefined || pen ? "" : `${pct(thick.t0)}{stroke-width:.5;${ease}}${pct(thick.t1)}{stroke-width:1.3}`;
        const weight = thick === undefined || pen ? ".5" : "1.3";
        const several = pieces.length > 1;
        // The arm follows the pen round each subpath in its turn, and the ruler marks each arc's width as it is inked.
        const follow = (whole: Timed): void => {
          for (const piece of pieces) {
            const span = share(whole, piece);
            arm(arcsOf(piece.d), span.t0, span.t1, "", shape);
            if (step.op === "draw") setFor(arcsOf(piece.d), span.t0, span.t1);
          }
        };
        follow(trace);
        body.push(pathOf(shape, `class="${prefix}-${name} ${prefix}-f" pathLength="1"`));
        // The outline of each subpath as the pen draws it; the shape's own outline takes over, whole, when the last is done.
        if (several) {
          pieces.forEach((piece, k) => {
            const own = `o${index}-${k}`;
            const span = share(trace, piece);
            body.push(`<path fill="none" class="${prefix}-${own} ${prefix}-o" pathLength="1" d="${piece.d}"/>`);
            rules.push(animate(own));
            keyframes.push(`@keyframes ${prefix}-${own}{0%{stroke-opacity:0;stroke-dashoffset:1}${pct(span.t0)}{stroke-opacity:1;stroke-dashoffset:1}${pct(span.t1)}{stroke-opacity:1;stroke-dashoffset:0}${pct(trace.t1)}{stroke-opacity:1;stroke-dashoffset:0}${pct(trace.t1 + 0.001)},100%{stroke-opacity:0;stroke-dashoffset:0}}`);
          });
        }
        if (pen) {
          follow(thick);
          pieces.forEach((piece, k) => {
            const over = several ? `h${index}-${k}` : `h${index}`;
            const span = share(thick, piece);
            body.push(`<path fill="none" class="${prefix}-${over} ${prefix}-h" pathLength="1" d="${piece.d}"/>`);
            rules.push(animate(over));
            keyframes.push(`@keyframes ${prefix}-${over}{0%{stroke-opacity:0;stroke-dashoffset:1}${pct(span.t0)}{stroke-opacity:1;stroke-dashoffset:1}${pct(span.t1)}{stroke-opacity:1;stroke-dashoffset:0}${pct(fill.t0)}{stroke-opacity:1}${pct(fill.t1)},100%{stroke-opacity:0;stroke-dashoffset:0}}`);
          });
        }
        // With several subpaths the shape's own outline waits, unseen, until the pen has drawn them all, then shows whole.
        const traced = several
          ? `${pct(trace.t0)}{fill-opacity:0;stroke-opacity:0;stroke-dashoffset:1;stroke-width:.5}${pct(trace.t1 - 0.001)}{fill-opacity:0;stroke-opacity:0;stroke-dashoffset:1;stroke-width:.5}`
          : `${pct(trace.t0)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:1;stroke-width:.5}`;
        keyframes.push(
          `@keyframes ${prefix}-${name}{0%{fill-opacity:0;stroke-opacity:0;stroke-dashoffset:1;stroke-width:.5}${traced}${pct(trace.t1)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:0;stroke-width:.5}${heavy}${pct(fill.t0)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:0;stroke-width:${weight};${ease}}${pct(fill.t1)}{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0;stroke-width:${weight}}100%{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0}}`,
        );
      }
    }
  });
  own();
  // The crest leaving: each part (the shapes of one place) in a group of its own, all of them in one group for the shutter.
  // Every group runs one animation from the finished crest to a transform and an opacity the chosen exit sets as variables,
  // so the element can choose another exit each time round without starting anything again.
  let drawn = `${faint(construction)}${body.join("")}`;
  const exitCss: string[] = [];
  if (exits) {
    const go = plan.total + EXIT_HOLD;
    const groups = new Map<string, { pieces: string[]; box: number[] }>();
    body.forEach((piece, n) => {
      const shape = construction.shapes[owner[n]];
      const named = shape === undefined ? "" : placeKey(shape);
      const group = groups.get(named) ?? { pieces: [], box: [Infinity, Infinity, -Infinity, -Infinity] };
      group.pieces.push(piece);
      if (shape !== undefined) {
        const [, , , box] = measure(shape.d);
        group.box = [Math.min(group.box[0], box[0]), Math.min(group.box[1], box[1]), Math.max(group.box[2], box[2]), Math.max(group.box[3], box[3])];
      }
      groups.set(named, group);
    });
    const parts = [...groups.values()].map((group, n) => {
      const [x, y] = [(group.box[0] + group.box[2]) / 2 - 100, (group.box[1] + group.box[3]) / 2 - 100];
      const far = Math.hypot(x, y);
      const side = n % 2 === 0 ? 1 : -1;
      // A part at the middle grows and fades where it is; the rest fly out the way they face.
      const out = far < 12 ? [0, 0, 2.4, 0] : [(x / far) * 280, (y / far) * 280, 1, 1];
      const drop = (200 - (Number.isFinite(group.box[1]) ? group.box[1] : 0)) * 1.5 + 40 + (n % 3) * 30;
      exitCss.push(
        `${classOf(`x${n}`)}{--sx:${n3(out[0])}px;--sy:${n3(out[1])}px;--ss:${out[2]};--so:${out[3]};--sr:${side * (40 + ((n * 29) % 50))}deg;--tw:${side * (240 + ((n * 37) % 120))}deg;--fy:${n3(drop)}px;--fr:${side * (10 + ((n * 7) % 20))}deg}`,
      );

      return `<g class="${prefix}-x ${prefix}-x${n}">${group.pieces.join("")}</g>`;
    });
    const behind = faint(construction);
    drawn = `<g class="${prefix}-xc">${behind === "" ? "" : `<g class="${prefix}-x ${prefix}-xf">${behind}</g>`}${parts.join("")}</g>`;
    const whole = "circle(101px at 100px 100px) view-box";
    rules.push(animate("x"), animate("xc"));
    keyframes.push(
      `@keyframes ${prefix}-x{0%,${pct(go)}{transform:none;opacity:1;animation-timing-function:ease-in}${pct(go + EXIT_GO)},100%{transform:var(--kx,none);opacity:var(--ko,1)}}`,
      `@keyframes ${prefix}-xc{0%,${pct(go)}{clip-path:${whole};animation-timing-function:ease-in}${pct(go + EXIT_GO)},100%{clip-path:var(--kc,${whole})}}`,
    );
    const centred = "transform-box:fill-box;transform-origin:center;";
    const rule: Record<Exit, string> = {
      fade: `${classOf("x")}{--ko:0}`,
      scatter: `${classOf("x")}{${centred}--kx:translate(var(--sx),var(--sy)) rotate(var(--sr)) scale(var(--ss));--ko:var(--so)}`,
      spin: `${classOf("x")}{transform-box:view-box;transform-origin:100px 100px;--kx:rotate(300deg) scale(0)}`,
      twirl: `${classOf("x")}{${centred}--kx:rotate(var(--tw)) scale(0)}`,
      fall: `${classOf("x")}{${centred}--kx:translateY(var(--fy)) rotate(var(--fr))}`,
      close: `${classOf("xc")}{--kc:circle(0px at 100px 100px) view-box}`,
    };
    for (const name of EXITS) exitCss.push(`[data-exit=${name}] ${rule[name]}`);
  }
  const chosen = !exits ? "" : typeof options.exit === "string" ? options.exit : EXITS[[...prefix].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % EXITS.length];
  // The base styles are the finished crest: guides gone, fills solid, outlines gone. A reader who asks for less motion
  // gets exactly these, and so does anyone whose browser ignores the animation.
  let keyed = "";
  if (key !== null) {
    // The ruler: shown from the first width set, gone with the guides. The width the compass is set to is marked on it, its tick
    // long and its number bold, for as long as it is set.
    set.sort((a, b) => a[0] - b[0]);
    const runs = set.filter((one, j) => j === 0 || one[1] !== set[j - 1][1]);
    const first = runs[0]?.[0] ?? 0;
    rules.push(animate("k"));
    keyframes.push(`@keyframes ${prefix}-k{0%,${pct(Math.max(0, first - 0.001))}{opacity:0}${pct(first)},${pct(plan.fade + FLASH)}{opacity:1}${pct(plan.fade + FLASH + FADE)},100%{opacity:0}}`);
    const marks = [...new Set(runs.map(([, width]) => width))].map((width) => {
      rules.push(animate(`kn${width}`));
      const stops = runs.flatMap(([at, one], j) => (one !== width ? [] : [`${pct(Math.max(0, at - 0.001))}{opacity:0}${pct(at)}{opacity:1}${runs[j + 1] === undefined ? "" : `${pct(runs[j + 1][0] - 0.001)}{opacity:1}${pct(runs[j + 1][0])}{opacity:0}`}`]));
      keyframes.push(`@keyframes ${prefix}-kn${width}{0%{opacity:0}${stops.join("")}${runs[runs.length - 1][1] === width ? "100%{opacity:1}" : "100%{opacity:0}"}}`);

      return markOf(key, width, ` class="${prefix}-kn${width}"`);
    });
    keyed = `<g class="${prefix}-k" ${KEY_LOOK} stroke-width=".8">${rulerOf(key)}${marks.join("")}</g>`;
  }
  // The flash: the guides' group goes from its usual faintness to bright, and back once they are gone.
  if (guideBody.length > 0 && plan.fade >= 0) {
    rules.push(animate("gs"));
    keyframes.push(`@keyframes ${prefix}-gs{0%,${pct(plan.fade)}{opacity:.55;${ease}}${pct(plan.fade + FLASH * 0.4)},${pct(plan.fade + FLASH + FADE)}{opacity:.85}100%{opacity:.55}}`);
  }
  const base = `${key === null ? "" : `${classOf("k")}{opacity:0}`}${classOf("h")}{fill:none;stroke:currentColor;stroke-width:1.3;stroke-opacity:0;stroke-dasharray:1 1}${classOf("o")}{fill:none;stroke:currentColor;stroke-width:.5;stroke-opacity:0;stroke-dasharray:1 1}${classOf("g")}{fill:none;stroke:currentColor;stroke-width:.8;stroke-dasharray:1 1;opacity:0}${classOf("f")}{stroke:currentColor;stroke-width:1.1;stroke-opacity:0;stroke-dasharray:1 1}${classOf("c")},${classOf("w")},${classOf("a")}{opacity:0;font:5px sans-serif;stroke:currentColor;stroke-width:.5}`;
  // The switches: an option here, or `centres`, `widths` or `fill` set to `off` on the element (or anything else) the drawing is in.
  // With the fill off the crest stays line art: each shape's own outline, never filled.
  const off = (name: string, set: boolean | undefined, style: string): string => `${set === false ? "" : `[${name}=off] `}${classOf(name[0])}{${style}}`;
  const switches = `${off("centres", options.centres, "display:none")}${off("widths", options.widths, "display:none")}${off("fill", options.fill, "fill:none!important;stroke-opacity:1!important;stroke-width:.6!important")}[compass-arm=off] ${classOf("a")}{display:none}`;
  // Two custom properties hold and seek every animation at once: `--kamon-play:paused` stops them where they are, and
  // `--kamon-at:-3s` puts them three seconds in. The element's pause and scrubber set them; left unset, it plays.
  const held = `[class^="${prefix}-"]{animation-play-state:var(--kamon-play,running);animation-delay:var(--kamon-at,0s)}`;
  const reduced = `@media (prefers-reduced-motion:reduce){[class^="${prefix}-"]{animation:none!important}}`;
  // Strokes drawn as lines take dashes to be drawn in; their finished state is whole.
  const css = `${base}${rules.join("")}${exitCss.join("")}${held}${keyframes.join("")}${reduced}${switches}`;
  // Guides come first in the document, so that the shapes sit on top of them.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${key?.box ?? VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"${chosen === "" ? "" : ` data-exit="${chosen}"`}><style>${escapeText(css)}</style>${guideBody.length === 0 ? "" : `<g class="${prefix}-gs" opacity=".55">${guideBody.join("")}</g>`}${marks.join("")}${drawn}${arms.join("")}${keyed}</svg>`;
};
