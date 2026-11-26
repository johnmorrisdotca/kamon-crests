import { SHINSEN_MONCHO } from "./books.ts";
import { kageNoMasuBuild } from "./drawn/masu.ts";
import { defineCrest } from "./util.ts";

export const kageNoMasu = defineCrest({
  id: "kage-no-masu",
  name: { en: "Outlined measuring box", ja: "陰の枡" },
  reading: "かげのます",
  romaji: "kage no masu",
  frame: "none",
  motifs: [{ motif: "measuring-box", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かげの升", "陰の升"],
  construction: {
    en: "Two square outlines sit one inside the other. A ruled band crosses the innermost square from its lower left to its upper right.",
    ja: "正方形の枠を二重に置きます。内側の四角には、左下の角から右上の角へ斜めの帯を渡します。",
  },
  measured: "The cell's outer square is about 264 across, its rule about 13 wide. The inner square is about 174 across with a border about 11 wide. The diagonal is about 8 across. The layout uses widths 136 and 90, borders 6.1 and 5.6 and a band 4.2 across.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, third row, first column from the right: かげの升", ja: "左頁、三段目、右から一列目「かげの升」" }, read: "2026-11-26", measured: true },
  build: kageNoMasuBuild,
});
