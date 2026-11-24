// The entry @johnmorrisdotca/kamon-crests/manifest: every crest's record, with its names, reading, parts, families,
// present-day users and the size of its drawing. Heavier than the main entry; load it when a page lists or searches.

import { CHAPTER_LIST, FAMILY_LIST } from "./data/families.data";
import { RECORDS } from "./data/records.data";
import { mustBeString } from "./svg";
import type { Chapter, CrestRecord, MotifFamily } from "./manifest.types";

/**
 * Every crest's record, in the order of the crest books: by chapter, then by family in the order of its reading, then in a family the
 * plain form, the other forms, the counts, the frames, the arrangements and the combinations (`variantKind`, then `variantRank`).
 *
 * @example
 * ```ts
 * import { MANIFEST } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(MANIFEST.length > 50); // true
 * console.log(MANIFEST[0].name.ja);  // "三つ葉葵"
 * ```
 */
export const MANIFEST: readonly CrestRecord[] = RECORDS;

const BY_ID: ReadonlyMap<string, CrestRecord> = new Map(RECORDS.map((record) => [record.id, record]));

/**
 * One crest's record.
 *
 * @param id - A crest's id, loosely written.
 * @returns The record, or `null` when there is no such crest.
 * @throws TypeError when `id` is not a string.
 *
 * @example
 * ```ts
 * import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const record = manifest("Mitsuba Aoi");
 * console.log(record?.name.reading); // "みつばあおい"
 * console.log(record?.frame);        // "none"
 * ```
 */
export const manifest = (id: string): CrestRecord | null => BY_ID.get(mustBeString(id, "id").trim().toLowerCase().replace(/[\s_]+/g, "-")) ?? null;

/**
 * The seven chapters of the crest books, in their order.
 *
 * @example
 * ```ts
 * import { CHAPTERS } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(CHAPTERS.map((chapter) => chapter.en).slice(0, 2)); // ["Plants", "Animals"]
 * ```
 */
export const CHAPTERS: readonly Chapter[] = CHAPTER_LIST;

/**
 * Every motif family, in the order of the books: by chapter, then by the reading of its name (gojūon). A family is the crests that are
 * versions of one motif: the wisteria (`fuji`), the paulownia (`kiri`), the tomoe. A family has at least one crest, its base.
 *
 * @example
 * ```ts
 * import { MOTIF_FAMILIES } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(MOTIF_FAMILIES[0].ja, MOTIF_FAMILIES.length > 20); // "葵" true
 * ```
 */
export const MOTIF_FAMILIES: readonly MotifFamily[] = FAMILY_LIST;

const FAMILY_BY_ID: ReadonlyMap<string, MotifFamily> = new Map(FAMILY_LIST.map((one) => [one.id, one]));

/**
 * One motif family.
 *
 * @param id - A family's id, such as `fuji`.
 * @returns The family, or `null` when there is no such family.
 * @throws TypeError when `id` is not a string.
 *
 * @example
 * ```ts
 * import { motifFamily } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(motifFamily("fuji")?.en); // "Wisteria"
 * console.log(motifFamily("nope"));     // null
 * ```
 */
export const motifFamily = (id: string): MotifFamily | null => FAMILY_BY_ID.get(mustBeString(id, "id").trim().toLowerCase()) ?? null;

/**
 * The crests of a crest's family, in the order of the books, the crest itself among them: the plain form, then its other forms, counts,
 * frames, arrangements and combinations.
 *
 * @param id - A crest's id, loosely written.
 * @returns The records of the family, or an empty list when there is no such crest.
 * @throws TypeError when `id` is not a string.
 *
 * @example
 * ```ts
 * import { variantsOf } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(variantsOf("maru-ni-sagari-fuji").map((record) => record.id)); // ["sagari-fuji", "maru-ni-sagari-fuji", "fuji-no-maru"]
 * ```
 */
export const variantsOf = (id: string): CrestRecord[] => {
  const record = manifest(id);

  return record === null ? [] : RECORDS.filter((other) => other.family === record.family);
};

export type { Chapter, CrestName, CrestRecord, CrestStats, FamilyUse, MotifFamily, MotifUse, UsedBy, VariantKind } from "./manifest.types";
