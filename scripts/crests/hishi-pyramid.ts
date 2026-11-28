import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-pyramid.ts";
import { defineCrest } from "./util.ts";

export const mitsumoriSangaiBishi = defineCrest({
  id: "mitsumori-sangai-bishi",
  name: { en: "Three gathered three-tier lozenges", ja: "三つ盛り三階菱" },
  reading: "みつもりさんがいびし",
  romaji: "mitsumori sangai bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三ッもり三がいひし"],
  construction: {
    en: "Stand three equal three-tier lozenges as a pyramid, one above and two below. Each lozenge steps out twice on each side before it reaches its widest corners. The two lower lozenges have their tops on the upper one's widest corners, and the two outer widest corners stand on the layout circle. A thin white seam divides each lower lozenge from the upper one.",
    ja: "同じ大きさの三階菱を三つ、上に一つ、下に二つ、山の形に重ねます。どの菱も両側が二度外へ段になり、いちばん広い角へ届きます。下の二つの菱の先は上の菱のいちばん広い角にあり、外側の二つの広い角は外の円の上にあります。下の菱と上の菱の間に細い白い筋を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, fourth row, first column counted from the right: 三ッもり三がいひし (three three-tier lozenges as a pyramid; measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から一列目「三ッもり三がいひし」（三つの三階菱の山形。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell each lozenge is about 136 pixels high and 160 wide. Its sides step out at 48, 73 and 80 pixels from the upright line, 24, 58 and 93 down from its top, with the inward jogs about 12 and 16 deep. The two lower tops stand about 80 out and 93 down from the upper top, on its widest corners, and the lower pair's outer corners are about 320 apart.",
  build: drawn.mitsumoriSangaiBishiBuild,
});
