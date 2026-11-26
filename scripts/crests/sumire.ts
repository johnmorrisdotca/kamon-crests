import { dakiSumireBuild } from "./drawn/sumire.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const dakiSumire = defineCrest({
  id: "daki-sumire",
  name: { en: "Embracing violets", ja: "抱き菫" },
  reading: "だきすみれ",
  romaji: "daki sumire",
  frame: "none",
  motifs: [{ motif: "violet", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["だき菫"],
  source: cell(45, "left page, row 4, second column from the right: だき菫, with すみれ as the side reading", "左頁、四段目、右から二列目「だき菫」（「すみれ」の振り仮名）"),
  measured: "Two violets lean into a near-circle. The upper tips meet over the paired flowers. Two broad, sweeping leaves frame two upright narrow leaves, and the stems cross at the foot.",
  construction: {
    en: "Make two opposed violet flowers and meet their upper curls at the centre. Draw a white vein inside each long leaf and leave a gap where the lower stems cross.",
    ja: "菫を二輪向かい合わせ、上に伸びる先を中心で合わせます。長い葉に白い葉脈を引き、下の茎が交差する所に白いすき間を残します。",
  },
  build: dakiSumireBuild,
});
