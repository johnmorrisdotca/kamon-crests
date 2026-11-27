import { mitsubaKajiNoHaBuild } from "./drawn/mitsuba-kaji-no-ha.ts";
// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass, ivy, ginger, the nine bamboo-grass leaves, the pine, the clove, the paper-mulberry leaf.
import { R } from "../construct/geo.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { aoiBuild } from "./drawn/aoi.ts";
import { TACHI_AOI, TACHI_AOI_RINGED, tachiAoiBuild } from "./drawn/tachi-aoi.ts";
import { chojiBuild } from "./drawn/choji.ts";
import { kajiBuild } from "./drawn/kaji.ts";
import { ichoBuild } from "./drawn/icho.ts";
import { dakiHiiragiBuild, narabiHiiragiBuild } from "./drawn/hiiragi.ts";
import { kashiwaBuild as kashiwa3, momijiBuild, omodakaBuild as omodaka3 } from "./drawn/leafy.ts";
import { myogaBuild } from "./drawn/myoga.ts";
import { matsuBuild } from "./drawn/matsu.ts";
import { kumaiZasaBuild } from "./drawn/sasa.ts";
import { tsutaBuild } from "./drawn/tsuta.ts";
import { RING_GAP } from "../construct/builder.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof mitsubaAoi)["build"]>[0];

export const mitsubaAoi = defineCrest({
  id: "mitsuba-aoi",
  measured: "The leaf's veins only, from the 三ツあふひ of the 1892 crest book (frame 37, right page, row 1, first column from the right), checked against the single large leaf of its 一ツつるあふひ (frame 36, left page, row 2, third column from the right); counts and angles only. In each half of a leaf the book draws seven pointed cells that fan from the curl beside the notch to the edge, every line bowed, their tips about 2, 16, 36, 52, 68, 86 and 104 degrees round from the leaf's axis as seen from the curl; in the large leaf each tip is where a line from the curl meets a shorter line that branches off the next. Ours has seven veins that end 2, 16, 36, 52, 69, 88 and 109 degrees round, and six branches. The book draws black lines on white, ours white veins on black, so the book's short cells between the long ones are the pointed cells between a branch and its vein here. The book's three leaves have their notches at a centre circle and their tips outwards; neither it nor the 1891 book (NDL 780551) has a cell with the tips at the centre. The arrangement, the leaf's outline, its spindle and its curls are not from the book: they were measured from a picture of the ringed crest. Nothing is taken from Wikimedia Commons.",
  name: { en: "Three hollyhock leaves", ja: "三つ葉葵" },
  reading: "みつばあおい",
  romaji: "mitsuba-aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [fam("Tokugawa", "徳川", "とくがわ"), fam("Matsudaira", "松平", "まつだいら")],
  aliases: ["tokugawa", "hollyhock", "aoi", "three-leaf hollyhock", "Mitsuba-aoi", "Tokugawa crest", "Hollyhock crest"],
  construction: {
    en: "Three heart-shaped leaves a third of a turn apart, each with its point at the centre and its two round lobes outside, white stems between them. Every edge is an arc of a compass circle or a ruled line: each lobe is one circle, its straight side a line through two grid points, and its veins are white arcs 1.7 wide, every one bowed. In each half of a leaf seven veins fan out from the curl beside the notch to the edge (the last leaves the midrib), each bowing towards the notch; from each of the lower six a branch bows the other way and ends where the vein before it ends. So the black cell between two veins is a lens, pointed at the curl and at the edge, with a smaller pointed cell between each pair of tips. Between the two lobes a black spindle runs up the leaf's axis from near the centre and ends in a point at the notch; beside it the outline rolls into a curl with a hook.",
    ja: "心形の葉を三枚、120度ずつ離し、葉先を中心に、二つの丸い葉の耳を外側に向けて置き、葉の間を白い茎で分けます。すべての縁はコンパスの円の弧か、定規の直線です。葉の耳は一つの円、まっすぐな辺は二つの格子点を通る直線、葉脈は幅1.7の白い弧で、まっすぐな線は一本もありません。葉の半分ごとに、切れ込みの横の渦から縁へ、七本の白い葉脈が扇のように広がります（最後の一本は中央の葉脈から出ます）。どれも切れ込みの方へふくらみます。下の六本からは枝が一本ずつ出て、反対の方へふくらみ、一つ前の葉脈が縁に届くところで終わります。そのため、葉脈の間の黒い部分は、渦の側と縁の側がとがり、真ん中が太い、木の葉の形になります。となり合う先と先の間には、小さなとがった形が入ります。二つの耳の間には、中心近くから葉の軸に沿って黒い紡錘形が伸び、切れ込みで尖って終わります。その横で、葉の輪郭が鉤のついた渦に巻き込みます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, first column from the right: 三ツあふひ (the leaf's veins only: measured, and drawn with compass and ruler; the book draws its three leaves with their tips outwards)", ja: "右頁、一段目、右から一列目「三ツあふひ」（葉脈だけ。寸法を測り、コンパスと定規で描いたもの。本の図は、三枚の葉先が外を向きます）" }, read: "2026-11-25", measured: true },
  build(c) {
    aoiBuild(c, false);
  },
});

