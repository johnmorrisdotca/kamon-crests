import { yukimochiKumaZasaBuild } from "./drawn/sasa-snow.ts";
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

export const yukimochiKumaZasa = defineCrest({
  id: "yukimochi-kuma-zasa",
  name: { en: "Snow-laden bear bamboo grass", ja: "雪持ち熊笹" },
  reading: "ゆきもちくまざさ",
  romaji: "yukimochi kumazasa",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 1, arrangement: "upright" }],
  families: [],
  aliases: ["ゆきもちくまささ"],
  construction: { en: "A scalloped snow cap rests above a broad fan of ribbed leaves. Several parallel stalks extend below it.", ja: "葉脈を抜いた幅広い葉の房に、丸く刻んだ雪を載せます。下へ数本の平行な茎を出します。" },
  measured: "The middle blade points down, with two paired blades behind it. The snow cap is scalloped, with two small curled openings.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, first row, first column from the right: ゆきもちくまささ", ja: "右頁、一段目、右から一列目「ゆきもちくまささ」" }, read: "2026-11-26", measured: true },
  build(c) {
    yukimochiKumaZasaBuild(c);
  },
});
