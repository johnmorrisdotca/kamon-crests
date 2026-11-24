// Crests of leaves and sprays: oak, hollyhock, sword-leaf, ginkgo, maple, bamboo grass.
import { C0, CX, CY, Path, lens, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { scallopedLeaf } from "../construct/motifs.ts";
import { defineCrest, fam } from "./util.ts";

type B = Parameters<(typeof mitsubaAoi)["build"]>[0];

/** A hollyhock leaf: a broad heart with its point outward, scalloped, with veins running out from the stem. */
export const aoiLeaf = (origin: Pt, deg: number, L: number): { leaf: Path; veins: Path[] } => {
  const profile: [number, number][] = [[0, 1.0], [25, 0.8], [55, 0.72], [85, 0.62], [112, 0.46], [138, 0.28], [160, 0.15], [180, 0.1]];
  const leaf = scallopedLeaf(origin, deg, L, profile, 7, 0.045);
  const veins: Path[] = [];
  for (const a of [0, 22, -22, 46, -46, 72, -72, 100, -100]) {
    const reach = (a === 0 ? 0.86 : Math.abs(a) < 60 ? 0.76 : 0.6) * L;
    const start = polar(L * (Math.abs(a) > 70 ? 0.36 : 0.17), deg + a, origin);
    const end = polar(reach, deg + a, origin);
    veins.push(lens(start, end, 0.035));
  }

  return { leaf, veins };
};

const aoiBuild = (c: B, reach: number): void => {
  const L = reach * 0.8;
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 0, reach);
  for (const a of [0, 120, 240]) {
    const { leaf, veins } = aoiLeaf(polar(reach * 0.2, a), a, L);
    c.group(() => c.fill("hollyhock", veins.reduce((acc, v) => acc.join(v), leaf), "evenodd"));
  }
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
  frame: "ring-thin",
  motifs: [{ motif: "hollyhock", count: 3, arrangement: "radial" }],
  families: [fam("Tokugawa", "徳川", "とくがわ"), fam("Matsudaira", "松平", "まつだいら")],
  aliases: ["tokugawa ring"],
  construction: {
    en: "The three hollyhock leaves inside a thin ring.",
    ja: "細輪の中に三つ葉葵を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
    aoiBuild(c, inner - 2);
  },
});

/** An oak leaf: long, with rounded lobes down each side, a midrib and slanting veins. */
const oakLeaf = (origin: Pt, deg: number, L: number): Path => {
  const profile: [number, number][] = [[0, 1.0], [9, 0.92], [20, 0.76], [38, 0.54], [65, 0.36], [105, 0.18], [150, 0.09], [180, 0.06]];
  const leaf = scallopedLeaf(origin, deg, L, profile, 4, 0.16);
  const rib = lens(polar(L * 0.12, deg, origin), polar(L * 0.86, deg, origin), 0.02);
  const sides: Path[] = [];
  for (const [r0, r1, a] of [[0.3, 0.52, 28], [0.45, 0.66, 24], [0.6, 0.8, 18]] as const) {
    for (const sign of [-1, 1]) sides.push(lens(polar(L * r0, deg, origin), polar(L * r1, deg + sign * a, origin), 0.07));
  }

  return [rib, ...sides].reduce((acc, p) => acc.join(p), leaf);
};

const kashiwaBuild = (c: B, reach: number): void => {
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 0, reach);
  for (const a of [0, 120, 240]) c.stroke("oak", new Path().M(polar(reach * 0.02, a)).L(polar(reach * 0.25, a)), 5);
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
  frame: "ring-thin",
  motifs: [{ motif: "oak", count: 3, arrangement: "radial" }],
  families: [fam("Yamauchi (Tosa)", "山内", "やまうち")],
  aliases: ["kashiwa in ring"],
  construction: { en: "The three oak leaves inside a thin ring.", ja: "細輪の中に三つ柏を収めます。" },
  build(c) {
    const inner = c.ring("ring-thin");
    kashiwaBuild(c, inner - 2);
  },
});

