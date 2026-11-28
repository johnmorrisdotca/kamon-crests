import { RING_GAP } from "../construct/builder.ts";
import { R } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { bookArrowRowsBuild, itowaMitsuYaBuild, ringedCrossedYahazuBuild, ringedRowYahazuBuild } from "./drawn/arms.ts";
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

export const chuwaNiMitsuYahazu = defineCrest({
  id: "chuwa-ni-mitsu-yahazu",
  name: { en: "Three arrow nocks in a medium ring", ja: "中輪に三つ矢筈" },
  reading: "ちゅうわにみつやはず",
  romaji: "chuwa ni mitsu yahazu",
  frame: "ring-medium",
  motifs: [{ motif: "arrow-nock", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["中三ッ矢はづ", "three nocks side by side in a ring"],
  construction: {
    en: "Three slender nocks stand upright side by side inside a medium ring, each notched at the top and pointed at the foot. Their sides narrow a little downwards, so neighbouring prongs almost meet at the top and the gaps open towards the foot. The outer prongs come a narrow white line from the ring.",
    ja: "中輪の中に細い矢筈を三つ、まっすぐに並べます。どれも上に切れ込み、下はとがらせます。左右の辺は下へ行くほど少し狭くなるので、隣の矢筈とは上の角が近づき、下ではすき間が開きます。外側の角は輪から細い白線一本分離します。",
  },
  measured: "The book's three nocks averaged, in its pixels: from the point to the prongs' tips 177, the tips 34.2 out, the notch's foot 160.4 up from the point, the corners beside the point 27.6 out and 12.6 up. So the sides lean in 0.040 for each unit down, the notch's lines rise 0.485 and the point's 0.457. The nocks stand 71.7 apart, their group on the ring's centre, and the outer prongs' tips about 132 from the centre against the inner ring's 136. The book draws the ring as two lines 0.1226 of its radius apart, its inner edge 136 from the centre against the outer 155, and the ring here is drawn at that width; the group sits 3.5 below the ring's centre, its outer prongs a white of about 4 inside the ring, as in the cell.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, fourth row, third column from the right: 中三ッ矢はづ", ja: "左頁、四段目、右から三列目「中三ッ矢はづ」" }, read: READ, measured: true },
  build(c) {
    // The ring at the cell's own width, 0.1226 of its radius, and the nocks' outer prongs the cell's narrow white of 2.5 inside it.
    ringedRowYahazuBuild(c, c.ring("ring-medium", R, 0.1226 * R) - 2.5);
  },
});

export const sanbonNarabiYa = defineCrest({
  id: "sanbon-narabi-ya",
  name: { en: "Three arrows side by side", ja: "三本並び矢" },
  reading: "さんぼんならびや",
  romaji: "sanbon narabi ya",
  frame: "none",
  motifs: [{ motif: "arrow", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["三本並矢", "three parallel fletched arrows"],
  construction: {
    en: "Three upright feathered shafts share a top and bottom. The white bands rise towards the outer edges of each vane, while neighbouring vanes reach towards each other at their top corners.",
    ja: "三本の矢の軸を立て、上下をそろえます。白い線はそれぞれの羽の外側に向かって上がり、隣り合う羽の上の角を近づけます。",
  },
  measured: "The printed shafts are nearly 104 pixels apart. On the drawing's working scale they are set 82 units apart, and balanced about the middle shaft. The two ends of each vane and its stripe groups have the same diagonal slope. The slightly unequal left and right margins of the printed group are balanced about the middle shaft.",
  source: { ...SHINSEN_MONCHO, frame: 29, place: { en: "left page, third row, second column from the right: 三本並矢", ja: "左頁、三段目、右から二列目「三本並矢」" }, read: READ, measured: true },
  build(c) {
    bookArrowRowsBuild(c, "arrow", R, [-82, 0, 82]);
  },
});
