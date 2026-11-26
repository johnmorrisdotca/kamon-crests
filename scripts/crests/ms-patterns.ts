// Pattern and shape crests from the 1892 crest book: squares set on their corner, and the three eyes. Every shape is the space
// between full-length ruled lines, and every proportion is a number measured from the book's own cell, never traced.
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, Path, R, poly, turn } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { SHINSEN_MONCHO } from "./books.ts";
import type { CrestDef } from "./types.ts";
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

/**
 * One outline of the inset-corner square 隅入り角: a square stood on its corner whose four corners are each cut by a notch, so that
 * every corner is two round lobes with a point between them. A lobe is a circle of radius `rho` whose centre stands `reach` from the
 * middle of the crest, `half` to one side of the upright (or level) line through it; the two lobes of a corner cross on that line
 * at the notch, and each is touched by one of the square's slanting sides, which are ruled at half a right angle. Clockwise from the
 * top: the top corner's two lobes, the side down to the right corner, and so on round.
 */
const sumiiriLoop = (reach: number, half: number, rho: number): Path => {
  const up = Math.sqrt(reach * reach - half * half);
  const notch = Math.sqrt(rho * rho - half * half);
  const h = Math.SQRT1_2;
  const at = (x: number, y: number): [number, number] => [CX + x, CY + y];
  const path = new Path();
  for (let i = 0; i < 4; i += 1) {
    const place = (x: number, y: number): [number, number] => turn(at(x, y), 90 * i);
    const start = place(-half - rho * h, -up - rho * h);
    if (i === 0) path.M(start);
    else path.L(start);
    path.A(rho, 0, 1, place(0, -up - notch)).A(rho, 0, 1, place(half + rho * h, -up - rho * h));
  }

  return path.Z();
};

export const sumiiriKaku = defineCrest({
  id: "sumiiri-kaku",
  measured:
    "The 1892 crest book's すミ入角 (frame 45, left page, row 4, column 4 from the right), a square stood on its corner and drawn as two outlines, each corner two round lobes with a point between them, read as the positions of its corners and lobes in the frame's own pixels: the outer outline's lobes 31 across their radius with their tops 57 apart and the point between them 20 below the tops, so a lobe stands 74 from the middle and its top 144 out; the inner outline's lobes 25 across their radius, 47 apart and the point 16 below, the top 99 out; the band between the sides 38 across, and every side at half a right angle. The drawing takes the outer lobes' far points on the outer circle: lobes 20 across their radius and 18 to each side of the line through the middle, 76 from it; the inner lobes 16 across, 15 to each side, 48 from the middle.",
  source: {
    ...SHINSEN_MONCHO,
    frame: 45,
    place: {
      en: "left page, row 4, fourth column from the right: すミ入角 (measured, and drawn with compass and ruler)",
      ja: "左頁、四段目、右から四列目「すミ入角」（寸法を測り、コンパスと定規で描いたもの）",
    },
    read: READ_AT,
    measured: true,
  },
  name: { en: "Inset-corner square", ja: "隅入り角" },
  reading: "すみいりかく",
  romaji: "sumiiri kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["隅入角", "角入り角", "sumiiri kaku", "notched-corner square"],
  construction: {
    en: "A square frame stood on its corner whose four corners are each notched: two round lobes, 20 across their radius, with a point between them. The lobes' centres stand 76 from the middle, 18 to each side of the upright and level lines, so the outer circle touches all eight; the slanting sides are ruled at half a right angle to touch the lobes. The inner outline is the same with lobes 16 across, 48 from the middle.",
    ja: "角で立てた正方形の枠で、四つの角にそれぞれ切れ込みを入れます。角は半径20の丸い膨らみが二つ並び、その間が尖ります。膨らみの中心は中央から76、縦横の中心線から左右に18の位置にあり、外円は八つ全部に触れます。斜めの辺は45度に引き、膨らみに接します。内側の輪郭は半径16、中央から48の膨らみで、同じ形です。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.guideCircle(C0, 76);
    c.guideCircle(C0, 48);
    c.guideLine([CX, CY - R], [CX, CY + R]);
    c.guideLine([CX - R, CY], [CX + R, CY]);
    c.fill("square-frame", sumiiriLoop(76, 18, 20).join(sumiiriLoop(48, 15, 16)), "evenodd");
  },
});

