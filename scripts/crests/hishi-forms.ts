import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-forms.ts";
import { cell } from "./kaku-meyui.ts";
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

export const daiHishi = defineCrest({
  id: "dai-hishi",
  name: { en: "Notched lozenge", ja: "だい菱" },
  reading: "だいひし",
  romaji: "dai hishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["だいひし"],
  source: cell(43, "right page, third row, fourth column from the right: だいひし", "右頁、三段目、右から四列目「だいひし」"),
  measured: "The outer lozenge measures about 320 by 238 pixels, and its open centre about 176 by 129. Three shallow rectangular notches break the length of the clearest printed sides. The drawing repeats them at equal intervals on each side and retains the broad diamond-shaped opening. The name keeps the printed だい in kana.",
  construction: {
    en: "Rule two broad concentric lozenges. Leave the inner lozenge open. Mark three equally spaced rectangular notches along each outer side.",
    ja: "中心をそろえた横長の菱を二つ引きます。内側を白く残し、外側の各辺に長方形の切れ込みを等間隔に三つ入れます。",
  },
  build: drawn.daiHishiBuild,
});
