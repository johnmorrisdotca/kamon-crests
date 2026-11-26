import { foldedSquare } from "./drawn/kaku.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

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
