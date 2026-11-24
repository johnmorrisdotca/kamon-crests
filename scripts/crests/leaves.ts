// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass.
import { C0, CX, CY, Path, R, circle, lens, polar } from "../construct/geo.ts";
import { mirrored } from "../construct/traced.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { aoiBuild } from "./drawn/aoi.ts";
import { ichoBuild } from "./drawn/icho.ts";
import { MOMIJI_LEFT } from "./traced/momiji.ts";
import type { Pt } from "../construct/geo.ts";
import { herringbone, profileRadius, scallopedLeaf, slit } from "../construct/motifs.ts";
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

/** An oak leaf: long and oval, with wavy lobes round its edge, a midrib and veins that curve out and forward from it, all cut as white slits. */
const oakLeaf = (origin: Pt, deg: number, L: number): Path => {
  const profile: [number, number][] = [[0, 1.0], [14, 0.95], [34, 0.8], [64, 0.62], [100, 0.46], [140, 0.3], [180, 0.22]];
  const leaf = scallopedLeaf(origin, deg, L, profile, 5, 0.075);

  return herringbone(origin, deg, L, profileRadius(profile), 6, 30, 0, 2.2, 0.82, 0.9, 0.1).reduce((acc, p) => acc.join(p), leaf);
};

const kashiwaBuild = (c: B, reach: number): void => {
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 0, reach);
  for (const a of [0, 120, 240]) c.stroke("oak", new Path().M(polar(reach * 0.02, a)).L(polar(reach * 0.25, a)), 5);
  c.fill("oak", circle(C0, reach * 0.085));
  for (const a of [0, 120, 240]) c.group(() => c.fill("oak", oakLeaf(polar(reach * 0.2, a), a, reach * 0.8), "evenodd"));
};

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
    en: "Three long leaves, each with five rounded lobes along each side, a third of a turn apart, their stems at the centre.",
    ja: "各辺に丸い切れ込みのある細長い葉を三枚、葉柄を中心に集めて120度ずつ離して置きます。",
  },
  build(c) {
    kashiwaBuild(c, 90);
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
  construction: { en: "The three oak leaves inside a ring about a tenth of the diameter thick.", ja: "直径の約10分の1の太さの輪の中に三つ柏を収めます。" },
  build(c) {
    const inner = c.ring("ring-medium");
    kashiwaBuild(c, inner - RING_GAP);
  },
});

/** A clover-like floret of three round lobes. */
const cloverFloret = (c: B, at: Pt, tilt: number, r: number): void => {
  for (const [x, y] of [[0, -0.9], [-0.95, 0.55], [0.95, 0.55]] as const) {
    const a = Math.cos((tilt * Math.PI) / 180);
    const b = Math.sin((tilt * Math.PI) / 180);
    c.fill("sword-leaf", circle([at[0] + (x * a - y * b) * r, at[1] + (x * b + y * a) * r], r * 0.95));
  }
};

/** Water plantain: two arched leaves, one each side; between them a stalk with tiers of florets, and at its foot two arrowhead leaves. */
const omodakaBuild = (c: B, reach: number): void => {
  const k = reach / 86;
  const at = (x: number, y: number): Pt => [CX + x * k, CY + y * k];
  c.guideCircle(C0, reach);
  c.guideLine([CX, CY - reach], [CX, CY + reach]);
  c.group(() => {
    for (const sign of [-1, 1]) {
      const blade = new Path().M(at(sign * 18, 78));
      blade.C(at(sign * 78, 40), at(sign * 80, -44), at(sign * 12, -80));
      blade.C(at(sign * 44, -40), at(sign * 46, 26), at(sign * 18, 78));
      blade.Z();
      const cut = slit([at(sign * 28, 62), at(sign * 58, 4), at(sign * 26, -62)], 2.4, 0.1);
      c.fill("sword-leaf", blade.join(cut), "evenodd");
    }
  });
  c.group(() => {
    c.stroke("sword-leaf", new Path().M(at(0, 84)).L(at(0, -52)), 5.2);
    cloverFloret(c, at(0, -58), 0, 6 * k);
    for (const sign of [-1, 1]) {
      cloverFloret(c, at(sign * 13, -34), sign * 18, 6 * k);
      cloverFloret(c, at(sign * 14, -8), sign * 18, 6.4 * k);
    }
    cloverFloret(c, at(0, 14), 0, 6.4 * k);
    for (const sign of [-1, 1]) c.fill("sword-leaf", lens(at(sign * 3, 70), at(sign * 40, 26), 0.2));
  });
};

export const omodaka = defineCrest({
  id: "omodaka",
  name: { en: "Water plantain", ja: "沢瀉" },
  reading: "おもだか",
  romaji: "omodaka",
  frame: "none",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの"), fam("Fukushima", "福島", "ふくしま")],
  aliases: ["arrowhead", "sagittaria", "water plantain"],
  construction: {
    en: "Two long leaves arched one to each side of a stalk, the stalk carrying tiers of three-lobed florets and, at its foot, two arrowhead leaves; a fine white line runs inside each arched leaf.",
    ja: "茎の左右に長い葉を弓なりに立て、茎には三つ葉形の小花を段にして付け、根元には矢じり形の葉を二枚添えます。弓なりの葉の内側に、細い白線を一本通します。",
  },
  build(c) {
    omodakaBuild(c, 90);
  },
});

export const maruNiOmodaka = defineCrest({
  id: "maru-ni-omodaka",
  name: { en: "Water plantain in a circle", ja: "丸に沢瀉" },
  reading: "まるにおもだか",
  romaji: "maru ni omodaka",
  frame: "ring-medium",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの")],
  aliases: ["omodaka ring"],
  construction: { en: "The water plantain inside a ring about a tenth of the diameter thick.", ja: "直径の約10分の1の太さの輪の中に沢瀉を収めます。" },
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
    en: "A leaf of seven pointed lobes, the middle one the longest, a white rib running out into each lobe from a curved line across the leaf's foot; its stalk comes out of the notch in the foot and flares to a flat cut end. The left half of the blade is drawn from the book and mirrored about the axis; the stalk is ruled, its sides struck as arcs.",
    ja: "先の尖った七つの裂片を広げ、中央の裂片を最も長くします。葉の付け根を横切る曲線から、各裂片へ白い葉脈を通します。葉柄は付け根の切れ込みから出て、平らな切り口へ向かって広がります。葉身の左半分を紋帳から写し取り、中心線で左右対称に返し、葉柄は定規とコンパスの弧で描きます。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, first column: 紅葉", ja: "左頁、三段目の一列目「紅葉」" }, read: READ },
  build(c) {
    c.guideLine([CX, 4], [CX, 196]);
    c.guideCircle(C0, R);
    mirrored(c, "maple", MOMIJI_LEFT);
    // The stalk, as the book draws it: out of the notch in the leaf's foot, 17 wide there, flaring to a flat cut end 32 wide,
    // each side an arc of radius 60.
    c.fill("maple", new Path().M([CX - 8.5, 156]).A(60, 0, 1, [CX - 16, 192]).L([CX + 16, 192]).A(60, 0, 1, [CX + 8.5, 156]).Z());
  },
});
