import { crossedSquares, foldedSquare, knottedSquares, nestedEightSquares } from "./drawn/kaku.ts";
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

export const musubiKaku = defineCrest({
  id: "musubi-kaku",
  name: { en: "Knotted square", ja: "結び角" },
  reading: "むすびかく",
  romaji: "musubi kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 2, arrangement: "crossed" }],
  families: [],
  source: cell(16, "right page, row 4, second column from the right: むすび角", "右頁、四段目、右から二列目「むすび角」"),
  measured:
    "The cross outline in the cell is about 308 pixels from end to end, the ends are about 104 wide, the square is about 207 across and both bands are about 25 thick. The drawing uses a cross 180 across, ends 64 wide, a square 122 across and bands 15 thick.",
  construction: {
    en: "A square frame and a broad cross-shaped frame interlace. The arms of the cross reach past the square. Both bands are 15 wide and alternate over and under at successive crossings. The opening in the middle is a cross.",
    ja: "正方形の枠と太い十字の枠を組み合わせます。十字の腕は正方形の外まで伸ばします。帯の幅はどちらも15で、交差するたびに上下を交代させます。中央には十字形の白が残ります。",
  },
  build: knottedSquares,
});

export const yatsuIrekoKaku = defineCrest({
  id: "yatsu-ireko-kaku",
  name: { en: "Eight nested square frames", ja: "八つ入れ子角" },
  reading: "やついれこかく",
  romaji: "yatsu ireko kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 8, arrangement: "crossed" }],
  families: [],
  aliases: ["八入子角"],
  source: cell(16, "right page, row 1, second column from the right: 八入子角", "右頁、一段目、右から二列目「八入子角」"),
  measured:
    "The print has four level square frames in two rows and four turned squares reaching about 154 pixels from the middle. The level block spans about 226 pixels, with a narrow gap down and across it. The alternating bands are about 17 pixels thick. The drawing uses 66-unit upright squares, turned squares 96 across their corners and a band width of 10.",
  construction: {
    en: "Four level square frames nest with four square frames on their corners. The latter sit at the top, bottom and either side, with a tip reaching the layout circle. The bands alternate over and under in each quarter.",
    ja: "辺を上下左右に向けた四つの正方形の枠と、角を上下左右に向けた四つの枠を組み合わせます。角を向けた枠は上下左右に置き、先を外円に届かせます。四方とも、帯は交差するたび上下を交代します。",
  },
  build: nestedEightSquares,
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
