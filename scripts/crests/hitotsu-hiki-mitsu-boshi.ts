import { SHINSEN_MONCHO } from "./books.ts";
import { hitotsuHikiMitsuBoshiBuild } from "./drawn/hitotsu-hiki-mitsu-boshi.ts";
import { defineCrest } from "./util.ts";

export const hitotsuHikiMitsuBoshi = defineCrest({
  id: "hitotsu-hiki-mitsu-boshi",
  name: { en: "Three stars under a level bar", ja: "三つ星一つ引き" },
  reading: "みつぼしひとつひき",
  romaji: "mitsuboshi hitotsu hiki",
  frame: "none",
  motifs: [{ motif: "star", count: 3, arrangement: "triangle" }, { motif: "bar", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["三ッほし一ッ引"],
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "left page, row 4, fourth column from the right: 三ッほし一ッ引 (a bar over three discs; measured, and drawn with compass and ruler)", ja: "左頁、四段目、右から四列目「三ッほし一ッ引」（棒の下に三つの円がある図。寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-28", measured: true },
  measured: "A level bar stands above three discs set like the character 品, one above two. In the printed cell the bar is about 207 pixels wide and 45 high, each disc about 94 across the radius, the lower two centres about 205 apart and the upper one about 185 above them, and the white between the bar and the top disc about 13. The printed bar tilts a little, and the drawing makes it level.",
  construction: {
    en: "Rule a level bar 123 across and 27 high, and under it three equal discs of 28 across the radius, one above two, the two lower centres 61.5 apart on a level line and the upper one 55.5 above that line, midway between them. The bar's corners and the lower discs lie inside the layout circle.",
    ja: "横幅123、高さ27の水平な棒を一本引き、その下に、半径28の同じ円を三つ、品の字（上に一つ、下に二つ）に置きます。下の二つの円の中心は水平に61.5離し、上の円の中心はその真ん中の上55.5に置きます。棒の四つの角と下の二つの円は外の円の内側に収めます。",
  },
  build: hitotsuHikiMitsuBoshiBuild,
});
