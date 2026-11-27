import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiKikkoKuzushiBuild } from "./drawn/kikko-with-flowers.ts";
import { defineCrest } from "./util.ts";

export const itowaNiKikkoKuzushi = defineCrest({
  id: "itowa-ni-kikko-kuzushi",
  name: { en: "Stylised tortoise shell in a thread ring", ja: "糸輪に亀甲崩し" },
  reading: "いとわにきっこうくずし",
  romaji: "itowa ni kikkō kuzushi",
  frame: "ring-thread",
  motifs: [{ motif: "tortoise-shell", count: 2, arrangement: "rows" }, { motif: "flower-lozenge", count: 2, arrangement: "radial" }],
  families: [],
  aliases: ["糸に亀甲くづし"],
  construction: {
    en: "Two double hexagons sit across the middle of a thread ring. A flower lozenge sits above and below, with narrow white gaps around their lobes.",
    ja: "糸輪の中央に二重の六角形を二つ並べます。上下には花菱を一つずつ置き、花弁のまわりに細いすき間を残します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 40, place: { en: "left page, second row, fourth column from the right: 糸に亀甲くづし", ja: "左頁、二段目、右から四列目「糸に亀甲くづし」" }, read: "2026-11-27", measured: true },
  measured: "The 41.5-unit outer hexagon, the nested hexagon and the broad horizontal petals are measured from frame 40. The smaller vertical lobes leave a narrow gap beside the upper and lower shell edges.",
  build: itowaNiKikkoKuzushiBuild,
});
