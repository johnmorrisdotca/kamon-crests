import { RING_GAP } from "../construct/builder.ts";
import { CX, CY, R, poly } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { kokumochiUriBuild } from "./drawn/kokumochi-uri.ts";
import { cell } from "./kaku-meyui.ts";
import { mokkoBuild } from "./drawn/leafy.ts";
import { fourLobedMokko, hottaMokkoBuild, kenMokkoBuild, tachiMokkoBuild, ryoNoMokkoBuild } from "./drawn/mokko.ts";
import { defineCrest, fam } from "./util.ts";

export const mokko = defineCrest({
  id: "mokko",
  name: { en: "Quince blossom", ja: "木瓜" },
  reading: "もっこう",
  romaji: "mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 4, arrangement: "radial" }, { motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["quince", "yoko mokko", "yokomokko", "横木瓜"],
  construction: {
    en: "Four lobes surround a flower with four petals. The lobes at the sides reach farther than those above and below. A broad arc and two round shoulders close against an inner arc on each lobe. Inside each one sits a narrow band whose arcs widen into rounded curls. Two ruled gaps part each petal from its neighbours, and a short white stamen points away from the round heart.",
    ja: "四枚の花びらを持つ花を、四つの裂片で囲みます。左右の裂片は上下よりも長く伸びます。各裂片は、外側の大きな弧と二つの丸い肩、内側の弧で囲みます。その内側には、両端が丸くふくらんで内側に巻く細い帯を置きます。花びらの間は定規で引いた白いすき間で分け、円い花の中心から外へ向かって、短い白いしべを入れます。",
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
  measured: "Frame 44: the ringed flower is about 0.88 as high as it is wide. Its side lobes reach about 0.84 of the printed outer radius. The construction uses the package's medium ring and leaves the 3.5-unit white gap at the side tips. The upright pair is fuller, at 0.94 of the motif's width, to fill the heavier ring while keeping the horizontal axis longer.",
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

export const uri = defineCrest({
  id: "uri",
  name: { en: "Melon", ja: "瓜" },
  reading: "うり",
  romaji: "uri",
  frame: "mokko",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["five-lobed melon", "窠", "くわ"],
  construction: {
    en: "Five broad lobes about the outside circle. Each lobe has two rounded shoulders and a curled band inside it. Five three-tipped petals, each with a short white stamen, meet around the small round heart.",
    ja: "外円に沿って五つの幅広い裂片を置きます。各裂片には二つの丸い肩があり、その内側に両端を巻いた帯を置きます。短い白いしべと三つの丸い先端を持つ花びらが五枚あり、小さな円い中心を囲みます。",
  },
  measured: "Frame 28: five rounded lobes are contained by the outside circle. The curled bands reach about three quarters of the outside radius and the flower reaches three fifths. The heart is about one tenth of the outside radius. The paper between the five petals and round the heart has been evened out.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, fourth row, second column from the right: くわ (窠), the five-lobed melon", ja: "右頁、四段目、右から二列目「くわ」（窠、五つの裂片を持つ瓜）" }, read: "2026-11-25", measured: true },
  build(c) {
    mokkoBuild(c, "frame", "plum", R, "uri");
  },
});

export const kokumochiUri = defineCrest({
  id: "kokumochi-uri",
  name: { en: "Melon on a black disc", ja: "石持ち瓜" },
  reading: "こくもちうり",
  romaji: "kokumochi uri",
  frame: "none",
  motifs: [{ motif: "black-disc", count: 1, arrangement: "single" }, { motif: "quince-lobes", count: 5, arrangement: "radial" }, { motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["石持瓜"],
  source: cell(28, "right page, row 3, second column from the right: 石持瓜", "右頁、三段目、右から二列目「石持瓜」"),
  measured: "A solid disc carries five broad rounded openings near its edge. Each opening has a long curved crown. Five pairs of narrow curls surround the central flower, whose five pointed petals each have a short stamen.",
  construction: {
    en: "Strike the black disc and cut five pale lobes from it. Leave a circular field inside the openings. Set narrow curls around the five-petal flower, with a white stamen cut into each petal.",
    ja: "黒い円から五つの白い裂片を抜きます。抜いた部分の内側に丸い白地を残し、五枚の花びらのまわりに細い巻きを置きます。花びらには白いしべを入れます。",
  },
  build: kokumochiUriBuild,
});

export const maruNiTachiMokko = defineCrest({
  id: "maru-ni-tachi-mokko",
  name: { en: "Upright quince blossom in a circle", ja: "丸に立ち木瓜" },
  reading: "まるにたちもっこう",
  romaji: "maru ni tachi mokkō",
  frame: "ring-medium",
  motifs: [{ motif: "quince-lobes", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["丸に立木瓜", "ringed standing quince"],
  construction: {
    en: "Four round petals meet at the centre of a ring. Each petal has three nested white arcs and narrows between two ruled seams. The side petals are longer than the upper and lower pair.",
    ja: "輪の中心で四枚の丸い花びらを合わせます。各花びらには三重の白い弧があり、定規で引いた二本のすき間の間で細くなります。左右の花びらは上下より長く伸びます。",
  },
  measured: "Frame 44: the side petals reach about four fifths of the ring radius and the upright pair reaches about 0.86 of the side pair. The three nested arcs on each petal rise roughly 0.23, 0.36 and 0.56 of the side reach. Their white width is regularised to three units at full motif size.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, fourth row, second column from the right: 丸に立木瓜", ja: "左頁、四段目、右から二列目「丸に立木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    tachiMokkoBuild(c, inner - RING_GAP);
  },
});

export const kenMokko = defineCrest({
  id: "ken-mokko",
  name: { en: "Sword quince blossom", ja: "剣木瓜" },
  reading: "けんもっこう",
  romaji: "ken mokkō",
  frame: "none",
  motifs: [mokko.motifs[0], { motif: "sword", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["four sword quince"],
  construction: {
    en: "Four blades fall between the four lobes of the quince. A blade is narrow at the heart and widens into two curved shoulders before the point. The bands and petals stop a white gap short of its edges.",
    ja: "木瓜の四つの裂片の間に四本の剣を置きます。剣は花の中心で細くなり、二つの曲がった肩へ広がって尖ります。帯と花びらは、剣の縁から白いすき間を残して止めます。",
  },
  measured: "Frame 44: the four blades point diagonally between the lobes. The shoulders are about one third of the motif radius across and the tip reaches about 0.88 of the radius. The blade edges and the gaps beside them are cut on circles struck from the same centres.",
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, second column from the right: 剣木瓜", ja: "左頁、三段目、右から二列目「剣木瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    kenMokkoBuild(c, R);
  },
});

export const mitsuUri = defineCrest({
  id: "mitsu-uri",
  name: { en: "Three melons", ja: "三つ瓜" },
  reading: "みつうり",
  romaji: "mitsu uri",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["three-lobed melon", "mitsuuri"],
  construction: {
    en: "Three broad lobes on the compass circle, with one at the top. A curled band and a small three-tipped petal sit inside each lobe. The petals share a round heart.",
    ja: "外円に沿って三つの幅広い裂片を並べ、うち一つを上に置きます。各裂片の内側には巻いた帯と三つの丸い先端を持つ小さな花びらを置き、花びらは円い中心を共有します。",
  },
  measured: "Frame 28: the upper lobe and its partners reach the outer circle. The curled bands lie around 0.52 of its radius and the tips of the three inner petals reach about 0.43. The three axes stand 120 degrees apart. The shoulders of the top lobe are set farther apart, as in the print. Two tangent arcs widen each end of the inner band into a hooked bulb.",
  source: { ...SHINSEN_MONCHO, frame: 28, place: { en: "right page, second row, fourth column from the right: 三ッ瓜", ja: "右頁、二段目、右から四列目「三ッ瓜」" }, read: "2026-11-25", measured: true },
  build(c) {
    mokkoBuild(c, "quince-lobes", "quince-lobes", R, "three", true);
  },
});

export const ryoNoMokko = defineCrest({
  id: "ryo-no-mokko",
  name: { en: "Ryō mokkō", ja: "りょうの木瓜" },
  reading: "りょうのもっこう",
  romaji: "ryō no mokkō",
  frame: "none",
  motifs: [{ motif: "quince-lobes", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["りやうの瓜"],
  construction: { en: "Three broad curved bands connect rounded lobes around three pointed leaves.", ja: "幅のある曲線で丸い三つの裂片をつなぎ、中心に先のとがった葉を三枚置きます。" },
  measured: "The three equally spaced bands meet lobes that are rounded on the outside. The three ruled white veins follow the leaf axes.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, third row, first column from the right: りやうの瓜", ja: "右頁、三段目、右から一列目「りやうの瓜」" }, read: "2026-11-26", measured: true },
  build(c) {
    ryoNoMokkoBuild(c);
  },
});
