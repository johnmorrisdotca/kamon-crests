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
    ja: "広がる茎の両側から三日月形の枝を上に伸ばし、実の上で先を細くします。実の後ろには、上に一枚、左右に二枚のとがった葉を置きます。実の表面に弧の切れ込みで房を入れ、がくを小さな三つの印で表します。",
  },
  measured: "The outer boughs in the print run from the top point nearly to the foot of the crest. Their outside span is about 315 pixels. The central fruit is about 170 pixels wide. The drawing mirrors the two sides and uses circular arcs for the boughs and their inner white cuts.",
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "left page, third row, first column from the right: 橘くづし", ja: "左頁、三段目、右から一列目「橘くづし」" }, read: "2026-11-26", measured: true },
  build: drawn.tachibanaKuzushiBuild,
});

export const itowaNiTachibana = defineCrest({
  id: "itowa-ni-tachibana",
  name: { en: "Tachibana in a thin ring", ja: "糸輪に橘" },
  reading: "いとわにたちばな",
  romaji: "itowa ni tachibana",
  frame: "ring-thread",
  motifs: [{ motif: "tachibana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸ワニたちばな"],
  construction: {
    en: "A broad orange and five pointed leaves fill a thread ring. The upper leaves fan upwards and two longer leaves spread beside the upright stem. The stem widens into a short foot.",
    ja: "糸輪の中に、幅広い橘の実と五枚のとがった葉を収めます。上の葉は上へ扇状に広がり、下の長い二枚は立った茎の両側に伸びます。茎の下端は短く広がります。",
  },
  measured: "The upper and lower pairs of leaves reach close to the thin printed circle. The stem descends from the calyx to a flared flat foot. The drawing regularises the broad leaf angles and uses the package's thread ring and a narrow white space around the upper leaf.",
  source: { ...SHINSEN_MONCHO, frame: 20, place: { en: "right page, third row, fourth column from the right: 糸ワニたちばな", ja: "右頁、三段目、右から四列目「糸ワニたちばな」" }, read: "2026-11-26", measured: true },
  build: drawn.itowaTachibanaBuild,
});
