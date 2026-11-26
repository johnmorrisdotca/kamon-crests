import { tsuruSuzumeBuild } from "./drawn/suzume-more.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const tsuruSuzume = defineCrest({
  id: "tsuru-suzume",
  name: { en: "Vine sparrow", ja: "蔓雀" },
  reading: "つるすずめ",
  romaji: "tsuru suzume",
  frame: "none",
  motifs: [{ motif: "sparrow", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["つるすゞめ"],
  source: cell(45, "left page, row 4, third column from the right: つるすゞめ", "左頁、四段目、右から三列目「つるすゞめ」"),
  measured: "A single open band makes three rounded lobes. The upper lobe forms a broad dome. Two low, almost circular lobes curl towards one another and end beside the upright axis. The whole shape is about 310 pixels across and about 264 high.",
  construction: {
    en: "Three compass arcs make a single curled band. One broad lobe rises above two round lower lobes. The lower ends curve up beside the middle and finish in two rounded tips.",
    ja: "コンパスの弧三本をつないで、巻いた帯を一つ作ります。二つの丸いふくらみの上に、幅の広いふくらみを置きます。下の両端を中央のそばで上へ曲げ、先を丸くします。",
  },
  build: tsuruSuzumeBuild,
});
