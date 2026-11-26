import { mitsuTachiTessenBuild, yaeTessenBuild } from "./drawn/tessen.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const yaeTessen = defineCrest({
  id: "yae-tessen",
  name: { en: "Double clematis", ja: "八重鉄線" },
  reading: "やえてっせん",
  romaji: "yae tessen",
  frame: "none",
  motifs: [{ motif: "clematis", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八重てつせん"],
  construction: { en: "A row of smaller petals shows between the six main veined petals.", ja: "筋のある六つの大きな花びらの間から、一列の小さな花びらが見えます。" },
  measured: "The rear row turns half a sector so its tips alternate with the front six.",
  source: { ...SHINSEN_MONCHO, frame: 34, place: { en: "left page, third row, third column from the right: 八重てつせん", ja: "左頁、三段目、右から三列目「八重てつせん」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeTessenBuild(c);
  },
});

export const mitsuTachiTessen = defineCrest({
  id: "mitsu-tachi-tessen",
  name: { en: "Three upright clematis", ja: "三つ立ち鉄線" },
  reading: "みつたちてっせん",
  romaji: "mitsu tachi tessen",
  frame: "none",
  motifs: [{ motif: "clematis", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッたちてつせん"],
  construction: {
    en: "Three pointed blades with ruled white veins alternate with three rounded, three-lobed petals. The six stems gather around a small round heart.",
    ja: "白い直線の筋を持つ三枚のとがった葉と、先が三つに丸く分かれた三枚の花弁を交互に置きます。六つの根元を小さな丸い中心の周りに集めます。",
  },
  measured: "The spacing and ratios follow the printed alternation of pointed blades and rounded petals. Three exact turns regularise the outline, and a fine white clearance separates the centre from the six roots.",
  source: { ...SHINSEN_MONCHO, frame: 34, place: { en: "left page, first row, fourth column from the right: 三ッたちてつせん", ja: "左頁、一段目、右から四列目「三ッたちてつせん」" }, read: "2026-11-26", measured: true },
  build: mitsuTachiTessenBuild,
});
