import { sakuraBuild, edoSakuraBuild, yaeSakuraBuild, hosokawaSakuraBuild } from "./drawn/sakura.ts";
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

export const yaeSakura = defineCrest({
  id: "yae-sakura",
  name: { en: "Double cherry blossom", ja: "八重桜" },
  reading: "やえざくら",
  romaji: "yae zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["八重ざくら"],
  construction: { en: "Five front petals with pointed stamens cover a second row of five petals. The rear petals show between the notched front ones.", ja: "先のとがった雄しべを持つ五枚の花びらを、奥の五枚に重ねます。手前の先が割れた花びらの間から、奥の花びらが見えます。" },
  measured: "The rear petals repeat midway between the front petals. Thin white gaps keep the two rows distinct.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, fourth row, third column from the right: 八重ざくら", ja: "右頁、四段目、右から三列目「八重ざくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeSakuraBuild(c);
  },
});

export const hosokawaSakura = defineCrest({
  id: "hosokawa-sakura",
  name: { en: "Hosokawa cherry blossom", ja: "細川桜" },
  reading: "ほそかわざくら",
  romaji: "Hosokawa zakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["細川さくら"],
  construction: { en: "Three round-tipped stamens spread across each of five wide petals around the round centre.", ja: "丸い中心を囲む幅広い花びら五枚に、先の丸い雄しべを三本ずつ広げます。" },
  measured: "The fifteen stamens repeat in groups of three. The five shallow petal notches are regularised.",
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, third row, second column from the right: 細川さくら", ja: "右頁、三段目、右から二列目「細川さくら」" }, read: "2026-11-26", measured: true },
  build(c) {
    hosokawaSakuraBuild(c);
  },
});
