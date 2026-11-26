import { ishidatamiGurumaBuild, sumitateKokonotsuIshidatamiBuild } from "./drawn/ishidatami.ts";
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
