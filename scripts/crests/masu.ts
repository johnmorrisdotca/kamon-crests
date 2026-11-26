import { SHINSEN_MONCHO } from "./books.ts";
import { chuwaNiMasuBuild, itowaNiSangaiMasuBuild, kageNoMasuBuild, mitsuMasuOwariTsutaBuild } from "./drawn/masu.ts";
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

export const chuwaNiMasu = defineCrest({
  id: "chuwa-ni-masu",
  name: { en: "Measuring box in a medium ring", ja: "中輪に枡" },
  reading: "ちゅうわにます",
  romaji: "chuwa ni masu",
  frame: "ring-medium",
  motifs: [{ motif: "measuring-box", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワニ升", "中輪に升"],
  construction: {
    en: "Set a square measuring box and its corner brace below the upper crosspiece, then enclose them in a ring.",
    ja: "上の横木の下に正方形の枡と隅の斜めの帯を置き、全体を中輪で囲みます。全体を中輪で囲みます。",
  },
  measured: "The printed box is about 174 wide. The narrow upper piece reaches from about 65 to 94 down the cell, with the square below extending from about 102 to 274. The corner brace rises across the opening. The frame follows the catalogue medium ring and its usual gap.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, first row, third column from the right: 中ワニ升", ja: "左頁、一段目、右から三列目「中ワニ升」" }, read: "2026-11-26", measured: true },
  build: chuwaNiMasuBuild,
});

export const itowaNiSangaiMasu = defineCrest({
  id: "itowa-ni-sangai-masu",
  name: { en: "Three-tier measuring box in a thin ring", ja: "糸輪に三階枡" },
  reading: "いとわにさんがいます",
  romaji: "itowa ni sangai masu",
  frame: "ring-thin",
  motifs: [{ motif: "measuring-box", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["糸ワニ三がい升", "糸輪に三階升"],
  construction: {
    en: "Stack three square measuring boxes in decreasing sizes. Rule the sloping seams for their top faces and the upright seam where their two sides meet.",
    ja: "大きさの違う三つの枡を、大きい順に下から重ねます。上面に斜めの継ぎ目を、左右の側面の間に縦の継ぎ目を引きます。",
  },
  measured: "The stack spans about 222 wide at the bottom, 160 at the middle and 90 at the top. The side faces are about 71, 52 and 32 high. The layout uses widths 160, 116 and 66 and heights 48, 38 and 24 before setting the stack in the thin ring.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, second row, third column from the right: 糸ワニ三がい升", ja: "左頁、二段目、右から三列目「糸ワニ三がい升」" }, read: "2026-11-26", measured: true },
  build: itowaNiSangaiMasuBuild,
});

export const mitsuMasuOwariTsuta = defineCrest({
  id: "mitsu-masu-owari-tsuta",
  name: { en: "Large split ivy in three measuring boxes", ja: "三つ枡大割蔦" },
  reading: "みつますおおわりつた",
  romaji: "mitsu masu owari tsuta",
  frame: "none",
  motifs: [{ motif: "measuring-box", count: 3, arrangement: "stacked" }, { motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["三ッ升大割つた"],
  construction: { en: "Turn three nested square bands to stand on their corners. A large split ivy leaf with five lobes sits inside, its small round joint just above the leaf's middle.", ja: "正方形の枡の枠を三重に置き、角を上下左右に向けます。内側に先が五つに分かれた大割蔦を収め、丸い継ぎ目を葉の中心より少し上に置きます。" },
  measured: "The leaf takes just over a third of the diamond's breadth and sits a little below its middle. The three bands have different widths and narrow gaps between them. The measurement keeps those widths and uses the catalogue's five scalloped ivy lobes.",
  source: { ...SHINSEN_MONCHO, frame: 31, place: { en: "left page, first row, second column from the right: 三ッ升大割つた", ja: "左頁、一段目、右から二列目「三ッ升大割つた」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuMasuOwariTsutaBuild(c);
  },
});
