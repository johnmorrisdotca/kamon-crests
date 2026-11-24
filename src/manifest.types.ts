// The shape of a crest's record in the manifest.

/**
 * A name in both languages, with the Japanese's reading and its romaji.
 *
 * @example
 * ```ts
 * import type { CrestName } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const name: CrestName = { en: "Snake's eye", ja: "蛇の目", reading: "じゃのめ", romaji: "janome" };
 * console.log(name.reading); // "じゃのめ"
 * ```
 */
export interface CrestName {
  en: string;
  ja: string;
  /** The Japanese name in hiragana. */
  reading: string;
  /** The Japanese name in Hepburn romaji. */
  romaji: string;
}

/**
 * One motif of a crest: which, how many, how arranged, and which way it turns where that is part of the design.
 *
 * @example
 * ```ts
 * import type { MotifUse } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const three: MotifUse = { motif: "tomoe", count: 3, arrangement: "radial", turn: "left" };
 * console.log(three.count); // 3
 * ```
 */
export interface MotifUse {
  motif: string;
  count: number;
  arrangement: string;
  turn?: "left" | "right";
}

/**
 * A family, clan or house that bore the crest.
 *
 * @example
 * ```ts
 * import type { FamilyUse } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const clan: FamilyUse = { en: "Tokugawa", ja: "徳川", reading: "とくがわ" };
 * console.log(clan.ja); // "徳川"
 * ```
 */
export interface FamilyUse {
  en: string;
  ja: string;
  reading?: string;
}

/**
 * One present-day user of the crest, as a public source states it. The package draws the historical crest only, never the user's own logo.
 *
 * @example
 * ```ts
 * import type { UsedBy } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const user: UsedBy = {
 *   name: { en: "A company", ja: "ある会社" },
 *   kind: "company",
 *   relation: "logo-derived",
 *   note: { en: "Its logo descends from this crest.", ja: "ロゴはこの家紋に由来します。" },
 *   sources: [{ title: "A page", url: "https://example.com/", read: "2026-11-24" }],
 * };
 * console.log(user.kind); // "company"
 * ```
 */
export interface UsedBy {
  name: { en: string; ja: string };
  kind: "company" | "government" | "shrine-temple" | "town" | "team" | "other";
  relation: "logo-derived" | "uses" | "emblem" | "name-derived";
  note: { en: string; ja: string };
  /** The public pages that state it, with the day each was read. */
  sources: { title: string; url: string; read: string }[];
}

/**
 * A crest's counts, taken from its construction by `pnpm data` and never typed by hand: what a compass and a ruler do to draw it.
 * A page sorts by them as a dictionary sorts kanji by their strokes.
 *
 * @example
 * ```ts
 * import { manifest, type CrestStats } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const stats: CrestStats | undefined = manifest("janome")?.stats;
 * console.log(stats?.circles, stats?.widths); // 2 2: two circles, two compass widths
 * console.log(stats?.score);                  // 15: three for each arc, two for each circle, five for the second compass width
 * console.log(stats?.meter, stats?.grade);    // 29 1: the score on a fixed scale of 0 to 100, and its grade of 1 to 5
 * ```
 */
export interface CrestStats {
  /** Its complexity: three for each arc inked, two for each circle struck, one for each line ruled, and five for each compass width after the first. Crests of one score are ordered by their `steps`. */
  score: number;
  /** The score on a fixed scale of 0 to 100, 25 for each tenfold: a score of 10 is 25, of 100 is 50, of 1000 is 75. It does not change as crests are added. */
  meter: number;
  /** The score in five grades, at round numbers: 1 under 25, 2 from 25, 3 from 100, 4 from 300, 5 from 1000. `GRADES` in `/search` names them. */
  grade: 1 | 2 | 3 | 4 | 5;
  /** The compass circles struck, each in full, at every place a turn or a mirror builds; one that lands on a circle already struck counts once. */
  circles: number;
  /** The straight lines ruled, at every place; one that lands on a line already ruled counts once. */
  lines: number;
  /** The arcs inked, at every place. Arcs that follow one another along one struck circle are one, so a whole circle is one. */
  arcs: number;
  /** The steps of its construction. */
  steps: number;
  /** The distinct compass widths: the radii of its circles. */
  widths: number;
  /** Its solid shapes. */
  fills: number;
  /** How many places the finished crest can be turned to and look the same (1: none; 0: any, a circle), and whether it has a mirror line. */
  symmetry: { turns: number; mirror: boolean };
}

/**
 * Everything the package knows about one crest, apart from its drawing.
 *
 * @example
 * ```ts
 * import { manifest, type CrestRecord } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const record: CrestRecord | null = manifest("janome");
 * console.log(record?.name.ja); // "蛇の目"
 * ```
 */
export interface CrestRecord {
  id: string;
  name: CrestName;
  /** A frame's id: "none", "ring-thin", "ring-medium", "hexagon", "mokko". */
  frame: string;
  motifs: MotifUse[];
  families: FamilyUse[];
  /** Other names it can be found by. */
  aliases: string[];
  /** How it is constructed, in a line in each language. */
  construction: { en: string; ja: string };
  /** A short note to show with the crest, in both languages: set on the manji, which is not the Nazi swastika. */
  note?: { en: string; ja: string };
  usedBy: UsedBy[];
  /** The size of the SVG, in bytes. */
  bytes: number;
  /** How many layout guides, shapes and steps its construction has. */
  guides: number;
  shapes: number;
  steps: number;
  /** Its counts: its complexity score, circles, lines, arcs, steps, compass widths, fills and symmetry. */
  stats: CrestStats;
  /** Set on a crest still traced from a period crest book, with curves that are not arcs: it is being redrawn with compass and ruler, and until then its counts say more than there is to draw. */
  redrawing?: true;
}
