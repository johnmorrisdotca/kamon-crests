// Arabesque flowers measured from labelled cells in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { karahanaBuild, kenHanabishiBuild } from "./drawn/karahana.ts";
import { defineCrest } from "./util.ts";

export const karahana = defineCrest({
  id: "karahana",
  name: { en: "Arabesque flower", ja: "唐花" },
  reading: "からはな",
  romaji: "karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["Chinese flower", "arabesque blossom"],
  construction: {
    en: "Five petals round a small disc, each with three rounded lobes at its edge. Narrow ruled gaps run between the petals, and a short white stamen runs out through the middle of each.",
    ja: "小さな円のまわりに、先が三つの丸いふくらみに分かれた花びらを五枚並べます。花びらの間は細い直線で分け、中央から白いしべを一本ずつ伸ばします。",
  },
  measured: "Frame 18: the notches between petals stand about four fifths out from the centre. The middle tip is struck from 77 out with a radius of 23. The two shoulder lobes stand 31 either side and 68 out, with radii of 21. The central disc has a radius of about 12 and the stamens reach 43.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, second row, fourth column from the right: 唐花", ja: "右頁、二段目、右から四列目「唐花」" }, read: "2026-11-25", measured: true },
  build(c) {
    karahanaBuild(c, 96);
  },
});

export const kenHanabishi = defineCrest({
  id: "ken-hanabishi",
  name: { en: "Sword flower lozenge", ja: "剣花菱" },
  reading: "けんはなびし",
  romaji: "ken hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }, { motif: "sword", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["sword hanabishi", "ken hanabishi"],
  construction: {
    en: "Four scalloped petals fill a broad lozenge, with a dotted round heart and a short white stamen in each petal. Four short sword points stand diagonally between them. The upright petals are shorter than the side petals.",
    ja: "先が三つにふくらむ花びら四枚を、横に広い菱形に並べます。中央の丸には点を入れ、各花びらに短い白いしべを入れます。花びらの間に剣先を斜めに四つ置きます。上下の花びらは左右より短くします。",
  },
  measured: "Frame 8: the upright petals reach about 80 in a side reach of 100, and the heart is about 22 across. The upper right sword point is near (60, 53) in that frame. Each petal has one tip lobe and two shoulders struck from circles.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, third row, first column from the right: 剣花びし", ja: "左頁、三段目、右から一列目「剣花びし」" }, read: "2026-11-25", measured: true },
  build(c) {
    kenHanabishiBuild(c, 96);
  },
});
