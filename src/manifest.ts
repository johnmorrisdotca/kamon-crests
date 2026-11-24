// The entry @johnmorrisdotca/kamon-crests/manifest: every crest's record, with its names, reading, parts, families,
// present-day users and the size of its drawing. Heavier than the main entry; load it when a page lists or searches.

import { RECORDS } from "./data/records.data";
import { mustBeString } from "./svg";
import type { CrestRecord } from "./manifest.types";

/**
 * Every crest's record, in the order of the catalogue.
 *
 * @example
 * ```ts
 * import { MANIFEST } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * console.log(MANIFEST.length > 50); // true
 * console.log(MANIFEST[0].name.ja);  // "蛇の目"
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

export type { CrestName, CrestRecord, FamilyUse, MotifUse, UsedBy } from "./manifest.types";
