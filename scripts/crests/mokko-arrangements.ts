import { tsuruMokkoBuild } from "./drawn/mokko-arrangements.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const tsuruMokko = defineCrest({
  id: "tsuru-mokko",
  name: { en: "Quince blossom with vines", ja: "蔓木瓜" },
  reading: "つるもっこう",
  romaji: "tsuru mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 4, arrangement: "crossed" }, { motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["つる木瓜"],
  source: cell(44, "left page, row 2, third column from the right: つる木瓜", "左頁、二段目、右から三列目「つる木瓜」"),
  measured: "The ordinary four-lobed arrangement has two vines crossing diagonally through the middle. Each vine runs into the space between the lobes and splits into a pair of recurved ends.",
  construction: {
    en: "Around a four-petalled flower, the four quince lobes carry their curved bands. Straight vine stems run diagonally out from the heart, with pairs of small curls at their tips.",
    ja: "四枚の花びらを持つ花のまわりに、内側に曲がった帯を持つ四つの裂片を置きます。中央から斜めに直線の蔓を伸ばし、それぞれの先を二つに巻きます。",
  },
  build: tsuruMokkoBuild,
});
