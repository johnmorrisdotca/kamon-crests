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
    en: "Three oak leaves a third of a turn apart, their stalks at the centre. Each leaf's wavy edge is nine circles, one at the tip and four down each side; a white midrib runs up it and four white veins each side sweep up from the midrib. A small disc sits in a white ring where the leaves meet.",
    ja: "柏の葉を三枚、葉柄を中心に集めて120度ずつ離して置きます。葉の波打つ縁は九つの円（先に一つ、左右に四つずつ）でできます。白い中肋を一本通し、左右四本ずつの白い葉脈を中肋から上へ流します。葉が集まるところに、白い輪の中の小さな円を置きます。",
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
  name: { en: "Standing water plantain", ja: "立ち沢瀉" },
  reading: "たちおもだか",
  romaji: "tachi omodaka",
  frame: "none",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの"), fam("Fukushima", "福島", "ふくしま")],
  aliases: ["arrowhead", "sagittaria", "water plantain"],
  construction: {
    en: "A leaf of three pointed blades, one upright and one down to each side, each the lens between two equal arcs, with white lines where they meet and a small ring at their meeting point; two stalks under it; and a flower stem each side with three florets of three small circles.",
    ja: "先の尖った三枚の葉片（上に一枚、左右の下に一枚ずつ）でできた葉を描きます。葉片は、同じ半径の二つの弧にはさまれた形です。葉片の境に白線を入れ、集まるところに小さな輪を置きます。葉の下に茎を二本、左右に花の茎を一本ずつ立て、小円三つの花を三つずつ付けます。",
  },
  build(c) {
    omodakaBuild(c, R);
  },
});

export const maruNiOmodaka = defineCrest({
  id: "maru-ni-omodaka",
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
  name: { en: "Maple leaf", ja: "紅葉" },
  reading: "もみじ",
  romaji: "momiji",
  frame: "none",
  motifs: [{ motif: "maple", count: 7, arrangement: "radial" }],
  families: [],
  aliases: ["maple", "kaede", "autumn leaf"],
  construction: {
    en: "Seven pointed lobes from one point at the leaf's foot, each the lens between two equal arcs, the middle one the longest; a white rib up each of the five upper lobes from a white arc that crosses the foot; and a stalk that flares to a flat cut end, each side an arc.",
    ja: "葉の付け根の一点から、先の尖った七つの裂片を広げます。裂片は同じ半径の二つの弧にはさまれた形で、中央を最も長くします。付け根を横切る白い弧から、上の五つの裂片に白い葉脈を一本ずつ通します。葉柄は平らな切り口へ向かって広がり、両側は弧です。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, first column: 紅葉 (measured, and drawn afresh with compass and ruler)", ja: "左頁、三段目の一列目「紅葉」（寸法を測り、コンパスと定規で描き直したもの）" }, read: READ },
  build(c) {
    momijiBuild(c, "maple", R);
  },
});
