// Plain forms, the third round of geometric crests: the rings alone, the black disc, the crosses, the bars, the cut-corner square and
// the manji. Each is the space between full-length ruled lines, or a disc or ring struck about the centre. The proportions are numbers
// measured from public pictures and from the 1892 crest book, never traced; the sources are named beside each build and in
// docs/provenance.md.
import { RING_GAP, RING_WEIGHT } from "../construct/builder.ts";
import type { Builder } from "../construct/builder.ts";
import { C0, CX, CY, R, circle, poly } from "../construct/geo.ts";
import type { Pt } from "../construct/geo.ts";
import { SHINSEN_MONCHO, READ } from "./books.ts";
import { defineCrest, fam } from "./util.ts";

/** The note every manji carries, in both languages: what it is, and that it has nothing to do with the swastika of the Nazis. */
const MANJI_NOTE = {
  en: "The manji (卍) is a Buddhist sign used as a Japanese family crest for centuries; it is unrelated to the Nazi swastika.",
  ja: "卍（まんじ）は仏教のしるしで、古くから日本の家紋に使われてきました。ナチスのハーケンクロイツとは関係がありません。",
};

/** Points set out about the centre, x to the right and y up, written on the page. */
const onPage = (points: [number, number][]): Pt[] => points.map(([x, y]) => [CX + x, CY - y] as Pt);

/**
 * A ring alone: the layout circle and a circle `weight` inside it, struck about the centre; the ring is the black between them.
 * The weights are the package's: a thread, a thin ring (a thirtieth of the diameter) and a medium one (0.087, measured).
 */
const ringBuild = (c: Builder, weight: number): void => {
  c.guideCircle(C0, R);
  c.guideCircle(C0, R - weight);
  c.fill("plain-ring", circle(C0, R).join(circle(C0, R - weight)), "evenodd");
};

export const itowa = defineCrest({
  id: "itowa",
  measured: "No picture of a thread ring alone was found, so the ring is the package's own thread weight, 2.4 of the 192 of the layout circle (an eightieth of the diameter), the thinnest of its rings: a line and not a band.",
  name: { en: "Thread ring", ja: "糸輪" },
  reading: "いとわ",
  romaji: "itowa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["糸丸"],
  construction: {
    en: "Two circles about the centre, the outer the layout circle and the inner struck 2.4 inside it, an eightieth of the diameter: a line, not a band.",
    ja: "同じ中心に円を二つ描きます。外側は割付の円、内側はそこから2.4内側の円で、幅は直径の80分の1です。帯ではなく、線のような輪です。",
  },
  build(c) {
    ringBuild(c, RING_WEIGHT["ring-thread"]);
  },
});

export const hosowa = defineCrest({
  id: "hosowa",
  measured: "The 1892 crest book's 細丸 (frame 18, right page, first row, third column: 細丸に二つ雁金), whose ring is drawn as two lines 8.5 apart on a ring 285.5 across, 0.030 of its diameter; the package's thin ring is a thirtieth (6.4 of the 192).",
  name: { en: "Thin ring", ja: "細輪" },
  reading: "ほそわ",
  romaji: "hosowa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["細丸"],
  construction: {
    en: "Two circles about the centre, the outer the layout circle and the inner struck 6.4 inside it, a thirtieth of the diameter.",
    ja: "同じ中心に円を二つ描きます。外側は割付の円、内側はそこから6.4内側の円で、幅は直径の30分の1です。",
  },
  build(c) {
    ringBuild(c, RING_WEIGHT["ring-thin"]);
  },
});

