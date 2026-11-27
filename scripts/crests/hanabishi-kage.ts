import { SHINSEN_MONCHO } from "./books.ts";
import { chuKageHanabishiKuzushiBuild } from "./drawn/hanabishi-kage.ts";
import { defineCrest } from "./util.ts";

export const chuKageHanabishiKuzushi = defineCrest({
  id: "chu-kage-hanabishi-kuzushi",
  name: { en: "Freely drawn flower lozenge in medium shadow", ja: "中陰花菱崩し" },
  reading: "ちゅうかげはなびしくずし",
  romaji: "chū kage hanabishi kuzushi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中かげ花びし崩"],
  construction: { en: "An outlined four-way flower stands in front of a larger scalloped row. The four stamens and the heart are open.", ja: "大きな波形の花びらの前に、輪郭で描いた四方の花を置きます。四本のしべと花心は白く抜きます。" },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, fourth row, second column from the right: 中かげ花びし崩", ja: "右頁、四段目、右から二列目「中かげ花びし崩」" }, read: "2026-11-27", measured: true },
  measured: "The two scalloped rows and four hollow stamens are drawn to the proportions of the source. The final graph matches 崩 in the glossed frame 8 left, row 2, column 2 caption.",
  build: chuKageHanabishiKuzushiBuild,
});
