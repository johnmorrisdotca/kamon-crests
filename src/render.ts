// The one place a crest's construction becomes SVG text: the finished crest, and the same crest drawn step by step.
// Pure functions on strings: no DOM, no network. The build calls them to write each crest's module, and the package
// calls them to draw the construction animation, so the last frame of one is the other.

/**
 * A line of the crest's layout: a compass circle, a ruler line or an arc, drawn thin.
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
  type: "circle" | "line" | "arc";
  d: string;
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
}

/**
 * One step of the construction, in the order it is drawn: strike a guide, draw a part's shapes (traced as an outline, then
 * filled), or rub the guides out.
 *
 * @example
 * ```ts
 * import type { Step } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const steps: Step[] = [{ op: "guide", guide: 0 }, { op: "draw", part: "frame", shapes: [0] }, { op: "fade" }];
 * console.log(steps.map((step) => step.op)); // ["guide", "draw", "fade"]
 * ```
 */
export type Step =
  | { op: "guide"; guide: number }
  | { op: "draw"; part: string; shapes: number[] }
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

/**
 * The steps a construction is played in: every guide, then each group of shapes in turn, then the guides rubbed out.
 *
 * @param guides - The layout guides, in the order they are struck.
 * @param shapes - The shapes, in the order they are drawn; shapes of one group and one part are drawn together.
 * @returns The ordered steps: a `guide` step for each guide, a `draw` step for each group of shapes, and one `fade` when there are guides.
 *
 * @example
 * ```ts
 * import { stepsOf } from "@johnmorrisdotca/kamon-crests/animate";
 *
 * const steps = stepsOf([{ type: "circle", d: "M0 0" }], [{ part: "frame", kind: "stroke", d: "M0 0", width: 4.8, group: 1 }]);
 * console.log(steps.map((step) => step.op)); // ["guide", "draw", "fade"]
 * ```
 */
export const stepsOf = (guides: readonly Guide[], shapes: readonly Shape[]): Step[] => {
  const steps: Step[] = guides.map((_, guide) => ({ op: "guide", guide }));
  for (let i = 0; i < shapes.length; ) {
    let end = i;
    while (end + 1 < shapes.length && shapes[end + 1].group === shapes[i].group && shapes[end + 1].part === shapes[i].part) end += 1;
    steps.push({ op: "draw", part: shapes[i].part, shapes: Array.from({ length: end - i + 1 }, (_, k) => i + k) });
    i = end + 1;
  }
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

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">${construction.shapes.map((s) => pathOf(s)).join("")}${guides}</svg>`;
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
}

const sanitize = (id: string): string => id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 40) || "k";
const n3 = (n: number): string => String(Math.round(n * 1000) / 1000);

