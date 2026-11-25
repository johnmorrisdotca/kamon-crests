// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass, ivy, ginger, the nine bamboo-grass leaves, the pine, the clove, the paper-mulberry leaf.
import { R } from "../construct/geo.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { aoiBuild } from "./drawn/aoi.ts";
import { TACHI_AOI, TACHI_AOI_RINGED, tachiAoiBuild } from "./drawn/tachi-aoi.ts";
import { chojiBuild } from "./drawn/choji.ts";
import { kajiBuild } from "./drawn/kaji.ts";
import { ichoBuild } from "./drawn/icho.ts";
import { kashiwaBuild as kashiwa3, momijiBuild, omodakaBuild as omodaka3 } from "./drawn/leafy.ts";
import { myogaBuild } from "./drawn/myoga.ts";
import { matsuBuild } from "./drawn/matsu.ts";
import { kumaiZasaBuild } from "./drawn/sasa.ts";
import { sendaiZasaBuild } from "./drawn/sendai.ts";
import { tsutaBuild } from "./drawn/tsuta.ts";
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

export const tachiAoi = defineCrest({
  id: "tachi-aoi",
  measured: "The 立あふひ of the 1892 crest book (frame 36, left page, row 3, column 3) and a Wikimedia Commons picture of 立ち葵 (Japanese crest Tachi Aoi.svg, public domain), measured as numbers only, in the unit of the hollyhock leaf (the leaf is 99.4 wide and 68.4 long). In the Commons picture the top leaf's tip stands 117 from the point the three leaves turn about and the side leaves' tips 114; the stems are 6 wide; a white line 3 wide parts the upright stem from the right branch; the trunk is 26 wide at its narrowest, and the foot is 92 wide on a base 96 below that point. The book draws the same arrangement by hand and in outline, with the side leaves tilted upwards, rounder leaves with a small curl each side of the stem, and the same white line to the right of the upright stem. Ours keeps the package's hollyhock leaf (straight sides, and large round shoulders at the notch where both pictures have small curls), sets the side leaves level as the Commons picture does, and makes them the top leaf a quarter turn about the centre, 115 out.",
  name: { en: "Standing hollyhock", ja: "立ち葵" },
  reading: "たちあおい",
  romaji: "tachi-aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "upright" }],
  families: [fam("Honda", "本多", "ほんだ")],
  aliases: ["tachi aoi", "upright hollyhock", "standing aoi", "立葵"],
  construction: {
    en: "Three hollyhock leaves on stems that rise from one foot: one leaf upright at the top and one a quarter turn to each side, their tips on the layout circle and their notches towards the centre. The leaf is the three-leaf hollyhock's, with its white veins and its curls. A stem 6 wide comes in between a leaf's two lobes and runs on as the black spindle. The top leaf's stem goes straight down to the base. The left branch leaves its leaf between two arcs and joins the upright stem; the right branch passes behind it, so a white line 3 wide parts the two all the way down. Below the branches the trunk flares into a foot that stands on a level line, each side an arc of a circle 100 wide. The top leaf is built first, then the right leaf and the left leaf where they stand, clockwise, and the stems last.",
    ja: "葵の葉を三枚、一つの根元から立ち上がる茎につけます。一枚は上にまっすぐ立て、残りの二枚は左右に90度ずつ回して置きます。葉先は三枚とも外の円の上にあり、切れ込みは中心を向きます。葉は三つ葉葵と同じで、白い葉脈と渦があります。幅6の茎が二つの耳の間から入り、そのまま黒い紡錘形につながります。上の葉の茎は、根元までまっすぐ下ります。左の枝は、二つの弧にはさまれて葉から出て、まっすぐな茎に合わさります。右の枝は、まっすぐな茎の後ろを通るので、二つの間に幅3の白い線が根元まで残ります。枝の下で幹は左右に広がり、水平な線の上に立つ根元になります。広がりの両側は、幅100の円の弧です。上の葉を作図し、右の葉、左の葉の順に、時計回りにその場で作図して、最後に茎を作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, third row, third column: 立あふひ (measured, and drawn with compass and ruler)", ja: "左頁、三段目の三列目「立あふひ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    tachiAoiBuild(c, "hollyhock", R, TACHI_AOI);
  },
});

