// What a crest is written as: its names, its parts, who used it, and the function that draws it.
import type { Builder } from "../construct/builder.ts";

export interface Bi {
  en: string;
  ja: string;
}

export interface MotifUse {
  /** A motif's id from src/parts.ts. */
  motif: string;
  /** How many of it. */
  count: number;
  /** An arrangement's id from src/parts.ts. */
  arrangement: string;
  /** Which way it turns, where that is part of the design. */
  turn?: "left" | "right";
}

export interface FamilyUse {
  en: string;
  ja: string;
  /** The reading of the Japanese name, in hiragana. */
  reading?: string;
}

export interface CrestDef {
  id: string;
  name: Bi;
  /** The Japanese name in hiragana. */
  reading: string;
  /** The Japanese name in Hepburn romaji, with long vowels marked. */
  romaji: string;
  frame: string;
  motifs: MotifUse[];
  /** The families, clans and houses that bore it, as they are generally recorded. */
  families: FamilyUse[];
  /** Other names it is searched by. */
  aliases?: string[];
  /** One line on how it is constructed, in both languages. */
  construction: Bi;
  /** For a crest drawn from a period crest book: the book, the page and the place on it, and the day it was read. */
  source?: BookSource;
  build: (c: Builder) => void;
}

/** One present-day user of a crest, as a public source states it. We draw the historical crest only, never the user's own logo. */
export interface UsedByEntry {
  name: Bi;
  kind: "company" | "government" | "shrine-temple" | "town" | "team" | "other";
  /** `logo-derived`: its logo descends from this crest. `uses`: it uses this crest. `emblem`: it is that body's emblem. `name-derived`: its name comes from this design. */
  relation: "logo-derived" | "uses" | "emblem" | "name-derived";
  /** The relation in words, in both languages. */
  note: Bi;
  /** The public pages that state it, with the day each was read. */
  sources: { title: string; url: string; read: string }[];
}

/**
 * A public-domain period crest book a crest is vectorised from: its title, its permanent page at the National Diet Library, the
 * frame (koma) of the scan, where the crest stands on it, and the day it was read.
 */
export interface BookSource {
  /** The book's title as printed, its year, and the year in the Western calendar. */
  title: string;
  /** The book in English words. */
  titleEn: string;
  year: number;
  /** Its permanent page in the National Diet Library Digital Collections. */
  url: string;
  /** The frame of the scan the crest is on. */
  frame: number;
  /** Where on that frame, and the crest's name as the book writes it. */
  place: Bi;
  read: string;
}
