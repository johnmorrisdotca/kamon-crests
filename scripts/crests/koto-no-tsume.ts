import { SHINSEN_MONCHO } from "./books.ts";
import { kotoNoTsumeBuild } from "./drawn/koto-no-tsume.ts";
import { defineCrest } from "./util.ts";

export const kotoNoTsume = defineCrest({
  id: "koto-no-tsume",
  name: { en: "Koto plectra", ja: "琴の爪" },
  reading: "ことのつめ",
  romaji: "koto no tsume",
  frame: "none",
  motifs: [{ motif: "koto-plectrum", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: [],
  construction: {
    en: "Three short plectra form a triangle. Each narrow stem rises behind a rounded head with a pale rim.",
    ja: "短い琴の爪を三つ、三角形に並べます。細い軸を丸い頭の後ろから出し、縁を白く残します。",
  },
  measured: "The upper plectrum stands upright. The two below are slightly tilted in opposite directions, with a narrow gap between their curved bodies.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, third row, fourth column from the right: 琴の爪", ja: "右頁、三段目、右から四列目「琴の爪」" }, read: "2026-11-26", measured: true },
  build: kotoNoTsumeBuild,
});
