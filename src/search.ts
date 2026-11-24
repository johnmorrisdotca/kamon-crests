// The entry @johnmorrisdotca/kamon-crests/search: find crests by their parts, their names, their families and who uses them.

import { MANIFEST } from "./manifest.js";
import type { CrestRecord } from "./manifest.js";
import { motifTerm, term } from "./parts.js";

/**
 * What `findCrests()` asks. Every field that is given must match (and); a field that takes several values matches
 * any of them (or). Left out, a field asks nothing.
 *
 * @example
 * ```ts
 * import type { CrestQuery } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const ringedPlants: CrestQuery = { ring: true, motifKind: "plant" };
 * const threes: CrestQuery = { count: 3 };
 * console.log(ringedPlants.ring, threes.count);
 * ```
 */
export interface CrestQuery {
  /** Words to find in an id, a name (English, Japanese, reading, romaji), an alias, a family, a motif's name or a present-day user. Every word must be found. */
  text?: string;
  /** A frame's id, or several: "none", "ring-thin", "ring-medium", "hexagon", "mokko". */
  frame?: string | string[];
  /** True for any ring (thin or medium), false for none. */
  ring?: boolean;
  /** A motif's id, or several: "paulownia", "tomoe". */
  motif?: string | string[];
  /** The kind of the motif: "plant", "animal", "object", "shape" or "sky". */
  motifKind?: "plant" | "animal" | "object" | "shape" | "sky" | Array<"plant" | "animal" | "object" | "shape" | "sky">;
  /** How many of some motif there are: 3 finds every crest with three of something. */
  count?: number;
  /** An arrangement's id, or several: "radial", "crossed", "hanging". */
  arrangement?: string | string[];
  /** Which way a motif turns. */
  turn?: "left" | "right";
  /** Words in the name of a family or clan that bore it: "Tokugawa", "徳川". */
  family?: string;
  /** True for crests that have a present-day user; a kind ("company", "government", "shrine-temple", "town", "team", "other") for crests used by that kind. */
  usedBy?: boolean | "company" | "government" | "shrine-temple" | "town" | "team" | "other";
}

