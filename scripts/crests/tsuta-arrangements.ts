import { chuwaNiOniTsutaBuild } from "./drawn/tsuta-arrangements.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const chuwaNiOniTsuta = defineCrest({
  id: "chuwa-ni-oni-tsuta",
  name: { en: "Demon ivy in a medium ring", ja: "中輪鬼蔦" },
  reading: "ちゅうわおにつた",
  romaji: "chūwa oni tsuta",
  frame: "ring-medium",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワおにつた"],
  construction: { en: "Five jagged, veined lobes keep their points inside a medium enclosing ring.", ja: "中輪の内側に、筋のついた五つのとがった蔦の葉を収めます。" },
  measured: "The thin veins and crossed edge points share the dimensions of the matching plain book cell.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "left page, first row, third column from the right: 中ワおにつた", ja: "左頁、一段目、右から三列目「中ワおにつた」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuwaNiOniTsutaBuild(c, c.ring("ring-medium"));
  },
});
