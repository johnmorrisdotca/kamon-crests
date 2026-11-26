import { hanaWachigaiBuild } from "./drawn/wachigai-flowers.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const hanaWachigai = defineCrest({
  id: "hana-wachigai",
  name: { en: "Flower ring", ja: "花輪違い" },
  reading: "はなわちがい",
  romaji: "hana wachigai",
  frame: "none",
  motifs: [{ motif: "linked-rings", count: 1, arrangement: "quartered" }, { motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  source: cell(14, "left page, row 1, fourth column from the right: 花わちがひ", "左頁、一段目、右から四列目「花わちがひ」"),
  measured: "Four lens-shaped panels meet at the upright and level tips of a circle. The open shape between them curves inwards. Within it is a four-petalled flower about 150 pixels across, a little under half the outside diameter. Its small round heart and four spokes are on the axes.",
  construction: {
    en: "Four compass lenses fill the circle and leave a curved diamond between them. A four-petalled flower sits in the opening, with a short white stamen in each petal and a small round heart.",
    ja: "円の中に弧で囲んだ形を四つ置き、間に曲線の菱形の白を残します。その中に花びらを四枚置き、それぞれに短い白いしべを入れ、小さな丸を中心に置きます。",
  },
  build: hanaWachigaiBuild,
});
