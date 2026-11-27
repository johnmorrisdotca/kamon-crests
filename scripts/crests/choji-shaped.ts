import { RING_GAP } from "../construct/builder.ts";
import { chigaiChojiBuild, chojiBishiBuild } from "./drawn/choji-shaped.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const chojiBishi = defineCrest({
  id: "choji-bishi",
  name: { en: "Clove lozenge", ja: "丁子菱" },
  reading: "ちょうじびし",
  romaji: "chōji bishi",
  frame: "none",
  motifs: [{ motif: "clove", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["丁子ひし"],
  construction: { en: "Eight cloves surround a round joint. The side buds extend farther, forming a lozenge.", ja: "八つの丁子を丸い節のまわりに置きます。左右を長くして菱形にします。" },
  measured: "Four longer buds mark the principal ends. Four shorter diagonal buds fill the corners between them.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, third row, second column from the right: 丁子ひし", ja: "左頁、三段目、右から二列目「丁子ひし」" }, read: "2026-11-26", measured: true },
  build(c) {
    chojiBishiBuild(c);
  },
});

export const maruNiChigaiChoji = defineCrest({
  id: "maru-ni-chigai-choji",
  name: { en: "Crossed cloves in a ring", ja: "丸に違い丁子" },
  reading: "まるにちがいちょうじ",
  romaji: "maru ni chigai chōji",
  frame: "ring-medium",
  motifs: [{ motif: "clove", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["丸ニちがひ丁子"],
  construction: { en: "A ring surrounds two cloves with crossing feet. The white seam keeps the lower crossing and the gap between the two heads visible.", ja: "根元で交差する丁子二つを輪で囲みます。白いすき間で下の交差と二つの頭の間を見せます。" },
  measured: "The labelled cell gives the ring and the spacing of the clove pair. The crossed motif is reused at the matching scale, with an equal clearance around the circular boundary.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, fourth row, first column from the right: 丸ニちがひ丁子", ja: "右頁、四段目、右から一列目「丸ニちがひ丁子」" }, read: "2026-11-27", measured: true },
  build(c) {
    const room = c.ring("ring-medium");
    chigaiChojiBuild(c, (room - RING_GAP) / 100);
  },
});
