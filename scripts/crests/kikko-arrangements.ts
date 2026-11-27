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
