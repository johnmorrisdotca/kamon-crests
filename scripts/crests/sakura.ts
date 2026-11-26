import { sakuraBuild, edoSakuraBuild } from "./drawn/sakura.ts";
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

export const edoSakura = defineCrest({
  id: "edo-sakura",
  name: { en: "Edo cherry blossom", ja: "江戸桜" },
  reading: "えどざくら",
  romaji: "Edo zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["江戸さくら"],
  construction: { en: "Five broad petals enclose the heart. Small arc loops mark the points where the petals meet. Three stamens have round tips and two have leaf-shaped tips.", ja: "幅広い花びら五枚が中心を囲みます。花びらが出会うところに円弧の小さな輪を置きます。雄しべのうち三本の先は丸く、二本の先は葉形です。" },
  measured: "The five small loops are regularised around the edges. The print’s two kinds of stamen remain distinct.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, fourth row, first column from the right: 江戸さくら", ja: "右頁、四段目、右から一列目「江戸さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    edoSakuraBuild(c);
  },
});
