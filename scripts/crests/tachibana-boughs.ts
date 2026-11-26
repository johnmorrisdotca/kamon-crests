import { SHINSEN_MONCHO } from "./books.ts";
import * as drawn from "./drawn/tachibana-boughs.ts";
import { defineCrest } from "./util.ts";

export const tachibanaKuzushi = defineCrest({
  id: "tachibana-kuzushi",
  name: { en: "Stylized tachibana", ja: "橘崩し" },
  reading: "たちばなくずし",
  romaji: "tachibana kuzushi",
  frame: "none",
  motifs: [{ motif: "tachibana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["橘くづし"],
  construction: {
    en: "Two crescent boughs extend from beside the flared stem and taper to a point above the fruit. A pointed leaf and two side leaves rise behind the fruit. Curved cuts on its face show the segments and three small marks show its calyx.",
    ja: "広がる茎の両側から三日月形の枝を上に伸ばし、実の上で先を細くします。実の後ろには、上に一枚、左右に二枚の尖った葉を置きます。実の表面に弧の切れ込みで房を入れ、蔕を小さな三つの印で表します。",
  },
  measured: "The outer boughs in the print run from the top point nearly to the foot of the crest. Their outside span is about 315 pixels. The central fruit is about 170 pixels wide. The drawing mirrors the two sides and uses circular arcs for the boughs and their inner white cuts.",
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "left page, third row, first column from the right: 橘くづし", ja: "左頁、三段目、右から一列目「橘くづし」" }, read: "2026-11-26", measured: true },
  build: drawn.tachibanaKuzushiBuild,
});
