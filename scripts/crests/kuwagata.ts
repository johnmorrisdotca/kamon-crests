import { SHINSEN_MONCHO } from "./books.ts";
import { oawaseMitsuKuwagataBuild } from "./drawn/kuwagata.ts";
import { defineCrest } from "./util.ts";

export const oawaseMitsuKuwagata = defineCrest({
  id: "oawase-mitsu-kuwagata",
  name: { en: "Three helmet horns tail to tail", ja: "尾合わせ三つ鍬形" },
  reading: "おあわせみつくわがた",
  romaji: "oawase mitsu kuwagata",
  frame: "none",
  motifs: [{ motif: "helmet-horn", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["尾合せ三ッくわがた"],
  construction: {
    en: "Three rounded helmet horns point outwards a third of a turn apart. The feet approach a white opening at the centre. The circular boss and flared points use the existing compass construction.",
    ja: "丸い鍬形を三つ、3分の1回転ずつ外に向けます。丸い底を中央の白いところへ寄せ、丸い飾りと左右に反る角は同じ円弧の割り付けを使います。",
  },
  measured: "The lowest points of the three bowls approach one another, leaving the small centre open. The measured inward displacement follows the tail-to-tail impression; the three outer shapes are balanced on equal radial axes.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, first row, first column from the right: 尾合せ三ッくわがた", ja: "右頁、一段目、右から一列目「尾合せ三ッくわがた」" }, read: "2026-11-27", measured: true },
  build(c) {
    oawaseMitsuKuwagataBuild(c, "helmet-horn");
  },
});
