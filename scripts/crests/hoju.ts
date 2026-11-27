import { itsutsuTamaBuild, chuwaNiMitsuTamaBuild } from "./drawn/hoju.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const itsutsuTama = defineCrest({
  id: "itsutsu-tama",
  name: { en: "Five sacred jewels", ja: "五つ玉" },
  reading: "いつつたま",
  romaji: "itsutsu tama",
  frame: "none",
  motifs: [{ motif: "sacred-jewel", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッたま"],
  construction: { en: "Five broad jewels turn around a centre, with curved white bands inside each one.", ja: "曲がった白線のある五つの幅広い玉を、中心のまわりに回します。" },
  measured: "The jewel faces and their bands repeat in five equal sectors.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, fourth row, second column from the right: 五ッたま", ja: "左頁、四段目、右から二列目「五ッたま」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuTamaBuild(c);
  },
});

export const chuwaNiMitsuTama = defineCrest({
  id: "chuwa-ni-mitsu-tama",
  name: { en: "Three sacred jewels in a medium ring", ja: "中輪に三つ玉" },
  reading: "ちゅうわにみつたま",
  romaji: "chūwa ni mitsu tama",
  frame: "ring-medium",
  motifs: [{ motif: "sacred-jewel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["中ワニ三ッ玉"],
  construction: { en: "Three jewels point outward within a medium ring.", ja: "三つの玉を、先を外へ向けて中輪に収めます。" },
  measured: "The small jewels turn in three equal sectors around the same point.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, first row, third column from the right: 中ワニ三ッ玉", ja: "左頁、一段目、右から三列目「中ワニ三ッ玉」" }, read: "2026-11-26", measured: true },
  build(c) {
    chuwaNiMitsuTamaBuild(c, c.ring("ring-medium"));
  },
});
