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

export const musubiHanabishi = defineCrest({
  id: "musubi-hanabishi",
  name: { en: "Knotted flower lozenge", ja: "結び花菱" },
  reading: "むすびはなびし",
  romaji: "musubi hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["むすび花びし"],
  construction: { en: "Two opposed flower petals and two open knots meet at a round heart. Both arms of each knot turn in at the tip.", ja: "丸い花心に横の二枚の花びらと縦の二つの結びを合わせます。結びの先では二本とも内へ巻きます。" },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, fourth row, third column from the right: むすび花びし", ja: "左頁、四段目、右から三列目「むすび花びし」" }, read: "2026-11-27", measured: true },
  measured: "The two empty heart-shaped loops distinguish this crest from a row of flowers. The caption matches むすび on the same plate at frame 8 left, row 1, column 4.",
  build: musubiHanabishiBuild,
});
