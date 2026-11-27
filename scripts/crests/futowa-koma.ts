import { futowaNiHitotsuKomaBuild } from "./drawn/futowa-koma.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const futowaNiHitotsuKoma = defineCrest({
  id: "futowa-ni-hitotsu-koma",
  name: { en: "One shogi piece in a thick ring", ja: "太輪に一つ駒" },
  reading: "ふとわにひとつこま",
  romaji: "futowa ni hitotsu koma",
  frame: "ring-thick",
  motifs: [{ motif: "promoted-shogi-pawn", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["太ワニ一ッこま"],
  source: cell(33, "left page, row 1, third column from the right: 太ワニ一ッこま", "左頁、一段目、右から三列目「太ワニ一ッこま」"),
  measured: "The broad frame surrounds a five-sided flat tile with a single written と. The top point and two bottom corners stand close to the inner ring.",
  construction: {
    en: "Strike a thick ring around the five ruled edges of the tile. Leave the upright and curved strokes of と white on the face.",
    ja: "太輪を打ち、その中に駒の五辺を引きます。表の「と」の直線と曲線を白く残します。",
  },
  build: futowaNiHitotsuKomaBuild,
});
