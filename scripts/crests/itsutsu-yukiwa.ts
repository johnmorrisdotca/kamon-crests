import { SHINSEN_MONCHO } from "./books.ts";
import { itsutsuYukiwaBuild } from "./drawn/itsutsu-yukiwa.ts";
import { defineCrest } from "./util.ts";

export const itsutsuYukiwa = defineCrest({
  id: "itsutsu-yukiwa",
  name: { en: "Five-eyed snow ring", ja: "五つ雪輪" },
  reading: "いつつゆきわ",
  romaji: "itsutsu yukiwa",
  frame: "none",
  motifs: [{ motif: "snow-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["五ッ雪輪"],
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, row 1, fourth column from the right: 五ッ雪輪 (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から四列目「五ッ雪輪」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A ring whose outer edge rises and falls in about fifteen shallow round bumps, with a plain circle for its inner edge and five small round eyes, each a white circle set against the outer edge and touching it from inside, at equal distances round it. In the printed cell the inner circle is about 110 across the radius, the bumps reach from 136 to 155 and are 5 to 10 deep, and the eyes are about 11 across the radius with their outer sides on the edge. The printed bumps differ in size and spacing, and the drawing makes the fifteen equal and evenly spaced.",
  construction: {
    en: "Strike an inner circle of 69 across the radius and fifteen equal circles round it, centred 60 out at every fifteenth of the way round and each 34 across the radius, so that their outer edges stand just inside the layout circle and each meets the next a little in from them. The ring is the space inside the fifteen and outside the inner circle. Strike five small circles of 7 across the radius, centred 85.5 out at every fifth of the way round, so that each touches the ring's outer edge from inside, and leave them white.",
    ja: "半径69の内側の円を一つ描き、そのまわりに、同じ大きさの円を十五個描きます。中心は60離して15等分の位置に置き、半径は34にして、外の円のすぐ内側に収めます。となり合う円は、少し内側で交わります。十五の円の内側で、内側の円の外が輪になります。さらに、半径7の小さな円を五つ、中心を85.5離して5等分の位置に描きます。どれも輪の外の縁に内側から接するようにして、白く抜きます。",
  },
  build: itsutsuYukiwaBuild,
});
