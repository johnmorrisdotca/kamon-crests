import { SHINSEN_MONCHO } from "./books.ts";
import { gakuNiNihachiBuild, sonobeGakuBuild } from "./drawn/gaku.ts";
import { defineCrest } from "./util.ts";

export const sonobeGaku = defineCrest({
  id: "sonobe-gaku",
  name: { en: "Sonobe plaque", ja: "園部額" },
  reading: "そのべがく",
  romaji: "sonobe gaku",
  frame: "ring-medium",
  motifs: [{ motif: "framed-plaque", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["そのべがく"],
  construction: {
    en: "A plaque in a ring. Tangent compass arcs form the shallow waves around the outside. Four white seams mark the mitred corners. Three nested rectangles set out the inner band and the empty centre.",
    ja: "輪の中に額を収めます。外縁の浅い波を、接するコンパスの弧でつなぎます。四隅の継ぎ目には白いすき間を入れます。三つの長方形を重ね、内側の帯と中央の空きを作ります。",
  },
  measured: "The cell's ring is about 306 pixels across and the plaque about 162 by 236. Inside it are three rectangular outlines about 96 by 172, 76 by 153, and 57 by 130 pixels. The redrawing regularises the paired rolls using radii 12 and 16. The rectangles are 54 by 98, 44 by 88 and 32 by 76, reduced with the plaque to leave a white gap inside the package's medium ring. The diagonal lines in the book become narrow cuts that stop just inside the edges of the bevels.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 19,
    place: { en: "right page, second row, second column from the right: そのべがく", ja: "右頁、二段目、右から二列目「そのべがく」" },
    read: "2026-11-26",
    measured: true,
  },
  build: sonobeGakuBuild,
});

export const gakuNiNihachi = defineCrest({
  id: "gaku-ni-nihachi",
  name: { en: "Plaque with the characters two and eight", ja: "額に二八" },
  reading: "がくににはち",
  romaji: "gaku ni nihachi",
  frame: "none",
  motifs: [{ motif: "framed-plaque", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["がくニ二八", "額に二八文字"],
  construction: {
    en: "A plaque with rounded corners, paired curls and an inset rectangular band. Two ascending brush strokes form 二. Below, a tapered diagonal and a longer curved stroke form 八. The strokes use ruled edges and compass arcs.",
    ja: "丸い角と対になった渦を持つ額に、長方形の帯をはめ込みます。右上がりの二画で「二」を作ります。その下には、先を細くした斜めの一画と、長く曲がる一画で「八」を作ります。筆画の縁には定規の直線とコンパスの弧を使います。",
  },
  measured: "The plaque in the cell is about 215 pixels across and 306 high. Its inner opening is about 120 by 230 pixels. The layout takes 108 by 158 for the outside and 62 by 118 for the opening. The corners use radius 10 and the curls are paired at the printed heights, mirrored to match on opposing edges. The numeral strokes keep the print's rise, tapered left foot and broader right foot. The printed がくニ supplies the first part of the reading, and the Nihon Kokugo Daijiten reads 二八 as にはち.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 19,
    place: { en: "right page, first row, second column from the right: がくニ二八", ja: "右頁、一段目、右から二列目「がくニ二八」" },
    read: "2026-11-26",
    measured: true,
  },
  build: gakuNiNihachiBuild,
});
