// The ringed arabesque flower with a floating figured border, measured from its labelled cell in the 1892 crest book.
import { SHINSEN_MONCHO } from "./books.ts";
import { maruNiKarahanaFusenRyoBuild } from "./drawn/karahana-fusen-ring.ts";
import { defineCrest } from "./util.ts";

export const maruNiKarahanaFusenRyo = defineCrest({
  id: "maru-ni-karahana-fusen-ryo",
  name: { en: "Arabesque flower with a floating figured border in a circle", ja: "丸に唐花浮線綾" },
  reading: "まるにからはなふせんりょう",
  romaji: "maru ni karahana fusen ryō",
  frame: "ring-medium",
  motifs: [{ motif: "karahana", count: 6, arrangement: "radial" }],
  families: [],
  aliases: ["丸ニ唐花ふせんりやう", "ringed karahana fusen ryō"],
  construction: {
    en: "A small five-petalled arabesque flower stands in the middle of a ring, its first petal upright. A short forked vine with two rolled ends grows from the tip of each petal. Five half flowers stand on the inside of the ring between the vines and open towards the middle. Each has one scalloped petal pointing inwards and two long side petals that run along the ring until they almost meet the next flower.",
    ja: "輪の中央に、五枚の花びらの小さな唐花を、一枚目を真上に向けて置きます。各花びらの先から、先が二つに分かれて巻く短い蔓を伸ばします。蔓と蔓の間には、輪の内側に半分の花を五つ置き、中央に向けて開きます。半分の花は、内へ向く丸いふくらみのある花びら一枚と、輪に沿って隣の花の近くまで伸びる長い花びら二枚でできています。",
  },
  measured: "Frame 18: the ring is about 6 percent of the outer diameter, and the package's ring is used. With the room inside the ring as 100, the central flower reaches about 42 and its heart about 7. The vines run from the petal tips to about 68 and spread about 15 either side. The five rim flowers stand 36 degrees off upright and 72 apart. Their inward petal reaches about 41 from the rim, and their side petals taper along the rim to meet the next flower about 63 away.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, second row, first column from the right: 丸ニ唐花ふせんりやう", ja: "左頁、二段目、右から一列目「丸ニ唐花ふせんりやう」" }, read: "2026-11-28", measured: true },
  build: maruNiKarahanaFusenRyoBuild,
});
