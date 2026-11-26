import { kakeYotsumeBuild, yotsumeKuzushiBuild } from "./drawn/meyui-variants.ts";
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

export const yotsumeKuzushi = defineCrest({
  id: "yotsume-kuzushi",
  name: { en: "Broken four eyes", ja: "四つ目崩し" },
  reading: "よつめくずし",
  romaji: "yotsume kuzushi",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["四ッ目くづし"],
  source: cell(20, "right page, row 4, first column from the right: 四ッ目くづし", "右頁、四段目、右から一列目「四ッ目くづし」"),
  measured: "The cell has four pairs of ruled triangular points turning around a common centre. The farthest points are about 153 pixels from the centre. Each pair has a small triangular opening along the edge of each piece. The drawing gives the four pairs exactly one quarter turn between them.",
  construction: {
    en: "Two ruled triangular pieces form a quarter of the design. Each has a small white triangular cut at its edge. The four quarters face the same direction around the middle so that the pointed pieces form a pinwheel.",
    ja: "直線で引いた三角形を二つ使って四分の一を作り、各辺に小さな三角の白を入れます。四分の一ごとに同じ向きで回して、先のとがった形を風車のように並べます。",
  },
  build: yotsumeKuzushiBuild,
});
