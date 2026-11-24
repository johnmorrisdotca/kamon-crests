// The entry @johnmorrisdotca/kamon-crests/names: a crest's name in English or Japanese, without the manifest.

import { NAMES } from "./data/names.data";
import { mustBeString } from "./svg";

/**
 * A crest's name.
 *
 * @param id - A crest's id, loosely written.
 * @param lang - `en` or `ja`; English when left out.
 * @returns "Three hollyhock leaves" or "三つ葉葵", or `null` when there is no such crest.
 * @throws TypeError when `id` is not a string.
 *
 * @example
 * ```ts
 * import { crestName } from "@johnmorrisdotca/kamon-crests/names";
 *
 * console.log(crestName("mitsuba-aoi", "ja")); // "三つ葉葵"
 * console.log(crestName("nope"));              // null
 * ```
 */
export const crestName = (id: string, lang: "en" | "ja" = "en"): string | null => {
  const written = mustBeString(id, "id").trim().toLowerCase().replace(/[\s_]+/g, "-");
  const row = Object.hasOwn(NAMES, written) ? NAMES[written] : undefined;

  return row === undefined ? null : row[lang === "ja" ? 1 : 0];
};
