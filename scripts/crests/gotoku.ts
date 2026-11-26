import { gotokuBuild } from "./drawn/gotoku.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const gotoku = defineCrest({
  id: "gotoku",
  name: { en: "Brazier trivet", ja: "五徳" },
  reading: "ごとく",
  romaji: "gotoku",
  frame: "none",
  motifs: [{ motif: "brazier-trivet", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五とく"],
  construction: { en: "Three hooked rests point inward from a circular wall.", ja: "丸い縁から、先のかぎ形に曲がった三本の支えが内側に出ます。" },
  measured: "The hooked rests repeat through three equal turns and meet the inner layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, second row, second column from the right: 五とく", ja: "左頁、二段目、右から二列目「五とく」" }, read: "2026-11-26", measured: true },
  build(c) {
    gotokuBuild(c);
  },
});
