import { itowaRokumaiZasaBuild, sasaGurumaBuild, rokkakuKumaiZasaBuild, sasaBishiBuild } from "./drawn/sasa-geometry.ts";
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

export const sasaBishi = defineCrest({
  id: "sasa-bishi",
  name: { en: "Bamboo-grass lozenge", ja: "笹菱" },
  reading: "ささびし",
  romaji: "sasa bishi",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 6, arrangement: "facing" }],
  families: [],
  aliases: ["さゝひし"],
  construction: { en: "Two broad split leaves stand on the vertical axis of a lozenge. Narrow leaves and curved edge strips point into the four corners.", ja: "菱形の縦軸に、中央を割った幅広い笹の葉を二枚立てます。細い葉と弧の縁を四隅に向けます。" },
  measured: "The horizontal span is wider than the vertical. Broad leaves meet near the centre, with pointed narrow leaves recessed between the outer edges.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, third row, fourth column from the right: さゝひし", ja: "左頁、三段目、右から四列目「さゝひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    sasaBishiBuild(c);
  },
});
