// The paulownia 桐: three leaves below, and three spikes of florets above, each a packed, jagged cone, the middle one the
// tallest. Struck with compass and ruler (scripts/crests/drawn/kiri.ts); its proportions were measured from a public-domain
// Meiji crest book (see each crest's source and docs/provenance.md).
import { R } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { GOSAN, GOSHICHI, kiriBuild } from "./drawn/kiri.ts";
import { defineCrest, fam } from "./util.ts";
import type { BookSource } from "./types.ts";
import { READ, SHINSEN_MONCHO as BOOK } from "./books.ts";

const gosanSource: BookSource = { ...BOOK, frame: 38, place: { en: "left page, third row, first column: 丸に五三きり, its ring left out", ja: "左頁、三段目の一列目「丸に五三きり」（輪は除く）" }, read: READ, measured: true };

const MEASURED =
  "Read as parts of the crest's half-width (88 of the layout's 100), upward from the joint. The book's 五七きり: the middle spike a cone reaching 29 from its stem at its foot and 82 high, the side spikes 53 to 54 out and 60 to 66 high; its 丸に五三きり, squeezed into its ring, is taller still (91). The florets' places were read the same way from two solid paulownias, one of five and three florets and one of seven and five (nos. 1110 and 1119 of a page of paulownia crests in a modern crest dictionary; numbers only, and nothing of its drawing is used): the middle spike 77 to 79 high, its florets reaching 28, 23 and 21 from the stem (28, 23 and a top floret of 14 where there are five); a side spike 56 to 58 out, 57 to 59 high and reaching 21 at its foot; the white of a hook 3 to 4 and the stem 4. Ours: the middle spike 76 high and reaching 27 at its foot, the side spikes 56 out and 52 high, the hook 3 and the stem 4. Ours stand lower than the books' because the lowest florets rest on our leaves, which hang lower from the joint.";

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
    en: "Three broad leaves below, the middle one hanging and the two beside it spread, each with its midrib and veins; above them three upright spikes of florets, five in the middle one and three in each of the others, each spike packed into a jagged cone with no stalk showing. A leaf is a rounded heart: its two upper edges are one compass width mirrored, and round its body are five scallops of one width. Its veins leave the midrib on both sides and bow toward the tip, each the white between two circles two apart, and stop short of the edge. A floret is a disc beside the stem, its outer edge bitten twice by a small circle into three teeth. A white hook three wide runs over its top and down beside the stem: the white between the floret's circle and one three wider, then between two ruled lines, stopping on a circle struck on the stem, so that the floret hangs from the stem by its foot. Each floret lies over the one above it. The top floret is a disc on the stem, its top bitten four times into five points. The side leaves are the same plan at four fifths, turned out on a 5-12-13 triangle, and pass under the middle leaf. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "下に広い葉を三枚、中央の葉は垂らし左右の葉は広げて、それぞれ葉脈を入れます。その上に花穂を三本立て、中央に五つ、左右に三つずつ花をつけます。花はすき間なく重ねて、ぎざぎざの円すい形にまとめ、茎は外に見せません。葉は丸みのあるハート形です。上の左右の縁は同じ幅の円で、まわりに同じ幅の丸い裂片を五つ並べます。葉脈は主脈から左右に出て葉先のほうへ弓なりに曲がり、二つの円の間の白いすき間で表し、縁の手前で止めます。花は茎の横に置いた円で、外側の縁を小さな円で二か所切り取り、三つの歯にします。花の上から茎の横へ、幅3の白い線を回します。白い線は、花の円とそれより3大きい円の間のすき間で、茎の横では二本の直線の間を通り、茎の上に描いた円のところで止まります。こうすると、花は根元だけで茎につながります。下の花は、上の花の手前に重ねます。いちばん上の花は茎の上に置いた円で、上の縁を四か所切り取り、五つの山にします。左右の葉は同じ形を五分の四の大きさにして外へ回し、中央の葉の下に入れます。左半分を先に作図し、右半分はその場で左右対称に作図します。",
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
    en: "The same plan as the five-three paulownia with more and smaller florets: seven in the middle spike and five in each of the others. The top floret is bitten twice into three points. The spikes are as tall as the five-three paulownia's. The left half is struck first and the right half is struck in place as its mirror.",
    ja: "五三桐と同じ構図で、花を小さくして数を増やし、中央の花穂に七つ、左右の花穂に五つずつつけます。いちばん上の花は、上の縁を二か所切り取り、三つの山にします。花穂の高さは五三桐と同じです。左半分を先に作図し、右半分はその場で左右対称に作図します。",
  },
  measured: MEASURED,
  source: { ...BOOK, frame: 38, place: { en: "right page, first row, first column: 五七きり", ja: "右頁、一段目の一列目「五七きり」" }, read: READ, measured: true },
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
