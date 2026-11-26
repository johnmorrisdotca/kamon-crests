import { SHINSEN_MONCHO } from "./books.ts";
import { haUchiwaBuild } from "./drawn/uchiwa.ts";
import { defineCrest } from "./util.ts";

export const haUchiwa = defineCrest({
  id: "ha-uchiwa",
  name: { en: "Feather fan", ja: "羽団扇" },
  reading: "はうちわ",
  romaji: "ha uchiwa",
  frame: "none",
  motifs: [{ motif: "round-fan", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["羽うちは"],
  construction: {
    en: "One long feather and five matching pairs spread from a rounded handle with two scrolls. Each feather is a lens between two compass arcs with a fine white shaft.",
    ja: "巻きのある丸い柄から、中央の長い羽一枚と左右五対の羽を広げます。羽は二つの円弧にはさまれた形にし、細い白い羽軸を入れます。",
  },
  measured: "The print has eleven pointed feathers. The longest reaches about 212 above the handle crown in the crop. The six tip heights and widths on one side are rounded to layout coordinates, and mirrored. The centre lens is 132 long, with equal arcs of radius 97. The two scrolls have radius 6.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "right page, second row, second column from the right: 羽うちは", ja: "右頁、二段目、右から二列目「羽うちは」" }, read: "2026-11-26", measured: true },
  build: haUchiwaBuild,
});
