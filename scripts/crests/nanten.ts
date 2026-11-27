import { SHINSEN_MONCHO } from "./books.ts";
import { edaMaruNantenBuild } from "./drawn/eda-maru-nanten.ts";
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

export const edaMaruNanten = defineCrest({
  id: "eda-maru-nanten",
  name: { en: "Nandina branch in a ring", ja: "枝丸南天" },
  reading: "えだまるなんてん",
  romaji: "edamaru nanten",
  frame: "ring-thin",
  motifs: [{ motif: "nanten", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["枝丸南天"],
  construction: {
    en: "A round frame joins the tapering branches of a nandina spray. Lens leaves and four connected berry bunches share one white-line width.",
    ja: "輪に沿って先細りの南天の枝をつなげます。レンズ形の葉と、茎につながった四つの実の房を同じ幅の白い線で描きます。",
  },
  measured: "The ring joins, leaf poses and thirty-five berries in four bunches were measured from the 1892 cell.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "right page, second row, first column from the right: 枝丸南天", ja: "右頁、二段目、右から一列目「枝丸南天」" }, read: "2026-11-27", measured: true },
  placementBuild: { module: new URL("./drawn/eda-maru-nanten.ts", import.meta.url), export: "edaMaruNantenBuild" },
  build: edaMaruNantenBuild,
});
