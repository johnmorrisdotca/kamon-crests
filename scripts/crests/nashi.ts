import { nashiNoKiriguchiBuild } from "./drawn/nashi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const nashiNoKiriguchi = defineCrest({
  id: "nashi-no-kiriguchi",
  name: { en: "Pear cross-section", ja: "梨の切り口" },
  reading: "なしのきりくち",
  romaji: "nashi no kirikuchi",
  frame: "none",
  motifs: [{ motif: "pear-section", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["なしの切口"],
  construction: { en: "Four long lobes and four shorter lobes spread around the cut pear's round centre.", ja: "丸い切り口の中心から、長い四つのふくらみと短い四つのふくらみを開きます。" },
  measured: "The long lobes follow the cardinal axes, while the short lobes follow the diagonals.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, first row, second column from the right: なしの切口", ja: "右頁、一段目、右から二列目「なしの切口」" }, read: "2026-11-26", measured: true },
  build(c) {
    nashiNoKiriguchiBuild(c);
  },
});
