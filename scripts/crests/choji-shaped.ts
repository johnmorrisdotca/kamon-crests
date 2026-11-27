import { chojiBishiBuild } from "./drawn/choji-shaped.ts";
import { migiMitsuChojiTomoeBuild } from "./drawn/choji-triple.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

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
