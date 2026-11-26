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

export const edoNadeshiko = defineCrest({
  id: "edo-nadeshiko",
  name: { en: "Edo pink", ja: "江戸撫子" },
  reading: "えどなでしこ",
  romaji: "edo nadeshiko",
  frame: "none",
  motifs: [{ motif: "dianthus", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["江戸なでしこ"],
  construction: {
    en: "Five toothed petals taper to points around a round heart. Ruled edges make the outer teeth and broad gaps divide the petals. Each petal has a straight vein between two pairs of curved veins.",
    ja: "丸い花芯のまわりに、先が尖って縁に刻みのある花弁を五枚並べます。刻みを定規で結び、花弁の間に深い切れ込みを作ります。各花弁には、二対の弧の筋の間にまっすぐな中筋を通します。",
  },
  measured: "The printed Edo flower is about 300 pixels across, with a heart about 44 pixels across. It has deeper gaps between the petals and more pointed teeth than the plain pink in the same frame. The drawing uses equal turns and ruled teeth.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, second row, third column from the right: 江戸なでしこ", ja: "右頁、二段目、右から三列目「江戸なでしこ」" }, read: "2026-11-26", measured: true },
  build: drawn.edoNadeshikoBuild,
});
