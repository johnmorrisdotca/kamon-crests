// Crests of flowers seen from the front: plum, cherry, bellflower, wood sorrel, chrysanthemum.
import { C0, CX, CY, Path, circle, curveThrough, lens, polar } from "../construct/geo.ts";
import { heart } from "../construct/motifs.ts";
import { defineCrest, fam } from "./util.ts";

const umeBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  const petalR = reach * 0.365;
  const d = reach - petalR;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, d);
  c.guideSpokes(5, 0, reach);
  for (const a of [0, 72, 144, 216, 288]) {
    c.group(() => {
      c.guideCircle(polar(d, a), petalR);
      c.fill("plum", circle(polar(d, a), petalR));
    });
  }
  // The stamens: a small disc, ringed by five dots.
  c.group(() => {
    c.fill("plum", circle(C0, reach * 0.11));
    for (const a of [36, 108, 180, 252, 324]) c.fill("plum", circle(polar(reach * 0.22, a), reach * 0.038));
  });
};

export const umeBachi = defineCrest({
  id: "ume-bachi",
  name: { en: "Plum bowl", ja: "梅鉢" },
  reading: "うめばち",
  romaji: "umebachi",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Maeda", "前田", "まえだ"), fam("Sugawara (Tenjin shrines)", "菅原", "すがわら")],
  aliases: ["plum blossom", "ume", "tenjin"],
  construction: {
    en: "Five circles of one size set a fifth of a turn apart, each touching its neighbours; a small disc and five dots at the centre are the stamens.",
    ja: "同じ大きさの円を五つ、72度ずつ離して互いに接するように並べ、中央に小さな円と五つの点で雄しべを表します。",
  },
  build(c) {
    umeBuild(c, 90);
  },
});

export const maruNiUmeBachi = defineCrest({
  id: "maru-ni-ume-bachi",
  name: { en: "Plum bowl in a circle", ja: "丸に梅鉢" },
  reading: "まるにうめばち",
  romaji: "maru ni umebachi",
  frame: "ring-medium",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Maeda", "前田", "まえだ")],
  aliases: ["plum in ring"],
  construction: {
    en: "The plum bowl inside a ring a tenth of the diameter thick, its petals a little clear of it.",
    ja: "直径の10分の1の太さの輪の中に、花弁が輪に触れないよう少し離して梅鉢を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    umeBuild(c, inner - 3);
  },
});

/** A cherry petal pointing up from the centre: broad, with a notch in its tip. */
const sakuraPetal = (len: number, hw: number): Path => {
  const x = (v: number): number => CX + v;
  const y = (v: number): number => CY - v;
  const p = new Path().M([x(0), y(10)]);
  p.C([x(-hw * 0.45), y(len * 0.3)], [x(-hw * 1.18), y(len * 0.55)], [x(-hw * 0.9), y(len * 0.86)]);
  p.C([x(-hw * 0.74), y(len * 1.02)], [x(-hw * 0.3), y(len * 1.04)], [x(0), y(len * 0.84)]);
  p.C([x(hw * 0.3), y(len * 1.04)], [x(hw * 0.74), y(len * 1.02)], [x(hw * 0.9), y(len * 0.86)]);
  p.C([x(hw * 1.18), y(len * 0.55)], [x(hw * 0.45), y(len * 0.3)], [x(0), y(10)]);
  p.Z();

  return p;
};

const sakuraBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  const len = reach * 0.93;
  const hw = reach * 0.33;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, 10);
  c.guideSpokes(5, 0, reach);
  for (const a of [0, 72, 144, 216, 288]) c.fill("cherry", sakuraPetal(len, hw).rotate(a));
  c.group(() => {
    for (const a of [36, 108, 180, 252, 324]) c.fill("cherry", lens(polar(4, a), polar(reach * 0.2, a), 0.1));
  });
};

