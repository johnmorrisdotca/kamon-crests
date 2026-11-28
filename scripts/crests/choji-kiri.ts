import { SHINSEN_MONCHO } from "./books.ts";
import { futowaNiChojiGiriBuild } from "./drawn/choji-kiri.ts";
import { defineCrest } from "./util.ts";

export const futowaNiChojiGiri = defineCrest({
  id: "futowa-ni-choji-giri",
  name: { en: "Clove paulownia in a thick ring", ja: "太輪に丁子桐" },
  reading: "ふとわにちょうじぎり",
  romaji: "futowa ni chōji giri",
  frame: "ring-thick",
  motifs: [{ motif: "clove", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["太ワニ丁子きり", "丁子切り"],
  construction: { en: "Three clove buds stand side by side like the leaves of a paulownia inside a broad ring, the pointed middle bud in front. Each bud has a white opening, and a five-pointed star flower sits above each.", ja: "太い輪の中に、丁子のつぼみを桐の葉のように三つ並べ、先のとがった中央のつぼみを手前に置きます。それぞれのつぼみに白い抜きを入れ、上に五つの角の星形の花を一つずつのせます。" },
  measured: "The two circles of the ring, the three buds and their openings, and the place and size of the three stars are measured from the cell. The ring is the cell's, 0.18 of the diameter. The cell's inner circle sits about 3 units low; ours is centred. The stars are regular, and the left half mirrors the right.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, second row, first column from the right: 太ワニ丁子きり", ja: "左頁、二段目、右から一列目「太ワニ丁子きり」" }, read: "2026-11-28", measured: true },
  build: futowaNiChojiGiriBuild,
});
