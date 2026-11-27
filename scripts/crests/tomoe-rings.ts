import { SHINSEN_MONCHO } from "./books.ts";
import { kanawaTomoeBuild, wachigaiTomoeBuild } from "./drawn/tomoe-rings.ts";
import { defineCrest } from "./util.ts";

export const wachigaiTomoe = defineCrest({
  id: "wachigai-tomoe",
  name: { en: "Two interlaced tomoe rings", ja: "輪違い巴" },
  reading: "わちがいともえ",
  romaji: "wachigai tomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["ワちがひともゑ"],
  construction: { en: "Two round tomoe exchange which band is above at the two crossings. Each ring ends in a broad curling head.", ja: "二つの丸い巴を組み、交差する二か所で上下を交えます。輪の端はそれぞれ広く巻く頭になります。" },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "right page, first row, second column from the right: ワちがひともゑ", ja: "右頁、一段目、右から二列目「ワちがひともゑ」" }, read: "2026-11-27", measured: true },
  measured: "Both round loops and the large opposed comma heads follow the print. The two parts are set an exact half-turn apart.",
  build: wachigaiTomoeBuild,
});

export const kanawaTomoe = defineCrest({
  id: "kanawa-tomoe",
  name: { en: "Three interlaced metal-ring tomoe", ja: "金輪巴" },
  reading: "かなわともえ",
  romaji: "kanawa tomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["金ワともゑ"],
  construction: { en: "Three rings with curled heads cross around a small open space.", ja: "巻いた頭を持つ輪を三つ、中央の小さな空きのまわりに組みます。" },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "right page, fourth row, second column from the right: 金ワともゑ", ja: "右頁、四段目、右から二列目「金ワともゑ」" }, read: "2026-11-27", measured: true },
  measured: "The outer lobes and the broad heads rise toward the edge in the three ring forms, at thirds of a turn.",
  build: kanawaTomoeBuild,
});
