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
