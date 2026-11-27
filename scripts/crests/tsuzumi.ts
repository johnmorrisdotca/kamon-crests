import { himotsukiTsuzumiBuild, tsuzumiFrontBuild } from "./drawn/tsuzumi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const himotsukiTsuzumi = defineCrest({
  id: "himotsuki-tsuzumi",
  name: { en: "Hand drum with cord", ja: "紐付き鼓" },
  reading: "ひもつきつづみ",
  romaji: "himotsuki tsuzumi",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["紐付つづみ"],
  construction: { en: "A round drumhead is bound at six places and loops of cord end in two tassels.", ja: "丸い鼓の面を六か所で締め、回した紐の先に二つの房を付けます。" },
  measured: "The head and its inner disc share a centre. The cord loops follow the off-centre arcs seen behind the head.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, third row, third column from the right: 紐付つづみ", ja: "右頁、三段目、右から三列目「紐付つづみ」" }, read: "2026-11-26", measured: true },
  build(c) {
    himotsukiTsuzumiBuild(c);
  },
});

export const tsuzumi = defineCrest({
  id: "tsuzumi",
  name: { en: "Hand drum", ja: "鼓" },
  reading: "つづみ",
  romaji: "tsuzumi",
  frame: "none",
  motifs: [{ motif: "hand-drum", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["つづみ"],
  construction: {
    en: "The circular striking head sits in front of a second offset head. Six laces hold the front rim, with two small cord knots at the foot.",
    ja: "正面の丸い打面を、ずらした後ろの面の手前に置きます。正面の縁を六か所で締め、下に二つの紐の結びを付けます。",
  },
  measured: "The two heads overlap with a broad crescent visible above the front face. The inner disc of the front head shares the same centre. The small knots are balanced on either side.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, fourth row, third column from the right: つづみ", ja: "右頁、四段目、右から三列目「つづみ」" }, read: "2026-11-26", measured: true },
  build: tsuzumiFrontBuild,
});
