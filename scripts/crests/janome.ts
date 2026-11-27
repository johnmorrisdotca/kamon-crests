import { cell } from "./kaku-meyui.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuNejiJanomeBuild, kenUmeJanomeBuild, nanatsuJanomeBuild } from "./drawn/janome.ts";
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

export const kenUmeJanome = defineCrest({
  id: "ken-ume-janome",
  name: { en: "Sword plum snake's eyes", ja: "剣梅蛇の目" },
  reading: "けんうめじゃのめ",
  romaji: "ken ume janome",
  frame: "none",
  motifs: [{ motif: "snake-eye", count: 6, arrangement: "radial" }, { motif: "sword", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["けんむめじやの目"],
  source: cell(42, "left page, second row, second column from the right: けんむめじやの目", "左頁、二段目、右から二列目「けんむめじやの目」"),
  measured: "Five outer circles of about 48 pixels radius stand about 107 pixels from the centre and have holes of about 19 pixels radius. The middle circle is about 37 pixels in radius, with a smaller hole. Five narrow shafts widen to short faceted tips on the outside. The construction makes their widths and turns equal.",
  construction: {
    en: "Join five pierced eyes to a sixth, smaller eye with short straight stems. Between the outer eyes place five curved blades with flared, angular tips.",
    ja: "外の五つの蛇の目を短い軸で中央の小さな蛇の目につなぎます。外の蛇の目の間に、先が広がって角のある剣を五本置きます。",
  },
  build: kenUmeJanomeBuild,
});
