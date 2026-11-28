import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/hishi-bark.ts";
import { defineCrest } from "./util.ts";

export const itsutsuMatsukawaBishi = defineCrest({
  id: "itsutsu-matsukawa-bishi",
  name: { en: "Five pine-bark lozenges", ja: "五つ松皮菱" },
  reading: "いつつまつかわびし",
  romaji: "itsutsu matsukawa bishi",
  frame: "none",
  motifs: [{ motif: "diamond", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッ松川ひし"],
  construction: {
    en: "Five pine-bark lozenges meet at the centre as a star. Each is a kite whose tip stands on the layout circle and whose two inner corners stand on a circle 0.6 of that. Each side steps in once across a short jog. A thin white seam runs from the centre to every inner corner, with a white arrow cut along it.",
    ja: "松皮菱を五つ、中心で合わせて星の形にします。一つはたこ形で、先は外の円の上、内側の二つの角は半径の0.6の円の上にあります。各辺は途中で一度、短い段で内へ入ります。中心から内側の各角へ細い白い筋を引き、その上に白い矢形を入れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 43, place: { en: "left page, third row, second column counted from the right: 五ッ松川ひし (five pine-bark lozenges in a star; measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から二列目「五ッ松川ひし」（五つの松皮菱の星。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed star the five tips stand about 176 pixels from the centre (the five measure 174 to 184) and the five inner corners about 105, so 0.6. Each side's jog stands about 0.44 of the way from the inner corner to the tip, steps in about 10 pixels, and the two runs lean outward by the same amount. The five arrow marks lie on the five seams.",
  build: drawn.itsutsuMatsukawaBishiBuild,
});
