import { ranNoMaruBuild } from "./drawn/ran-no-maru.ts";
import { ranNoEdaBuild } from "./drawn/ran-no-eda.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const ranNoEda = defineCrest({
  id: "ran-no-eda",
  name: { en: "Orchid branch", ja: "蘭の枝" },
  reading: "らんのえだ",
  romaji: "ran no eda",
  frame: "none",
  motifs: [{ motif: "orchid", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["蘭のえだ"],
  construction: {
    en: "Nine orchid blades spread from a short diagonal stem. One lens is placed straight or bent around a circular axis, with a centered midrib on every blade.",
    ja: "短い斜めの茎から九枚の蘭の葉を広げます。同じ形の葉をまっすぐ、または円弧に沿って曲げ、すべてに中央の主脈を通します。",
  },
  measured: "The nine lengths, tips and the continuous stem were measured from the 1892 cell. Each straight or curved blade has the same width profile and a centered 1.15-unit midrib.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, second row, fourth column from the right: 蘭のえだ", ja: "右頁、二段目、右から四列目「蘭のえだ」" }, read: "2026-11-27", measured: true },
  build: ranNoEdaBuild,
});

export const ranNoMaru = defineCrest({
  id: "ran-no-maru",
  name: { en: "Orchid round", ja: "蘭の丸" },
  reading: "らんのまる",
  romaji: "ran no maru",
  frame: "ring-thin",
  motifs: [{ motif: "orchid", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["蘭の丸"],
  construction: {
    en: "Five straight or curved orchid leaves and three flowers rise from attached stems within a fine ring.",
    ja: "細い輪の内側に、まっすぐな葉と曲がった葉を合わせて五枚、茎につながった花を三輪配します。",
  },
  measured: "The leaf poses, flowers, stem curls and the thin ring were measured from the 1892 cell. Every leaf uses one lens profile and a fixed-width midrib.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, first row, first column from the right: 蘭の丸", ja: "左頁、一段目、右から一列目「蘭の丸」" }, read: "2026-11-27", measured: true },
  build: ranNoMaruBuild,
});
