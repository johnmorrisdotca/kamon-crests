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
 * 1. the underdrawing, compass width by compass width: `centres` marks the centres of the circles of one width, and `guide` strikes each circle;
 * 2. `trace`: only what is needed of the underdrawing is traced, a group of shapes' outlines, thin;
 * 3. `thicken`: the traced outlines are made heavier;
 * 4. `guide`, for a ruled line: the straight lines are ruled;
 * 5. `draw` fills a group of shapes, and `turn` builds the unit again at each of its other places (the shapes that are that unit turned or mirrored): the same guides struck there, then its ink;
 * 6. `fade`: finished, the guides rubbed out.
 *
 * @example
 * ```ts
 * import type { Step } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const steps: Step[] = [{ op: "guide", guide: 0 }, { op: "trace", shapes: [0] }, { op: "draw", part: "frame", shapes: [0] }, { op: "fade" }];
 * console.log(steps.map((step) => step.op)); // ["guide", "trace", "draw", "fade"]
 * ```
 */
export type Step =
  | { op: "centres"; guides: number[] }
  | { op: "guide"; guide: number }
  | { op: "trace"; shapes: number[] }
  | { op: "thicken"; shapes: number[] }
  | { op: "draw"; part: string; shapes: number[] }
  | { op: "turn"; shapes: number[] }
  | { op: "fade" };

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
 * one compass width after a step that marks its centres; each group of shapes traced; the outlines thickened; the lines ruled;
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
  guides.forEach((guide, i) => {
    if (guide.type !== "circle") return;
    const last = steps[steps.length - 1];
    const before = last?.op === "guide" ? guides[last.guide] : undefined;
    // The centres of one part's circles of one width are marked together, before the first of them is struck.
    if (guide.at !== undefined && !(before?.type === "circle" && before.part === guide.part && before.width === guide.width)) {
      steps.push({ op: "centres", guides: guides.flatMap((one, k) => (k >= i && one.type === "circle" && one.part === guide.part && one.width === guide.width ? [k] : [])) });
    }
    steps.push({ op: "guide", guide: i });
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
  guides.forEach((guide, i) => {
    if (guide.type !== "circle") steps.push({ op: "guide", guide: i });
  });
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
}

const sanitize = (id: string): string => id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 40) || "k";
const n3 = (n: number): string => String(Math.round(n * 1000) / 1000);

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
export const durationOf = (construction: Pick<Construction, "steps"> & Partial<Pick<Construction, "shapes">>): number => timeline(construction).total;

const GUIDE_TRACE = 0.45;
const GUIDE_GAP = 0.16;
const GUIDE_ALL = 7;
const FADE = 0.7;
/** A turn goes round the other places one at a time: the seconds for a place (its guides struck, then its shapes inked), and for the whole turn when there are many. */
const PLACE = 0.7;
const PLACES = 4.5;
/** How long each other kind of step lasts, and how long until the next of its kind starts. */
const PACE: Record<string, [number, number]> = { centres: [0.3, 0.3], trace: [0.9, 0.42], thicken: [0.5, 0.5], draw: [0.4, 0.25], fade: [FADE, FADE] };

/** Which place a turned shape is at: shapes of one part, one turn and one flip are one place. */
const placeKey = (shape: Shape): string => `${shape.part} ${shape.turn} ${shape.flip === true}`;

