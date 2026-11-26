import { knottedFourEyes, linkedNineEyes, ringedSixEyes, stackedFiveEyes } from "./drawn/meyui.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiMutsume = defineCrest({
  id: "maru-ni-mutsume",
  name: { en: "Six eyes in a circle", ja: "丸に六つ目" },
  reading: "まるにむつめ",
  romaji: "maru ni mutsume",
  frame: "ring-thin",
  motifs: [{ motif: "knot-eye", count: 6, arrangement: "rows" }],
  families: [],
  source: cell(20, "right page, row 1, third column from the right: 丸ニ六ッ目", "右頁、一段目、右から三列目「丸ニ六ッ目」"),
  measured:
    "The 1892 cell has a ring about 305 pixels across and 14 thick. The two rows of three squares span about 236 by 147 pixels, and each opening spans about 19 pixels. The drawing squares up the rows at 144 by 96 units, with centres 48 apart, openings 12 across the corners and a ring of the package's thin weight.",
  construction: {
    en: "Six squares stood on their corners in two rows of three, their tips meeting at 48-unit intervals. Each square has a 12-unit opening measured across its corners. The whole grid sits inside a thin ring.",
    ja: "角を上下左右に向けた正方形を、横に三つずつ二段に並べ、48の間隔で角を触れ合わせます。一つずつ角から角まで12の目を白く抜き、全体を細い輪に収めます。",
  },
  build: ringedSixEyes,
});

export const tsunagiKokonotsume = defineCrest({
  id: "tsunagi-kokonotsume",
  name: { en: "Linked nine eyes", ja: "繋ぎ九つ目" },
  reading: "つなぎここのつめ",
  romaji: "tsunagi kokonotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 9, arrangement: "rows" }],
  families: [],
  source: cell(20, "right page, row 3, third column from the right: つなぎ九ッ目", "右頁、三段目、右から三列目「つなぎ九ッ目」"),
  measured:
    "The cell spans about 286 by 270 pixels. Adjacent centres are about 95 pixels apart horizontally and 90 vertically. The small white openings are about 24 pixels across their corners. The drawing regularises both intervals to about 53 units, puts the furthest corners on the outer circle and leaves openings 14 units across.",
  construction: {
    en: "Nine squares stood on their corners in three rows of three, their tips meeting. The eight furthest tips lie on the layout circle. Every square has a small square opening, and four broad diamonds of white lie between the squares.",
    ja: "角を上下左右に向けた正方形を、横に三つずつ三段に並べ、角を触れ合わせます。いちばん外側の八つの角は外円の上に置きます。一つずつ小さな四角い目を白く抜き、正方形の間には大きな菱形の白が四つ残ります。",
  },
  build: linkedNineEyes,
});

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
    ja: "角を上下左右に向けた正方形を四つ、縦横の中心線の上に、中心が全体の中心から56離れるように置きます。その間を太い菱形の帯で結び、内側と外側の角は中心から21と50の位置に置きます。交わるところは、定規で引いた線で囲まれた部分を、黒と白に交互に分けます。",
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
