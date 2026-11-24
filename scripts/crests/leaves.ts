// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass.
import { C0, CX, CY, Path, R, circle, lens, polar } from "../construct/geo.ts";
import { mirrored, turned } from "../construct/traced.ts";
import { READ, SHINSEN_MONCHO } from "./books.ts";
import { AOI_LEAF_LEFT } from "./traced/aoi.ts";
import { MOMIJI_LEFT } from "./traced/momiji.ts";
import type { Pt } from "../construct/geo.ts";
import { herringbone, profileRadius, scallopedLeaf, slit } from "../construct/motifs.ts";
import { RING_GAP } from "../construct/builder.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof mitsubaAoi)["build"]>[0];

/**
 * The Tokugawa hollyhock as it is set out: three heart-shaped leaves a third of a turn apart, each with its point at the centre,
 * its sides on the lines that part it from its neighbours, its two round lobes outside, and a white midrib that runs out from the
 * centre and parts at the notch into two curls, with veins fanning from each curl and from the midrib. One leaf's left half is
 * drawn and traced once; the others are the same half mirrored and turned.
 */
const aoiBuild = (c: B, reach: number): void => {
  c.zoom(reach / R);
  c.guideCircle(C0, R);
  c.guideSpokes(6, 0, R);
  turned(c, "hollyhock", AOI_LEAF_LEFT, 3);
};

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
    en: "Three heart-shaped leaves a third of a turn apart, each with its point at the centre and its two round lobes outside, white lines between them; a white midrib runs out from the centre and parts at each leaf's notch into two curls, with veins fanning out from the curls and the midrib.",
    ja: "心形の葉を三枚、120度ずつ離し、葉先を中心に、二つの丸い葉の耳を外側に向けて置き、葉の間を白い線で分けます。中心から白い中肋を伸ばし、葉の切れ込みで左右の渦に分け、渦と中肋から葉脈を扇状に広げます。",
  },
  build(c) {
    aoiBuild(c, R);
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
    en: "The three hollyhock leaves scaled to fill a ring about a tenth of the diameter thick, a narrow even gap inside it.",
    ja: "三つ葉葵を縮めて、直径の約10分の1の太さの輪の中に、狭く均一な隙間を残して収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    aoiBuild(c, inner - RING_GAP);
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

/** A ginkgo leaf: a fan on a short stalk, with a notch in the top and veins running up the fan. */
const ichoLeaf = (c: B, cy: number, h: number, w: number): void => {
  const top = cy - h / 2;
  const bottom = cy + h / 2;
  const leaf = new Path().M([CX, bottom]);
  leaf.C([CX - w * 0.16, bottom - h * 0.36], [CX - w * 0.44, top + h * 0.5], [CX - w * 0.5, top + h * 0.3]);
  leaf.C([CX - w * 0.55, top + h * 0.14], [CX - w * 0.3, top + h * 0.02], [CX - w * 0.1, top + h * 0.02]);
  leaf.C([CX - w * 0.04, top + h * 0.02], [CX - w * 0.02, top + h * 0.09], [CX, top + h * 0.16]);
  leaf.C([CX + w * 0.02, top + h * 0.09], [CX + w * 0.04, top + h * 0.02], [CX + w * 0.1, top + h * 0.02]);
  leaf.C([CX + w * 0.3, top + h * 0.02], [CX + w * 0.55, top + h * 0.14], [CX + w * 0.5, top + h * 0.34]);
  leaf.C([CX + w * 0.44, top + h * 0.5], [CX + w * 0.16, bottom - h * 0.36], [CX, bottom]);
  leaf.Z();
  const veins: Path[] = [];
  for (const k of [-0.36, -0.22, -0.08, 0.08, 0.22, 0.36]) veins.push(lens([CX + k * w * 0.08, bottom - h * 0.2], [CX + k * w * 1.15, top + h * 0.2 + Math.abs(k) * h * 0.22], 0.04));
  c.fill("ginkgo", veins.reduce((acc, v) => acc.join(v), leaf), "evenodd");
};

export const icho = defineCrest({
  id: "icho",
  name: { en: "Ginkgo leaf", ja: "銀杏" },
  reading: "いちょう",
  romaji: "ichō",
  frame: "none",
  motifs: [{ motif: "ginkgo", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ginkgo", "gingko", "maidenhair"],
  construction: {
    en: "A fan opening from a short stalk, its top cut with a notch, with fine veins running up it.",
    ja: "短い葉柄から扇状に広がる葉を描き、上端に切れ込みを入れて、細い葉脈を放射状に通します。",
  },
  build(c) {
    c.guideLine([CX, 6], [CX, 194]);
    ichoLeaf(c, CY - 6, 168, 178);
    c.stroke("ginkgo", new Path().M([CX, 168]).L([CX, 192]), 7);
  },
});

export const maruNiIcho = defineCrest({
  id: "maru-ni-icho",
  name: { en: "Ginkgo leaf in a circle", ja: "丸に銀杏" },
  reading: "まるにいちょう",
  romaji: "maru ni ichō",
  frame: "ring-medium",
  motifs: [{ motif: "ginkgo", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ginkgo ring"],
  construction: { en: "The ginkgo leaf inside a ring about a tenth of the diameter thick.", ja: "直径の約10分の1の太さの輪の中に銀杏を収めます。" },
  build(c) {
    const inner = c.ring("ring-medium");
    ichoLeaf(c, CY - 6, inner * 1.62, inner * 1.62);
    c.stroke("ginkgo", new Path().M([CX, CY + inner * 0.72]).L([CX, CY + inner * 0.94]), 6);
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
    en: "A leaf of seven pointed lobes on a short stem, the middle one the longest, a white rib running out into each lobe from a curved line across the leaf's foot. The left half is drawn from the book and mirrored about the axis.",
    ja: "短い葉柄の上に、先の尖った七つの裂片を広げ、中央の裂片を最も長くします。葉の付け根を横切る曲線から、各裂片へ白い葉脈を通します。左半分を紋帳から写し取り、中心線で左右対称に返します。",
  },
  source: { ...SHINSEN_MONCHO, frame: 44, place: { en: "left page, third row, first column: 紅葉", ja: "左頁、三段目の一列目「紅葉」" }, read: READ },
  build(c) {
    c.guideLine([CX, 4], [CX, 196]);
    c.guideCircle(C0, R);
    mirrored(c, "maple", MOMIJI_LEFT);
  },
});
