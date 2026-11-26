import { itsutsuTamaBuild } from "./drawn/hoju.ts";
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
