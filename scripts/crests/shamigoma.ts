import { mitsuShamigomaBuild } from "./drawn/shamigoma.ts";
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
