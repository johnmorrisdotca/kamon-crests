import { SHINSEN_MONCHO } from "./books.ts";
import { hanabishiKuzushiBuild, musubiHanabishiBuild } from "./drawn/hanabishi-clusters.ts";
import { defineCrest } from "./util.ts";

export const hanabishiKuzushi = defineCrest({
  id: "hanabishi-kuzushi",
  name: { en: "Freely drawn flower lozenge", ja: "花菱崩し" },
  reading: "はなびしくずし",
  romaji: "hanabishi kuzushi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花びし崩", "花びしくづし"],
  construction: { en: "Four rounded points enclose small lens-shaped cuts on the diagonals.", ja: "丸みのある四つの突起の内側に、斜めを向く小さな木の葉形の抜きを入れます。" },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, second row, second column from the right: 花びし崩 (gloss くづし)", ja: "左頁、二段目、右から二列目「花びし崩」（振り仮名「くづし」）" }, read: "2026-11-27", measured: true },
  measured: "The narrow eyes sit along the four diagonal shoulders of the printed contour.",
  build: hanabishiKuzushiBuild,
});
