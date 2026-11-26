import { kakeYotsumeBuild } from "./drawn/meyui-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const kakeYotsume = defineCrest({
  id: "kake-yotsume",
  name: { en: "Four nested eyes", ja: "掛け四つ目" },
  reading: "かけよつめ",
  romaji: "kake yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["かけ四ッ目"],
  source: cell(19, "left page, row 2, fourth column from the right: かけ四ッ目", "左頁、二段目、右から四列目「かけ四ッ目」"),
  measured: "Each of the four eyes contains two nested square bands. The largest eyes span about 135 pixels between their corners, and their centres lie about 80 pixels from the centre of the crest. The smallest white openings are about 24 pixels wide across the corners. The drawing evens out the printed edges and keeps the four eyes apart.",
  construction: {
    en: "Four eyes stand on the upright and level axes. Each has two nested square bands with their corners upright, a broad white space between the bands and a small square opening at the centre.",
    ja: "縦横の中心線に四つの目を置きます。それぞれ角を上下左右に向けた正方形の帯を二重にして、帯の間を広く白く取り、真ん中に小さな四角い穴を残します。",
  },
  build: kakeYotsumeBuild,
});
