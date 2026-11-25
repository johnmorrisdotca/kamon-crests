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
 * What sort of variant a crest is of its family's plain form, in the order the crest books give them: the plain form itself (`base`), a
 * different form of the motif (`form`: 裏, 鬼, 八重, or a turn to the right), a shaded one (`tone`: 陰), another count (`count`), the same
 * crest in a frame (`frame`: 丸に, 亀甲に), another way of setting it out (`arrangement`: 並び, 違い, 向かい), a combination with another
 * motif (`combination`), and a variant a house is named for (`house`).
 *
 * @example
 * ```ts
 * import { manifest, type VariantKind } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const kind: VariantKind | undefined = manifest("maru-ni-sagari-fuji")?.variantKind;
 * console.log(kind); // "frame"
 * ```
 */
export type VariantKind = "base" | "form" | "tone" | "count" | "frame" | "arrangement" | "combination" | "house";

/**
 * One of the seven chapters of the crest books: plants, animals, nature and sky, objects, buildings, patterns and shapes, characters.
 *
 * @example
 * ```ts
 * import { CHAPTERS, type Chapter } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const first: Chapter = CHAPTERS[0];
 * console.log(first.ja); // "植物紋"
 * ```
 */
export interface Chapter {
  id: "plants" | "animals" | "nature" | "objects" | "buildings" | "patterns" | "characters";
  ja: string;
  en: string;
}

/**
 * A motif family: the crests that are versions of one motif, such as every wisteria (`fuji`). It is not a house: `CrestRecord.families`
 * names the clans that bore a crest, and a record's `family` is the id of one of these.
 *
 * @example
 * ```ts
 * import { motifFamily, type MotifFamily } from "@johnmorrisdotca/kamon-crests/manifest";
 *
 * const fuji: MotifFamily | null = motifFamily("fuji");
 * console.log(fuji?.ja, fuji?.reading); // "藤" "ふじ"
 * ```
 */
export interface MotifFamily {
  /** The romaji of its reading: "fuji". */
  id: string;
  /** The id of its chapter. */
  chapter: Chapter["id"];
  /** Its name in Japanese, and in English, as the coverage list writes them. */
  ja: string;
  en: string;
  /** Its reading in hiragana: the order families stand in within a chapter. */
  reading: string;
  /** The id of its plain form, which is the first of its crests. */
  base: string;
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
  /**
   * The catalogue number, as the crest books number their crests: given once, in the order of the books (chapter, family, variant), and
   * never changed. A crest added later takes the next number, wherever it stands in the order.
   */
  no: number;
  name: CrestName;
  /** The id of its motif family (`MotifFamily`): "fuji" for every wisteria. Not `families`, which are the houses that bore the crest. */
  family: string;
  /** The family's reading in hiragana: the order families stand in within a chapter. */
  familyReading: string;
  /**
   * The crest this is a variant of. For a frame variant (`variantKind` "frame") it is the same crest with no frame, which differs from
   * it by the frame alone. For every other crest it is the family's plain form, and for that form itself, its own id.
   */
  base: string;
  /** What sort of variant of its base it is. */
  variantKind: VariantKind;
  /** Its place among the crests of its family that are of its kind, from 1. */
  variantRank: number;
  /** A frame's id: "none", "ring-thin", "ring-medium", "hexagon", "mokko". */
  frame: string;
  motifs: MotifUse[];
  families: FamilyUse[];
  /** Other names it can be found by. */
  aliases: string[];
  /**
   * How it is constructed, in a line in each language. Not on the manifest's records, to keep the manifest small: `crestConstruction()`
   * loads it, with the crest's steps. It is here for a record of your own.
   */
  construction?: { en: string; ja: string };
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