export const maruNiMitsubaAoi = defineCrest({
  id: "maru-ni-mitsuba-aoi",
  measured: "The leaf's veins only, from the 三ツあふひ of the 1892 crest book (frame 37, right page, row 1, first column from the right), checked against the single large leaf of its 一ツつるあふひ (frame 36, left page, row 2, third column from the right); counts and angles only. In each half of a leaf the book draws seven pointed cells that fan from the curl beside the notch to the edge, every line bowed, their tips about 2, 16, 36, 52, 68, 86 and 104 degrees round from the leaf's axis as seen from the curl; in the large leaf each tip is where a line from the curl meets a shorter line that branches off the next. Ours has seven veins that end 2, 16, 36, 52, 69, 88 and 109 degrees round, and six branches. The book draws black lines on white, ours white veins on black, so the book's short cells between the long ones are the pointed cells between a branch and its vein here. The book's three leaves have their notches at a centre circle and their tips outwards; neither it nor the 1891 book (NDL 780551) has a cell with the tips at the centre. The arrangement, the leaf's outline, its spindle and its curls are not from the book: they were measured from a picture of the ringed crest. Nothing is taken from Wikimedia Commons.",
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
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "right page, first row, first column from the right: 三ツあふひ (the leaf's veins only: measured, and drawn with compass and ruler; the book draws its three leaves with their tips outwards)", ja: "右頁、一段目、右から一列目「三ツあふひ」（葉脈だけ。寸法を測り、コンパスと定規で描いたもの。本の図は、三枚の葉先が外を向きます）" }, read: "2026-11-25", measured: true },
  build(c) {
    aoiBuild(c, true);
  },
});

