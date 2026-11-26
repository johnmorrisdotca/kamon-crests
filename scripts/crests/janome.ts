import { SHINSEN_MONCHO } from "./books.ts";
import { nanatsuJanomeBuild, itsutsuNejiJanomeBuild } from "./drawn/janome.ts";
import { defineCrest } from "./util.ts";

export const nanatsuJanome = defineCrest({
  id: "nanatsu-janome",
  name: { en: "Seven snake's eyes", ja: "七つ蛇の目" },
  reading: "ななつじゃのめ",
  romaji: "nanatsu janome",
  frame: "none",
  motifs: [{ motif: "snake-eye", count: 7, arrangement: "radial" }],
  families: [],
  aliases: ["七ッじやの目"],
  construction: {
    en: "Six round eyes gather around a seventh, each with its round hole.",
    ja: "中央の一つを囲んで六つの蛇の目を並べ、それぞれの中を丸く白く抜きます。",
  },
  measured: "The central eye is slightly wider than the six around it. They have nearly round holes of about two fifths of their outer diameters. The layout balances the six outer eyes at equal turns.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "left page, first row, second column from the right: 七ッじやの目", ja: "左頁、一段目、右から二列目「七ッじやの目」" }, read: "2026-11-26", measured: true },
  build: nanatsuJanomeBuild,
});

export const itsutsuNejiJanome = defineCrest({
  id: "itsutsu-neji-janome",
  name: { en: "Five twisted snake's eyes", ja: "五つ捻じ蛇の目" },
  reading: "いつつねじじゃのめ",
  romaji: "itsutsu neji janome",
  frame: "none",
  motifs: [{ motif: "snake-eye", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["捻ぢじやの目", "捻じ蛇の目"],
  construction: { en: "Five pierced eyes overlap in a turning arrangement, each masking part of the eye behind it.", ja: "丸い穴のある五つの蛇の目を、隣の一部を隠しながら回るように重ねます。" },
  measured: "The five centres stand on one circle. Each sector repeats the same outer arc, opening and overlap.",
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "left page, third row, second column from the right: 捻ぢじやの目", ja: "左頁、三段目、右から二列目「捻ぢじやの目」" }, read: "2026-11-26", measured: true },
  build(c) {
    itsutsuNejiJanomeBuild(c);
  },
});
