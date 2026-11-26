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
    ja: "角を上下左右に向けた正方形の枠です。外側の角は外円の上、内側の角は外円より26内側の円の上に置き、その間を黒くします。中心を通る縦と横の直線が二つの円と交わる八つの点が角で、八つの辺は端から端まで引きます。",
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
    ja: "角を上下左右に向けた正方形を三つ、直角三角形の頂点に置きます。直角は上で、となり合う正方形の間には細い白線を残し、どの正方形にも中央に小さな四角い目を白く抜きます。外側の三つの角を通る円が外円です。中心を通る縦と横の直線が正方形の角と交わり、正方形の辺は端から端まで引きます。",
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
  aliases: ["隅入角", "sumiiri kaku", "notched-corner square"],
  construction: {
    en: "A square frame stood on its corner whose four corners are each notched: two round lobes, 20 across their radius, with a point between them. The lobes' centres stand 76 from the middle, 18 to each side of the upright and level lines, so the outer circle touches all eight; the slanting sides are ruled at half a right angle to touch the lobes. The inner outline is the same with lobes 16 across, 48 from the middle.",
    ja: "角を上下左右に向けた正方形の枠で、四つの角にそれぞれ切れ込みを入れます。切れ込みのある角は、半径20の丸いふくらみが二つ並び、その間がとがります。ふくらみの中心は中心から76、縦横の中心線から左右に18の位置にあり、外円はふくらみ八つ全部に触れます。斜めの辺は45度に引き、ふくらみに接します。内側の輪郭は半径16、中心から48のふくらみで、同じ形です。",
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
export const cell = (frame: number, en: string, ja: string): NonNullable<CrestDef["source"]> => ({
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
    ja: "角を上下左右に向けた正方形を四つ、中心の上、下、左、右に置きます。となり合う正方形の間は一辺の3分の1ほどあけ、どの正方形にも中央に小さな四角い目を白く抜きます。外側の四つの角を通る円が外円です。中心を通る縦と横の直線が角と交わり、正方形の辺は端から端まで引きます。",
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
    ja: "角を上下左右に向けた正方形を、上に二つ、下に二つ並べ、となり合う正方形は角で触れ合わせます。中心には小さな菱形の白が残ります。どの正方形にも中央に小さな四角い目を白く抜きます。外側の八つの角は外円の上にあり、正方形の辺は端から端まで引きます。",
  },
  build(c) {
    layOutEyes(c);
    const h = R / Math.sqrt(5);
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) c.fill("knot-eye", eyed(h, 10.5, [CX + sx * h, CY + sy * h]), "evenodd");
  },
});

/**
 * Eyes in rows: a diamond cut into `n` by `n` squares by `n - 1` ruled lines each way at half a right angle, each square with a
 * square eye, a white line `gap` wide between neighbours. The diamond's corners stand on the layout circle, so its sides are the lines
 * x + y = ±R and x - y = ±R, and the squares are the spaces between lines.
 */
const rowsOfEyes = (c: Builder, n: number, gap: number, eye: number): void => {
  layOutEyes(c);
  const pitch = (2 * R) / n;
  const w = (gap * Math.SQRT2) / 2;
  // Each square's span along x + y (or x - y): from one line to the next, less half the white line where it meets another square.
  const spans = Array.from({ length: n }, (_, i) => {
    const [lo, hi] = [-R + i * pitch, -R + (i + 1) * pitch];

    return [i === 0 ? lo : lo + w, i === n - 1 ? hi : hi - w] as [number, number];
  });
  const at = (s: number, d: number): Pt => [CX + (s + d) / 2, CY + (s - d) / 2];
  for (const [a1, a2] of spans) {
    for (const [b1, b2] of spans) {
      const mid = at((a1 + a2) / 2, (b1 + b2) / 2);
      c.fill("knot-eye", poly([at(a1, b1), at(a2, b1), at(a2, b2), at(a1, b2)]).join(poly(diamond(eye, mid))), "evenodd");
    }
  }
};

