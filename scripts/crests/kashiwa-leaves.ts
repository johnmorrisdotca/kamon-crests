import { tsuyoItowaNiTosaGashiwaBuild } from "./drawn/kashiwa-leaves.ts";
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
