// Kamon crests 家紋: Japanese family crests as SVG, drawn from their compass-and-ruler construction. The main entry
// carries the ids and the helpers, and no crest: each crest is its own module (@johnmorrisdotca/kamon-crests/crests/<id>),
// and @johnmorrisdotca/kamon-crests/load fetches one by its id when it is wanted.
//
// Every function is pure and works on strings: no DOM, no network, the same answer on a server and in a browser.

import { CREST_IDS } from "./data/ids.data";
import type { CrestId } from "./data/ids.data";
import { mustBeString, paint, toDataUri } from "./svg";
import type { PaintOptions } from "./svg";
import { VERSION } from "./version";

const ID_SET: ReadonlySet<string> = new Set(CREST_IDS);

const CDN = `https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@${VERSION.split(".")[0]}/dist/svg`;

/**
 * Where `crestUrl` finds the SVG files: a folder holding `<id>.svg`.
 *
 * @example
 * ```ts
 * import { crestUrl, type CrestUrlOptions } from "@johnmorrisdotca/kamon-crests";
 *
 * const own: CrestUrlOptions = { base: "/static/crests" };
 * console.log(crestUrl("janome", own)); // "/static/crests/janome.svg"
 * ```
 */
export interface CrestUrlOptions {
  /**
   * The folder's address, with or without a trailing slash. Left out, it is this major version on the jsDelivr CDN,
   * `https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/svg`. A page that copies
   * `node_modules/@johnmorrisdotca/kamon-crests/dist/svg` into its own files names that folder, such as `"/crests"`.
   */
  base?: string;
}

/**
 * True for one of the ids of a crest, written exactly as this package writes it: lower case, with hyphens.
 *
 * @param value - Anything.
 * @returns `true` when `value` is a string in `CREST_IDS`, and `false` for anything else, never throwing.
 *
 * @example
 * ```ts
 * import { isCrestId } from "@johnmorrisdotca/kamon-crests";
 *
 * console.log(isCrestId("mitsuba-aoi")); // true
 * console.log(isCrestId("Mitsuba Aoi")); // false: see crestId
 * ```
 */
export const isCrestId = (value: unknown): value is CrestId => typeof value === "string" && ID_SET.has(value);

/**
 * The id of a crest, from an id written loosely: either case, with spaces or underscores for the hyphens, and
 * surrounding space ("Mitsuba Aoi", " maru_ni_juji ").
 *
 * @param input - An id, loosely written.
 * @returns The id as this package writes it, or `null` when it is not one. Names and aliases are `findCrests`'s to resolve.
 * @throws TypeError when `input` is not a string.
 *
 * @example
 * ```ts
 * import { crestId } from "@johnmorrisdotca/kamon-crests";
 *
 * console.log(crestId(" Mitsuba Aoi ")); // "mitsuba-aoi"
 * console.log(crestId("tokugawa"));      // null: a clan is a search, not an id
 * ```
 */
export const crestId = (input: string): CrestId | null => {
  const written = mustBeString(input, "id").trim().toLowerCase().replace(/[\s_]+/g, "-");

  return isCrestId(written) ? written : null;
};

/**
 * The address of a crest's SVG file, for an `<img src>` or a CSS `url()`: on the jsDelivr CDN by default, or in a
 * folder of your own. The file is the same SVG as the module's string.
 *
 * @param id - A crest's id, loosely written.
 * @param options - `base`, the folder holding the `<id>.svg` files; the CDN when left out.
 * @returns The address (`…/janome.svg`), or `null` when there is no such crest.
 * @throws TypeError when `id` or `base` is not a string.
 *
 * @example
 * ```ts
 * import { crestUrl } from "@johnmorrisdotca/kamon-crests";
 *
 * console.log(crestUrl("janome"));                        // "https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/svg/janome.svg"
 * console.log(crestUrl("Maru ni Juji", { base: "/c/" })); // "/c/maru-ni-juji.svg"
 * console.log(crestUrl("nope"));                          // null
 * ```
 */
export const crestUrl = (id: string, options: CrestUrlOptions = {}): string | null => {
  const known = crestId(id);
  if (known === null) return null;
  const base = options.base === undefined ? CDN : mustBeString(options.base, "base");

  return `${base.replace(/\/+$/, "")}/${known}.svg`;
};

export { CREST_IDS, paint, toDataUri, VERSION };
export type { CrestId, PaintOptions };
