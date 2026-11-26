// Arabesque flowers measured from labelled cells in the 1892 crest book.
import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { karahanaBuild, kenHanabishiBuild, kenKarahanaBuild } from "./drawn/karahana.ts";
import { defineCrest } from "./util.ts";

export const karahana = defineCrest({
  id: "karahana",
  name: { en: "Arabesque flower", ja: "唐花" },
  reading: "からはな",
  romaji: "karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["Chinese flower", "arabesque blossom"],
  construction: {
    en: "Five petals round a small disc, each with three rounded lobes at its edge. Narrow ruled gaps run between the petals, and a short white stamen runs out through the middle of each.",
    ja: "小さな円のまわりに、先が三つの丸いふくらみに分かれた花びらを五枚並べます。花びらの間は細い直線で分け、中央から白いしべを一本ずつ伸ばします。",
  },
  measured: "Frame 18: the notches between petals stand about four fifths out from the centre. The middle tip is struck from 77 out with a radius of 23. The two shoulder lobes stand 31 either side and 68 out, with radii of 21. The central disc has a radius of about 12 and the stamens reach 43.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, second row, fourth column from the right: 唐花", ja: "右頁、二段目、右から四列目「唐花」" }, read: "2026-11-25", measured: true },
  build(c) {
    karahanaBuild(c, 96);
  },
});

export const kenHanabishi = defineCrest({
  id: "ken-hanabishi",
  name: { en: "Sword flower lozenge", ja: "剣花菱" },
  reading: "けんはなびし",
  romaji: "ken hanabishi",
  frame: "none",
  motifs: [{ motif: "flower-lozenge", count: 1, arrangement: "single" }, { motif: "sword", count: 4, arrangement: "radial" }],
  families: [],
  aliases: ["sword hanabishi", "ken hanabishi"],
  construction: {
    en: "Four scalloped petals fill a broad lozenge, with a dotted round heart and a short white stamen in each petal. Four short sword points stand diagonally between them. The upright petals are shorter than the side petals.",
    ja: "先が三つにふくらむ花びら四枚を、横に広い菱形に並べます。中央の丸には点を入れ、各花びらに短い白いしべを入れます。花びらの間に剣先を斜めに四つ置きます。上下の花びらは左右より短くします。",
  },
  measured: "Frame 8: the upright petals reach about 80 in a side reach of 100, and the heart is about 22 across. The upper right sword point is near (60, 53) in that frame. Each petal has one tip lobe and two shoulders struck from circles.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, third row, first column from the right: 剣花びし", ja: "左頁、三段目、右から一列目「剣花びし」" }, read: "2026-11-25", measured: true },
  build(c) {
    kenHanabishiBuild(c, 96);
  },
});

export const kenKarahana = defineCrest({
  id: "ken-karahana",
  name: { en: "Sword arabesque flower", ja: "剣唐花" },
  reading: "けんからはな",
  romaji: "ken karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }, { motif: "sword", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["sword Chinese flower", "ken karahana"],
  construction: {
    en: "Five scalloped petals around a round heart, with a ruled sword point between each pair. The petal flanks curve towards the heart, and each point keeps a narrow paper line against them.",
    ja: "丸い中心のまわりに先が三つにふくらむ花びらを五枚並べ、花びらの間に直線で剣先を描きます。花びらの両脇は中心へ向かって弧を描き、剣先との間に細い白いすき間を空けます。",
  },
  measured: "Frame 18: five sword points alternate with five narrower scalloped petals. The swords and the petals have about the same reach. The sword shoulders stand about 89 out and 48 across in a reach of 100.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, third row, fourth column from the right: 剣から花", ja: "右頁、三段目、右から四列目「剣から花」" }, read: "2026-11-25", measured: true },
  build(c) {
    kenKarahanaBuild(c, 96);
  },
});

export const maruNiKenHanabishi = defineCrest({
  id: "maru-ni-ken-hanabishi",
  name: { en: "Sword flower lozenge in a circle", ja: "丸に剣花菱" },
  reading: "まるにけんはなびし",
  romaji: "maru ni ken hanabishi",
  frame: "ring-thin",
  motifs: kenHanabishi.motifs,
  families: [],
  aliases: ["sword hanabishi in a ring"],
  construction: {
    en: "The sword flower lozenge sits in a thin ring. The two broad side petals leave a narrow space to the inside of the ring.",
    ja: "剣花菱を細輪の中に納めます。左右の幅広い花びらと輪の内側の間に細いすき間を空けます。",
  },
  measured: "Frame 8: the labelled ringed cell surrounds four scalloped petals and four diagonal sword points with one thin band. The side petals reach about five sixths of the ring's outer radius.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, first row, second column from the right: 丸にけん花菱", ja: "左頁、一段目、右から二列目「丸にけん花菱」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-thin");
    kenHanabishiBuild(c, (inner - RING_GAP) * 0.93);
  },
});

export const chuKarahana = defineCrest({
  id: "chu-karahana",
  name: { en: "Medium arabesque flower", ja: "中唐花" },
  reading: "ちゅうからはな",
  romaji: "chū karahana",
  frame: "ring-thin",
  motifs: karahana.motifs,
  families: [],
  aliases: ["chū karahana", "arabesque flower in a thin ring"],
  construction: {
    en: "The five-petalled arabesque flower sits in a thin ring with a narrow space between the petals and the ring.",
    ja: "五枚の花びらの唐花を細輪の中に納めます。花びらと輪の間に細いすき間を空けます。",
  },
  measured: "Frame 18: the cell directly below the sword flower shows a single thin outlined ring, with the same five scalloped petals as the plain flower. The tips reach about nine tenths of the ring's outer radius.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, fourth row, fourth column from the right: 中ニから花", ja: "右頁、四段目、右から四列目「中ニから花」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-thin");
    karahanaBuild(c, inner - RING_GAP);
  },
});

export const muttsuKarahana = defineCrest({
  id: "muttsu-karahana",
  name: { en: "Six-petalled arabesque flower", ja: "六つ唐花" },
  reading: "むっつからはな",
  romaji: "muttsu karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["six-petalled Chinese flower", "muttsu karahana"],
  construction: {
    en: "Six scalloped petals are struck at equal angles about one round heart, the first pointing up. The narrow ruled cuts split the petals from the heart to the outside.",
    ja: "一つの丸い中心のまわりに、先がふくらむ花びらを六枚、同じ角度で並べます。一枚目は真上に向け、中心から外縁まで細い直線で花びらを分けます。",
  },
  measured: "Frame 18: the labelled print is one flower with six scalloped petals. The petals stand 60 degrees apart, with shallow notches between them and a small central disc.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, third row, second column from the right: 六ッから花", ja: "左頁、三段目、右から二列目「六ッから花」" }, read: "2026-11-25", measured: true },
  build(c) {
    karahanaBuild(c, 96, 6);
  },
});
