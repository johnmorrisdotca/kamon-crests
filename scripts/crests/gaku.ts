import { SHINSEN_MONCHO } from "./books.ts";
import { sonobeGakuBuild } from "./drawn/gaku.ts";
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