export const kokonotsume = defineCrest({
  id: "kokonotsume",
  measured:
    "The 1892 crest book's 九ッ目 (frame 20, right page, row 2, column 3 from the right), a diamond cut into three by three squares by shared lines, each square with a small square eye, read as the positions of its corners and lines in the frame's own pixels: the whole 163 across and 160 high out from the middle (so a square is 75 on a side), an eye 25 across its corners (0.24 of the square's side across its own corners). The drawing takes the diamond's corners on the layout circle, two lines each way at a third of the way across, a white line of 2 for each line the book shares between squares, and an eye 7.5 out to its corners.",
  source: cell(20, "right page, row 2, third column from the right: 九ッ目", "右頁、二段目、右から三列目「九ッ目」"),
  name: { en: "Nine eyes", ja: "九つ目" },
  reading: "ここのつめ",
  romaji: "kokonotsu me",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 9, arrangement: "rows" }],
  families: [],
  aliases: ["九つ目結", "nine knot-eyes"],
  construction: {
    en: "A square stood on its corner, its corners on the layout circle, cut into three by three equal squares by two ruled lines each way, a narrow white line where they meet, and a small square eye in each. The upright and level lines through the centre meet its corners, and every line is ruled full length.",
    ja: "角を上下左右に向けた正方形を、角を外円の上に置いて、縦横三つずつの同じ大きさの正方形に分けます。分け目は直線を二本ずつ引いて細い白線にし、どの正方形にも小さな四角い目を白く抜きます。中心を通る縦と横の直線が角と交わり、直線はどれも端から端まで引きます。",
  },
  build(c) {
    rowsOfEyes(c, 3, 2, 7.5);
  },
});

export const juroku = defineCrest({
  id: "juroku-me",
  measured:
    "The 1892 crest book's 十六目 (frame 20, right page, row 3, column 2 from the right), sixteen squares stood on their corners four by four, a narrow gap between neighbours, each with a tiny square eye, read as the positions of their corners in the frame's own pixels: the whole 152 out to its corners from the middle, a square 54 from the next one's middle (36 out to its own corners) so that the gap is a twelfth of the pitch, and an eye 9 across (0.17 of the pitch). The drawing takes the diamond's corners on the layout circle, three lines each way a quarter of the way across, a white line of 2.4 between neighbours, and an eye 4.2 out to its corners.",
  source: cell(20, "right page, row 3, second column from the right: 十六目", "右頁、三段目、右から二列目「十六目」"),
  name: { en: "Sixteen eyes", ja: "十六目" },
  reading: "じゅうろくめ",
  romaji: "jūroku me",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 16, arrangement: "rows" }],
  families: [],
  aliases: ["十六目結", "sixteen knot-eyes"],
  construction: {
    en: "A square stood on its corner, its corners on the layout circle, cut into four by four equal squares by three ruled lines each way, a narrow white line between neighbours, and a tiny square eye in each. The upright and level lines through the centre meet its corners, and every line is ruled full length.",
    ja: "角を上下左右に向けた正方形を、角を外円の上に置いて、縦横四つずつの同じ大きさの正方形に分けます。分け目は直線を三本ずつ引いて細い白線にし、どの正方形にもごく小さな四角い目を白く抜きます。中心を通る縦と横の直線が角と交わり、直線はどれも端から端まで引きます。",
  },
  build(c) {
    rowsOfEyes(c, 4, 2.4, 4.2);
  },
});

/** The weight of a line the book draws as one outline: the package's thread, a line and not a band. */
const LINE = 2.4;

/** A line drawn as one outline, as a band of the thread's weight: the diamond whose sides are `a` out to its corners, thickened across. */
const diamondLine = (a: number): Path => poly(diamond(a + (LINE * Math.SQRT2) / 2)).join(poly(diamond(a - (LINE * Math.SQRT2) / 2)));

/** What every drawing of lines in a diamond lays out first: the layout circle, the upright and level lines through its centre, and each circle the corners stand on. */
const layOutDiamonds = (c: Builder, corners: number[]): void => {
  c.guideCircle(C0, R);
  for (const a of corners) c.guideCircle(C0, a);
  c.guideLine([CX, CY - R], [CX, CY + R]);
  c.guideLine([CX - R, CY], [CX + R, CY]);
};

