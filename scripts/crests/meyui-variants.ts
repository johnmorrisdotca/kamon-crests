import { kakeYotsumeBuild, kaseFourEyesBuild, yotsumeKuzushiBuild, threeFourEyeLozengesBuild } from "./drawn/meyui-variants.ts";
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
    ja: "直線で引いた三角形を二つ使って4分の1を作り、縁に小さな三角の白を入れます。4分の1ごとに同じ向きで回して、先のとがった形を風車のように並べます。",
  },
  build: yotsumeKuzushiBuild,
});

export const kaseYotsumeBishi = defineCrest({
  id: "kase-yotsume-bishi",
  name: { en: "Four lozenge eyes with a crossed frame", ja: "桛四つ目菱" },
  reading: "かせよつめびし",
  romaji: "kase yotsume bishi",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }, { motif: "skein-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かせ四ッ目びし", "かせ四つ目菱"],
  source: cell(20, "right page, third row, first column from the right: かせ四ッ目びし", "右頁、三段目、右から一列目「かせ四ッ目びし」"),
  measured: "The cell is about 294 pixels across and 234 high. Four horizontally stretched eyes surround a single crossed frame. The diagonal arms of the frame widen into ruled crosspieces at their outer ends, and narrow white paths separate all four eyes from the frame.",
  construction: {
    en: "Rule a diagonal cross with a broad crosspiece at the end of each arm. Place a lozenge eye in each of its four bays and keep a narrow white channel between each eye and the cross.",
    ja: "斜め十字を引き、四つの腕の先に幅の広い横木を置きます。その間に菱形の目を四つ置き、十字と目の間に細い白筋を残します。",
  },
  build: kaseFourEyesBuild,
});

export const chuwaNiMitsuYotsumeBishi = defineCrest({
  id: "chuwa-ni-mitsu-yotsume-bishi",
  name: { en: "Three four-eye lozenges in a medium ring", ja: "中輪に三つ四つ目菱" },
  reading: "ちゅうわにみつよつめびし",
  romaji: "chūwa ni mitsu yotsume bishi",
  frame: "ring-medium",
  motifs: [{ motif: "knot-eye", count: 12, arrangement: "radial" }],
  families: [],
  aliases: ["中ワニ三ッ四ッ目びし", "中輪に三つ隅合わせ四つ目菱"],
  source: cell(20, "right page, first row, second column from the right: 中ワニ三ッ四ッ目びし", "右頁、一段目、右から二列目「中ワニ三ッ四ッ目びし」"),
  measured: "The book's ring spans about 305 pixels. The upright lozenge reaches about 125 pixels from the common centre and spans about 78 pixels across. Its four eyes are separated by two intersecting ruled seams. The build repeats its proportions at equal angles with the package's medium ring. Collinear edges use one ruler line.",
  construction: {
    en: "Place three slender lozenges with their inner tips near the centre. Divide each with two ruled white seams and open a small lozenge in the centre of each of its four eyes.",
    ja: "細長い菱を三つ、内側の先が中心に近づくように置きます。それぞれを二本の直線の白いすき間で四つに分け、一つずつ小さな菱の穴を抜きます。",
  },
  build: threeFourEyeLozengesBuild,
});
