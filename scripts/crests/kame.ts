import { SHINSEN_MONCHO } from "./books.ts";
import { kawariKameNoMaruBuild } from "./drawn/kawari-kame-no-maru.ts";
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

export const kawariKameNoMaru = defineCrest({
  id: "kawari-kame-no-maru",
  name: { en: "Variant turtle circle", ja: "変わり亀の丸" },
  reading: "かわりかめのまる",
  romaji: "kawari kame no maru",
  frame: "none",
  motifs: [{ motif: "turtle", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["變りかめの丸"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 19,
    place: {
      en: "left page, first row, first column from the right: 變りかめの丸",
      ja: "左頁、一段目、右から一列目「變りかめの丸」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The rounded mantle curves around the opening above the turtle and joins below its pointed shell. The shoulders, linked shell plates, head and two front feet follow the printed cell.",
  construction: {
    en: "Sweep curved paper lines around the shell. Lay regular hexagonal plates in staggered rows inside the rim. A narrow tip rises beside the head.",
    ja: "弧の白い筋を亀の甲のまわりに通します。甲の縁の内側に正六角形の甲板を交互の列に並べます。細くとがった先が頭の脇に上がります。",
  },
  placementBuild: { module: new URL("./drawn/kawari-kame-no-maru.ts", import.meta.url), export: "kawariKameNoMaruBuild" },
  build: kawariKameNoMaruBuild,
});
