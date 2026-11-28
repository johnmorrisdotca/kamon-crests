import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiJigamiBuild, mitsuJigamiBuild, sangaiJigamiBuild } from "./drawn/jigami.ts";
import { defineCrest } from "./util.ts";

export const sangaiJigami = defineCrest({
  id: "sangai-jigami",
  name: { en: "Three tiers of fan paper", ja: "三階地紙" },
  reading: "さんがいじがみ",
  romaji: "sangai jigami",
  frame: "none",
  motifs: [{ motif: "fan-paper", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三がい地紙"],
  construction: {
    en: "Three sheets overlap up one axis. Their upper arcs show in tiers, while the lowest sheet shows its notch.",
    ja: "三枚の地紙を一つの軸に沿って重ねます。上の弧を段にして見せ、一番下にくぼみを出します。",
  },
  measured: "The upper edges are three similarly bowed arcs of nearly equal span. The lowest sheet is in front and shows both bevelled sides and the smaller lower arc.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, fourth row, third column from the right: 三がい地紙", ja: "右頁、四段目、右から三列目「三がい地紙」" }, read: "2026-11-26", measured: true },
  build: sangaiJigamiBuild,
});

export const maruNiJigami = defineCrest({
  id: "maru-ni-jigami",
  name: { en: "Fan paper in a circle", ja: "丸に地紙" },
  reading: "まるにじがみ",
  romaji: "maru ni jigami",
  frame: "ring-medium",
  motifs: [{ motif: "fan-paper", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に地がみ"],
  construction: {
    en: "One fan paper, its broad edge up, inside a ring. Its upper and lower edges are arcs and its sides are ruled.",
    ja: "広い辺を上にした地紙を一枚、輪の中に置きます。上と下の辺は弧で、左右の辺は直線です。",
  },
  measured: "The book's crest, in its pixels from the ring's centre: the ring from 129 to 156, drawn at that width (0.17 of its radius); the paper's upper corners 123.75 out and 24.5 up, its lower corners 73.75 out and 62 down, its upper edge reaching 75 up and its lower 22.5 down. The book tilts the paper a little, its right corner 20 higher than its left; here it is level.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, second row, third column from the right: 丸に地がみ", ja: "右頁、二段目、右から三列目「丸に地がみ」" }, read: "2026-11-28", measured: true },
  build: maruNiJigamiBuild,
});

export const mitsuJigami = defineCrest({
  id: "mitsu-jigami",
  name: { en: "Three fan papers", ja: "三つ地紙" },
  reading: "みつじがみ",
  romaji: "mitsu jigami",
  frame: "none",
  motifs: [{ motif: "fan-paper", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ地がみ"],
  construction: {
    en: "Three fan papers turn a third of a turn apart, their broad edges bowing in towards the middle and their narrow ends out.",
    ja: "三枚の地紙を三分の一回転ずつ回し、広い辺を中心へ向けて弧に、狭い端を外に向けます。",
  },
  measured: "The book's papers, in its pixels from the middle: each broad edge 232 across at 93.6 out, bowing in to 24.6; each narrow end 90 across at 135 out, bowing in to 110 (the lower two a little narrower, 76). The book's three are turned 0, 118.5 and 241.5 degrees; here a third of a turn apart.",
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, third row, third column from the right: 三ッ地がミ", ja: "右頁、三段目、右から三列目「三ッ地がミ」" }, read: "2026-11-28", measured: true },
  build: mitsuJigamiBuild,
});
