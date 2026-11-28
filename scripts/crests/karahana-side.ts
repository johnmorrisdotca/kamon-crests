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
    en: "Three petals open like a fan above a calyx. The upright petal rises to a tall tip between a low left shoulder and a round right one, with a lens-shaped stamen. The left petal lies behind it and the right petal before it. Each has a long belly that rises to an outer point, a dip in its top edge and a short vein from its root. One pointed sepal stands before the upright petal. The stalk narrows below the calyx, bends to the right in round curves and ends in a heel and a small toe. Every edge is one arc between two corners of the print.",
    ja: "がくの上に、花びら三枚を扇のように開きます。中央の立った花びらは、低い左肩と丸い右肩の間に高い先を立て、レンズ形のしべを入れます。左の花びらはその後ろ、右の花びらは手前に重ねます。どちらも長い腹を外側のとがった角まで上げ、上の縁に切れ込みを一つ入れ、付け根から短い筋を入れます。立った花びらの手前に、とがったがくを一枚置きます。茎はがくの下で細くなり、丸い曲線で右へ曲がって、かかとと小さなつま先で終わります。どの縁も、版の角と角の間を一本の弧で描きます。",
  },
  measured: "Frame 18, in the page's units from its middle: the upright petal's tip stands about (-4, 81), its left shoulder about (-33, 57) and its right bump about (18, 60), with the notch between at (8, 52). The left petal's outer point is about (-91, 39) and the right petal's about (83, 46); the dips in their tops are about (-62, 33) and (63, 41). The sepal's point is about (-2, 11). The stalk is about 66 wide at the calyx, bends about 40 below the middle and ends in a heel about (24, -73) and a toe about (45, -66). The two side petals are drawn as the print has them, not as a mirrored pair, and the print's blot in the left petal is left out.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, second row, third column from the right: よこ見から花", ja: "左頁、二段目、右から三列目「よこ見から花」" }, read: "2026-11-28", measured: true },
  build: yokomiKarahanaBuild,
});