export const tachiAoi = defineCrest({
  id: "tachi-aoi",
  measured: "The 立あふひ of the 1892 crest book (frame 36, left page, row 3, column 3 from the right) and a Wikimedia Commons picture of 立ち葵 (Japanese crest Tachi Aoi.svg, public domain), measured as numbers only, in the unit of the hollyhock leaf (the leaf is 99.4 wide and 68.4 long). In the Commons picture the top leaf's tip stands 117 from the point the three leaves turn about and the side leaves' tips 114; the stems are 6 wide; a white line 3 wide parts the upright stem from the right branch; the trunk is 26 wide at its narrowest, and the foot is 92 wide on a base 96 below that point. The book draws the same arrangement by hand and in outline, with the side leaves tilted upwards, rounder leaves with a small curl each side of the stem, and the same white line to the right of the upright stem. Ours keeps the package's hollyhock leaf (straight sides, and large round shoulders at the notch where both pictures have small curls), sets the side leaves level as the Commons picture does, and makes them the top leaf a quarter turn about the centre, 115 out.",
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
  source: { ...SHINSEN_MONCHO, frame: 36, place: { en: "left page, third row, third column counted from the right: 立あふひ (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から三列目「立あふひ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
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
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, second row, third column counted from the right: 立ちおもだか (measured, and drawn afresh with compass and ruler)", ja: "右頁、二段目、右から三列目「立ちおもだか」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
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
  measured: "The ringed water plantain of the 1892 crest book (frame 14, 丸ニふと沢瀉) and a present-day drawing of 丸に立ち沢瀉 for comparison, measured as the standing water plantain with no ring is. The ring and the white inside it are the package's measured ones; the leaf reaches the same 0.79 of the radius as every ringed crest.",
  source: { ...SHINSEN_MONCHO, frame: 14, place: { en: "right page, third row, third column counted from the right: 丸ニふと沢瀉 (measured, and drawn afresh with compass and ruler)", ja: "右頁、三段目、右から三列目「丸ニふと沢瀉」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
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
  source: { ...SHINSEN_MONCHO, frame: 5, place: { en: "left page, second row, fourth column counted from the right: 三ついてふ (measured, and drawn afresh with compass and ruler)", ja: "左頁、二段目、右から四列目「三ついてふ」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
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
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, fourth column counted from the right: 紅葉 (measured, and drawn afresh with compass and ruler)", ja: "左頁、三段目、右から四列目「紅葉」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  build(c) {
    momijiBuild(c, "maple", R);
  },
});

export const tsuta = defineCrest({
  id: "tsuta",
  measured: "The つた of the 1892 crest book (frame 22, right page, row 4, column 4 from the right), measured as numbers only, in units of half the leaf's width. The leaf is 1.15 times as wide as it is tall. The small ring where the veins meet stands 0.22 above the middle and is 0.2 across. The lobe that points down reaches 0.87 below the middle and is as wide as half the leaf; the side lobes are 0.85 tall; the two upper lobes reach 0.87 above the middle and meet in a notch 0.74 up the axis. The book draws the leaf in outline, with an uneven wavy edge and five to seven fine veins a side in each lobe. Ours is solid, as a crest is worn: every scallop of the edge is an arc of a circle on a grid point, each lobe has three veins a side or fewer, and the left half is the right half mirrored. A Wikimedia Commons picture of 蔦 (Japanese crest Tuta.svg) was read for comparison only: the same five lobes, ring and overlaps, three veins a side in the lower lobe, and a leaf about 1.25 times as wide as it is tall.",
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
  source: { ...SHINSEN_MONCHO, frame: 22, place: { en: "right page, fourth row, fourth column counted from the right: つた (measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から四列目「つた」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
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
  measured: "The 丸に九枚笹 of the 1892 crest book (frame 37, left page, row 4, column 4 from the right), measured as numbers only, in units of the radius of the room inside its ring; the book prints no nine-leaf bamboo grass without a ring. A broad leaf runs from the centre to the ring and is 0.63 across at its widest, 0.6 up. A narrow leaf comes out from under each side of it, 0.24 wide there, and ends in a point on the ring a third of the way round to the next broad leaf. The book draws the leaves in outline; ours are solid, as a crest is worn, with a white midrib in each broad leaf.",
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
  source: { ...SHINSEN_MONCHO, frame: 37, place: { en: "left page, fourth row, fourth column counted from the right: 丸に九枚笹 (measured, and drawn with compass and ruler, without its ring)", ja: "左頁、四段目、右から四列目「丸に九枚笹」（寸法を測り、輪をのぞいて、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    kumaiZasaBuild(c, "bamboo-grass", R);
  },
});

export const maruNiNarabiHiiragi = defineCrest({
  id: "maru-ni-narabi-hiiragi",
  measured: "The 丸にならび柊 of the 1892 crest book (frame 44, right page, row 4, column 2 from the right), measured as numbers only, in units of the radius of the ring's inner line. Two leaves stand side by side, their midribs 0.44 either side of the axis, each with its point 0.86 up, at the ring, and its foot 0.69 down; under it a short stalk runs to the ring. On the side toward the axis each leaf has four spines, 0.30, 0.43, 0.51 and 0.51 from its midrib and 0.71 and 0.41 over the middle, at it, and 0.24 under it; the edge is hollow between one spine and the next, about 0.1 deep, and under the last it rounds in to the foot. Veins leave the midrib on both sides. The book draws it in outline, the leaves uneven, their inner spines touching and crossing the axis, each spine curled up at its point; ours is solid, as a crest is worn, each leaf the same on both sides and the left leaf the mirror of the right, its spines 0.26, 0.43, 0.46 and 0.46 out, with a hairline of white between the two on the axis; each spine is a small flame with a hooked point, between shallow bays about 0.07 deep, and the leaf has a white midrib and four white veins a side that curve up, each with a short fork.",
  name: { en: "Two holly leaves side by side in a circle", ja: "丸に並び柊" },
  reading: "まるにならびひいらぎ",
  romaji: "maru ni narabi hiiragi",
  frame: "ring-medium",
  motifs: [{ motif: "holly", count: 2, arrangement: "rows" }],
  families: [],
  aliases: ["hiiragi", "holly", "holly osmanthus", "two holly leaves", "柊", "ひいらぎ", "並び柊"],
  construction: {
    en: "Two holly leaves standing side by side in a ring, each upright on a thin stalk. A leaf's edge is shallow bays with a spine like a small flame between one and the next, four spines a side. Each bay is an arc of a large circle whose centre stands outside the leaf; the first starts at the leaf's point, on the midrib. At its lower end a bay runs into a small circle that turns the edge up to the spine's point; a second small circle, the flame's round back, crosses the first at the point and runs down into the next bay. Under the last flame a larger circle about a point inside the leaf rounds the edge in to the foot. A white midrib runs the whole length. Four white veins leave it on each side: each lies along a circle of one width, so that it rises from the midrib and curves up, and a short straight fork leaves it toward the edge. The stalk is the space between two upright lines under a level one, and the circle of the room inside the ring cuts its foot. The right leaf is built first: the half toward the axis, the stalk, then the outer half; the left leaf is built where it stands.",
    ja: "輪の中に、柊の葉を二枚、左右に並べて立てます。葉は細い柄の上にまっすぐ立ちます。葉の縁は、浅いへこみの間に、小さな炎のようなとげが立つ形で、とげは片側に四つです。へこみは、葉の外に中心がある大きい円の弧です。最初の弧は、葉のまん中の線の上の、葉の先から始まります。へこみの下の端は小さい円につながり、縁はそこで上へ曲がって、とげの先になります。とげの丸い背は別の小さい円で、とげの先で最初の小さい円と交わり、下のへこみへ続きます。最後のとげの下は、葉の中に中心がある大きい円で、葉の下の端まで丸くつなぎます。白い葉脈は、まん中に上から下まで一本です。その両側に四本ずつ、同じ幅の円に沿った白い葉脈があり、まん中から出て上へ曲がります。それぞれから、縁に向かう短いまっすぐな枝が一本出ます。柄は、横の直線の下の、二本の縦の直線の間で、下の端は輪の内側の円で切ります。右の葉から作図します。中心線に近い半分、柄、外側の半分の順です。左の葉は、その場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, fourth row, second column counted from the right: 丸にならび柊 (measured, and drawn with compass and ruler)", ja: "右頁、四段目、右から二列目「丸にならび柊」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    narabiHiiragiBuild(c, "holly", inner - RING_GAP);
  },
});

export const dakiHiiragi = defineCrest({
  id: "daki-hiiragi",
  measured: "The だきひいらぎ of the 1892 crest book (frame 44, right page, row 1, column 1 from the right), measured as numbers only, in units of half the pair's height. Each leaf's midrib is one curve from the tip, on the axis 0.95 up, out to 0.50 from the axis at the middle and in again to the foot, where the two stems cross on the axis 0.88 down and end 0.33 either side, 1.0 down. The outer edge has five spines, each curled up at its point like a flame, about 0.45, 0.72, 0.96, 0.97 and 0.83 out and 0.88, 0.63 and 0.33 over the middle and 0.12 and 0.62 under it, with a bay about 0.07 deep between one and the next. The inner edges of the two leaves meet on the axis at four places, and the white between them is a column of four hearts, each about 0.35 tall and 0.26 wide at its two lobes, its point up. Veins leave the midrib on both sides, about five a side, forked. The book draws it in outline, uneven, with the left leaf's flames larger than the right's; ours is solid, as a crest is worn, the left leaf the mirror of the right, the flames all of one size, the veins straight and unforked.",
  name: { en: "Embracing holly leaves", ja: "抱き柊" },
  reading: "だきひいらぎ",
  romaji: "daki hiiragi",
  frame: "none",
  motifs: [{ motif: "holly", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["hiiragi", "holly", "holly osmanthus", "embracing holly", "柊", "ひいらぎ"],
  construction: {
    en: "Two holly leaves that embrace: each curves from its tip at the top of the axis round to the foot, with its spines on the outside, and the two stems cross under them. A leaf's outer edge is five shallow bays, each an arc of a large circle whose centre stands outside the leaf, with a spine like a small flame after each: a small circle hooks the edge up to the point and a second is the flame's round back, which runs down into the next bay; under the last a larger circle rounds the edge in to the foot. The inner edge makes the white between the two leaves a column of four hearts: each heart's side is a line ruled from its point on the axis to the far side of a small circle, its lobe, and the lobe's arc runs under to the axis, where the two leaves meet in a point and the next heart begins. The midrib is a white line along a circle about a grid point on the far side of the axis, and five white veins leave it on each side, ruled through grid points, each as long as the space between two circles about the midrib's centre. Each stem runs on from its own leaf's foot along a line ruled through two grid points, the left leaf's over the right's, with a white line between a stem and the other leaf and either side of the upper stem where the two cross. The right leaf is built first, then the left leaf where it stands, then the stems.",
    ja: "柊の葉二枚が、向かい合って抱き合う紋です。葉は、中心線の上の先から外へ丸く曲がって下の端まで続き、とげは外側にあります。下では二本の柄が交差します。葉の外の縁は、浅いへこみ五つと、そのあとに立つ小さな炎のようなとげです。へこみは、葉の外に中心がある大きい円の弧です。へこみの端は小さい円につながり、縁はそこで上へ曲がって、とげの先になります。とげの丸い背は別の小さい円で、次のへこみへ続きます。最後のとげの下は、大きい円で下の端まで丸くつなぎます。内側の縁では、二枚の葉の間の白いすき間が、ハートの形四つの列になります。ハートの横の辺は、中心線の上の先から、小さい円の遠い側へ引いた直線です。小さい円の弧は、下を回って中心線まで続きます。そこで二枚の葉の先が合い、次のハートが始まります。まん中の白い葉脈は、中心線の向こう側の点を中心とする円に沿った白い線です。その両側に五本ずつ、まっすぐな白い葉脈を引きます。長さは、同じ中心の二つの円の間です。柄は、それぞれの葉の下の端から、斜めの直線に沿って続きます。左の葉の柄を上に重ね、交わるところでは、上の柄の両側に白い線を残します。柄と、もう一枚の葉との間にも白い線を残します。右の葉を先に作図し、左の葉をその場で作図してから、柄を作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, first row, first column counted from the right: だきひいらぎ (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から一列目「だきひいらぎ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    dakiHiiragiBuild(c, "holly", R * 0.97);
  },
});

export const maruNiDakiHiiragi = defineCrest({
  id: "maru-ni-daki-hiiragi",
  measured: "The 丸にだきひいらぎ of the 1892 crest book (frame 44, right page, row 2, column 1 from the right): the embracing pair of the cell above it inside a ring whose inner line is 0.84 of its outer radius. The pair fills the ring: its tip and its crossed stems touch the inner line, the midribs stand 0.37 of the outer radius from the axis at the middle, and the white between the leaves is the same column of four hearts. The book's ring cuts the leaves' outer edges, so that only the bays show, as drops of white along the ring; ours is the pair of 抱き柊, measured from the cell above (frame 44, row 1, column 1 from the right), set whole inside our ring with its flames, the left leaf the mirror of the right.",
  name: { en: "Embracing holly leaves in a circle", ja: "丸に抱き柊" },
  reading: "まるにだきひいらぎ",
  romaji: "maru ni daki hiiragi",
  frame: "ring-medium",
  motifs: [{ motif: "holly", count: 2, arrangement: "facing" }],
  families: [],
  aliases: ["hiiragi", "holly", "holly osmanthus", "embracing holly", "柊", "ひいらぎ", "抱き柊"],
  construction: {
    en: "The embracing holly leaves set inside a ring. Two holly leaves that embrace: each curves from its tip at the top of the axis round to the foot, with its spines on the outside, and the two stems cross under them. A leaf's outer edge is five shallow bays, each an arc of a large circle whose centre stands outside the leaf, with a spine like a small flame after each: a small circle hooks the edge up to the point and a second is the flame's round back, which runs down into the next bay; under the last a larger circle rounds the edge in to the foot. The inner edge makes the white between the two leaves a column of four hearts: each heart's side is a line ruled from its point on the axis to the far side of a small circle, its lobe, and the lobe's arc runs under to the axis, where the two leaves meet in a point and the next heart begins. The midrib is a white line along a circle about a grid point on the far side of the axis, and five white veins leave it on each side, ruled through grid points, each as long as the space between two circles about the midrib's centre. Each stem runs on from its own leaf's foot along a line ruled through two grid points, the left leaf's over the right's, with a white line between a stem and the other leaf and either side of the upper stem where the two cross. The right leaf is built first, then the left leaf where it stands, then the stems.",
    ja: "抱き柊を輪の中に収めます。柊の葉二枚が、向かい合って抱き合う紋です。葉は、中心線の上の先から外へ丸く曲がって下の端まで続き、とげは外側にあります。下では二本の柄が交差します。葉の外の縁は、浅いへこみ五つと、そのあとに立つ小さな炎のようなとげです。へこみは、葉の外に中心がある大きい円の弧です。へこみの端は小さい円につながり、縁はそこで上へ曲がって、とげの先になります。とげの丸い背は別の小さい円で、次のへこみへ続きます。最後のとげの下は、大きい円で下の端まで丸くつなぎます。内側の縁では、二枚の葉の間の白いすき間が、ハートの形四つの列になります。ハートの横の辺は、中心線の上の先から、小さい円の遠い側へ引いた直線です。小さい円の弧は、下を回って中心線まで続きます。そこで二枚の葉の先が合い、次のハートが始まります。まん中の白い葉脈は、中心線の向こう側の点を中心とする円に沿った白い線です。その両側に五本ずつ、まっすぐな白い葉脈を引きます。長さは、同じ中心の二つの円の間です。柄は、それぞれの葉の下の端から、斜めの直線に沿って続きます。左の葉の柄を上に重ね、交わるところでは、上の柄の両側に白い線を残します。柄と、もう一枚の葉との間にも白い線を残します。右の葉を先に作図し、左の葉をその場で作図してから、柄を作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, second row, first column counted from the right: 丸にだきひいらぎ (measured, and drawn with compass and ruler)", ja: "右頁、二段目、右から一列目「丸にだきひいらぎ」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    const inner = c.ring("ring-medium");
    dakiHiiragiBuild(c, "holly", inner - RING_GAP);
  },
});

export const hitotsuMatsu = defineCrest({
  id: "hitotsu-matsu",
  measured: "The 一ツまつ of the 1892 crest book (frame 30, left page, row 2, column 2 from the right), measured as numbers only, in units of half the crown's width. The crown is a cloud of five scallops, 2 wide and 0.7 tall over the branch, the round lobe at each end 0.5 across. The branch arches under it, 0.09 thick with its lines. The trunk is 1.2 wide under the branch, 0.9 at its waist and 1.3 at its flat foot, 0.8 below the branch's top, with an arch 0.28 wide cut into the foot each side. The book draws it in outline, a little askew, with ten or eleven needles a side; ours is solid, as a crest is worn, the left half the mirror of the right, with ten white needles a side and two white marks at each of the four places the book marks the bark.",
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
  source: { ...SHINSEN_MONCHO, frame: 30, place: { en: "left page, second row, second column counted from the right: 一ツまつ (measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から二列目「一ツまつ」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ, measured: true },
  build(c) {
    matsuBuild(c, "pine", R);
  },
});

export const hitotsuChoji = defineCrest({
  id: "hitotsu-choji",
  measured: "The 丸に一ッ丁子 of the 1892 crest book (frame 12, right page, row 1, column 1 from the right), measured as numbers only, in units of the radius of the room inside its ring. The bud is a drop 1.5 tall: a round head 0.76 across, its top 0.55 over the centre, narrowing to a point 0.95 under it; halfway down it is 0.45 across. Three round petals stand on the head: the middle one 0.44 across with its top at 0.91, and one each side 0.48 across that reaches 0.59 from the axis. A short stamen runs out from the head along each petal. The book draws it in outline, a little to the left of its ring's middle, and its stamens are bold strokes; ours is solid, as a crest is worn, the left half the mirror of the right, the stamens white, and the bud's sides are one arc each, up to 0.03 fuller than the book's towards the point.",
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
  source: { ...SHINSEN_MONCHO, frame: 12, place: { en: "right page, first row, first column counted from the right: 丸に一ッ丁子, without its ring (measured, and drawn with compass and ruler)", ja: "右頁、一段目、右から一列目「丸に一ッ丁子」の輪を除いたもの（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    chojiBuild(c, "clove", R);
  },
});


export const kajiNoHa = defineCrest({
  id: "kaji-no-ha",
  measured: "The 梶の葉 of the 1892 crest book (frame 17, left page, row 2, column 2 from the right), measured as numbers only, in units of half the leaf's height with its stem. Five round lobes: the top one 0.8 across and 0.8 tall, its top at 0.97; one each side 0.7 across that reaches 0.97 from the axis, its middle a little over the centre; and two below, 0.67 across, down to 0.88 under the centre. The bays between the lobes reach in to about 0.5 from a point 0.12 under the centre. The veins meet on the axis 0.5 under the centre; a midrib runs up the top lobe with five or six veins a side, four or five veins fan into each side lobe, and each low lobe has a level rib with four veins hanging from it. The stem is 0.14 wide and ends 0.98 under the centre. The book draws it in outline with wavy edges, curved veins and a small fold where two lobes meet; ours is solid, as a crest is worn, the left half the mirror of the right, each lobe's edge nine round scallops, with a straight white rib along every lobe from the point where they meet, four straight white veins a side in the top lobe and three a side in the others, as the usual drawing of this crest has them (a Wikimedia Commons picture, Kaji-no-Ha, was looked at for comparison only).",
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
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "left page, second row, second column counted from the right: 梶の葉 (measured, and drawn with compass and ruler)", ja: "左頁、二段目、右から二列目「梶の葉」（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    kajiBuild(c, "paper-mulberry", R);
  },
});

export const mitsubaKajiNoHa = defineCrest({
  id: "mitsuba-kaji-no-ha",
  name: { en: "Three paper-mulberry leaves", ja: "三つ梶の葉" },
  reading: "みつかじのは",
  romaji: "mitsu kaji no ha",
  frame: "none",
  motifs: [{ motif: "paper-mulberry", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["三ッかぢのは"],
  construction: {
    en: "One scalloped mulberry leaf turns three times, and the identical stalks cross in a cycle.",
    ja: "縁の丸い切れ込みをもつ梶の葉を三方向に回し、同じ形の柄を順に交差させます。",
  },
  measured: "The single leaf is constructed from the period 梶の葉 on the same opening. Three placements have exact 120-degree turns, and the crossing stalks and veins use 1.15 units of paper.",
  source: { ...SHINSEN_MONCHO, frame: 17, place: { en: "left page, first row, third column from the right: 三ッかぢのは", ja: "左頁、一段目、右から三列目「三ッかぢのは」" }, read: "2026-11-27", measured: true },
  build: mitsubaKajiNoHaBuild,
});
