import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hikiryo-tsunagi.ts";
import { defineCrest } from "./util.ts";

export const tsunagiMitsuHikiryo = defineCrest({
  id: "tsunagi-mitsu-hikiryo",
  name: { en: "Three upright bars with a round opening", ja: "つなぎ三つ引両" },
  reading: "つなぎみつひきりょう",
  romaji: "tsunagi mitsu hikiryō",
  frame: "none",
  motifs: [{ motif: "line", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["つなぎ三ッ引"],
  construction: {
    en: "Three upright bars stand side by side, parted by narrow white lines: a middle bar 0.75 as wide again as each side bar, and a round opening in the middle bar about a third of the whole width across. The bars' top and bottom corners stand on the outer circle. Every side is ruled full length.",
    ja: "縦の棒を三本、細い白線をはさんで並べます。真ん中の棒は両側の棒の1.5倍の幅があり、その真ん中に、全体の幅の約3分の1の丸い穴を抜きます。棒の上下の角は外円の上にあります。辺はどれも端から端まで引きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, second row, fourth column counted from the right: つなぎ三ッ引 (three upright bars, a round opening in the middle one; measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から四列目「つなぎ三ッ引」（縦の棒三本、真ん中に丸い穴。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the three bars are about 77, 122 and 83 pixels wide and 252 high, set side by side across about 287 pixels, with a gap of about 5 pixels on the left and almost none on the right. A circle about 83 across stands in the middle bar. The one outline is read as a solid figure with the circle cut out, as in the cell's neighbours. The drawing makes the two side bars alike and the gaps equal.",
  build: drawn.tsunagiMitsuHikiryoBuild,
});
