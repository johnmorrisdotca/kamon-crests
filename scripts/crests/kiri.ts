// The paulownia 桐: three leaves below, and three upright spikes above, each a thin stalk with a bud on its top and pairs of
// buds below it, the middle one the tallest. Struck with compass and ruler (scripts/crests/drawn/kiri.ts); its proportions
// were measured from a public-domain Meiji crest book (see each crest's source and docs/provenance.md).
import { R } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { GOSAN, GOSHICHI, kiriBuild } from "./drawn/kiri.ts";
import { defineCrest, fam } from "./util.ts";
import type { BookSource } from "./types.ts";
import { READ, SHINSEN_MONCHO as BOOK } from "./books.ts";

const gosanSource: BookSource = { ...BOOK, frame: 38, place: { en: "left page, third row, the leftmost cell: 丸に五三きり, its ring left out", ja: "左頁、三段目、いちばん左「丸に五三きり」（輪は除く）" }, read: READ, measured: true };

const MEASURED =
  "Read from two cells of the 1892 crest book (frame 38), as parts of the crest's half-width (88 of the layout's 100), upward from the joint, by eye off enlarged crops, so good to a few parts. Its 五七きり (right page, first row, the leftmost cell): the middle spike is a stalk 78 high with a three-lobed bud on its top (about 19 high and 26 wide, drawn in outline) and three florets down each side of it, about 55, 40 and 24 up, each on a short curved stem and reaching about 30 from the stalk at the foot; the side spikes stand 53 to 55 out and 55 to 63 high, with two florets a side reaching about 17. Its 丸に五三きり (left page, third row, the leftmost cell), squeezed into its ring: the middle spike 90 high with two florets a side, the side spikes 59 out and 65 high with one a side. The veins, from the same two cells: in the middle leaf a midrib from the joint to the tip and three or four lines each side that leave the joint or the midrib at a narrow angle and sweep down toward the tip; in a side leaf a rib from the joint with lines either side that sweep on to the leaf's end. Ours: the middle spike 75 high in 五三桐 and 78 in 五七桐, its lowest buds reaching 27 and 20 from the stalk; the side spikes 56 out, 52 high in 五三桐 and 58 in 五七桐; a midrib and three veins a side in every leaf. The book's florets are scalloped lumps that touch one another; ours are buds of three discs with white between them, as the crest is drawn solid. The book's side leaves start at the joint itself; ours keep the package's leaf, whose base lies 26 from the joint under the middle leaf's shoulder, so their veins gather there. Nothing is taken from Wikimedia Commons or from any modern book.";

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
    en: "Three broad leaves below, the middle one hanging and the two beside it spread; above them three upright spikes, five florets on the middle one and three on each of the others. A leaf is a rounded heart: its two upper edges are one compass width mirrored, and round its body are five scallops of one width. A white midrib runs from the leaf's base to its tip. On each side of it three white veins leave the base and sweep out and down toward the tip, one inside the other, following the leaf's outline; each is the white between two circles two apart, and each stops on a circle about the base, short of the edge. The middle leaf's base is the small circle where the leaves meet, and a side leaf's base lies just beside it. A spike is a thin upright stalk that rises from behind the leaves, with one floret on its top and pairs of florets below it on short side stems, each clear of its neighbours and of the stalk. A floret is a bud of three discs: a round head and two round shoulders. A side stem is the band between two circles two apart: it leaves the stalk outwards and turns up into the bud. The side leaves are the same plan at four fifths, turned out and passing under the middle leaf. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "下に広い葉を三枚、中央の葉は垂らし、左右の葉は広げます。その上に花穂を三本立て、中央に五つ、左右に三つずつ花をつけます。葉は丸みのあるハート形です。上の左右の縁は同じ幅の円で、まわりに同じ幅の丸い裂片を五つ並べます。葉の付け根から葉先へ、白い葉脈を一本まっすぐ通します。その左右に三本ずつ、白い葉脈を付け根から出し、外へふくらませてから葉先のほうへ下ろします。三本は内側から外側へ順に並び、葉の輪郭に沿います。白い葉脈はどれも、幅が2だけ違う二つの円の間のすき間で、付け根を中心にした円のところ、縁の手前で止めます。中央の葉の付け根は、三枚の葉が集まる小さな円です。左右の葉の付け根は、そのすぐ横にあります。花穂は、葉の後ろから立ち上がる細い茎です。茎の上に花を一つ、その下に左右一対ずつの花を、短い枝の先につけます。花と花の間、花と茎の間には、白いすき間をあけます。花は三つの円でできたつぼみの形で、丸い頭が一つ、丸い肩が二つです。枝は、幅が2だけ違う二つの円の間の帯で、茎から外へ出て、上へ曲がって花に入ります。左右の葉は同じ形を五分の四の大きさにして外へ回し、中央の葉の下に入れます。左半分を先に作図し、右半分は左右反転させて、その場で作図します。",
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
  source: { ...BOOK, frame: 38, place: { en: "right page, first row, the leftmost cell: 五七きり", ja: "右頁、一段目、いちばん左「五七きり」" }, read: READ, measured: true },
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
