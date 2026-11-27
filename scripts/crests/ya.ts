import { RING_GAP } from "../construct/builder.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { bookArrowRowsBuild, itowaMitsuYaBuild, ringedCrossedYahazuBuild } from "./drawn/arms.ts";
import { defineCrest } from "./util.ts";

const READ = "2026-11-27";

export const maruNiIpponYa = defineCrest({
  id: "maru-ni-ippon-ya",
  name: { en: "One arrow in a circle", ja: "丸に一本矢" },
  reading: "まるにいっぽんや",
  romaji: "maru ni ippon ya",
  frame: "ring-medium",
  motifs: [{ motif: "arrow", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["single fletched arrow in a ring"],
  construction: {
    en: "An upright shaft carries a straight-edged vane to either side. Two groups of diagonal white lines follow the slant of the vanes, and the ends of the shaft approach the ring.",
    ja: "縦の軸の左右に直線で囲んだ羽を置きます。羽の傾きに沿って白い線を上下に入れ、軸の両端を輪の内側に近づけます。",
  },
  measured: "The upright shaft spans the inner circle. Each vane is about a fifth of its length wide, with a shallow slope at its ends. The two slanted bands are separated by the blank middle of each vane.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "right page, third row, fourth column from the right: 丸ニ一本矢", ja: "右頁、三段目、右から四列目「丸ニ一本矢」" }, read: READ, measured: true },
  build(c) {
    bookArrowRowsBuild(c, "arrow", c.ring("ring-medium") - RING_GAP, [0]);
  },
});

export const itowaNiMitsuYa = defineCrest({
  id: "itowa-ni-mitsu-ya",
  name: { en: "Three arrows in a thread ring", ja: "糸輪に三つ矢" },
  reading: "いとわにみつや",
  romaji: "itowa ni mitsu ya",
  frame: "ring-thread",
  motifs: [{ motif: "arrow", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["糸ニ三ッ矢"],
  construction: {
    en: "Three short fletched shafts spread from a small pierced hub, with the top shaft upright. Each reaches almost to the thread ring, its two white bands following the slanted ends of the vanes.",
    ja: "小さな穴のある中心から三本の矢羽を放射状に置き、一本を真上に向けます。羽の斜めの端と平行に白い線を二か所に入れ、先を糸輪に近づけます。",
  },
  measured: "The three axes meet at 120 degrees. The two off-centre shafts use the same proportions as the upright one. Its vanes begin just outside the central hub and widen towards the rim.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, first row, second column from the right: 糸ニ三ッ矢", ja: "左頁、一段目、右から二列目「糸ニ三ッ矢」" }, read: READ, measured: true },
  build(c) {
    itowaMitsuYaBuild(c, c.ring("ring-thread") - RING_GAP);
  },
});

export const maruNiChigaiYahazu = defineCrest({
  id: "maru-ni-chigai-yahazu",
  name: { en: "Crossed arrow nocks in a circle", ja: "丸に違い矢筈" },
  reading: "まるにちがいやはず",
  romaji: "maru ni chigai yahazu",
  frame: "ring-medium",
  motifs: [{ motif: "arrow-nock", count: 2, arrangement: "crossed" }],
  families: [],
  aliases: ["丸ニちがひ矢はづ"],
  construction: {
    en: "Two broad, notched pieces cross on diagonals inside the ring. The piece that rises to the right passes over the other with a narrow line of white between them.",
    ja: "幅の広い矢筈を二つ斜めにして輪の中で交差させます。右上がりの矢筈を手前に置き、重なりに細い白を残します。",
  },
  measured: "The two nocks lean half a right angle from upright and cross in the middle of the field. They reuse the package's existing ruled nock, scaled together to the field of the original ring.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, first row, fourth column from the right: 丸ニちがひ矢はづ", ja: "左頁、一段目、右から四列目「丸ニちがひ矢はづ」" }, read: READ, measured: true },
  build(c) {
    ringedCrossedYahazuBuild(c, c.ring("ring-medium") - RING_GAP);
  },
});
