import { nashiNoKiriguchiBuild, maruNiNashiNoKiriguchiBuild } from "./drawn/nashi.ts";
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

export const maruNiNashiNoKiriguchi = defineCrest({
  id: "maru-ni-nashi-no-kiriguchi",
  name: { en: "Pear cross-section in a circle", ja: "丸に梨の切り口" },
  reading: "まるになしのきりくち",
  romaji: "maru ni nashi no kirikuchi",
  frame: "ring-medium",
  motifs: [{ motif: "pear-section", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に梨の切口"],
  construction: { en: "The eight-lobed cut pear and its round centre sit inside a ring.", ja: "八つのふくらみと丸い中心のある梨の切り口を、輪に収めます。" },
  measured: "The same long and short lobes fit inside the separate printed ring.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, third row, first column from the right: 丸に梨の切口", ja: "右頁、三段目、右から一列目「丸に梨の切口」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiNashiNoKiriguchiBuild(c, c.ring("ring-medium"));
  },
});
