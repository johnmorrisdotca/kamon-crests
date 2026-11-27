import { SHINSEN_MONCHO } from "./books.ts";
import { dakiNantenBuild } from "./drawn/daki-nanten.ts";
import { mitsuNantenBuild } from "./drawn/nanten.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuNanten = defineCrest({
  id: "mitsu-nanten",
  name: { en: "Three nandina", ja: "三つ南天" },
  reading: "みつなんてん",
  romaji: "mitsu nanten",
  frame: "none",
  motifs: [{ motif: "nanten", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッなんてん"],
  source: cell(23, "left page, row 2, third column from the right: 三ッなんてん", "左頁、二段目、右から三列目「三ッなんてん」"),
  measured: "Three narrow veined leaves alternate with compact berry clusters. All six point away from a small round centre.",
  construction: {
    en: "Strike three narrow leaves around a round heart. Rule a white vein through each leaf and place one compact cluster of berries in each gap.",
    ja: "丸い中心のまわりに細い葉を三枚置きます。各葉に白い葉脈を引き、すき間に実の房を一つずつ入れます。",
  },
  build: mitsuNantenBuild,
});

export const dakiNanten = defineCrest({
  id: "daki-nanten",
  name: { en: "Embracing nandina", ja: "抱き南天" },
  reading: "だきなんてん",
  romaji: "daki nanten",
  frame: "none",
  motifs: [{ motif: "nanten", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["だき南天"],
  construction: {
    en: "Two tapering nandina branches cross below matching bunches of overlapping solid berries, with one short highlight in each berry.",
    ja: "先細りの南天の枝を下で交差させ、その上に黒い実を重ねた同じ形の房を二つ置きます。各実には短い白い弧を一本入れます。",
  },
  measured: "The crossed branches, leaf poses and thirteen berry positions on each branch were measured from the 1892 cell. The layers that separate berries and stems use one physical paper width.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, first row, first column from the right: だき南天", ja: "右頁、一段目、右から一列目「だき南天」" }, read: "2026-11-27", measured: true },
  placementBuild: { module: new URL("./drawn/daki-nanten.ts", import.meta.url), export: "dakiNantenBuild" },
  build: dakiNantenBuild,
});
