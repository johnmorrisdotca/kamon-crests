// The public-domain period crest books the organic crests are vectorised from, as the National Diet Library holds them.
import type { BookSource } from "./types.ts";

/** 伊呂波分新撰紋帳, edited by 井上勝五郎, published by 薫志堂, Tokyo, 1892 (明治25年). NDL marks it 保護期間満了 (public domain). */
export const SHINSEN_MONCHO: Omit<BookSource, "frame" | "place" | "read"> = {
  title: "伊呂波分新撰紋帳",
  titleEn: "Iroha-wake shinsen monchō (a new crest book in syllabary order), ed. Inoue Katsugorō, Kunshidō, 1892",
  year: 1892,
  url: "https://dl.ndl.go.jp/pid/780550",
};

/** The day the pages were read. */
export const READ = "2026-11-24";
