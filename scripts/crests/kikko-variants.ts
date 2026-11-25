// Tortoise-shell hexagons with the flower lozenge in them: one, and three in a triangle, and the three in a ring.
import type { Builder } from "../construct/builder.ts";
import { C0, ngonPoints, poly } from "../construct/geo.ts";
import type { Path, Pt } from "../construct/geo.ts";
import { hanabishiBuild } from "./drawn/hanabishi.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest, fam } from "./util.ts";

const READ_AT = "2026-11-25";

/** A hexagon with a corner up about `at`: `r` is its circumradius. */
const hexAt = (r: number, at: Pt): Path => poly(ngonPoints(6, r, 0, at));

/**
 * A tortoise-shell hexagon about `at` on the page, built from its outside in: a thick band between the circumradii `r[0]` and
 * `r[1]`, a thin line between `r[2]` and `r[3]`, and the flower lozenge inside, its side petals reaching `reach` from the middle.
 */
const kikkoHanabishi = (c: Builder, at: Pt, r: [number, number, number, number], reach: number): void => {
  c.fill("frame", hexAt(r[0], at).join(hexAt(r[1], at)), "evenodd");
  c.fill("frame", hexAt(r[2], at).join(hexAt(r[3], at)), "evenodd");
  hanabishiBuild(c, "flower-lozenge", reach, [at[0] - C0[0], C0[1] - at[1]]);
};

export const kikkoNiHanabishi = defineCrest({
  id: "kikko-ni-hanabishi",
  name: { en: "Flower lozenge in a hexagon", ja: "亀甲に花菱" },
  reading: "きっこうにはなびし",
  romaji: "kikkō ni hanabishi",
  frame: "hexagon",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hanabishi in a tortoise shell", "kikko hanabishi"],
  construction: {
    en: "A tortoise-shell hexagon, one corner up: a thick band, a narrow white line, a thin line, and inside it the flower lozenge, its side petals a narrow white line from the thin one.",
    ja: "角を上にした亀甲です。太い帯、細い白線、細い線の順に重ね、その内側に花菱を収めます。左右の花びらの先は、細い線から白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, second row, second column counted from the right: 亀甲, a hexagon of one thick and two thin lines round a four-petalled flower (measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から二列目「亀甲」（太い線一本と細い線二本の六角形に、四枚の花びらの花が入った形。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    c.stepRound(92);
    kikkoHanabishi(c, C0, [92, 64, 59, 54], 44);
  },
});

export const mitsumoriKikkoNiHanabishi = defineCrest({
  id: "mitsumori-kikko-ni-hanabishi",
  name: { en: "Flower lozenge in three hexagons", ja: "三つ盛り亀甲に花菱" },
  reading: "みつもりきっこうにはなびし",
  romaji: "mitsumori kikkō ni hanabishi",
  frame: "hexagon",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "triangle" }],
  families: [fam("Azai", "浅井", "あざい")],
  aliases: ["three hexagons with flower lozenges", "Azai crest"],
  construction: {
    en: "Three tortoise-shell hexagons, one corner up, one above two, each a narrow white line from the next, each with a thick band, a narrow white line, a thin line and a flower lozenge: the top one first, then the lower right and the lower left.",
    ja: "角を上にした亀甲を三つ、品の字に並べます。隣どうしは細い白線一本分だけ離します。どの亀甲も、太い帯、細い白線、細い線の順に重ね、その内側に花菱を収めます。上、右下、左下の順に作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, first row, second column counted from the right: 三ッきっこう (three hexagons, one above two, with a flower in each; measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から二列目「三ッきっこう」（品の字に並んだ三つの亀甲に、それぞれ花が入った形。寸法を測り、コンパスと定規で描いたもの）" }, read: READ_AT, measured: true },
  build(c) {
    for (const at of [[100, 51], [142, 124], [58, 124]] as Pt[]) kikkoHanabishi(c, at, [47, 33, 30, 28], 22);
  },
});

export const maruNiMitsumoriKikkoNiHanabishi = defineCrest({
  id: "maru-ni-mitsumori-kikko-ni-hanabishi",
  name: { en: "Flower lozenge in three hexagons in a circle", ja: "丸に三つ盛り亀甲に花菱" },
  reading: "まるにみつもりきっこうにはなびし",
  romaji: "maru ni mitsumori kikkō ni hanabishi",
  frame: "ring-medium",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["three hexagons with flower lozenges in a ring", "丸に三つ盛り亀甲"],
  construction: {
    en: "The three hexagons with their flower lozenges inside a ring about a tenth of the diameter thick, the corners of the hexagons a narrow white line from it.",
    ja: "直径の約10分の1の太さの輪の内側に、花菱の入った三つの亀甲を収め、亀甲の角を輪から細い白線一本分だけ離します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 41, place: { en: "right page, first row, second column counted from the right: 三ッきっこう, set inside a ring", ja: "右頁、一段目、右から二列目「三ッきっこう」（輪に入れた形）" }, read: READ_AT, measured: true },
  build(c) {
    c.ring("ring-medium");
    for (const at of [[100, 65], [132, 120], [68, 120]] as Pt[]) kikkoHanabishi(c, at, [35, 25, 23, 21], 17);
  },
});
