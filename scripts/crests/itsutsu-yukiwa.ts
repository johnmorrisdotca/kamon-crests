import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuYukiwaBuild } from "./drawn/itsutsu-yukiwa.ts";
import { defineCrest } from "./util.ts";

export const itsutsuYukiwa = defineCrest({
  id: "itsutsu-yukiwa",
  name: { en: "Five-holed snow ring", ja: "五つ雪輪" },
  reading: "いつつゆきわ",
  romaji: "itsutsu yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五ッ雪輪"],
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, row 1, fourth column from the right: 五ッ雪輪 (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から四列目「五ッ雪輪」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A ring whose outer edge rises and falls in about twelve small round bumps, with a plain circle for its inner edge and five small round holes set at equal distances round it. In the printed cell the inner circle is about 110 across the radius and the bumps reach from 136 to 155, so the ring's outer edge is about a third as far out again as its inner circle's radius, and the holes are about 11 across the radius and 124 to 138 from the centre. The printed bumps differ in size and spacing, and the drawing makes the twelve equal and evenly spaced.",
  construction: {
    en: "Strike an inner circle of 69 across the radius and twelve equal circles round it, centred 52 out at every twelfth of the way round and each 40 across the radius, so that their outer edges stand just inside the layout circle and each meets the next a little in from them. The ring is the space inside the twelve and outside the inner circle. Strike five small circles 79 out at every fifth of the way round, and leave them white.",
    ja: "半径69の内側の円を一つ描き、そのまわりに、同じ大きさの円を十二個描きます。中心は52離して12等分の位置に置き、半径は40にして、外の円のすぐ内側に収めます。となり合う円は、少し内側で交わります。十二の円の内側で、内側の円の外が輪になります。さらに、79離して5等分の位置に小さな円を五つ描き、白く抜きます。",
  },
  build: itsutsuYukiwaBuild,
});
