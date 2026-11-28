import { chuwaNiTamaBuild, itsutsuTamaBuild, chuwaNiMitsuTamaBuild } from "./drawn/hoju.ts";
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

export const chuwaNiTama = defineCrest({
  id: "chuwa-ni-tama",
  name: { en: "Sacred jewel in a medium ring", ja: "中輪に玉" },
  reading: "ちゅうわにたま",
  romaji: "chuwa ni tama",
  frame: "ring-medium",
  motifs: [{ motif: "sacred-jewel", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中ワニ玉"],
  construction: {
    en: "One sacred jewel fills a ring, round below and rising to a point. Three loops inside it close on the point, each smaller and higher than the last.",
    ja: "宝珠を一つ、輪いっぱいに置きます。下は丸く、上はとがります。中の三つの輪は先で閉じ、内側ほど小さく高くなります。",
  },
  measured: "The book's crest, in its pixels from the ring's centre: the ring from 142.5 to 152.75, drawn at that width (0.07 of its radius); the jewel a circle of 121.5 with a small point 134.5 up; its three loops circles fitted to their feet (28.5 down, 28 up and 67 up) and widths (84.5 at 60 up, 54 at 85 up, 24.5 at 85 up), each rising to the point, the smallest a little wider than printed so that it reaches it.",
  source: { ...SHINSEN_MONCHO, frame: 21, place: { en: "left page, third row, second column from the right: 中ワニ玉", ja: "左頁、三段目、右から二列目「中ワニ玉」" }, read: "2026-11-28", measured: true },
  build: chuwaNiTamaBuild,
});
