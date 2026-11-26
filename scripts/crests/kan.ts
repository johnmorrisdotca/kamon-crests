import { itsutsuKanBuild, mitsuKanBuild } from "./drawn/kan.ts";
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
    ja: "コンパスで描いた開いた帯を、3分の1回転ずつ回して三つ置きます。どの帯も開いた方を外へ向け、両端を丸く太くして内へ巻きます。",
  },
  build: mitsuKanBuild,
});

export const itsutsuKan = defineCrest({
  id: "itsutsu-kan",
  name: { en: "Five curled bands", ja: "五つ環" },
  reading: "いつつかん",
  romaji: "itsutsu kan",
  frame: "none",
  motifs: [{ motif: "curled-band", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["五ッくワん"],
  source: cell(27, "left page, row 4, first column from the right: 五ッくワん", "左頁、四段目、右から一列目「五ッくワん」"),
  measured: "Five curved bands make an almost circular outline. Each opens towards the large white middle and ends in two rounded hooks. The top band has a span of about 113 pixels and the whole crest about 286. The drawing places the five bends at equal fifths of a turn.",
  construction: {
    en: "Five compass bands crown the outline. Their openings face a common white centre. A pair of rounded curls turns inwards at either end of each band.",
    ja: "コンパスで五つの帯を描いて外形を作ります。開いた方を共通の白い中心へ向け、各帯の両端を丸く巻き込みます。",
  },
  build: itsutsuKanBuild,
});
