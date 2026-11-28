import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kaku-hizumi.ts";
import { defineCrest } from "./util.ts";

export const hizumiKakuNiSan = defineCrest({
  id: "hizumi-kaku-ni-san",
  name: { en: "Three bars in a warped square", ja: "歪み角に三" },
  reading: "ひずみかくにさん",
  romaji: "hizumi kaku ni san",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }, { motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["ひずみ角ニ三", "歪み角に三つ引", "hizumi kaku ni san"],
  construction: {
    en: "A frame with four rounded points at top, bottom and both sides, and a concave curve between each pair, drawn as a band of equal width 0.1 of the radius. The points are arcs of four circles of radius 0.41 about centres 0.58 out on the two upright lines through the middle, and each concave curve is an arc of a circle of radius 0.55 about a centre 0.91 out on a diagonal, touching the two nearest circles. The band's inner edge uses the same centres with each radius changed by the band's width. Inside the frame stand three level bars, each 0.65 across and 0.18 high, a white of 0.14 between them.",
    ja: "上下左右に丸い先が四つあり、先と先の間は内へへこむ曲線で結んだ枠を、半径の約0.1の同じ太さの帯で描きます。先は、中心を通る縦横の線の上、中心から0.58のところを中心とする半径0.41の円の弧です。へこむ曲線は、斜めの線の上、中心から0.91のところを中心とする半径0.55の円の弧で、近い二つの円に接します。帯の内側の縁は、同じ中心で半径を帯の太さだけ変えた円の弧です。枠の中には、幅0.65、高さ0.18の横の棒を三本、間に0.14の白を置いて入れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 19, place: { en: "right page, third row, second column counted from the right: ひずみ角ニ三 (three bars in a warped square frame; measured, and drawn with compass and ruler)", ja: "右頁、三段目、右から二列目「ひずみ角ニ三」（ゆがんだ角の枠に三本の棒。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the frame's outer outline is about 311 pixels across, with its points 155 from the middle and its waists 115 out on the diagonals, and the inner outline runs 26 inside it all round, so the band is about 0.17 of the half-width. Read at every tenth of a turn, the outer outline's distance from the middle is 155, 149, 136, 122 and 115.5 at 0, 10, 20, 30 and 40 degrees from a point, and four-fold alike within about 5. The three bars are each about 102 across and 28 high with a white of about 22 between them; the printed bars stand about 6 right of the middle, and the drawing centres them.",
  build: drawn.hizumiKakuNiSanBuild,
});
