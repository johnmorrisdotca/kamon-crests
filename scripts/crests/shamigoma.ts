import { hitotsuShamigomaBuild, mitsuShamigomaBuild } from "./drawn/shamigoma.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuShamigoma = defineCrest({
  id: "mitsu-shamigoma",
  name: { en: "Three shamisen bridges", ja: "三つ三味駒" },
  reading: "みつしゃみごま",
  romaji: "mitsu shami goma",
  frame: "none",
  motifs: [{ motif: "shamisen-bridge", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三ッ三味こま"],
  construction: { en: "One wider bridge rests above two smaller bridges in a stack.", ja: "小さな三味駒を二つ並べ、その上に幅の広い三味駒を重ねます。" },
  measured: "The three bridges have level feet, with the lower openings reflected across the median.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, fourth row, third column from the right: 三ッ三味こま", ja: "左頁、四段目、右から三列目「三ッ三味こま」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuShamigomaBuild(c);
  },
});

export const hitotsuShamigoma = defineCrest({
  id: "hitotsu-shamigoma",
  name: { en: "One shamisen bridge", ja: "一つ三味駒" },
  reading: "ひとつしゃみごま",
  romaji: "hitotsu shami goma",
  frame: "none",
  motifs: [{ motif: "shamisen-bridge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["一ッ三味こま"],
  construction: {
    en: "One broad bridge stands on a level foot. Its sides curve in to a waist and flare out to the foot's points. A round hole is cut below the middle, and three short slots are cut down from the top.",
    ja: "幅の広い三味駒を一つ、平らな足で立てます。左右の辺はくびれてから足の先へ広がります。中ほどの下に丸い穴をあけ、上の辺から短い切れ込みを三つ入れます。",
  },
  measured: "The book's bridge, in its pixels: 300 across the foot, 163 across the top and 108 at the waist, 89 high, the waist 59 above the foot. The hole is 58 by 50, its middle 36 above the foot, and three slots 12 long stand about 37 apart below the top. These are the proportions of the stacked bridges' drawing, so that bridge is used, with a hole 0.18 of the foot's width.",
  source: { ...SHINSEN_MONCHO, frame: 33, place: { en: "left page, first row, fourth column from the right: 一ッ三味こま", ja: "左頁、一段目、右から四列目「一ッ三味こま」" }, read: "2026-11-28", measured: true },
  build(c) {
    hitotsuShamigomaBuild(c);
  },
});
