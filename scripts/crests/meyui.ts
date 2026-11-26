import { knottedFourEyes } from "./drawn/meyui.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const musubiYotsume = defineCrest({
  id: "musubi-yotsume",
  name: { en: "Knotted four eyes", ja: "結び四つ目" },
  reading: "むすびよつめ",
  romaji: "musubi yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  source: cell(20, "right page, row 4, second column from the right: むすび四ッ目", "右頁、四段目、右から二列目「むすび四ッ目」"),
  measured:
    "The four squares in the cell reach about 150 pixels from the middle, their centres about 90 out, and the small openings about 38 across their corners. The near and far edges of the connecting diamond reach about 33 and 80 from the middle. The drawing uses centres 56 out, openings 24 across, and connecting edges 21 and 50 out.",
  construction: {
    en: "Four squares stood on their corners, with centres 56 from the middle on the upright and level axes. A broad diamond band runs between them, with its corners 21 and 50 from the middle. The ruled boundaries divide their crossings into alternating black and white spaces.",
    ja: "角を上下左右に向けた正方形を四つ置き、中心を縦横の中心線に沿って56離します。その間を太い菱形の帯で結び、内側と外側の角は中心から21と50の位置に置きます。交わるところは、直線で囲まれた部分を黒と白に交互に分けます。",
  },
  build: knottedFourEyes,
});
