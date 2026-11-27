import { mitsuWariKiriBuild } from "./drawn/kiri-split.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuWariKiri = defineCrest({
  id: "mitsu-wari-kiri",
  name: { en: "Three-part divided paulownia", ja: "三つ割り桐" },
  reading: "みつわりぎり",
  romaji: "mitsu wari giri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリきり"],
  construction: { en: "Three scalloped flower spikes point toward the centre. Divided leaves fill the curved outer sections, and white channels separate the three parts.", ja: "丸く刻んだ花穂を三本、中心へ向けます。外側の弧には割った葉を置き、三つの部分の間を白く抜きます。" },
  measured: "Three inward-facing spikes nearly meet in the middle. The visible curved leaf portions stay near the outside circle. The dark outer rim joins those sections without an added frame.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, first row, fourth column from the right: 三ッワリきり", ja: "左頁、一段目、右から四列目「三ッワリきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuWariKiriBuild(c);
  },
});
