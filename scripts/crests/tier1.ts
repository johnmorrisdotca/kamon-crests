// Crests of the first tier that the books name and the package lacked: plain forms of circles and ruled lines, each set out in page
// units (the centre at (0, 0), x to the right, y up, the layout circle at 96), so every compass width is a whole number and every
// centre a grid point. Their proportions were measured from a period crest book and from public pictures, never traced.
import { C0, R } from "../construct/geo.ts";
import { carve, disc, toPath } from "../construct/compass.ts";
import type { Placing } from "../construct/compass.ts";
import { wariBishiBuild } from "./drawn/families.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

/** The day these pages were read. */
const READ_TODAY = "2026-11-25";
const PAGE: Placing = { k: 1 };

export const fundo = defineCrest({
  id: "fundo",
  measured: "The 分銅 of the 1892 crest book (frame 32, left page, row 4, column 4), a circle with two smaller circles in it at the two sides, read as parts of the big circle's radius: each small circle 0.34 across the radius, its centre 0.68 out, so that its outer edge just passes the big circle. The Wikimedia Commons picture Fundou-Kamon gives the same, 0.326 and 0.687, its small circles' edges 0.01 past the big circle. The drawing takes a big circle of 96 and two circles of 32 about (65, 0) and (-65, 0).",
  source: { ...SHINSEN_MONCHO, frame: 32, place: { en: "left page, fourth row, fourth column: ふんどう (measured, and drawn with compass and ruler)", ja: "左頁、四段目の四列目「ふんどう」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Scale weight", ja: "分銅" },
  reading: "ふんどう",
  romaji: "fundō",
  frame: "none",
  motifs: [{ motif: "weight", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["balance weight", "weight", "fundou", "分銅紋"],
  construction: {
    en: "A disc with a round bite taken from each side, the shape of a balance weight seen from the side. A circle of 96 about the centre, and two circles of 32 about the two points 65 either side of the centre on the level line; the bites are cut where they pass the disc's edge, so each leaves two sharp points. The right bite is struck first, the left one where it stands.",
    ja: "秤（はかり）の分銅を横から見た形です。中心の円（半径96）から、左右に一つずつ円い欠けを取ります。欠けは、中心から左右に65離れた二つの点を中心にした、半径32の円です。円は円盤の縁から少しはみ出すので、欠けごとに先が二つとがります。右の欠けを先に作図し、左はその場で作図します。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle([C0[0] + 65, C0[1]], 32);
    c.guideCircle([C0[0] - 65, C0[1]], 32);
    c.fill("weight", toPath(carve([disc([0, 0], R)], [disc([65, 0], 32), disc([-65, 0], 32)]), PAGE));
  },
});

export const wariBishi = defineCrest({
  id: "wari-bishi",
  measured: "The Wikimedia Commons picture Japanese Crest wari Hisi, read in its own units: the four lozenges 577 across and 437 high, so 0.757 high to wide (ours 0.75, four to three), and the white between them 16 across the upright line, 0.073 of the half-height (ours 0.08). The 1892 crest book draws the same four lozenges in a ring and names them 九こ武田ひし (frame 43, right page, row 4, column 2): 0.78 high to wide in its hand. The ringed 丸に割菱 (`maru-ni-wari-bishi`) already has this lozenge; this is it with no ring, at the full layout circle.",
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, fourth row, second column: 九こ武田ひし, the same four lozenges in a ring (measured, and drawn with compass and ruler)", ja: "右頁、四段目の二列目「九こ武田ひし」、輪の中の同じ四つの菱（寸法を測り、コンパスと定規で描いたもの）" }, read: READ_TODAY, measured: true },
  name: { en: "Split lozenge", ja: "割菱" },
  reading: "わりびし",
  romaji: "wari-bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["four-part lozenge", "four lozenges", "wari bishi"],
  construction: {
    en: "A lozenge four wide to three high, cut into four like lozenges by a narrow white cross that runs along its sides. Its side corners stand on the outer circle, and its top and bottom corners on a circle three quarters of it. Eight lines are ruled full length: the four sides, and the two edges of each white band.",
    ja: "横4に対して縦3の菱形を、辺と平行な細い白い十字で、同じ形の四つの菱に分けます。左右の角は外円の上、上下の角は外円の4分の3の円の上にあります。直線は八本、端から端まで引きます。四つの辺と、二本の白い帯それぞれの両側の線です。",
  },
  build(c) {
    wariBishiBuild(c, "diamond", R);
  },
});
