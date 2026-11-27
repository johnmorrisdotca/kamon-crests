import { itowaRokumaiZasaBuild, sasaGurumaBuild, rokkakuKumaiZasaBuild } from "./drawn/sasa-geometry.ts";
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

export const sasaGuruma = defineCrest({
  id: "sasa-guruma",
  name: { en: "Bamboo-grass wheel", ja: "笹車" },
  reading: "ささぐるま",
  romaji: "sasa guruma",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["笹くるま"],
  construction: { en: "Five pointed leaves with white midribs alternate with five forked twigs round a small hub.", ja: "白い葉脈を抜いた五枚のとがった笹の葉と、先の分かれた五本の枝を、丸い軸のまわりに交互に置きます。" },
  measured: "Five blades and five forked twigs alternate. The leaf tips, twig ends and small circular joint set the proportions.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, second row, first column from the right: 笹くるま", ja: "右頁、二段目、右から一列目「笹くるま」" }, read: "2026-11-26", measured: true },
  build(c) {
    sasaGurumaBuild(c);
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
