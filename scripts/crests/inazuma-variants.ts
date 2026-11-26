import { itowaNiYotsuInazumabishiBuild, itsutsuInazumaBuild } from "./drawn/inazuma-variants.ts";
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

export const itsutsuInazuma = defineCrest({
  id: "itsutsu-inazuma",
  name: { en: "Five lightning spirals", ja: "五つ稲妻" },
  reading: "いつついなづま",
  romaji: "itsutsu inazuma",
  frame: "none",
  motifs: [{ motif: "lightning", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッいなづま"],
  source: cell(6, "left page, row 2, fourth column from the right: 五ッいなづま", "左頁、二段目、右から四列目「五ッいなづま」"),
  measured: "Five pointed cells turn around the centre. One tip stands upright, and the five narrow seams widen slightly towards the rim. The lines inside each face follow the directions of its sides. The drawing places the five cells exactly one fifth of a turn apart.",
  construction: {
    en: "Five lozenge-shaped cells stand one fifth of a turn apart, with a point of the first cell at the top. One straight-edged spiral lies in each cell. The seams remain white between the five spirals.",
    ja: "菱形の区画を5分の1回転ずつ回して並べ、最初の区画の先を上に向けます。各区画の中に直線で折れ曲がる渦を一つ入れ、五つの渦の間に白いすき間を残します。",
  },
  build: itsutsuInazumaBuild,
});
