import { SHINSEN_MONCHO } from "./books.ts";
import { edaNantenBuild } from "./drawn/eda-nanten.ts";
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

export const edaNanten = defineCrest({
  id: "eda-nanten",
  name: { en: "Nandina spray", ja: "枝南天" },
  reading: "えだなんてん",
  romaji: "eda nanten",
  frame: "none",
  motifs: [{ motif: "nanten", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["枝なんてん"],
  source: {
    ...SHINSEN_MONCHO,
    frame: 23,
    place: {
      en: "left page, fourth row, fourth column from the right: 枝なんてん",
      ja: "左頁、四段目、右から四列目「枝なんてん」",
    },
    read: "2026-11-27",
    measured: true,
  },
  measured: "The trunk stations, side stems, nine leaf placements and three berry clusters are measured from frame 23. Each berry has the same open centre.",
  construction: {
    en: "Join tangent arcs for the main stem and add the side branches. Place nine veined leaves and repeat one open berry in three clusters.",
    ja: "なめらかに曲がる幹から枝を出し、葉脈の入った葉を九枚置きます。丸い空きのある実を五十一粒、三つの房にまとめます。",
  },
  placementBuild: { module: new URL("./drawn/eda-nanten.ts", import.meta.url), export: "edaNantenBuild" },
  build: edaNantenBuild,
});
