import { SHINSEN_MONCHO } from "./books.ts";
import { kabutoGaiBuild } from "./drawn/kabuto-gai.ts";
import { defineCrest } from "./util.ts";

export const kabutoGai = defineCrest({
  id: "kabuto-gai",
  name: { en: "Helmet shell", ja: "兜貝" },
  reading: "かぶとがい",
  romaji: "kabutogai",
  frame: "none",
  motifs: [{ motif: "shell", count: 14, arrangement: "radial" }],
  families: [],
  aliases: ["かぶと貝"],
  construction: {
    en: "Seven smooth shells alternate with seven ribbed shells. The shells fan out from a high hinge, with the front shells overlapping the ones behind along fine white seams.",
    ja: "なめらかな貝と成長線のある貝を七枚ずつ交互に置き、高い位置の蝶番から広げます。手前の貝を奥の貝に重ね、細い白いすき間で分けます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 16, place: { en: "right page, first row, third column from the right: かぶと貝", ja: "右頁、一段目、右から三列目「かぶと貝」" }, read: "2026-11-27", measured: true },
  measured: "The shell profiles, nine rib positions, high hinge and paired left and right lengths follow the 1892 cell. The shell positions are divided into fourteen equal angles, the printed left and right sides are regularised, and the overlap seams are 1.1 units wide.",
  build: kabutoGaiBuild,
});
