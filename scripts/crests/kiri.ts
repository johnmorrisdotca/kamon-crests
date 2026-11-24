// The paulownia 桐: three leaves below, and three spikes of flowers above, the middle one the tallest. Vectorised from a
// public-domain Meiji crest book (see each crest's source and docs/provenance.md), cleaned, and made exactly symmetric.
import { CX, R } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import type { Builder } from "../construct/builder.ts";
import { mirrored } from "../construct/traced.ts";
import { GOSAN_LEFT } from "./traced/kiri-gosan.ts";
import { GOSHICHI_LEFT } from "./traced/kiri-goshichi.ts";
import { defineCrest, fam } from "./util.ts";
import type { BookSource } from "./types.ts";
import { READ, SHINSEN_MONCHO as BOOK } from "./books.ts";

/** The paulownia's layout: its axis, the line its leaves spring from, and the circle it fills; then the leaves, then the spikes. */
const kiriBuild = (c: Builder, pieces: readonly string[]): void => {
  c.guideLine([CX, 4], [CX, 196]);
  c.guideLine([4, 100], [196, 100]);
  c.guideCircle([CX, 100], R);
  mirrored(c, "paulownia", pieces);
};

const gosanSource: BookSource = { ...BOOK, frame: 38, place: { en: "left page, third row, first column: 丸に五三きり, its ring left out", ja: "左頁、三段目の一列目「丸に五三きり」（輪は除く）" }, read: READ };

export const gosanNoKiri = defineCrest({
  id: "gosan-no-kiri",
  name: { en: "Paulownia, five-three-five", ja: "五三桐" },
  reading: "ごさんのきり",
  romaji: "gosan no kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [fam("Toyotomi", "豊臣", "とよとみ"), fam("Ashikaga (granted)", "足利", "あしかが")],
  aliases: ["paulownia", "kiri", "5-3", "toyotomi", "Gosan-no-kiri", "Paulownia crest"],
  construction: {
    en: "Three broad leaves below, the middle one hanging and the two beside it spread, each with its midrib and veins; above them three upright spikes of florets, five in the middle one and three in each of the others. The left half is drawn from the book and mirrored about the axis.",
    ja: "下に広い葉を三枚、中央の葉は垂らし左右の葉は広げて、それぞれ葉脈を入れます。その上に花穂を三本立て、中央に五つ、左右に三つずつ花をつけます。左半分を紋帳から写し取り、中心線で左右対称に返します。",
  },
  source: gosanSource,
  build(c) {
    kiriBuild(c, GOSAN_LEFT);
  },
});


export const goshichiNoKiri = defineCrest({
  id: "goshichi-no-kiri",
  name: { en: "Paulownia, seven-five-seven", ja: "五七桐" },
  reading: "ごしちのきり",
  romaji: "goshichi no kiri",
  frame: "none",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [fam("The Government of Japan", "日本政府", "にほんせいふ"), fam("Toyotomi", "豊臣", "とよとみ")],
  aliases: ["paulownia", "kiri", "5-7", "government seal", "toyotomi", "taiko kiri", "Goshichi-no-kiri", "Paulownia crest"],
  construction: {
    en: "The same plan as the five-three paulownia with more florets: seven in the middle spike and five in each of the others. The left half is drawn from the book and mirrored about the axis.",
    ja: "五三桐と同じ構図で花を増やし、中央の花穂に七つ、左右の花穂に五つずつつけます。左半分を紋帳から写し取り、中心線で左右対称に返します。",
  },
  source: { ...BOOK, frame: 38, place: { en: "right page, first row, first column: 五七きり", ja: "右頁、一段目の一列目「五七きり」" }, read: READ },
  build(c) {
    kiriBuild(c, GOSHICHI_LEFT);
  },
});

export const maruNiGosanNoKiri = defineCrest({
  id: "maru-ni-gosan-no-kiri",
  name: { en: "Paulownia in a circle", ja: "丸に五三桐" },
  reading: "まるにごさんのきり",
  romaji: "maru ni gosan no kiri",
  frame: "ring-medium",
  motifs: [{ motif: "paulownia", count: 3, arrangement: "upright" }],
  families: [],
  aliases: ["paulownia ring", "Maru-ni-gosan-no-kiri"],
  construction: { en: "The five-three paulownia scaled to fill a ring about a tenth of the diameter thick, a narrow even gap inside it.", ja: "五三桐を縮めて、直径の約10分の1の太さの輪の中に、狭く均一な隙間を残して収めます。" },
  source: gosanSource,
  build(c) {
    const inner = c.ring("ring-medium");
    c.zoom((inner - RING_GAP) / R);
    kiriBuild(c, GOSAN_LEFT);
  },
});
