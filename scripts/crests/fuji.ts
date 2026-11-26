import { shibataFujiBuild, hanaFujiBuild } from "./drawn/fuji.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const shibataFuji = defineCrest({
  id: "shibata-fuji",
  name: { en: "Shibata wisteria", ja: "柴田藤" },
  reading: "しばたふじ",
  romaji: "Shibata-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["柴田ふぢ"],
  construction: { en: "Two sprays hang from the rounded upper leaves. A short curved bar sits in the open centre.", ja: "丸みのある上の葉から二つの花房が垂れます。中心の空きに、短く曲がった棒を置きます。" },
  measured: "The low bar lies under the calyx. The two rows of florets follow the stems down the sides.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, second row, second column from the right: 柴田ふぢ", ja: "右頁、二段目、右から二列目「柴田ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    shibataFujiBuild(c);
  },
});

export const hanaFuji = defineCrest({
  id: "hana-fuji",
  name: { en: "Wisteria flower", ja: "花藤" },
  reading: "はなふじ",
  romaji: "hana-fuji",
  frame: "none",
  motifs: [{ motif: "wisteria", count: 2, arrangement: "hanging" }],
  families: [],
  aliases: ["花ふぢ"],
  construction: { en: "A broad heart-shaped flower rises between two hanging sprays. Two wide leaves curve out above its shoulders.", ja: "二つの垂れた花房の間に、幅広いハート形の花を置きます。上の肩から二枚の幅広い葉が外へ曲がります。" },
  measured: "The crown is one heart-shaped flower beneath the short upper stalk rather than three leaves.",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "right page, second row, third column from the right: 花ふぢ", ja: "右頁、二段目、右から三列目「花ふぢ」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanaFujiBuild(c);
  },
});
