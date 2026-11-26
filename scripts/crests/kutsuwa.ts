import { SHINSEN_MONCHO } from "./books.ts";
import { futoKutsuwaBuild, hanaKutsuwaBuild, kakuKutsuwaBuild, maruNiKutsuwaBuild, uchidaKutsuwaBuild, kageNoKutsuwaBuild, nejiKutsuwaBuild } from "./drawn/kutsuwa.ts";
import { defineCrest } from "./util.ts";

export const futoKutsuwa = defineCrest({
  id: "futo-kutsuwa",
  name: { en: "Thick horse bit", ja: "太轡" },
  reading: "ふとくつわ",
  romaji: "futo kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ふとくつわ"],
  construction: {
    en: "A solid disc has four small openings cut in quadrants, leaving a broad cross and a wide shoulder of ink around it.",
    ja: "円盤を十字で四つに分けた各部分に、小さな穴を白く抜きます。広い十字と、その外側を囲む太い縁を残します。",
  },
  measured: "The printed circle is about 148 in radius and the openings extend about 61 from the middle. The cross is made a little wider than one fifth of the radius.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, third row, second column from the right: ふとくつわ", ja: "左頁、三段目、右から二列目「ふとくつわ」" }, read: "2026-11-26", measured: true },
  build: futoKutsuwaBuild,
});

export const hanaKutsuwa = defineCrest({
  id: "hana-kutsuwa",
  name: { en: "Flower horse bit", ja: "花轡" },
  reading: "はなくつわ",
  romaji: "hana kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["花くつわ"],
  construction: {
    en: "The broad cross of a horse bit reaches across four quadrant openings. A circular rim holds the ends of the cross.",
    ja: "轡の広い十字で四つの穴を区切ります。十字の四つの端を丸い縁でつなぎます。",
  },
  measured: "The four openings reach about 103 out to the curved edge within the printed radius of about 153. Their corners and the arms of the cross line up on the centre axes.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, second row, second column from the right: 花くつわ", ja: "左頁、二段目、右から二列目「花くつわ」" }, read: "2026-11-26", measured: true },
  build: hanaKutsuwaBuild,
});

export const maruNiKutsuwa = defineCrest({
  id: "maru-ni-kutsuwa",
  name: { en: "Horse bit in a circle", ja: "丸に轡" },
  reading: "まるにくつわ",
  romaji: "maru ni kutsuwa",
  frame: "ring-medium",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["丸にくつわ"],
  construction: {
    en: "A circular bit with four rounded openings sits inside a ring. The narrow white space follows the edges of both circles.",
    ja: "丸みのある四つの穴を持つ轡を輪の中に収めます。二つの円の縁に沿って細い白いすき間を残します。",
  },
  measured: "The cell uses one ring, a large circle for the face of the bit and four relatively open quarter-circle apertures. The layout uses the standard medium ring and central white gap.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, third row, third column from the right: 丸にくつわ", ja: "左頁、三段目、右から三列目「丸にくつわ」" }, read: "2026-11-26", measured: true },
  build: maruNiKutsuwaBuild,
});

export const kakuKutsuwa = defineCrest({
  id: "kaku-kutsuwa",
  name: { en: "Square horse bit", ja: "角轡" },
  reading: "かくくつわ",
  romaji: "kaku kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["角くつわ"],
  construction: {
    en: "A rounded square contains four small square openings. Two ruled axes align the openings in pairs.",
    ja: "角を丸めた四角に、小さな四角を四つ白く抜きます。定規で引いた二本の軸に沿って二つずつ並べます。",
  },
  measured: "The printed body is about 229 wide. Its four openings are each about 37 wide, with their centres about 41 to either side of the two axes. The outer corners are balanced with one compass width.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, first row, third column from the right: 角くつわ", ja: "左頁、一段目、右から三列目「角くつわ」" }, read: "2026-11-26", measured: true },
  build: kakuKutsuwaBuild,
});

export const uchidaKutsuwa = defineCrest({
  id: "uchida-kutsuwa",
  name: { en: "Uchida horse bit", ja: "内田轡" },
  reading: "うちだくつわ",
  romaji: "uchida kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["内田くつわ"],
  construction: {
    en: "Four round eyes sit on the broad outer band at the ends of the cross. A narrow white circle separates the band from the four-opening inner bit.",
    ja: "広い外縁の上下左右に丸い環を四つ付けます。細い白い筋で、外縁と四つ穴の轡を分けます。",
  },
  measured: "There are four rounded peripheral eyes and four quarter-circle openings. The slightly uneven eye positions in the print are aligned to the axes. The outer band is part of the bit and carries the eyes.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, second row, third column from the right: 内田くつわ", ja: "左頁、二段目、右から三列目「内田くつわ」" }, read: "2026-11-26", measured: true },
  build: uchidaKutsuwaBuild,
});

export const kageNoKutsuwa = defineCrest({
  id: "kage-no-kutsuwa",
  name: { en: "Outlined horse bit", ja: "陰の轡" },
  reading: "かげのくつわ",
  romaji: "kage no kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["かげのくつワ"],
  construction: {
    en: "The outline of the horse bit leaves four white quadrant openings and a white cross. Fine paired lines follow the curved edges of each opening.",
    ja: "轡の輪郭を描き、四つの穴と十字を白く残します。それぞれの穴の弧と直線に沿って細い二重の線を置きます。",
  },
  measured: "The printed cell names the outlined treatment. Its four openings are individually double lined, with a heavier outer contour. The slight differences between the four corners are balanced.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, fourth row, second column from the right: かげのくつワ", ja: "左頁、四段目、右から二列目「かげのくつワ」" }, read: "2026-11-26", measured: true },
  build: kageNoKutsuwaBuild,
});

export const nejiKutsuwa = defineCrest({
  id: "neji-kutsuwa",
  name: { en: "Twisted horse bits", ja: "捻じ轡" },
  reading: "ねじくつわ",
  romaji: "neji kutsuwa",
  frame: "none",
  motifs: [{ motif: "horse-bit", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["捻ぢくつワ"],
  construction: {
    en: "Three round bits overlap in a triangle. The upper cross stands upright while the two lower crosses turn in opposite directions.",
    ja: "丸い轡を三つ、三角形に重ねます。上の十字を直立させ、下の二つの十字を互いに反対向きに傾けます。",
  },
  measured: "The overlapping bits leave four curved openings on the forward disc. The front edge obscures part of the upper and left discs. The crossing angles and narrow gaps follow the printed arrangement.",
  source: { ...SHINSEN_MONCHO, frame: 26, place: { en: "left page, first row, second column from the right: 捻ぢくつワ", ja: "左頁、一段目、右から二列目「捻ぢくつワ」" }, read: "2026-11-26", measured: true },
  build: nejiKutsuwaBuild,
});
