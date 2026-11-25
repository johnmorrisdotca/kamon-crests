// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass.
import { R } from "../construct/geo.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { aoiBuild } from "./drawn/aoi.ts";
import { ichoBuild } from "./drawn/icho.ts";
import { kashiwaBuild as kashiwa3, momijiBuild, omodakaBuild as omodaka3 } from "./drawn/leafy.ts";
import { RING_GAP } from "../construct/builder.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof mitsubaAoi)["build"]>[0];

export const mitsubaAoi = defineCrest({
  id: "mitsuba-aoi",
  name: { en: "Three hollyhock leaves", ja: "三つ葉葵" },
  reading: "みつばあおい",
  romaji: "mitsuba-aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [fam("Tokugawa", "徳川", "とくがわ"), fam("Matsudaira", "松平", "まつだいら")],
  aliases: ["tokugawa", "hollyhock", "aoi", "three-leaf hollyhock", "Mitsuba-aoi", "Tokugawa crest", "Hollyhock crest"],
  construction: {
    en: "Three heart-shaped leaves a third of a turn apart, each with its point at the centre and its two round lobes outside, white stems between them. Every edge is an arc of a compass circle or a ruled line: each lobe is one circle, its straight side a line through two grid points, and its veins arcs and lines 1.7 wide that fork towards shared points on the edge. Between the two lobes a black spindle runs up the leaf's axis from near the centre and ends in a point at the notch; beside it the outline rolls into a curl with a hook.",
    ja: "心形の葉を三枚、120度ずつ離し、葉先を中心に、二つの丸い葉の耳を外側に向けて置き、葉の間を白い茎で分けます。すべての縁はコンパスの円の弧か、定規の直線です。葉の耳は一つの円、まっすぐな辺は二つの格子点を通る直線、葉脈は幅1.7の弧と直線で、縁の同じ点に向かって枝分かれします。二つの耳の間には、中心近くから葉の軸に沿って黒い紡錘形が伸び、切れ込みで尖って終わります。その横で、葉の輪郭が鉤のついた渦に巻き込みます。",
  },
  build(c) {
    aoiBuild(c, false);
  },
});

export const maruNiMitsubaAoi = defineCrest({
  id: "maru-ni-mitsuba-aoi",
  name: { en: "Three hollyhock leaves in a circle", ja: "丸に三つ葉葵" },
  reading: "まるにみつばあおい",
  romaji: "maru ni mitsuba-aoi",
  frame: "ring-medium",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [fam("Tokugawa", "徳川", "とくがわ"), fam("Matsudaira", "松平", "まつだいら")],
  aliases: ["tokugawa ring", "Tokugawa crest", "Hollyhock crest"],
  construction: {
    en: "The three hollyhock leaves inside a ring about a tenth of the diameter thick (100 and 81 about the centre). Each leaf's black spindle widens above the notch into a wedge that joins the ring, with a white horn either side of it between the lobe and the ring.",
    ja: "三つ葉葵を、直径の約10分の1の太さの輪（中心から100と81の円）の中に収めます。各葉の黒い紡錘形は、切れ込みの上でくさび形に広がって輪につながり、その両側、葉の耳と輪の間に白い角の形が残ります。",
  },
  build(c) {
    aoiBuild(c, true);
  },
});

const kashiwaBuild = (c: B, reach: number): void => kashiwa3(c, "oak", reach);

export const mitsuGashiwa = defineCrest({
  id: "mitsu-gashiwa",
  name: { en: "Three oak leaves", ja: "三つ柏" },
  reading: "みつがしわ",
  romaji: "mitsu-gashiwa",
  frame: "none",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [fam("Yamauchi (Tosa)", "山内", "やまうち")],
  aliases: ["kashiwa", "oak", "three oak leaves"],
  construction: {
    en: "Three oak leaves a third of a turn apart, their stalks at the centre. A leaf's smooth edge is five circles: one at the top, a shoulder each side and a foot each side. A white midrib runs up it, and three white veins each side leave the midrib low, bow out beside the edge and run up towards the top, each an arc. A small disc sits in a white ring where the leaves meet.",
    ja: "柏の葉を三枚、葉柄を中心に集めて120度ずつ離して置きます。葉のなめらかな縁は五つの円（上に一つ、左右の肩に一つずつ、左右の下に一つずつ）でできます。白い中肋を一本通し、左右三本ずつの白い葉脈を、中肋の下の方から縁に沿ってふくらませ、上へ向かわせます。葉脈はどれも弧です。葉が集まるところに、白い輪の中の小さな円を置きます。",
  },
  build(c) {
    kashiwaBuild(c, R);
  },
});

