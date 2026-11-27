import { maruNiChukageKiriBuild } from "./drawn/kiri-shadow.ts";
import { mamezoKiriBuild, korinKiriBuild, kiriChoBuild } from "./drawn/kiri-variants.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

export const mamezoKiri = defineCrest({
  id: "mamezo-kiri",
  name: { en: "Balancing-doll paulownia", ja: "豆蔵桐" },
  reading: "まめぞうぎり",
  romaji: "mamezo kiri",
  frame: "ring-thin",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["まめぞうきり"],
  construction: { en: "Three cloak-like lobes hang from small pointed hats. Upright stems carry round weights, and the middle stem branches to two more weights. A thin ring encloses the design.", ja: "小さな三角の笠の下に、合羽のような裂片を三つ垂らします。立てた茎の先に丸い重りを置き、中央の茎からはさらに二本の枝を出して重りを添えます。全体を細い輪に収めます。" },
  measured: "Three hats and cloak-like forms replace the ordinary flower heads and leaves. The middle group sits lower than its two neighbours and carries a taller branched stem. A thin drawn rim follows the paper.",
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, fourth row, first column from the right: まめぞうきり", ja: "左頁、四段目、右から一列目「まめぞうきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    mamezoKiriBuild(c);
  },
});

export const korinKiri = defineCrest({
  id: "korin-kiri",
  name: { en: "Korin paulownia", ja: "光琳桐" },
  reading: "こうりんぎり",
  romaji: "korin kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["こうりんきり"],
  construction: { en: "Three smooth wings curve around a small round joint, with a white opening inside each. Above them stand three branches with five round buds in the middle and three on each side.", ja: "小さな丸い節を中心に、なめらかな葉を三枚広げ、一枚ずつ内側を白く抜きます。その上に花穂を三本立て、中央に五つ、左右に三つずつ丸いつぼみをつけます。" },
  measured: "The print has three rounded hollow leaves, a round joint and simple circular buds. The middle stem has five buds and both side stems have three, before they reach the shoulders.",
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "left page, fourth row, second column from the right: こうりんきり", ja: "左頁、四段目、右から二列目「こうりんきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    korinKiriBuild(c);
  },
});

export const kiriCho = defineCrest({
  id: "kiri-cho",
  name: { en: "Paulownia butterfly", ja: "桐蝶" },
  reading: "きりちょう",
  romaji: "kiri cho",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["きりてふ"],
  construction: { en: "The three hollow leaves spread like wings. Two curly feelers spread above the round join, with one three-lobed flower between them.", ja: "白抜きの葉を三枚、蝶の翅のように広げます。丸い節の上から先を巻いた触角を左右に伸ばし、その間に三つに分かれた花を一つ立てます。" },
  measured: "The book shows two spreading upper wings, a small hanging lower wing and the round joint with two long curling feelers. A single bud stands between the feelers.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, first row, first column from the right: きりてふ", ja: "右頁、一段目、右から一列目「きりてふ」" }, read: "2026-11-26", measured: true },
  build(c) {
    kiriChoBuild(c);
  },
});

export const maruNiChukageKiri = defineCrest({
  id: "maru-ni-chukage-kiri",
  name: { en: "Mid-shadow paulownia in a circle", ja: "丸に中陰桐" },
  reading: "まるにちゅうかげぎり",
  romaji: "maru ni chukage giri",
  frame: "ring-medium",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["丸ニ中かげきり"],
  construction: { en: "Three hollow scalloped leaves spread around a small joint. Short channels sit beside the joint and three flower spikes rise above it. A round frame encloses the plant.", ja: "白く抜いた葉を三枚、小さな節のまわりに広げます。節のわきに短い隙間を置き、その上に花穂を三本立てます。全体を丸い輪に収めます。" },
  measured: "This cell adds three short white openings near the joint, compared with the plain shadow crest. The medium ring and the reach of the leaves follow the named form.",
  source: { ...SHINSEN_MONCHO, frame: 39, place: { en: "right page, third row, first column from the right: 丸ニ中かげきり", ja: "右頁、三段目、右から一列目「丸ニ中かげきり」" }, read: "2026-11-26", measured: true },
  build(c) {
    maruNiChukageKiriBuild(c);
  },
});