export const kageKaku = defineCrest({
  id: "kage-kaku",
  measured:
    "The 1892 crest book's かげ角 (frame 19, right page, row 3, column 3 from the right), a square stood on its corner drawn as four thin outlines in two close pairs, read as the positions of its lines along the upright and level lines through the middle in the frame's own pixels: 147, 131, 83 and 65 out to their corners. A 陰 crest is the outline of a form and not the form filled, so ours keeps the four lines, each a band of the package's thread weight, the outer one's outer edge on the outer circle: 94.3, 83.5, 53 and 42 out.",
  source: cell(19, "right page, row 3, third column from the right: かげ角", "右頁、三段目、右から三列目「かげ角」"),
  name: { en: "Shadow square", ja: "陰角" },
  reading: "かげかく",
  romaji: "kage kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 4, arrangement: "stacked" }],
  families: [],
  aliases: ["かげ角", "kage kaku", "shadow square"],
  construction: {
    en: "Four squares stood on their corners, one inside another, each a thin line: the outer two about 11 apart, the inner two the same. The outer one's corners are on the outer circle; the upright and level lines through the centre meet every corner, and the sides are ruled full length.",
    ja: "角を上下左右に向けた正方形を四つ、順に内側へ重ね、どれも細い線一本で描きます。外の二つは11ほど、内の二つも同じだけ間をあけます。いちばん外の角は外円の上にあり、中心を通る縦と横の直線がすべての角と交わり、辺は端から端まで引きます。",
  },
  build(c) {
    const lines = [94.3, 83.5, 53, 42];
    layOutDiamonds(c, lines);
    for (const a of lines) c.fill("square-frame", diamondLine(a), "evenodd");
  },
});

export const maruNiYotsume = defineCrest({
  id: "maru-ni-yotsume",
  measured:
    "The 1892 crest book's 丸ニ四ッ目 (frame 19, left page, row 4, column 3 from the right), four squares stood on their corners, each with a small square eye, inside a ring drawn as two outlines, read as the positions of their corners in the frame's own pixels: the outer outline of the ring 156 across its radius, the squares' centres 68 above, below, left and right of the middle, a square 61 out to its corners, a gap of 11 between neighbours (0.12 of a side) and an eye 31 across its corners (0.26 of the square's). The drawing puts them in the package's medium ring and its white, scaled by 0.95 to fit: centres 40 out, squares 35.5 out to their corners, an eye 9 out.",
  source: cell(19, "left page, row 4, third column from the right: 丸ニ四ッ目", "左頁、四段目、右から三列目「丸ニ四ッ目」"),
  name: { en: "Four eyes in a circle", ja: "丸に四つ目" },
  reading: "まるによつめ",
  romaji: "maru ni yotsume",
  frame: "ring-medium",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["丸ニ四ッ目", "maru ni yotsume yui"],
  construction: {
    en: "Four squares stood on their corners, one above, one below, one to the left and one to the right of the middle, a narrow white line between neighbours, each with a small square eye, inside a ring about a tenth of the diameter thick, their outer corners a narrow white line from it.",
    ja: "角を上下左右に向けた正方形を、中心の上、下、左、右に四つ置き、となり合う正方形の間は細い白線一本分あけ、どれも中央に小さな四角い目を白く抜きます。直径の約10分の1の太さの輪の内側に収め、外側の角を輪から細い白線一本分だけ離します。",
  },
  build(c) {
    c.ring("ring-medium");
    for (const at of [[CX, CY - 40], [CX + 40, CY], [CX, CY + 40], [CX - 40, CY]] as Pt[]) c.fill("knot-eye", eyed(35.5, 9, at), "evenodd");
  },
});

/** A lozenge wider than it is high about `at`: `a` out to its side corners and `b` to its top and bottom ones. */
const rhombus = (a: number, b: number, at: Pt): Path => poly([[at[0], at[1] - b], [at[0] + a, at[1]], [at[0], at[1] + b], [at[0] - a, at[1]]]);

