import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiMitsuKotojiBuild, oshiKotojiBuild } from "./drawn/kotoji.ts";
import { mitsuKumiKotojiBuild, mitsuTateKotojiBuild } from "./drawn/kotoji-scroll.ts";
import { R } from "../construct/geo.ts";
import { defineCrest } from "./util.ts";
import { kotojiNiTsumeBuild } from "./drawn/kotoji-ni-tsume.ts";

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

export const mitsuTateKotoji = defineCrest({
  id: "mitsu-tate-kotoji",
  name: { en: "Three standing koto bridges", ja: "三つ立て琴柱" },
  reading: "みつたてことじ",
  romaji: "mitsu tate kotoji",
  frame: "none",
  motifs: [{ motif: "koto-bridge", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッたてことぢ"],
  construction: {
    en: "Three koto bridges with rolled heads stand side by side. The middle one is the tallest and stands in front. The two smaller ones stand behind it, and the inner leg of each passes behind one of its legs into the arch.",
    ja: "頭が渦に巻いた琴柱を三つ並べて立てます。真ん中のものがいちばん高く、手前にあります。左右の小さな二つはその後ろにあり、内側の足は真ん中の琴柱の足の後ろを通って、そのアーチの中に出ます。",
  },
  measured: "The book's three bridges, in its pixels, upright and level from the middle bridge's feet. The middle bridge's volutes are circles of 26.5 whose centres stand 25 each side of the upright and 183 up, so that they cross 8.8 above their centres; each curl turns under through two measured points and ends in a hook at the volute's middle, and the neck's edge runs from the hook through a waist 12 from the upright to the shoulder, 42 out and 130 up. The arch rises to 143, and the legs are ruled to feet 77.5 and 53 out. The two bridges behind are mirror images, their heads 0.7 of the middle one's, 93.4 each side: the outer leg is ruled to a foot from 50.4 to 25.5 out, 26 below the middle feet, and the inner leg from a corner 41.4 in to a foot 57.2 to 86.7 in, 14 below them. The book's two side bridges differ, the left one's outer leg standing upright and the right one's leaning out; theirs is the average. A white of 2.5 parts the middle bridge from them.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, third row, first column from the right: 三ッたてことぢ", ja: "左頁、三段目、右から一列目「三ッたてことぢ」" }, read: "2026-11-28", measured: true },
  build(c) {
    mitsuTateKotojiBuild(c, R);
  },
});

export const mitsuKumiKotoji = defineCrest({
  id: "mitsu-kumi-kotoji",
  name: { en: "Three interlocked koto bridges", ja: "三つ組み琴柱" },
  reading: "みつくみことじ",
  romaji: "mitsu kumi kotoji",
  frame: "none",
  motifs: [{ motif: "koto-bridge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッくみことぢ"],
  construction: {
    en: "Three koto bridges with rolled heads turn about one centre, their heads out. Each leg runs along a side of the triangle they make, crossing a neighbour's leg, and ends inside the next bridge's arch, where it meets another leg in a mitre on that bridge's upright.",
    ja: "頭が渦に巻いた琴柱を三つ、頭を外に向けて一つの中心のまわりに回して置きます。足はそれぞれ三角形の辺に沿って隣の足と交わり、次の琴柱のアーチの中で、もう一本の足とその中心線の上で突き合わせに終わります。",
  },
  measured: "The book's crest, in its pixels from the centre of its three heads, which stand 138 from it a third of a turn apart. The top bridge's volutes are 0.87 of the standing middle bridge's, their centres 22 each side of the upright and 132 up; its shoulders' corners stand 45 out and 86 up, and its arch is a gable from 105 up down to straight sides 24 out at 81 up. The legs' edges lean out about 0.1 for each unit down (the book's left legs less, its right legs more). Each pair of legs that meets inside an arch is cut along a line parallel to that bridge's upright, about 7 to its left, so the meeting is not on the upright; the book's mitres agree on this in all three arches. Over and under: each bridge's left leg lies over the right leg of its anticlockwise neighbour, as the book has it, with a white of 2.5 at every crossing and along every mitre. The book's necks are a little shorter than the standing bridges' and its shoulders jagged; the standing bridge's head and neck are used, with a ruled step out to the shoulder.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, fourth row, first column from the right: 三ッくみことぢ", ja: "左頁、四段目、右から一列目「三ッくみことぢ」" }, read: "2026-11-28", measured: true },
  build(c) {
    mitsuKumiKotojiBuild(c, R);
  },
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
