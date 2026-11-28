import { SHINSEN_MONCHO } from "./books.ts";
import { kenYotsuBoshiBuild } from "./drawn/ken-yotsu-boshi.ts";
import { defineCrest } from "./util.ts";

export const kenYotsuBoshi = defineCrest({
  id: "ken-yotsu-boshi",
  name: { en: "Four stars with swords", ja: "剣四つ星" },
  reading: "けんよつぼし",
  romaji: "ken yotsu boshi",
  frame: "none",
  motifs: [{ motif: "star", count: 4, arrangement: "radial" }, { motif: "sword", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["釼四ッほし"],
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, row 1, first column from the right: 釼四ッほし (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から一列目「釼四ッほし」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Four discs stand above, below, left and right of a small round hub, and a pointed blade fills each corner between them. In the printed cell the discs are about 43 across the radius with their centres about 88 from the hub, the hub about 20, and each blade runs from the hub's edge to a point about 145 out, its sides bowing in a little and its head about 62 across. The four printed discs and blades differ by about a tenth, and the drawing makes them equal.",
  construction: {
    en: "Strike a hub, and four equal discs round it at the top, bottom, left and right. In each corner between them rule a blade that starts at the hub's edge, widens along two arcs bowed in towards its middle line, and ends in a point on the layout circle. Turn the first disc and the first blade a quarter of the way round three times.",
    ja: "中心に小さな円を描き、そのまわりの上下左右に同じ大きさの円を四つ置きます。円と円の間の四つの角には、中心の円の縁から始まり、中央の線へ少しへこんだ二つの弧で広がり、外の円の上の先で終わる剣を引きます。最初の円と最初の剣を、4分の1回転ずつ三回回します。",
  },
  build: kenYotsuBoshiBuild,
});
