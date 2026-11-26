import { cornerManjiInRing, fourAssembledManji, looseManji, roundManji } from "./drawn/manji.ts";
import { cell } from "./kaku-meyui.ts";
import { MANJI_NOTE } from "./plain-forms.ts";
import { defineCrest } from "./util.ts";

export const manjiMaru = defineCrest({
  id: "manji-maru",
  name: { en: "Round manji", ja: "万字丸" },
  reading: "まんじまる",
  romaji: "manji maru",
  frame: "none",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸卍", "まんじ丸"],
  note: MANJI_NOTE,
  source: cell(30, "right page, row 1, second column from the right: まんじ丸", "右頁、一段目、右から二列目「まんじ丸」"),
  measured:
    "The disk in the book is about 299 pixels across. The four isolated cutouts follow a second circle of radius about 131, then turn down along straight sides about 32 pixels apart. The drawing uses radius 96 outside and 84 for the round edges of the cutouts, with the inward white channels 20 wide.",
  construction: {
    en: "Four white openings cut into a round disc. Each has a compass arc from a common inner circle and a straight-sided channel reaching towards the centre. The four openings turn a quarter turn apart.",
    ja: "丸い地に四つの形を白く抜きます。それぞれの外側は内円の弧を使い、中心へ向かう部分の辺は直線で引きます。四つの白抜きを4分の1回転ずつ離して置きます。",
  },
  build: roundManji,
});

export const manjiKuzushi = defineCrest({
  id: "manji-kuzushi",
  name: { en: "Loose manji", ja: "万字崩し" },
  reading: "まんじくずし",
  romaji: "manji kuzushi",
  frame: "none",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["卍崩し", "隅立て卍崩し", "まんじくづし"],
  note: MANJI_NOTE,
  source: cell(30, "right page, row 2, second column from the right: まんじくづし", "右頁、二段目、右から二列目「まんじくづし」"),
  measured:
    "Each side of the rotated square in the print spans about 225 pixels. A white slit about 6 pixels wide enters about one fifth of a side from its midpoint, reaches towards the middle and sends a branch along the side of the square. The drawing uses a slit 3.8 wide and preserves the branching on all four sides.",
  construction: {
    en: "A square on its corner has four narrow slits, one entering each side. Every slit branches once, with its shorter branch parallel to the side it entered. The four patterns turn the same way.",
    ja: "角を上下左右に向けた正方形の四つの辺に、細いすき間を一つずつ入れます。どのすき間も途中で一度分かれ、短い方は入ってきた辺に平行に伸びます。四つとも同じ向きに回します。",
  },
  build: looseManji,
});

export const yotsuKumiaiManji = defineCrest({
  id: "yotsu-kumiai-manji",
  name: { en: "Four joined manji", ja: "四つ組み合い万字" },
  reading: "よつくみあいまんじ",
  romaji: "yotsu kumiai manji",
  frame: "none",
  motifs: [{ motif: "manji", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["四つ組合せ卍", "四ッ組合まんじ"],
  note: MANJI_NOTE,
  source: cell(30, "right page, row 3, second column from the right: 四ッ組合まんじ", "右頁、三段目、右から二列目「四ッ組合まんじ」"),
  measured:
    "The cell has four broad arms reaching about 154 pixels from the middle and about 120 across. The outer slits are about 8 pixels across. The drawing makes the arms straight and equal and retains both the outer slits and the four bends of the central white opening.",
  construction: {
    en: "Four equal, broad arms meet at the centre. Narrow slots cut their edges into repeating square bends. The central opening follows four ruled bends, one each quarter turn.",
    ja: "同じ大きさの太い腕を四つ、中央でつなぎます。縁に細い切れ込みを入れ、直角に曲がる形をくり返します。中央の白抜きは4分の1回転ずつ直角に曲がる直線の形です。",
  },
  build: fourAssembledManji,
});

export const maruNiSumitateManji = defineCrest({
  id: "maru-ni-sumitate-manji",
  name: { en: "Corner-up manji in a circle", ja: "丸に隅立て万字" },
  reading: "まるにすみたてまんじ",
  romaji: "maru ni sumitate manji",
  frame: "ring-thin",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に角立ち卍", "丸に隅立て左卍"],
  note: MANJI_NOTE,
  source: cell(30, "right page, row 4, first column from the right: 丸ニ角立まんじ", "右頁、四段目、右から一列目「丸ニ角立まんじ」"),
  measured:
    "The ring in the cell spans about 294 pixels and is about 16 thick. The motif measures about 253 pixels from one tip to the opposite one. The sides are turned 45 degrees, and the four narrow white slits are cut a little to one side of the midpoint of each edge. The drawing uses the thin ring and places the four tips on a circle of radius 82.",
  construction: {
    en: "A square stands on its corner inside a thin ring. One narrow slit runs in from each of its four sides beside the middle, with the same turn at every side. A narrow gap separates the four tips from the ring.",
    ja: "角を上下左右に向けた正方形を細い輪に収めます。四つの辺から中心のそばまで細いすき間を一つずつ入れ、どれも同じ向きにそろえます。四つの先と輪の間には細い白いすき間を残します。",
  },
  build: cornerManjiInRing,
});
