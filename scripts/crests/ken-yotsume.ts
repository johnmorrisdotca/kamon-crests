import { SHINSEN_MONCHO } from "./books.ts";
import { kenYotsumeBuild } from "./drawn/ken-yotsume.ts";
import { defineCrest } from "./util.ts";

export const kenYotsume = defineCrest({
  id: "ken-yotsume",
  name: { en: "Four eyes with swords", ja: "剣四つ目" },
  reading: "けんよつめ",
  romaji: "ken yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "radial" }, { motif: "sword", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["けん四ッ目"],
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "right page, row 2, second column from the right: けん四ッ目 (measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から二列目「けん四ッ目」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "Four square eyes, each a diamond with a small square opening, stand above, below, left and right of a round hub and are joined to it by short bars, and a pointed blade fills each corner between them. In the printed cell the hub is about 65 across the radius, the eyes' centres about 305 out, each eye about 150 from its centre to its corners and tilted about 4 degrees, the bars about 75 wide, and each blade runs from the hub to a point about 485 out, with shoulders about 431 out and 19.5 degrees either side of its middle line. The four printed eyes and blades differ by a few percent, and the drawing makes them equal.",
  construction: {
    en: "Strike a hub, and on the upright and level lines four diamonds of 29.7 across the radius, centred 60.4 out and each tilted 4 degrees, each with a diamond opening of 8.7. Join each to the hub with a bar 15 wide. In each corner between them rule a blade that starts at the hub's edge, widens along two arcs bowed in towards its middle line, and ends in a point on the layout circle. Turn the first bar, eye and blade a quarter of the way round three times.",
    ja: "中心に小さな円を描き、縦横の線の上に、半径29.7の菱形（正方形を立てたもの）を四つ、中心を60.4離して4度傾けて置き、それぞれに半径8.7の小さな菱形の抜きを入れます。それぞれを幅15の棒で中心の円につなぎます。四つの菱形の間の角には、中心の円の縁から始まり、中央の線へ少しへこんだ二つの弧で広がり、外の円の上の先で終わる剣を引きます。最初の棒、目、剣を、4分の1回転ずつ三回回します。",
  },
  build: kenYotsumeBuild,
});
