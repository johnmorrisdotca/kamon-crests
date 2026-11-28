// The three-split arabesque flower, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuwariKarahanaBuild } from "./drawn/karahana-split.ts";
import { defineCrest } from "./util.ts";

export const mitsuwariKarahana = defineCrest({
  id: "mitsuwari-karahana",
  name: { en: "Three split arabesque flowers", ja: "三つ割り唐花" },
  reading: "みつわりからはな",
  romaji: "mitsuwari karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 3, arrangement: "quartered" }],
  families: [],
  aliases: ["三ッワリから花", "three-part karahana"],
  construction: {
    en: "Three half flowers fill one circle, their hearts on its edge at the top and 120 degrees either side. Each opens towards the middle with one long scalloped petal, and two side petals run along the edge. A paper channel in the shape of a Y parts the three flowers, wide beside the shoulders of the long petals and narrow at the edge.",
    ja: "一つの円を、半分の花三つで埋めます。花の中心は円の縁の真上と、そこから左右120度の位置に置きます。どの花も丸いふくらみのある長い花びら一枚を中央へ向け、左右の花びら二枚を縁に沿わせます。三つの花の間には、Y字形の白いすき間を残します。すき間は長い花びらの肩のあたりで広く、縁で細くなります。",
  },
  measured: "Frame 18, with the circle as 100: each heart is about 14 across its radius. The inward petal reaches about 94 from the edge and is about 82 wide at its shoulders, 61 from the edge. Its flanks open about 31 degrees either side. The side petals meet the edge about 59 degrees round from the heart, and their stamens lean about 62 degrees from the inward one.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, second row, second column from the right: 三ッワリから花", ja: "左頁、二段目、右から二列目「三ッワリから花」" }, read: "2026-11-28", measured: true },
  build: mitsuwariKarahanaBuild,
});
