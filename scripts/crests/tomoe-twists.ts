import { SHINSEN_MONCHO } from "./books.ts";
import { nejiTomoeBuild } from "./drawn/tomoe-twists.ts";
import { defineCrest } from "./util.ts";

export const nejiTomoe = defineCrest({
  id: "neji-tomoe",
  name: { en: "Twisted tomoe", ja: "捩じ巴" },
  reading: "ねじともえ",
  romaji: "neji tomoe",
  frame: "none",
  motifs: [{ motif: "tomoe", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["ねぢ巴", "捻じ巴"],
  construction: {
    en: "Five broad hooks turn around a round opening. A smaller inward curl sits beside each hook, and a fine white gap separates neighbouring hooks at their shoulders.",
    ja: "丸い空きのまわりに太い鉤形を五つ置きます。各鉤形のとなりに内向きの小さな巻きを添え、肩が近づく箇所に細い白いすき間を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 11, place: { en: "left page, first row, first column from the right: ねぢ巴", ja: "左頁、一段目、右から一列目「ねぢ巴」" }, read: "2026-11-27", measured: true },
  measured: "The whole-number widths and intersections follow the broad upper hook and its small curl in the printed cell. A round opening of radius 15 sits inside a ring two units wide. Equal fifths and a fine gap at the shoulders regularise the unequal lobes.",
  build: nejiTomoeBuild,
});
