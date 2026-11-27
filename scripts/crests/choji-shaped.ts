import { chojiBishiBuild, chojiTsuruBishiBuild } from "./drawn/choji-shaped.ts";
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

export const chojiTsuruBishi = defineCrest({
  id: "choji-tsuru-bishi",
  name: { en: "Clove and vine lozenge", ja: "丁子蔓菱" },
  reading: "ちょうじつるびし",
  romaji: "chōji tsuru bishi",
  frame: "none",
  motifs: [{ motif: "clove", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["丁子つるびし"],
  construction: { en: "Two outward-facing cloves lie between bowed vine pairs. The vines taper to the side points of the lozenge, leaving a pointed white opening in each.", ja: "外向きの丁子二つを、曲がった蔓の組の間に置きます。蔓は菱の左右の先で細くなり、一本ずつ先のとがった白いすき間を残します。" },
  measured: "The two buds, pointed horizontal ends and curved openings are placed from the cell. A half turn makes the two halves equal.",
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "left page, first row, second column from the right: 丁子つるびし", ja: "左頁、一段目、右から二列目「丁子つるびし」" }, read: "2026-11-27", measured: true },
  build: chojiTsuruBishiBuild,
});
