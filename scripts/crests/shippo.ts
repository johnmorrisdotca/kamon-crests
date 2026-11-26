import { linkedThreeShippo } from "./drawn/shippo.ts";
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
