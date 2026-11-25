// Crests of flowers seen from the front: plum, cherry, bellflower, wood sorrel, chrysanthemum.
import { C0, CX, CY, Path, bearing, circle, polar } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { RING_GAP } from "../construct/builder.ts";
import { DEG, disc, onPage, toPath } from "../construct/compass.ts";
import type { Placing, V } from "../construct/compass.ts";
import { katabamiBuild as katabami3, kikyoBuild as kikyo5, sakuraBuild as sakura5 } from "./drawn/plain.ts";
import { defineCrest, fam } from "./util.ts";

/** The plum bowl's five discs on a circle, and the sunburst in the middle where there is one; `petal`, `middle` and `blocks` are fractions of `reach`. */
const umeBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number, petal = 0.365, middle = 0.1, blocks = [0.135, 0.26, 0.31]): void => {
  const petalR = reach * petal;
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
  // The middle: a small disc, and ten short blocks round it that widen outwards, the five between the petals the longer. Three
  // circles about the centre bound the blocks: each block's corners are on two of them, and its edges are ruled corner to corner.
  for (const k of blocks) c.guideCircle(C0, reach * k);
  c.group(() => {
    c.fill("plum", circle(C0, reach * middle));
    for (let i = 0; i < 10; i += 1) {
      const a = 36 * i;
      const to = reach * (i % 2 === 1 ? blocks[2] : blocks[1]);
      c.fill("plum", new Path().M(polar(reach * blocks[0], a - 9)).L(polar(to, a - 7)).L(polar(to, a + 7)).L(polar(reach * blocks[0], a + 9)).Z());
    }
  });
};

/** The plain plum bowl, measured from the 1892 book: five discs of 34 on a circle of 66 and a disc of 26 between them, the reach 100. */
const plainUmeBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const petal = (deg: number): V => [66 * Math.sin(deg * DEG), 66 * Math.cos(deg * DEG)];
  c.guideCircle(C0, reach);
  c.guideCircle(C0, 66 * placing.k);
  c.guideSpokes(5, 0, reach);
  c.guideCircle(C0, 26 * placing.k);
  c.guideCircle(onPage(petal(0), placing), 34 * placing.k);
  for (const a of [0, 72, 144, 216, 288]) c.fill("plum", toPath([disc(petal(a), 34)], placing));
  c.fill("plum", toPath([disc([0, 0], 26)], placing));
};

export const umeBachi = defineCrest({
  id: "ume-bachi",
  name: { en: "Plum bowl", ja: "梅鉢" },
  reading: "うめばち",
  romaji: "umebachi",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Sugawara (Tenjin shrines)", "菅原", "すがわら")],
  aliases: ["plum blossom", "ume", "tenjin"],
  measured: "The plain 梅鉢 of the 1892 crest book (frame 24, row 3, column 3 from the left of the left page), its six circles fitted by least squares: the five discs of radius 50.4 on a circle of radius 98.1 and a middle disc of radius 38.3, so in a reach of 100 the discs are 34 on 66 and the middle disc 26.",
  construction: {
    en: "Five equal discs on a circle round the centre, each a little apart from its neighbours, and in the middle a plain disc three quarters of one of them across.",
    ja: "同じ大きさの円を五つ、中心のまわりの円の上に、隣どうしが少し離れるように並べます。中央には、そのうちの一つの4分の3ほどの大きさの無地の円を置きます。",
  },
  build(c) {
    plainUmeBuild(c, 90);
  },
});

export const kagaUmebachi = defineCrest({
  id: "kaga-umebachi",
  name: { en: "Kaga plum bowl", ja: "加賀梅鉢" },
  reading: "かがうめばち",
  romaji: "kaga umebachi",
  frame: "none",
  motifs: [{ motif: "plum", count: 5, arrangement: "radial" }],
  families: [fam("Maeda", "前田", "まえだ")],
  aliases: ["kaga plum", "maeda plum", "plum blossom with a sunburst"],
  measured: "The 加賀梅鉢 of the 1892 crest book (frame 24, row 2, column 3 from the left of the left page), its circles fitted by least squares: the five discs of radius 50.8 on a circle of radius 102.6, a middle disc of radius 20.5, so in a reach of 100 the discs are 33 on 67 and the middle disc 13; the longer blocks of the sunburst reach 38 and the shorter 32, from 16 out. The book draws the blocks as pointed fans in outline, drawn here as flat-ended blocks.",
  construction: {
    en: "Five equal discs on a circle round the centre, and in the middle a disc with ten short blocks round it that widen outwards, the five that point between the petals the longer.",
    ja: "同じ大きさの円を五つ、中心のまわりの円の上に並べます。中央に円を置き、そのまわりに、外へ向かって広がる短い台形を十個並べます。そのうち、花びらの間に向く五つは、ほかの五つより長くします。",
  },
  build(c) {
    umeBuild(c, 90, 0.33, 0.13, [0.16, 0.32, 0.38]);
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
    en: "The plum bowl inside a ring about a tenth of the diameter thick.",
    ja: "直径の約10分の1の太さの輪の中に梅鉢を収めます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    plainUmeBuild(c, inner - RING_GAP);
  },
});

/** A cherry petal pointing up from the centre: broad, with a notch in its tip. */
const sakuraBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => sakura5(c, "cherry", reach);

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
    en: "Five petals, each notched at its tip, round a small disc; on each petal three thin white stamens run out from near the centre and end in a dot.",
    ja: "先に切れ込みのある花弁を五枚、小さな円のまわりに並べます。各花弁に、中心の近くから伸びて先が点で終わる細い白いしべを三本入れます。",
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
const kikyoBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => kikyo5(c, "bellflower", reach);

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
    en: "Five petals. On each side of a petal a round shoulder, the arc of a circle from the notch between petals, and touching it a flatter arc that runs up to the tip, where the two sides meet in a small sharp point; below the notches its sides are ruled to the centre. A white gap parts neighbours, a short white ray runs up the middle of each petal, and in the centre is a plain round disc with a white line round it.",
    ja: "花弁は五枚です。花弁の両側は、花弁の間の切れ込みから始まる円の弧（丸い肩）と、それに接して先まで伸びるゆるい弧でできていて、左右の弧が先で小さく尖って出会います。切れ込みから下の辺は、中心への直線です。隣どうしは白い隙間で分け、各花弁の中央に短い白い線を一本入れます。中心には、白い線で囲んだ丸を置きます。",
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
const katabamiBuild = (c: Parameters<(typeof umeBachi)["build"]>[0], reach: number): void => katabami3(c, "wood-sorrel", reach);

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
    en: "Three broad heart leaves that nearly touch, their points at the centre. A leaf is two circles side by side and the two ruled lines from the centre that touch them. Between the leaves stand three short stamens with round ends, and a small disc sits in a white ring at the centre.",
    ja: "幅の広い心形の葉を三枚、葉先を中心に向けて、ほとんど接するように置きます。葉は、並んだ二つの円と、中心からその円に接する二本の直線でできます。葉の間に、先の丸い短いしべを三本立て、中心には白い輪の中に小さな円を置きます。",
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
  c.guideCircle(polar(front.centre, 0), front.radius);
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
    c.guideCircle(bc, back.radius);
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
