import { SHINSEN_MONCHO } from "./books.ts";
import { yaeUmeBuild } from "./drawn/ume.ts";
import { defineCrest } from "./util.ts";

export const yaeUme = defineCrest({
  id: "yae-ume",
  name: { en: "Double plum blossom", ja: "八重梅" },
  reading: "やえうめ",
  romaji: "yae ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 10, arrangement: "radial" }],
  families: [],
  aliases: ["double plum", "やえむめ"],
  construction: {
    en: "Five broad petals crowd around a round heart. A short white stamen rises inside each one. Between the outer shoulders, the tops of five round petals show from behind.",
    ja: "丸い中心を幅広い花びら五枚で囲み、それぞれに短い白いしべを入れます。花びらの肩と肩の間から、奥の丸い花びら五枚の先を見せます。",
  },
  measured: "Frame 24: the five outer petals rise to about the same height. Their crowns lie on circles of radius 43, struck 57 from the centre in a reach of 100. The rounded rear petals alternate with the front petals and show just below their tips.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, second row, fourth column from the right: 八重むめ", ja: "左頁、二段目、右から四列目「八重むめ」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeUmeBuild(c, 96);
  },
});
