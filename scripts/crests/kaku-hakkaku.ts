import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kaku-hakkaku.ts";
import { defineCrest } from "./util.ts";

export const hakkakuMochi = defineCrest({
  id: "hakkaku-mochi",
  name: { en: "Octagon with a round opening", ja: "八角持" },
  reading: "はっかくもち",
  romaji: "hakkaku mochi",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八角持ち"],
  construction: {
    en: "An eight-sided figure with four level and upright sides, its eight corners on the outer circle, around a concentric circular opening. The circle's radius is 0.91 of the circle the octagon's sides touch, so the circle nearly reaches the middle of each ruled side and leaves the corners broad. Every side is ruled full length.",
    ja: "四辺が縦横を向く八角形の中心を丸く抜きます。八つの角は外円の上にあります。白い円の半径は、八角形の辺に接する円の0.91倍で、四辺の中央近くまで広げ、角は広く残します。辺はどれも端から端まで引きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 19, place: { en: "right page, fourth row, fourth column counted from the right: 八角持 (an octagon with a round opening; measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から四列目「八角持」（丸く抜いた八角形。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "In the printed cell the octagon is about 282 pixels wide and 273 high, its level and upright sides about 110 long and its slanting ones about 118, drawn as one outline. A circle outline about 253 across stands inside it, 0.91 of the width between opposite sides, nearly touching the sides at their middles. The printed circle stands about 7 right of the octagon's middle, and the drawing centres it. As in the neighbouring 鉄炮角, the one outline is read as a solid figure with the circle cut out.",
  build: drawn.hakkakuMochiBuild,
});
