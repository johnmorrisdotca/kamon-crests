import { sanmaiKumaZasaBuild } from "./drawn/sasa-stems.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const sanmaiKumaZasa = defineCrest({
  id: "sanmai-kuma-zasa",
  name: { en: "Three bear bamboo-grass leaves", ja: "三枚熊笹" },
  reading: "さんまいくまざさ",
  romaji: "sanmai kumazasa",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三まいくまささ"],
  construction: { en: "Three broad pointed blades fan down from a single joint, above two shorter shoulder blades and below three projecting prongs.", ja: "幅広く先のとがった三枚の熊笹を一つの節から下向きに開きます。左右の短い葉を後ろに置き、上に枝先を三つ出します。" },
  measured: "The three main blades fill the lower portion of the design. Two smaller shoulder forms and three rising twigs show behind.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, first row, second column from the right: 三まいくまささ", ja: "右頁、一段目、右から二列目「三まいくまささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    sanmaiKumaZasaBuild(c);
  },
});
