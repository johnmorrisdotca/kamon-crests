import { threeInThickRing } from "./drawn/wachigai.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const futowaNiMitsuWachigai = defineCrest({
  id: "futowa-ni-mitsu-wachigai",
  name: { en: "Three linked rings in a thick circle", ja: "太輪に三つ輪違い" },
  reading: "ふとわにみつわちがい",
  romaji: "futowa ni mitsu wachigai",
  frame: "ring-thick",
  motifs: [{ motif: "linked-rings", count: 3, arrangement: "triangle" }],
  families: [],
  source: cell(15, "right page, row 4, first column from the right: 太ワニ三ッワちがひ", "右頁、四段目、右から一列目「太ワニ三ッワちがひ」"),
  measured:
    "The outer ring is about 300 pixels across and 42 thick. The inner three rings are about 121 across with bands roughly 11 thick. Their centres are about 36 from the middle. The drawing uses the package's thick ring and inner rings of radius 39, width 7, with centres 23 from the middle. Each takes the over-under order from the printed intersections.",
  construction: {
    en: "A thick ring encloses three bands of equal width. Their centres are 23 from the middle, one above and two below. Each passes over its next neighbour at one crossing and under it at the other, with narrow white gaps on both sides of the upper band.",
    ja: "太い輪の中に、同じ太さの輪を三つ収めます。それぞれの中心は全体の中心から23離し、上に一つ、下に二つ置きます。となり合う輪は一方の交差で上、もう一方で下を通ります。上を通る輪の両側に細い白いすき間を残します。",
  },
  build: threeInThickRing,
});
