import { SHINSEN_MONCHO } from "./books.ts";
import { mitsuWariHanabishiBuild } from "./drawn/hanabishi-panels.ts";
import { defineCrest } from "./util.ts";

export const mitsuWariHanabishi = defineCrest({
  id: "mitsu-wari-hanabishi",
  name: { en: "Three-part flower lozenge", ja: "三つ割り花菱" },
  reading: "みつわりはなびし",
  romaji: "mitsu wari hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッ割花びし"],
  construction: {
    en: "Three broad petals grow inward from a thin circular edge. Each has two scalloped shoulders, and the three groups leave a branched opening at the centre.",
    ja: "細い丸い縁から広い花弁を三枚、内向きに置きます。花弁の両側には丸い張り出しがあり、中央には三方に分かれる空きが残ります。",
  },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, second row, first column from the right: 三ッ割花びし", ja: "右頁、二段目、右から一列目「三ッ割花びし」" }, read: "2026-11-27", measured: true },
  measured: "The 94-unit rim, broad shoulders and scallops are measured from the upper panel in frame 9. The straight veins and the divisions between lobes are regularised, and the three panels are spaced evenly around the rim.",
  build: mitsuWariHanabishiBuild,
});
