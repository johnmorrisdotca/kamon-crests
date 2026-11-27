import { SHINSEN_MONCHO } from "./books.ts";
import { shihoTsuruHanabishiBuild } from "./drawn/hanabishi-vines.ts";
import { defineCrest } from "./util.ts";

export const shihoTsuruHanabishi = defineCrest({
  id: "shiho-tsuru-hanabishi",
  name: { en: "Four-way vine flower lozenge", ja: "四方蔓花菱" },
  reading: "しほうつるはなびし",
  romaji: "shihō tsuru hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["四方つる花びし"],
  construction: {
    en: "Four equal petals surround a round centre. Each has a broad, slightly pointed middle lobe and two round shoulders. A solid band grows between each pair of petals and forks into two mirrored curls that join the stem along its tangents.",
    ja: "丸い中心のまわりに同じ花びらを四枚置きます。花びらの先は幅広く、中央がわずかにとがり、両肩は丸くふくらみます。花びらの間から一本の帯が伸び、左右同じ形の巻きに分かれます。直線と弧は接線でつなぎます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, fourth row, second column from the right: 四方つる花びし", ja: "左頁、四段目、右から二列目「四方つる花びし」" }, read: "2026-11-27", measured: true },
  measured: "The solid vine band follows the space between the two printed edges. It is 5.8 units wide on the straight, with a two-unit paper gap against each petal. All four petals use one variation of the plain flower lozenge petal, with fuller shoulders and two arcs meeting at a shallow point. The four vine forks are identical turns.",
  build: shihoTsuruHanabishiBuild,
});