export const chuwa = defineCrest({
  id: "chuwa",
  measured: "The package's measured medium ring, 0.087 of the diameter at the median of fifteen ringed crests (16.8 of the 192), as docs/provenance.md says under Rings. The 1892 crest book's 中丸 (frame 18, right page, third row, third column: 中丸に三つ雁金) draws its ring as two lines 14.5 apart on a ring 300.5 across, 0.048 of its diameter: narrower than the black ring of the crests as they are drawn today, and 1.6 times its 細丸.",
  name: { en: "Medium ring", ja: "中輪" },
  reading: "ちゅうわ",
  romaji: "chūwa",
  frame: "none",
  motifs: [{ motif: "plain-ring", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["中丸"],
  construction: {
    en: "Two circles about the centre, the outer the layout circle and the inner struck 16.8 inside it, about a tenth of the diameter.",
    ja: "同じ中心に円を二つ描きます。外側は割付の円、内側はそこから16.8内側の円で、幅は直径の約10分の1です。",
  },
  build(c) {
    ringBuild(c, RING_WEIGHT["ring-medium"]);
  },
});

export const kokumochi = defineCrest({
  id: "kokumochi",
  measured: "A plain disc has one proportion, its size: it is the layout circle itself, 96 either side of the centre, as every unringed crest of the package reaches. No picture sets a different size.",
  name: { en: "Black disc", ja: "石持ち" },
  reading: "こくもち",
  romaji: "kokumochi",
  frame: "none",
  motifs: [{ motif: "black-disc", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["石持", "solid disc"],
  construction: {
    en: "The layout circle, struck about the centre and filled in black.",
    ja: "割付の円を中心に描き、その中を黒く塗ります。",
  },
  build(c) {
    c.guideCircle(C0, R);
    c.fill("black-disc", circle(C0, R));
  },
});

/**
 * A cross of arm width `w` whose four arm ends have their corners on the circle `tip`, struck about the centre: two upright and two
 * level lines ruled full length along the arms' edges, two more of each across their ends, and the cross is where they cross.
 */
const crossBuild = (c: Builder, part: string, w: number, tip: number): void => {
  const h = w / 2;
  const reach = Math.sqrt(tip * tip - h * h);
  c.guideCircle(C0, R);
  c.guideCircle(C0, tip);
  for (const side of [-1, 1]) {
    c.guideLine([CX + side * h, CY - R], [CX + side * h, CY + R]);
    c.guideLine([CX - R, CY + side * h], [CX + R, CY + side * h]);
  }
  for (const side of [-1, 1]) {
    c.guideLine([CX + side * reach, CY - R], [CX + side * reach, CY + R]);
    c.guideLine([CX - R, CY + side * reach], [CX + R, CY + side * reach]);
  }
  c.fill(part, poly(onPage([[-h, reach], [h, reach], [h, h], [reach, h], [reach, -h], [h, -h], [h, -reach], [-h, -reach], [-h, -h], [-reach, -h], [-reach, h], [-h, h]])));
};

export const jumonji = defineCrest({
  id: "jumonji",
  measured: "Three public pictures of the ringed cross, read along the level line through the centre and across an arm, in each picture's own units (the Wikimedia Commons pictures Japanese Crest maru ni jyuji, Maru ni Jūmonji - Hongō and Maru ni Jūmonji - Hongō Miyakonojō Shimazu): an arm is 0.212, 0.245 and 0.202 of the length from one arm's end to the opposite one's, the median 0.212. No unringed picture was found, so the cross is the ringed crest's.",
  name: { en: "Plain cross", ja: "十文字" },
  reading: "じゅうもんじ",
  romaji: "jūmonji",
  frame: "none",
  motifs: [{ motif: "cross", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["plain cross"],
  construction: {
    en: "Two bars crossing square, each about a fifth of the cross's length across. Four lines along the arms' edges and four across their ends are ruled full length; the corners of the arm ends stand on the outer circle.",
    ja: "同じ太さの二本の棒を直角に交わらせます。棒の太さは全長の約5分の1です。腕の縁に沿う直線四本と、腕の先に沿う直線四本を端から端まで引き、腕の先の角は外円の上に置きます。",
  },
  build(c) {
    // 40 across an arm and the end's corners on the layout circle: an arm 0.213 of the cross's length, the pictures' median being 0.212.
    crossBuild(c, "cross", 40, R);
  },
});

export const maruNiJumonji = defineCrest({
  id: "maru-ni-jumonji",
  measured: "The same three pictures, read along the level line through the centre as parts of the ring's inner width: ring 0.081, 0.081 and 0.089 of the outer diameter (the package's 0.087), the cross's length 0.963, 0.837 and 0.876 of the inner width (median 0.876) and an arm 0.204, 0.206 and 0.177 of it (median 0.204), so a white gap is left between each arm's end and the ring, 0.015, 0.068 and 0.052 of the diameter. The third picture is the Miyakonojō Shimazu crest.",
  name: { en: "Plain cross in a circle", ja: "丸に十文字" },
  reading: "まるにじゅうもんじ",
  romaji: "maru ni jūmonji",
  frame: "ring-medium",
  motifs: [{ motif: "cross", count: 1, arrangement: "single" }],
  families: [fam("Shimazu", "島津", "しまづ")],
  aliases: ["丸に十の字", "ringed cross"],
  construction: {
    en: "A cross inside a ring about a tenth of the diameter thick, its arms 32 across, the corners of their ends on a circle 0.9 of the ring's inner radius, so a white gap is left between each arm and the ring.",
    ja: "直径の約10分の1の太さの輪の中に、腕の太さ32の十字を置きます。腕の先の角は輪の内側の半径の0.9の円の上にあり、輪との間に白いすき間が残ります。",
  },
  build(c) {
    c.ring("ring-medium");
    // The pictures' medians: the cross 0.876 of the ring's inner width long and an arm 0.204, that is 138.8 and 32.3 of the inner width 158.4.
    crossBuild(c, "cross", 32, 71);
  },
});

/**
 * Level bars across the whole crest, with no ring: each is the space between two level lines ruled the full width of the layout
 * circle and ends on an upright line. A bar is given as the heights of its two edges from the centre, in the picture's own pixels; the four outer corners stand on the layout circle. The picture's numbers are in its own pixels: 278 and 232.5 half the
 * width and the height of the whole, and the circle through their corner 362.4.
 */
const barsBuild = (c: Builder, bars: [number, number][]): void => {
  const k = R / Math.hypot(278, 232.5);
  const end = 278 * k;
  c.guideCircle(C0, R);
  for (const side of [-1, 1]) c.guideLine([CX + side * end, CY - R], [CX + side * end, CY + R]);
  for (const edge of [...new Set(bars.flat())]) c.guideLine([CX - R, CY - edge * k], [CX + R, CY - edge * k]);
  for (const [foot, top] of bars) c.fill("line", poly(onPage([[-end, top * k], [end, top * k], [end, foot * k], [-end, foot * k]])));
};

export const futatsuHikiryo = defineCrest({
  id: "futatsu-hikiryo",
  measured: "The Wikimedia Commons picture Japanese Crest soroi Futatu Hiki, read along the upright line through the centre and across the bars in its own pixels (688 across): the bars 167 high each, the white between them 131, the whole 556 across and 465 high, so a bar is 0.300 of the width and the white 0.236, and the four outer corners stand 362 from the centre.",
  name: { en: "Two bars", ja: "二つ引両" },
  reading: "ふたつひきりょう",
  romaji: "futatsu hikiryō",
  frame: "none",
  motifs: [{ motif: "line", count: 2, arrangement: "rows" }],
  families: [fam("Ashikaga", "足利", "あしかが")],
  aliases: ["足利二つ引両", "揃い二つ引"],
  construction: {
    en: "Two level bars, each 0.30 of the crest's width high, the white between them 0.24. Two upright and four level lines are ruled full length; the outer corners stand on the outer circle.",
    ja: "横棒を二本並べます。棒の太さは全体の幅の0.30、間の白は0.24です。縦の直線二本と横の直線四本を端から端まで引き、外側の角は外円の上に置きます。",
  },
  build(c) {
    // In the picture's pixels, from the centre: the white's edge 65.5 out and the outer edge 232.5.
    barsBuild(c, [[65.5, 232.5], [-232.5, -65.5]]);
  },
});

export const mitsuHikiryo = defineCrest({
  id: "mitsu-hikiryo",
  measured: "The Wikimedia Commons picture Japanese Crest mitu Hikiryou, read along the upright line through the centre in its own pixels (688 across): the bars 150, 145 and 150 high and the two whites 10 each, the whole 556 across and 465 high, so the middle bar is 0.261 of the width, an outer one 0.270 and a white 0.018, and the four outer corners stand 362 from the centre.",
  name: { en: "Three bars", ja: "三つ引両" },
  reading: "みつひきりょう",
  romaji: "mitsu hikiryō",
  frame: "none",
  motifs: [{ motif: "line", count: 3, arrangement: "rows" }],
  families: [],
  aliases: ["three lines"],
  construction: {
    en: "Three level bars, the middle one 0.26 of the width high and the outer two 0.27, a white of 0.018 between them. Two upright and six level lines are ruled full length; the outer corners stand on the outer circle.",
    ja: "横棒を三本並べます。真ん中の棒の太さは幅の0.26、外の二本は0.27で、間に0.018の細い白を残します。縦の直線二本と横の直線六本を端から端まで引き、外側の角は外円の上に置きます。",
  },
  build(c) {
    // In the picture's pixels, from the centre: the middle bar to 72.5, the white to 82.5, the outer bars to 232.5.
    barsBuild(c, [[82.5, 232.5], [-72.5, 72.5], [-232.5, -82.5]]);
  },
});

/**
 * The cut-corner square 隅切り角: a square frame whose four corners are cut at half a right angle, so it has eight sides. In the
 * crest's own frame (the centre at 0, y up, the layout circle at 1) its outer corners stand at 2√2/3 and 1/3 along the two axes
 * (their distance from the centre 1, on the circle), and the inner outline is the same eight lines moved in by the band `t`.
 */
const sumikiriBuild = (c: Builder, part: string, t: number): void => {
  const a = (R * 2 * Math.SQRT2) / 3;
  const b = R / 3;
  const outer: [number, number][] = [[-b, a], [b, a], [a, b], [a, -b], [b, -a], [-b, -a], [-a, -b], [-a, b]];
  // The inner octagon's sides stand `t` in from the outer ones, and its slanting sides `t` in at right angles to them.
  const ai = a - t;
  const k = a + b - t * Math.SQRT2;
  const inner: [number, number][] = [[-(k - ai), ai], [k - ai, ai], [ai, k - ai], [ai, -(k - ai)], [k - ai, -ai], [-(k - ai), -ai], [-ai, -(k - ai)], [-ai, k - ai]];
  c.guideCircle(C0, R);
  for (const side of [-1, 1]) {
    c.guideLine([CX + side * a, CY - R], [CX + side * a, CY + R]);
    c.guideLine([CX - R, CY + side * a], [CX + R, CY + side * a]);
    c.guideLine([CX + side * ai, CY - R], [CX + side * ai, CY + R]);
    c.guideLine([CX - R, CY + side * ai], [CX + R, CY + side * ai]);
  }
  // The four slanting sides, outer then inner: the lines x + y = K and x - y = K for K = ±(a + b), and the same moved in.
  for (const reach of [a + b, k]) {
    for (const side of [-1, 1]) {
      const edge = side * reach;
      c.guideLine(onPage([[-R, edge + R]])[0], onPage([[R, edge - R]])[0]);
      c.guideLine(onPage([[-R, -R - edge]])[0], onPage([[R, R - edge]])[0]);
    }
  }
  c.fill(part, poly(onPage(outer)).join(poly(onPage(inner))), "evenodd");
};

export const sumikiriKaku = defineCrest({
  id: "sumikiri-kaku",
  measured: "The 1892 crest book's 角切 (frame 45, left page, third row, fourth column counted from the right), an octagon drawn as two outlines, read as the positions of its lines in the frame's own pixels (the outer one 305 across between its upright sides, the sides 102 long and the corners cut 96 at half a right angle, so the cut is 0.31 of the width and the straight side 0.34; the band between the two outlines 46 across the sides and 42 across the slanting sides, 0.15 and 0.14 of the width). The drawing takes the whole eight-sided frame with its corners on the outer circle, at 1/3 of the radius from the axes, and a band 0.144 of the width across, 26 of 181.",
  source: { ...SHINSEN_MONCHO, frame: 45, place: { en: "left page, third row, fourth column counted from the right: 角切 (measured, and drawn with compass and ruler)", ja: "左頁、三段目、右から四列目「角切」（寸法を測り、コンパスと定規で描いたもの）" }, read: READ },
  name: { en: "Cut-corner square", ja: "隅切り角" },
  reading: "すみきりかく",
  romaji: "sumikiri kaku",
  frame: "none",
  motifs: [{ motif: "cut-corner-square", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["隅切角", "角切", "octagon frame"],
  construction: {
    en: "A square frame with its four corners cut at half a right angle, so it has eight sides. The outer corners stand on the outer circle, a third of the radius from the axes; the inner outline is the same eight lines moved in by the band, 0.144 of the width. Every side is ruled full length.",
    ja: "四つの角を45度に切り落とした四角い枠で、辺が八つあります。外側の角は外円の上、縦横の中心線から半径の3分の1の位置にあります。内側の輪郭は、同じ八本の線を枠の太さ（幅の0.145）だけ内へ寄せたものです。線はどれも端から端まで引きます。",
  },
  build(c) {
    // The band 0.144 of the width across: 26 of the 181 between the outer upright sides.
    sumikiriBuild(c, "cut-corner-square", 26);
  },
});

/**
 * The manji 卍 as the ringed crest is drawn: a square of nine equal cells, three by three, with four narrow white slits that make it a
 * manji. From each side a slit one cell long runs in beside the middle cell; the four turn the same way. In the crest's own frame
 * (x to the right and y up) the cells are `c` across and a slit `s`, so the square is 3c + 2s across; the twelve lines through the
 * cells' edges, six upright and six level, are ruled full length, and the outline is the space between them, with the slits cut in.
 * `hand` is 1 for the left manji (the top arm bends to the left) and -1 for the right one, its mirror image.
 */
const manjiBuild = (c: Builder, part: string, tip: number, hand: 1 | -1): void => {
  // The picture's cell is 102 and its slit 10: a slit is 0.098 of a cell.
  const a = tip / Math.SQRT2;
  const cell = a / (1.5 + 10 / 102);
  const slit = (cell * 10) / 102;
  const [near, far] = [cell / 2, cell / 2 + slit];
  c.guideCircle(C0, R);
  for (const side of [-1, 1]) {
    for (const at of [near, far, a]) {
      c.guideLine([CX + side * at, CY - R], [CX + side * at, CY + R]);
      c.guideLine([CX - R, CY + side * at], [CX + R, CY + side * at]);
    }
  }
  // Clockwise from the top left corner: the slit down from the top, the slit in from the right, the slit up from the bottom, the slit in from the left.
  const left: [number, number][] = [[-a, a], [near, a], [near, far], [far, far], [far, a], [a, a], [a, -near], [far, -near], [far, -far], [a, -far], [a, -a], [-near, -a], [-near, -far], [-far, -far], [-far, -a], [-a, -a], [-a, near], [-far, near], [-far, far], [-a, far]];
  const points = hand === 1 ? left : left.map(([x, y]) => [-x, y] as [number, number]).reverse();
  c.fill(part, poly(onPage(points)));
};

export const hidariManji = defineCrest({
  id: "hidari-manji",
  measured: "The Wikimedia Commons picture Japanese Crest Maru ni Hidari Mannji, read along the level line through the centre and the rows above it in its own pixels (688 across): the square 326 across, every cell 102 and every slit 10 (0.314 and 0.031 of the width), and read against the ringed manji of the 1892 crest book (frame 30, right page, first row, fourth column: 丸にまんじ), where the square is 0.555 of the ring's outer width, the picture's being 0.586. No unringed picture was found, so the manji is the ringed crest's, its corners on the outer circle.",
  note: MANJI_NOTE,
  name: { en: "Left manji", ja: "左万字" },
  reading: "ひだりまんじ",
  romaji: "hidari manji",
  frame: "none",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["manji", "卍", "左卍"],
  construction: {
    en: "A square of nine equal cells, three by three, with four narrow white slits: from each side a slit one cell long runs in beside the middle cell, all four turning the same way, so the top arm bends left. A cell is 0.31 of the width and a slit 0.03. Twelve lines are ruled full length; the outer corners stand on the outer circle.",
    ja: "同じ大きさのマス目を縦横に三つずつ並べた正方形に、細い白いすき間を四つ入れます。すき間は各辺からマス目一つ分の長さで、中央のマス目の横まで入ります。四つとも同じ向きにそろえるので、いちばん上の腕は左に曲がります。マス目は正方形の幅の0.31、すき間は0.03です。直線十二本を端から端まで引き、外側の角は外円の上に置きます。",
  },
  build(c) {
    manjiBuild(c, "manji", R, 1);
  },
});

export const migiManji = defineCrest({
  id: "migi-manji",
  measured: "The same picture as the left manji, turned the other way: the same cells and slits, mirrored about the upright line through the centre.",
  note: MANJI_NOTE,
  name: { en: "Right manji", ja: "右万字" },
  reading: "みぎまんじ",
  romaji: "migi manji",
  frame: "none",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [],
  aliases: ["右卍"],
  construction: {
    en: "The left manji turned the other way: the same cells and slits, mirrored, so the top arm bends right. Every line is ruled in place.",
    ja: "左万字を左右反転した形です。マス目もすき間も同じで、いちばん上の腕が右に曲がります。直線はどれもその場で引きます。",
  },
  build(c) {
    manjiBuild(c, "manji", R, -1);
  },
});

export const maruNiHidariManji = defineCrest({
  id: "maru-ni-hidari-manji",
  measured: "The Wikimedia Commons picture Japanese Crest Maru ni Hidari Mannji, read along the level line through the centre in its own pixels (688 across): the ring 556 across and 40 thick (0.072 of the diameter; the package's ring is 0.087, which is kept), the square 326 across, so its corners stand 7.5 inside the ring's inner edge, every cell 102 and every slit 10. The 1892 crest book's 丸にまんじ (frame 30, right page, first row, fourth column) draws the same square in a ring.",
  note: MANJI_NOTE,
  name: { en: "Left manji in a circle", ja: "丸に左万字" },
  reading: "まるにひだりまんじ",
  romaji: "maru ni hidari manji",
  frame: "ring-medium",
  motifs: [{ motif: "manji", count: 1, arrangement: "single" }],
  families: [fam("Hachisuka", "蜂須賀", "はちすか")],
  aliases: ["丸に卍", "丸に左卍", "ringed manji"],
  construction: {
    en: "The left manji inside a ring about a tenth of the diameter thick, its corners a narrow white from the ring, struck in place.",
    ja: "直径の約10分の1の太さの輪の内側に左万字を置きます。角は輪から細い白線一本分だけ離し、その場で描きます。",
  },
  build(c) {
    const inner = c.ring("ring-medium");
    manjiBuild(c, "manji", inner - RING_GAP, 1);
  },
});
