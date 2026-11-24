// Crests of flowers seen from the front: plum, cherry, bellflower, wood sorrel, chrysanthemum.
import { C0, CX, CY, Path, bearing, circle, curveThrough, lens, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { heart } from "../construct/motifs.ts";
import { RING_GAP } from "../construct/builder.ts";
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
    en: "The plum bowl inside a ring about a tenth of the diameter thick, its petals a little clear of it.",
    ja: "直径の約10分の1の太さの輪の中に、花弁が輪に触れないよう少し離して梅鉢を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    umeBuild(c, inner - RING_GAP);
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
    en: "The mountain cherry inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に山桜を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    sakuraBuild(c, inner - RING_GAP);
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
    en: "The bellflower inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に桔梗を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kikyoBuild(c, inner - RING_GAP);
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
    en: "The wood sorrel inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に片喰を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    katabamiBuild(c, inner - RING_GAP);
  },
});

/** The sixteenth of a turn each chrysanthemum petal takes, and the sine of half of it. */
const KIKU_STEP = 22.5;
const KIKU_SIN = Math.sin((KIKU_STEP / 2) * (Math.PI / 180));

/** Where the circles (`c1`, `r1`) and (`c2`, `r2`) cross: the crossing to the left of the line from `c1` to `c2`, then the other. */
const crossings = (c1: Pt, r1: number, c2: Pt, r2: number): [Pt, Pt] => {
  const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const ux = (c2[0] - c1[0]) / d;
  const uy = (c2[1] - c1[1]) / d;
  const m: Pt = [c1[0] + ux * a, c1[1] + uy * a];

  return [
    [m[0] + uy * h, m[1] - ux * h],
    [m[0] - uy * h, m[1] + ux * h],
  ];
};

/**
 * One chrysanthemum petal standing straight up, as the sixteen-division (十六割) lays it out: its two sides run parallel to the
 * spokes a sixteenth of a turn apart, `s` / 2 inside them so that a white line `s` wide parts it from its neighbours, from the
 * circle `r0` to a round tip whose top is at `tip`. The tip is the circle that touches both sides.
 */
const kikuPetal = (r0: number, tip: number, s: number): { path: Path; centre: number; radius: number } => {
  const centre = (tip + s / 2) / (1 + KIKU_SIN);
  const radius = centre * KIKU_SIN - s / 2;
  const cos = Math.cos((KIKU_STEP / 2) * (Math.PI / 180));
  // The sides are the spokes at ±11.25 degrees moved s/2 toward the petal's axis.
  const side = (sign: number, r: number): Pt => {
    const along = polar(r, sign * (KIKU_STEP / 2));
    return [along[0] - sign * (s / 2) * cos, along[1] - (s / 2) * KIKU_SIN];
  };
  // The tip circle touches each side at the foot of the perpendicular from its centre.
  const touch = (sign: number): Pt => polar(radius, sign * (90 + KIKU_STEP / 2), [CX, CY - centre]);
  const base = (sign: number): Pt => side(sign, Math.sqrt(r0 * r0 - (s / 2) * (s / 2)));
  const path = new Path().M(base(-1)).L(touch(-1)).A(radius, 1, 1, touch(1)).L(base(1)).A(r0, 0, 0, base(-1)).Z();

  return { path, centre, radius };
};

/**
 * Sixteen-petal chrysanthemum, as the sixteen-division lays it out: sixteen petals packed edge to edge round a small centre disc, only
 * thin white lines between them, each widening from the centre to a round tip; for the double (八重) form, the round tips of sixteen
 * more petals behind show between the front tips at the rim.
 */
const kikuBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number, double: boolean): void => {
  const s = 2.2;
  const disc = reach * 0.118;
  const r0 = disc + s;
  const frontTip = double ? reach * 0.9 : reach;
  c.guideCircle(C0, reach);
  if (double) c.guideCircle(C0, frontTip);
  c.guideCircle(C0, disc);
  c.guideSpokes(16, KIKU_STEP / 2, reach);
  const front = kikuPetal(r0, frontTip, s);
  c.guideCircle([CX, CY - front.centre], front.radius);
  if (double) {
    // A petal behind, turned half a step: only what lies beyond its two neighbours' tips, kept s clear of them, shows.
    const back = kikuPetal(r0, reach, s);
    const axis = KIKU_STEP / 2;
    const bc = polar(back.centre, axis);
    const left: Pt = [CX, CY - front.centre];
    const right = polar(front.centre, KIKU_STEP);
    const clear = front.radius + s;
    const [, x1] = crossings(bc, back.radius, left, clear);
    const [x2] = crossings(bc, back.radius, right, clear);
    const [v] = crossings(left, clear, right, clear);
    const span = (((bearing(bc, x2) - bearing(bc, x1)) % 360) + 360) % 360;
    const tipOf = new Path().M(x1).A(back.radius, span > 180 ? 1 : 0, 1, x2).A(clear, 0, 0, v).A(clear, 0, 0, x1).Z();
    c.group(() => {
      for (let i = 0; i < 16; i += 1) c.fill("chrysanthemum", tipOf.rotate(i * KIKU_STEP));
    });
  }
  c.group(() => {
    for (let i = 0; i < 16; i += 1) c.fill("chrysanthemum", front.path.rotate(i * KIKU_STEP));
  });
  c.fill("chrysanthemum", circle(C0, disc));
};

export const jurokuYaeGiku = defineCrest({
  id: "juroku-yae-giku",
  name: { en: "Sixteen-petal chrysanthemum", ja: "十六八重表菊" },
  reading: "じゅうろくやえおもてぎく",
  romaji: "jūroku yae omote-giku",
  frame: "none",
  motifs: [{ motif: "chrysanthemum", count: 16, arrangement: "radial" }],
  families: [fam("The Imperial House of Japan", "皇室", "こうしつ")],
  aliases: ["imperial seal", "chrysanthemum seal", "kikka monsho", "kiku", "Kiku-mon", "Imperial Seal of Japan", "Chrysanthemum Seal"],
  construction: {
    en: "The sixteen-division: sixteen petals packed edge to edge round a small centre disc, each petal's two sides parallel to spokes a sixteenth of a turn apart with a thin white line between neighbours, and each ending in a round tip, the circle that touches both sides; at the rim, between the front tips, show the round tips of sixteen petals behind, turned half a petal.",
    ja: "十六割で割り付けます。中心の小さな円のまわりに花弁を16枚すき間なく並べ、各花弁の両側を22.5度ずつ離した放射線に平行にとって隣との間に細い白線を残し、先は両側に接する円で丸く収めます。外周では表の花弁の先の間から、半枚ずらした後ろの16枚の丸い先をのぞかせます。",
  },
  build(c) {
    kikuBuild(c, 96, true);
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
    en: "A single row of sixteen petals, as the sixteen-division lays them out, scaled to fill a ring about a tenth of the diameter thick, a narrow even gap inside it.",
    ja: "十六割で並べた一重の花弁16枚を縮めて、直径の約10分の1の太さの輪の中に、狭く均一な隙間を残して収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    kikuBuild(c, inner - RING_GAP, false);
  },
});
