import { SHINSEN_MONCHO } from "./books.ts";
import { futatsuHeishiBuild } from "./drawn/heishi.ts";
import { defineCrest } from "./util.ts";

export const futatsuHeishi = defineCrest({
  id: "futatsu-heishi",
  name: { en: "Two sake flasks", ja: "二つ瓶子" },
  reading: "ふたつへいし",
  romaji: "futatsu heishi",
  frame: "none",
  motifs: [{ motif: "sake-flask", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["二ッ瓶子"],
  construction: {
    en: "Two covered offering flasks stand side by side. Their round shoulders narrow to flat bases and the tied cords hang down at both sides.",
    ja: "布をかぶせた瓶子を二つ並べます。丸い肩から平らな底へ向かって細くし、結んだ紐を両脇に垂らします。",
  },
  measured: "The printed pair has nearly level rims and bases. The cord ornaments are close together at the middle. The slight differences between the flasks have been balanced.",
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "left page, third row, third column from the right: 二ッ瓶子", ja: "左頁、三段目、右から三列目「二ッ瓶子」" }, read: "2026-11-26", measured: true },
  build: futatsuHeishiBuild,
});
