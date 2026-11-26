import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiYotsuRindoBuild, mitsubaRindoBuild } from "./drawn/gentian-leaves.ts";
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

export const itowaNiYotsuRindo = defineCrest({
  id: "itowa-ni-yotsu-rindo",
  name: { en: "Four gentians in a thread ring", ja: "糸輪に四つ竜胆" },
  reading: "いとわによつりんどう",
  romaji: "itowa ni yotsu rindō",
  frame: "ring-thread",
  motifs: [{ motif: "gentian", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ四ッりんだう"],
  construction: {
    en: "Four diagonal flowers alternate with four straight-veined leaves around a round heart. The horizontal leaves are longer than the upright leaves. A thread ring surrounds them.",
    ja: "斜めに向けた花四輪と真っすぐな脈の入った葉四枚を、丸い中心のまわりに交互に並べます。左右の葉は上下の葉より長くし、全体を糸輪で囲みます。",
  },
  measured: "The printed ring spans about 300 pixels. Side leaves run about 134 pixels out from the centre and the upright leaves about 110. The scale uses 84 and 72 on a ring of diameter 192. The four flowers have matching arcs and ruled rays, and the ring follows the printed qualifier 糸ワ.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, fourth row, third column from the right: 糸ワニ四ッりんだう", ja: "右頁、四段目、右から三列目「糸ワニ四ッりんだう」" }, read: "2026-11-26", measured: true },
  build: itowaNiYotsuRindoBuild,
});
