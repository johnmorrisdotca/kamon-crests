import { itsutsuIchoBuild, rokkakuIchoBuild } from "./drawn/icho.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const itsutsuIcho = defineCrest({
  id: "itsutsu-icho",
  name: { en: "Five ginkgo leaves", ja: "五つ銀杏" },
  reading: "いつついちょう",
  romaji: "itsutsu ichō",
  frame: "none",
  motifs: [{ motif: "ginkgo", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッいてふ"],
  construction: { en: "Five scalloped ginkgo leaves look inward along pale curves to a round heart.", ja: "ふくらみのある五枚の銀杏を、白い弧に沿って丸い中心へ向けます。" },
  measured: "Five open lenses, small cut curls and paired veins are spaced equally about the heart.",
  source: { ...SHINSEN_MONCHO, frame: 5, place: { en: "left page, second row, second column from the right: 五ッいてふ", ja: "左頁、二段目、右から二列目「五ッいてふ」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuIchoBuild(c);
  },
});

export const rokkakuIcho = defineCrest({
  id: "rokkaku-icho",
  name: { en: "Hexagonal ginkgo", ja: "六角銀杏" },
  reading: "ろっかくいちょう",
  romaji: "rokkaku ichō",
  frame: "none",
  motifs: [{ motif: "ginkgo", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["六角いてふ"],
  construction: { en: "Three ginkgo fans and a round heart form a gently scalloped hexagon.", ja: "三枚の銀杏と丸い中心で、縁に小さなふくらみのある六角を作ります。" },
  measured: "Three pale curved divisions meet alternating corners of the six-sided perimeter.",
  source: { ...SHINSEN_MONCHO, frame: 5, place: { en: "left page, fourth row, fourth column from the right: 六角いてふ", ja: "左頁、四段目、右から四列目「六角いてふ」" }, read: "2026-11-26", measured: true },
  build(c) {
    rokkakuIchoBuild(c);
  },
});
