import { RING_GAP } from "../construct/builder.ts";
import { CX, CY, R, poly } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { fourLobedMokko, hottaMokkoBuild } from "./drawn/mokko.ts";
import { defineCrest, fam } from "./util.ts";

export const mokko = defineCrest({
  id: "mokko",
  name: { en: "Quince blossom", ja: "木瓜" },
  reading: "もっこう",
  romaji: "mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 4, arrangement: "radial" }, { motif: "flower-lozenge", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["quince", "yoko mokko", "yokomokko", "横木瓜"],
  construction: {
    en: "Four lobes surround a flower with four petals. The lobes at the sides reach farther than those above and below. A broad arc and two round shoulders close against an inner arc on each lobe. Inside each one sits a small band with round ends. Two ruled gaps part each petal from its neighbours, and a short white stamen points away from the round heart.",
    ja: "四枚の花びらを持つ花を、四つの裂片で囲みます。左右の裂片は上下よりも長く伸びます。各裂片は、外側の大きな弧と二つの丸い肩、内側の弧で囲みます。その内側には、両端の丸い細い帯を置きます。花びらの間は定規で引いた白いすき間で分け、円い花の中心から外へ向かって、短い白いしべを入れます。",
  },
  measured: "Frame 44: the height is about four fifths of the width. The flower reaches 0.38 of the half-width above and below and 0.48 at the sides. The outer lobes are cut back to 0.54 above and below and 0.62 at the sides. The curls follow the inside edge of each lobe. The white gaps and the opposite halves are evened out from the printed outlines.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, second row, first column from the right: 木瓜", ja: "左頁、二段目、右から一列目「木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    fourLobedMokko(c, R);
  },
});

export const maruNiMokko = defineCrest({
  id: "maru-ni-mokko",
  name: { en: "Quince blossom in a circle", ja: "丸に木瓜" },
  reading: "まるにもっこう",
  romaji: "maru ni mokkō",
  frame: "ring-medium",
  motifs: mokko.motifs,
  families: [],
  aliases: ["ringed quince", "ringed mokko"],
  construction: {
    en: "The four-lobed quince set inside a circular band. Its upper and lower lobes are slightly fuller than in the plain crest. The circle and the four lobes share a centre.",
    ja: "四つの裂片を持つ木瓜を円い輪の中に収めます。上下の裂片は、輪のない木瓜よりわずかに高く伸びます。輪と木瓜の中心をそろえます。",
  },
  measured: "Frame 44: the ringed flower is about 0.86 as high as it is wide. Its side lobes reach about 0.86 of the printed outer radius. The construction uses the package's medium ring and the corresponding motif reach of 0.79, with the taller upper and lower lobes kept.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, first column from the right: 丸に木瓜", ja: "左頁、三段目、右から一列目「丸に木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    fourLobedMokko(c, inner - RING_GAP, undefined, "ringed");
  },
});

export const ioriMokko = defineCrest({
  id: "iori-mokko",
  name: { en: "Quince blossom in a hut", ja: "庵木瓜" },
  reading: "いおりもっこう",
  romaji: "iori mokkō",
  frame: "iori",
  motifs: mokko.motifs,
  families: [],
  aliases: ["iori ni mokko", "庵に木瓜", "いほりに木瓜"],
  construction: {
    en: "Two ruled slopes meet over a level eave. Two rectangular posts descend from the eave, and the four-lobed quince sits low between them.",
    ja: "定規で引いた二本の斜線を水平な軒の上で合わせます。軒の下に長方形の柱を二本置き、その間の低い位置に四つの裂片を持つ木瓜を収めます。",
  },
  measured: "Frame 44: the roof is a little over three times as wide as it is high. Each post is about one seventh of the roof width and about one and a third times its height. The quince hangs almost from the eave and nearly reaches the feet of the posts. The lobe that points up reaches a little farther than the one that points down. A narrow white gap is kept against the eave and the posts.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, third column from the right: いほりに木瓜", ja: "左頁、三段目、右から三列目「いほりに木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    const eave = 12;
    const feet = -61;
    c.fill("frame", poly([[CX - 86, CY - eave], [CX, CY - 69], [CX + 86, CY - eave]]));
    for (const side of [-1, 1]) {
      const outer = CX + side * 73;
      const inner = CX + side * 49;
      c.fill("frame", poly([[outer, CY - eave], [inner, CY - eave], [inner, CY - feet], [outer, CY - feet]]));
    }
    fourLobedMokko(c, 46, [0, -30], "hut");
  },
});

export const karaMokko = defineCrest({
  id: "kara-mokko",
  name: { en: "Chinese quince blossom", ja: "唐木瓜" },
  reading: "からもっこう",
  romaji: "kara mokkō",
  frame: "none",
  motifs: mokko.motifs,
  families: [],
  aliases: ["scalloped quince", "karamokko"],
  construction: {
    en: "Each of the quince blossom's four lobes ends in a large round scallop with a smaller one on either side. Three circles make the scallops. An arc cuts their inner edge to clear the curled band and flower.",
    ja: "木瓜の四つの裂片は、それぞれ大きな丸いふくらみ一つと、その両側の小さなふくらみ二つで終わります。ふくらみは三つの円で作り、内側は弧で切って、巻いた帯と花のためのすき間を残します。",
  },
  measured: "Frame 44: each of the four outer lobes has a round centre tip and rounded shoulders. The upper and lower tips reach about four fifths as far as the side tips. The longest axis is horizontal, as in the plain quince.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, second row, second column from the right: 唐木瓜", ja: "左頁、二段目、右から二列目「唐木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    fourLobedMokko(c, R, undefined, "kara");
  },
});

export const hottaMokko = defineCrest({
  id: "hotta-mokko",
  name: { en: "Hotta quince blossom", ja: "堀田木瓜" },
  reading: "ほったもっこう",
  romaji: "Hotta mokkō",
  frame: "none",
  motifs: [{ motif: "black-disc", count: 1, arrangement: "single" }, ...mokko.motifs],
  families: [fam("Hotta", "堀田", "ほった")],
  aliases: ["hotta", "hotta quince"],
  construction: {
    en: "An upright quince with four white cutouts in a black disc. The end lobes reach almost to the outer circle. Between the four curled bands is a tall flower with a round centre.",
    ja: "黒い円の中に四つの白い抜きを入れ、木瓜を縦長に描きます。上下の裂片は外円の近くまで伸びます。四つの巻いた帯の間には、円い中心を持つ縦長の花を置きます。",
  },
  measured: "Frame 44: the side cutouts extend a little over four fifths of the outside radius, and the upright pair nearly reach the rim. The side cutouts are tall with rounded ends. The inner flower has longer vertical petals and a circular heart. The upper and lower margins are regularised where the print meets the cell border.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, first row, first column from the right: 堀田木瓜", ja: "左頁、一段目、右から一列目「堀田木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    hottaMokkoBuild(c, R);
  },
});
