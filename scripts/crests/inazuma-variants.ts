import { itowaNiYotsuInazumabishiBuild } from "./drawn/inazuma-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const itowaNiYotsuInazumabishi = defineCrest({
  id: "itowa-ni-yotsu-inazumabishi",
  name: { en: "Four lightning lozenges in a thread ring", ja: "糸輪に四つ稲妻菱" },
  reading: "いとわによついなづまびし",
  romaji: "itowa ni yotsu inazumabishi",
  frame: "ring-thread",
  motifs: [{ motif: "lightning", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["糸に四ッいなづま菱"],
  source: cell(6, "left page, row 2, third column from the right: 糸に四ッいなづま菱", "左頁、二段目、右から三列目「糸に四ッいなづま菱」"),
  measured: "Four lozenge cells fill a low diamond about 258 pixels wide and 191 high. The outer ring is about 281 pixels across. Each cell encloses one angular spiral, with broad paper between its inner turns. The drawing keeps the height-to-width ratio near three quarters and uses the package's thread ring.",
  construction: {
    en: "Four lozenge cells sit inside a thread ring. Each holds a spiral where every straight run lies in one of the two directions of its edges. The cells are laid out in a low diamond with narrow spaces between them.",
    ja: "糸輪の中に菱形の区画を四つ置きます。各区画に四角く曲がる渦を入れ、すべての直線を菱形の辺と同じ二方向にそろえます。区画の間を細く白く残し、全体を横長の菱形にまとめます。",
  },
  build: itowaNiYotsuInazumabishiBuild,
});
