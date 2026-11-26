import { komochiKakuBuild } from "./drawn/kaku-more.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const komochiKaku = defineCrest({
  id: "komochi-kaku",
  name: { en: "Parent and child squares", ja: "子持ち角" },
  reading: "こもちかく",
  romaji: "komochi kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["子持角"],
  source: cell(19, "right page, row 2, third column from the right: 子持角", "右頁、二段目、右から三列目「子持角」"),
  measured: "An outer square on its corner stands about 304 pixels high. Three smaller outlines inside it span about 178, 140 and 114 pixels. The drawing takes their corner radii as 96, 56, 44 and 36, keeping the outer band wide, the inner band narrow and a thin white space between them.",
  construction: {
    en: "Four concentric squares stand on their corners. The space between the outer two makes a broad band. The space between the inner two makes a second, narrower band inside it.",
    ja: "角を上下左右に向けた正方形を、中心をそろえて四つ描きます。外側の二つの間を太い帯にし、内側の二つの間を細い帯にします。",
  },
  build: komochiKakuBuild,
});
