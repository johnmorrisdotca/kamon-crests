// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass, ivy, ginger, the nine bamboo-grass leaves, the pine, the clove, the holly leaf.
import { R } from "../construct/geo.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { aoiBuild } from "./drawn/aoi.ts";
import { chojiBuild } from "./drawn/choji.ts";
import { hiiragiBuild } from "./drawn/hiiragi.ts";
import { ichoBuild } from "./drawn/icho.ts";
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

export const hitotsuHiiragi = defineCrest({
  id: "hitotsu-hiiragi",
  measured: "One leaf of the 丸にならび柊 of the 1892 crest book (frame 44, right page, row 4, column 2): the left leaf of its pair, whose right side is clear of the ring, measured as numbers only, in units of half the leaf's height with its stem. The blade is 1.75 tall and about 1 across, with a sharp point at the top. On its clear side four spines stand 0.30, 0.46, 0.49 and 0.50 from the midrib, at 0.76, 0.45 and 0.04 over the middle and 0.27 under it, with a round bay over each that reaches in to 0.10, 0.20, 0.26 and 0.29 from the midrib. Five veins a side leave the midrib, each with a branch, and the stem is a stub 0.2 long and as wide. Neither this book nor the 1891 one (NDL 780551) draws a single holly leaf, and the ring cuts this leaf's outer side, so ours is that leaf made whole: solid, as a crest is worn, the left half the mirror of the right, the midrib and the veins straight white lines.",
  name: { en: "One holly leaf", ja: "一つ柊" },
  reading: "ひとつひいらぎ",
  romaji: "hitotsu hiiragi",
  frame: "none",
  motifs: [{ motif: "holly", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["hiiragi", "holly", "holly osmanthus", "柊", "ひいらぎ"],
  construction: {
    en: "A leaf standing upright on a short stem: a sharp point at the top and, down each side, four round lobes that each end in a spine pointing up, with a round bay cut over it. The point is the lens between two circles that cross on the axis. Each lobe's edge is one circle and its bay another, and the spine stands where the two cross; the bays reach in to one ruled line. A white midrib runs the whole length, and five white veins leave it on each side, each rising one in three, with a branch. The right half is built in full, then the stem, then the left half where it stands.",
    ja: "短い柄の上にまっすぐ立つ葉です。上の先はとがり、両側に丸い裂片が四つずつあります。裂片の先は上を向いたとげで、その上に丸い切れ込みがあります。葉の先は、中心線の上で交わる二つの円の間の形です。裂片の縁は円一つ、切れ込みは別の円一つで、二つの円が交わるところがとげの先です。切れ込みの奥は、一本の直線までです。白い葉脈は、まん中に上から下まで一本、その両側に五本ずつあり、どれも途中で二つに分かれます。右半分、柄の順に作図し、左半分はその場で作図します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "right page, fourth row, second column: 丸にならび柊, one leaf of its pair, without the ring (measured, and drawn with compass and ruler)", ja: "右頁、四段目の二列目「丸にならび柊」の二枚の葉のうち一枚、輪を除いたもの（寸法を測り、コンパスと定規で描いたもの）" }, read: "2026-11-25", measured: true },
  build(c) {
    hiiragiBuild(c, "holly", R);
  },
});
