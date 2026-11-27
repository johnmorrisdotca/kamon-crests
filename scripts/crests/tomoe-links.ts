import { SHINSEN_MONCHO } from "./books.ts";
import { musubiTomoeBuild } from "./drawn/tomoe-links.ts";
import { defineCrest } from "./util.ts";

export const musubiTomoe = defineCrest({
  id: "musubi-tomoe",
  name: { en: "Knotted tomoe", ja: "結び巴" },
  reading: "むすびともえ",
  romaji: "musubi tomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["むすびともゑ"],
  construction: { en: "Three curved bands with broad comma heads surround a triangular opening. Each band passes over one neighbour and under the other, with white gaps at the crossings.", ja: "三角形の空きのまわりに、広い頭を持つ曲がった帯を三つ置きます。それぞれの帯は片方のとなりの帯の上、もう片方の下を通り、交差する箇所に白いすき間を残します。" },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "right page, third row, fourth column from the right: むすびともゑ", ja: "右頁、三段目、右から四列目「むすびともゑ」" }, read: "2026-11-27", measured: true },
  measured: "The centres and whole-number compass widths come from the upper head and both edges of its tail in the 1892 cell. The unequal three lobes in the print are regularised to thirds of a turn, and the crossing gaps are 3.5 units wide.",
  build: musubiTomoeBuild,
});
