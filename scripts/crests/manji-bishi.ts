import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/manji-bishi.ts";
import { MANJI_NOTE } from "./plain-forms.ts";
import { defineCrest } from "./util.ts";

export const manjiBishi = defineCrest({
  id: "manji-bishi",
  name: { en: "Manji lozenge", ja: "卍菱" },
  reading: "まんじびし",
  romaji: "manji bishi",
  frame: "none",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  note: MANJI_NOTE,
  aliases: ["まんじひし", "万字菱"],
  construction: {
    en: "A lozenge, its side corners on the layout circle, cut by four narrow white slits 3 wide that turn about the middle like a manji. Take the lozenge as a square of 4 by 4 steps laid along its sides. Each slit starts on one side at 0.16 of a side from the middle line and runs straight in, parallel to the next side, to a corner of the central square of 0.32; the four are the same slit turned by quarter-turns about the middle.",
    ja: "横の角を外の円の上に置いた菱を、卍のように中心のまわりを回る四本の細い白い切れ目で切ります。菱を辺に沿った4かける4の目の正方形と考えます。切れ目はそれぞれ、辺の上の、中心の線から辺の0.16だけ離れたところから、となりの辺と平行にまっすぐ入り、一辺0.32の中央の正方形の角で止まります。四本は同じ切れ目を中心のまわりに四分の一ずつ回したものです。",
  },
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "right page, second row, first column counted from the right: まんじひし (a lozenge cut by four manji slits; measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から一列目「まんじひし」（卍の形に四つ切り込んだ菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the lozenge is about 312 pixels wide and 232 high, so 0.74 high to wide. Each of its four slits, drawn as a double line about 6 apart, runs from a side to the corner of a central square a third of a side across, parallel to the next side and about 70 long. The four lie a quarter-turn apart about the middle, and the whole cell is four-fold within about 5 pixels.",
  build: drawn.manjiBishiBuild,
});
