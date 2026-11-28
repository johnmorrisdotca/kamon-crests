import { SHINSEN_MONCHO } from "./books.ts";
import { noshiChoBuild } from "./drawn/noshi-cho.ts";
import { mitsuTabaneNoshiBuild } from "./drawn/noshi.ts";
import { noshiNoMaruBuild } from "./drawn/noshi-no-maru.ts";
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

export const noshiNoMaru = defineCrest({
  id: "noshi-no-maru",
  name: { en: "Noshi strips in a ring", ja: "熨斗の丸" },
  reading: "のしのまる",
  romaji: "noshi no maru",
  frame: "none",
  motifs: [{ motif: "noshi", count: 5, arrangement: "ring" }],
  families: [],
  aliases: ["のし丸"],
  construction: {
    en: "Five strips of noshi paper are bent into nested loops, each folded over at the top in a small triangle. A tie gathers them at the foot, and the ends of the innermost strips fan up inside.",
    ja: "五本の熨斗の紙を入れ子の輪に曲げ、それぞれ上で小さな三角に折り返します。下で結びにまとめ、いちばん内側の端は中で扇のように立ち上がります。",
  },
  measured: "The book's crest, in its pixels from its middle. The six lines of the loops are circles on the upright, each fitted to its top and its width 4 below the middle: radii 148.9, 133.4, 116.1, 96, 79.6 and 59.2, their centres 2.9, 11.4, 18.1, 32, 36.1 and 36.7 below the middle, so the strips narrow from about 22 to 35 at the top to nothing at the tie. Each fold is a triangle 34 across on the strip's inner line. The tie is 56 across, from 98 to 148 below the middle, its two white lines at its thirds (the book's at 15.5 and 35 across). The ends of the innermost strips fan up 52 above the tie, two each side.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, second row, fourth column from the right: のし丸", ja: "右頁、二段目、右から四列目「のし丸」" }, read: "2026-11-28", measured: true },
  build: noshiNoMaruBuild,
});
