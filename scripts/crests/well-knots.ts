import { SHINSEN_MONCHO } from "./books.ts";
import { chuwaNiMusubiIBuild, wachigaiIBuild } from "./drawn/well-knots.ts";
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

export const chuwaNiMusubiI = defineCrest({
  id: "chuwa-ni-musubi-i",
  name: { en: "Knotted well in a medium ring", ja: "中輪に結び井" },
  reading: "ちゅうわにむすびい",
  romaji: "chuuwa ni musubi i",
  frame: "ring-medium",
  motifs: [{ motif: "well-frame", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["中ワニむすび井"],
  source: { ...SHINSEN_MONCHO, frame: 6, place: { en: "left page, first row, first column from the right: 中ワニむすび井", ja: "左頁、一段目、右から一列目「中ワニむすび井」" }, read: READ, measured: true },
  measured: "Four curved lobes with individual slotted eyes surround a small square central opening. The original centre bridge is filled and the eyes each open towards the outer ring.",
  construction: {
    en: "Strike the enclosing ring and four round sections. Join the sections through the centre and leave four short slots between them. Rule an eye into each section from its outer edge and leave a small closed square in the centre.",
    ja: "輪と四つの丸い区画を打ちます。中央で区画をつなぎ、区画の間に短い切れ目を四つ残します。各区画の外から目を開け、中央には閉じた小さな正方形を残します。",
  },
  build: chuwaNiMusubiIBuild,
});
