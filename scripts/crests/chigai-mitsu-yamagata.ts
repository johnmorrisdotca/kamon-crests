import { chigaiMitsuYamagataBuild } from "./drawn/chigai-mitsu-yamagata.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const chigaiMitsuYamagata = defineCrest({
  id: "chigai-mitsu-yamagata",
  name: { en: "Crossed three mountain forms", ja: "違い三つ山形" },
  reading: "ちがいみつやまがた",
  romaji: "chigai mitsu yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 3, arrangement: "crossed" }],
  families: [],
  aliases: ["ちがひ三ッ山がた"],
  source: cell(28, "left page, row 2, third column from the right: ちがひ三ッ山がた", "左頁、二段目、右から三列目「ちがひ三ッ山がた」"),
  measured: "Two upright angular mountain bands stand beside one another. The third band points down and crosses both, with its ends above their crossings. The narrow gaps show one band passing over and under the others.",
  construction: {
    en: "Rule the two upward bands and one downward band. At every crossing keep a thin gap parallel to the edge of the band that passes over it.",
    ja: "上向きの帯を二つと下向きの帯を一つ引きます。交差する所では、上になる帯の辺に沿って細い白いすき間を残します。",
  },
  build: chigaiMitsuYamagataBuild,
});
