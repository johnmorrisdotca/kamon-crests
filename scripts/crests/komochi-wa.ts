import { C0, R, circle } from "../construct/geo.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const komochiWa = defineCrest({
  id: "komochi-wa",
  name: { en: "Ring with child", ja: "子持ち輪" },
  reading: "こもちわ",
  romaji: "komochi wa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["子持輪"],
  source: cell(15, "left page, row 1, first column from the right: 子持輪", "左頁、一段目、右から一列目「子持輪」"),
  measured: "The radial positions of the four printed contours, at an outer radius of 96, are approximately 96, 74.5, 69.5 and 62. The outer pair bounds the wide band and the inner pair bounds the narrow band.",
  construction: {
    en: "Strike four concentric circles. Fill the broad space between the first two and the narrow space between the third and fourth, leaving white between the bands.",
    ja: "同じ中心から円を四本打ちます。外の二円の間を太い帯に、内の二円の間を細い帯にし、二つの帯の間を白く残します。",
  },
  build(c) {
    c.fill("plain-ring", circle(C0, R).join(circle(C0, 74.5)), "evenodd");
    c.fill("plain-ring", circle(C0, 69.5).join(circle(C0, 62)), "evenodd");
  },
});
