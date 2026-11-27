import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-forms.ts";
import { defineCrest } from "./util.ts";

export const maruNiSoriBishi = defineCrest({
  id: "maru-ni-sori-bishi",
  name: { en: "Curved lozenge in a circle", ja: "丸に反り菱" },
  reading: "まるにそりびし",
  romaji: "maru ni sori bishi",
  frame: "ring-medium",
  motifs: [{ motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニそりひし"],
  construction: {
    en: "Four circle arcs bow inward from the corners of a broad lozenge. The horizontal points nearly reach the ring. The same compass width strikes every side.",
    ja: "横長の菱の角を四本の内側へ反った円弧で結びます。左右の角は輪のすぐ内側まで届きます。四辺は同じコンパスの幅で引きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, second row, second column from the right: 丸ニそりひし", ja: "左頁、二段目、右から二列目「丸ニそりひし」" }, read: "2026-11-27", measured: true },
  measured: "The points of the printed lozenge are about 0.77 as high as wide. The side arcs are about 8 units inward from their chords at package scale.",
  build: drawn.maruNiSoriBishiBuild,
});
