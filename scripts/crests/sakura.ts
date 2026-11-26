import { sakuraBuild } from "./drawn/sakura.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const sakura = defineCrest({
  id: "sakura",
  name: { en: "Cherry blossom", ja: "桜" },
  reading: "さくら",
  romaji: "sakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["さくら"],
  construction: { en: "Five broad, notched petals enclose a round centre. A short pointed stamen stands on each petal.", ja: "先の割れた幅広い花びら五枚を、丸い中心のまわりに並べます。花びらの上に先のとがった短い雄しべを一本ずつ置きます。" },
  measured: "The five petals and pointed stamens are set at equal angles. The centre keeps a narrow white margin.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, third column from the right: さくら", ja: "右頁、一段目、右から三列目「さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    sakuraBuild(c);
  },
});
