import { SHINSEN_MONCHO } from "./books.ts";
import { noshiChoBuild } from "./drawn/noshi-cho.ts";
import { mitsuTabaneNoshiBuild } from "./drawn/noshi.ts";
import { defineCrest } from "./util.ts";

export const mitsuTabaneNoshi = defineCrest({
  id: "mitsu-tabane-noshi",
  name: { en: "Three bundled noshi", ja: "三つ束ね熨斗" },
  reading: "みつたばねのし",
  romaji: "mitsu tabane noshi",
  frame: "none",
  motifs: [{ motif: "noshi", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッたばねのし"],
  construction: {
    en: "Three turned noshi strips make nested courses. Two folded inner tips point into the opening and a short binding joins all three at the foot.",
    ja: "折り返した熨斗を三重に重ねます。内側の二つの折り端は中央へ向け、三重の裾を短い帯でまとめます。",
  },
  measured: "The outer strip rises into a small pointed crown. Two short return folds interrupt the upper edge of the round central opening, and small folded ends lie alongside the lower tie. The left and right courses have been balanced.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, fourth row, fourth column from the right: 三ッたばねのし", ja: "右頁、四段目、右から四列目「三ッたばねのし」" }, read: "2026-11-26", measured: true },
  build: mitsuTabaneNoshiBuild,
});

export const noshiCho = defineCrest({
  id: "noshi-cho",
  name: { en: "Butterfly of folded paper", ja: "熨斗蝶" },
  reading: "のしちょう",
  romaji: "noshi chō",
  frame: "none",
  motifs: [{ motif: "noshi", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["のしてふ"],
  construction: {
    en: "Strike the curved sides of the paper strips, with an angled cut at the wide ends. Set their narrower ends at the knot and curl the cords behind them. Let two short tails leave the knot below.",
    ja: "紙の帯の曲がった両側を打ち、外側の広い端は斜めに切ります。細い端を結び目に集め、その後ろに紐を巻きます。結び目の下に短い帯を二本出します。",
  },
  measured: "The cell is about 291 pixels wide and 285 high. The two tallest strips rise about 208 and 163 pixels above the knot, with the other strips fanning out to either side. Their wide ends are cut at different angles as the print shows.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, fourth row, third column from the right: のしてふ", ja: "右頁、四段目、右から三列目「のしてふ」" }, read: "2026-11-27", measured: true },
  build: noshiChoBuild,
});