export const maruNiMitsuGashiwa = defineCrest({
  id: "maru-ni-mitsu-gashiwa",
  name: { en: "Three oak leaves in a circle", ja: "丸に三つ柏" },
  reading: "まるにみつがしわ",
  romaji: "maru ni mitsu-gashiwa",
  frame: "ring-medium",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [fam("Yamauchi (Tosa)", "山内", "やまうち")],
  aliases: ["kashiwa in ring"],
  construction: {
    en: "The three oak leaves inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に三つ柏を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kashiwaBuild(c, inner - RING_GAP);
  },
});

const omodakaBuild = (c: B, reach: number): void => omodaka3(c, "sword-leaf", reach);

export const omodaka = defineCrest({
  id: "omodaka",
  measured: "The standing water plantain of the 1892 crest book (frame 14, 立ちおもだか), with two present-day drawings of it and of the ringed crest for comparison, in units of a lobe's length from the centre ring to its tip. The three lobes are one length in all three. The upright lobe is 0.55 to 0.58 as wide as it is long, widest a little over a third of the way up, and each edge is close to one arc of 0.87. The lower lobes stand 49 to 53 degrees from straight down in the book and 41 to 45 in the present-day drawings; here they are 45. The ring at the centre is 0.07 across, the white round it and the white veins about 0.02 wide. The middle stem is 0.06 wide, the outer two 0.04 and bowed outward. In the book and in the present-day drawings the lower lobes bend outward a little and are fuller above the vein than below it; here each is the upright lobe turned.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, second row, third column: 立ちおもだか (measured, and drawn afresh with compass and ruler)", ja: "右頁、二段目の三列目「立ちおもだか」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  name: { en: "Standing water plantain", ja: "立ち沢瀉" },
  reading: "たちおもだか",
  romaji: "tachi omodaka",
  frame: "none",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの"), fam("Fukushima", "福島", "ふくしま")],
  aliases: ["arrowhead", "sagittaria", "water plantain"],
  construction: {
    en: "A leaf of three pointed lobes of one size about a small ring at the centre: one upright, and one down to each side, 45 degrees from straight down. Each lobe is the lens between two arcs of one radius, with a white vein from the ring towards its tip. The upright lobe is built in full, and the other two are built the same way where they stand. A spray of five three-petalled flowers stands each side of the leaf, and three stems hang under it: the middle one straight and thickest, the outer two thin and bowed outward.",
    ja: "真ん中の小さな輪から、先のとがった同じ大きさの裂片を三つ出します。一つはまっすぐ上、あとの二つは左右の下向きで、真下から45度ずつ開きます。裂片はどれも、同じ半径の二つの弧にはさまれた形で、輪から裂片の先へ白い葉脈を一本通します。上の裂片を先に最後まで作図し、あとの二つは、同じ作図をそれぞれ立つ場所でそのまま行います。葉の左右に、花びら三枚の花を五つ付けた枝を一本ずつ立てます。葉の下には茎を三本垂らします。真ん中の茎はまっすぐで一番太く、外の二本は細く、外へ弓なりに曲がります。",
  },
  build(c) {
    omodakaBuild(c, R);
  },
});

export const maruNiOmodaka = defineCrest({
  id: "maru-ni-omodaka",
  measured: "The ringed water plantain of the 1892 crest book (frame 14, 丸に沢瀉) and a present-day drawing of 丸に立ち沢瀉 for comparison, measured as the standing water plantain with no ring is. The ring and the white inside it are the package's measured ones; the leaf reaches the same 0.79 of the radius as every ringed crest.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, third row, third column: 丸に沢瀉 (measured, and drawn afresh with compass and ruler)", ja: "右頁、三段目の三列目「丸に沢瀉」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  name: { en: "Standing water plantain in a circle", ja: "丸に立ち沢瀉" },
  reading: "まるにたちおもだか",
  romaji: "maru ni tachi omodaka",
  frame: "ring-medium",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの")],
  aliases: ["omodaka ring"],
  construction: {
    en: "The standing water plantain inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に立ち沢瀉を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    omodakaBuild(c, inner - RING_GAP);
  },
});

