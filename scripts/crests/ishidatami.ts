import { mitsuwariIshidatamiBuild } from "./drawn/mitsuwari-ishidatami.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import {
  ishidatamiGurumaBuild, maruNiMitsuIshiBuild,
  mitsuIshiBuild, sumitateKokonotsuIshidatamiBuild,
} from "./drawn/ishidatami.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const ishidatamiGuruma = defineCrest({
  id: "ishidatami-guruma",
  name: { en: "Stone-pavement wheel", ja: "石畳車" },
  reading: "いしだたみぐるま",
  romaji: "ishidatami guruma",
  frame: "none",
  motifs: [{ motif: "paving-square", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["石たたみ車"],
  source: cell(7, "right page, row 2, third column from the right: 石たたみ車", "右頁、二段目、右から三列目「石たたみ車」"),
  measured: "Eight squares meet at a corner in the centre. Each turns an eighth of a turn from its neighbour and covers part of the next square. Four corner tips lie on the axes and the four other tips lie between them. The outlines of the overlapping stones are narrow in the print.",
  construction: {
    en: "Eight equal squares share a corner and turn an eighth of a turn apart. The edges of each cross the edges of its neighbour. Thin white seams show where one square overlaps the next.",
    ja: "同じ大きさの正方形を八つ、一つの角を中央にそろえ、8分の1回転ずつ回して並べます。となり合う正方形の辺が交差し、重なるところを細い白い筋で分けます。",
  },
  build: ishidatamiGurumaBuild,
});

export const sumitateKokonotsuIshidatami = defineCrest({
  id: "sumitate-kokonotsu-ishidatami",
  name: { en: "Nine paving squares on point", ja: "隅立て九つ石畳" },
  reading: "すみたてここのついしだたみ",
  romaji: "sumitate kokonotsu ishidatami",
  frame: "none",
  motifs: [{ motif: "paving-square", count: 9, arrangement: "rows" }],
  families: [],
  aliases: ["角立九ッ石たたみ"],
  source: cell(7, "right page, row 3, third column from the right: 角立九ッ石たたみ", "右頁、三段目、右から三列目「角立九ッ石たたみ」"),
  measured: "Nine squares stand on their corners in three rows of three. The figures meet tip to tip along each row and down each column. Four openings between them repeat the same square shape.",
  construction: {
    en: "Rule three columns and three rows. Put a square on one corner at each intersection. The tips of neighbouring squares meet and leave four white squares between them.",
    ja: "縦横それぞれ三本の割付線を引き、交点ごとに正方形を隅立てに置きます。となり合う角を接し、その間に白い四角を四つ残します。",
  },
  build: sumitateKokonotsuIshidatamiBuild,
});

export const mitsuwariIshidatami = defineCrest({
  id: "mitsuwari-ishidatami",
  name: { en: "Three-part paving stones", ja: "三つ割り石畳" },
  reading: "みつわりいしだたみ",
  romaji: "mitsuwari ishidatami",
  frame: "none",
  motifs: [{ motif: "paving-square", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリ石だゝみ"],
  source: cell(7, "right page, row 4, second column from the right: 三ッワリ石だゝみ", "右頁、四段目、右から二列目「三ッワリ石だゝみ」"),
  measured: "Three broad quadrilateral stones share the sides of a triangular opening. More paving fills the space to the circle, with a curved outer seam and two short ruled divisions between each pair of the main stones.",
  construction: {
    en: "Strike the circle and rule three primary stones around a triangular opening. Join the outer bays with ruled seams and leave a shallow curved seam at the rim of each sector.",
    ja: "円を打ち、三角形の空きの周りに主な石を三つ引きます。外側を白い直線で分け、各区画の縁に浅い弧を残します。",
  },
  build: mitsuwariIshidatamiBuild,
});

export const mitsuIshi = defineCrest({
  id: "mitsu-ishi",
  name: { en: "Three stones", ja: "三つ石" },
  reading: "みついし",
  romaji: "mitsu ishi",
  frame: "none",
  motifs: [{ motif: "paving-square", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッいし"],
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "right page, row 1, second column from the right: 三ッいし", ja: "右頁、一段目、右から二列目「三ッいし」" }, read: "2026-11-27", measured: true },
  measured: "Three upright squares occupy the centre of the upper row and the outside positions of the lower row. The upper stone touches the two lower stones at its bottom corners. Their sides are equalised.",
  construction: {
    en: "Rule a grid of equal squares. Ink the top centre square and the two lower outside squares, touching at the two lower corners of the upper stone.",
    ja: "同じ大きさの正方形を割り付け、上段の中央と下段の左右を塗ります。上の石の下側の二つの角で下の石が接します。",
  },
  build: mitsuIshiBuild,
});

export const maruNiMitsuIshi = defineCrest({
  id: "maru-ni-mitsu-ishi",
  name: { en: "Three stones in a circle", ja: "丸に三つ石" },
  reading: "まるにみついし",
  romaji: "maru ni mitsu ishi",
  frame: "ring-medium",
  motifs: [{ motif: "paving-square", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["丸ニ三ッいし"],
  source: { ...SHINSEN_MONCHO, frame: 7, place: { en: "right page, row 3, second column from the right: 丸ニ三ッいし", ja: "右頁、三段目、右から二列目「丸ニ三ッいし」" }, read: "2026-11-27", measured: true },
  measured: "Three equal stones stand on point. One sits above the gap between two level stones and a narrow white seam runs along each of its lower sides. The lower row is slightly below the centre of the ring.",
  construction: {
    en: "Strike the ring and rule three equal squares on point. Place one above the inner corners of the lower pair, leaving two fine diagonal seams.",
    ja: "輪を打ち、同じ大きさの正方形を三つ隅立てに引きます。下の二つの間に一つを置き、斜めの細い白筋を二本残します。",
  },
  build: maruNiMitsuIshiBuild,
});
