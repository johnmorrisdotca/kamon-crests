import { nejiYotsumeBuild } from "./drawn/meyui-sets.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const nejiYotsume = defineCrest({
  id: "neji-yotsume",
  name: { en: "Twisted four eyes", ja: "捻じ四つ目" },
  reading: "ねじよつめ",
  romaji: "neji yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "crossed" }],
  families: [],
  aliases: ["捻ぢ四ッ目"],
  source: cell(20, "right page, row 2, first column from the right: 捻ぢ四ッ目", "右頁、二段目、右から一列目「捻ぢ四ッ目」"),
  measured: "Four squares on point overlap at their inner corners. Each has a small square opening. The next square crosses the opening's inner edge, leaving its outer part visible. The crossing order repeats around the centre.",
  construction: {
    en: "Place four square eyes on their corners, turning a quarter of a turn between them. Each square covers one corner of the eye beside it. The ruled outlines leave a small open notch at each crossing.",
    ja: "角を上下左右に向けた目を四つ置き、四分の一回転ずつ回します。一つの目が隣の目の角に重なります。交差するところには、直線で囲んだ小さなくぼみを残します。",
  },
  build: nejiYotsumeBuild,
});