export const mitsuIcho = defineCrest({
  id: "mitsu-icho",
  name: { en: "Three ginkgo leaves", ja: "三つ銀杏" },
  reading: "みついちょう",
  romaji: "mitsu ichō",
  frame: "none",
  motifs: [{ motif: "ginkgo", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["ginkgo", "gingko", "maidenhair", "icho", "ichō", "銀杏"],
  construction: {
    en: "Three fan-shaped leaves a third of a turn apart round a hub, filling a circle. Thirty equal small circles on one circle make the wavy edge. Between the leaves, three white lenses run from the hub to the edge, each two equal arcs. Each leaf has a ruled middle vein, an arc vein each side of it, and two small curls where its edge rolls into a loop.",
    ja: "扇形の葉を三枚、芯の円のまわりに120度ずつ離して置き、全体を円に収めます。一つの円周上に同じ大きさの小円を三十並べて、波打つ縁を作ります。葉の間には、同じ半径の二つの弧でできた白いレンズ形を、芯から縁まで三つ通します。各葉には、定規で引いた中央の葉脈、その左右に弧の葉脈、縁が小さな輪に巻き込む渦を二つ入れます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 5, place: { en: "left page, second row, first column: 三ついてふ (measured, and drawn afresh with compass and ruler)", ja: "左頁、二段目の一列目「三ついてふ」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  build(c) {
    ichoBuild(c, R);
  },
});

export const maruNiMitsuIcho = defineCrest({
  id: "maru-ni-mitsu-icho",
  name: { en: "Three ginkgo leaves in a circle", ja: "丸に三つ銀杏" },
  reading: "まるにみついちょう",
  romaji: "maru ni mitsu ichō",
  frame: "ring-medium",
  motifs: [{ motif: "ginkgo", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["ginkgo ring", "icho"],
  construction: { en: "The three ginkgo leaves inside a ring about a tenth of the diameter thick, a narrow white line between the ring and their wavy edge.", ja: "直径の約10分の1の太さの輪の中に三つ銀杏を収め、輪と波打つ縁の間に細い白線を残します。" },
  build(c) {
    const inner = c.ring("ring-medium");
    ichoBuild(c, inner - RING_GAP);
  },
});

export const momiji = defineCrest({
  id: "momiji",
  measured: "The maple leaf of the 1892 crest book (frame 44, 紅葉), in units of its top lobe's length from the point its veins run to: the lobes stand 0, 41, 74 and 123 degrees from upright and are 1, 0.89, 0.75 and 0.55 long; the gaps between them reach in to 0.50, 0.47 and 0.34 of that length from that point, and the lowest two lobes meet 0.15 under it. A present-day drawing of 一つ楓 was measured for comparison: its lobes stand 0, 49, 94 and 132 degrees from upright and are 1, 0.86, 0.62 and 0.45 long, each about a third as wide as it is long; it has a small ring where the veins meet (0.07 across, with a white line round it), veins from the ring to every tip, and a stem 0.2 long that widens to its flat end. The lobes' directions and lengths here are the book's. The ring, the veins from it to every tip and the short stem are as the present-day drawing has them: the book has a white arc across the foot, veins that start from that arc, and a broad stem.",
  name: { en: "Maple leaf", ja: "紅葉" },
  reading: "もみじ",
  romaji: "momiji",
  frame: "none",
  motifs: [{ motif: "maple", count: 7, arrangement: "radial" }],
  families: [],
  aliases: ["maple", "kaede", "autumn leaf"],
  construction: {
    en: "Seven pointed lobes about a small ring low on the leaf, each the lens between two arcs of one radius: the top one the longest, and each pair shorter down to the lowest two, with deep, narrow gaps between them. A straight white vein runs from the ring towards every tip. A short stem hangs under the ring, a little wider at its flat end.",
    ja: "葉の下の方にある小さな輪のまわりに、先のとがった七つの裂片を広げます。裂片はどれも、同じ半径の二つの弧にはさまれた形です。一番上が一番長く、左右の組は下へいくほど短くなり、裂片の間は深く細く切れこみます。輪からそれぞれの裂片の先へ、まっすぐな白い葉脈を一本ずつ通します。輪の下に短い茎を垂らし、平らな切り口の方を少し太くします。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, first column: 紅葉 (measured, and drawn afresh with compass and ruler)", ja: "左頁、三段目の一列目「紅葉」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  build(c) {
    momijiBuild(c, "maple", R);
  },
});
