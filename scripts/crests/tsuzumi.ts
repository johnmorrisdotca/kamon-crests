import { himotsukiTsuzumiBuild } from "./drawn/tsuzumi.ts";
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
  construction: { en: "A round drumhead is bound at six places and loops of cord end in two tassels.", ja: "丸い鼓を六か所で締め、回した紐の先にふたつの房をつけます。" },
  measured: "The head and its inner disc share a centre. The cord loops follow the off-centre arcs seen behind the head.",
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, third row, third column from the right: 紐付つづみ", ja: "右頁、三段目、右から三列目「紐付つづみ」" }, read: "2026-11-26", measured: true },
  build(c) {
    himotsukiTsuzumiBuild(c);
  },
});