export const yamazakura = defineCrest({
  id: "yamazakura",
  name: { en: "Mountain cherry", ja: "山桜" },
  reading: "やまざくら",
  romaji: "yamazakura",
  frame: "none",
  motifs: [{ motif: "cherry", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["sakura", "cherry blossom"],
  construction: {
    en: "Five petals a fifth of a turn apart, each broad and notched at its tip, with five fine stamens from the centre.",
    ja: "先端に切れ込みのある幅広の花弁を五つ、72度ずつ離して並べ、中心から五本の雄しべを描きます。",
  },
  build(c) {
    sakuraBuild(c, 90);
  },
});

export const maruNiYamazakura = defineCrest({
  id: "maru-ni-yamazakura",
  name: { en: "Mountain cherry in a circle", ja: "丸に山桜" },
  reading: "まるにやまざくら",
  romaji: "maru ni yamazakura",
  frame: "ring-medium",
  motifs: [{ motif: "cherry", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["sakura in ring"],
  construction: {
    en: "The mountain cherry inside a ring a tenth of the diameter thick.",
    ja: "直径の10分の1の太さの輪の中に山桜を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    sakuraBuild(c, inner - 3);
  },
});

/** A bellflower: five broad petals with a point at the tip, parted by thin white lines, round a small black disc. */
const kikyoBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  c.guideCircle(C0, reach);
  c.guideCircle(C0, reach * 0.22);
  c.guideSpokes(5, 0, reach);
  c.group(() => {
    for (let i = 0; i < 5; i += 1) {
      const a = i * 72;
      const pts = [polar(reach * 0.25, a - 17), polar(reach * 0.6, a - 33), polar(reach * 0.88, a - 21), polar(reach, a), polar(reach * 0.88, a + 21), polar(reach * 0.6, a + 33), polar(reach * 0.25, a + 17)];
      const petal = new Path().M(pts[0]);
      curveThrough(petal, pts.slice(0, 4));
      curveThrough(petal, pts.slice(3));
      petal.L(polar(reach * 0.2, a));
      petal.Z();
      c.fill("bellflower", petal);
    }
  });
  c.fill("bellflower", circle(C0, reach * 0.13));
};

export const kikyo = defineCrest({
  id: "kikyo",
  name: { en: "Bellflower", ja: "桔梗" },
  reading: "ききょう",
  romaji: "kikyō",
  frame: "none",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [fam("Toki", "土岐", "とき"), fam("Akechi", "明智", "あけち")],
  aliases: ["platycodon", "balloon flower", "akechi"],
  construction: {
    en: "Five broad petals, each a rounded shoulder on either side of a point at its tip, set a fifth of a turn apart with a thin white line between them, round a small black disc.",
    ja: "肩の丸い幅広の花弁を五枚、先端に小さな尖りをつけ、72度ずつ離して、間に細い白線を残し、中央の小さな黒い円のまわりに並べます。",
  },
  build(c) {
    kikyoBuild(c, 90);
  },
});

export const maruNiKikyo = defineCrest({
  id: "maru-ni-kikyo",
  name: { en: "Bellflower in a circle", ja: "丸に桔梗" },
  reading: "まるにききょう",
  romaji: "maru ni kikyō",
  frame: "ring-medium",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [fam("Toki", "土岐", "とき")],
  aliases: ["toki"],
  construction: {
    en: "The bellflower inside a ring a tenth of the diameter thick.",
    ja: "直径の10分の1の太さの輪の中に桔梗を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kikyoBuild(c, inner - 3);
  },
});

/** Wood sorrel: three hearts, points together at the centre. */
const katabamiBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  c.guideCircle(C0, reach);
  c.guideSpokes(3, 0, reach);
  const L = reach - 8;
  for (const a of [0, 120, 240]) c.fill("wood-sorrel", heart(polar(6, a), a, L, L * 1.02, 0.18));
};

export const katabami = defineCrest({
  id: "katabami",
  name: { en: "Wood sorrel", ja: "片喰" },
  reading: "かたばみ",
  romaji: "katabami",
  frame: "none",
  motifs: [{ motif: "wood-sorrel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["oxalis", "sorrel"],
  construction: {
    en: "Three hearts of one size, their points meeting at the centre and their notches outward, a third of a turn apart.",
    ja: "同じ大きさの心形を三つ、先を中心に合わせ、切れ込みを外へ向けて、120度ずつ離して並べます。",
  },
  build(c) {
    katabamiBuild(c, 90);
  },
});

export const maruNiKatabami = defineCrest({
  id: "maru-ni-katabami",
  name: { en: "Wood sorrel in a circle", ja: "丸に片喰" },
  reading: "まるにかたばみ",
  romaji: "maru ni katabami",
  frame: "ring-medium",
  motifs: [{ motif: "wood-sorrel", count: 3, arrangement: "radial" }],
  families: [],
  aliases: ["sorrel in ring"],
  construction: {
    en: "The wood sorrel inside a ring a tenth of the diameter thick.",
    ja: "直径の10分の1の太さの輪の中に片喰を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    katabamiBuild(c, inner - 3);
  },
});

/** A rounded chrysanthemum petal standing up from `r0` to `r1`: narrow at the base, broad and round at the tip. */
const kikuPetal = (r0: number, r1: number, hb: number, ht: number): Path =>
  new Path()
    .M([CX - hb, CY - r0])
    .L([CX - ht, CY - (r1 - ht)])
    .A(ht, 0, 1, [CX + ht, CY - (r1 - ht)])
    .L([CX + hb, CY - r0])
    .Z();

/** Sixteen-petal chrysanthemum: sixteen rounded petals in front, nearly touching, and the rounded tips of sixteen behind peeking out between them (八重). */
const kikuBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number, double: boolean): void => {
  const step = 22.5;
  const half = Math.sin((step / 2) * (Math.PI / 180));
  const gap = 0.9;
  const frontTip = double ? reach * 0.88 : reach;
  const width = (r: number): number => half * r - gap;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, reach * 0.26);
  c.guideCircle(C0, frontTip);
  c.guideSpokes(16, 0, reach);
  if (double) {
    c.group(() => {
      for (let i = 0; i < 16; i += 1) c.fill("chrysanthemum", circle(polar(reach * 0.885, step / 2 + i * step), reach * 0.105));
    });
  }
  c.group(() => {
    for (let i = 0; i < 16; i += 1) {
      const ht = width(frontTip * 0.86);
      const petal = kikuPetal(reach * 0.26, frontTip, width(reach * 0.26), ht);
      const slit = lens([CX, CY - reach * 0.42], [CX, CY - frontTip * 0.7], 0.045);
      c.fill("chrysanthemum", petal.join(slit).rotate(i * step), "evenodd");
    }
  });
  c.fill("chrysanthemum", circle(C0, reach * 0.17));
};

export const jurokuYaeGiku = defineCrest({
  id: "juroku-yae-giku",
  name: { en: "Sixteen-petal chrysanthemum", ja: "十六八重表菊" },
  reading: "じゅうろくやえおもてぎく",
  romaji: "jūroku yae omote-giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [fam("The Imperial House of Japan", "皇室", "こうしつ")],
  aliases: ["imperial seal", "chrysanthemum seal", "kikka monsho", "kiku"],
  construction: {
    en: "Sixteen petals a sixteenth of a turn apart round a centre disc, with the tips of sixteen more petals showing between them; a fine line runs down each front petal.",
    ja: "中心の円のまわりに、花弁を16枚、22.5度ずつ離して並べ、その間から後ろの16枚の花弁の先をのぞかせます。表の花弁には細い筋を入れます。",
  },
  build(c) {
    kikuBuild(c, 92, true);
  },
});

export const maruNiKiku = defineCrest({
  id: "maru-ni-kiku",
  name: { en: "Chrysanthemum in a circle", ja: "丸に菊" },
  reading: "まるにきく",
  romaji: "maru ni kiku",
  frame: "ring-medium",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["kiku in ring"],
  construction: {
    en: "A single ring of sixteen petals inside a ring a tenth of the diameter thick.",
    ja: "直径の10分の1の太さの輪の中に、花弁16枚を一重に並べた菊を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kikuBuild(c, inner - 3, false);
  },
});
