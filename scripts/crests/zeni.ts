import { SHINSEN_MONCHO } from "./books.ts";
import { hasebeZeniBuild, nimonSenBuild } from "./drawn/zeni.ts";
import { defineCrest } from "./util.ts";

export const nimonSen = defineCrest({
  id: "ni-mon-sen",
  name: { en: "Two coins", ja: "二文銭" },
  reading: "にもんせん",
  romaji: "nimonsen",
  frame: "none",
  motifs: [{ motif: "coin", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["二文銭"],
  construction: {
    en: "Two coins lie side by side, with the left one in front. Each has a fine ring inside its rim and a square hole framed by a second square.",
    ja: "銭を二枚並べ、左の銭を手前に置きます。どちらも縁の内側に細い輪を入れ、中央の四角い穴をもう一つの四角で囲みます。",
  },
  measured: "The print has radius about 92 in the crop and centres about 116 apart. The two outer circle lines are about 10 apart and the nested squares about 31 and 60 wide. The layout uses a radius of 58 and centres 74 apart, a white ring inside the rim, and squares 22 and 38 wide.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, first row, third column from the right: 二文銭", ja: "右頁、一段目、右から三列目「二文銭」" }, read: "2026-11-26", measured: true },
  build: nimonSenBuild,
});

export const hasebeZeni = defineCrest({
  id: "hasebe-zeni",
  name: { en: "Hasebe coins", ja: "長谷部銭" },
  reading: "はせべぜに",
  romaji: "hasebe zeni",
  frame: "none",
  motifs: [{ motif: "coin", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["長谷部ぜに"],
  construction: {
    en: "Eight smaller coins surround a large one. Their centres are set 45 degrees apart, and each coin has an upright square hole.",
    ja: "大きな銭を中心に、小さな銭を八枚並べます。小さな銭の中心は45度ずつ離し、どの銭にも縦横のそろった四角い穴をあけます。",
  },
  measured: "The print puts eight smaller circles, of radius about 43 in the crop, around a central circle of radius about 75. The layout has outer coin radii 26 about centres 69 from the middle, a centre coin of radius 43, and square holes 14 and 24 wide.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "right page, second row, third column from the right: 長谷部ぜに", ja: "右頁、二段目、右から三列目「長谷部ぜに」" }, read: "2026-11-26", measured: true },
  build: hasebeZeniBuild,
});
