import { crossedSquares, foldedSquare } from "./drawn/kaku.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const kakuChigai = defineCrest({
  id: "kaku-chigai",
  name: { en: "Crossed square frames", ja: "角違い" },
  reading: "かくちがい",
  romaji: "kaku chigai",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["角ちがひ", "違い角"],
  source: cell(16, "right page, row 3, second column from the right: 角ちがひ", "右頁、三段目、右から二列目「角ちがひ」"),
  measured:
    "The upright frame in the printed cell spans about 220 pixels on a side. The other spans about 312 from point to point, which puts their outer corners on one circle. Each band is about 20 pixels thick. The drawing keeps the two squares on one outer circle, with a width of 12 and a narrow gap at every crossing.",
  construction: {
    en: "Two square frames have their corners on the outer circle. One stands upright and the other on its corner. Each band is 12 wide. They pass over and under at alternate crossings, with thin gaps cut from the lower frame.",
    ja: "角を外円の上に置いた四角い枠を二つ重ねます。一方は辺を上下左右に向け、もう一方は角を上下左右に向けます。帯の幅は12です。交差するたびに上下を交代させ、下の枠には細いすき間を残します。",
  },
  build: crossedSquares,
});

export const oriiriKaku = defineCrest({
  id: "oriiri-kaku",
  name: { en: "Folded-in square", ja: "折り入り角" },
  reading: "おりいりかく",
  romaji: "oriiri kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["折入角"],
  source: cell(19, "right page, row 4, second column from the right: 折入角", "右頁、四段目、右から二列目「折入角」"),
  measured:
    "The outer square in the printed cell reaches about 154 pixels from the middle. Its four sides have one notch each, about 19 wide and 21 deep. A diamond opening reaches about 70 from the middle and a small square touches each corner of it. The drawing makes the notches 12 wide and 13 deep, with a central opening of radius 43 and four eyes of radius 11.",
  construction: {
    en: "A square with its corners on the outer circle has a straight notch near the middle of each side. The central white diamond touches four little square openings, one at each corner. All outlines are set out by full-length ruled lines.",
    ja: "外円の上に角を置いた正方形の各辺に、中央近くでまっすぐな切れ込みを入れます。中央の白い菱形は、四つの角で小さな四角い白に触れます。輪郭はどれも端から端まで引いた直線で作ります。",
  },
  build: foldedSquare,
});
