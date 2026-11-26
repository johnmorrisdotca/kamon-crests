import { yaeTessenBuild } from "./drawn/tessen.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const yaeTessen = defineCrest({
  id: "yae-tessen",
  name: { en: "Double clematis", ja: "八重鉄線" },
  reading: "やえてっせん",
  romaji: "yae tessen",
  frame: "none",
  motifs: [{ motif: "clematis", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八重てつせん"],
  construction: { en: "A row of smaller petals shows between the six main veined petals.", ja: "筋のある六つの大きな花びらの間から、一列の小さな花びらが見えます。" },
  measured: "The rear row turns half a sector so its tips alternate with the front six.",
  source: { ...SHINSEN_MONCHO, frame: 34, place: { en: "left page, third row, third column from the right: 八重てつせん", ja: "左頁、三段目、右から三列目「八重てつせん」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeTessenBuild(c);
  },
});
