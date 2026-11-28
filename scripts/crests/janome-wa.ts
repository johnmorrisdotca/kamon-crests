import { SHINSEN_MONCHO } from "./books.ts";
import { janomeWaBuild } from "./drawn/janome-wa.ts";
import { defineCrest } from "./util.ts";

export const janomeWa = defineCrest({
  id: "janome-wa",
  name: { en: "Snake's-eye ring", ja: "蛇の目輪" },
  reading: "じゃのめわ",
  romaji: "janome wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["蛇の目輪"],
  source: { ...SHINSEN_MONCHO, frame: 15, place: { en: "right page, row 4, third column from the right: 蛇の目輪 (measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から三列目「蛇の目輪」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A wide ring: two circles about one centre, the black between them. In the printed cell the outer circle is about 147 across the radius and the inner one about 66, so the inner circle is 0.45 of the outer and the ring is 0.55 of the radius across, about 0.27 of the diameter.",
  construction: {
    en: "Two circles about the centre, the outer the layout circle and the inner of 43.2 across the radius, 0.45 of the outer: the ring is the black between them, 52.8 across.",
    ja: "同じ中心に円を二つ描きます。外側は割付の円、内側は半径43.2で、外側の0.45倍です。二つの円の間が輪で、幅は52.8です。",
  },
  build: janomeWaBuild,
});
