import { kabuGashiwaBuild } from "./drawn/kashiwa-leaves.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const kabuGashiwa = defineCrest({
  id: "kabu-gashiwa",
  name: { en: "Three pointed oak leaves", ja: "かぶ柏" },
  reading: "かぶかしわ",
  romaji: "kabu gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["かぶかしワ"],
  construction: { en: "Three jagged oak leaves turn away from a round heart.", ja: "丸い中心から、縁がぎざぎざの柏を三枚、外へ向けて開きます。" },
  measured: "The veins and unequal edge tips follow the same measured lobe in each third.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, fourth row, second column from the right: かぶかしワ", ja: "右頁、四段目、右から二列目「かぶかしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    kabuGashiwaBuild(c);
  },
});
