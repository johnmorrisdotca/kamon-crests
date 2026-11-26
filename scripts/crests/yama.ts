import { itsutsuYamaBuild, mitsuYamaBuild } from "./drawn/yama.ts";
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

export const itsutsuYama = defineCrest({
  id: "itsutsu-yama",
  name: { en: "Five mountains", ja: "五つ山" },
  reading: "いつつやま",
  romaji: "itsutsu yama",
  frame: "none",
  motifs: [{ motif: "mountain", count: 5, arrangement: "radial" }],
  families: [],
  source: cell(29, "right page, row 4, first column from the right: 五ッ山", "右頁、四段目、右から一列目「五ッ山」"),
  measured: "Five facets run from a circle about 292 pixels wide to a small opening about 45 across. The sides of the opening are curved. The upper facet stands a little to the right. The drawing sets five equal facets at fifths of a turn and gives each divider the same width.",
  construction: {
    en: "Five equal facets fill the circle. Narrow ruled seams lead towards a five-sided opening. The five inner edges are compass arcs, and the upper facet turns slightly towards the right.",
    ja: "同じ大きさの山を五つ円に収めます。細い直線のすき間が五辺の白へ伸びます。白に面する五辺はコンパスの弧で描き、上の山をわずかに右へ振ります。",
  },
  build: itsutsuYamaBuild,
});
