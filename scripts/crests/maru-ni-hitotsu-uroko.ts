import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiHitotsuUrokoBuild } from "./drawn/maru-ni-hitotsu-uroko.ts";
import { defineCrest } from "./util.ts";

export const maruNiHitotsuUroko = defineCrest({
  id: "maru-ni-hitotsu-uroko",
  name: { en: "One scale in a ring", ja: "丸に一つ鱗" },
  reading: "まるにひとつうろこ",
  romaji: "maru ni hitotsu uroko",
  frame: "ring-thin",
  motifs: [{ motif: "scale", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に三ッうろこ"],
  source: { ...SHINSEN_MONCHO, frame: 25, place: { en: "left page, row 1, third column from the right: 丸に三ッうろこ, where the cell shows a single flat triangle in a ring (measured, and drawn with compass and ruler)", ja: "左頁、一段目、右から三列目「丸に三ッうろこ」。セルには輪の中に平たい三角形が一つだけ描かれています（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "The label says three scales in a circle, but the cell shows one flat isosceles triangle, its apex up and its base a level line, inside a double-lined ring. In the printed cell the ring's outer circle is about 230 across the radius and the band between its two lines about 27, a good deal wider than the package's thin ring; the triangle's apex stands about 120 above the middle and its base about 72 below, 367 wide. The drawing follows the picture and not the label, which is why it is named one scale.",
  construction: {
    en: "A ring 11.3 wide between the layout circle and a circle inside it, then a triangle ruled from its apex 50 above the centre to the two ends of a level base 153 wide and 30 below the centre. The three ruled lines meet at the corners, which stand inside the ring.",
    ja: "幅11.3の輪を、外の円とその内側の円の間に描き、中心の50上の頂点から、中心の30下にある幅153の水平な底辺の両端へ、直線を三本引いて三角形を作ります。三つの角は輪の内側に収まります。",
  },
  build: maruNiHitotsuUrokoBuild,
});