export const hishiYotsume = defineCrest({
  id: "hishi-yotsume",
  measured:
    "The 1892 crest book's ひし四ッ目 (frame 20, right page, row 1, column 1 from the right), four lozenges wider than high, one above, one below, one to the left and one to the right of the middle, each with a small lozenge eye, read as the positions of their corners in the frame's own pixels: a lozenge 144 across and 109 high (72 and 55 out), the centres of the left and right ones 82 from the middle and of the upper and lower ones 63, so the far corners stand 153 from the middle across and 118 up, the gap between neighbours is 16 up the page (0.15 of a lozenge's height) and an eye is 39 across and 26 high (0.27 and 0.24 of the lozenge). The drawing takes the side corners on the outer circle: lozenges 45 out across and 34 up, centres 51 across and 39 up, an eye 12 across and 8 up.",
  source: cell(20, "right page, row 1, first column from the right: ひし四ッ目", "右頁、一段目、右から一列目「ひし四ッ目」"),
  name: { en: "Lozenge four eyes", ja: "菱四つ目" },
  reading: "ひしよつめ",
  romaji: "hishi yotsume",
  frame: "none",
  motifs: [{ motif: "knot-eye", count: 4, arrangement: "quartered" }],
  families: [],
  aliases: ["ひし四つ目", "hishi yotsume", "lozenge four eyes"],
  construction: {
    en: "Four lozenges wider than they are high, 90 across and 68 up, one above, one below, one to the left and one to the right of the middle, a narrow white line between neighbours, each with a small lozenge eye. The side corners of the left and right ones are on the outer circle; the upright and level lines through the centre meet every corner, and the sides are ruled full length.",
    ja: "幅90、高さ68の横長の菱形を、中心の上、下、左、右に四つ置き、となり合う菱形の間は細い白線一本分あけ、どれも中央に小さな菱形の目を白く抜きます。左右の菱形の横の角は外円の上にあり、中心を通る縦と横の直線がすべての角と交わり、辺は端から端まで引きます。",
  },
  build(c) {
    layOutEyes(c);
    for (const [x, y] of [[0, -39], [51, 0], [0, 39], [-51, 0]]) {
      const at: Pt = [CX + x, CY + y];
      c.fill("knot-eye", rhombus(45, 34, at).join(rhombus(12, 8, at)), "evenodd");
    }
  },
});

/**
 * The stacked squares 重ね角 in solid ink: a square with upright and level sides in front, and the four tips of a square stood on its
 * corner behind it. The front square's corners stand on the layout circle; each tip is the triangle of the back square beyond the
 * middle of a side, parted from the front square by a narrow white line `gap` wide, and reaches `tip` from the middle.
 */
const kasaneBuild = (c: Builder, tip: number, gap: number): void => {
  const half = R / Math.SQRT2;
  const base = half + gap;
  const w = tip - base;
  const at = (x: number, y: number): Pt => [CX + x, CY + y];
  layOutDiamonds(c, [R, tip]);
  c.fill("square-frame", poly([at(-half, -half), at(half, -half), at(half, half), at(-half, half)]));
  for (let i = 0; i < 4; i += 1) c.fill("square-frame", poly([at(-w, -base), at(w, -base), at(0, -tip)].map((p) => turn(p, 90 * i))));
};

export const kasaneKaku = defineCrest({
  id: "kasane-kaku",
  measured:
    "The 1892 crest book's かさね角 (frame 19, right page, row 4, column 3 from the right), a square with level and upright sides laid over a square stood on its corner, drawn in outline with the lower square's lines stopping at the upper one, read as the positions of its lines in the frame's own pixels: the upper square 227 across its sides, the lower one's tips 152 out from the middle, so the tips stand out 0.34 of the upper square's half side beyond it. The drawing is solid: the front square with its corners on the outer circle, and the four tips of the square behind it, each parted from it by a white line of 2.4, the tips reaching 91.",
  source: cell(19, "right page, row 4, third column from the right: かさね角", "右頁、四段目、右から三列目「かさね角」"),
  name: { en: "Stacked squares", ja: "重ね角" },
  reading: "かさねかく",
  romaji: "kasane kaku",
  frame: "none",
  motifs: [{ motif: "square-frame", count: 2, arrangement: "stacked" }],
  families: [],
  aliases: ["かさね角", "kasane kaku", "stacked squares"],
  construction: {
    en: "A square with upright and level sides, its corners on the outer circle, in front of a square stood on its corner whose tips reach 91 from the middle. The front square is solid, and the four tips of the back one show beyond the middle of its sides as small black triangles, each parted from it by a narrow white line. The sides are ruled full length.",
    ja: "辺を縦横にそろえた正方形を、角を外円の上に置いて手前に重ね、その後ろに、角を上下左右に向けた正方形を置きます。後ろの正方形の先は中心から91のところまで届きます。手前の正方形は黒く塗り、後ろの正方形は各辺の真ん中から出る四つの小さな黒い三角形になり、手前の正方形とは細い白線で分けます。辺は端から端まで引きます。",
  },
  build(c) {
    kasaneBuild(c, 91, 2.4);
  },
});
