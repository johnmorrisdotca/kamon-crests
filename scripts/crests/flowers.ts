// Crests of flowers seen from the front: plum, cherry, bellflower, wood sorrel, chrysanthemum.
import { C0, CX, CY, Path, circle, lens, polar } from "../construct/geo.ts";
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
  frame: "ring-thin",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Maeda", "前田", "まえだ")],
  aliases: ["plum in ring"],
  construction: {
    en: "The plum bowl inside a thin ring, its petals a little clear of it.",
    ja: "細輪の中に、花弁が輪に触れないよう少し離して梅鉢を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
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
  frame: "ring-thin",
  motifs: [{ motif: "cherry", count: 5, arrangement: "radial" }],
  families: [],
  aliases: ["sakura in ring"],
  construction: {
    en: "The mountain cherry inside a thin ring.",
    ja: "細輪の中に山桜を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
    sakuraBuild(c, inner - 3);
  },
});

/** A bellflower: five pointed petals with full, curved sides, and a slit down the middle of each. */
const kikyoBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  const inner = reach * 0.44;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, inner);
  c.guideSpokes(5, 0, reach);
  const star = new Path().M(polar(reach, 0));
  for (let i = 0; i < 5; i += 1) {
    const valley = polar(inner, i * 72 + 36);
    const next = polar(reach, (i + 1) * 72);
    const outA = polar(reach * 0.8, i * 72 + 19);
    const outB = polar(reach * 0.8, i * 72 + 53);
    star.Q(outA, valley).Q(outB, next);
  }
  star.Z();
  const slits = [0, 72, 144, 216, 288].map((a) => lens(polar(reach * 0.3, a), polar(reach * 0.64, a), 0.06));
  c.fill("bellflower", slits.reduce((acc, s) => acc.join(s), star), "evenodd");
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
    en: "A five-pointed star whose sides bow outward, the valleys at a third of the reach, with a fine slit down the middle of each petal.",
    ja: "辺をふくらませた五角の星形を描き、谷を外周の3分の1の位置に置いて、各花弁の中央に細い切れ目を入れます。",
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
  frame: "ring-thin",
  motifs: [{ motif: "bellflower", count: 5, arrangement: "radial" }],
  families: [fam("Toki", "土岐", "とき")],
  aliases: ["toki"],
  construction: {
    en: "The bellflower inside a thin ring.",
    ja: "細輪の中に桔梗を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
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

/** Sixteen-petal chrysanthemum: sixteen front petals and, between them, the tips of sixteen behind. */
const kikuBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number, double: boolean): void => {
  c.guideCircle(C0, reach);
  c.guideCircle(C0, reach * 0.3);
  c.guideSpokes(16, 0, reach);
  if (double) {
    c.group(() => {
      for (let i = 0; i < 16; i += 1) c.fill("chrysanthemum", lens(polar(reach * 0.48, 11.25 + i * 22.5), polar(reach * 1.0, 11.25 + i * 22.5), 0.17));
    });
  }
  const front = double ? 0.82 : 0.98;
  c.group(() => {
    for (let i = 0; i < 16; i += 1) {
      const a = i * 22.5;
      const petal = lens(polar(reach * 0.3, a), polar(reach * front, a), double ? 0.2 : 0.22);
      const slit = lens(polar(reach * 0.42, a), polar(reach * (front - 0.14), a), 0.06);
      c.fill("chrysanthemum", petal.join(slit), "evenodd");
    }
  });
  c.fill("chrysanthemum", circle(C0, reach * 0.14));
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
  frame: "ring-thin",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [],
  aliases: ["kiku in ring"],
  construction: {
    en: "A single ring of sixteen petals inside a thin ring.",
    ja: "細輪の中に、花弁16枚を一重に並べた菊を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-thin");
    kikuBuild(c, inner - 3, false);
  },
});
