// Arabesque flowers measured from labelled cells in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { karahanaBuild } from "./drawn/karahana.ts";
import { defineCrest } from "./util.ts";

export const karahana = defineCrest({
  id: "karahana",
  name: { en: "Arabesque flower", ja: "唐花" },
  reading: "からはな",
  romaji: "karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["Chinese flower", "arabesque blossom"],
  construction: {
    en: "Five petals round a small disc, each with three rounded lobes at its edge. Narrow ruled gaps run between the petals, and a short white stamen runs out through the middle of each.",
    ja: "小さな円のまわりに、先が三つの丸いふくらみに分かれた花びらを五枚並べます。花びらの間は細い直線で分け、中央から白いしべを一本ずつ伸ばします。",
  },
  measured: "Frame 18: the notches between petals stand about four fifths out from the centre. The middle tip is struck from 77 out with a radius of 23. The two shoulder lobes stand 31 either side and 68 out, with radii of 21. The central disc has a radius of about 12 and the stamens reach 43.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, second row, fourth column from the right: 唐花", ja: "右頁、二段目、右から四列目「唐花」" }, read: "2026-11-25", measured: true },
  build(c) {
    karahanaBuild(c, 96);
  },
});
