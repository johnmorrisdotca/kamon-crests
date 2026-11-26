import { SHINSEN_MONCHO } from "./books.ts";
import { mitsubaRindoBuild } from "./drawn/gentian-leaves.ts";
import { defineCrest } from "./util.ts";

export const mitsubaRindo = defineCrest({
  id: "mitsuba-rindo",
  name: { en: "Three-leaf gentian", ja: "三つ葉竜胆" },
  reading: "みつばりんどう",
  romaji: "mitsuba rindō",
  frame: "none",
  motifs: [{ motif: "gentian", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ葉りんだう"],
  construction: {
    en: "Three pointed flowers alternate with three long leaves around a small disc. Each flower has a short stalk and white veins. A straight white vein divides each leaf.",
    ja: "先のとがった花三輪と長い葉三枚を、丸い中心のまわりに交互に並べます。花には短い茎と白いしべを置き、葉の中央に定規で引いた白い脈を入れます。",
  },
  measured: "The printed crest has an upper flower and an upright leaf below. The heart is about 49 pixels across. Each pointed leaf runs about 130 pixels from the edge of the heart. The layout uses a heart 26 across and a maximum leaf reach of 96, and regularises the three alternating pairs by equal turns.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, fourth row, first column from the right: 三ッ葉りんだう", ja: "右頁、四段目、右から一列目「三ッ葉りんだう」" }, read: "2026-11-26", measured: true },
  build: mitsubaRindoBuild,
});
