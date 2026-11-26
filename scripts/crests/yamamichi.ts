import { maruNiYamamichiBuild } from "./drawn/yamamichi.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const maruNiYamamichi = defineCrest({
  id: "maru-ni-yamamichi",
  name: { en: "Mountain path in a circle", ja: "丸に山道" },
  reading: "まるにやまみち",
  romaji: "maru ni yamamichi",
  frame: "ring-medium",
  motifs: [{ motif: "mountain-path", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸に山みち"],
  source: cell(29, "right page, row 2, first column from the right: 丸に山みち", "右頁、二段目、右から一列目「丸に山みち」"),
  measured: "Across the inside of a broad ring lie two dark runs separated by a narrow opening. The upper run is wider. Both rise in three shallow shoulders with a slightly higher middle, and both meet the ring.",
  construction: {
    en: "Inside a round band, set a broad path with three low rises and a slim bearing line below it. Shallow compass arcs make the low rises and the dips through them. Both runs touch the round band at their ends.",
    ja: "丸い帯の内側に、低い起伏が三つある太い道と、その下に細い帯を置きます。なだらかな山と谷をコンパスの弧で作り、両端を丸い帯につなぎます。",
  },
  build: maruNiYamamichiBuild,
});
