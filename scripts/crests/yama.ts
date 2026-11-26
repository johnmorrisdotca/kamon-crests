import { mitsuYamaBuild } from "./drawn/yama.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuYama = defineCrest({
  id: "mitsu-yama",
  name: { en: "Three mountains", ja: "三つ山" },
  reading: "みつやま",
  romaji: "mitsu yama",
  frame: "none",
  motifs: [{ motif: "mountain", count: 3, arrangement: "radial" }],
  families: [],
  source: cell(29, "right page, row 3, first column from the right: 三ッ山", "右頁、三段目、右から一列目「三ッ山」"),
  measured: "Three broad facets fill a circle about 288 pixels across. The straight runs meet a small triangular opening with curved sides. The point at the foot of this opening is about 17 pixels below its upper edge. The drawing spaces the three parts in exact thirds with one standing at the top.",
  construction: {
    en: "Three equal facets fill a circle around a small triangular opening. Each facet has an outer compass arc and two ruled sides. A smaller arc makes one side of the opening.",
    ja: "小さな三角の白を囲んで、同じ大きさの山を三つ円に収めます。各山の外はコンパスの弧、両脇は直線で描き、白に面する辺にも小さな弧を使います。",
  },
  build: mitsuYamaBuild,
});
