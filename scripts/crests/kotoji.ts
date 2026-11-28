import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiMitsuKotojiBuild, oshiKotojiBuild } from "./drawn/kotoji.ts";
import { mitsuTateKotojiBuild } from "./drawn/kotoji-scroll.ts";
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
