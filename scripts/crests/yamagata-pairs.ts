import { hanaYamagataBuild } from "./drawn/yamagata-pairs.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const hanaYamagata = defineCrest({
  id: "hana-yamagata",
  name: { en: "Flower mountain form", ja: "花山形" },
  reading: "はなやまがた",
  romaji: "hana yamagata",
  frame: "none",
  motifs: [{ motif: "mountain", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["花山がた"],
  source: cell(28, "left page, row 2, fourth column from the right: 花山がた", "左頁、二段目、右から四列目「花山がた」"),
  measured: "Two blunt pointed arches share the same footing, about half an arch apart. Each side bulges again below the upper shoulder. The left arch crosses in front of the right, which is visible in the open spaces.",
  construction: {
    en: "Build a broad band from arcs that rise to a blunt peak, widen at the shoulders and end on one level. Repeat it to the right and leave a fine white seam where the bands cross.",
    ja: "丸みを帯びた頂とふくらんだ肩を円弧でつなぎ、両端を同じ高さに置いて幅広い帯を作ります。もう一つを右に置き、重なる所に細い白いすき間を残します。",
  },
  build: hanaYamagataBuild,
});
