// The side view of the arabesque flower, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { yokomiKarahanaBuild } from "./drawn/karahana-side.ts";
import { defineCrest } from "./util.ts";

export const yokomiKarahana = defineCrest({
  id: "yokomi-karahana",
  name: { en: "Arabesque flower seen from the side", ja: "横見唐花" },
  reading: "よこみからはな",
  romaji: "yokomi karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["よこ見から花", "side-view karahana"],
  construction: {
    en: "Three petals open like a fan above a calyx. The upright petal has ruled flanks, a round body and three lobes at its top, with a lens-shaped stamen. The left petal lies behind it and the right petal before it, each with two lobes at its end and a short vein from its root. One pointed sepal stands before the upright petal. The stalk narrows below the calyx, turns to the right and ends in a slanted cut.",
    ja: "がくの上に、花びら三枚を扇のように開きます。中央の立った花びらは、両脇を直線、胴を円で描き、先を三つの丸いふくらみに分け、レンズ形のしべを入れます。左の花びらはその後ろ、右の花びらは手前に重ね、どちらも先に二つのふくらみを作り、付け根から短い筋を入れます。立った花びらの手前に、とがったがくを一枚置きます。茎はがくの下で細くなり、右へ曲がって、斜めに切った先で終わります。",
  },
  measured: "Frame 18, in a reach of about 92: the upright petal is about 74 wide and rises 78 above the calyx, with its three lobes about 32, 25 and 25 across. The side petals lean about 38 degrees from level and are about 83 long and 35 wide. The sepal's point stands 11 above the petals' roots. The stalk is about 56 wide at the calyx and 14 at its waist, 39 below, and ends about 70 below and 25 to 46 to the right. The left and right petals are made a mirrored pair, and the print's blot in the left petal is left out.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, second row, third column from the right: よこ見から花", ja: "左頁、二段目、右から三列目「よこ見から花」" }, read: "2026-11-28", measured: true },
  build: yokomiKarahanaBuild,
});
