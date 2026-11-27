import { SHINSEN_MONCHO } from "./books.ts";
import { hanabishiFusenRyoBuild } from "./drawn/hanabishi-divisions.ts";
import { defineCrest } from "./util.ts";

export const hanabishiFusenRyo = defineCrest({
  id: "hanabishi-fusen-ryo",
  name: { en: "Flower lozenge with a floating figured border", ja: "花菱浮線綾" },
  reading: "はなびしふせんりょう",
  romaji: "hanabishi fusen ryō",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["花びしふせんりやう"],
  construction: { en: "A four-way flower fills the centre of the round field, with split flower panels at the rim and little curled figures between them.", ja: "円の中心に四方花菱を置き、縁に割り花を並べ、その間に小さな巻き形を入れます。" },
  source: { ...SHINSEN_MONCHO, frame: 9, place: { en: "right page, first row, third column from the right: 花びしふせんりやう", ja: "右頁、一段目、右から三列目「花びしふせんりやう」" }, read: "2026-11-27", measured: true },
  measured: "Four outer flower panels, four curled fillers and the central flower are aligned and evenly spaced inside the printed rim.",
  build: hanabishiFusenRyoBuild,
});
