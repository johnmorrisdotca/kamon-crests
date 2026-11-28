import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-uke.ts";
import { defineCrest } from "./util.ts";

export const ukeBishi = defineCrest({
  id: "uke-bishi",
  name: { en: "Lozenge in four hooks", ja: "うけ菱" },
  reading: "うけびし",
  romaji: "uke bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["うけひし"],
  construction: {
    en: "A lozenge, its side corners on the layout circle, cut into four equal hooks by two narrow white seams that cross at the middle. Take the lozenge as a square of 4 by 4 steps laid along its sides. Each seam starts a quarter of the way along one side, goes a quarter in, a quarter across, a half through the middle, then a quarter across and a quarter out to the opposite side. The second seam is the first turned a quarter-turn about the middle.",
    ja: "横の角を外の円の上に置いた菱を、中心で交わる二本の細い白い筋で、同じ形の鉤形四つに分けます。菱を辺に沿った4かける4の目の正方形と考えます。筋は、一つの辺の四分の一のところから入り、四分の一内へ、四分の一横へ進み、中心を通って半分進み、さらに四分の一横へ、四分の一外へ進んで向かいの辺へ出ます。二本目は、一本目を中心のまわりに四分の一回したものです。",
  },
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, first row, fourth column counted from the right: うけひし (a lozenge cut into four hooks; measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から四列目「うけひし」（鉤形四つに分けた菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the lozenge is about 311 pixels wide and 238 high, so 0.76 high to wide. Its two white seams, each drawn as a double line about 6 apart, are made of straight runs that follow the lozenge's own sides, at a quarter and a half of the way across it; the two cross once at the middle, and each ends on a side a quarter from a corner.",
  build: drawn.ukeBishiBuild,
});
