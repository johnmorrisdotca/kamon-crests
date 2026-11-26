import { SHINSEN_MONCHO } from "./books.ts";
import { itowaNiMitsuWariRindoBuild } from "./drawn/gentian-thread.ts";
import { defineCrest } from "./util.ts";

export const itowaNiMitsuWariRindo = defineCrest({
  id: "itowa-ni-mitsu-wari-rindo",
  name: { en: "Three-part gentian in a thread ring", ja: "糸輪に三つ割り竜胆" },
  reading: "いとわにみつわりりんどう",
  romaji: "itowa ni mitsu wari rindō",
  frame: "ring-thread",
  motifs: [{ motif: "gentian", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["糸ワニ三ッ割りんだう"],
  construction: {
    en: "Three flowers face the centre. Straight stems reach to rounded buds near the thread ring. Two long veined leaves lie beside each bud, following the round edge.",
    ja: "三輪の花を中心へ向けます。直線の茎を糸輪の近くの丸いつぼみまで伸ばし、各つぼみの両側に、脈の入った長い葉を輪に沿わせます。",
  },
  measured: "The cell's ring spans about 302 pixels. The upper flower is about 120 pixels wide and the axis of its stem about 138 pixels from the rim to the inner point. The drawing uses a thread ring, a flower about 70 across, and three equal turns. The rounded buds and the two leaves beside each remain near the rim.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, first row, second column from the right: 糸ワニ三ッ割りんだう", ja: "右頁、一段目、右から二列目「糸ワニ三ッ割りんだう」" }, read: "2026-11-26", measured: true },
  build: itowaNiMitsuWariRindoBuild,
});
