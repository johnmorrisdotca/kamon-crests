import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/kikko-arrangements.ts";
import { defineCrest } from "./util.ts";

export const mitsuKikkoKuzushi = defineCrest({
  id: "mitsu-kikko-kuzushi",
  name: { en: "Three open tortoise shells", ja: "三つ亀甲崩し" },
  reading: "みつきっこうくずし",
  romaji: "mitsu kikkō kuzushi",
  frame: "none",
  motifs: [{ motif: "tortoise-shell", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三ッ亀甲くづし"],
  construction: {
    en: "Rule three pointed hexagonal bands with their bottom sides omitted. One stands above the identical pair below it, and all three open downwards.",
    ja: "角が上を向く亀甲帯を、下辺を開けて三つ作ります。一つを上に、同じ二つを下に並べ、どれも下へ開きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "left page, third row, fourth column from the right: 三ッ亀甲くづし", ja: "左頁、三段目、右から四列目「三ッ亀甲くづし」" }, read: "2026-11-27", measured: true },
  measured: "The printed bands stand about 145 pixels across and 108 high, with an open bottom. The verticals are about 27 wide. At package size each band is 74 across and 54 high, one apex above two.",
  build: drawn.mitsuKikkoKuzushiBuild,
});

export const mitsuyoriKikkoMochi = defineCrest({
  id: "mitsuyori-kikko-mochi",
  name: { en: "Three gathered tortoise shells with round openings", ja: "三つ寄り亀甲持ち" },
  reading: "みつよりきっこうもち",
  romaji: "mitsuyori kikkō mochi",
  frame: "none",
  motifs: [{ motif: "tortoise-shell", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三つ寄り亀甲持", "三ッよりきつかう持"],
  construction: {
    en: "Place a hexagon on each of three equal spokes. The outer edges form a trefoil and thin white seams divide the tiles. Each hexagon has a round white opening at its centre.",
    ja: "三本の割付線に正六角形を一つずつ置き、三つ葉の外形を作ります。境に細い白線を残し、各六角形の中央を丸く抜きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "left page, fourth row, third column from the right: 三ッよりきつかう持", ja: "左頁、四段目、右から三列目「三ッよりきつかう持」" }, read: "2026-11-27", measured: true },
  measured: "One upper hexagon and two lower ones abut in the print, their small round openings about one third the tile radius. In the drawing the nominal hexagon radius is 48, set back by 1.2 to leave white seams, with a 16-unit round opening.",
  build: drawn.mitsuyoriKikkoMochiBuild,
});

export const kikkoHanabishiCircle = defineCrest({
  id: "kikko-hanabishi",
  name: { en: "Flower lozenge in a roundel and tortoise shell", ja: "亀甲花菱" },
  reading: "きっこうはなびし",
  romaji: "kikkō hanabishi",
  frame: "hexagon",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["亀甲花びし"],
  construction: {
    en: "Rule one point-up hexagonal band. Strike a circular line inside it and set the four matching petals of the flower lozenge inside the circle.",
    ja: "角が上を向く一重の亀甲を作り、内側に円を引きます。その円の中に同じ形の花びら四枚からなる花菱を入れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, second row, first column from the right: 亀甲花びし", ja: "右頁、二段目、右から一列目「亀甲花びし」" }, read: "2026-11-27", measured: true },
  measured: "The printed circle is about 190 pixels across against a point-up hexagon about 311 high. On a 96-unit shell radius the circle radius is 59, with a flower reach of 52.",
  build: drawn.kikkoHanabishiCircleBuild,
});
