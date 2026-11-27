import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiOniHanabishiBuild, uraHanabishiBuild } from "./drawn/hanabishi-detail.ts";
import { defineCrest } from "./util.ts";

export const maruNiOniHanabishi = defineCrest({
  id: "maru-ni-oni-hanabishi",
  name: { en: "Rough flower lozenge in a circle", ja: "丸に鬼花菱" },
  reading: "まるにおにはなびし",
  romaji: "maru ni oni hanabishi",
  frame: "ring-medium",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸ニ鬼花びし"],
  construction: { en: "Four angular petals and their pointed white cuts sit around a round heart inside the enclosing ring.", ja: "輪の内側に四枚の角のある花びらを置き、しべを白く抜いて、丸い花心を囲みます。" },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, fourth row, first column from the right: 丸ニ鬼花びし", ja: "左頁、四段目、右から一列目「丸ニ鬼花びし」" }, read: "2026-11-27", measured: true },
  measured: "Four pointed petals end roughly a third of the radius short of the rim, leaving a broad gap inside the ring.",
  build: maruNiOniHanabishiBuild,
});

export const uraHanabishi = defineCrest({
  id: "ura-hanabishi",
  name: { en: "Reverse flower lozenge", ja: "裏花菱" },
  reading: "うらはなびし",
  romaji: "ura hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["うら花びし"],
  construction: { en: "The front four-way flower stands over a rear scalloped row that shows between its petals.", ja: "四方花菱の花びらの奥に小さな花びらを並べ、手前の花びらの間からのぞかせます。" },
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, fourth row, fourth column from the right: うら花びし", ja: "左頁、四段目、右から四列目「うら花びし」" }, read: "2026-11-27", measured: true },
  measured: "The round outside rim and front petal lobes follow the print. The repeated rear scallops are set evenly around the four-way flower.",
  build: uraHanabishiBuild,
});
