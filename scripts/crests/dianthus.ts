import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/dianthus.ts";
import { defineCrest } from "./util.ts";

export const nadeshiko = defineCrest({
  id: "nadeshiko",
  name: { en: "Pink", ja: "撫子" },
  reading: "なでしこ",
  romaji: "nadeshiko",
  frame: "none",
  motifs: [{ motif: "dianthus", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["なでしこ"],
  construction: {
    en: "Five broad petals with rounded teeth turn about a small round heart. A straight middle vein and two pairs of curved veins mark each petal. Narrow white lines separate the petals.",
    ja: "小さな丸い花芯のまわりに、丸みのある刻みを持つ幅広い花弁を五枚並べます。各花弁にまっすぐな中筋と二対の弧の筋を入れ、花弁の間を細い白線で分けます。",
  },
  measured: "In the print the flower is about 300 pixels across, and the round centre about 35. The petals spread widely past the gaps between them. The drawing gives all five equal turns and uses shallow circular curves at the short serrations.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, third row, second column from the right: なでしこ", ja: "右頁、三段目、右から二列目「なでしこ」" }, read: "2026-11-26", measured: true },
  build: drawn.nadeshikoBuild,
});