export const maruNiTachiAoi = defineCrest({
  id: "maru-ni-tachi-aoi",
  measured: "The 丸に左りはなれ葵 of the 1892 crest book (frame 36, right page, row 4, column 4) and a Wikimedia Commons picture of the Honda house's crest (Japanese crest Honda Tachi Aoi.svg, public domain), measured as numbers only, in the unit of the hollyhock leaf. In the Commons picture the ring is 0.086 of the diameter thick; the tips stand 104 from the centre, 0.75 of the radius; the foot's base is 92 below the centre; the stems are 7 wide and the white line beside the upright stem 4; the left branch's upper edge runs into the upright stem without a corner. Both pictures draw the leaves larger for the ring and closer to the centre than in the crest on its own. The book names its cell a hollyhock in a circle with the left one apart and draws a thin double ring; the Commons picture is the same drawing in a thick ring, named the Honda standing hollyhock. Ours has the ring of the package's ringed crests, and its leaves reach 0.79 of the radius.",
  name: { en: "Standing hollyhock in a circle", ja: "丸に立ち葵" },
  reading: "まるにたちあおい",
  romaji: "maru ni tachi-aoi",
  frame: "ring-medium",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "upright" }],
  families: [fam("Honda", "本多", "ほんだ")],
  aliases: ["honda", "Honda crest", "honda tachi aoi", "本多立ち葵", "丸に立葵"],
  construction: {
    en: "The standing hollyhock inside a ring about a tenth of the diameter thick. The leaves stand closer to the centre than in the crest on its own and the branches are shorter, so that the three leaves fill the ring. The white line between the upright stem and the right branch is 4 wide. The left branch's upper edge touches the upright stem, so the white between the two closes to a point.",
    ja: "立ち葵を、直径の約10分の1の太さの輪の中に収めます。輪のない立ち葵より葉を中心に寄せ、枝を短くして、三枚の葉で輪の中を埋めます。まっすぐな茎と右の枝の間の白い線は、幅4です。左の枝の上の縁は、まっすぐな茎に接します。そのため、二つの間の白は一点で閉じます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "right page, fourth row, fourth column: 丸に左りはなれ葵 (measured, and drawn with compass and ruler)", ja: "右頁、四段目の四列目「丸に左りはなれ葵」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    tachiAoiBuild(c, "hollyhock", inner - RING_GAP, TACHI_AOI_RINGED);
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
  measured: "The leaf's proportions are measured, as numbers only, from a present-day drawing of 一つ楓; no drawing or outline from it is included. In units of the top lobe's length from the small ring where the veins meet: the lobes stand 0, 48, 93 and 132 degrees from upright and are 1, 0.85, 0.61 and 0.45 long, each about a third as wide as it is long and fuller on its upper side; the gaps between them reach in to 0.44, 0.35 and 0.33 from the ring, and the lowest two lobes meet 0.16 under it. The ring is 0.07 across with a white line round it, and the stem hangs to 0.4 under it, widening to its flat end. Ours is within 0.02 of each of these, every lobe the lens between two circles of 87; its veins run straight from the ring to every tip, where the drawing's bow upward, by up to 0.09 in the upper lobes. The crest's period source is the 1892 crest book (frame 44, 紅葉), measured the same way for comparison: its lobes stand 0, 41, 74 and 123 degrees from upright and are 1, 0.89, 0.75 and 0.55 long, and it has a white arc across the foot, veins that start from that arc, and a broad stem.",
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

export const tsuta = defineCrest({
  id: "tsuta",
  measured: "The つた of the 1892 crest book (frame 22, right page, row 4, column 4), measured as numbers only, in units of half the leaf's width. The leaf is 1.15 times as wide as it is tall. The small ring where the veins meet stands 0.22 above the middle and is 0.2 across. The lobe that points down reaches 0.87 below the middle and is as wide as half the leaf; the side lobes are 0.85 tall; the two upper lobes reach 0.87 above the middle and meet in a notch 0.74 up the axis. The book draws the leaf in outline, with an uneven wavy edge and five to seven fine veins a side in each lobe. Ours is solid, as a crest is worn: every scallop of the edge is an arc of a circle on a grid point, each lobe has three veins a side or fewer, and the left half is the right half mirrored. A Wikimedia Commons picture of 蔦 (Japanese crest Tuta.svg) was read for comparison only: the same five lobes, ring and overlaps, three veins a side in the lower lobe, and a leaf about 1.25 times as wide as it is tall.",
  name: { en: "Ivy", ja: "蔦" },
  reading: "つた",
  romaji: "tsuta",
  frame: "none",
  motifs: [{ motif: "ivy", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ivy leaf", "vine"],
  construction: {
    en: "Five round lobes with scalloped edges about a small ring: the largest points down, one reaches out to each side, and two stand above with a white line between them. Each lobe is a round body with smaller circles on grid points along its edge. The lower lobe lies over the side lobes and they over the upper two, with a white line round each. White veins run from the ring and beside each straight middle vein, and end on the lobe's round body. The right half is built in full, then the lower lobe, then the left half where it stands.",
    ja: "小さな輪のまわりに、縁が波打つ丸い裂片を五つ置きます。いちばん大きい裂片を下に向け、左右に一つずつ、上に二つ並べ、上の二つの間は白い線で分けます。裂片はどれも、丸い本体の円と、縁に並べた小さな円でできています。下の裂片は左右の裂片の上に、左右の裂片は上の二つの上に重なり、境目に白い線を残します。白い葉脈は、輪から、そしてまっすぐな中央の葉脈の両側から伸び、本体の円の上で終わります。右半分、下の裂片の順に作図し、左半分はその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, fourth row, fourth column: つた (measured, and drawn with compass and ruler)", ja: "右頁、四段目の四列目「つた」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    tsutaBuild(c, "ivy", R);
  },
});

export const dakiMyoga = defineCrest({
  id: "daki-myoga",
  measured: "The だきめうが of the 1892 crest book (frame 42, right page, row 4, column 3), measured as numbers only, in units of the radius of the circle the two buds' backs make. The tops of the three inner scales cross the axis 0.67 and 0.32 above the centre and 0.06 below it: the first is an arc of radius 0.58, the other two of 0.94. The edges of the outer scales leave the back 38 and 16 degrees above the level line and 9 below it, as arcs of radius about 0.47, 0.66 and 0.66. The white drop between the buds is 0.4 wide and starts 0.05 below the centre; a foot is a knob of radius 0.09. The book draws the crest in outline: each scale has two or three strokes that meet at its tip, the flower has a ragged top, the wedge between the buds is wider on the right than on the left, and the knobs stand a little above the foot of the circle. Ours is solid, as a crest is worn: each scale's strokes are the white outline of a lens, the flower has four round petals, the two sides are mirrored, and the knobs stand on the circle's foot. A Wikimedia Commons picture of 抱き茗荷 (Japanese crest daki Myouga.svg) was read for comparison only: the same round back, layered scales with a mark on each, drop and knobs, with a plain slit and no wedges between the buds, and flowers that stand above the circle.",
  name: { en: "Embracing myoga", ja: "抱き茗荷" },
  reading: "だきみょうが",
  romaji: "daki myōga",
  frame: "none",
  motifs: [{ motif: "ginger", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["ginger", "embracing ginger"],
  construction: {
    en: "Two buds stand face to face, their backs one circle, with a white slit between them that opens into a drop; each ends in a round foot. A bud is three inner scales and four outer ones along its back, a white line between any two and a white lens outline on each, with a flower of four round petals on top. The right bud is built in full, then the left where it stands.",
    ja: "二つのつぼみを向かい合わせに置きます。二つの背中は一つの円になり、間の白いすき間は、下の方でしずく形に広がります。つぼみの下の端は丸いこぶです。つぼみのうろこは、内側に三枚、背中に沿って四枚で、間を白い線で分け、どのうろこにも白い線でレンズ形を一つ描きます。上には丸い花びら四枚の花を置きます。右のつぼみを作図し、左のつぼみはその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 42, place: { en: "right page, fourth row, third column: だきめうが (measured, and drawn with compass and ruler)", ja: "右頁、四段目の三列目「だきめうが」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    myogaBuild(c, "ginger", R);
  },
});

export const kumaiZasa = defineCrest({
  id: "kumai-zasa",
  measured: "The 丸に九枚笹 of the 1892 crest book (frame 37, left page, row 4, column 1), measured as numbers only, in units of the radius of the room inside its ring; the book prints no nine-leaf bamboo grass without a ring. A broad leaf runs from the centre to the ring and is 0.63 across at its widest, 0.6 up. A narrow leaf comes out from under each side of it, 0.24 wide there, and ends in a point on the ring a third of the way round to the next broad leaf. The book draws the leaves in outline; ours are solid, as a crest is worn, with a white midrib in each broad leaf.",
  name: { en: "Nine bamboo-grass leaves", ja: "九枚笹" },
  reading: "くまいざさ",
  romaji: "kumai-zasa",
  frame: "none",
  motifs: [{ motif: "bamboo-grass", count: 9, arrangement: "radial" }],
  families: [],
  aliases: ["bamboo leaves"],
  construction: {
    en: "Three groups of three leaves, a third of a turn apart: a broad leaf from the centre to the outer circle, with a white midrib, and a narrow leaf from under each side of it to a point on the circle. The top group's right half is built in full, then each other half where it stands, clockwise.",
    ja: "三枚ひと組の葉を、120度ずつ離して三組置きます。広い葉は中心から外の円まで立ち、白い葉脈を一本通します。広い葉の左右の下から、細い葉が一枚ずつ出て、外の円の上でとがります。上の組の右半分を最後まで作図し、ほかの半分は、時計回りに、それぞれその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, fourth row, first column: 丸に九枚笹 (measured, and drawn with compass and ruler, without its ring)", ja: "左頁、四段目の一列目「丸に九枚笹」（寸法を測り、輪をのぞいて、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    kumaiZasaBuild(c, "bamboo-grass", R);
  },
});

export const sendaiZasa = defineCrest({
  id: "sendai-zasa",
  measured: "The 仙臺さゝ of the 1892 crest book (frame 38, right page, row 1, column 2), measured as numbers only, in units of the reach of its leaves. The ring of bamboo stands about a point 0.03 under the middle, its band 0.17 to 0.20 across between its outline strokes, the outer one 0.68 out; four joints cross it, and the two stalks' ends cross at the top. Under the ring the two stalks cross, their short cut ends reaching about 0.9 down. The leaves are lenses with a midrib, about two and a half times as long as wide; small leaves lie inside the ring over the birds. Each sparrow's head is 0.10 in radius, by the axis a little under the middle, the two beaks meeting on the axis; its body lies down and out from the head, covered in rows of scales; its wing is a fan of feathers with round tips raised to about 0.3 over the middle, and its striped tail points down to about 0.46 under it. Ours has a band 0.12 across and seven long leaves a side where the book has about fifteen short ones: the count of the leaves and the lighter ring follow the crest as it is usually drawn today, and every shape is the book's.",
  name: { en: "Sendai bamboo and sparrows", ja: "仙台笹" },
  reading: "せんだいざさ",
  romaji: "sendai-zasa",
  frame: "none",
  motifs: [
    { motif: "bamboo-grass", count: 1, arrangement: "ring" },
    { motif: "sparrow", count: 2, arrangement: "facing" },
  ],
  families: [{ en: "Date of Sendai", ja: "仙台伊達家", reading: "せんだいだてけ" }],
  aliases: ["take ni suzume", "bamboo and sparrows", "date", "竹に雀", "たけにすずめ", "伊達笹"],
  construction: {
    en: "A ring of bamboo with long leaves outside it and two sparrows inside, beak to beak. The ring is the band between two circles about a point on the axis a little under the centre, with a white joint across it on each of two lines ruled through that point and two short white lines of grain by each joint. At the top the two stalks' ends cross: two white lines ruled across the ring, crossing on the axis. Under the ring the two stalks cross: each short end lies along a line ruled through two grid points, down to a level line, the left one over the right with a white line either side of it. Outside the ring are seven leaves a side: pairs an eighth of a turn apart, each pair on a short stem that joins it to the ring, and one leaf by each stalk's end. A leaf is the lens between two circles of one width, with a white vein down its middle; a small leaf of the same kind lies inside the ring over each sparrow. Each sparrow stands on a slant. Its head is a circle by the axis, and its body a larger circle down and out from it, each with a white line round it; the scales on the body are white dots in rows about the head's centre. The wing is raised behind the head: a fan of five feathers about one point, a twenty-fourth of a turn each, with white lines between them and a round tip of one width on each. The tail is a narrow fan down from the body's centre with two white stripes. The eye is a white disc with a dot, and the beak is ruled from its point by the axis. The ring is built first, then the leaves where they stand, clockwise, then the right sparrow, and the left sparrow where it stands.",
    ja: "竹の輪の外に長い笹の葉を置き、中に二羽の雀を向かい合わせた紋です。輪は、中心より少し下の、中心線の上の一点を中心とする二つの円の間の帯です。その点を通る二本の直線の上に白い節を入れ、節のそばに、短い白い線を二本ずつ入れます。上では二本の竹の先が交差します。輪を横切る白い線二本を、中心線の上で交わるように引きます。輪の下では、二本の竹が交差します。短い切り口は、それぞれ斜めの直線に沿い、横の直線で終わります。左の竹を上に重ね、その両側に白い線を残します。輪の外の葉は片側に七枚です。二枚ひと組を45度ずつ離して置き、組ごとに短い茎で輪につなぎます。竹の切り口のそばには一枚だけ置きます。葉は、同じ幅の円二つが重なるレンズ形で、まん中に白い葉脈を一本通します。同じ作りの小さい葉を、輪の中の、雀の上に一枚ずつ置きます。雀は斜めに立ちます。頭は中心線のそばの円、体は頭の斜め下の大きい円で、どちらもまわりに白い線を残します。体のうろこは、頭の中心のまわりに列にして並べた白い点です。翼は頭の後ろに上げます。一点から広がる羽根五枚の扇で、羽根一枚は15度、間に白い線を入れ、先は同じ幅の円で丸くします。尾は、体の中心から下へのびる細い扇で、白いしまが二本あります。目は点のある白い円で、くちばしは、中心線のそばの先から直線を引きます。輪を先に作図し、葉を時計回りに一組ずつその場で作図し、右の雀を作図してから、左の雀をその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 38, place: { en: "right page, first row, second column: 仙臺さゝ (measured, and drawn with compass and ruler)", ja: "右頁、一段目の二列目「仙臺さゝ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    sendaiZasaBuild(c, "bamboo-grass", "sparrow", R);
  },
});

export const hitotsuMatsu = defineCrest({
  id: "hitotsu-matsu",
  measured: "The 一ツまつ of the 1892 crest book (frame 30, left page, row 2, column 3), measured as numbers only, in units of half the crown's width. The crown is a cloud of five scallops, 2 wide and 0.7 tall over the branch, the round lobe at each end 0.5 across. The branch arches under it, 0.09 thick with its lines. The trunk is 1.2 wide under the branch, 0.9 at its waist and 1.3 at its flat foot, 0.8 below the branch's top, with an arch 0.28 wide cut into the foot each side. The book draws it in outline, a little askew, with ten or eleven needles a side; ours is solid, as a crest is worn, the left half the mirror of the right, with ten white needles a side and two white marks at each of the four places the book marks the bark.",
  name: { en: "One pine", ja: "一つ松" },
  reading: "ひとつまつ",
  romaji: "hitotsu-matsu",
  frame: "none",
  motifs: [{ motif: "pine", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["matsu", "pine tree"],
  construction: {
    en: "A cloud-shaped crown of five scallops over an arched branch, and a short trunk that spreads to a flat foot with an arch cut in each side. White needles fan up from a white midrib and from the branch, and end short of the crown's edge; white marks lie on the bark. Crown, branch and trunk are one shape each.",
    ja: "五つの丸い山がある、雲の形の松葉の茂みを、弓なりの枝の上に置きます。その下に、根元が平らに広がり、左右にアーチ形の切れ込みがある短い幹を置きます。白い松葉は、まん中の白い線と枝から上へ扇のように広がり、茂みの縁の手前で終わります。幹には白い模様を入れます。茂み、枝、幹を、それぞれ一つの形として作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, second row, third column: 一ツまつ (measured, and drawn with compass and ruler)", ja: "左頁、二段目の三列目「一ツまつ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    matsuBuild(c, "pine", R);
  },
});

export const hitotsuChoji = defineCrest({
  id: "hitotsu-choji",
  measured: "The 丸に一ッ丁子 of the 1892 crest book (frame 12, right page, row 1, column 1), measured as numbers only, in units of the radius of the room inside its ring. The bud is a drop 1.5 tall: a round head 0.76 across, its top 0.55 over the centre, narrowing to a point 0.95 under it; halfway down it is 0.45 across. Three round petals stand on the head: the middle one 0.44 across with its top at 0.91, and one each side 0.48 across that reaches 0.59 from the axis. A short stamen runs out from the head along each petal. The book draws it in outline, a little to the left of its ring's middle, and its stamens are bold strokes; ours is solid, as a crest is worn, the left half the mirror of the right, the stamens white, and the bud's sides are one arc each, up to 0.03 fuller than the book's towards the point.",
  name: { en: "One clove", ja: "一つ丁子" },
  reading: "ひとつちょうじ",
  romaji: "hitotsu chōji",
  frame: "none",
  motifs: [{ motif: "clove", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["choji", "clove", "丁子", "ちょうじ"],
  construction: {
    en: "A drop-shaped bud, a round head that narrows to a point at the foot, with three round petals standing on the head, the middle one over the other two. A white stamen lies along each petal, on the line from the head's centre through the petal's, and the bud lies over the petals with a white line round it. Each side of the bud is one long arc that touches the head at its widest. The middle petal, the right petal and the bud are built in full, then the left petal where it stands.",
    ja: "しずくの形のつぼみです。丸い頭から、下のとがった先へ細くなります。頭の上に丸い花びらを三枚のせ、まん中の一枚をほかの二枚の上に重ねます。花びらには、頭の中心から花びらの中心へ向かう白いしべを一本ずつ入れます。つぼみは花びらの上に重ね、まわりに白い線を残します。つぼみの両わきは、頭のいちばん広いところに接する長い弧一本ずつです。まん中の花びら、右の花びら、つぼみを作図し、左の花びらはその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, first column: 丸に一ッ丁子, without its ring (measured, and drawn with compass and ruler)", ja: "右頁、一段目の一列目「丸に一ッ丁子」の輪を除いたもの（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    chojiBuild(c, "clove", R);
  },
});


export const kajiNoHa = defineCrest({
  id: "kaji-no-ha",
  measured: "The 梶の葉 of the 1892 crest book (frame 17, left page, row 2, column 2), measured as numbers only, in units of half the leaf's height with its stem. Five round lobes: the top one 0.8 across and 0.8 tall, its top at 0.97; one each side 0.7 across that reaches 0.97 from the axis, its middle a little over the centre; and two below, 0.67 across, down to 0.88 under the centre. The bays between the lobes reach in to about 0.5 from a point 0.12 under the centre. The veins meet on the axis 0.5 under the centre; a midrib runs up the top lobe with five or six veins a side, four or five veins fan into each side lobe, and each low lobe has a level rib with four veins hanging from it. The stem is 0.14 wide and ends 0.98 under the centre. The book draws it in outline with wavy edges, curved veins and a small fold where two lobes meet; ours is solid, as a crest is worn, the left half the mirror of the right, each lobe's edge nine round scallops, with a straight white rib along every lobe from the point where they meet, four straight white veins a side in the top lobe and three a side in the others, as the usual drawing of this crest has them (a Wikimedia Commons picture, Kaji-no-Ha, was looked at for comparison only).",
  name: { en: "Paper-mulberry leaf", ja: "梶の葉" },
  reading: "かじのは",
  romaji: "kaji no ha",
  frame: "none",
  motifs: [{ motif: "paper-mulberry", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["kaji", "kajinoha", "paper mulberry", "mulberry leaf", "梶", "かじ"],
  construction: {
    en: "A leaf of five round lobes on a short stem: one at the top, one to each side and two below, standing on a round middle that the bays between them reach in to. A lobe's edge is nine scallops, circles two fifths of the lobe wide on the grid points nearest a ring about its middle. A white rib runs along each lobe from the point on the axis where the ribs meet, with white veins leaving it on both sides: four a side in the top lobe and three a side in the others. Every rib and vein ends on a circle a little inside its lobe's edge. The stem lies over the leaf with a white line round it. The right half is built in full, then the stem, then the left half where it stands.",
    ja: "短い柄のついた、丸い裂片が五つある葉です。裂片は上に一つ、左右に一つずつ、下に二つあり、まん中の丸い部分につながります。裂片の間の切れ込みは、その円までです。裂片の縁は、小さな円九つでできた波の形です。中心線の上の一点から、それぞれの裂片へ白い葉脈を一本引き、その両側に白い葉脈を出します。上の裂片は四本ずつ、ほかの裂片は三本ずつです。白い葉脈はどれも、裂片の縁より少し内側の円で終わります。柄は葉の上に重ね、まわりに白い線を残します。右半分、柄の順に作図し、左半分はその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "left page, second row, second column: 梶の葉 (measured, and drawn with compass and ruler)", ja: "左頁、二段目の二列目「梶の葉」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    kajiBuild(c, "paper-mulberry", R);
  },
});
