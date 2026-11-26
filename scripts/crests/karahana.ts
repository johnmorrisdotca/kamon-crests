// Arabesque flowers measured from labelled cells in the 1892 crest book.
import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { karahanaBuild, kenHanabishiBuild, kenKarahanaBuild, kenKarahanaKuzushiBuild, mitsumoriKarahanaBuild } from "./drawn/karahana.ts";
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
    ja: "小さな円のまわりに、先が三つの丸いふくらみに分かれた花びらを五枚並べます。花びらの間は細い直線で分け、各花びらの中央に短い白いしべを一本入れます。",
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
    ja: "剣花菱を細輪の中に収めます。左右の幅広い花びらと輪の内側の間に細いすき間を空けます。",
  },
  measured: "Frame 8: the labelled ringed cell surrounds four scalloped petals and four diagonal sword points with one thin band. The side petals reach about five sixths of the ring's outer radius.",
  source: { ...SHINSEN_MONCHO, frame: 8, place: { en: "left page, first row, second column from the right: 丸にけん花菱", ja: "左頁、一段目、右から二列目「丸にけん花菱」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-thin");
    kenHanabishiBuild(c, (inner - RING_GAP) * 0.93);
  },
});

export const mutsuKarahana = defineCrest({
  id: "mutsu-karahana",
  name: { en: "Six-petalled arabesque flower", ja: "六つ唐花" },
  reading: "むつからはな",
  romaji: "mutsu karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["six-petalled Chinese flower", "mutsu karahana"],
  construction: {
    en: "Six scalloped petals are struck at equal angles about one round heart, the first pointing up. The narrow ruled cuts split the petals from the heart to the outside.",
    ja: "一つの丸い中心のまわりに、先がふくらむ花びらを六枚、60度ずつ回して並べます。一枚目は真上に向け、中心から外縁まで細い直線で花びらを分けます。",
  },
  measured: "Frame 18: the labelled print is one flower with six scalloped petals. The petals stand 60 degrees apart, with shallow notches between them and a small central disc.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, third row, second column from the right: 六ッから花", ja: "左頁、三段目、右から二列目「六ッから花」" }, read: "2026-11-25", measured: true },
  build(c) {
    karahanaBuild(c, 96, 6);
  },
});

export const mitsumoriKarahana = defineCrest({
  id: "mitsumori-karahana",
  name: { en: "Three clustered arabesque flowers", ja: "三つ盛り唐花" },
  reading: "みつもりからはな",
  romaji: "mitsumori karahana",
  frame: "none",
  motifs: [{ motif: "karahana", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["three clustered Chinese flowers", "mitsumori karahana"],
  construction: {
    en: "Three small scalloped arabesque flowers stand on the corners of a triangle, with a narrow gap between their petals. The upper flower is laid out in full and drawn upright again at the two places below.",
    ja: "先に丸いふくらみのある小さな唐花を三角形の頂点に三つ並べ、花びらどうしの間に細いすき間を空けます。上の一つを作図し、下の二か所にも同じ向きで作図します。",
  },
  measured: "Frame 18: three flowers in a compact triangular group, one above and two below. Each reaches about 45 in an overall layout radius of 100, with the centres 55 out.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, first row, second column from the right: 三ッもりから花", ja: "左頁、一段目、右から二列目「三ッもりから花」" }, read: "2026-11-25", measured: true },
  build(c) {
    mitsumoriKarahanaBuild(c, 96);
  },
});

export const kenKarahanaKuzushi = defineCrest({
  id: "ken-karahana-kuzushi",
  name: { en: "Stylized sword arabesque flower", ja: "剣唐花崩し" },
  reading: "けんからはなくずし",
  romaji: "ken karahana kuzushi",
  frame: "none",
  motifs: [{ motif: "karahana", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["karahana with white swords", "ken karahana kuzushi"],
  construction: {
    en: "Five separated, scalloped petals turn about a round heart, with one pointing down. A white sword is ruled inside each petal, narrow at the heart and flaring before its point.",
    ja: "丸い中心のまわりに、丸いふくらみのある花びらをすき間を空けて五枚並べ、その一枚を真下に向けます。各花びらの中に、中心側が細く、先端の手前で広がる白い剣を直線で抜きます。",
  },
  measured: "Frame 18: the printed flower has five separate petals, the lowest pointing down. The sword cuts reach about four fifths of their petal and flare to about 30 across before the point, in a reach of 100.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "left page, third row, first column from the right: けんから花くづし", ja: "左頁、三段目、右から一列目「けんから花くづし」" }, read: "2026-11-25", measured: true },
  build(c) {
    kenKarahanaKuzushiBuild(c, 96);
  },
});

export const chuwaNiKarahana = defineCrest({
  id: "chuwa-ni-karahana",
  name: { en: "Arabesque flower in a medium ring (chūwa)", ja: "中輪に唐花" },
  reading: "ちゅうわにからはな",
  romaji: "chūwa ni karahana",
  frame: "ring-thin",
  motifs: karahana.motifs,
  families: [],
  aliases: ["chūwa ni karahana", "arabesque flower in a thin ring"],
  construction: {
    en: "The five-petalled arabesque flower sits in a thin ring with a narrow space between the petals and the ring.",
    ja: "五枚の花びらの唐花を、細輪の中に収めます。花びらと輪の間に細いすき間を空けます。",
  },
  measured: "Frame 18: the cell below the sword flower shows one band. Its printed ring lines stand about 3–5 pixels apart across an outer diameter of 124 pixels, or 2.5–4 percent. The medium-ring three geese in the same frame and the medium-ring three arrow nocks in frame 29 are about 4–5 percent. The 丸に wild goose on frame 18 is about 6–7 percent. The flower uses the package’s thin ring, which lies nearer the printed width.",
  source: { ...SHINSEN_MONCHO, frame: 18, place: { en: "right page, fourth row, fourth column from the right: 中わニから花", ja: "右頁、四段目、右から四列目「中わニから花」" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-thin");
    karahanaBuild(c, inner - RING_GAP);
  },
});
