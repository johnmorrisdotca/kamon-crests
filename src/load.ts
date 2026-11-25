// The entry @johnmorrisdotca/kamon-crests/load: a crest by its id, fetched when it is wanted. Each crest is its own
// dynamic import, so a bundler makes a small chunk of each and a page downloads only the crests it shows.

import { LOADERS, STEP_LOADERS } from "./data/loaders.data";
import type { Construction } from "./render";
import { mustBeString, paint, toDataUri } from "./svg";
import type { PaintOptions } from "./svg";

const idOf = (id: string): string => mustBeString(id, "id").trim().toLowerCase().replace(/[\s_]+/g, "-");

const isEmpty = (options: PaintOptions | undefined): boolean => options === undefined || (options.color === undefined && options.background === undefined && options.title === undefined);

/**
 * A crest's SVG string by its id, loaded when asked for: one dynamic import of `/crests/<id>`.
 *
 * @param id - A crest's id, loosely written: "mitsuba-aoi", "Mitsuba Aoi".
 * @param options - `color`, `background` and `title`, as for `paint()`; the crest as it is when left out.
 * @returns A promise of the SVG string, or of `null` when there is no such crest.
 * @throws TypeError, synchronously, when `id` is not a string or an option is not valid.
 *
 * @example
 * ```ts
 * import { crest } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const aoi = await crest("mitsuba-aoi");                               // "<svg …>"
 * const gold = await crest("kikyo", { color: "#b8860b", title: "Bellflower" });
 * console.log(await crest("nope"));                                      // null
 * ```
 */
export const crest = (id: string, options?: PaintOptions): Promise<string | null> => {
  const known = idOf(id);
  if (options !== undefined) paint("<svg></svg>", options);
  const loader = Object.hasOwn(LOADERS, known) ? LOADERS[known] : undefined;
  if (loader === undefined) return Promise.resolve(null);

  return loader().then((module) => (isEmpty(options) ? module.default : paint(module.default, options)));
};

/**
 * A crest as a `data:` URI by its id, loaded when asked for: ready for an `<img src>` or a CSS `url()`.
 *
 * @param id - A crest's id, loosely written.
 * @param options - As for `paint()`.
 * @returns A promise of `data:image/svg+xml,…`, or of `null` when there is no such crest.
 * @throws TypeError, synchronously, when `id` is not a string or an option is not valid.
 *
 * @example
 * ```ts no-run
 * import { crestDataUri } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const picture = document.createElement("img");
 * picture.src = (await crestDataUri("janome", { color: "#222" })) ?? "";
 * ```
 */
export const crestDataUri = (id: string, options?: PaintOptions): Promise<string | null> => {
  const known = idOf(id);
  if (options !== undefined) paint("<svg></svg>", options);
  const loader = Object.hasOwn(LOADERS, known) ? LOADERS[known] : undefined;
  if (loader === undefined) return Promise.resolve(null);

  return loader().then((module) => toDataUri(module.default, options));
};

/**
 * How a crest is constructed: its layout guides, its shapes and the ordered steps that draw them. The shapes are the
 * paths of the finished crest, so the last step of the construction is the crest.
 *
 * @param id - A crest's id, loosely written.
 * @returns A promise of the construction, or of `null` when there is no such crest.
 * @throws TypeError, synchronously, when `id` is not a string.
 *
 * @example
 * ```ts
 * import { crestSteps } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const steps = await crestSteps("mitsu-uroko");
 * console.log(steps?.steps.map((step) => step.op)); // ["guide", …, "draw", "draw", "draw", "fade"]
 * ```
 */
export const crestSteps = (id: string): Promise<Construction | null> => {
  const known = idOf(id);
  const loader = Object.hasOwn(STEP_LOADERS, known) ? STEP_LOADERS[known] : undefined;

  return loader === undefined ? Promise.resolve(null) : loader().then((module) => module.default);
};

/**
 * How a crest is constructed, in a line in each language: the text that goes with its steps. It is not on the manifest's records,
 * and loads with the crest's steps (the same file as `crestSteps()`, fetched once), so a page that never shows it never pays for it.
 *
 * @param id - A crest's id, loosely written.
 * @returns A promise of `{ en, ja }`, or of `null` when there is no such crest.
 * @throws TypeError, synchronously, when `id` is not a string.
 *
 * @example
 * ```ts
 * import { crestConstruction } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const text = await crestConstruction("mitsu-uroko");
 * console.log(text?.en, text?.ja);   // how it is struck, in English and in Japanese
 * console.log(await crestConstruction("nope")); // null
 * ```
 */
export const crestConstruction = (id: string): Promise<{ en: string; ja: string } | null> => {
  const known = idOf(id);
  const loader = Object.hasOwn(STEP_LOADERS, known) ? STEP_LOADERS[known] : undefined;

  return loader === undefined ? Promise.resolve(null) : loader().then((module) => module.description);
};

/**
 * A crest drawn as it is constructed: an SVG with its own CSS animation that draws the layout guides, traces each
 * shape and fills it in, then rubs the guides out. When it ends, and wherever animation is not run, it is the finished crest.
 *
 * @param id - A crest's id, loosely written.
 * @param options - `speed`, `loop`, `id` (a name for its styles when several are on one page) and `guides`, as for `animatedSvg()`; and `color`, `background` and `title`, as for `paint()`.
 * @returns A promise of the animated SVG, or of `null` when there is no such crest.
 * @throws TypeError, synchronously, when `id` is not a string or an option is not valid.
 *
 * @example
 * ```ts
 * import { animatedCrest } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const svg = await animatedCrest("maru-ni-juji", { speed: 1.5, loop: true });
 * console.log(svg?.includes("@keyframes")); // true
 * ```
 */
export const animatedCrest = (id: string, options: AnimatedOptions = {}): Promise<string | null> => {
  const known = idOf(id);
  const { color, background, title, ...play } = options;
  paint("<svg></svg>", { color, background, title });

  return crestSteps(known).then((construction) =>
    construction === null ? null : import("./animate.js").then((animate) => paint(animate.animatedSvg(construction, { ...play, id: play.id ?? `kc-${known}` }), { color, background, title })),
  );
};

/**
 * What `animatedCrest()` takes: how it plays, and how it is painted.
 *
 * @example
 * ```ts
 * import type { AnimatedOptions } from "@johnmorrisdotca/kamon-crests/load";
 *
 * const options: AnimatedOptions = { speed: 2, loop: true, color: "#8a1c1c" };
 * console.log(options.speed); // 2
 * ```
 */
export interface AnimatedOptions extends PaintOptions {
  speed?: number;
  loop?: boolean;
  id?: string;
  guides?: boolean;
}

export type { Construction } from "./render";
