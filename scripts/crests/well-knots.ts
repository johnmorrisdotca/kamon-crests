import { SHINSEN_MONCHO } from "./books.ts";
import { wachigaiIBuild } from "./drawn/well-knots.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const wachigaiI = defineCrest({
  id: "wachigai-i",
  name: { en: "Linked well bands", ja: "輪違い井" },
  reading: "わちがいい",
  romaji: "wachigai i",
  frame: "none",
  motifs: [{ motif: "well-frame", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["わちがひ井"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "left page, third row, first column from the right: わちがひ井", ja: "左頁、三段目、右から一列目「わちがひ井」" }, read: READ, measured: true },
  measured: "Two linked bands cross at right angles. Their four extended tips are split by short white slots, and one band passes above the next in each quadrant.",
  construction: {
    en: "Strike the shallow compass arcs for one curved band and turn it through four quarter positions. Rule a straight slot at each point. Alternate the overlaps, leaving a narrow clearance beside the upper band.",
    ja: "浅い弧で一つの帯を打ち、四分の一回転ずつ四か所に置きます。先端に直線の切れ目を引き、交わる帯の上下を交互にして細い白筋を残します。",
  },
  build: wachigaiIBuild,
});
