import { SHINSEN_MONCHO } from "./books.ts";
import { nimonSenBuild } from "./drawn/zeni.ts";
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
