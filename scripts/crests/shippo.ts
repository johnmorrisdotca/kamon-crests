import { flowerShippo, linkedThreeShippo } from "./drawn/shippo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuShippoTsunagiWachigai = defineCrest({
  id: "mitsu-shippo-tsunagi-wachigai",
  name: { en: "Three joined seven treasures", ja: "三つ七宝繋ぎ輪違い" },
  reading: "みつしっぽうつなぎわちがい",
  romaji: "mitsu shippō tsunagi wachigai",
  frame: "none",
  motifs: [{ motif: "seven-treasures", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["持ち合い三つ七宝", "三つ七宝つなぎ輪違い"],
  source: cell(14, "left page, row 3, fourth column from the right: 三ッ七宝つなぎ輪違", "左頁、三段目、右から四列目「三ッ七宝つなぎ輪違」"),
  measured:
    "The three circles in the print are each about 160 pixels across. Their centres stand one radius apart upwards and sideways, so the two low circles touch and the upper circle intersects both. The drawing uses radius 48, keeps their compass centres on that grid and draws each shared lens once.",
  construction: {
    en: "Three circles of one compass width, one above two. The lower circles just touch. The top circle shares a lens with either neighbour. Equal circles form the remaining lenses and leave three four-pointed white openings.",
    ja: "同じ幅のコンパスで、上に一つ、下に二つの円を描きます。下の二つは触れ合い、上の円は左右の円とレンズ形を一つずつ共有します。同じ大きさの円で残りのレンズ形を作り、四つの先がある白い部分を三つ残します。",
  },
  build: linkedThreeShippo,
});

export const shippoHanabishi = defineCrest({
  id: "shippo-hanabishi",
  name: { en: "Flower lozenge in seven treasures", ja: "七宝花菱" },
  reading: "しっぽうはなびし",
  romaji: "shippō hanabishi",
  frame: "none",
  motifs: [{ motif: "seven-treasures", count: 1, arrangement: "single" }, { motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["七宝に花菱", "七宝花びし"],
  source: cell(14, "left page, row 3, third column from the right: 七宝花びし", "左頁、三段目、右から三列目「七宝花びし」"),
  measured:
    "The outer circle in the cell is about 275 pixels across and its four corner discs are about 39 across. The flower spans about 137 pixels, with four nearly equal scalloped petals around a central disc about 23 across. The drawing takes the frame radius as 84, the corner discs 12 in radius, the flower about 80 across and its central disc 14 across.",
  construction: {
    en: "Four equal lenses meet at the four corner discs. The opening holds a flower whose four round petals each have three lobes, a straight narrow stamen and a white gap against the next petal. A small white eye opens in the round centre.",
    ja: "四つの同じレンズ形を、四隅に置いた四つの丸でつなぎます。中央の白に花を収め、丸い花びら四枚に、小さなふくらみを三つずつ、まっすぐで細いしべを一本ずつ入れます。となり合う花びらの間には白いすき間を残し、丸い中心には小さな白い目を抜きます。",
  },
  build: flowerShippo,
});
