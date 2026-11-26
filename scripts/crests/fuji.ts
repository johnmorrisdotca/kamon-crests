import { shibataFujiBuild } from "./drawn/fuji.ts";
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
