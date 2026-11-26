import { SHINSEN_MONCHO } from "./books.ts";
import { shogiKomaBuild } from "./drawn/shogi-koma.ts";
import { defineCrest } from "./util.ts";

export const shogiKoma = defineCrest({
  id: "shogi-koma",
  name: { en: "Shogi piece", ja: "将棋駒" },
  reading: "しょうぎごま",
  romaji: "shōgi goma",
  frame: "none",
  motifs: [{ motif: "shogi-piece", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["将棋こま"],
  construction: {
    en: "A five-sided shogi piece shows one side and the two characters 龍王 on its face.",
    ja: "五角形の将棋駒の一面を見せ、駒の表に「龍王」の二字を入れます。",
  },
  measured: "The printed piece is about 270 wide and 290 high. The side begins near the upper point and narrows the visible face on the right. The ruled and curved strokes are placed from the printed 龍王, with the broader character above 王.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, third row, second column from the right: 将棋こま", ja: "左頁、三段目、右から二列目「将棋こま」" }, read: "2026-11-26", measured: true },
  build: shogiKomaBuild,
});
