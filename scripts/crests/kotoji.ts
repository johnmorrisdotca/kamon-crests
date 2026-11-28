import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiMitsuKotojiBuild, oshiKotojiBuild } from "./drawn/kotoji.ts";
import { kotojiNiTsumeBuild } from "./drawn/kotoji-ni-tsume.ts";
import { R } from "../construct/geo.ts";
import { defineCrest } from "./util.ts";

export const oshiKotoji = defineCrest({
  id: "oshi-kotoji",
  name: { en: "Upright koto bridge", ja: "押し琴柱" },
  reading: "おしことじ",
  romaji: "oshi kotoji",
  frame: "none",
  motifs: [{ motif: "koto-bridge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["おしことぢ"],
  construction: {
    en: "A single koto bridge has a squared head, outward shoulders and two feet divided by a long rounded opening.",
    ja: "一つの琴柱の頭を角形にし、肩を外に広げます。二本の足の間には上端が丸い長いすき間があります。",
  },
  measured: "The plain bridge spreads about 246 across its feet and rises about 250 in the cell. Its head is about 31 across. The two shoulders and the arch between the feet have been centered on the upright.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, second row, first column from the right: おしことぢ", ja: "左頁、二段目、右から一列目「おしことぢ」" }, read: "2026-11-26", measured: true },
  build: oshiKotojiBuild,
});

export const maruNiMitsuKotoji = defineCrest({
  id: "maru-ni-mitsu-kotoji",
  name: { en: "Three koto bridges in a circle", ja: "丸に三つ琴柱" },
  reading: "まるにみつことじ",
  romaji: "maru ni mitsu kotoji",
  frame: "ring-medium",
  motifs: [{ motif: "koto-bridge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["丸に三ッことぢ"],
  construction: {
    en: "Three bridges point their small ends toward the centre of the ring. Their arched openings face out.",
    ja: "三つの琴柱の細い頭を輪の中心へ向けます。足の間のアーチは外へ向けます。",
  },
  measured: "The small heads meet near the centre of the printed ring. Each bridge has an outward opening and two feet. The three bridges are balanced at 120-degree turns and set inside the catalogue medium ring.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, first row, second column from the right: 丸に三ッことぢ", ja: "左頁、一段目、右から二列目「丸に三ッことぢ」" }, read: "2026-11-26", measured: true },
  build: maruNiMitsuKotojiBuild,
});

export const kotojiNiTsume = defineCrest({
  id: "kotoji-ni-tsume",
  name: { en: "Koto bridge with plectra", ja: "琴柱に爪" },
  reading: "ことじにつめ",
  romaji: "kotoji ni tsume",
  frame: "none",
  motifs: [{ motif: "koto-bridge", count: 1, arrangement: "single" }, { motif: "koto-plectrum", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["ことぢにつめ"],
  construction: {
    en: "A lens-shaped frame lies level, each end rolled into a pair of volutes. Two bowed bands cross above it and below it and pass behind it. Inside, three plectra turn a third of a turn apart, their knobs outward.",
    ja: "レンズ形の枠を横に置き、両端を二つの渦に巻きます。弓なりの帯を二本、枠の上と下で交差させ、枠の後ろを通します。枠の中には三つの爪を三分の一回転ずつ回して置き、つまみを外に向けます。",
  },
  measured: "The book's crest, in its pixels from the frame's middle. The volutes are circles of 26, their centres 132.5 out, 24.6 above and 26 below the middle, each with a white curl open towards the hole and an eye. The frame's outer corners stand 90 out, 51 above and 34 below; its outer edges are arcs through 58 above and 56 below the middle, and the outer corners are ruled to touch the volutes. The hole's tips stand 108 out, its edges arcs through 43 above and 37 below and ruled to corners 75 out. The bands are arcs of 153.4 about centres 135 to either side and 3.6 below the middle, 17 wide, crossing on the upright 69 above and 76 below it; their ends are cut level, 119 above and 122 below. The band from the upper left lies over the other above the frame and under it below. The three plectra are bars of 32 by 10 with round ends, each with a round-topped knob 13 wide, turned a third of a turn apart about a point 3.5 above the middle, the bars 16.8 from it. The book's jagged frame edges are drawn smooth, and its left and right halves, a few pixels apart, are averaged.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "right page, fourth row, fourth column from the right: ことぢにつめ", ja: "右頁、四段目、右から四列目「ことぢにつめ」" }, read: "2026-11-28", measured: true },
  build(c) {
    kotojiNiTsumeBuild(c, R);
  },
});
