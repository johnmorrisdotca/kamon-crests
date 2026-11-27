import { itowaRokumaiZasaBuild, rokkakuKumaiZasaBuild } from "./drawn/sasa-geometry.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const itowaRokumaiZasa = defineCrest({
  id: "itowa-rokumai-zasa",
  name: { en: "Six bamboo-grass leaves in a thread ring", ja: "糸輪六枚笹" },
  reading: "いとわろくまいざさ",
  romaji: "itowa rokumai zasa",
  frame: "ring-thread",
  motifs: [{ motif: "bamboo-grass", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワ六枚ささ"],
  construction: { en: "Two broad veined leaves face out along the upright axis. Four slanting leaves turn toward the left and right sides of a fine ring.", ja: "葉脈のある幅広い笹の葉を二枚、縦軸に沿って外へ向けます。斜めの四枚は細い輪の左右へ向けます。" },
  measured: "The broad blades are rounded by the outer circle and taper toward the centre. The four narrow diagonals end together in pairs on the lateral axis.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, third row, first column from the right: 糸ワ六枚ささ", ja: "右頁、三段目、右から一列目「糸ワ六枚ささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    itowaRokumaiZasaBuild(c);
  },
});

export const rokkakuKumaiZasa = defineCrest({
  id: "rokkaku-kumai-zasa",
  name: { en: "Nine bamboo-grass leaves in a hexagon", ja: "六角九枚笹" },
  reading: "ろっかくくまいざさ",
  romaji: "rokkaku kumai zasa",
  frame: "hexagon",
  motifs: [{ motif: "bamboo-grass", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["六角九枚ささ"],
  construction: { en: "Three narrow veined leaves radiate to alternate corners of a hexagon. Six curved leaves follow the sides.", ja: "細い葉脈のある笹の葉を、六角形の一つおきの角に三枚向けます。六枚の曲がった葉を辺に沿わせます。" },
  measured: "The hexagon has vertical sides. Three centre leaves point to corners, and one inward-curving slender leaf runs along each edge.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, second row, second column from the right: 六角九枚ささ", ja: "右頁、二段目、右から二列目「六角九枚ささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    rokkakuKumaiZasaBuild(c);
  },
});
