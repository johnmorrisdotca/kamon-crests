import { SHINSEN_MONCHO } from "./books.ts";
import { noshiChoBuild } from "./drawn/noshi-cho.ts";
import { mitsuTabaneNoshiBuild } from "./drawn/noshi.ts";
import { tabaneNoshiBuild } from "./drawn/tabane-noshi.ts";
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

export const tabaneNoshi = defineCrest({
  id: "tabane-noshi",
  name: { en: "Bundled noshi", ja: "束ね熨斗" },
  reading: "たばねのし",
  romaji: "tabane noshi",
  frame: "none",
  motifs: [{ motif: "noshi", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["たば糸のし"],
  construction: {
    en: "Strips of noshi paper are gathered at the middle by a striped tie and spread out above and below it into a round, each ending in an outward arc. The outermost strips at each side curl round an open loop.",
    ja: "熨斗の紙を真ん中で縞の結びに束ね、上と下に丸く広げます。どの端も外へふくらむ弧で終わります。左右のいちばん外側は、空いた輪のまわりを巻きます。",
  },
  measured: "The book's crest, in its pixels from the middle of its tie. Its four quarters differ by up to 13 (the lower half reaches 157 below the tie, the upper 144 above it), so each point is the average of the upper and lower right quarters and the crest is mirrored both ways: the rim's cusps 150.5 up on the upright, then 46 out at 138.6 up, 96 out at 120 up and 124.6 out at 80.8 up, to the loop's tip 147.5 out; the strips' lines leaving the tie 6.8, 21 and 28.2 out; the loop's inner edge from the tie's corner through 95.4 out at 52.2 up. The tie is 70 across and 48 high, with four white lines 9.2 apart.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, third row, third column from the right: たば糸のし", ja: "右頁、三段目、右から三列目「たば糸のし」" }, read: "2026-11-28", measured: true },
  build: tabaneNoshiBuild,
});
