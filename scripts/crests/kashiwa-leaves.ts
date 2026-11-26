import { tsuyoItowaNiTosaGashiwaBuild, kabuGashiwaBuild } from "./drawn/kashiwa-leaves.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const tsuyoItowaNiTosaGashiwa = defineCrest({
  id: "tsuyo-itowa-ni-tosa-gashiwa",
  name: { en: "Common Tosa oak leaves in a thread ring", ja: "通用糸輪土佐柏" },
  reading: "つうよういとわとさかしわ",
  romaji: "tsūyō itowa tosa gashiwa",
  frame: "ring-thin",
  motifs: [{ motif: "oak", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["通用糸ワ土佐かしワ"],
  construction: { en: "Three well-veined leaves sit inside a thin ring, with one upright and two broader lower leaves.", ja: "糸輪の内側で筋のある柏を一枚立て、幅のある二枚を下へ開きます。" },
  measured: "The two lower leaves share a slope and mirror each other. The top leaf is slightly narrower.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, first row, third column from the right: 通用糸ワ土佐かしワ", ja: "右頁、一段目、右から三列目「通用糸ワ土佐かしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    tsuyoItowaNiTosaGashiwaBuild(c, c.ring("ring-thin"));
  },
});

export const kabuGashiwa = defineCrest({
  id: "kabu-gashiwa",
  name: { en: "Three pointed oak leaves", ja: "かぶ柏" },
  reading: "かぶかしわ",
  romaji: "kabu gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["かぶかしワ"],
  construction: { en: "Three jagged oak leaves turn away from a round heart.", ja: "小さな丸い中心から、縁のとがった柏を三枚開きます。" },
  measured: "The veins and unequal edge tips follow the same measured lobe in each third.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "right page, fourth row, second column from the right: かぶかしワ", ja: "右頁、四段目、右から二列目「かぶかしワ」" }, read: "2026-11-26", measured: true },
  build(c) {
    kabuGashiwaBuild(c);
  },
});
