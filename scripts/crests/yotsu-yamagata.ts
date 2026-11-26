import { yotsuYamagataBuild } from "./drawn/yotsu-yamagata.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const yotsuYamagata = defineCrest({
  id: "yotsu-yamagata",
  name: { en: "Four mountain forms", ja: "四つ山形" },
  reading: "よつやまがた",
  romaji: "yotsu yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["四ッ山形"],
  source: cell(28, "left page, row 4, third column from the right: 四ッ山形", "左頁、四段目、右から三列目「四ッ山形」"),
  measured: "Four wide chevrons stand on the points of a low lozenge. White seams interrupt the long sides at their midpoints. The neighboring cell, row 4 column 2 from the right, also reads 四ッ山がた but shows an interwoven form. This drawing follows the four separate bands of row 4 column 3.",
  construction: {
    en: "Rule two nested lozenges with equal band thickness. Mark a narrow gap halfway along each side to leave four solid chevrons, all pointing outward.",
    ja: "等しい太さの帯になるよう、菱形を二つ引きます。各辺の中央に細い白いすき間を置き、外を向く四つの山形に分けます。",
  },
  build: yotsuYamagataBuild,
});
