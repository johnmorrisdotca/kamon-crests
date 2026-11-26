// The paulownia 桐: three leaves below, and three upright spikes above, each a thin stalk with a bud on its top and pairs of
// buds below it, the middle one the tallest. Struck with compass and ruler (scripts/crests/drawn/kiri.ts); its proportions
// were measured from a public-domain Meiji crest book (see each crest's source and docs/provenance.md).
import { R } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { GOSAN, GOSHICHI, kiriBuild } from "./drawn/kiri.ts";
import { defineCrest, fam } from "./util.ts";
import type { BookSource } from "./types.ts";
import { READ, SHINSEN_MONCHO as BOOK } from "./books.ts";

const gosanSource: BookSource = { ...BOOK, frame: 38, place: { en: "left page, third row, the leftmost cell: 丸に五三きり, its ring left out", ja: "左頁、三段目、右から四列目（いちばん左）「丸に五三きり」（輪は除く）" }, read: READ, measured: true };

const MEASURED =
  "Read from two cells of the 1892 crest book (frame 38), as parts of the crest's half-width (88 of the layout's 100), upward from the joint, by eye off enlarged crops, so good to a few parts. Its 五七きり (right page, first row, the leftmost cell): the middle spike is a stalk 78 high with a three-lobed bud on its top (about 19 high and 26 wide, drawn in outline) and three florets down each side of it, about 55, 40 and 24 up, each on a short curved stem and reaching about 30 from the stalk at the foot; the side spikes stand 53 to 55 out and 55 to 63 high, with two florets a side reaching about 17. Its 丸に五三きり (left page, third row, the leftmost cell), squeezed into its ring: the middle spike 90 high with two florets a side, the side spikes 59 out and 65 high with one a side. The veins, from the same two cells, as parts of the same half-width: in the middle leaf (89 long) a midrib from the joint to the tip and four lines each side. The first leaves the joint and the others leave the midrib about 24, 37 and 51 down it; each runs out and down beside the leaf's edge, bowing outward a little, and stops short of the lower edge about 51, 60, 68 and 75 down. None reaches the tip. A side leaf starts at the joint itself and is about 95 long; its rib leaves the joint about 27 degrees below level, with four long lines above it that leave it at the joint and about 17, 30 and 40 along it and sweep out beside the upper edge, and shorter lines below it. Ours: the middle spike 75 high in 五三桐 and 78 in 五七桐, its lowest buds reaching 27 and 20 from the stalk; the side spikes 56 out, 52 high in 五三桐 and 58 in 五七桐. The middle leaf is 86 long, with a midrib and four veins a side that leave it at the joint and 24, 37 and 51 down and stop 61, 69, 75 and 76 from the joint. A side leaf starts at the joint, is 93 long and 62 wide, and its midrib falls one for every two it runs (about 27 degrees below level); its four veins a side leave the midrib at the joint and 17, 29 and 40 along it. The book's florets are scalloped lumps that touch one another; ours are buds of three discs with white between them, as the crest is drawn solid. The book's rib sits low in its side leaf, with long lines above it and short ones below; ours is on the leaf's own axis with the same veins on both sides. The book's veins bow a little less than ours, and its middle leaf is narrower at the shoulders, so more of its side leaves shows beside the joint. Nothing is taken from Wikimedia Commons or from any modern book.";

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
    en: "Three broad leaves below, the middle one hanging and the two beside it spread; above them three upright spikes, five florets on the middle one and three on each of the others. All three leaves hang from the small circle where they meet. The middle leaf is a rounded heart: its two upper edges are one compass width mirrored, and round its body are five scallops of one width. A side leaf is longer and narrower and made the same way; it is turned out until its midrib falls one for every two it runs, and it passes under the middle leaf. A white midrib runs straight from the small circle to the leaf's tip. On each side of it are four white veins. The first leaves the small circle and the other three leave the midrib lower down, one below the other. Each sweeps out and then down beside the leaf's edge, inside the vein above it, and stops on a circle about the small circle's centre, short of the edge. The upper veins are long and the lowest is short, and none reaches the tip. Each vein is the white between two circles two apart. A spike is a thin upright stalk that rises from behind the leaves, with one floret on its top and pairs of florets below it on short side stems, each clear of its neighbours and of the stalk. A floret is a bud of three discs: a round head and two round shoulders. A side stem is the band between two circles two apart: it leaves the stalk outwards and turns up into the bud. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "下に広い葉を三枚、中央の葉は垂らし、左右の葉は広げます。その上に花穂を三本立て、中央に五つ、左右に三つずつ花をつけます。三枚の葉はどれも、葉が集まる小さな円から出ます。中央の葉は丸みのあるハート形です。上の左右の縁は同じ幅の円で、まわりに同じ幅の丸い裂片を五つ並べます。左右の葉は中央の葉より細長く、同じ作り方です。中肋が2進むごとに1下がる向きまで外へ回し、中央の葉の下に入れます。どの葉にも、小さな円から葉先へ、白い中肋を一本まっすぐ通します。その左右に、白い葉脈を四本ずつ入れます。一本目は小さな円から、残りの三本は中肋の途中から、上から順に出します。どれも外へふくらんでから下へ向かい、葉の縁に沿って、一つ上の葉脈の内側を通ります。どれも、小さな円と同じ中心の円の上、縁の手前で止めます。上の葉脈は長く、いちばん下の葉脈は短く、葉先には集まりません。白い葉脈はどれも、幅が2だけ違う二つの円の間のすき間です。花穂は、葉の後ろから立ち上がる細い茎です。茎の上に花を一つ、その下に左右一対ずつの花を、短い枝の先につけます。花と花の間、花と茎の間には、白いすき間をあけます。花は三つの円でできたつぼみの形で、丸い頭が一つ、丸い肩が二つです。枝は、幅が2だけ違う二つの円の間の帯で、茎から外へ出て、上へ曲がって花に入ります。左半分を先に作図し、右半分は左右反転させて、その場で作図します。",
  },
  measured: MEASURED,
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
    en: "The same plan as the five-three paulownia with more and smaller florets: seven on the middle spike and five on each of the others. Below the top floret the middle spike has three pairs and each side spike two. The spikes stand a little taller than the five-three paulownia's. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "五三桐と同じ構図で、花を小さくして数を増やし、中央の花穂に七つ、左右の花穂に五つずつつけます。いちばん上の花の下に、中央は三対、左右は二対の花が並びます。花穂は五三桐より少し高くなります。左半分を先に作図し、右半分は左右反転させて、その場で作図します。",
  },
  measured: MEASURED,
  source: { ...BOOK, frame: 38, place: { en: "right page, first row, the leftmost cell: 五七きり", ja: "右頁、一段目、右から四列目（いちばん左）「五七きり」" }, read: READ, measured: true },
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
  measured: MEASURED,
  source: gosanSource,
  build(c) {
    const inner = c.ring("ring-medium");
    c.zoom((inner - RING_GAP) / R);
    kiriBuild(c, GOSAN);
  },
});
