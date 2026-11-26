import { agariFujiBuild, okuboFujiBuild, naitoFujiBuild } from "./drawn/fuji.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const agariFuji = defineCrest({
  id: "agari-fuji",
  name: { en: "Rising wisteria", ja: "上がり藤" },
  reading: "あがりふじ",
  romaji: "agari-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "upright" }],
  families: [],
  aliases: ["上り藤"],
  construction: { en: "Two mirror-image racemes rise from the sides and nearly meet over the three long leaves.", ja: "左右反転した二つの花房が両脇から上がり、三枚の長い葉の上でほとんど触れます。" },
  measured: "The two racemes taper into the rounded ends at the top. The three leaves grow from one short stalk below.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, third row, third column from the right: 上り藤", ja: "右頁、三段目、右から三列目「上り藤」" }, read: "2026-11-26", measured: true },
  build(c) {
    agariFujiBuild(c);
  },
});

export const okuboFuji = defineCrest({
  id: "okubo-fuji",
  name: { en: "Ōkubo wisteria", ja: "大久保藤" },
  reading: "おおくぼふじ",
  romaji: "Ōkubo-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "upright" }],
  families: [],
  aliases: ["大久保ふぢ"],
  construction: { en: "The character 大 stands above the three leaves between two rising sprays of wisteria.", ja: "上に伸びる二つの花房の間に、三枚の葉と「大」の字を置きます。" },
  measured: "Narrow petals leave room around the character. The two legs of 大 curve outward.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, third row, first column from the right: 大久保ふぢ", ja: "右頁、三段目、右から一列目「大久保ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    okuboFujiBuild(c);
  },
});

export const naitoFuji = defineCrest({
  id: "naito-fuji",
  name: { en: "Naitō wisteria", ja: "内藤藤" },
  reading: "ないとうふじ",
  romaji: "Naitō-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["内藤ふぢ"],
  construction: { en: "A long oval leaf stands between two rounded shoulders. Two pairs of rows follow the white stems down to the low florets.", ja: "細長く丸みのある葉を左右の丸い肩の間に置きます。白い花軸の両側の小花が下まで続きます。" },
  measured: "The taller top leaf and rounder top shoulders distinguish this print from the hanging wisteria beside it.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, fourth row, first column from the right: 内藤ふぢ", ja: "右頁、四段目、右から一列目「内藤ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    naitoFujiBuild(c);
  },
});
