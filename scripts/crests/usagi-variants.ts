import { mitsuUsagiBuild } from "./drawn/usagi-variants.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuUsagi = defineCrest({
  id: "mitsu-usagi",
  name: { en: "Three rabbits", ja: "三つ兎" },
  reading: "みつうさぎ",
  romaji: "mitsu usagi",
  frame: "none",
  motifs: [{ motif: "rabbit", count: 3, arrangement: "stacked" }],
  families: [],
  aliases: ["三つうさぎ", "三ッうさぎ"],
  source: cell(25, "left page, row 3, first column from the right: 三ッうさぎ", "左頁、三段目、右から一列目「三ッうさぎ」"),
  measured: "The three rabbits cover almost 300 pixels from the first forehead to the last rump. Their rounded backs repeat about 65 pixels to the right and slightly higher at each place. Each head has two swept ears. The front body shows the full nose and belly, and the two behind it show only the visible arcs.",
  construction: {
    en: "The three rabbits look left. Compass arcs describe each rounded back, nose and pair of swept ears. One rabbit stands in front of the next in a gently rising row, with a narrow white line along each overlap.",
    ja: "三羽の兎が左を向きます。丸い背と鼻、後ろへ流れる二本の耳を弧で描きます。少しずつ高くしながら手前から順に重ね、重なりには細い白い線を残します。",
  },
  build: mitsuUsagiBuild,
});
