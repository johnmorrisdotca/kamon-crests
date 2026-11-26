import { komonjiKameBuild } from "./drawn/kame.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const komonjiKame = defineCrest({
  id: "komonji-kame",
  name: { en: "Turtle in an old character form", ja: "古文字亀" },
  reading: "こもんじがめ",
  romaji: "komonji game",
  frame: "ring-thin",
  motifs: [{ motif: "turtle", count: 1, arrangement: "single" }],
  families: [],
  source: cell(19, "left page, row 1, second column from the right: 古文字亀", "左頁、一段目、右から二列目「古文字亀」"),
  measured: "The ring encloses a turtle with a round head at the top and four broad feet sweeping away from the shell. The pair of upper feet have inward hooks. Eight ruled openings, four on each side, form the markings of the shell.",
  construction: {
    en: "Circular arcs draw the turtle's head, the shoulders and the four swept feet inside a thin ring. Four small ruled openings are cut in each half of its shell. The two halves mirror across the upright axis.",
    ja: "細輪の内側に、円弧で亀の頭と肩、外へ広がる四つの足を作ります。甲羅の左右に、直線で囲んだ小さな穴を四つずつ白く抜きます。左右は中心線を軸に左右反転した形にします。",
  },
  build: komonjiKameBuild,
});
