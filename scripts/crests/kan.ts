import { mitsuKanBuild } from "./drawn/kan.ts";
import { cell } from "./kaku-meyui.ts";
import { defineCrest } from "./util.ts";

export const mitsuKan = defineCrest({
  id: "mitsu-kan",
  name: { en: "Three curled bands", ja: "三つ環" },
  reading: "みつかん",
  romaji: "mitsu kan",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッくワん"],
  source: cell(27, "left page, row 2, first column from the right: 三ッくワん", "左頁、二段目、右から一列目「三ッくワん」"),
  measured: "Three curved bands sit around a small triangular space. The upper band spans about 165 pixels, and its broad rounded ends curl inward. The open ends face away from the centre. The drawing gives the three bands equal angles and keeps a narrow gap between them.",
  construction: {
    en: "Three open compass bands stand one third of a turn apart. The opening in each band turns outwards from the middle of the crest. Its two ends widen into rounded curls.",
    ja: "コンパスで描いた開いた帯を、三分の一回転ずつ回して三つ置きます。どの帯も開いた方を外へ向け、両端を丸く太くして内へ巻きます。",
  },
  build: mitsuKanBuild,
});
