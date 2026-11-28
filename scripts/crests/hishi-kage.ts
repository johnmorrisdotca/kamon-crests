import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-kage.ts";
import { defineCrest } from "./util.ts";

export const kageMatsukawaBishi = defineCrest({
  id: "kage-matsukawa-bishi",
  name: { en: "Pine-bark lozenge in outline", ja: "陰松皮菱" },
  reading: "かげまつかわびし",
  romaji: "kage matsukawa bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かげ松川ひし"],
  construction: {
    en: "A pine-bark lozenge drawn as a band: the band between a stepped lozenge and a smaller one inside it. The outer lozenge's side corners stand on the layout circle, and each of its four sides steps in once, 0.45 of the way from the top or bottom to the side corner. The inner lozenge has the same four steps at the same heights, and every side of both is ruled full length.",
    ja: "松皮菱を帯で描きます。段のある菱と、その内側のひとまわり小さい菱の間が帯です。外の菱の横の角は外の円の上にあり、四つの辺はそれぞれ、上または下の角から横の角までの0.45のところで一度段を作ります。内の菱にも同じ高さに同じ四つの段があり、どの辺も端から端まで引いた直線です。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "right page, second row, third column counted from the right: かげ松川ひし (a pine-bark lozenge as a band; measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から三列目「かげ松川ひし」（帯で描いた松皮菱。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the outer lozenge is about 320 pixels wide and 260 high, with its two steps on each half 0.55 and 0.43 of the half-height out from the middle. The inner lozenge is about 223 wide and 198 high with its steps at the same heights. The band is about 49 across at the side corners and 31 at the top and bottom. The printed lozenge leans a little, its top and bottom corners about 10 pixels left of the middle of its steps, and the drawing sets it upright.",
  build: drawn.kageMatsukawaBishiBuild,
});
