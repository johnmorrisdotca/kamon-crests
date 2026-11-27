import { chigaiChojiBuild, chojiBishiBuild, chojiTsuruBishiBuild } from "./drawn/choji-shaped.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";
import { migiMitsuChojiTomoeBuild } from "./drawn/choji-triple.ts";

export const chojiBishi = defineCrest({
  id: "choji-bishi",
  name: { en: "Clove lozenge", ja: "丁子菱" },
  reading: "ちょうじびし",
  romaji: "chōji bishi",
  frame: "none",
  motifs: [{ motif: "clove", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["丁子ひし"],
  construction: { en: "Eight cloves surround a round joint. The side buds extend farther, forming a lozenge.", ja: "八つの丁子を丸い節のまわりに置きます。左右を長くして菱形にします。" },
  measured: "Four longer buds mark the principal ends. Four shorter diagonal buds fill the corners between them.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, third row, second column from the right: 丁子ひし", ja: "左頁、三段目、右から二列目「丁子ひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    chojiBishiBuild(c);
  },
});

export const chigaiChoji = defineCrest({
  id: "chigai-choji",
  name: { en: "Crossed cloves", ja: "違い丁子" },
  reading: "ちがいちょうじ",
  romaji: "chigai chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひ丁子"],
  construction: { en: "Two bent clove buds cross at their pointed bases. A white seam follows the bud in front, and three round petals open above each bud.", ja: "曲がった丁子のつぼみ二つを、とがった根元で交差させます。手前のつぼみに沿って白い線を残し、それぞれの上に丸い花びらを三枚開きます。" },
  measured: "The book cell sets the bend and reach of the pointed bases and the three petals on each clove. The two buds use the same proportions with a white gap where the lower one passes behind.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, third row, first column from the right: ちがひ丁子", ja: "右頁、三段目、右から一列目「ちがひ丁子」" }, read: "2026-11-27", measured: true },
  build(c) {
    chigaiChojiBuild(c);
  },
});

export const migiMitsuChojiTomoe = defineCrest({
  id: "migi-mitsu-choji-tomoe",
  name: { en: "Right trio of clove commas", ja: "右三つ丁子巴" },
  reading: "みぎみつちょうじともえ",
  romaji: "migi mitsu chōji tomoe",
  frame: "none",
  motifs: [{ motif: "clove", count: 3, arrangement: "radial" }, { motif: "tomoe", count: 3, arrangement: "radial", turn: "right" }],
  families: [],
  aliases: ["右三ッ丁子ともへ"],
  construction: { en: "Three right-turning commas enclose three clove flower groups, with white seams separating the petals at the centre.", ja: "右へ回る三つの巴で丁子の花を三組囲み、中央では花びらの間に白いすき間を残します。" },
  measured: "The book's shorter heads leave room for the rounded petals. The three bodies rotate by exact thirds, and adjacent petals have white gaps.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, fourth row, second column from the right: 右三ッ丁子ともへ", ja: "右頁、四段目、右から二列目「右三ッ丁子ともへ」" }, read: "2026-11-27", measured: true },
  build: migiMitsuChojiTomoeBuild,
});

export const chojiTsuruBishi = defineCrest({
  id: "choji-tsuru-bishi",
  name: { en: "Clove and vine lozenge", ja: "丁子蔓菱" },
  reading: "ちょうじつるびし",
  romaji: "chōji tsuru bishi",
  frame: "none",
  motifs: [{ motif: "clove", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["丁子つるびし"],
  construction: { en: "Two outward-facing cloves lie between bowed vine pairs. The vines taper to the side points of the lozenge, leaving a pointed white opening in each.", ja: "外向きの丁子二つを、曲がった蔓の組の間に置きます。蔓は菱の左右の先で細くなり、一本ずつ先のとがった白いすき間を残します。" },
  measured: "The two buds, pointed horizontal ends and curved openings are placed from the cell. A half turn makes the two halves equal.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, first row, second column from the right: 丁子つるびし", ja: "左頁、一段目、右から二列目「丁子つるびし」" }, read: "2026-11-27", measured: true },
  build: chojiTsuruBishiBuild,
});
