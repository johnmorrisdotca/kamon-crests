import { looseManji, roundManji } from "./drawn/manji.ts";
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
