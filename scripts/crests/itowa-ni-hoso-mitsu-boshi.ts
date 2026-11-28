import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiHosoMitsuBoshiBuild } from "./drawn/itowa-ni-hoso-mitsu-boshi.ts";
import { defineCrest } from "./util.ts";

export const itowaNiHosoMitsuBoshi = defineCrest({
  id: "itowa-ni-hoso-mitsu-boshi",
  name: { en: "Three slim stars with swords in a thread ring", ja: "糸輪に細三つ星" },
  reading: "いとわにほそみつぼし",
  romaji: "itowa ni hoso mitsuboshi",
  frame: "ring-thread",
  motifs: [{ motif: "star", count: 3, arrangement: "radial" }, { motif: "sword", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ細三ッ星"],
  source: { ...SHINSEN_MONCHO, frame: 10, place: { en: "right page, row 4, first column from the right: 糸ワニ細三ッ星 (measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から一列目「糸ワニ細三ッ星」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Three discs stand at the top, lower left and lower right of a small round hub, and a pointed blade fills each gap between them, the whole inside a thin ring. In the printed cell the discs are about 137 across the radius with their centres about 237 from the hub, the hub about 65, and each blade runs from a narrow neck at the hub to a head about 200 across whose outer edge comes to a point about 396 out. The three printed blades differ in width by a quarter, and the drawing makes them equal.",
  construction: {
    en: "Strike a hub and a thread ring about the centre. Set three equal discs at the top, lower left and lower right, and in each gap rule a blade that starts as a narrow neck on the hub's edge, widens along two arcs bowed in towards its middle line, and ends in a point just inside the ring. Turn the first disc and the first blade a third of the way round twice.",
    ja: "中心に小さな円と糸輪を描きます。上、左下、右下に同じ大きさの円を三つ置き、その間に剣を一つずつ引きます。剣は、中心の円の縁の細い首から始まり、中央の線へ少しへこんだ二つの弧で広がり、輪のすぐ内側の先で終わります。最初の円と最初の剣を、3分の1回転ずつ二回回します。",
  },
  build: itowaNiHosoMitsuBoshiBuild,
});