const timeline = (construction: Pick<Construction, "steps"> & Partial<Pick<Construction, "shapes">>): { at: Timed[]; fade: number; total: number } => {
  const steps = construction.steps;
  const count = (op: string): number => steps.filter((step) => step.op === op).length;
  // A crest of many circles strikes them faster, so that the layout never takes much longer than the drawing.
  const gap = Math.min(GUIDE_GAP, GUIDE_ALL / count("guide"));
  const mark = Math.min(PACE.centres[1], 3 / count("centres"));
  let t = 0.2;
  let end = t;
  let fade = -1;
  const at = steps.map((step, i): Timed => {
    // One kind of step is done before the next kind begins; steps of one kind follow closely.
    const kind = (one: Step): string => (one.op === "centres" ? "guide" : one.op);
    if (i > 0 && kind(steps[i - 1]) !== kind(step)) t = Math.max(t, end) + 0.2;
    if (step.op === "turn") {
      const places = new Set(step.shapes.map((k) => (construction.shapes?.[k] === undefined ? "" : placeKey(construction.shapes[k])))).size;
      const per = Math.min(PLACE, PLACES / places);
      t = Math.max(t, end);
      end = t + places * per;
      t = end;

      return { t0: end - places * per, t1: end, per };
    }
    const [lasts, next] = step.op === "guide" ? [GUIDE_TRACE, gap] : step.op === "centres" ? [PACE.centres[0], mark] : PACE[step.op];
    if (step.op === "fade") fade = t;
    const timed = { t0: t, t1: t + lasts };
    end = Math.max(end, timed.t1);
    t += next;

    return timed;
  });

  return { at, fade, total: Math.max(t, end) + 0.3 };
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
export const stepTimes = (construction: Pick<Construction, "steps"> & Partial<Pick<Construction, "shapes">>): number[] => timeline(construction).at.map((timed) => timed.t0);

/**
 * For a turn step: each other place the unit goes to, clockwise from the unit, with its shapes, the SVG transform that takes the
 * unit there, and the guides struck there too. They are the unit's own guides, the ones its steps struck, turned (and flipped
 * over) with it; a circle about the centre is left out, since a turn leaves it where it is.
 */
const placesOf = (construction: Construction, step: Step): { turn: number; transform: string; guides: Guide[]; shapes: number[] }[] => {
  if (step.op !== "turn") return [];
  const struck = new Set(construction.steps.flatMap((one) => (one.op === "guide" ? [one.guide] : [])));
  const places = new Map<string, { turn: number; transform: string; guides: Guide[]; shapes: number[] }>();
  for (const index of step.shapes) {
    const shape = construction.shapes[index];
    const key = placeKey(shape);
    const guides = construction.guides.filter((guide, i) => {
      // A circle is written from its top.
      const about = /^M100 ([\d.]+)a([\d.]+) /.exec(guide.d);

      return struck.has(i) && guide.unit === 0 && guide.part === shape.part && !(about !== null && Math.abs(Number(about[1]) + Number(about[2]) - 100) < 0.01);
    });
    if (!places.has(key)) places.set(key, { turn: (((shape.turn ?? 0) % 360) + 360) % 360, transform: `rotate(${n3(shape.turn ?? 0)} 100 100)${shape.flip === true ? " matrix(-1 0 0 1 200 0)" : ""}`, guides, shapes: [] });
    places.get(key)!.shapes.push(index);
  }

  // Clockwise from the unit; a sort keeps places of one angle (the unit flipped, or two parts) in the order they are drawn.
  return [...places.values()].sort((a, b) => a.turn - b.turn);
};

/**
 * The construction held still at one step: every guide struck so far, drawn thin (after a turn, the unit's guides at each
 * other place too), and every shape drawn or turned so far, solid. After the last step it is the finished crest. For stepping through a construction by hand, and for a scrubber.
 * A shape that no step draws (the rest of the crest, when `isolated()` has left one part's steps) is there from the start, faint.
 *
 * @param construction - A crest's construction (`crestSteps()` loads it).
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
export const stepSvg = (construction: Construction, step: number, options: Pick<AnimateOptions, "guides" | "centres" | "widths" | "fill"> = {}): string => {
  const done = construction.steps.slice(0, Math.max(0, Math.floor(step) + 1));
  const shown = options.guides !== false && !done.some((one) => one.op === "fade");
  const guides = shown ? done.flatMap((one) => (one.op === "guide" ? [construction.guides[one.guide]] : [])) : [];
  // How far each shape has come: traced, thickened, or filled.
  const level = new Map<number, number>();
  for (const one of done) if (one.op !== "guide" && one.op !== "centres" && one.op !== "fade") for (const i of one.shapes) level.set(i, one.op === "trace" ? 1 : one.op === "thicken" ? 2 : 3);
  const shapes = construction.shapes.map((shape, i) => (!level.has(i) ? "" : level.get(i) === 3 ? (options.fill === false ? outlineOf(shape) : pathOf(shape)) : outlineOf(shape, level.get(i) === 1 ? ".5" : "1.3")));
  const line = (g: Guide): string => `<path fill="none" stroke="currentColor" stroke-width=".8" opacity=".55" d="${g.d}"/>`;
  const places = guides.length === 0 ? [] : done.flatMap((one) => placesOf(construction, one));
  const layout = `${guides.map(line).join("")}${places.filter((place) => place.guides.length > 0).map((place) => `<g transform="${place.transform}">${place.guides.map(line).join("")}</g>`).join("")}`;
  const marks = shown ? marksOf(construction, done).map((mark) => `${options.centres === false ? "" : `<circle cx="${mark.x}" cy="${mark.y}" r=".9"/>`}${options.widths === false ? "" : `<text x="${mark.tx}" y="${mark.ty}" font-size="5" font-family="sans-serif">${mark.width}</text>`}`) : [];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${faint(construction)}${layout}${marks.join("")}${shapes.join("")}</svg>`;
};

/** The centre marks of some `centres` steps: a dot at each centre, and beside it the number of the compass width, each further number at one centre a little to the right of the last. */
const marksOf = (construction: Construction, steps: readonly Step[]): { step: Step; x: number; y: number; tx: number; ty: number; width: number }[] => {
  const seen = new Map<string, number>();

  return steps.flatMap((step) =>
    step.op !== "centres"
      ? []
      : step.guides.flatMap((i) => {
          const guide = construction.guides[i];
          if (guide.at === undefined) return [];
          const nth = seen.get(String(guide.at)) ?? 0;
          seen.set(String(guide.at), nth + 1);

          return [{ step, x: guide.at[0], y: guide.at[1], tx: n3(guide.at[0] + 1.6 + 3.6 * nth) as unknown as number, ty: n3(guide.at[1] - 1.4) as unknown as number, width: guide.width ?? 0 }];
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
 * quickly, then its shapes inked), then the guides rubbed out.
 * When it ends, and wherever the animation is not run (a reader who asks for less motion, or an old browser), what is
 * on the page is the finished crest, the same paths as `staticSvg` draws. No script: pure SVG and CSS.
 *
 * @param construction - A crest's construction (`crestSteps()` loads it).
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
export const animatedSvg = (construction: Construction, options: AnimateOptions = {}): string => {
  const speed = options.speed !== undefined && options.speed > 0 ? options.speed : 1;
  const loop = options.loop === true;
  const prefix = sanitize(options.id ?? "k");
  const showGuides = options.guides !== false;
  const plan = timeline(construction);
  const hold = loop ? 1.4 : 0;
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
      `@keyframes ${prefix}-${name}{0%{opacity:0;stroke-dashoffset:1}${pct(at)}{opacity:1;stroke-dashoffset:1;${ease}}${pct(at + trace)}{opacity:1;stroke-dashoffset:0}${pct(plan.fade)}{opacity:1;${ease}}${pct(plan.fade + FADE)}{opacity:0;stroke-dashoffset:0}100%{opacity:0;stroke-dashoffset:0}}`,
    );
  };
  const marks: string[] = [];
  // When each shape is traced, thickened and filled.
  const traced = new Map<number, Timed>();
  const thickened = new Map<number, Timed>();
  construction.steps.forEach((step, i) => {
    const times = plan.at[i];
    if (step.op === "trace" || step.op === "thicken") for (const index of step.shapes) (step.op === "trace" ? traced : thickened).set(index, times);
    if (!showGuides) return;
    if (step.op === "guide") {
      const name = `g${step.guide}`;
      guideBody.push(`<path class="${prefix}-${name} ${prefix}-g" pathLength="1" d="${construction.guides[step.guide].d}"/>`);
      strike(name, times.t0, GUIDE_TRACE);
    }
    if (step.op === "centres") {
      const name = `c${i}`;
      strike(name, times.t0, 0.15);
      for (const mark of marksOf(construction, construction.steps.slice(0, i + 1)).filter((one) => one.step === step)) {
        marks.push(`<circle class="${prefix}-${name} ${prefix}-c" cx="${mark.x}" cy="${mark.y}" r=".9"/><text class="${prefix}-${name} ${prefix}-w" x="${mark.tx}" y="${mark.ty}">${mark.width}</text>`);
      }
    }
  });
  let placed = 0;
  construction.steps.forEach((step, i) => {
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
      // A shape no step traced is traced as it is drawn; one built at a place is filled as soon as it is traced there.
      const trace = traced.get(index) ?? { t0: times.t0, t1: times.t0 + (times.t1 - times.t0) * 0.6 };
      const thick = thickened.get(index);
      const fill = step.op === "turn" ? { t0: trace.t1, t1: trace.t1 + (times.per ?? 0) * 0.2 } : { t0: Math.max(times.t0, trace.t1), t1: times.t1 };
      rules.push(animate(name, shape.kind === "stroke" ? "stroke-dasharray:1 1;" : ""));
      if (shape.kind === "stroke") {
        body.push(pathOf(shape, `class="${prefix}-${name}" pathLength="1"`));
        keyframes.push(
          `@keyframes ${prefix}-${name}{0%{stroke-opacity:0;stroke-dashoffset:1}${pct(trace.t0)}{stroke-opacity:1;stroke-dashoffset:1;${ease}}${pct(trace.t1)}{stroke-opacity:1;stroke-dashoffset:0}100%{stroke-opacity:1;stroke-dashoffset:0}}`,
        );
      } else {
        const heavy = thick === undefined ? "" : `${pct(thick.t0)}{stroke-width:.5;${ease}}${pct(thick.t1)}{stroke-width:1.3}`;
        const weight = thick === undefined ? ".5" : "1.3";
        body.push(pathOf(shape, `class="${prefix}-${name} ${prefix}-f" pathLength="1"`));
        keyframes.push(
          `@keyframes ${prefix}-${name}{0%{fill-opacity:0;stroke-opacity:0;stroke-dashoffset:1;stroke-width:.5}${pct(trace.t0)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:1;stroke-width:.5;${ease}}${pct(trace.t1)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:0;stroke-width:.5}${heavy}${pct(fill.t0)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:0;stroke-width:${weight};${ease}}${pct(fill.t1)}{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0;stroke-width:${weight}}100%{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0}}`,
        );
      }
    }
  });
  // The base styles are the finished crest: guides gone, fills solid, outlines gone. A reader who asks for less motion
  // gets exactly these, and so does anyone whose browser ignores the animation.
  const base = `${classOf("g")}{fill:none;stroke:currentColor;stroke-width:.8;stroke-dasharray:1 1;opacity:0}${classOf("f")}{stroke:currentColor;stroke-width:1.1;stroke-opacity:0;stroke-dasharray:1 1}${classOf("c")},${classOf("w")}{opacity:0;font:5px sans-serif}`;
  // The switches: an option here, or `centres`, `widths` or `fill` set to `off` on the element (or anything else) the drawing is in.
  // With the fill off the crest stays line art: each shape's own outline, never filled.
  const off = (name: string, set: boolean | undefined, style: string): string => `${set === false ? "" : `[${name}=off] `}${classOf(name[0])}{${style}}`;
  const switches = `${off("centres", options.centres, "display:none")}${off("widths", options.widths, "display:none")}${off("fill", options.fill, "fill:none!important;stroke-opacity:1!important;stroke-width:.6!important")}`;
  // Two custom properties hold and seek every animation at once: `--kamon-play:paused` stops them where they are, and
  // `--kamon-at:-3s` puts them three seconds in. The element's pause and scrubber set them; left unset, it plays.
  const held = `[class^="${prefix}-"]{animation-play-state:var(--kamon-play,running);animation-delay:var(--kamon-at,0s)}`;
  const reduced = `@media (prefers-reduced-motion:reduce){[class^="${prefix}-"]{animation:none!important}}`;
  // Strokes drawn as lines take dashes to be drawn in; their finished state is whole.
  const css = `${base}${rules.join("")}${held}${keyframes.join("")}${reduced}${switches}`;
  // Guides come first in the document, so that the shapes sit on top of them.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><style>${escapeText(css)}</style>${faint(construction)}${guideBody.length === 0 ? "" : `<g opacity=".55">${guideBody.join("")}</g>`}${marks.join("")}${body.join("")}</svg>`;
};
