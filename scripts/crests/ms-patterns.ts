// Pattern and shape crests from the 1892 crest book: squares set on their corner, and the three eyes. Every shape is the space
// between full-length ruled lines, and every proportion is a number measured from the book's own cell, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, R, poly } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import { defineCrest } from "./util.ts";

const READ_AT = "2026-11-26";

/** The four corners of a square stood on its corner: `h` out from `at` along the upright and level lines. */
const diamond = (h: number, at: Pt = C0): Pt[] => [[at[0], at[1] - h], [at[0] + h, at[1]], [at[0], at[1] + h], [at[0] - h, at[1]]];

/**
 * The square frame stood on its corner 隅立ち角: two diamonds about the centre, the outer one's corners on the layout circle and the
 * inner one's on a circle struck inside it, the black between them. The upright and level lines through the centre meet the two
 * circles in the eight corners, and the eight sides are ruled full length through them.
 */
const sumitachiBuild = (c: Builder, outer: number, inner: number): void => {
  c.guideCircle(C0, outer);
  c.guideCircle(C0, inner);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  c.fill("square-frame", poly(diamond(outer)).join(poly(diamond(inner))), "evenodd");
};

export const sumitachiKaku = defineCrest({
  id: "sumitachi-kaku",
  measured:
    "The 1892 crest book's すみたち角 (frame 19, right page, row 1, column 3 from the right), a square stood on its corner and drawn as two outlines, read as the positions of its corners in the frame's own pixels: the outer diamond 300 across and 303 high, the inner one 219 across and 217 high, so the inner is 0.72 of the outer and the band between them 29 thick at right angles to its sides, 0.14 of the outer side. The drawing takes the outer corners on the outer circle and a band 26 of the 96 across the corners.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 19,
    place: {
      en: "right page, row 1, third column from the right: すみたち角 (measured, and drawn with compass and ruler)",
      ja: "右頁、一段目、右から三列目「すみたち角」（寸法を測り、コンパスと定規で描いたもの）",
    },
    read: READ_AT,
    measured: true,
  },
  name: { en: "Square on its corner", ja: "隅立ち角" },
  reading: "すみたちかく",
  romaji: "sumitachi kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["隅立て角", "sumitate kaku", "square on a corner", "diamond frame"],
  construction: {
    en: "A square frame stood on its corner: the outer corners on the outer circle, the inner corners on a circle 26 inside it, the black between them. The upright and level lines through the centre meet the two circles in the eight corners, and the eight sides are ruled full length.",
    ja: "角で立てた正方形の枠です。外側の角は外円の上、内側の角は外円より26内側の円の上に置き、その間を黒くします。中心を通る縦と横の直線が二つの円と交わる八つの点が角で、八つの辺は端から端まで引きます。",
  },
  build(c) {
    // 96 to the outer corners and 70 to the inner: the book's 151 and 109 in its own pixels, 0.72.
    sumitachiBuild(c, 96, 70);
  },
});

/**
 * Three square eyes 三つ目: three squares stood on their corners at the corners of a right-angled triangle, the right angle at the
 * top, each with a square eye. The circle through the three outer corners (the left one's left, the right one's right and the top
 * one's top) has the middle of the long side as its centre, so it is the layout circle: the centres stand `d` from it to the left,
 * to the right and above, and the corners `h` beyond them, d + h = 96.
 */
const mitsumeBuild = (c: Builder, d: number, h: number, eye: number): void => {
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
  for (const at of [[CX - d, CY], [CX, CY - d], [CX + d, CY]] as Pt[]) c.fill("knot-eye", poly(diamond(h, at)).join(poly(diamond(eye, at))), "evenodd");
};

export const mitsume = defineCrest({
  id: "mitsume",
  measured:
    "The 1892 crest book's 三ッ目 (frame 20, right page, row 1, column 4 from the right), three squares stood on their corners at the corners of a right-angled triangle, each with a small square eye, read as the positions of their corners in the frame's own pixels: a square 147 across its corners, the centres of the left and right squares 162 apart and the top one 80 above their middle, so the circle through the three outer corners is 154.5 about the middle of the long side, a gap of 10.6 between neighbouring squares (0.10 of a side) and an eye 27 across its corners (0.18 of the square's). The drawing takes the layout circle as that circle: the centres 50 from its middle and the corners 46 beyond them, a gap of 5.7 (0.09 of a side) and an eye 8 from its middle to a corner.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 20,
    place: {
      en: "right page, row 1, fourth column from the right: 三ッ目 (measured, and drawn with compass and ruler)",
      ja: "右頁、一段目、右から四列目「三ッ目」（寸法を測り、コンパスと定規で描いたもの）",
    },
    read: READ_AT,
    measured: true,
  },
  name: { en: "Three eyes", ja: "三つ目" },
  reading: "みつめ",
  romaji: "mitsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 3, arrangement: "triangle" }],
  families: [],
  aliases: ["三つ目結", "mitsume yui", "three knot-eyes"],
  construction: {
    en: "Three squares stood on their corners at the corners of a right-angled triangle, the right angle at the top, a narrow white line between neighbours, each with a small square eye. The circle through the three outer corners is the layout circle; the upright and level lines through its centre meet the squares' corners, and the squares' sides are ruled full length.",
    ja: "角で立てた正方形を三つ、直角三角形の頂点に置きます。直角は上で、となり合う正方形の間は細い白線一本分あけ、どれも中央に小さな四角い目をあけます。三つの外側の角を通る円が外円です。中心を通る縦と横の直線が正方形の角と交わり、正方形の辺は端から端まで引きます。",
  },
  build(c) {
    mitsumeBuild(c, 50, 46, 8);
  },
});
