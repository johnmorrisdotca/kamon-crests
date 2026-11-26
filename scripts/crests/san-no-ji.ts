import { SHINSEN_MONCHO } from "./books.ts";
import { sumikiriKakuNiSanNoJiBuild } from "./drawn/san-no-ji.ts";
import { defineCrest } from "./util.ts";

export const sumikiriKakuNiSanNoJi = defineCrest({
  id: "sumikiri-kaku-ni-san-no-ji",
  name: { en: "Character three in a cut-corner square", ja: "隅切り角に三の字" },
  reading: "すみきりかくにさんのじ",
  romaji: "sumikiri kaku ni san no ji",
  frame: "none",
  motifs: [
    { motif: "san-no-ji", count: 1, arrangement: "single" },
    { motif: "cut-corner-square", count: 1, arrangement: "single" },
  ],
  families: [],
  aliases: ["角切三", "角切り三"],
  construction: {
    en: "Two cut-corner squares form an eight-sided frame. Inside it, three horizontal strokes have the longest at the foot and the shortest in the middle.",
    ja: "内外に角を切った四角形を描き、八辺の枠を作ります。その中に、下が最も長く、中央が最も短い三本の横画を置きます。",
  },
  measured: "The octagonal band and unequal stroke lengths follow the print. The frame is regularised and the lower bar clears its inner edge on both sides.",
  source: { ...SHINSEN_MONCHO, frame: 19, place: { en: "right page, fourth row, first column from the right: 角切三", ja: "右頁、四段目、右から一列目「角切三」" }, read: "2026-11-26", measured: true },
  build: sumikiriKakuNiSanNoJiBuild,
});
