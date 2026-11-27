import { SHINSEN_MONCHO } from "./books.ts";
import { shihoTsuruHanabishiBuild } from "./drawn/hanabishi-vines.ts";
import { defineCrest } from "./util.ts";

export const shihoTsuruHanabishi = defineCrest({
  id: "shiho-tsuru-hanabishi",
  name: { en: "Four-way vine flower lozenge", ja: "四方蔓花菱" },
  reading: "しほうつるはなびし",
  romaji: "shihō tsuru hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["四方つる花びし"],
  construction: {
    en: "Four equal petals surround a round centre. A thin vine rises between each pair of petals and forks into two open curls.",
    ja: "丸い中心のまわりに同じ大きさの花弁を四枚置きます。花弁の間から細い蔓が伸び、先は二つに分かれて巻きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, fourth row, second column from the right: 四方つる花びし", ja: "左頁、四段目、右から二列目「四方つる花びし」" }, read: "2026-11-27", measured: true },
  measured: "The petal tip, round shoulders and two separated vine tips are measured from the upper petal and its right diagonal in frame 8. The vine is 4.2 units wide on the straight and opens out along the two compass curls.",
  build: shihoTsuruHanabishiBuild,
});
