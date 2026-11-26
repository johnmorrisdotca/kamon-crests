import { mitsuTsuruMakuwaBuild } from "./drawn/mitsu-tsuru-makuwa.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuTsuruMakuwa = defineCrest({
  id: "mitsu-tsuru-makuwa",
  name: { en: "Three vining makuwa melons", ja: "三つ蔓真桑" },
  reading: "みつつるまくわ",
  romaji: "mitsu tsuru makuwa",
  frame: "none",
  motifs: [{ motif: "makuwa-melon", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッつるまくワ"],
  source: cell(28, "right page, row 3, fourth column from the right: 三ッつるまくワ", "右頁、三段目、右から四列目「三ッつるまくワ」"),
  measured: "Three tapering melon fruits radiate from a small round hub. Four narrow curved divisions run along each fruit, and a short seam closes its broad end. Between the fruits, each long stem ends in two opposing curls.",
  construction: {
    en: "Strike arcs for three fruits and leave four curved stripes on each one. Rule a stem between each pair and give it two curled ends. Leave a small white opening at the hub.",
    ja: "三つの実を弧で作り、それぞれ四本の曲がった筋を白く残します。実の間に蔓を引いて先を二つに巻き、中央の小さな円を白く残します。",
  },
  build: mitsuTsuruMakuwaBuild,
});
