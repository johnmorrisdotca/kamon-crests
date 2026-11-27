import { mamezoKiriBuild } from "./drawn/kiri-variants.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mamezoKiri = defineCrest({
  id: "mamezo-kiri",
  name: { en: "Balancing-doll paulownia", ja: "豆蔵桐" },
  reading: "まめぞうきり",
  romaji: "mamezo kiri",
  frame: "ring-thin",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["まめぞうきり"],
  construction: { en: "Three cloak-like lobes hang from small pointed hats. Upright stems carry round weights, and the middle stem branches to two more weights. A thin ring encloses the design.", ja: "小さな三角の笠の下に、合羽のような裂片を三つ垂らします。立てた茎の先に丸い重りを置き、中央の茎からはさらに二本の枝を出して重りを添えます。全体を細い輪に収めます。" },
  measured: "Three hats and cloak-like forms replace the ordinary flower heads and leaves. The middle group sits lower than its two neighbours and carries a taller branched stem. A thin drawn rim follows the paper.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, fourth row, first column from the right: まめぞうきり", ja: "左頁、四段目、右から一列目「まめぞうきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    mamezoKiriBuild(c);
  },
});