/** Folds case, accents and macrons, katakana to hiragana, and drops spaces and punctuation, so that "Kikkō" finds "kikko" and "ともえ" finds "トモエ". */
const fold = (text: string): string =>
  text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .toLowerCase()
    .replace(/[\s'’"().,·・\-_]+/g, "");

const words = (text: string): string[] => text.split(/\s+/).map(fold).filter((word) => word !== "");

const haystackOf = (record: CrestRecord): string => {
  const parts: string[] = [record.id, record.name.en, record.name.ja, record.name.reading, record.name.romaji, ...record.aliases];
  for (const family of record.families) parts.push(family.en, family.ja, family.reading ?? "");
  for (const use of record.motifs) {
    const motif = term(use.motif);
    parts.push(motif?.en ?? "", motif?.ja ?? "", motif?.reading ?? "", motif?.romaji ?? "");
  }
  for (const user of record.usedBy) parts.push(user.name.en, user.name.ja);

  return fold(parts.join(" "));
};

const HAYSTACKS = new WeakMap<CrestRecord, string>();
const haystack = (record: CrestRecord): string => {
  let text = HAYSTACKS.get(record);
  if (text === undefined) {
    text = haystackOf(record);
    HAYSTACKS.set(record, text);
  }

  return text;
};

const list = <T>(value: T | T[] | undefined): T[] | undefined => (value === undefined ? undefined : Array.isArray(value) ? value : [value]);

/**
 * The crests that match a query, in the order of the catalogue.
 *
 * @param query - What to find; see `CrestQuery`. An empty query finds every crest.
 * @returns The matching records (see `/manifest`).
 *
 * @example
 * ```ts
 * import { findCrests } from "@johnmorrisdotca/kamon-crests/search";
 *
 * console.log(findCrests({ motif: "paulownia" }).map((record) => record.id));  // every crest with paulownia
 * console.log(findCrests({ ring: true }).length);                              // every ringed crest
 * console.log(findCrests({ count: 3 }).length);                                // every crest with three of something
 * console.log(findCrests({ text: "tokugawa" })[0]?.id);                        // "mitsuba-aoi"
 * console.log(findCrests({ text: "ともえ" }).length);                         // by reading
 * ```
 */
export const findCrests = (query: CrestQuery = {}): CrestRecord[] => {
  const frames = list(query.frame);
  const motifs = list(query.motif);
  const kinds = list(query.motifKind);
  const arrangements = list(query.arrangement);
  const needles = query.text === undefined ? [] : words(query.text);
  const family = query.family === undefined ? undefined : fold(query.family);

  return MANIFEST.filter((record) => {
    if (frames !== undefined && !frames.includes(record.frame)) return false;
    if (query.ring === true && !record.frame.startsWith("ring-")) return false;
    if (query.ring === false && record.frame.startsWith("ring-")) return false;
    if (motifs !== undefined && !record.motifs.some((use) => motifs.includes(use.motif))) return false;
    if (kinds !== undefined && !record.motifs.some((use) => kinds.includes(motifTerm(use.motif)?.kind as never))) return false;
    if (query.count !== undefined && !record.motifs.some((use) => use.count === query.count)) return false;
    if (arrangements !== undefined && !record.motifs.some((use) => arrangements.includes(use.arrangement))) return false;
    if (query.turn !== undefined && !record.motifs.some((use) => use.turn === query.turn)) return false;
    if (family !== undefined && !record.families.some((one) => fold(`${one.en} ${one.ja} ${one.reading ?? ""}`).includes(family))) return false;
    if (query.usedBy === true && record.usedBy.length === 0) return false;
    if (typeof query.usedBy === "string" && !record.usedBy.some((user) => user.kind === query.usedBy)) return false;
    if (needles.length > 0) {
      const text = haystack(record);
      if (!needles.every((word) => text.includes(word))) return false;
    }

    return true;
  });
};

/**
 * How many crests have each part: the numbers a page puts on its chips.
 *
 * @example
 * ```ts
 * import { facets, type Facets } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const counts: Facets = facets();
 * console.log(counts.motifs.tomoe); // 3
 * ```
 */
export interface Facets {
  frames: Record<string, number>;
  motifs: Record<string, number>;
  counts: Record<string, number>;
  arrangements: Record<string, number>;
  usedBy: Record<string, number>;
}

/**
 * Counts, over some crests, how many have each frame, motif, count, arrangement and kind of present-day user: the
 * numbers on a search page's chips, which change as the search narrows.
 *
 * @param records - The crests to count; every crest when left out.
 * @returns A count for every id that occurs at least once.
 *
 * @example
 * ```ts
 * import { facets, findCrests } from "@johnmorrisdotca/kamon-crests/search";
 *
 * console.log(facets().frames["none"] > 10);                    // true
 * console.log(facets(findCrests({ ring: true })).motifs.tomoe); // how many ringed crests have tomoe
 * ```
 */
export const facets = (records: readonly CrestRecord[] = MANIFEST): Facets => {
  const out: Facets = { frames: {}, motifs: {}, counts: {}, arrangements: {}, usedBy: {} };
  const bump = (table: Record<string, number>, key: string): void => void (table[key] = (table[key] ?? 0) + 1);
  for (const record of records) {
    bump(out.frames, record.frame);
    for (const id of new Set(record.motifs.map((use) => use.motif))) bump(out.motifs, id);
    for (const count of new Set(record.motifs.map((use) => String(use.count)))) bump(out.counts, count);
    for (const id of new Set(record.motifs.map((use) => use.arrangement))) bump(out.arrangements, id);
    for (const kind of new Set(record.usedBy.map((user) => user.kind))) bump(out.usedBy, kind);
  }

  return out;
};

/**
 * One part of a crest, for listing: what sort it is, its id, and how many where that matters.
 *
 * @example
 * ```ts
 * import type { PartRef } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const part: PartRef = { kind: "motif", id: "tomoe" };
 * console.log(part.kind); // "motif"
 * ```
 */
export interface PartRef {
  kind: "frame" | "motif" | "arrangement" | "turn" | "count";
  id: string;
  /** The count of a motif. */
  count?: number;
  /** Which motif an arrangement, turn or count belongs to. */
  of?: string;
}

/**
 * A crest's parts as a flat list: its frame, then for each motif the motif, its count, its arrangement and its turn.
 *
 * @param record - A crest's record.
 * @returns The parts, in reading order.
 *
 * @example
 * ```ts
 * import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";
 * import { partsOf } from "@johnmorrisdotca/kamon-crests/search";
 *
 * console.log(partsOf(manifest("maru-ni-hidari-mitsu-tomoe")!).map((part) => `${part.kind}:${part.id}`));
 * // ["frame:ring-medium", "motif:tomoe", "count:3", "arrangement:radial", "turn:left"]
 * ```
 */
export const partsOf = (record: CrestRecord): PartRef[] => {
  const out: PartRef[] = [{ kind: "frame", id: record.frame }];
  for (const use of record.motifs) {
    out.push({ kind: "motif", id: use.motif }, { kind: "count", id: String(use.count), count: use.count, of: use.motif }, { kind: "arrangement", id: use.arrangement, of: use.motif });
    if (use.turn !== undefined) out.push({ kind: "turn", id: use.turn, of: use.motif });
  }

  return out;
};

