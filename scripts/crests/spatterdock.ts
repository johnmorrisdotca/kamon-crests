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
