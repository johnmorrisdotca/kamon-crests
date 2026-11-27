import { mitsuTachiWarabiBuild, hanaWarabiBuild } from "./drawn/warabi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mitsuTachiWarabi = defineCrest({
  id: "mitsu-tachi-warabi",
  name: { en: "Three upright bracken fronds", ja: "三つ立ち蕨" },
  reading: "みつたちわらび",
  romaji: "mitsu tachi warabi",
  frame: "none",
  motifs: [{ motif: "bracken", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三ッ立ワらび"],
  construction: { en: "Three bracken fronds stand upright in a scalloped roundel.", ja: "三つの蕨を、ふくらみの連なる丸の内側に立てます。" },
  measured: "Each frond has a straight stem and paired curls, with one above the two lower fronds.",
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, second row, third column from the right: 三ッ立ワらび", ja: "右頁、二段目、右から三列目「三ッ立ワらび」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuTachiWarabiBuild(c);
  },
});

export const hanaWarabi = defineCrest({
  id: "hana-warabi",
  name: { en: "Bracken blossom", ja: "花蕨" },
  reading: "はなわらび",
  romaji: "hana warabi",
  frame: "none",
  motifs: [{ motif: "bracken", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花ワらび"],
  construction: { en: "Two broad curved fronds sit opposite one another around a small centre.", ja: "幅広く曲がる二つの蕨を、小さな中心の左右に置きます。" },
  measured: "The two curling fronds mirror each other across a short vertical axis.",
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, third row, second column from the right: 花ワらび", ja: "右頁、三段目、右から二列目「花ワらび」" }, read: "2026-11-26", measured: true },
  build(c) {
    hanaWarabiBuild(c);
  },
});