interface Timed {
  /** When tracing starts and ends, and when the fill is done, in seconds. */
  trace0: number;
  trace1: number;
  fill1: number;
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
export const durationOf = (construction: Pick<Construction, "steps">): number => timeline(construction.steps).total;

const GUIDE_TRACE = 0.45;
const GUIDE_GAP = 0.16;
const SHAPE_TRACE = 0.9;
const SHAPE_GAP = 0.42;
const FILL = 0.4;
const FADE = 0.7;

const timeline = (steps: readonly Step[]): { guides: number[]; draws: Timed[]; fade: number; total: number } => {
  let t = 0.2;
  const guides: number[] = [];
  const draws: Timed[] = [];
  let fade = -1;
  let lastEnd = t;
  for (const step of steps) {
    if (step.op === "guide") {
      guides.push(t);
      lastEnd = Math.max(lastEnd, t + GUIDE_TRACE);
      t += GUIDE_GAP;
    }
  }
  t = Math.max(t, lastEnd) + 0.25;
  for (const step of steps) {
    if (step.op === "draw") {
      draws.push({ trace0: t, trace1: t + SHAPE_TRACE, fill1: t + SHAPE_TRACE - 0.08 + FILL });
      lastEnd = t + SHAPE_TRACE - 0.08 + FILL;
      t += SHAPE_GAP;
    }
  }
  t = Math.max(t, lastEnd) + 0.2;
  if (guides.length > 0) {
    fade = t;
    t += FADE;
  }

  return { guides, draws, fade, total: t + 0.3 };
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
export const stepTimes = (construction: Pick<Construction, "steps">): number[] => {
  const plan = timeline(construction.steps);
  let guide = 0;
  let draw = 0;

  return construction.steps.map((step) => (step.op === "guide" ? plan.guides[guide++] : step.op === "draw" ? plan.draws[draw++].trace0 : plan.fade));
};

/**
 * The crest drawn as it is constructed, as an SVG with its own CSS animation: first the layout (the compass circles
 * and ruler lines, drawn thin), then each shape traced as an outline in order and filled in, then the guides rubbed out.
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
  const plan = timeline(construction.steps);
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
  if (showGuides) {
    construction.guides.forEach((guide, i) => {
      const at = plan.guides[i];
      const name = `g${i}`;
      guideBody.push(`<path class="${prefix}-${name} ${prefix}-g" pathLength="1" d="${guide.d}"/>`);
      rules.push(animate(name));
      keyframes.push(
        `@keyframes ${prefix}-${name}{0%{opacity:0;stroke-dashoffset:1}${pct(at)}{opacity:.55;stroke-dashoffset:1;${ease}}${pct(at + GUIDE_TRACE)}{opacity:.55;stroke-dashoffset:0}${pct(plan.fade)}{opacity:.55;${ease}}${pct(plan.fade + FADE)}{opacity:0;stroke-dashoffset:0}100%{opacity:0;stroke-dashoffset:0}}`,
      );
    });
  }
  let draw = 0;
  for (const step of construction.steps) {
    if (step.op !== "draw") continue;
    const times = plan.draws[draw];
    draw += 1;
    for (const index of step.shapes) {
      const shape = construction.shapes[index];
      const name = `s${index}`;
      rules.push(animate(name, shape.kind === "stroke" ? "stroke-dasharray:1 1;" : ""));
      if (shape.kind === "stroke") {
        body.push(pathOf(shape, `class="${prefix}-${name}" pathLength="1"`));
        keyframes.push(
          `@keyframes ${prefix}-${name}{0%{stroke-opacity:0;stroke-dashoffset:1}${pct(times.trace0)}{stroke-opacity:1;stroke-dashoffset:1;${ease}}${pct(times.trace1)}{stroke-opacity:1;stroke-dashoffset:0}100%{stroke-opacity:1;stroke-dashoffset:0}}`,
        );
      } else {
        body.push(pathOf(shape, `class="${prefix}-${name} ${prefix}-f" pathLength="1"`));
        keyframes.push(
          `@keyframes ${prefix}-${name}{0%{fill-opacity:0;stroke-opacity:0;stroke-dashoffset:1}${pct(times.trace0)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:1;${ease}}${pct(times.trace1)}{fill-opacity:0;stroke-opacity:1;stroke-dashoffset:0;${ease}}${pct(times.fill1)}{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0}100%{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0}}`,
        );
      }
    }
  }
  // The base styles are the finished crest: guides gone, fills solid, outlines gone. A reader who asks for less motion
  // gets exactly these, and so does anyone whose browser ignores the animation.
  const base = `${classOf("g")}{fill:none;stroke:currentColor;stroke-width:.8;stroke-dasharray:1 1;opacity:0}${classOf("f")}{stroke:currentColor;stroke-width:1.1;stroke-opacity:0;stroke-dasharray:1 1}`;
  const reduced = `@media (prefers-reduced-motion:reduce){[class^="${prefix}-"]{animation:none!important}}`;
  // Strokes drawn as lines take dashes to be drawn in; their finished state is whole.
  const css = `${base}${rules.join("")}${keyframes.join("")}${reduced}`;
  // Guides come first in the document, so that the shapes sit on top of them.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><style>${escapeText(css)}</style>${guideBody.join("")}${body.join("")}</svg>`;
};