/** An arrowhead leaf, point up, with two barbs, and a midrib. */
const omodakaLeaf = (c: B, dx: number, top: number, bottom: number, w: number): void => {
  const H = bottom - top;
  const at = (x: number, y: number): Pt => [CX + dx + x, top + H * y];
  const leaf = new Path().M(at(0, 0));
  leaf.C(at(w * 0.3, 0.18), at(w * 0.4, 0.4), at(w * 0.3, 0.6));
  leaf.C(at(w * 0.58, 0.64), at(w * 0.8, 0.82), at(w * 0.9, 0.98));
  leaf.C(at(w * 0.5, 0.94), at(w * 0.2, 0.86), at(0, 0.76));
  leaf.C(at(-w * 0.2, 0.86), at(-w * 0.5, 0.94), at(-w * 0.9, 0.98));
  leaf.C(at(-w * 0.8, 0.82), at(-w * 0.58, 0.64), at(-w * 0.3, 0.6));
  leaf.C(at(-w * 0.4, 0.4), at(-w * 0.3, 0.18), at(0, 0));
  leaf.Z();
  const rib = lens(at(0, 0.1), at(0, 0.66), 0.03);
  c.fill("sword-leaf", leaf.join(rib), "evenodd");
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
    en: "One arrow-shaped leaf, its two barbs a little below the middle, with a rib down the centre.",
    ja: "矢じり形の葉を一枚描き、二つの耳を中ほどより少し下に置いて、中央に葉脈を一本通します。",
  },
  build(c) {
    c.guideLine([CX, 8], [CX, 192]);
    omodakaLeaf(c, 0, 12, 188, 86);
  },
});

export const maruNiOmodaka = defineCrest({
  id: "maru-ni-omodaka",
  name: { en: "Water plantain in a circle", ja: "丸に沢瀉" },
  reading: "まるにおもだか",
  romaji: "maru ni omodaka",
  frame: "ring-thin",
  motifs: [{ motif: "sword-leaf", count: 1, arrangement: "single" }],
  families: [fam("Mizuno", "水野", "みずの")],
  aliases: ["omodaka ring"],
  construction: { en: "The arrow-shaped leaf inside a thin ring.", ja: "細輪の中に沢瀉を収めます。" },
  build(c) {
    const inner = c.ring("ring-thin");
    omodakaLeaf(c, 0, CY - inner + 8, CY + inner - 8, inner * 0.8);
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
  frame: "ring-thin",
  motifs: [{ motif: "ginkgo", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["ginkgo ring"],
  construction: { en: "The ginkgo leaf inside a thin ring.", ja: "細輪の中に銀杏を収めます。" },
  build(c) {
    const inner = c.ring("ring-thin");
    ichoLeaf(c, CY - 6, inner * 1.62, inner * 1.62);
    c.stroke("ginkgo", new Path().M([CX, CY + inner * 0.72]).L([CX, CY + inner * 0.94]), 6);
  },
});

/** A maple leaf: five pointed lobes, each toothed, with a rib in each. */
const momijiLeaf = (c: B, reach: number): void => {
  const pts: Pt[] = [];
  const spread = 36;
  const lobe = (center: number, size: number): void => {
    const at = (r: number, k: number): Pt => polar(reach * r * size, center + k * spread);
    pts.push(polar(reach * 0.3, center - spread));
    pts.push(at(0.66, -0.86));
    pts.push(at(0.56, -0.62));
    pts.push(at(0.84, -0.4));
    pts.push(at(0.7, -0.2));
    pts.push(at(1.0, 0));
    pts.push(at(0.7, 0.2));
    pts.push(at(0.84, 0.4));
    pts.push(at(0.56, 0.62));
    pts.push(at(0.66, 0.86));
  };
  const centers: [number, number][] = [[0, 1], [72, 0.95], [144, 0.88], [216, 0.88], [288, 0.95]];
  for (const [a, size] of centers) lobe(a, size);
  const leaf = new Path().M(pts[0]);
  for (const p of pts.slice(1)) leaf.L(p);
  leaf.Z();
  const ribs = centers.map(([a, size]) => lens(polar(reach * 0.12, a), polar(reach * 0.8 * size, a), 0.03));
  c.fill("maple", ribs.reduce((acc, v) => acc.join(v), leaf), "evenodd");
};

export const momiji = defineCrest({
  id: "momiji",
  name: { en: "Maple leaf", ja: "紅葉" },
  reading: "もみじ",
  romaji: "momiji",
  frame: "none",
  motifs: [{ motif: "maple", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["maple", "kaede", "autumn leaf"],
  construction: {
    en: "A leaf of five pointed lobes a fifth of a turn apart, each lobe toothed twice down each side, with a rib in every lobe.",
    ja: "先の尖った五つの裂片を72度ずつ離して置き、各裂片の両側に二つずつ鋸歯をつけ、すべての裂片に中肋を通します。",
  },
  build(c) {
    c.guideCircle(C0, 90);
    c.guideSpokes(5, 0, 90);
    momijiLeaf(c, 92);
  },
});
