import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/spatterdock.ts";
import { defineCrest } from "./util.ts";

export const mitsuKohone = defineCrest({
  id: "mitsu-kohone",
  name: { en: "Three spatterdocks", ja: "三つ河骨" },
  reading: "みつこうほね",
  romaji: "mitsu kōhone",
  frame: "none",
  motifs: [{ motif: "spatterdock", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッこうほね"],
  construction: {
    en: "Three pointed spatterdock leaves turn around a round heart. Each leaf has a broad white midrib, curved side veins and two curls at its foot.",
    ja: "丸い芯のまわりに先の尖った河骨の葉を三枚並べます。各葉には太い白の中筋と弧を描く脇筋を入れ、付け根に二つの巻きを置きます。",
  },
  measured: "Three broad leaves meet around a small heart in the print. The drawing preserves their radial placement and uses a wider central cut and a regular set of side veins.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, first row, third column from the right: 三ッこうほね", ja: "右頁、一段目、右から三列目「三ッこうほね」" }, read: "2026-11-26", measured: true },
  build: drawn.mitsuKohoneBuild,
});

export const maruNiHitotsuKohone = defineCrest({
  id: "maru-ni-hitotsu-kohone",
  name: { en: "One spatterdock in a circle", ja: "丸に一つ河骨" },
  reading: "まるにひとつこうほね",
  romaji: "maru ni hitotsu kōhone",
  frame: "ring-thin",
  motifs: [{ motif: "spatterdock", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ一ッこうほね"],
  construction: {
    en: "One pointed, ribbed leaf rises from the foot of the circle. Two curls sit at its base around the stem.",
    ja: "輪の足元から筋の通った尖った葉を一枚伸ばします。葉の付け根には茎を挟んで二つの巻きを置きます。",
  },
  measured: "The printed leaf sits low inside the circle with its stem near the foot. The drawing uses a thin package ring and leaves more clearance around a slightly smaller leaf.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, second row, fourth column from the right: 丸ニ一ッこうほね", ja: "右頁、二段目、右から四列目「丸ニ一ッこうほね」" }, read: "2026-11-26", measured: true },
  build: drawn.maruHitotsuKohoneBuild,
});

export const futatsuTsuruKohone = defineCrest({
  id: "futatsu-tsuru-kohone",
  name: { en: "Two vine spatterdocks", ja: "二つ蔓河骨" },
  reading: "ふたつつるこうほね",
  romaji: "futatsu tsuru kōhone",
  frame: "none",
  motifs: [{ motif: "spatterdock", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["二ッつる川骨"],
  construction: {
    en: "Two ribbed leaves point up and down. A pair of sideways loops meets at the round heart and turns into four curls.",
    ja: "筋の通った二枚の葉を上下に向けます。横に並ぶ二つの輪を丸い芯で合わせ、両側に四つの巻きを伸ばします。",
  },
  measured: "The two leaves and four outer curls are clear in the print. The drawing has thicker inner veins and a slightly wider gap around the lower curls.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, second row, second column from the right: 二ッつる川骨", ja: "右頁、二段目、右から二列目「二ッつる川骨」" }, read: "2026-11-26", measured: true },
  build: drawn.futatsuTsuruKohoneBuild,
});
