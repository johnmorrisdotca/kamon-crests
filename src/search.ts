// The entry @johnmorrisdotca/kamon-crests/search: find crests by their parts, their names, their families and who uses them.

import { MANIFEST } from "./manifest.js";
import type { CrestRecord, CrestStats } from "./manifest.js";
import { motifTerm, term } from "./parts.js";

/**
 * A count to search or sort by: one of a crest's `stats` that is a number.
 *
 * @example
 * ```ts
 * import type { CrestCount } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const by: CrestCount = "circles";
 * console.log(by);
 * ```
 */
export type CrestCount = Exclude<keyof CrestStats, "symmetry">;

/**
 * How many of a count a search asks for: exactly a number, or a range with a least (`min`), a most (`max`) or both.
 *
 * @example
 * ```ts
 * import type { CountRange } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const tenOrMore: CountRange = { min: 10 };
 * const exactlyFive: CountRange = 5;
 * console.log(tenOrMore, exactlyFive);
 * ```
 */
export type CountRange = number | { min?: number; max?: number };

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
 * const simplestFirst: CrestQuery = { circles: { min: 10 }, sort: "strokes" };
 * console.log(ringedPlants.ring, threes.count, simplestFirst.sort);
 * ```
 */
export interface CrestQuery extends Partial<Record<CrestCount, CountRange>> {
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
  /**
   * Put the crests found in order of a count rather than of the catalogue: `score`, `meter`, `grade`, `circles`, `lines`, `arcs`, `steps`,
   * `widths` or `fills`. `strokes` is circles, lines and arcs together, as a dictionary orders kanji by their strokes. Crests that
   * tie keep the catalogue's order; `rankCrests()` breaks ties by the steps.
   */
  sort?: CrestCount | "strokes";
  /** With `sort`: `asc` (the default) puts the fewest first, `desc` the most. */
  order?: "asc" | "desc";
}

const COUNTS: CrestCount[] = ["score", "meter", "grade", "circles", "lines", "arcs", "steps", "widths", "fills"];

/**
 * Folds case, accents and macrons, katakana to hiragana, long vowels written out ("ou", "oo", "uu") to one vowel, and drops
 * spaces and punctuation (hyphens, apostrophes), so that "Kikkō" finds "kikko", "ともえ" finds "トモエ" and "Marunigosan-kiri"
 * finds "maru ni gosan no kiri" written without its "no".
 */
const fold = (text: string): string =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .toLowerCase()
    .replace(/[\s'’‘"().,·・\-_‐–—]+/g, "")
    .replace(/ou|oo/g, "o")
    .replace(/uu/g, "u");

/** A romanised name with its particle "no" left out, as names are often written in English: "gosan no kiri" as "gosan kiri". */
const withoutNo = (text: string): string => text.replace(/[\s-]+no[\s-]+/gi, " ");

const words = (text: string): string[] => text.split(/\s+/).map(fold).filter((word) => word !== "");

const haystackOf = (record: CrestRecord): string => {
  const parts: string[] = [record.id, record.name.en, record.name.ja, record.name.reading, record.name.romaji, ...record.aliases];
  for (const name of [record.id, record.name.romaji, ...record.aliases]) if (withoutNo(name) !== name) parts.push(withoutNo(name));
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
 * The crests that match a query, in the order of the catalogue, or of a count when `sort` names one.
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
 * console.log(findCrests({ circles: 2 }).length);                              // every crest of exactly two circles
 * console.log(findCrests({ circles: { min: 10 }, sort: "strokes" })[0]?.id);   // of ten circles or more, the fewest strokes first
 * ```
 */
