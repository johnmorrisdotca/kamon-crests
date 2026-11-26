import { SHINSEN_MONCHO } from "./books.ts";
import { tamazusaBuild } from "./drawn/fumi.ts";
import { defineCrest } from "./util.ts";

export const tamazusa = defineCrest({
  id: "tamazusa",
  name: { en: "Angular folded letter", ja: "たまづさ" },
  reading: "たまづさ",
  romaji: "tamazusa",
  frame: "none",
  motifs: [{ motif: "folded-letter", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["たまずさ"],
  construction: {
    en: "A narrow strip crosses the top and opens into two slanting tails. Straight white seams show the folds.",
    ja: "細い帯を上で折り重ね、両端を斜め下に開きます。折り目は直線の細いすき間で表します。",
  },
  measured: "The print has a short level top, a small triangular turn just below it, and two oblique ends separated by an open underside. The name keeps the printed kana.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, fourth row, second column from the right: たまづさ", ja: "左頁、四段目、右から二列目「たまづさ」" }, read: "2026-11-26", measured: true },
  build: tamazusaBuild,
});
