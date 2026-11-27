import { yotsuKanFukuraSuzumeBuild } from "./drawn/suzume-kan.ts";
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

export const yotsuKanFukuraSuzume = defineCrest({
  id: "yotsu-kan-fukura-suzume",
  name: { en: "Puffed sparrow in four curled bands", ja: "四つ環ふくら雀" },
  reading: "よつかんふくらすずめ",
  romaji: "yotsu kan fukura suzume",
  frame: "none",
  motifs: [{ motif: "sparrow", count: 1, arrangement: "single" }, { motif: "curled-band", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["四ッくワんふくらすゞめ"],
  source: cell(27, "left page, row 2, third column from the right: 四ッくワんふくらすゞめ", "左頁、二段目、右から三列目「四ッくワんふくらすゞめ」"),
  measured: "The front-facing sparrow has an upright pointed head, a round belly and separate wing and tail feathers. Four open bands surround it. The bands are wider across the top and bottom than at the sides, and their hooked ends point towards the bird.",
  construction: {
    en: "Fill the round sparrow and leave fine white lines between its feathers. Join compass arcs to make four solid curled bands, with shallower bands above and below and deeper bands at the sides.",
    ja: "丸い雀を塗り、羽の間に細い白線を残します。円弧をつないで四つの環を塗ります。上下の環を浅く、左右の環を深くします。",
  },
  build: yotsuKanFukuraSuzumeBuild,
});
