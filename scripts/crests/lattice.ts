// Plain crests set out from the 1892 crest book's cells by ruled lines and struck circles: the flower lozenges in a lozenge, the
// stacked lozenges, and the other small lattices that follow.
import { hanabishiBuild } from "./drawn/hanabishi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const yotsuHanabishi = defineCrest({
  id: "yotsu-hanabishi",
  name: { en: "Four flower lozenges", ja: "四つ花菱" },
  reading: "よつはなびし",
  romaji: "yotsu hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 4, arrangement: "ring" }],
  families: [],
  aliases: ["four hanabishi", "yotsu hanabishi", "四ッ花菱"],
  construction: {
    en: "Four flower lozenges laid in a lozenge: one above, one at the right, one below and one at the left, the two at the sides a little wider apart than the two above and below. Each is the flower lozenge, built on its own centre where it stands, from the top clockwise.",
    ja: "花菱を四つ、菱形に並べます。上、右、下、左の順に、時計回りに、それぞれの中心でその場で花菱を作図します。左右の二つは、上下の二つよりも少し離して置きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, fourth row, first column: 四ッ花ひし (four flower lozenges in a lozenge; measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から一列目「四ッ花ひし」（菱形に並んだ四つの花菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-26", measured: true },
  build(c) {
    for (const at of [[0, 40], [52, 0], [0, -40], [-52, 0]] as [number, number][]) hanabishiBuild(c, "flower-lozenge", 43, at);
  },
});
