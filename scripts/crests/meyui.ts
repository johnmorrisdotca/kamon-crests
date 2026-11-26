import { knottedFourEyes, stackedFiveEyes } from "./drawn/meyui.ts";
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

export const itsutsume = defineCrest({
  id: "itsutsume",
  name: { en: "Five eyes", ja: "五つ目" },
  reading: "いつつめ",
  romaji: "itsutsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 5, arrangement: "stacked" }],
  families: [],
  aliases: ["重ね五つ目", "kasane itsutsume", "stacked five eyes"],
  source: cell(20, "right page, row 4, third column from the right: 五ッ目", "右頁、四段目、右から三列目「五ッ目」"),
  measured:
    "The four outside squares reach about 155 pixels from the middle. Their centres are about 81 out, the centre square's corners about 79 out, and the five small openings about 34 across their corners. The drawing places the four centres 51 units out, the centre square's tips 49 out and the openings 20 across. A narrow gap follows the centre square's edge.",
  construction: {
    en: "One square on its corner overlaps four more on the upright and level axes. Each has a small square eye. The front square cuts across the four back openings, with a narrow white gap along the overlap.",
    ja: "角を上下左右に向けた正方形を一つ、縦横の中心線に沿って置いた四つの正方形に重ねます。一つずつ小さな四角い目を白く抜きます。手前の正方形は奥の四つの目に重なり、重なる縁に沿って細い白いすき間を残します。",
  },
  build: stackedFiveEyes,
});
