// The paulownia 桐: three leaves below, and three spikes of flowers above, the middle one the tallest. Struck with compass and
// ruler (scripts/crests/drawn/kiri.ts); its proportions were measured from a public-domain Meiji crest book (see each crest's
// source and docs/provenance.md).
import { R } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { GOSAN, GOSHICHI, kiriBuild } from "./drawn/kiri.ts";
import { defineCrest, fam } from "./util.ts";
import type { BookSource } from "./types.ts";
import { READ, SHINSEN_MONCHO as BOOK } from "./books.ts";

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
    en: "Three broad leaves below, the middle one hanging and the two beside it spread, each with its midrib and veins; above them three upright spikes of florets, five in the middle one and three in each of the others. A leaf is a rounded heart: its two upper edges are one compass width mirrored, and round its body are five lobes, each the pointed lens of two circles of one width. Its veins leave the midrib on both sides, each the white between two circles two apart, and stop short of the edge. A floret is a bell: two side arcs from a pointed base and three scallops for its top; the florets stand in pairs up the stalk, one on its top. The side leaves are the same plan at four fifths, turned out on a 5-12-13 triangle, and pass under the middle leaf. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "下に広い葉を三枚、中央の葉は垂らし左右の葉は広げて、それぞれ葉脈を入れます。その上に花穂を三本立て、中央に五つ、左右に三つずつ花をつけます。葉は丸みのあるハート形です。上の左右の縁は同じ幅の円で、まわりに先のとがった小さな裂片を五つ、それぞれ同じ幅の二つの円の重なりで作ります。葉脈は主脈から左右に出て、二つの円の間の白いすき間で表し、縁の手前で止めます。花は釣鐘形で、左右の弧と、上の三つの小さな円で作り、茎に沿って二つずつ並べ、先に一つ置きます。左右の葉は同じ形を五分の四の大きさにして外へ回し、中央の葉の下に入れます。左半分を先に作図し、右半分はその場で左右対称に作図します。",
  },
  source: gosanSource,
  build(c) {
    kiriBuild(c, GOSAN);
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
    en: "The same plan as the five-three paulownia with more florets: seven in the middle spike and five in each of the others, each floret of smaller compass widths. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "五三桐と同じ構図で花を増やし、中央の花穂に七つ、左右の花穂に五つずつつけます。花は少し小さい幅の円で作ります。左半分を先に作図し、右半分はその場で左右対称に作図します。",
  },
  source: { ...BOOK, frame: 38, place: { en: "right page, first row, first column: 五七きり", ja: "右頁、一段目の一列目「五七きり」" }, read: READ },
  build(c) {
    kiriBuild(c, GOSHICHI);
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
    kiriBuild(c, GOSAN);
  },
});