/** A square stood on its corner about `at` with a square eye: the black between two diamonds, `h` and `eye` out to their corners. */
const eyed = (h: number, eye: number, at: Pt): Path => poly(diamond(h, at)).join(poly(diamond(eye, at)));

/** What every drawing of eyes in a diamond lays out first: the layout circle and the upright and level lines through its centre. */
const layOutEyes = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
};

/** The fields a book's cell is cited by, written the same way each time. */
const cell = (frame: number, en: string, ja: string): NonNullable<CrestDef["source"]> => ({
  ...SHINSEN_MONCHO,
  frame,
  place: { en: `${en} (measured, and drawn with compass and ruler)`, ja: `${ja}（寸法を測り、コンパスと定規で描いたもの）` },
  read: READ_AT,
  measured: true,
});

export const yokoYotsume = defineCrest({
  id: "yoko-yotsume",
  measured:
    "The 1892 crest book's 横四ッ目 (frame 19, left page, row 2, column 3 from the right), four squares stood on their corners at the top, bottom, left and right, each with a small square eye, read as the positions of their corners in the frame's own pixels: the centres 89 above, below, left and right of the middle of the crest, a square 134 across its corners (67 out), a gap of 32 between neighbouring squares (0.34 of a side) and an eye 46 across its corners (0.34 of the square's). The drawing takes the circle through the four outer corners as the layout circle: the centres 55 from its middle and the corners 41 beyond them, an eye 14 from its middle to a corner.",
  source: cell(19, "left page, row 2, third column from the right: 横四ッ目", "左頁、二段目、右から三列目「横四ッ目」"),
  name: { en: "Sideways four eyes", ja: "横四つ目" },
  reading: "よこよつめ",
  romaji: "yoko yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["横四つ目結", "yoko yotsume yui"],
  construction: {
    en: "Four squares stood on their corners, one above, one below, one to the left and one to the right of the middle, a gap between neighbours a third of a side wide, each with a small square eye. The circle through the four outer corners is the layout circle; the upright and level lines through its centre meet the corners, and the squares' sides are ruled full length.",
    ja: "角で立てた正方形を四つ、中心の上、下、左、右に置きます。となり合う正方形の間は一辺の3分の1ほどあけ、どれも中央に小さな四角い目をあけます。四つの外側の角を通る円が外円です。中心を通る縦と横の直線が角と交わり、正方形の辺は端から端まで引きます。",
  },
  build(c) {
    layOutEyes(c);
    for (const at of [[CX, CY - 55], [CX + 55, CY], [CX, CY + 55], [CX - 55, CY]] as Pt[]) c.fill("knot-eye", eyed(41, 14, at), "evenodd");
  },
});

export const tsunagiYotsume = defineCrest({
  id: "tsunagi-yotsume",
  measured:
    "The 1892 crest book's つなぎ四ッ目 (frame 19, left page, row 4, column 4 from the right), four squares stood on their corners, two above two, each corner touching the next one's, each with a small square eye, read as the positions of their corners in the frame's own pixels: a square 159 across its corners, the centres 76 right and left and 73 above and below the middle, and the eight outer corners 170 from the middle, with an eye 39 across its corners (0.25 of the square's). The drawing makes the squares touch exactly, so the eight outer corners stand on the layout circle: a square 43 out to its corners, the centres 43 from the middle each way, an eye 10.5 out.",
  source: cell(19, "left page, row 4, fourth column from the right: つなぎ四ッ目", "左頁、四段目、右から四列目「つなぎ四ッ目」"),
  name: { en: "Linked four eyes", ja: "繋ぎ四つ目" },
  reading: "つなぎよつめ",
  romaji: "tsunagi yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["つなぎ四つ目", "tsunagi yotsume yui"],
  construction: {
    en: "Four squares stood on their corners, two above two, each touching the next at a corner, so that a small diamond of white is left in the middle; each has a small square eye. The eight outer corners stand on the layout circle, and the sides of the squares are ruled full length.",
    ja: "角で立てた正方形を上下二つずつ四つ並べ、となり合う正方形は角で触れ合わせます。中央には小さな菱形の白が残り、どれも中央に小さな四角い目をあけます。外側の八つの角は外円の上にあり、正方形の辺は端から端まで引きます。",
  },
  build(c) {
    layOutEyes(c);
    const h = R / Math.sqrt(5);
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) c.fill("knot-eye", eyed(h, 10.5, [CX + sx * h, CY + sy * h]), "evenodd");
  },
});

