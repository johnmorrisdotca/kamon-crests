import { mitsuTachiWarabiBuild } from "./drawn/warabi.ts";
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
  construction: { en: "Three bracken fronds stand upright in a scalloped roundel.", ja: "三つの蕨をふくらんだ丸の内側に立てます。" },
  measured: "Each frond has a straight stem and paired curls, with one above the two lower fronds.",
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, second row, third column from the right: 三ッ立ワらび", ja: "右頁、二段目、右から三列目「三ッ立ワらび」" }, read: "2026-11-26", measured: true },
  build(c) {
    mitsuTachiWarabiBuild(c);
  },
});
