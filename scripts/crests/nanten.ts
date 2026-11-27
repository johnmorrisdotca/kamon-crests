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
    ja: "丸い中心の周りに細い葉を三枚置きます。各葉に白い葉脈を引き、すき間に実の房を一つずつ入れます。",
  },
  build: mitsuNantenBuild,
});
