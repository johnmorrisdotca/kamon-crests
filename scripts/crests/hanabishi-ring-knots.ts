import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuWariMusubiHanabishiBuild } from "./drawn/hanabishi-ring-knots.ts";
import { defineCrest } from "./util.ts";

export const mitsuWariMusubiHanabishi = defineCrest({
  id: "mitsu-wari-musubi-hanabishi",
  name: { en: "Three-part knotted flower lozenge", ja: "三つ割り結び花菱" },
  reading: "みつわりむすびはなびし",
  romaji: "mitsu wari musubi hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッワリむすび花びし"],
  construction: {
    en: "Three petals face inward from a thin round rim. An open knotted loop joins the rim between each pair of petals.",
    ja: "細い輪から三枚の花弁が内を向きます。花弁の間では空きのある結び目が輪につながります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, first row, fourth column from the right: 三ッワリむすび花びし", ja: "左頁、一段目、右から四列目「三ッワリむすび花びし」" }, read: "2026-11-27", measured: true },
  measured: "The six-unit rim and the open turned knot follow the bottom join in frame 8. The inward petal is measured from the top of the cell, and each repeated unit is turned through an exact third of a turn.",
  build: mitsuWariMusubiHanabishiBuild,
});