export const findCrests = (query: CrestQuery = {}): CrestRecord[] => {
  const frames = list(query.frame);
  const motifs = list(query.motif);
  const kinds = list(query.motifKind);
  const arrangements = list(query.arrangement);
  const needles = query.text === undefined ? [] : words(query.text);
  const family = query.family === undefined ? undefined : fold(query.family);

  const found = MANIFEST.filter((record) => {
    for (const key of COUNTS) {
      const want = query[key];
      const have = record.stats[key];
      if (typeof want === "number" ? have !== want : want !== undefined && (have < (want.min ?? -Infinity) || have > (want.max ?? Infinity))) return false;
    }
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
  const sort = query.sort;
  if (sort === undefined) return found;
  const of = (record: CrestRecord): number => (sort === "strokes" ? record.stats.circles + record.stats.lines + record.stats.arcs : record.stats[sort]);

  return found.sort((a, b) => (query.order === "desc" ? of(b) - of(a) : of(a) - of(b)));
};

/**
 * The five grades of complexity, by `stats.grade`: their names in English and Japanese, and the least score of each (`from`): a grade runs up to the next one's. The Japanese
 * names have not yet been checked by a native reader.
 *
 * @example
 * ```ts
 * import { GRADES, findCrests } from "@johnmorrisdotca/kamon-crests/search";
 *
 * const crest = findCrests({ text: "janome" })[0];
 * console.log(GRADES[crest.stats.grade - 1].en); // "Simple"
 * console.log(findCrests({ grade: 4 }).length, findCrests({ meter: { min: 70 } }).length);
 * ```
 */
export const GRADES: readonly { grade: 1 | 2 | 3 | 4 | 5; from: number; en: string; ja: string }[] = [
  { grade: 1, from: 0, en: "Simple", ja: "入門" },
  { grade: 2, from: 25, en: "Easy", ja: "初級" },
  { grade: 3, from: 100, en: "Moderate", ja: "中級" },
  { grade: 4, from: 300, en: "Hard", ja: "上級" },
  { grade: 5, from: 1000, en: "Master", ja: "名人" },
];

/**
 * Crests in order of how much there is to draw: by their complexity score (`stats.score`, weighted towards arcs) from the simplest,
 * unless another count or the other order is asked for. Crests that tie are ordered by their score, then by their steps, then as
 * the catalogue has them. The crests still being redrawn (`redrawing` in the record: traced from a crest book, so their arcs are
 * many more than there is to draw) are ranked among themselves and come last, either way.
 *
 * @param options - `by`: the count to rank by, `score` when left out. `order`: `asc` (the default) puts the least first, `desc` the most. `redrawing: true` ranks the crests still being redrawn among the rest.
 * @param records - The crests to rank, such as `findCrests()` found; every crest when left out.
 * @returns The records in rank order, as a new list.
 *
 * @example
 * ```ts
 * import { findCrests, rankCrests } from "@johnmorrisdotca/kamon-crests/search";
 *
 * console.log(rankCrests()[0].id);                                        // the simplest crest
 * console.log(rankCrests({ by: "circles", order: "desc" })[0].stats.circles); // the most circles
 * console.log(rankCrests({}, findCrests({ ring: true })).length);         // the ringed crests, simplest first
 * console.log(rankCrests().at(-1)?.redrawing);                            // true: the crests being redrawn come last
 * ```
 */
export const rankCrests = (options: { by?: CrestCount; order?: "asc" | "desc"; redrawing?: boolean } = {}, records: readonly CrestRecord[] = MANIFEST): CrestRecord[] => {
  const by = options.by ?? "score";
  const way = options.order === "desc" ? -1 : 1;
  const last = (record: CrestRecord): number => (options.redrawing !== true && record.redrawing === true ? 1 : 0);

  return [...records].sort((a, b) => last(a) - last(b) || way * (a.stats[by] - b.stats[by] || a.stats.score - b.stats.score || a.stats.steps - b.stats.steps) || MANIFEST.indexOf(a) - MANIFEST.indexOf(b));
};

/**
 * The most complex crests: the first `n` of `rankCrests({ order: "desc" })`, by score. The crests still being redrawn are left out.
 *
 * @param n - How many, 10 when left out.
 * @param records - The crests to choose from, such as `findCrests()` found; every crest when left out.
 * @returns At most `n` records, the most complex first.
 *
 * @example
 * ```ts
 * import { topCrests } from "@johnmorrisdotca/kamon-crests/search";
 *
 * console.log(topCrests(5).map((record) => `${record.id} ${record.stats.meter}`));
 * ```
 */
export const topCrests = (n = 10, records: readonly CrestRecord[] = MANIFEST): CrestRecord[] => rankCrests({ order: "desc" }, records.filter((record) => record.redrawing !== true)).slice(0, Math.max(0, n));

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

