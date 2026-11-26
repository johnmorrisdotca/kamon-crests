import { itowaNiYotsuKakuChigaiBuild } from "./drawn/kaku-woven.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const itowaNiYotsuKakuChigai = defineCrest({
  id: "itowa-ni-yotsu-kaku-chigai",
  name: { en: "Four crossed squares in a thread ring", ja: "糸輪に四つ角違い" },
  reading: "いとわによつかくちがい",
  romaji: "itowa ni yotsu kaku chigai",
  frame: "ring-thread",
  motifs: [{ motif: "square-frame", count: 4, arrangement: "crossed" }],
  families: [],
  aliases: ["糸ワニ四ッ角違"],
  source: cell(16, "right page, row 2, second column from the right: 糸ワニ四ッ角違", "右頁、二段目、右から二列目「糸ワニ四ッ角違」"),
  measured: "Four corner frames stand in two rows of two in their own grid. A smaller square band meets each corner frame twice, crossing over and under in turn. The whole grid turns half a right angle inside a thread ring.",
  construction: {
    en: "Rule four equal corner frames on one square grid. A central square band passes alternately over and under each corner frame. Turn the grid onto a corner inside a thread ring.",
    ja: "同じ大きさの四角い枠を、二つずつ二段に並べます。中央の四角い帯が、外側の枠と交差するたびに上下を交代します。並べた枠を隅立てにし、糸輪で囲みます。",
  },
  build: itowaNiYotsuKakuChigaiBuild,
});
