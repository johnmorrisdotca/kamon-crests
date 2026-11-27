import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hanabishi-forms.ts";
import { defineCrest } from "./util.ts";

export const itowaNiHanabishi = defineCrest({
  id: "itowa-ni-hanabishi",
  name: { en: "Flower lozenge in a thread ring", ja: "糸輪に花菱" },
  reading: "いとわにはなびし",
  romaji: "itowa ni hanabishi",
  frame: "ring-thread",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニ花びし"],
  construction: {
    en: "Take the standard flower lozenge at reduced reach and surround it with the thread ring. Its long pair of petals points to either side.",
    ja: "花菱を小さく割り付け、外を糸輪で囲みます。長い二枚の花びらは左右を向きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, second row, first column from the right: 糸ワニ花びし", ja: "左頁、二段目、右から一列目「糸ワニ花びし」" }, read: "2026-11-27", measured: true },
  measured: "The flower reaches about 86 per cent of the outer ring's diameter from side to side. The standard flower-lozenge build has a reach of 82 in the package's 96-unit thread ring.",
  build: drawn.itowaNiHanabishiBuild,
});
