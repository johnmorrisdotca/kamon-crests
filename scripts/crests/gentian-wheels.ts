import { SHINSEN_MONCHO } from "./books.ts";
import { asagaoRindoBuild, maruNiFutatsuRindoBuild, rindoBishiBuild } from "./drawn/gentian-wheels.ts";
import { defineCrest } from "./util.ts";

export const asagaoRindo = defineCrest({
  id: "asagao-rindo",
  name: { en: "Morning-glory gentian", ja: "朝顔竜胆" },
  reading: "あさがおりんどう",
  romaji: "asagao rindō",
  frame: "none",
  motifs: [{ motif: "gentian", count: 8, arrangement: "radial" }],
  families: [],
  aliases: ["あさがほりんだう"],
  construction: {
    en: "Eight faceted petals surround a round heart. The white cuts are ruled, with narrow necks that spread towards the rim. Eight angular points stand outside the broad band.",
    ja: "角のある花びら八枚で丸い中心を囲みます。白く抜く切れ目を定規で引き、細い根元から外側へ広げます。太い輪の外には角のある先を八つ置きます。",
  },
  measured: "The crest is about 307 pixels wide over the external points. The rim is about 253 pixels across, its centre opening about 207 and the heart about 40. The drawing uses a 192-wide layout with rim 156, field 128.4 and heart 23.6. Eight equal angular units replace the source's slight differences in length and alignment.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, fourth row, fourth column from the right: あさがほりんだう", ja: "右頁、四段目、右から四列目「あさがほりんだう」" }, read: "2026-11-26", measured: true },
  build: asagaoRindoBuild,
});

export const rindoBishi = defineCrest({
  id: "rindo-bishi",
  name: { en: "Gentian lozenge", ja: "竜胆菱" },
  reading: "りんどうびし",
  romaji: "rindōbishi",
  frame: "none",
  motifs: [{ motif: "gentian", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["りんだうびし"],
  construction: {
    en: "Two small pointed flowers stand inside a lozenge. Each joins an angled stem. Two long lance-shaped leaves meet on the upright axis, with a white vein inside each.",
    ja: "菱の中に先のとがった小花を二つ置き、斜めの茎につなげます。縦の軸で細長い葉二枚を合わせ、各葉に白い脈を入れます。",
  },
  measured: "The print spans about 306 pixels by 245. Each flower is about 80 pixels across, and the two central leaves run from the middle towards the top and bottom points. The layout uses 192 by 154, flowers approximately 48 across and an opposing pair of lens-shaped leaves. The two halves are related by a half-turn.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, first row, fourth column from the right: りんだうびし", ja: "右頁、一段目、右から四列目「りんだうびし」" }, read: "2026-11-26", measured: true },
  build: rindoBishiBuild,
});

export const maruNiFutatsuRindo = defineCrest({
  id: "maru-ni-futatsu-rindo",
  name: { en: "Two gentians in a circle", ja: "丸に二つ竜胆" },
  reading: "まるにふたつりんどう",
  romaji: "maru ni futatsu rindō",
  frame: "ring-medium",
  motifs: [{ motif: "gentian", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["丸に二ッりんだう"],
  construction: {
    en: "Two pointed gentian flowers face in opposite directions. Two lens-shaped leaves extend sideways from the round heart. White veins divide the flowers and leaves inside the ring.",
    ja: "先のとがった竜胆の花二輪を反対向きに置きます。丸い中心からレンズ形の葉を左右に伸ばします。輪の中で、白い脈が花と葉を分けます。",
  },
  measured: "The printed ring is about 300 pixels in diameter. Each flower spans roughly 131 pixels, and the side points of the leaves are about 240 apart. The drawing uses the package medium ring, two flowers each about 71 across and a pair of leaves that reach to 73 from the centre. The fine central veins are white.",
  source: { ...SHINSEN_MONCHO, frame: 13, place: { en: "right page, third row, second column from the right: 丸に二ッりんだう", ja: "右頁、三段目、右から二列目「丸に二ッりんだう」" }, read: "2026-11-26", measured: true },
  build: maruNiFutatsuRindoBuild,
});
