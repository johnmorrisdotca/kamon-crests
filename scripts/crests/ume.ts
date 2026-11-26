import { SHINSEN_MONCHO } from "./books.ts";
import { yaeUmeBuild, utenaPlumBuild, nozokiPlumBuild } from "./drawn/ume.ts";
import { defineCrest } from "./util.ts";

export const yaeUme = defineCrest({
  id: "yae-ume",
  name: { en: "Double plum blossom", ja: "八重梅" },
  reading: "やえうめ",
  romaji: "yae ume",
  frame: "none",
  motifs: [{ motif: "plum", count: 10, arrangement: "radial" }],
  families: [],
  aliases: ["double plum", "やえむめ"],
  construction: {
    en: "Five broad petals crowd around a round heart. A short white stamen rises inside each one. Between the outer shoulders, the tops of five round petals show from behind.",
    ja: "丸い中心を幅広い花びら五枚で囲み、それぞれに短い白いしべを入れます。花びらの肩と肩の間から、奥の丸い花びら五枚の先を見せます。",
  },
  measured: "Frame 24: the five outer petals rise to about the same height. Their crowns lie on circles of radius 43, struck 57 from the centre in a reach of 100. The rounded rear petals alternate with the front petals and show just below their tips.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, second row, fourth column from the right: 八重むめ", ja: "左頁、二段目、右から四列目「八重むめ」" }, read: "2026-11-26", measured: true },
  build(c) {
    yaeUmeBuild(c, 96);
  },
});

export const utenaUmebachi = defineCrest({
  id: "utena-umebachi",
  name: { en: "Calyx plum bowl", ja: "うてな梅鉢" },
  reading: "うてなうめばち",
  romaji: "utena umebachi",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["plum bowl with a calyx"],
  construction: {
    en: "Five separate oval petals lie around the star of the calyx. Four tangent arcs make each oval. A short curved stalk leaves the calyx below.",
    ja: "星形のがくのまわりに、離れた楕円形の花びらを五枚並べます。花びらは接する四つの円弧で作図し、がくの下から短い曲がった柄を伸ばします。",
  },
  measured: "Frame 24: five separate petals reach about the same distance from the calyx. Each has most of its width halfway to the tip. The short stalk curves down below the irregular five-point calyx.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, fourth row, second column from the right: うてなむめばち", ja: "左頁、四段目、右から二列目「うてなむめばち」" }, read: "2026-11-26", measured: true },
  build(c) {
    utenaPlumBuild(c, 96);
  },
});

export const nozokiUmebachi = defineCrest({
  id: "nozoki-umebachi",
  name: { en: "Peeping plum bowl", ja: "覗き梅鉢" },
  reading: "のぞきうめばち",
  romaji: "nozoki umebachi",
  frame: "ring-thin",
  motifs: [{ motif: "plum", count: 3, arrangement: "single" }],
  families: [],
  aliases: ["peeping plum"],
  construction: {
    en: "Three petals peek up above the lower rim. The middle petal is a disc and the next two are clipped by the circle inside the ring. Only the top of the heart and a few short rays show.",
    ja: "輪の下の縁から花びらを三枚のぞかせます。中央の花びらは円で、両脇の花びらは輪の内側の円で切ります。丸い中心の上端と短い筋だけを見せます。",
  },
  measured: "Frame 24: the middle disc is about one third of the inside diameter and its centre lies just under two fifths of the radius below the middle of the ring. Only two neighbouring discs, short rays and the upper edge of the heart are visible.",
  source: { ...SHINSEN_MONCHO, frame: 24, place: { en: "left page, second row, third column from the right: のぞきむめばち", ja: "左頁、二段目、右から三列目「のぞきむめばち」" }, read: "2026-11-26", measured: true },
  build(c) {
    nozokiPlumBuild(c, c.ring("ring-thin"));
  },
});
