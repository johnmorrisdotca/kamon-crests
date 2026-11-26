import { awaNoMaruBuild } from "./drawn/awa-sprays.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const awaNoMaru = defineCrest({
  id: "awa-no-maru",
  name: { en: "Millet circle", ja: "粟の丸" },
  reading: "あわのまる",
  romaji: "awa no maru",
  frame: "none",
  motifs: [{ motif: "millet", count: 2, arrangement: "ring" }],
  families: [],
  aliases: ["あわの丸"],
  source: cell(35, "right page, row 4, second column from the right: あわの丸", "右頁、四段目、右から二列目「あわの丸」"),
  measured: "Two grain heads sit on curving stems. The larger lies nearly horizontal at the top. Long pointed leaves turn around the upper stem and leave a clear open field on the right. The outside sweep is open beside that field.",
  construction: {
    en: "Curve long stems and leaves around an open circle. Place a nearly level seed head above the smaller upright head. Leave a clear space between the leaf tips on the right.",
    ja: "開いた円に沿って長い茎と葉を曲げます。小さく立った穂の上に横向きの穂を置き、右側の葉先の間を白く残します。",
  },
  build: awaNoMaruBuild,
});
