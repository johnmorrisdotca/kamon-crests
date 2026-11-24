// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass.
import { C0, CX, CY, Path, circle, lens, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { herringbone, profileRadius, scallopedLeaf, slit } from "../construct/motifs.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof mitsubaAoi)["build"]>[0];

/** A hollyhock leaf: a broad scalloped heart, point outward, with a midrib and veins that curve out from it, all cut as white slits. */
export const aoiLeaf = (origin: Pt, deg: number, L: number): { leaf: Path; veins: Path[] } => {
  const profile: [number, number][] = [[0, 1.0], [24, 0.86], [52, 0.76], [84, 0.64], [112, 0.5], [138, 0.3], [160, 0.16], [180, 0.1]];
  const leaf = scallopedLeaf(origin, deg, L, profile, 6, 0.04);

  return { leaf, veins: herringbone(origin, deg, L, profileRadius(profile), 7, 38, 0, 2.2, 0.86, 0.92, 0.12) };
};

const aoiBuild = (c: B, reach: number): void => {
  const L = reach * 0.74;
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 60, reach);
  for (const a of [180, 60, 300]) {
    const { leaf, veins } = aoiLeaf(polar(reach * 0.2, a), a, L);
    c.group(() => c.fill("hollyhock", veins.reduce((acc, v) => acc.join(v), leaf), "evenodd"));
  }
  c.fill("hollyhock", circle(C0, reach * 0.05));
};

export const mitsubaAoi = defineCrest({
  id: "mitsuba-aoi",
  name: { en: "Three hollyhock leaves", ja: "三つ葉葵" },
  reading: "みつばあおい",
  romaji: "mitsuba-aoi",
  frame: "none",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [fam("Tokugawa", "徳川", "とくがわ"), fam("Matsudaira", "松平", "まつだいら")],
  aliases: ["tokugawa", "hollyhock", "aoi", "three-leaf hollyhock"],
  construction: {
    en: "Three heart-shaped leaves with scalloped edges, their notches together at the centre, a third of a turn apart; fine veins fan out from each stem.",
    ja: "縁に波のある心形の葉を三枚、切れ込みを中心に合わせて120度ずつ離して置き、各々の葉柄から細い葉脈を扇状に広げます。",
  },
  build(c) {
    aoiBuild(c, 90);
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
  aliases: ["tokugawa ring"],
  construction: {
    en: "The three hollyhock leaves inside a ring a tenth of the diameter thick.",
    ja: "直径の10分の1の太さの輪の中に三つ葉葵を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    aoiBuild(c, inner - 2);
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
  construction: { en: "The three oak leaves inside a ring a tenth of the diameter thick.", ja: "直径の10分の1の太さの輪の中に三つ柏を収めます。" },
  build(c) {
    const inner = c.ring("ring-medium");
    kashiwaBuild(c, inner - 2);
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
  construction: { en: "The water plantain inside a ring a tenth of the diameter thick.", ja: "直径の10分の1の太さの輪の中に沢瀉を収めます。" },
  build(c) {
    const inner = c.ring("ring-medium");
    omodakaBuild(c, inner - 2);
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
  construction: { en: "The ginkgo leaf inside a ring a tenth of the diameter thick.", ja: "直径の10分の1の太さの輪の中に銀杏を収めます。" },
  build(c) {
    const inner = c.ring("ring-medium");
    ichoLeaf(c, CY - 6, inner * 1.62, inner * 1.62);
    c.stroke("ginkgo", new Path().M([CX, CY + inner * 0.72]).L([CX, CY + inner * 0.94]), 6);
  },
});

/** A maple leaf: seven lobes, symmetric about the stalk, each finely toothed along both sides, with a rib in every lobe. */
const momijiLeaf = (c: B, reach: number): void => {
  const lobes: [number, number][] = [[-135, 0.6], [-90, 0.8], [-45, 0.95], [0, 1], [45, 0.95], [90, 0.8], [135, 0.6]];
  const half = 22.5;
  const pts: Pt[] = [];
  lobes.forEach(([a, size], i) => {
    const teeth: [number, number][] = [[24, 0.4], [20, 0.58], [14, 0.76]];
    // from the valley before the lobe, out along its left side, over its tip, and back down the right side
    if (i === 0) pts.push(polar(reach * 0.22, a - half));
    for (const [w, r] of teeth) {
      pts.push(polar(reach * (r * size - 0.012), a - w * 0.7));
      pts.push(polar(reach * (r * size + 0.07 * size), a - w));
    }
    pts.push(polar(reach * size, a));
    for (const [w, r] of [...teeth].reverse()) {
      pts.push(polar(reach * (r * size + 0.07 * size), a + w));
      pts.push(polar(reach * (r * size - 0.012), a + w * 0.7));
    }
    const next = lobes[i + 1];
    pts.push(polar(reach * 0.24, next === undefined ? a + half : (a + next[0]) / 2));
  });
  const leaf = new Path().M(pts[0]);
  for (const p of pts.slice(1)) leaf.L(p);
  leaf.Z();
  const ribs = lobes.map(([a, size]) => slit([polar(reach * 0.16, a), polar(reach * 0.5 * size, a), polar(reach * 0.82 * size, a)], 2.2));
  c.fill("maple", ribs.reduce((acc, v) => acc.join(v), leaf), "evenodd");
  c.stroke("maple", new Path().M(polar(reach * 0.1, 180)).L(polar(reach * 0.5, 180)), 5);
};

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
    en: "A leaf of seven pointed lobes spread over three quarters of a turn about the stalk, the middle one longest and the lowest shortest, each toothed three times down each side, with a rib in every lobe.",
    ja: "葉柄を中心に4分の3回転にわたって、先の尖った七つの裂片を扇状に置きます。中央が最も長く、下の裂片が最も短く、各裂片の両側に三つずつ鋸歯をつけ、すべての裂片に中肋を通します。",
  },
  build(c) {
    c.guideCircle(C0, 90);
    c.guideSpokes(7, -135, 90);
    momijiLeaf(c, 90);
  },
});
